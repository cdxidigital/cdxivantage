import type {
  AiAgentId,
  AiCapability,
  BusinessRecord,
  IdeaCanvas,
  LaunchArea,
  LaunchTask,
  LedgerId,
  LifecycleStage,
  LinkedSystemId,
  Offering,
  VaultDoc,
  VaultKind,
  VantageData,
} from "./types";
import { money } from "./format";

export const LIFECYCLE_STAGES: { id: LifecycleStage; label: string; verb: string; note: string }[] = [
  { id: "idea", label: "Idea", verb: "Shape it", note: "Concept, market, and model before you register." },
  { id: "start", label: "Start", verb: "Set it up", note: "Identity, legal, insurance, and the first operating stack." },
  { id: "run", label: "Run", verb: "Operate", note: "Daily command: work, cash, customers, and compliance." },
  { id: "grow", label: "Grow", verb: "Scale", note: "Pipeline, people, and the systems that hold more load." },
  { id: "transform", label: "Transform", verb: "Pivot", note: "New markets, acquisitions, or a deliberate change of model." },
  { id: "exit", label: "Exit", verb: "Hand over", note: "Valuation, buyer pack, and a complete Business Passport." },
];

export function stageLabel(id: LifecycleStage) {
  return LIFECYCLE_STAGES.find((s) => s.id === id)?.label ?? id;
}

export function stageNote(id: LifecycleStage) {
  return LIFECYCLE_STAGES.find((s) => s.id === id)?.note ?? "";
}

export const LAUNCH_AREAS: { id: LaunchArea; label: string }[] = [
  { id: "identity", label: "Identity" },
  { id: "legal", label: "Legal" },
  { id: "finance", label: "Finance" },
  { id: "insurance", label: "Insurance" },
  { id: "brand", label: "Brand" },
  { id: "digital", label: "Digital" },
];

export const VAULT_KINDS: { id: VaultKind; label: string }[] = [
  { id: "contract", label: "Contract" },
  { id: "policy", label: "Policy" },
  { id: "licence", label: "Licence" },
  { id: "corporate", label: "Corporate" },
  { id: "ip", label: "IP" },
  { id: "other", label: "Other" },
];

export const AI_AGENTS: { id: AiAgentId; title: string; brief: string }[] = [
  { id: "ceo", title: "Vantage CEO", brief: "Strategy, trade-offs, and the week's one decision." },
  { id: "cfo", title: "Vantage CFO", brief: "Cash, invoices, margin, and what to collect first." },
  { id: "coo", title: "Vantage COO", brief: "Delivery load, bottlenecks, and the next operating move." },
  { id: "cmo", title: "Vantage CMO", brief: "Pipeline, accounts, and where demand is stalling." },
  { id: "legal", title: "Vantage Legal", brief: "Obligations, renewals, and what must not slip." },
  { id: "assist", title: "Vantage Assist", brief: "Issues in the workspace, and Australian business law for the state that applies." },
];

export const AI_LEVELS: { id: AiCapability; label: string; note: string }[] = [
  { id: "observe", label: "Observe", note: "Read the graph. No recommendations." },
  { id: "recommend", label: "Recommend", note: "Advise. You decide." },
  { id: "prepare", label: "Prepare", note: "Draft the next action. You still approve." },
];

export const DEFAULT_AI_PERMISSIONS: Record<AiAgentId, AiCapability> = {
  ceo: "recommend",
  cfo: "recommend",
  coo: "recommend",
  cmo: "recommend",
  legal: "observe",
  assist: "recommend",
};

export const LEDGERS: { id: LedgerId; name: string; note: string; href: string }[] = [
  { id: "xero", name: "Xero", note: "Cloud ledger. Widest adviser network in Australia.", href: "https://login.xero.com/" },
  { id: "myob", name: "MYOB", note: "Local payroll depth for more complex files.", href: "https://login.myob.com/" },
  { id: "quickbooks", name: "QuickBooks", note: "Intuit. A lighter start for smaller firms.", href: "https://quickbooks.intuit.com/au/" },
  { id: "reckon", name: "Reckon", note: "Australian-owned. Data hosted in Australia.", href: "https://www.reckon.com/au/" },
];

export const LINKED_SYSTEMS: { id: LinkedSystemId; name: string; role: string }[] = [
  { id: "hubspot", name: "HubSpot", role: "Customer and marketing system" },
  { id: "stripe", name: "Stripe", role: "Payments infrastructure" },
  { id: "microsoft", name: "Microsoft 365", role: "Productivity layer" },
];

export const CDXI_PACKAGES: { id: string; name: string; price: string; note: string }[] = [
  { id: "launch-lite", name: "Launch Lite", price: "from $4,800", note: "Identity, site, and a clean start for a new firm." },
  { id: "launch-pro", name: "Launch Pro", price: "from $9,800", note: "Brand, site, and operating setup with cdxi in the room." },
  { id: "business-build", name: "Business Build", price: "from $18,000", note: "Full operating system implementation on this workspace." },
  { id: "growth-system", name: "Growth System", price: "from $28,000", note: "Pipeline, marketing, and the systems that scale the firm." },
];

export const EMPTY_BUSINESS: BusinessRecord = {
  legalName: "",
  tradingName: "",
  abn: "",
  acn: "",
  entityType: "pty-ltd",
  industry: "",
  founded: "",
  state: "WA",
  website: "",
  directors: "",
};

export const EMPTY_IDEA: IdeaCanvas = {
  concept: "",
  market: "",
  model: "",
  nextStep: "",
};

export const NORTHLINE_BUSINESS: BusinessRecord = {
  legalName: "Northline Advisory Pty Ltd",
  tradingName: "Northline Advisory",
  abn: "51 634 201 887",
  acn: "634 201 887",
  entityType: "pty-ltd",
  industry: "Professional services",
  founded: "2019-03-12",
  state: "WA",
  website: "https://cdxi.digital",
  directors: "Alex Kim",
};

export const NORTHLINE_IDEA: IdeaCanvas = {
  concept: "An operating partner for mid-market Australian firms that have outgrown founder-led ops.",
  market: "WA professional services, health groups, and industrial operators with $2–20m revenue.",
  model: "Retainer plus scoped transformation programmes. cdxi handles web and systems builds.",
  nextStep: "Close Karratha, renew Acme, and productise the inland freight dashboard.",
};

export function northlineLaunch(): LaunchTask[] {
  return [
    { id: "ln_abn", title: "ABN registered", area: "identity", stage: "start", done: true, due: "2019-03-20", owner: "Alex Kim", notes: "ABN 51 634 201 887." },
    { id: "ln_name", title: "Business name on ASIC", area: "identity", stage: "start", done: true, due: "2019-03-22", owner: "Alex Kim", notes: "Northline Advisory." },
    { id: "ln_mygov", title: "myGovID and RAM authorised", area: "identity", stage: "start", done: true, due: "2019-04-02", owner: "Alex Kim", notes: "" },
    { id: "ln_const", title: "Company constitution on file", area: "legal", stage: "start", done: true, due: "2019-03-18", owner: "Alex Kim", notes: "Vault: constitution." },
    { id: "ln_office", title: "Registered office current", area: "legal", stage: "start", done: true, due: "2026-07-01", owner: "Tom Walsh", notes: "Perth CBD." },
    { id: "ln_xero", title: "Accounting ledger connected", area: "finance", stage: "start", done: false, due: "2026-09-30", owner: "Tom Walsh", notes: "Choose Xero, MYOB, QuickBooks, or Reckon in Finance." },
    { id: "ln_bas", title: "BAS cadence in the calendar", area: "finance", stage: "run", done: true, due: "2026-10-28", owner: "Tom Walsh", notes: "" },
    { id: "ln_pi", title: "Professional indemnity current", area: "insurance", stage: "start", done: true, due: "2026-11-30", owner: "Alex Kim", notes: "Renews 30 Nov." },
    { id: "ln_pl", title: "Public liability current", area: "insurance", stage: "start", done: true, due: "2026-11-30", owner: "Alex Kim", notes: "" },
    { id: "ln_wc", title: "Workers compensation (WA)", area: "insurance", stage: "start", done: false, due: "2026-10-15", owner: "Tom Walsh", notes: "Headcount change after Priya." },
    { id: "ln_brand", title: "Brand kit with cdxi", area: "brand", stage: "start", done: true, due: "2020-02-01", owner: "Priya Nair", notes: "Managed service." },
    { id: "ln_site", title: "Public site live", area: "digital", stage: "start", done: true, due: "2020-03-01", owner: "Priya Nair", notes: "cdxi Launch Pro." },
    { id: "ln_crm", title: "Customer graph complete", area: "digital", stage: "grow", done: false, due: "2026-09-26", owner: "Priya Nair", notes: "HubSpot optional. Vantage is the master record." },
    { id: "ln_play", title: "Growth playbook for SA expansion", area: "brand", stage: "grow", done: false, due: "2026-10-10", owner: "Alex Kim", notes: "Tied to Acme plant work." },
    { id: "ln_exit", title: "Shareholder agreement reviewed", area: "legal", stage: "exit", done: false, due: "2027-03-01", owner: "Alex Kim", notes: "Not in play. Keep current." },
  ];
}

export function northlineVault(): VaultDoc[] {
  return [
    { id: "v_const", title: "Company constitution", kind: "corporate", addedAt: "2019-03-18", renewsOn: "", counterparty: "Northline Advisory Pty Ltd", extracted: "Replaceable rules displaced. Two ordinary share classes.", notes: "Original PDF in the registered office file." },
    { id: "v_pi", title: "Professional indemnity policy", kind: "policy", addedAt: "2025-11-12", renewsOn: "2026-11-30", counterparty: "QBE", extracted: "Limit $5m. Retroactive date 12 Mar 2019. Excess $5,000.", notes: "Broker: Sterling Risk." },
    { id: "v_pl", title: "Public liability policy", kind: "policy", addedAt: "2025-11-12", renewsOn: "2026-11-30", counterparty: "QBE", extracted: "Limit $20m.", notes: "" },
    { id: "v_msa", title: "Harbour Dental master services agreement", kind: "contract", addedAt: "2025-02-04", renewsOn: "2027-02-04", counterparty: "Harbour Dental Group", extracted: "12-month auto-renew. 60-day notice. IP remains with Northline.", notes: "Retainer plus campaign SOWs." },
    { id: "v_acme", title: "Acme Co. expansion SOW", kind: "contract", addedAt: "2026-09-01", renewsOn: "2026-12-15", counterparty: "Acme Co.", extracted: "Fixed fee $14,800. SA plant in scope. Payment 14 days.", notes: "Won deal in delivery." },
    { id: "v_mark", title: "Northline wordmark and icon", kind: "ip", addedAt: "2020-02-01", renewsOn: "", counterparty: "cdxi", extracted: "Assignment to Northline. cdxi retains a licence for the case study.", notes: "Brand kit in the vault." },
  ];
}

export function northlineOfferings(): Offering[] {
  return [
    { id: "o_retainer", name: "Operations retainer", kind: "subscription", price: 4800, unit: "month", active: true },
    { id: "o_transform", name: "Transformation programme", kind: "service", price: 28000, unit: "engagement", active: true },
    { id: "o_launch", name: "Launch advisory", kind: "service", price: 9600, unit: "engagement", active: true },
    { id: "o_dashboard", name: "Operating dashboard build", kind: "product", price: 18400, unit: "build", active: false },
  ];
}

export function agentSystemPrompt(agent: AiAgentId, level: AiCapability) {
  const role =
    agent === "ceo"
      ? "You are the Vantage CEO: strategy and decision support for an Australian professional-services firm. Be direct. Name the one decision that matters this week."
      : agent === "cfo"
        ? "You are the Vantage CFO. Talk cash, unpaid invoices, GST, and margin. Use the actual dollar figures. No theatre."
        : agent === "coo"
          ? "You are the Vantage COO. Talk delivery load, overdue work, hours, and the operating bottleneck."
          : agent === "cmo"
            ? "You are the Vantage CMO. Talk pipeline, follow-ups, and where demand is stalling. Do not invent campaigns."
            : agent === "assist"
              ? assistRole()
              : "You are Vantage Legal/Compliance. Talk obligations, insurance renewals, and contracts that are coming due. Stay inside the snapshot. Do not give formal legal advice — flag items to review with counsel.";
  const cap =
    level === "observe"
      ? "Capability: observe only. Describe what is true. Do not recommend actions."
      : level === "prepare"
        ? "Capability: prepare. Recommend, then draft the next concrete action the operator can take in this workspace."
        : "Capability: recommend. Advise. The operator decides.";
  return `${role} ${cap} Reply with JSON only, no markdown, shape: {"headline": string, "priorities": string[3], "risks": string[2], "wins": string[2], "nextMove": string}. Use actual names and numbers from the snapshot. No fluff.`;
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
    "Long service leave is state legislation, with separate portable schemes in construction and some community sectors. Partnerships and incorporated associations are state Acts. Building, real estate, and liquor licences are state. Many health professions are national under Ahpra.",
  ].join(" ");
}

export function buildPassport(data: VantageData) {
  const openVault = data.vault.filter((d) => d.renewsOn);
  const openLaunch = data.launchTasks.filter((t) => !t.done);
  const lines = [
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
    `Prepared ${new Date().toISOString().slice(0, 10)} in cdxi vantage.`,
    "Hand this pack to a buyer, successor, or incoming operator.",
  ];
  return lines.filter((line) => line !== "").join("\n");
}
