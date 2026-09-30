import { randomBytes } from "node:crypto";
import { hashPassword } from "better-auth/crypto";
import { getSql } from "@/lib/db";
import { brandCase, initials } from "./format";
import { createSeed, emptyWorkspace } from "./seed";
import type { VantageData } from "./types";

type SeedAccount = {
  email: string;
  password: string;
  name: string;
  role: string;
  workspaceName: string;
  kind: "demo" | "owner";
};

const ACCOUNTS: SeedAccount[] = [
  {
    email: "alex@cdxi.digital",
    password: "VantageDemo1!",
    name: "Alex Kim",
    role: "Admin",
    workspaceName: "Northline Advisory",
    kind: "demo",
  },
  {
    email: "priya@cdxi.digital",
    password: "VantageDemo1!",
    name: "Priya Nair",
    role: "Customer success",
    workspaceName: "Northline Advisory",
    kind: "demo",
  },
  {
    email: "tom@cdxi.digital",
    password: "VantageDemo1!",
    name: "Tom Walsh",
    role: "Operations",
    workspaceName: "Northline Advisory",
    kind: "demo",
  },
  {
    email: "parker@fourtee2.co",
    password: "DontPanic!",
    name: "James Parker-Broadmore",
    role: "Owner",
    workspaceName: "fourtee2",
    kind: "owner",
  },
];

function newId() {
  return randomBytes(16).toString("hex");
}

function payloadFor(account: SeedAccount): VantageData {
  const identity = {
    workspaceName: brandCase(account.workspaceName),
    profile: {
      name: account.name,
      email: account.email,
      role: account.role,
      initials: initials(account.name),
    },
  };
  if (account.kind === "demo") {
    return { ...createSeed(), ...identity, signedIn: true };
  }
  return emptyWorkspace(identity);
}

export function workspaceForIdentity(input: { email?: string | null; name?: string | null }): VantageData {
  const email = (input.email ?? "").trim().toLowerCase();
  const match = ACCOUNTS.find((a) => a.email === email);
  if (match) return payloadFor(match);
  const name = input.name?.trim() || email.split("@")[0] || "Operator";
  const root = email.includes("@") ? email.split("@")[1]?.split(".")[0] ?? "Workspace" : "Workspace";
  const workspaceName = /^fourtee2$/i.test(root) ? "fourtee2" : root.charAt(0).toUpperCase() + root.slice(1);
  return emptyWorkspace({
    workspaceName,
    profile: {
      name,
      email: email || "",
      role: "Member",
      initials: initials(name),
    },
  });
}

const globalRef = globalThis as typeof globalThis & {
  __vantageAccountSeed__?: Promise<void>;
};

async function seedOnce() {
  const sql = await getSql();
  const now = new Date().toISOString();
  const hashes = await Promise.all(ACCOUNTS.map((account) => hashPassword(account.password)));
  for (const [index, account] of ACCOUNTS.entries()) {
    const existing = await sql.query<{ id: string }>(
      `select id from "user" where email = $1 limit 1`,
      [account.email],
    );
    let userId = existing[0]?.id;
    if (!userId) {
      userId = newId();
      await sql.query(
        `insert into "user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
         values ($1, $2, $3, true, $4, $4)`,
        [userId, account.name, account.email, now],
      );
      await sql.query(
        `insert into "account" (id, "accountId", "providerId", "userId", password, "createdAt", "updatedAt")
         values ($1, $2, 'credential', $2, $3, $4, $4)`,
        [newId(), userId, hashes[index], now],
      );
    }
    const workspace = await sql.query<{ user_id: string }>(
      `select user_id from workspaces where user_id = $1 limit 1`,
      [userId],
    );
    if (!workspace[0]) {
      await sql.query(
        `insert into workspaces (user_id, payload, updated_at) values ($1, $2::jsonb, $3)`,
        [userId, JSON.stringify(payloadFor(account)), now],
      );
    }
  }
}

export function ensureSeedAccounts() {
  globalRef.__vantageAccountSeed__ ??= seedOnce().catch((err) => {
    globalRef.__vantageAccountSeed__ = undefined;
    throw err;
  });
  return globalRef.__vantageAccountSeed__;
}
