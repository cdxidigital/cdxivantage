import { c as isValid, r as format, t as parseISO } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lifecycle-B-aIlvx1.js
var AUD = new Intl.NumberFormat("en-AU", {
	style: "currency",
	currency: "AUD",
	maximumFractionDigits: 0
});
var AUD_FULL = new Intl.NumberFormat("en-AU", {
	style: "currency",
	currency: "AUD",
	minimumFractionDigits: 2
});
function money(n, compact = true) {
	return compact ? AUD.format(n) : AUD_FULL.format(n);
}
function gstOf(amount) {
	return Math.round(amount / 11);
}
function parseDay(iso) {
	const d = parseISO(iso);
	return isValid(d) ? d : new Date(iso);
}
function fmtDay(iso, pattern = "d MMM") {
	try {
		return format(parseDay(iso), pattern);
	} catch {
		return iso;
	}
}
function todayIso(d = /* @__PURE__ */ new Date()) {
	return format(d, "yyyy-MM-dd");
}
function addDaysIso(iso, days) {
	const d = parseDay(iso);
	d.setDate(d.getDate() + days);
	return format(d, "yyyy-MM-dd");
}
function greeting(name, now = /* @__PURE__ */ new Date()) {
	const h = now.getHours();
	const first = name.split(" ")[0] || "there";
	return `${h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"}, ${first}.`;
}
function headingDate(now = /* @__PURE__ */ new Date()) {
	return format(now, "EEEE, d MMMM yyyy");
}
function rangeLabel(range) {
	if (range === "7d") return "Last 7 days";
	if (range === "quarter") return "This quarter";
	return "Last 30 days";
}
function rangeStart(range, now = /* @__PURE__ */ new Date()) {
	const d = new Date(now);
	if (range === "7d") {
		d.setDate(d.getDate() - 6);
		d.setHours(0, 0, 0, 0);
		return d;
	}
	if (range === "quarter") {
		const q = Math.floor(d.getMonth() / 3) * 3;
		return new Date(d.getFullYear(), q, 1);
	}
	d.setDate(d.getDate() - 29);
	d.setHours(0, 0, 0, 0);
	return d;
}
function inRange(iso, range, now = /* @__PURE__ */ new Date()) {
	const d = parseDay(iso);
	return d >= rangeStart(range, now) && d <= now;
}
var WORK_STATUS = [
	{
		id: "on-hold",
		label: "On hold"
	},
	{
		id: "scheduled",
		label: "Scheduled"
	},
	{
		id: "in-progress",
		label: "In progress"
	},
	{
		id: "needs-review",
		label: "Needs review"
	},
	{
		id: "done",
		label: "Done"
	}
];
function workStatusLabel(s) {
	return WORK_STATUS.find((x) => x.id === s)?.label ?? s;
}
var DEAL_STAGES = [
	{
		id: "lead",
		label: "Lead"
	},
	{
		id: "qualified",
		label: "Qualified"
	},
	{
		id: "proposal",
		label: "Proposal"
	},
	{
		id: "won",
		label: "Won"
	},
	{
		id: "lost",
		label: "Lost"
	}
];
function dealStageLabel(s) {
	return DEAL_STAGES.find((x) => x.id === s)?.label ?? s;
}
function statusTone(s) {
	if (s === "done" || s === "paid" || s === "Up to date" || s === "active" || s === "won") return "ready";
	if (s === "overdue" || s === "Urgent" || s === "inactive" || s === "lost") return "urgent";
	if (s === "needs-review" || s === "outstanding" || s === "Due soon" || s === "prospect" || s === "proposal" || s === "qualified") return "soon";
	return "neutral";
}
function initials(name) {
	return name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
}
function relativeFrom(iso, now = /* @__PURE__ */ new Date()) {
	const t = parseDay(iso).getTime();
	const diff = now.getTime() - t;
	const mins = Math.round(diff / 6e4);
	if (mins < 2) return "Just now";
	if (mins < 60) return `${mins}m ago`;
	const hrs = Math.round(mins / 60);
	if (hrs < 24) return `${hrs}h ago`;
	const days = Math.round(hrs / 24);
	if (days === 1) return "Yesterday";
	if (days < 7) return `${days}d ago`;
	return fmtDay(iso, "d MMM");
}
function startOfWeekIso(d = /* @__PURE__ */ new Date()) {
	const day = d.getDay();
	const diff = day === 0 ? -6 : 1 - day;
	const monday = new Date(d);
	monday.setDate(d.getDate() + diff);
	monday.setHours(0, 0, 0, 0);
	return format(monday, "yyyy-MM-dd");
}
function weekDays(startIso) {
	return Array.from({ length: 7 }, (_, i) => addDaysIso(startIso, i));
}
function formatDuration(ms) {
	const total = Math.max(0, Math.floor(ms / 1e3));
	return [
		Math.floor(total / 3600),
		Math.floor(total % 3600 / 60),
		total % 60
	].map((n) => String(n).padStart(2, "0")).join(":");
}
function roundHours(hours) {
	return Math.round(hours * 4) / 4;
}
function downloadCsv(filename, rows) {
	const body = rows.map((row) => row.map((cell) => {
		const value = String(cell ?? "");
		if (/[",\n]/.test(value)) return `"${value.replace(/"/g, "\"\"")}"`;
		return value;
	}).join(",")).join("\n");
	const blob = new Blob([body], { type: "text/csv;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function downloadText(filename, body) {
	const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
var LIFECYCLE_STAGES = [
	{
		id: "idea",
		label: "Idea",
		verb: "Shape it",
		note: "Concept, market, and model before you register."
	},
	{
		id: "start",
		label: "Start",
		verb: "Set it up",
		note: "Identity, legal, insurance, and the first operating stack."
	},
	{
		id: "run",
		label: "Run",
		verb: "Operate",
		note: "Daily command: work, cash, customers, and compliance."
	},
	{
		id: "grow",
		label: "Grow",
		verb: "Scale",
		note: "Pipeline, people, and the systems that hold more load."
	},
	{
		id: "transform",
		label: "Transform",
		verb: "Pivot",
		note: "New markets, acquisitions, or a deliberate change of model."
	},
	{
		id: "exit",
		label: "Exit",
		verb: "Hand over",
		note: "Valuation, buyer pack, and a complete Business Passport."
	}
];
function stageLabel(id) {
	return LIFECYCLE_STAGES.find((s) => s.id === id)?.label ?? id;
}
function stageNote(id) {
	return LIFECYCLE_STAGES.find((s) => s.id === id)?.note ?? "";
}
var LAUNCH_AREAS = [
	{
		id: "identity",
		label: "Identity"
	},
	{
		id: "legal",
		label: "Legal"
	},
	{
		id: "finance",
		label: "Finance"
	},
	{
		id: "insurance",
		label: "Insurance"
	},
	{
		id: "brand",
		label: "Brand"
	},
	{
		id: "digital",
		label: "Digital"
	}
];
var VAULT_KINDS = [
	{
		id: "contract",
		label: "Contract"
	},
	{
		id: "policy",
		label: "Policy"
	},
	{
		id: "licence",
		label: "Licence"
	},
	{
		id: "corporate",
		label: "Corporate"
	},
	{
		id: "ip",
		label: "IP"
	},
	{
		id: "other",
		label: "Other"
	}
];
var AI_AGENTS = [
	{
		id: "ceo",
		title: "Vantage CEO",
		brief: "Strategy, trade-offs, and the week's one decision."
	},
	{
		id: "cfo",
		title: "Vantage CFO",
		brief: "Cash, invoices, margin, and what to collect first."
	},
	{
		id: "coo",
		title: "Vantage COO",
		brief: "Delivery load, bottlenecks, and the next operating move."
	},
	{
		id: "cmo",
		title: "Vantage CMO",
		brief: "Pipeline, accounts, and where demand is stalling."
	},
	{
		id: "legal",
		title: "Vantage Legal",
		brief: "Obligations, renewals, and what must not slip."
	}
];
var AI_LEVELS = [
	{
		id: "observe",
		label: "Observe",
		note: "Read the graph. No recommendations."
	},
	{
		id: "recommend",
		label: "Recommend",
		note: "Advise. You decide."
	},
	{
		id: "prepare",
		label: "Prepare",
		note: "Draft the next action. You still approve."
	}
];
var DEFAULT_AI_PERMISSIONS = {
	ceo: "recommend",
	cfo: "recommend",
	coo: "recommend",
	cmo: "recommend",
	legal: "observe"
};
var LEDGERS = [
	{
		id: "xero",
		name: "Xero",
		note: "Cloud ledger. Widest adviser network in Australia.",
		href: "https://login.xero.com/"
	},
	{
		id: "myob",
		name: "MYOB",
		note: "Local payroll depth for more complex files.",
		href: "https://login.myob.com/"
	},
	{
		id: "quickbooks",
		name: "QuickBooks",
		note: "Intuit. A lighter start for smaller firms.",
		href: "https://quickbooks.intuit.com/au/"
	},
	{
		id: "reckon",
		name: "Reckon",
		note: "Australian-owned. Data hosted in Australia.",
		href: "https://www.reckon.com/au/"
	}
];
var LINKED_SYSTEMS = [
	{
		id: "hubspot",
		name: "HubSpot",
		role: "Customer and marketing system"
	},
	{
		id: "stripe",
		name: "Stripe",
		role: "Payments infrastructure"
	},
	{
		id: "microsoft",
		name: "Microsoft 365",
		role: "Productivity layer"
	}
];
var CDXI_PACKAGES = [
	{
		id: "launch-lite",
		name: "Launch Lite",
		price: "from $4,800",
		note: "Identity, site, and a clean start for a new firm."
	},
	{
		id: "launch-pro",
		name: "Launch Pro",
		price: "from $9,800",
		note: "Brand, site, and operating setup with cdxi in the room."
	},
	{
		id: "business-build",
		name: "Business Build",
		price: "from $18,000",
		note: "Full operating system implementation on this workspace."
	},
	{
		id: "growth-system",
		name: "Growth System",
		price: "from $28,000",
		note: "Pipeline, marketing, and the systems that scale the firm."
	}
];
var EMPTY_BUSINESS = {
	legalName: "",
	tradingName: "",
	abn: "",
	acn: "",
	entityType: "pty-ltd",
	industry: "",
	founded: "",
	state: "WA",
	website: "",
	directors: ""
};
var EMPTY_IDEA = {
	concept: "",
	market: "",
	model: "",
	nextStep: ""
};
var NORTHLINE_BUSINESS = {
	legalName: "Northline Advisory Pty Ltd",
	tradingName: "Northline Advisory",
	abn: "51 634 201 887",
	acn: "634 201 887",
	entityType: "pty-ltd",
	industry: "Professional services",
	founded: "2019-03-12",
	state: "WA",
	website: "https://cdxi.digital",
	directors: "Alex Kim"
};
var NORTHLINE_IDEA = {
	concept: "An operating partner for mid-market Australian firms that have outgrown founder-led ops.",
	market: "WA professional services, health groups, and industrial operators with $2–20m revenue.",
	model: "Retainer plus scoped transformation programmes. cdxi handles web and systems builds.",
	nextStep: "Close Karratha, renew Acme, and productise the inland freight dashboard."
};
function northlineLaunch() {
	return [
		{
			id: "ln_abn",
			title: "ABN registered",
			area: "identity",
			stage: "start",
			done: true,
			due: "2019-03-20",
			owner: "Alex Kim",
			notes: "ABN 51 634 201 887."
		},
		{
			id: "ln_name",
			title: "Business name on ASIC",
			area: "identity",
			stage: "start",
			done: true,
			due: "2019-03-22",
			owner: "Alex Kim",
			notes: "Northline Advisory."
		},
		{
			id: "ln_mygov",
			title: "myGovID and RAM authorised",
			area: "identity",
			stage: "start",
			done: true,
			due: "2019-04-02",
			owner: "Alex Kim",
			notes: ""
		},
		{
			id: "ln_const",
			title: "Company constitution on file",
			area: "legal",
			stage: "start",
			done: true,
			due: "2019-03-18",
			owner: "Alex Kim",
			notes: "Vault: constitution."
		},
		{
			id: "ln_office",
			title: "Registered office current",
			area: "legal",
			stage: "start",
			done: true,
			due: "2026-07-01",
			owner: "Tom Walsh",
			notes: "Perth CBD."
		},
		{
			id: "ln_xero",
			title: "Accounting ledger connected",
			area: "finance",
			stage: "start",
			done: false,
			due: "2026-09-30",
			owner: "Tom Walsh",
			notes: "Choose Xero, MYOB, QuickBooks, or Reckon in Finance."
		},
		{
			id: "ln_bas",
			title: "BAS cadence in the calendar",
			area: "finance",
			stage: "run",
			done: true,
			due: "2026-10-28",
			owner: "Tom Walsh",
			notes: ""
		},
		{
			id: "ln_pi",
			title: "Professional indemnity current",
			area: "insurance",
			stage: "start",
			done: true,
			due: "2026-11-30",
			owner: "Alex Kim",
			notes: "Renews 30 Nov."
		},
		{
			id: "ln_pl",
			title: "Public liability current",
			area: "insurance",
			stage: "start",
			done: true,
			due: "2026-11-30",
			owner: "Alex Kim",
			notes: ""
		},
		{
			id: "ln_wc",
			title: "Workers compensation (WA)",
			area: "insurance",
			stage: "start",
			done: false,
			due: "2026-10-15",
			owner: "Tom Walsh",
			notes: "Headcount change after Priya."
		},
		{
			id: "ln_brand",
			title: "Brand kit with cdxi",
			area: "brand",
			stage: "start",
			done: true,
			due: "2020-02-01",
			owner: "Priya Nair",
			notes: "Managed service."
		},
		{
			id: "ln_site",
			title: "Public site live",
			area: "digital",
			stage: "start",
			done: true,
			due: "2020-03-01",
			owner: "Priya Nair",
			notes: "cdxi Launch Pro."
		},
		{
			id: "ln_crm",
			title: "Customer graph complete",
			area: "digital",
			stage: "grow",
			done: false,
			due: "2026-09-26",
			owner: "Priya Nair",
			notes: "HubSpot optional. Vantage is the master record."
		},
		{
			id: "ln_play",
			title: "Growth playbook for SA expansion",
			area: "brand",
			stage: "grow",
			done: false,
			due: "2026-10-10",
			owner: "Alex Kim",
			notes: "Tied to Acme plant work."
		},
		{
			id: "ln_exit",
			title: "Shareholder agreement reviewed",
			area: "legal",
			stage: "exit",
			done: false,
			due: "2027-03-01",
			owner: "Alex Kim",
			notes: "Not in play. Keep current."
		}
	];
}
function northlineVault() {
	return [
		{
			id: "v_const",
			title: "Company constitution",
			kind: "corporate",
			addedAt: "2019-03-18",
			renewsOn: "",
			counterparty: "Northline Advisory Pty Ltd",
			extracted: "Replaceable rules displaced. Two ordinary share classes.",
			notes: "Original PDF in the registered office file."
		},
		{
			id: "v_pi",
			title: "Professional indemnity policy",
			kind: "policy",
			addedAt: "2025-11-12",
			renewsOn: "2026-11-30",
			counterparty: "QBE",
			extracted: "Limit $5m. Retroactive date 12 Mar 2019. Excess $5,000.",
			notes: "Broker: Sterling Risk."
		},
		{
			id: "v_pl",
			title: "Public liability policy",
			kind: "policy",
			addedAt: "2025-11-12",
			renewsOn: "2026-11-30",
			counterparty: "QBE",
			extracted: "Limit $20m.",
			notes: ""
		},
		{
			id: "v_msa",
			title: "Harbour Dental master services agreement",
			kind: "contract",
			addedAt: "2025-02-04",
			renewsOn: "2027-02-04",
			counterparty: "Harbour Dental Group",
			extracted: "12-month auto-renew. 60-day notice. IP remains with Northline.",
			notes: "Retainer plus campaign SOWs."
		},
		{
			id: "v_acme",
			title: "Acme Co. expansion SOW",
			kind: "contract",
			addedAt: "2026-09-01",
			renewsOn: "2026-12-15",
			counterparty: "Acme Co.",
			extracted: "Fixed fee $14,800. SA plant in scope. Payment 14 days.",
			notes: "Won deal in delivery."
		},
		{
			id: "v_mark",
			title: "Northline wordmark and icon",
			kind: "ip",
			addedAt: "2020-02-01",
			renewsOn: "",
			counterparty: "cdxi",
			extracted: "Assignment to Northline. cdxi retains a licence for the case study.",
			notes: "Brand kit in the vault."
		}
	];
}
function northlineOfferings() {
	return [
		{
			id: "o_retainer",
			name: "Operations retainer",
			kind: "subscription",
			price: 4800,
			unit: "month",
			active: true
		},
		{
			id: "o_transform",
			name: "Transformation programme",
			kind: "service",
			price: 28e3,
			unit: "engagement",
			active: true
		},
		{
			id: "o_launch",
			name: "Launch advisory",
			kind: "service",
			price: 9600,
			unit: "engagement",
			active: true
		},
		{
			id: "o_dashboard",
			name: "Operating dashboard build",
			kind: "product",
			price: 18400,
			unit: "build",
			active: false
		}
	];
}
function agentSystemPrompt(agent, level) {
	return `${agent === "ceo" ? "You are the Vantage CEO: strategy and decision support for an Australian professional-services firm. Be direct. Name the one decision that matters this week." : agent === "cfo" ? "You are the Vantage CFO. Talk cash, unpaid invoices, GST, and margin. Use the actual dollar figures. No theatre." : agent === "coo" ? "You are the Vantage COO. Talk delivery load, overdue work, hours, and the operating bottleneck." : agent === "cmo" ? "You are the Vantage CMO. Talk pipeline, follow-ups, and where demand is stalling. Do not invent campaigns." : "You are Vantage Legal/Compliance. Talk obligations, insurance renewals, and contracts that are coming due. Stay inside the snapshot. Do not give formal legal advice — flag items to review with counsel."} ${level === "observe" ? "Capability: observe only. Describe what is true. Do not recommend actions." : level === "prepare" ? "Capability: prepare. Recommend, then draft the next concrete action the operator can take in this workspace." : "Capability: recommend. Advise. The operator decides."} Reply with JSON only, no markdown, shape: {"headline": string, "priorities": string[3], "risks": string[2], "wins": string[2], "nextMove": string}. Use actual names and numbers. No fluff.`;
}
function buildPassport(data) {
	const openVault = data.vault.filter((d) => d.renewsOn);
	const openLaunch = data.launchTasks.filter((t) => !t.done);
	return [
		`BUSINESS PASSPORT`,
		data.business.legalName || data.workspaceName,
		`Trading as ${data.business.tradingName || data.workspaceName}`,
		`Stage: ${stageLabel(data.lifecycle)}`,
		data.business.abn ? `ABN ${data.business.abn}` : "ABN not recorded",
		data.business.acn ? `ACN ${data.business.acn}` : "",
		`Entity: ${data.business.entityType} · ${data.business.state || "AU"} · founded ${data.business.founded || "—"}`,
		`Directors: ${data.business.directors || "—"}`,
		`Industry: ${data.business.industry || "—"}`,
		"",
		"PEOPLE",
		...data.team.map((p) => `  ${p.name} · ${p.role} · ${p.status}${p.certifications.length ? ` · ${p.certifications.join(", ")}` : ""}`),
		"",
		"CUSTOMERS",
		...data.customers.map((c) => `  ${c.name} (${c.status}) · ${money(c.value)} · ${c.location}`),
		"",
		"OPEN WORK",
		...data.work.filter((w) => w.status !== "done").map((w) => `  ${w.title} · ${w.status} · due ${w.due} · ${w.owner}`),
		"",
		"PIPELINE",
		...data.deals.filter((d) => d.stage !== "lost").map((d) => `  ${d.title} · ${d.stage} · ${money(d.value)}`),
		"",
		"VAULT",
		...openVault.map((d) => `  ${d.title} · ${d.kind} · renews ${d.renewsOn || "n/a"} · ${d.counterparty}`),
		"",
		"SETUP STILL OPEN",
		...openLaunch.map((t) => `  [${t.area}] ${t.title} · due ${t.due}`),
		"",
		"OFFERINGS",
		...data.offerings.filter((o) => o.active).map((o) => `  ${o.name} · ${money(o.price)} / ${o.unit}`),
		"",
		`Prepared ${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)} in cdxi vantage.`,
		"Hand this pack to a buyer, successor, or incoming operator."
	].filter((line) => line !== "").join("\n");
}
//#endregion
export { northlineLaunch as A, statusTone as B, formatDuration as C, inRange as D, headingDate as E, relativeFrom as F, weekDays as H, roundHours as I, stageLabel as L, northlineVault as M, rangeLabel as N, initials as O, rangeStart as P, stageNote as R, fmtDay as S, gstOf as T, workStatusLabel as U, todayIso as V, agentSystemPrompt as _, DEFAULT_AI_PERMISSIONS as a, downloadCsv as b, LAUNCH_AREAS as c, LINKED_SYSTEMS as d, NORTHLINE_BUSINESS as f, addDaysIso as g, WORK_STATUS as h, DEAL_STAGES as i, northlineOfferings as j, money as k, LEDGERS as l, VAULT_KINDS as m, AI_LEVELS as n, EMPTY_BUSINESS as o, NORTHLINE_IDEA as p, CDXI_PACKAGES as r, EMPTY_IDEA as s, AI_AGENTS as t, LIFECYCLE_STAGES as u, buildPassport as v, greeting as w, downloadText as x, dealStageLabel as y, startOfWeekIso as z };
