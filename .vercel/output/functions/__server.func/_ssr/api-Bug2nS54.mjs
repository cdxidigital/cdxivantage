import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { r as getSql } from "./db-BPsXT_Zd.mjs";
import { t as authMiddleware } from "./middleware-DWjPk7OX.mjs";
import { _ as agentSystemPrompt, a as DEFAULT_AI_PERMISSIONS } from "./lifecycle-B-aIlvx1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-Bug2nS54.js
function parsePayload(raw) {
	if (!raw) return null;
	if (typeof raw === "string") try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
	if (typeof raw === "object") return raw;
	return null;
}
var loadWorkspace_createServerFn_handler = createServerRpc({
	id: "564951651fa510b3147c022a28e74f533b65f7fa50328e142239fffce0581704",
	name: "loadWorkspace",
	filename: "src/lib/vantage/api.ts"
}, (opts) => loadWorkspace.__executeServer(opts));
var loadWorkspace = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(loadWorkspace_createServerFn_handler, async ({ context }) => {
	const { ensureSeedAccounts, workspaceForIdentity } = await import("./seed-accounts.server-BMuYefXC.mjs");
	await ensureSeedAccounts();
	const sql = await getSql();
	const existing = parsePayload((await sql.query(`select payload from workspaces where user_id = $1 limit 1`, [context.userId]))[0]?.payload);
	if (existing) return existing;
	const users = await sql.query(`select email, name from "user" where id = $1 limit 1`, [context.userId]);
	const payload = workspaceForIdentity({
		email: users[0]?.email,
		name: users[0]?.name
	});
	await sql.query(`insert into workspaces (user_id, payload, updated_at)
       values ($1, $2::jsonb, now())
       on conflict (user_id) do nothing`, [context.userId, JSON.stringify(payload)]);
	return payload;
});
var saveWorkspace_createServerFn_handler = createServerRpc({
	id: "d30b5013780a31ee8419df0467d118b32add030f9f743759d2ab2c7e81bc3e85",
	name: "saveWorkspace",
	filename: "src/lib/vantage/api.ts"
}, (opts) => saveWorkspace.__executeServer(opts));
var saveWorkspace = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(saveWorkspace_createServerFn_handler, async ({ context, data }) => {
	await (await getSql()).query(`insert into workspaces (user_id, payload, updated_at)
       values ($1, $2::jsonb, now())
       on conflict (user_id) do update set payload = excluded.payload, updated_at = now()`, [context.userId, JSON.stringify(data)]);
});
function parseBrief(text) {
	const match = text.match(/\{[\s\S]*\}/);
	if (!match) return null;
	try {
		const obj = JSON.parse(match[0]);
		const headline = String(obj.headline ?? "").trim();
		if (!headline) return null;
		const list = (value) => Array.isArray(value) ? value.map((item) => String(item).trim()).filter(Boolean).slice(0, 4) : [];
		return {
			at: (/* @__PURE__ */ new Date()).toISOString(),
			headline,
			priorities: list(obj.priorities),
			risks: list(obj.risks),
			wins: list(obj.wins),
			nextMove: String(obj.nextMove ?? "").trim()
		};
	} catch {
		return null;
	}
}
var generateInsight_createServerFn_handler = createServerRpc({
	id: "8aa366f4cbf75c7bfa00897b2d8ef1084cc084695ace61de1b7a87bacc2fced9",
	name: "generateInsight",
	filename: "src/lib/vantage/api.ts"
}, (opts) => generateInsight.__executeServer(opts));
var generateInsight = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(generateInsight_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI briefing is not available in this environment."
	};
	const agent = data.agent ?? "ceo";
	const level = data.level ?? DEFAULT_AI_PERMISSIONS[agent];
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			temperature: .4,
			max_tokens: 500,
			messages: [{
				role: "system",
				content: agentSystemPrompt(agent, level)
			}, {
				role: "user",
				content: JSON.stringify(data.snapshot).slice(0, 6e3)
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `Briefing failed (${res.status}). Try again in a moment.`
	};
	const brief = parseBrief((await res.json()).choices?.[0]?.message?.content ?? "");
	if (!brief) return {
		ok: false,
		error: "The briefing came back unreadable. Try again."
	};
	return {
		ok: true,
		brief: {
			...brief,
			agent
		}
	};
});
//#endregion
export { generateInsight_createServerFn_handler, loadWorkspace_createServerFn_handler, saveWorkspace_createServerFn_handler };
