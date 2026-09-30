import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { agentSystemPrompt, DEFAULT_AI_PERMISSIONS } from "./lifecycle";
import { normalizeWorkspace } from "./seed";
import type { AiAgentId, AiCapability, InsightBrief, VantageData } from "./types";

function parsePayload(raw: unknown): VantageData | null {
  if (!raw) return null;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as VantageData;
    } catch {
      return null;
    }
  }
  if (typeof raw === "object") return raw as VantageData;
  return null;
}

export const loadWorkspace = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { ensureSeedAccounts, workspaceForIdentity } = await import("./seed-accounts.server");
    await ensureSeedAccounts();
    const sql = await getSql();
    const rows = await sql.query<{ payload: unknown }>(
      `select payload from workspaces where user_id = $1 limit 1`,
      [context.userId],
    );
    const existing = parsePayload(rows[0]?.payload);
    if (existing) {
      const next = normalizeWorkspace(existing);
      if (
        next.workspaceName !== existing.workspaceName ||
        next.business.legalName !== (existing.business?.legalName ?? "") ||
        next.business.tradingName !== (existing.business?.tradingName ?? "")
      ) {
        await sql.query(
          `update workspaces set payload = $2::jsonb, updated_at = now() where user_id = $1`,
          [context.userId, JSON.stringify(next)],
        );
      }
      return next;
    }

    const users = await sql.query<{ email: string | null; name: string | null }>(
      `select email, name from "user" where id = $1 limit 1`,
      [context.userId],
    );
    const payload = workspaceForIdentity({
      email: users[0]?.email,
      name: users[0]?.name,
    });
    await sql.query(
      `insert into workspaces (user_id, payload, updated_at)
       values ($1, $2::jsonb, now())
       on conflict (user_id) do nothing`,
      [context.userId, JSON.stringify(payload)],
    );
    return payload;
  });

export const saveWorkspace = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: VantageData) => data)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql.query(
      `insert into workspaces (user_id, payload, updated_at)
       values ($1, $2::jsonb, now())
       on conflict (user_id) do update set payload = excluded.payload, updated_at = now()`,
      [context.userId, JSON.stringify(data)],
    );
  });

function parseBrief(text: string): InsightBrief | null {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    const obj = JSON.parse(match[0]) as Partial<InsightBrief>;
    const headline = String(obj.headline ?? "").trim();
    if (!headline) return null;
    const list = (value: unknown) =>
      Array.isArray(value) ? value.map((item) => String(item).trim()).filter(Boolean).slice(0, 4) : [];
    return {
      at: new Date().toISOString(),
      headline,
      priorities: list(obj.priorities),
      risks: list(obj.risks),
      wins: list(obj.wins),
      nextMove: String(obj.nextMove ?? "").trim(),
    };
  } catch {
    return null;
  }
}

export const generateInsight = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { snapshot: unknown; agent?: AiAgentId; level?: AiCapability; question?: string }) => input)
  .handler(async ({ data }): Promise<{ ok: true; brief: InsightBrief } | { ok: false; error: string }> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "AI briefing is not available in this environment." };

    const agent: AiAgentId = data.agent ?? "ceo";
    const level: AiCapability = data.level ?? DEFAULT_AI_PERMISSIONS[agent];
    const question = String(data.question ?? "").trim().slice(0, 800);
    const snapshot = JSON.stringify(data.snapshot).slice(0, 6000);
    const user = question
      ? `Operator question: ${question}\n\nWorkspace snapshot:\n${snapshot}`
      : snapshot;

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: agent === "assist" ? 0.2 : 0.4,
        max_tokens: agent === "assist" ? 800 : 500,
        messages: [
          {
            role: "system",
            content: agentSystemPrompt(agent, level),
          },
          {
            role: "user",
            content: user,
          },
        ],
      }),
    });

    if (!res.ok) return { ok: false, error: `Briefing failed (${res.status}). Try again in a moment.` };
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const text = body.choices?.[0]?.message?.content ?? "";
    const brief = parseBrief(text);
    if (!brief) return { ok: false, error: "The briefing came back unreadable. Try again." };
    return { ok: true, brief: { ...brief, agent } };
  });
