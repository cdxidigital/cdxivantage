import { c as isValid, r as format, t as parseISO } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seed-BG5wNt-f.js
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
/** The fourtee2 wordmark is never title case. */
function brandCase(value) {
	return value.replace(/fourtee2/gi, "fourtee2");
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
	},
	{
		id: "assist",
		title: "Vantage Assist",
		brief: "Issues in the workspace, and Australian business law for the state that applies."
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
	legal: "observe",
	assist: "recommend"
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
	return `${agent === "ceo" ? "You are the Vantage CEO: strategy and decision support for an Australian professional-services firm. Be direct. Name the one decision that matters this week." : agent === "cfo" ? "You are the Vantage CFO. Talk cash, unpaid invoices, GST, and margin. Use the actual dollar figures. No theatre." : agent === "coo" ? "You are the Vantage COO. Talk delivery load, overdue work, hours, and the operating bottleneck." : agent === "cmo" ? "You are the Vantage CMO. Talk pipeline, follow-ups, and where demand is stalling. Do not invent campaigns." : agent === "assist" ? assistRole() : "You are Vantage Legal/Compliance. Talk obligations, insurance renewals, and contracts that are coming due. Stay inside the snapshot. Do not give formal legal advice — flag items to review with counsel."} ${level === "observe" ? "Capability: observe only. Describe what is true. Do not recommend actions." : level === "prepare" ? "Capability: prepare. Recommend, then draft the next concrete action the operator can take in this workspace." : "Capability: recommend. Advise. The operator decides."} Reply with JSON only, no markdown, shape: {"headline": string, "priorities": string[3], "risks": string[2], "wins": string[2], "nextMove": string}. Use actual names and numbers from the snapshot. No fluff.`;
}
function assistRole() {
	return [
		"You are Vantage Assist for an Australian business. Two jobs: (1) issues inside this workspace, (2) Australian business law, Commonwealth and every state and territory.",
		"Home state is business.state in the snapshot. Start there. If the worker, the lease, the land, or the customer is in another state, that state's law can govern instead. Say which one.",
		"Workspace: name the screen and the next control. You cannot change records, connect a portal, or file anything. Screens are Overview, Inbox, Launch, Work, Pipeline, Customers, Finance, Time, Calendar, People, Vault, Compliance, Reports, Settings. Portal sign-in stays on the official site (myID, ABRS, ATO Online Services). One ledger: Xero, MYOB, QuickBooks, or Reckon. If an accountant is on the file, name them for tax or lodgement.",
		"Law is general information, not legal advice and not a tax opinion. It does not replace a lawyer, the operator's accountant, or a registered tax agent. When the question is legal, nextMove must say to confirm before relying on it.",
		"Name the jurisdiction and the Act by its short title. Do not invent section numbers, dollar thresholds, rates, fines, cases, or form numbers. If you are unsure, say so and name the office to check.",
		"Commonwealth, every state: Corporations Act 2001 (directors' duties, insolvent trading, ASIC); business names on ASIC; ABN and GST via the Australian Business Register; Australian Consumer Law (misleading conduct, consumer guarantees, unfair contract terms for small business); Fair Work Act 2009 (National Employment Standards, awards, unfair dismissal, general protections, sham contracting); Superannuation Guarantee (Administration) Act 1992; GST and PAYG; Privacy Act 1988, including the small-business exemption and its exceptions; Personal Property Securities Act 2009; Spam Act 2003.",
		"Workers compensation: WA Workers Compensation and Injury Management Act 2023; NSW Workers Compensation Act 1987; VIC Workplace Injury Rehabilitation and Compensation Act 2013; QLD Workers' Compensation and Rehabilitation Act 2003; SA Return to Work Act 2014; TAS Workers Rehabilitation and Compensation Act 1988; ACT Workers Compensation Act 1951; NT Return to Work Act 1986.",
		"Safety: model Work Health and Safety Acts in NSW, QLD, SA, TAS, ACT, NT, and WA (Work Health and Safety Act 2020). Victoria is the Occupational Health and Safety Act 2004, not the model Act.",
		"Payroll tax is state revenue: Revenue NSW, State Revenue Office Victoria, Queensland Revenue Office, RevenueWA, RevenueSA, State Revenue Office Tasmania, ACT Revenue Office, Territory Revenue Office NT. Do not quote a threshold.",
		"Transfer duty and land tax follow the state where the asset is. Shop leases: NSW Retail Leases Act 1994; VIC Retail Leases Act 2003; QLD Retail Shop Leases Act 1994; WA Commercial Tenancy (Retail Shops) Agreements Act 1985; SA Retail and Commercial Leases Act 1995; TAS Fair Trading (Code of Practice for Retail Tenancies) Regulations; ACT Leases (Commercial and Retail) Act 2001; NT Business Tenancies (Fair Dealings) Act 2003.",
		"Long service leave is state legislation, with separate portable schemes in construction and some community sectors. Partnerships and incorporated associations are state Acts. Building, real estate, and liquor licences are state. Many health professions are national under Ahpra."
	].join(" ");
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
var PORTALS = [
	{
		id: "mygov",
		name: "myID + RAM",
		label: "Digital ID",
		description: "myID, formerly myGovID, proves who you are. RAM authorises you to act for the business.",
		href: "https://www.myid.gov.au/",
		accent: "purple",
		prerequisites: "myID app at Standard or Strong, plus a RAM authorisation"
	},
	{
		id: "asic",
		name: "ASIC Connect",
		label: "Company & business names",
		description: "Company, business name, annual statement, and registry tasks. Sign in only on the ASIC domain.",
		href: "https://asicconnect.asic.gov.au/",
		accent: "cyan",
		prerequisites: "ASIC Connect account and an authorised role"
	},
	{
		id: "abr",
		name: "ABRS",
		label: "ABN & business registry",
		description: "Australian Business Registry Services for the ABN and the registry details that used to sit on the ABR.",
		href: "https://www.abrs.gov.au/",
		accent: "blue",
		prerequisites: "myID and authority for this ABN"
	},
	{
		id: "ato",
		name: "ATO online services",
		label: "Tax & BAS",
		description: "Online services for business: activity statements, accounts, and lodgment. Sign in with myID.",
		href: "https://onlineservices.ato.gov.au/",
		accent: "blue",
		prerequisites: "myID and RAM access to this business"
	}
];
var NORTHLINE_TEAM = [
	{
		id: "t_alex",
		name: "Alex Kim",
		role: "Admin",
		email: "alex@cdxi.digital",
		status: "active",
		certifications: ["GAICD", "ISO 9001 lead"],
		startedAt: "2019-03-12"
	},
	{
		id: "t_priya",
		name: "Priya Nair",
		role: "Customer success",
		email: "priya@cdxi.digital",
		status: "active",
		certifications: ["CSM"],
		startedAt: "2022-06-01"
	},
	{
		id: "t_tom",
		name: "Tom Walsh",
		role: "Operations",
		email: "tom@cdxi.digital",
		status: "active",
		certifications: ["PMP"],
		startedAt: "2021-01-18"
	}
];
var customers = [
	{
		id: "c_harbour",
		name: "Harbour Dental Group",
		contact: "Mia Chen",
		email: "mia.chen@harbourdental.au",
		status: "active",
		value: 48200,
		industry: "Health",
		location: "Fremantle, WA",
		notes: "Four-site dental group. Retainer plus campaign work.",
		followUp: "2026-09-11"
	},
	{
		id: "c_westport",
		name: "Westport Logistics",
		contact: "Daniel Okonkwo",
		email: "daniel@westportlog.com",
		status: "active",
		value: 62400,
		industry: "Transport",
		location: "Kwinana, WA",
		notes: "Stevedore and inland freight. Quarterly ops reviews.",
		followUp: ""
	},
	{
		id: "c_acme",
		name: "Acme Co.",
		contact: "Sarah Nguyen",
		email: "sarah@acmeco.com.au",
		status: "active",
		value: 36800,
		industry: "Manufacturing",
		location: "Canning Vale, WA",
		notes: "Renewal due this month. Expanding into SA.",
		followUp: "2026-09-09"
	},
	{
		id: "c_karratha",
		name: "Karratha Mining Services",
		contact: "Brett Holloway",
		email: "brett@karrathamining.com.au",
		status: "prospect",
		value: 54e3,
		industry: "Resources",
		location: "Karratha, WA",
		notes: "Site visit this month. Proposal in draft.",
		followUp: "2026-09-12"
	},
	{
		id: "c_swan",
		name: "Swan River Legal",
		contact: "Priya Nair",
		email: "priya@swanriverlegal.com",
		status: "active",
		value: 22500,
		industry: "Professional services",
		location: "Perth, WA",
		notes: "Boutique commercial firm. Light retainer.",
		followUp: ""
	}
];
var work = [
	{
		id: "w_q3",
		title: "Q3 executive review",
		team: "Strategy · Internal",
		status: "scheduled",
		priority: "high",
		due: "2026-09-10",
		owner: "Alex Kim",
		notes: "Board pack, pipeline, and cash position.",
		createdAt: "2026-08-28",
		hours: 3,
		checklist: [
			{
				id: "q3a",
				title: "Board pack outline",
				done: true
			},
			{
				id: "q3b",
				title: "Cash position",
				done: false
			},
			{
				id: "q3c",
				title: "Pipeline slide",
				done: false
			}
		]
	},
	{
		id: "w_acme",
		title: "Acme Co. renewal call",
		team: "Customer success · External",
		customerId: "c_acme",
		status: "in-progress",
		priority: "high",
		due: "2026-09-11",
		owner: "Priya Nair",
		notes: "12-month retainer, plus expansion to SA plants.",
		createdAt: "2026-08-20",
		hours: 2.5,
		checklist: [{
			id: "ac1",
			title: "Renewal model",
			done: true
		}, {
			id: "ac2",
			title: "SA plant scope",
			done: false
		}]
	},
	{
		id: "w_harbour",
		title: "Harbour Dental onboarding",
		team: "Customer success · External",
		customerId: "c_harbour",
		status: "in-progress",
		priority: "medium",
		due: "2026-09-12",
		owner: "Priya Nair",
		notes: "Four-clinic brand rollout and operating cadence.",
		createdAt: "2026-08-22",
		hours: 4,
		checklist: [{
			id: "hb1",
			title: "Workshop in Fremantle",
			done: true
		}, {
			id: "hb2",
			title: "Content calendar",
			done: false
		}]
	},
	{
		id: "w_westport",
		title: "Westport extra capacity",
		team: "Operations · External",
		customerId: "c_westport",
		status: "needs-review",
		priority: "medium",
		due: "2026-09-09",
		owner: "Tom Walsh",
		notes: "Inland freight dashboard close-out.",
		createdAt: "2026-08-12",
		hours: 11,
		checklist: [
			{
				id: "wp1",
				title: "Dashboard QA",
				done: true
			},
			{
				id: "wp2",
				title: "Handover notes",
				done: true
			},
			{
				id: "wp3",
				title: "Client sign-off",
				done: false
			}
		]
	},
	{
		id: "w_karratha",
		title: "Karratha site visit brief",
		team: "Strategy · External",
		customerId: "c_karratha",
		status: "scheduled",
		priority: "high",
		due: "2026-09-12",
		owner: "Alex Kim",
		notes: "Three-year ops advisory. Proposal in draft.",
		createdAt: "2026-09-01",
		hours: 0,
		checklist: [{
			id: "ka1",
			title: "Travel pack",
			done: false
		}]
	},
	{
		id: "w_bas",
		title: "BAS Q1 lodgement",
		team: "Finance · Internal",
		status: "scheduled",
		priority: "high",
		due: "2026-09-15",
		owner: "Tom Walsh",
		notes: "GST reconciliation before the ATO window.",
		createdAt: "2026-09-02",
		hours: 2.5,
		checklist: [{
			id: "ba1",
			title: "GST rec",
			done: true
		}]
	},
	{
		id: "w_ops",
		title: "Operations planning",
		team: "Operations · Internal",
		status: "scheduled",
		priority: "medium",
		due: "2026-09-16",
		owner: "Tom Walsh",
		notes: "Q4 capacity and hiring.",
		createdAt: "2026-09-03",
		hours: 0,
		checklist: []
	},
	{
		id: "w_asic",
		title: "ASIC annual statement FY25",
		team: "Compliance · Internal",
		status: "done",
		priority: "medium",
		due: "2026-09-08",
		owner: "Alex Kim",
		notes: "Director details checked. Lodged.",
		createdAt: "2026-08-15",
		hours: 2,
		checklist: [{
			id: "as1",
			title: "Director details",
			done: true
		}]
	}
];
var finance = [
	{
		id: "f_1044",
		type: "invoice",
		customerId: "c_harbour",
		title: "INV-1044 Harbour Dental September retainer",
		amount: 4800,
		gst: gstOf(4800),
		status: "overdue",
		date: "2026-09-01"
	},
	{
		id: "f_1042",
		type: "invoice",
		customerId: "c_acme",
		title: "INV-1042 Acme Co. expansion study",
		amount: 14800,
		gst: gstOf(14800),
		status: "outstanding",
		date: "2026-09-04"
	},
	{
		id: "f_1041",
		type: "invoice",
		customerId: "c_westport",
		title: "INV-1041 Westport Q2 close-out",
		amount: 6200,
		gst: gstOf(6200),
		status: "paid",
		date: "2026-08-28"
	},
	{
		id: "f_1038",
		type: "invoice",
		customerId: "c_swan",
		title: "INV-1038 Swan River Legal August",
		amount: 2200,
		gst: gstOf(2200),
		status: "paid",
		date: "2026-08-22"
	},
	{
		id: "f_pay220",
		type: "payment",
		title: "PAY-220 GST BAS Q4",
		amount: 1186,
		gst: 0,
		status: "paid",
		date: "2026-08-18"
	},
	{
		id: "f_exp88",
		type: "expense",
		title: "EXP-88 Sterling Risk PI",
		amount: 1240,
		gst: gstOf(1240),
		status: "paid",
		date: "2026-08-12"
	}
];
var events = [
	{
		id: "e_pack",
		title: "Q3 board pack working session",
		date: "2026-09-09",
		time: "09:00",
		kind: "internal",
		location: "Studio",
		relatedWorkId: "w_q3"
	},
	{
		id: "e_west",
		title: "Westport handover",
		date: "2026-09-09",
		time: "14:00",
		kind: "external",
		location: "Kwinana",
		relatedWorkId: "w_westport"
	},
	{
		id: "e_q3",
		title: "Q3 executive review",
		date: "2026-09-10",
		time: "10:00",
		kind: "internal",
		location: "Boardroom",
		relatedWorkId: "w_q3"
	},
	{
		id: "e_acme",
		title: "Acme Co. renewal call",
		date: "2026-09-11",
		time: "11:00",
		kind: "external",
		location: "Video",
		relatedWorkId: "w_acme"
	},
	{
		id: "e_harb",
		title: "Harbour Dental onboarding",
		date: "2026-09-12",
		time: "09:30",
		kind: "external",
		location: "Fremantle",
		relatedWorkId: "w_harbour"
	},
	{
		id: "e_bas",
		title: "BAS Q1 working session",
		date: "2026-09-15",
		time: "13:00",
		kind: "internal",
		location: "Studio",
		relatedWorkId: "w_bas"
	},
	{
		id: "e_ops",
		title: "Operations planning",
		date: "2026-09-16",
		time: "09:00",
		kind: "internal",
		location: "Studio",
		relatedWorkId: "w_ops"
	}
];
var compliance = [
	{
		id: "k1",
		title: "Workers compensation — WA",
		category: "Employment",
		authority: "WorkCover WA",
		jurisdiction: "Western Australia",
		status: "Urgent",
		due: "2026-09-18",
		owner: "Tom Walsh",
		evidence: false,
		source: "https://www.workcover.wa.gov.au/"
	},
	{
		id: "k2",
		title: "PAYG withholding",
		category: "Tax",
		authority: "ATO",
		jurisdiction: "Commonwealth",
		status: "Urgent",
		due: "2026-09-21",
		owner: "Tom Walsh",
		evidence: false,
		source: "https://www.ato.gov.au/"
	},
	{
		id: "k3",
		title: "Professional indemnity",
		category: "Insurance",
		authority: "Insurance Council / broker",
		jurisdiction: "Western Australia",
		status: "Due soon",
		due: "2026-11-30",
		owner: "Alex Kim",
		evidence: true,
		source: "https://www.insurancecouncil.com.au/"
	},
	{
		id: "k4",
		title: "ASIC annual statement",
		category: "Registration",
		authority: "ASIC",
		jurisdiction: "Commonwealth",
		status: "Due soon",
		due: "2027-03-12",
		owner: "Alex Kim",
		evidence: true,
		source: "https://asic.gov.au/"
	},
	{
		id: "k5",
		title: "ABN registration",
		category: "Registration",
		authority: "ABR",
		jurisdiction: "Commonwealth",
		status: "Up to date",
		due: "2027-06-30",
		owner: "Tom Walsh",
		evidence: true,
		source: "https://www.abr.gov.au/"
	},
	{
		id: "k6",
		title: "Public liability",
		category: "Insurance",
		authority: "Insurance Council / broker",
		jurisdiction: "Western Australia",
		status: "Up to date",
		due: "2026-11-30",
		owner: "Alex Kim",
		evidence: true,
		source: "https://www.insurancecouncil.com.au/"
	},
	{
		id: "k7",
		title: "Privacy Act APP review",
		category: "Privacy",
		authority: "OAIC",
		jurisdiction: "Commonwealth",
		status: "Up to date",
		due: "2026-12-01",
		owner: "Alex Kim",
		evidence: true,
		source: "https://www.oaic.gov.au/"
	},
	{
		id: "k8",
		title: "Super guarantee contributions",
		category: "Employment",
		authority: "ATO",
		jurisdiction: "Commonwealth",
		status: "Up to date",
		due: "2026-10-28",
		owner: "Tom Walsh",
		evidence: true,
		source: "https://www.ato.gov.au/businesses-and-organisations/super-for-employers"
	}
];
var activities = [
	{
		id: "a1",
		name: "Alex Kim",
		action: "created",
		detail: "Karratha site visit brief",
		time: "2h ago",
		initials: "AK",
		color: "blue",
		at: "2026-09-08T22:10:00.000Z"
	},
	{
		id: "a2",
		name: "Priya Nair",
		action: "moved",
		detail: "Harbour Dental onboarding → In progress",
		time: "4h ago",
		initials: "PN",
		color: "coral",
		at: "2026-09-08T20:05:00.000Z"
	},
	{
		id: "a3",
		name: "Tom Walsh",
		action: "logged",
		detail: "Westport extra capacity",
		time: "Yesterday",
		initials: "TW",
		color: "violet",
		at: "2026-09-08T04:20:00.000Z"
	},
	{
		id: "a4",
		name: "Alex Kim",
		action: "reviewed",
		detail: "Payroll tax — WA",
		time: "Yesterday",
		initials: "AK",
		color: "blue",
		at: "2026-09-07T23:40:00.000Z"
	},
	{
		id: "a5",
		name: "Priya Nair",
		action: "added",
		detail: "Swan River Legal as a customer",
		time: "2d ago",
		initials: "PN",
		color: "coral",
		at: "2026-09-07T06:15:00.000Z"
	}
];
var timeLogs = [
	{
		id: "tl1",
		workId: "w_westport",
		hours: 6,
		note: "Dashboard QA and handover notes",
		date: "2026-09-08",
		person: "Tom Walsh"
	},
	{
		id: "tl2",
		workId: "w_westport",
		hours: 5,
		note: "Ops close-out workshop",
		date: "2026-09-05",
		person: "Tom Walsh"
	},
	{
		id: "tl3",
		workId: "w_harbour",
		hours: 4,
		note: "Onboarding workshop at Fremantle",
		date: "2026-09-07",
		person: "Priya Nair"
	},
	{
		id: "tl4",
		workId: "w_acme",
		hours: 2.5,
		note: "Renewal modelling",
		date: "2026-09-08",
		person: "Priya Nair"
	},
	{
		id: "tl5",
		workId: "w_asic",
		hours: 2,
		note: "Director details check",
		date: "2026-09-06",
		person: "Alex Kim"
	},
	{
		id: "tl6",
		workId: "w_q3",
		hours: 3,
		note: "Board pack first pass",
		date: "2026-09-09",
		person: "Alex Kim"
	},
	{
		id: "tl7",
		workId: "w_bas",
		hours: 2.5,
		note: "GST reconciliation",
		date: "2026-09-09",
		person: "Tom Walsh"
	}
];
var deals = [
	{
		id: "d_karratha",
		title: "Karratha operations retainer",
		customerId: "c_karratha",
		stage: "proposal",
		value: 54e3,
		owner: "Alex Kim",
		closeDate: "2026-09-30",
		notes: "Site visit this month. Three-year ops advisory."
	},
	{
		id: "d_harbour",
		title: "Harbour Dental Q4 campaign",
		customerId: "c_harbour",
		stage: "qualified",
		value: 18600,
		owner: "Priya Nair",
		closeDate: "2026-09-22",
		notes: "Brand rollout plus four-clinic content."
	},
	{
		id: "d_westport",
		title: "Westport inland freight dashboard",
		customerId: "c_westport",
		stage: "qualified",
		value: 28400,
		owner: "Tom Walsh",
		closeDate: "2026-10-08",
		notes: "Follow-on from Q2 close-out."
	},
	{
		id: "d_swan",
		title: "Swan River Legal knowledge base",
		customerId: "c_swan",
		stage: "lead",
		value: 9200,
		owner: "Priya Nair",
		closeDate: "2026-10-15",
		notes: "Intro conversation after retainer review."
	},
	{
		id: "d_perth_port",
		title: "Fremantle precinct advisory",
		stage: "lead",
		value: 16e3,
		owner: "Alex Kim",
		closeDate: "2026-10-20",
		notes: "Inbound from a trade event. No account yet."
	},
	{
		id: "d_acme_won",
		title: "Acme plant expansion study",
		customerId: "c_acme",
		stage: "won",
		value: 14800,
		owner: "Priya Nair",
		closeDate: "2026-09-01",
		notes: "Converted. Delivery is underway."
	},
	{
		id: "d_lost",
		title: "Bunbury ports advisory",
		stage: "lost",
		value: 22e3,
		owner: "Alex Kim",
		closeDate: "2026-08-20",
		notes: "Went in-house after the first workshop."
	}
];
var DEFAULT_IDENTITY = {
	workspaceName: "Northline Advisory",
	profile: {
		name: "Alex Kim",
		email: "alex@cdxi.digital",
		role: "Admin",
		initials: "AK"
	}
};
function teamFromProfile(profile) {
	return [{
		id: "t_self",
		name: profile.name,
		role: profile.role,
		email: profile.email,
		status: "active",
		certifications: [],
		startedAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
	}];
}
function personDefaults(member) {
	return {
		id: member.id,
		name: member.name,
		role: member.role,
		email: member.email,
		status: member.status ?? "active",
		certifications: member.certifications ?? [],
		startedAt: member.startedAt ?? ""
	};
}
function emptyWorkspace(keep = DEFAULT_IDENTITY) {
	return {
		...keep,
		signedIn: true,
		customers: [],
		work: [],
		finance: [],
		events: [],
		compliance: [],
		activities: [],
		connectedPortals: [],
		lastChecked: {},
		noticeVisible: false,
		team: teamFromProfile(keep.profile),
		timeLogs: [],
		snoozedUntil: {},
		clearedInbox: [],
		deals: [],
		insight: null,
		theme: "light",
		timer: null,
		lifecycle: "idea",
		business: {
			...EMPTY_BUSINESS,
			legalName: brandCase(keep.workspaceName),
			tradingName: brandCase(keep.workspaceName)
		},
		ideaCanvas: { ...EMPTY_IDEA },
		launchTasks: [],
		vault: [],
		offerings: [],
		agentBriefs: {},
		aiPermissions: { ...DEFAULT_AI_PERMISSIONS },
		linkedSystems: [],
		tourDone: false,
		accountant: null,
		ledger: null
	};
}
/** The Northline sample was written as if this day were "today". */
var DEMO_AS_OF = "2026-09-10";
function demoShiftDays(now = /* @__PURE__ */ new Date()) {
	const from = Date.parse(`${DEMO_AS_OF}T00:00:00Z`);
	const to = Date.parse(`${todayIso(now)}T00:00:00Z`);
	if (!Number.isFinite(from) || !Number.isFinite(to)) return 0;
	return Math.round((to - from) / 864e5);
}
function shiftKeptDate(current, original, days) {
	if (days === 0 || current !== original || original < "2026-08-01") return current;
	const next = addDaysIso(original.slice(0, 10), days);
	return original.length > 10 ? `${next}${original.slice(10)}` : next;
}
function alignRows(rows, originals, keys, days) {
	if (days === 0) return rows;
	const byId = new Map(originals.map((row) => [row.id, row]));
	return rows.map((row) => {
		const src = byId.get(row.id);
		if (!src) return row;
		const next = { ...row };
		let changed = false;
		for (const key of keys) {
			const value = row[key];
			const from = src[key];
			if (typeof value !== "string" || typeof from !== "string") continue;
			const shifted = shiftKeptDate(value, from, days);
			if (shifted !== value) {
				next[key] = shifted;
				changed = true;
			}
		}
		return changed ? next : row;
	});
}
function alignDemoCollections(data, now = /* @__PURE__ */ new Date()) {
	const days = demoShiftDays(now);
	if (days === 0) return data;
	const nextActivities = alignRows(data.activities, activities, ["at"], days).map((item) => {
		const src = activities.find((row) => row.id === item.id);
		if (!src || item.at === src.at) return item;
		return {
			...item,
			time: relativeFrom(item.at, now)
		};
	});
	return {
		...data,
		customers: alignRows(data.customers, customers, ["followUp"], days),
		work: alignRows(data.work, work, ["due", "createdAt"], days),
		finance: alignRows(data.finance, finance, ["date"], days),
		events: alignRows(data.events, events, ["date"], days),
		compliance: alignRows(data.compliance, compliance, ["due"], days),
		activities: nextActivities,
		timeLogs: alignRows(data.timeLogs, timeLogs, ["date"], days),
		deals: alignRows(data.deals, deals, ["closeDate"], days),
		launchTasks: alignRows(data.launchTasks, northlineLaunch(), ["due"], days),
		vault: alignRows(data.vault, northlineVault(), ["renewsOn"], days)
	};
}
function createSeed() {
	return alignDemoCollections({
		...emptyWorkspace(DEFAULT_IDENTITY),
		customers: structuredClone(customers),
		work: structuredClone(work),
		finance: structuredClone(finance),
		events: structuredClone(events),
		compliance: structuredClone(compliance),
		activities: structuredClone(activities),
		timeLogs: structuredClone(timeLogs),
		team: structuredClone(NORTHLINE_TEAM),
		deals: structuredClone(deals),
		noticeVisible: true,
		lifecycle: "grow",
		business: { ...NORTHLINE_BUSINESS },
		ideaCanvas: { ...NORTHLINE_IDEA },
		launchTasks: northlineLaunch(),
		vault: northlineVault(),
		offerings: northlineOfferings(),
		linkedSystems: [],
		tourDone: true
	});
}
function cleanBrief(brief) {
	if (!brief?.headline) return null;
	const lines = (value) => Array.isArray(value) ? value.map((item) => String(item)).filter(Boolean) : [];
	return {
		...brief,
		headline: String(brief.headline),
		priorities: lines(brief.priorities),
		risks: lines(brief.risks),
		wins: lines(brief.wins),
		nextMove: String(brief.nextMove ?? ""),
		at: brief.at || (/* @__PURE__ */ new Date()).toISOString()
	};
}
function cleanAccountant(value) {
	if (!value?.name) return null;
	const engagement = [
		"bas",
		"tax",
		"advisory",
		"full"
	].includes(value.engagement) ? value.engagement : "full";
	return {
		name: String(value.name),
		firm: String(value.firm ?? ""),
		email: String(value.email ?? ""),
		phone: String(value.phone ?? ""),
		engagement
	};
}
function cleanLedger(value, systems) {
	if (value === "xero" || value === "myob" || value === "quickbooks" || value === "reckon") return value;
	return systems?.includes("xero") ? "xero" : null;
}
function normalizeWorkspace(raw) {
	const profile = raw.profile?.name ? {
		...raw.profile,
		initials: raw.profile.initials || initials(raw.profile.name)
	} : DEFAULT_IDENTITY.profile;
	const workspaceName = brandCase(raw.workspaceName?.trim() || DEFAULT_IDENTITY.workspaceName);
	const base = emptyWorkspace({
		workspaceName,
		profile
	});
	const demo = createSeed();
	const customers = (raw.customers ?? []).map((c) => ({
		...c,
		followUp: c.followUp ?? ""
	}));
	const work = (raw.work ?? []).map((w) => ({
		...w,
		hours: w.hours ?? 0,
		checklist: w.checklist ?? demo.work.find((item) => item.id === w.id)?.checklist ?? []
	}));
	const finance = (raw.finance ?? []).map((f) => ({
		...f,
		gst: typeof f.gst === "number" ? f.gst : f.type === "payment" ? 0 : gstOf(f.amount)
	}));
	const looksLikeDemo = (raw.work ?? []).some((w) => w.id === "w_q3");
	const team = (raw.team?.length ? raw.team : teamFromProfile(profile)).map((member) => personDefaults(member));
	const next = {
		...base,
		...raw,
		workspaceName,
		profile,
		customers,
		work,
		finance,
		team,
		timeLogs: raw.timeLogs ?? (looksLikeDemo ? demo.timeLogs : []),
		snoozedUntil: raw.snoozedUntil ?? {},
		clearedInbox: raw.clearedInbox ?? [],
		deals: raw.deals ?? (looksLikeDemo ? demo.deals : []),
		insight: cleanBrief(raw.insight),
		theme: raw.theme === "dark" ? "dark" : "light",
		timer: raw.timer ?? null,
		signedIn: true,
		lifecycle: raw.lifecycle ?? (looksLikeDemo ? "grow" : "idea"),
		business: (() => {
			const business = {
				...EMPTY_BUSINESS,
				...looksLikeDemo ? NORTHLINE_BUSINESS : {},
				...raw.business ?? {}
			};
			return {
				...business,
				legalName: brandCase(business.legalName),
				tradingName: brandCase(business.tradingName)
			};
		})(),
		ideaCanvas: {
			...EMPTY_IDEA,
			...looksLikeDemo ? NORTHLINE_IDEA : {},
			...raw.ideaCanvas ?? {}
		},
		launchTasks: raw.launchTasks ?? (looksLikeDemo ? demo.launchTasks : []),
		vault: raw.vault ?? (looksLikeDemo ? demo.vault : []),
		offerings: raw.offerings ?? (looksLikeDemo ? demo.offerings : []),
		agentBriefs: Object.fromEntries(Object.entries(raw.agentBriefs ?? {}).map(([id, brief]) => [id, cleanBrief(brief)]).filter((entry) => entry[1] != null)),
		aiPermissions: {
			...DEFAULT_AI_PERMISSIONS,
			...raw.aiPermissions ?? {}
		},
		linkedSystems: raw.linkedSystems?.filter((id) => id === "hubspot" || id === "stripe" || id === "microsoft") ?? [],
		tourDone: typeof raw.tourDone === "boolean" ? raw.tourDone : looksLikeDemo || (raw.customers?.length ?? 0) + (raw.work?.length ?? 0) + (raw.deals?.length ?? 0) > 0,
		accountant: cleanAccountant(raw.accountant),
		ledger: cleanLedger(raw.ledger, raw.linkedSystems)
	};
	return looksLikeDemo ? alignDemoCollections(next) : next;
}
//#endregion
export { normalizeWorkspace as A, weekDays as B, formatDuration as C, inRange as D, headingDate as E, stageLabel as F, stageNote as I, startOfWeekIso as L, rangeStart as M, relativeFrom as N, initials as O, roundHours as P, statusTone as R, fmtDay as S, gstOf as T, workStatusLabel as V, createSeed as _, DEFAULT_AI_PERMISSIONS as a, downloadText as b, LIFECYCLE_STAGES as c, VAULT_KINDS as d, WORK_STATUS as f, buildPassport as g, brandCase as h, DEAL_STAGES as i, rangeLabel as j, money as k, LINKED_SYSTEMS as l, agentSystemPrompt as m, AI_LEVELS as n, LAUNCH_AREAS as o, addDaysIso as p, CDXI_PACKAGES as r, LEDGERS as s, AI_AGENTS as t, PORTALS as u, dealStageLabel as v, greeting as w, emptyWorkspace as x, downloadCsv as y, todayIso as z };
