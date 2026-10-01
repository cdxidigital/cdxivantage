import type {
  ActivityItem,
  CalendarEvent,
  ComplianceRecord,
  Customer,
  Deal,
  FinanceRecord,
  Portal,
  TeamMember,
  TimeLog,
  VantageData,
  WorkItem,
} from "./types";
import { addDaysIso, brandCase, gstOf, initials, relativeFrom, todayIso } from "./format";
import {
  DEFAULT_AI_PERMISSIONS,
  EMPTY_BUSINESS,
  EMPTY_IDEA,
  NORTHLINE_BUSINESS,
  NORTHLINE_IDEA,
  northlineLaunch,
  northlineOfferings,
  northlineVault,
} from "./lifecycle";

export const PORTALS: Portal[] = [
  {
    id: "mygov",
    name: "myID + RAM",
    label: "Digital ID",
    description: "myID, formerly myGovID, proves who you are. RAM authorises you to act for the business.",
    href: "https://www.myid.gov.au/",
    accent: "purple",
    prerequisites: "myID app at Standard or Strong, plus a RAM authorisation",
  },
  {
    id: "asic",
    name: "ASIC Connect",
    label: "Company & business names",
    description: "Company, business name, annual statement, and registry tasks. Sign in only on the ASIC domain.",
    href: "https://asicconnect.asic.gov.au/",
    accent: "cyan",
    prerequisites: "ASIC Connect account and an authorised role",
  },
  {
    id: "abr",
    name: "ABRS",
    label: "ABN & business registry",
    description: "Australian Business Registry Services for the ABN and the registry details that used to sit on the ABR.",
    href: "https://www.abrs.gov.au/",
    accent: "blue",
    prerequisites: "myID and authority for this ABN",
  },
  {
    id: "ato",
    name: "ATO online services",
    label: "Tax & BAS",
    description: "Online services for business: activity statements, accounts, and lodgment. Sign in with myID.",
    href: "https://onlineservices.ato.gov.au/",
    accent: "blue",
    prerequisites: "myID and RAM access to this business",
  },
];

export const NORTHLINE_TEAM: TeamMember[] = [
  {
    id: "t_alex",
    name: "Alex Kim",
    role: "Admin",
    email: "alex@cdxi.digital",
    status: "active",
    certifications: ["GAICD", "ISO 9001 lead"],
    startedAt: "2019-03-12",
  },
  {
    id: "t_priya",
    name: "Priya Nair",
    role: "Customer success",
    email: "priya@cdxi.digital",
    status: "active",
    certifications: ["CSM"],
    startedAt: "2022-06-01",
  },
  {
    id: "t_tom",
    name: "Tom Walsh",
    role: "Operations",
    email: "tom@cdxi.digital",
    status: "active",
    certifications: ["PMP"],
    startedAt: "2021-01-18",
  },
];

const customers: Customer[] = [
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
    followUp: "2026-09-11",
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
    followUp: "",
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
    followUp: "2026-09-09",
  },
  {
    id: "c_karratha",
    name: "Karratha Mining Services",
    contact: "Brett Holloway",
    email: "brett@karrathamining.com.au",
    status: "prospect",
    value: 54000,
    industry: "Resources",
    location: "Karratha, WA",
    notes: "Site visit this month. Proposal in draft.",
    followUp: "2026-09-12",
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
    followUp: "",
  },
];

const work: WorkItem[] = [
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
      { id: "q3a", title: "Board pack outline", done: true },
      { id: "q3b", title: "Cash position", done: false },
      { id: "q3c", title: "Pipeline slide", done: false },
    ],
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
    checklist: [
      { id: "ac1", title: "Renewal model", done: true },
      { id: "ac2", title: "SA plant scope", done: false },
    ],
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
    checklist: [
      { id: "hb1", title: "Workshop in Fremantle", done: true },
      { id: "hb2", title: "Content calendar", done: false },
    ],
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
      { id: "wp1", title: "Dashboard QA", done: true },
      { id: "wp2", title: "Handover notes", done: true },
      { id: "wp3", title: "Client sign-off", done: false },
    ],
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
    checklist: [{ id: "ka1", title: "Travel pack", done: false }],
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
    checklist: [{ id: "ba1", title: "GST rec", done: true }],
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
    checklist: [],
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
    checklist: [{ id: "as1", title: "Director details", done: true }],
  },
];

const finance: FinanceRecord[] = [
  { id: "f_1044", type: "invoice", customerId: "c_harbour", title: "INV-1044 Harbour Dental September retainer", amount: 4800, gst: gstOf(4800), status: "overdue", date: "2026-09-01" },
  { id: "f_1042", type: "invoice", customerId: "c_acme", title: "INV-1042 Acme Co. expansion study", amount: 14800, gst: gstOf(14800), status: "outstanding", date: "2026-09-04" },
  { id: "f_1041", type: "invoice", customerId: "c_westport", title: "INV-1041 Westport Q2 close-out", amount: 6200, gst: gstOf(6200), status: "paid", date: "2026-08-28" },
  { id: "f_1038", type: "invoice", customerId: "c_swan", title: "INV-1038 Swan River Legal August", amount: 2200, gst: gstOf(2200), status: "paid", date: "2026-08-22" },
  { id: "f_pay220", type: "payment", title: "PAY-220 GST BAS Q4", amount: 1186, gst: 0, status: "paid", date: "2026-08-18" },
  { id: "f_exp88", type: "expense", title: "EXP-88 Sterling Risk PI", amount: 1240, gst: gstOf(1240), status: "paid", date: "2026-08-12" },
];

const events: CalendarEvent[] = [
  { id: "e_pack", title: "Q3 board pack working session", date: "2026-09-09", time: "09:00", kind: "internal", location: "Studio", relatedWorkId: "w_q3" },
  { id: "e_west", title: "Westport handover", date: "2026-09-09", time: "14:00", kind: "external", location: "Kwinana", relatedWorkId: "w_westport" },
  { id: "e_q3", title: "Q3 executive review", date: "2026-09-10", time: "10:00", kind: "internal", location: "Boardroom", relatedWorkId: "w_q3" },
  { id: "e_acme", title: "Acme Co. renewal call", date: "2026-09-11", time: "11:00", kind: "external", location: "Video", relatedWorkId: "w_acme" },
  { id: "e_harb", title: "Harbour Dental onboarding", date: "2026-09-12", time: "09:30", kind: "external", location: "Fremantle", relatedWorkId: "w_harbour" },
  { id: "e_bas", title: "BAS Q1 working session", date: "2026-09-15", time: "13:00", kind: "internal", location: "Studio", relatedWorkId: "w_bas" },
  { id: "e_ops", title: "Operations planning", date: "2026-09-16", time: "09:00", kind: "internal", location: "Studio", relatedWorkId: "w_ops" },
];

const compliance: ComplianceRecord[] = [
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
    source: "https://www.workcover.wa.gov.au/",
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
    source: "https://www.ato.gov.au/",
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
    source: "https://www.insurancecouncil.com.au/",
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
    source: "https://asic.gov.au/",
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
    source: "https://www.abr.gov.au/",
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
    source: "https://www.insurancecouncil.com.au/",
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
    source: "https://www.oaic.gov.au/",
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
    source: "https://www.ato.gov.au/businesses-and-organisations/super-for-employers",
  },
];

const activities: ActivityItem[] = [
  { id: "a1", name: "Alex Kim", action: "created", detail: "Karratha site visit brief", time: "2h ago", initials: "AK", color: "blue", at: "2026-09-08T22:10:00.000Z" },
  { id: "a2", name: "Priya Nair", action: "moved", detail: "Harbour Dental onboarding → In progress", time: "4h ago", initials: "PN", color: "coral", at: "2026-09-08T20:05:00.000Z" },
  { id: "a3", name: "Tom Walsh", action: "logged", detail: "Westport extra capacity", time: "Yesterday", initials: "TW", color: "violet", at: "2026-09-08T04:20:00.000Z" },
  { id: "a4", name: "Alex Kim", action: "reviewed", detail: "Payroll tax — WA", time: "Yesterday", initials: "AK", color: "blue", at: "2026-09-07T23:40:00.000Z" },
  { id: "a5", name: "Priya Nair", action: "added", detail: "Swan River Legal as a customer", time: "2d ago", initials: "PN", color: "coral", at: "2026-09-07T06:15:00.000Z" },
];

const timeLogs: TimeLog[] = [
  { id: "tl1", workId: "w_westport", hours: 6, note: "Dashboard QA and handover notes", date: "2026-09-08", person: "Tom Walsh" },
  { id: "tl2", workId: "w_westport", hours: 5, note: "Ops close-out workshop", date: "2026-09-05", person: "Tom Walsh" },
  { id: "tl3", workId: "w_harbour", hours: 4, note: "Onboarding workshop at Fremantle", date: "2026-09-07", person: "Priya Nair" },
  { id: "tl4", workId: "w_acme", hours: 2.5, note: "Renewal modelling", date: "2026-09-08", person: "Priya Nair" },
  { id: "tl5", workId: "w_asic", hours: 2, note: "Director details check", date: "2026-09-06", person: "Alex Kim" },
  { id: "tl6", workId: "w_q3", hours: 3, note: "Board pack first pass", date: "2026-09-09", person: "Alex Kim" },
  { id: "tl7", workId: "w_bas", hours: 2.5, note: "GST reconciliation", date: "2026-09-09", person: "Tom Walsh" },
];

const deals: Deal[] = [
  { id: "d_karratha", title: "Karratha operations retainer", customerId: "c_karratha", stage: "proposal", value: 54000, owner: "Alex Kim", closeDate: "2026-09-30", notes: "Site visit this month. Three-year ops advisory." },
  { id: "d_harbour", title: "Harbour Dental Q4 campaign", customerId: "c_harbour", stage: "qualified", value: 18600, owner: "Priya Nair", closeDate: "2026-09-22", notes: "Brand rollout plus four-clinic content." },
  { id: "d_westport", title: "Westport inland freight dashboard", customerId: "c_westport", stage: "qualified", value: 28400, owner: "Tom Walsh", closeDate: "2026-10-08", notes: "Follow-on from Q2 close-out." },
  { id: "d_swan", title: "Swan River Legal knowledge base", customerId: "c_swan", stage: "lead", value: 9200, owner: "Priya Nair", closeDate: "2026-10-15", notes: "Intro conversation after retainer review." },
  { id: "d_perth_port", title: "Fremantle precinct advisory", stage: "lead", value: 16000, owner: "Alex Kim", closeDate: "2026-10-20", notes: "Inbound from a trade event. No account yet." },
  { id: "d_acme_won", title: "Acme plant expansion study", customerId: "c_acme", stage: "won", value: 14800, owner: "Priya Nair", closeDate: "2026-09-01", notes: "Converted. Delivery is underway." },
  { id: "d_lost", title: "Bunbury ports advisory", stage: "lost", value: 22000, owner: "Alex Kim", closeDate: "2026-08-20", notes: "Went in-house after the first workshop." },
];

export const DEFAULT_IDENTITY: Pick<VantageData, "workspaceName" | "profile"> = {
  workspaceName: "Northline Advisory",
  profile: {
    name: "Alex Kim",
    email: "alex@cdxi.digital",
    role: "Admin",
    initials: "AK",
  },
};

export function teamFromProfile(profile: VantageData["profile"]): TeamMember[] {
  return [
    {
      id: "t_self",
      name: profile.name,
      role: profile.role,
      email: profile.email,
      status: "active",
      certifications: [],
      startedAt: new Date().toISOString().slice(0, 10),
    },
  ];
}

function personDefaults(member: TeamMember): TeamMember {
  return {
    id: member.id,
    name: member.name,
    role: member.role,
    email: member.email,
    status: member.status ?? "active",
    certifications: member.certifications ?? [],
    startedAt: member.startedAt ?? "",
  };
}

export function emptyWorkspace(
  keep: Pick<VantageData, "workspaceName" | "profile"> = DEFAULT_IDENTITY,
): VantageData {
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
      tradingName: brandCase(keep.workspaceName),
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
    ledger: null,
  };
}

/** The Northline sample was written as if this day were "today". */
const DEMO_AS_OF = "2026-09-10";

function demoShiftDays(now = new Date()) {
  const from = Date.parse(`${DEMO_AS_OF}T00:00:00Z`);
  const to = Date.parse(`${todayIso(now)}T00:00:00Z`);
  if (!Number.isFinite(from) || !Number.isFinite(to)) return 0;
  return Math.round((to - from) / 86400000);
}

function shiftKeptDate(current: string, original: string, days: number) {
  if (days === 0 || current !== original || original < "2026-08-01") return current;
  const next = addDaysIso(original.slice(0, 10), days);
  return original.length > 10 ? `${next}${original.slice(10)}` : next;
}

function alignRows<T extends { id: string }>(rows: T[], originals: T[], keys: (keyof T)[], days: number): T[] {
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
        next[key] = shifted as T[keyof T];
        changed = true;
      }
    }
    return changed ? next : row;
  });
}

function alignDemoCollections<T extends Pick<
  VantageData,
  | "customers"
  | "work"
  | "finance"
  | "events"
  | "compliance"
  | "activities"
  | "timeLogs"
  | "deals"
  | "launchTasks"
  | "vault"
>>(data: T, now = new Date()): T {
  const days = demoShiftDays(now);
  if (days === 0) return data;
  const nextActivities = alignRows(data.activities, activities, ["at"], days).map((item) => {
    const src = activities.find((row) => row.id === item.id);
    if (!src || item.at === src.at) return item;
    return { ...item, time: relativeFrom(item.at, now) };
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
    vault: alignRows(data.vault, northlineVault(), ["renewsOn"], days),
  };
}

export function createSeed(): VantageData {
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
    tourDone: true,
  });
}

function cleanBrief(brief: VantageData["insight"]): VantageData["insight"] {
  if (!brief?.headline) return null;
  const lines = (value: unknown) =>
    Array.isArray(value) ? value.map((item) => String(item)).filter(Boolean) : [];
  return {
    ...brief,
    headline: String(brief.headline),
    priorities: lines(brief.priorities),
    risks: lines(brief.risks),
    wins: lines(brief.wins),
    nextMove: String(brief.nextMove ?? ""),
    at: brief.at || new Date().toISOString(),
  };
}

function cleanAccountant(value: VantageData["accountant"]): VantageData["accountant"] {
  if (!value?.name) return null;
  const allowed = ["bas", "tax", "advisory", "full"] as const;
  const engagement = allowed.includes(value.engagement) ? value.engagement : "full";
  return {
    name: String(value.name),
    firm: String(value.firm ?? ""),
    email: String(value.email ?? ""),
    phone: String(value.phone ?? ""),
    engagement,
  };
}

function cleanLedger(value: VantageData["ledger"], systems?: readonly string[]): VantageData["ledger"] {
  if (value === "xero" || value === "myob" || value === "quickbooks" || value === "reckon") return value;
  return systems?.includes("xero") ? "xero" : null;
}

export function normalizeWorkspace(raw: VantageData): VantageData {
  const profile = raw.profile?.name
    ? { ...raw.profile, initials: raw.profile.initials || initials(raw.profile.name) }
    : DEFAULT_IDENTITY.profile;
  const workspaceName = brandCase(raw.workspaceName?.trim() || DEFAULT_IDENTITY.workspaceName);
  const base = emptyWorkspace({ workspaceName, profile });
  const demo = createSeed();
  const customers = (raw.customers ?? []).map((c) => ({ ...c, followUp: c.followUp ?? "" }));
  const work = (raw.work ?? []).map((w) => ({
    ...w,
    hours: w.hours ?? 0,
    checklist: w.checklist ?? demo.work.find((item) => item.id === w.id)?.checklist ?? [],
  }));
  const finance = (raw.finance ?? []).map((f) => ({
    ...f,
    gst: typeof f.gst === "number" ? f.gst : f.type === "payment" ? 0 : gstOf(f.amount),
  }));
  const looksLikeDemo = (raw.work ?? []).some((w) => w.id === "w_q3");
  const team = (raw.team?.length ? raw.team : teamFromProfile(profile)).map((member) =>
    personDefaults(member),
  );
  const next: VantageData = {
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
      const business = { ...EMPTY_BUSINESS, ...(looksLikeDemo ? NORTHLINE_BUSINESS : {}), ...(raw.business ?? {}) };
      return {
        ...business,
        legalName: brandCase(business.legalName),
        tradingName: brandCase(business.tradingName),
      };
    })(),
    ideaCanvas: { ...EMPTY_IDEA, ...(looksLikeDemo ? NORTHLINE_IDEA : {}), ...(raw.ideaCanvas ?? {}) },
    launchTasks: raw.launchTasks ?? (looksLikeDemo ? demo.launchTasks : []),
    vault: raw.vault ?? (looksLikeDemo ? demo.vault : []),
    offerings: raw.offerings ?? (looksLikeDemo ? demo.offerings : []),
    agentBriefs: Object.fromEntries(
      Object.entries(raw.agentBriefs ?? {})
        .map(([id, brief]) => [id, cleanBrief(brief)])
        .filter((entry): entry is [string, NonNullable<VantageData["insight"]>] => entry[1] != null),
    ),
    aiPermissions: { ...DEFAULT_AI_PERMISSIONS, ...(raw.aiPermissions ?? {}) },
    linkedSystems: raw.linkedSystems?.filter((id) => id === "hubspot" || id === "stripe" || id === "microsoft") ?? [],
    tourDone:
      typeof raw.tourDone === "boolean"
        ? raw.tourDone
        : looksLikeDemo ||
          (raw.customers?.length ?? 0) + (raw.work?.length ?? 0) + (raw.deals?.length ?? 0) > 0,
    accountant: cleanAccountant(raw.accountant),
    ledger: cleanLedger(raw.ledger, raw.linkedSystems as readonly string[] | undefined),
  };
  return looksLikeDemo ? alignDemoCollections(next) : next;
}
