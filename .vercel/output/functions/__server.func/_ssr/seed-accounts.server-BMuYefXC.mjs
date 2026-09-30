import { r as getSql } from "./db-BPsXT_Zd.mjs";
import { O as initials } from "./lifecycle-B-aIlvx1.mjs";
import { t as hashPassword$1 } from "./password-VlpK0Xix.mjs";
import { n as createSeed, r as emptyWorkspace } from "./seed-ChAzxHg7.mjs";
import { randomBytes } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/seed-accounts.server-BMuYefXC.js
var ACCOUNTS = [
	{
		email: "alex@cdxi.digital",
		password: "VantageDemo1!",
		name: "Alex Kim",
		role: "Admin",
		workspaceName: "Northline Advisory",
		kind: "demo"
	},
	{
		email: "priya@cdxi.digital",
		password: "VantageDemo1!",
		name: "Priya Nair",
		role: "Customer success",
		workspaceName: "Northline Advisory",
		kind: "demo"
	},
	{
		email: "tom@cdxi.digital",
		password: "VantageDemo1!",
		name: "Tom Walsh",
		role: "Operations",
		workspaceName: "Northline Advisory",
		kind: "demo"
	},
	{
		email: "parker@fourtee2.co",
		password: "DontPanic!",
		name: "James Parker-Broadmore",
		role: "Owner",
		workspaceName: "Fourtee2",
		kind: "owner"
	}
];
function newId() {
	return randomBytes(16).toString("hex");
}
function payloadFor(account) {
	const identity = {
		workspaceName: account.workspaceName,
		profile: {
			name: account.name,
			email: account.email,
			role: account.role,
			initials: initials(account.name)
		}
	};
	if (account.kind === "demo") return {
		...createSeed(),
		...identity,
		signedIn: true
	};
	return emptyWorkspace(identity);
}
function workspaceForIdentity(input) {
	const email = (input.email ?? "").trim().toLowerCase();
	const match = ACCOUNTS.find((a) => a.email === email);
	if (match) return payloadFor(match);
	const name = input.name?.trim() || email.split("@")[0] || "Operator";
	const workspaceName = email.includes("@") ? email.split("@")[1]?.split(".")[0] ?? "Workspace" : "Workspace";
	return emptyWorkspace({
		workspaceName: workspaceName.charAt(0).toUpperCase() + workspaceName.slice(1),
		profile: {
			name,
			email: email || "",
			role: "Member",
			initials: initials(name)
		}
	});
}
var globalRef = globalThis;
async function seedOnce() {
	const sql = await getSql();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const hashes = await Promise.all(ACCOUNTS.map((account) => hashPassword$1(account.password)));
	for (const [index, account] of ACCOUNTS.entries()) {
		let userId = (await sql.query(`select id from "user" where email = $1 limit 1`, [account.email]))[0]?.id;
		if (!userId) {
			userId = newId();
			await sql.query(`insert into "user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
         values ($1, $2, $3, true, $4, $4)`, [
				userId,
				account.name,
				account.email,
				now
			]);
			await sql.query(`insert into "account" (id, "accountId", "providerId", "userId", password, "createdAt", "updatedAt")
         values ($1, $2, 'credential', $2, $3, $4, $4)`, [
				newId(),
				userId,
				hashes[index],
				now
			]);
		}
		if (!(await sql.query(`select user_id from workspaces where user_id = $1 limit 1`, [userId]))[0]) await sql.query(`insert into workspaces (user_id, payload, updated_at) values ($1, $2::jsonb, $3)`, [
			userId,
			JSON.stringify(payloadFor(account)),
			now
		]);
	}
}
function ensureSeedAccounts() {
	globalRef.__vantageAccountSeed__ ??= seedOnce().catch((err) => {
		globalRef.__vantageAccountSeed__ = void 0;
		throw err;
	});
	return globalRef.__vantageAccountSeed__;
}
//#endregion
export { ensureSeedAccounts, workspaceForIdentity };
