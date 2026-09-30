import { create } from "zustand";
import { uid } from "@/lib/utils";
import { createSeed, emptyWorkspace, normalizeWorkspace } from "./seed";
import { brandCase, gstOf, initials, todayIso, addDaysIso, workStatusLabel, dealStageLabel, roundHours } from "./format";
import { LEDGERS } from "./lifecycle";
import type {
  ActivityItem,
  Accountant,
  AiAgentId,
  AiCapability,
  AvatarColor,
  BusinessRecord,
  CalendarEvent,
  ComplianceRecord,
  Customer,
  Deal,
  DealStage,
  FinanceRecord,
  IdeaCanvas,
  InsightBrief,
  LaunchTask,
  LedgerId,
  LifecycleStage,
  LinkedSystemId,
  ModuleId,
  Offering,
  PortalId,
  Profile,
  RangeId,
  RunningTimer,
  TeamMember,
  ThemeId,
  VantageData,
  VaultDoc,
  WorkCheck,
  WorkItem,
  WorkStatus,
} from "./types";

const COLORS: AvatarColor[] = ["blue", "coral", "violet"];

function colorFor(name: string): AvatarColor {
  const n = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return COLORS[n % COLORS.length] ?? "blue";
}

function stamp(profile: Profile, action: string, detail: string): ActivityItem {
  return {
    id: uid("act"),
    name: profile.name,
    action,
    detail,
    time: "Just now",
    initials: profile.initials || initials(profile.name),
    color: colorFor(profile.name),
    at: new Date().toISOString(),
  };
}

function workHoursFromLogs(logs: VantageData["timeLogs"], workId: string) {
  return logs.filter((t) => t.workId === workId).reduce((n, t) => n + t.hours, 0);
}

export function workspacePayload(s: VantageData): VantageData {
  return {
    workspaceName: brandCase(s.workspaceName),
    profile: s.profile,
    signedIn: true,
    customers: s.customers,
    work: s.work,
    finance: s.finance,
    events: s.events,
    compliance: s.compliance,
    activities: s.activities,
    connectedPortals: s.connectedPortals,
    lastChecked: s.lastChecked,
    noticeVisible: s.noticeVisible,
    team: s.team,
    timeLogs: s.timeLogs,
    snoozedUntil: s.snoozedUntil,
    clearedInbox: s.clearedInbox,
    deals: s.deals,
    insight: s.insight,
    theme: s.theme,
    timer: s.timer,
    lifecycle: s.lifecycle,
    business: {
      ...s.business,
      legalName: brandCase(s.business.legalName),
      tradingName: brandCase(s.business.tradingName),
    },
    ideaCanvas: s.ideaCanvas,
    launchTasks: s.launchTasks,
    vault: s.vault,
    offerings: s.offerings,
    agentBriefs: s.agentBriefs,
    aiPermissions: s.aiPermissions,
    linkedSystems: s.linkedSystems,
    tourDone: s.tourDone,
    accountant: s.accountant,
    ledger: s.ledger,
  };
}

type VantageState = VantageData & {
  hydrated: boolean;
  module: ModuleId;
  range: RangeId;
  setHydrated: () => void;
  resetSession: () => void;
  hydrateFromServer: (data: VantageData) => void;
  setModule: (id: ModuleId) => void;
  setRange: (id: RangeId) => void;
  dismissNotice: () => void;
  setWorkspaceName: (name: string) => void;
  setProfile: (profile: Profile) => void;
  setTheme: (theme: ThemeId) => void;
  setLifecycle: (lifecycle: LifecycleStage) => void;
  setBusiness: (business: BusinessRecord) => void;
  setIdeaCanvas: (ideaCanvas: IdeaCanvas) => void;
  addCustomer: (c: Omit<Customer, "id" | "followUp"> & { followUp?: string }) => string;
  updateCustomer: (id: string, patch: Partial<Customer>) => void;
  removeCustomer: (id: string) => void;
  addWork: (
    w: Omit<WorkItem, "id" | "createdAt" | "checklist" | "hours"> & { hours?: number; checklist?: WorkCheck[] },
  ) => string;
  updateWork: (id: string, patch: Partial<WorkItem>) => void;
  moveWork: (id: string, status: WorkStatus) => void;
  removeWork: (id: string) => void;
  addCheck: (workId: string, title: string) => void;
  toggleCheck: (workId: string, checkId: string) => void;
  removeCheck: (workId: string, checkId: string) => void;
  addFinance: (f: Omit<FinanceRecord, "id" | "gst"> & { gst?: number }) => string;
  updateFinance: (id: string, patch: Partial<FinanceRecord>) => void;
  removeFinance: (id: string) => void;
  addEvent: (e: Omit<CalendarEvent, "id">) => string;
  updateEvent: (id: string, patch: Partial<CalendarEvent>) => void;
  removeEvent: (id: string) => void;
  addCompliance: (c: Omit<ComplianceRecord, "id">) => string;
  markReviewed: (id: string) => void;
  updateCompliance: (id: string, patch: Partial<ComplianceRecord>) => void;
  removeCompliance: (id: string) => void;
  connectPortal: (id: PortalId) => void;
  disconnectPortal: (id: PortalId) => void;
  setAccountant: (accountant: Accountant) => void;
  clearAccountant: () => void;
  setLedger: (id: LedgerId | null) => void;
  restoreDemo: () => void;
  clearWorkspace: () => void;
  logTime: (workId: string, hours: number, note: string, date?: string) => void;
  setTimeForDay: (workId: string, date: string, hours: number) => void;
  startTimer: (workId: string) => void;
  stopTimer: () => { hours: number; title: string } | null;
  snoozeInbox: (id: string, days: number) => void;
  clearInboxItem: (id: string) => void;
  addTeamMember: (member: Omit<TeamMember, "id">) => void;
  updateTeamMember: (id: string, patch: Partial<TeamMember>) => void;
  removeTeamMember: (id: string) => void;
  addDeal: (d: Omit<Deal, "id">) => string;
  updateDeal: (id: string, patch: Partial<Deal>) => void;
  moveDeal: (id: string, stage: DealStage) => void;
  removeDeal: (id: string) => void;
  setInsight: (insight: InsightBrief | null) => void;
  addLaunch: (t: Omit<LaunchTask, "id">) => string;
  toggleLaunch: (id: string) => void;
  removeLaunch: (id: string) => void;
  addVault: (d: Omit<VaultDoc, "id" | "addedAt">) => string;
  updateVault: (id: string, patch: Partial<VaultDoc>) => void;
  removeVault: (id: string) => void;
  addOffering: (o: Omit<Offering, "id">) => string;
  toggleOffering: (id: string) => void;
  setAiPermission: (agent: AiAgentId, level: AiCapability) => void;
  setAgentBrief: (agent: AiAgentId, brief: InsightBrief) => void;
  connectSystem: (id: LinkedSystemId) => void;
  setTourDone: (done: boolean) => void;
};

const empty = emptyWorkspace();

const signedOutShell = {
  workspaceName: "Workspace",
  profile: { name: "You", email: "", role: "Operator", initials: "YO" },
};

export const useVantage = create<VantageState>()((set, get) => ({
  ...empty,
  hydrated: false,
  module: "overview",
  range: "30d",
  setHydrated: () => set({ hydrated: true }),
  resetSession: () =>
    set({
      ...emptyWorkspace(signedOutShell),
      hydrated: false,
      module: "overview",
      range: "30d",
    }),
  hydrateFromServer: (data) => set({ ...normalizeWorkspace(data), hydrated: true }),
  setModule: (module) => set({ module }),
  setRange: (range) => set({ range }),
  dismissNotice: () => set({ noticeVisible: false }),
  setWorkspaceName: (workspaceName) => set({ workspaceName: brandCase(workspaceName) }),
  setProfile: (profile) => {
    const prev = get().profile;
    const next = { ...profile, initials: initials(profile.name) };
    set((s) => ({
      profile: next,
      team: s.team.map((member) =>
        member.id === "t_self" || (prev.email && member.email === prev.email)
          ? { ...member, name: next.name, email: next.email, role: next.role }
          : member,
      ),
    }));
  },
  setTheme: (theme) => set({ theme }),
  setLifecycle: (lifecycle) => {
    const profile = get().profile;
    set((s) => ({
      lifecycle,
      activities: [stamp(profile, "moved", `Lifecycle → ${lifecycle}`), ...s.activities].slice(0, 40),
    }));
  },
  setBusiness: (business) =>
    set({
      business: {
        ...business,
        legalName: brandCase(business.legalName),
        tradingName: brandCase(business.tradingName),
      },
    }),
  setIdeaCanvas: (ideaCanvas) => set({ ideaCanvas }),
  addCustomer: (c) => {
    const id = uid("cus");
    const profile = get().profile;
    set((s) => ({
      customers: [{ ...c, id, followUp: c.followUp || "" }, ...s.customers],
      activities: [stamp(profile, "added", `${c.name} as a customer`), ...s.activities].slice(0, 40),
    }));
    return id;
  },
  updateCustomer: (id, patch) =>
    set((s) => ({ customers: s.customers.map((c) => (c.id === id ? { ...c, ...patch } : c)) })),
  removeCustomer: (id) => set((s) => ({ customers: s.customers.filter((c) => c.id !== id) })),
  addWork: (w) => {
    const id = uid("wrk");
    const profile = get().profile;
    set((s) => ({
      work: [
        { ...w, id, createdAt: todayIso(), hours: w.hours ?? 0, checklist: w.checklist ?? [] },
        ...s.work,
      ],
      activities: [stamp(profile, "created", w.title), ...s.activities].slice(0, 40),
    }));
    return id;
  },
  updateWork: (id, patch) => set((s) => ({ work: s.work.map((w) => (w.id === id ? { ...w, ...patch } : w)) })),
  moveWork: (id, status) => {
    const item = get().work.find((w) => w.id === id);
    const profile = get().profile;
    set((s) => ({
      work: s.work.map((w) => (w.id === id ? { ...w, status } : w)),
      activities: item
        ? [stamp(profile, "moved", `${item.title} → ${workStatusLabel(status)}`), ...s.activities].slice(0, 40)
        : s.activities,
    }));
  },
  removeWork: (id) =>
    set((s) => ({
      work: s.work.filter((w) => w.id !== id),
      timeLogs: s.timeLogs.filter((t) => t.workId !== id),
      timer: s.timer?.workId === id ? null : s.timer,
    })),
  addCheck: (workId, title) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    set((s) => ({
      work: s.work.map((w) =>
        w.id === workId
          ? { ...w, checklist: [...(w.checklist ?? []), { id: uid("chk"), title: trimmed, done: false }] }
          : w,
      ),
    }));
  },
  toggleCheck: (workId, checkId) =>
    set((s) => ({
      work: s.work.map((w) =>
        w.id === workId
          ? {
              ...w,
              checklist: (w.checklist ?? []).map((c) => (c.id === checkId ? { ...c, done: !c.done } : c)),
            }
          : w,
      ),
    })),
  removeCheck: (workId, checkId) =>
    set((s) => ({
      work: s.work.map((w) =>
        w.id === workId ? { ...w, checklist: (w.checklist ?? []).filter((c) => c.id !== checkId) } : w,
      ),
    })),
  addFinance: (f) => {
    const id = uid("fin");
    const profile = get().profile;
    const amount = Number.isFinite(f.amount) ? Math.max(0, f.amount) : 0;
    set((s) => ({
      finance: [{ ...f, id, amount, gst: f.gst ?? (f.type === "payment" ? 0 : gstOf(amount)) }, ...s.finance],
      activities: [stamp(profile, "logged", f.title), ...s.activities].slice(0, 40),
    }));
    return id;
  },
  updateFinance: (id, patch) =>
    set((s) => ({ finance: s.finance.map((f) => (f.id === id ? { ...f, ...patch } : f)) })),
  removeFinance: (id) => set((s) => ({ finance: s.finance.filter((f) => f.id !== id) })),
  addEvent: (e) => {
    const id = uid("evt");
    const profile = get().profile;
    set((s) => ({
      events: [{ ...e, id }, ...s.events],
      activities: [stamp(profile, "scheduled", e.title), ...s.activities].slice(0, 40),
    }));
    return id;
  },
  updateEvent: (id, patch) => set((s) => ({ events: s.events.map((e) => (e.id === id ? { ...e, ...patch } : e)) })),
  removeEvent: (id) => set((s) => ({ events: s.events.filter((e) => e.id !== id) })),
  addCompliance: (c) => {
    const id = uid("cmp");
    const profile = get().profile;
    set((s) => ({
      compliance: [{ ...c, id }, ...s.compliance],
      activities: [stamp(profile, "tracked", c.title), ...s.activities].slice(0, 40),
    }));
    return id;
  },
  markReviewed: (id) => {
    const item = get().compliance.find((c) => c.id === id);
    const profile = get().profile;
    set((s) => ({
      compliance: s.compliance.map((c) => (c.id === id ? { ...c, status: "Up to date", evidence: true } : c)),
      activities: item
        ? [stamp(profile, "reviewed", item.title), ...s.activities].slice(0, 40)
        : s.activities,
    }));
  },
  updateCompliance: (id, patch) =>
    set((s) => ({ compliance: s.compliance.map((c) => (c.id === id ? { ...c, ...patch } : c)) })),
  removeCompliance: (id) => set((s) => ({ compliance: s.compliance.filter((c) => c.id !== id) })),
  connectPortal: (id) =>
    set((s) => ({
      connectedPortals: s.connectedPortals.includes(id) ? s.connectedPortals : [...s.connectedPortals, id],
      lastChecked: { ...s.lastChecked, [id]: "Just now" },
    })),
  disconnectPortal: (id) =>
    set((s) => ({
      connectedPortals: s.connectedPortals.filter((item) => item !== id),
      lastChecked: Object.fromEntries(Object.entries(s.lastChecked).filter(([key]) => key !== id)),
    })),
  setAccountant: (accountant) => {
    const profile = get().profile;
    const label =
      accountant.engagement === "bas"
        ? "BAS"
        : accountant.engagement === "tax"
          ? "Tax"
          : accountant.engagement === "advisory"
            ? "Advisory"
            : "Full service";
    set((s) => {
      const member = {
        id: "t_accountant",
        name: accountant.name,
        role: "Accountant",
        email: accountant.email,
        status: "contractor" as const,
        certifications: [label],
        startedAt: s.team.find((person) => person.id === "t_accountant")?.startedAt || todayIso(),
      };
      return {
        accountant,
        team: s.team.some((person) => person.id === "t_accountant")
          ? s.team.map((person) => (person.id === "t_accountant" ? member : person))
          : [...s.team, member],
        activities: [stamp(profile, "added", `${accountant.name} · accountant`), ...s.activities].slice(0, 40),
      };
    });
  },
  clearAccountant: () =>
    set((s) => ({
      accountant: null,
      team: s.team.filter((person) => person.id !== "t_accountant"),
    })),
  setLedger: (id) => {
    const profile = get().profile;
    const name = id ? (LEDGERS.find((item) => item.id === id)?.name ?? "Ledger") : "Accounting ledger";
    set((s) => ({
      ledger: id,
      launchTasks: s.launchTasks.map((task) =>
        task.id === "ln_xero"
          ? {
              ...task,
              done: Boolean(id),
              title: id ? `${name} connected as system of record` : "Accounting ledger connected",
              notes: id ? `Sign-in stays on ${name}. Vantage does not store that password.` : "Choose a ledger in Finance.",
            }
          : task,
      ),
      activities: [stamp(profile, id ? "linked" : "unlinked", name), ...s.activities].slice(0, 40),
    }));
  },
  restoreDemo: () => {
    const next = createSeed();
    const { profile, workspaceName, module, range, theme } = get();
    set({ ...next, profile, workspaceName, team: next.team, hydrated: true, module, range, theme });
  },
  clearWorkspace: () => {
    const { workspaceName, profile, module, range, theme, tourDone } = get();
    set({ ...emptyWorkspace({ workspaceName, profile }), hydrated: true, module, range, theme, tourDone });
  },
  logTime: (workId, hours, note, date) => {
    if (!Number.isFinite(hours) || hours <= 0) return;
    const item = get().work.find((w) => w.id === workId);
    const profile = get().profile;
    const logged = roundHours(hours);
    set((s) => ({
      timeLogs: [
        { id: uid("tl"), workId, hours: logged, note, date: date || todayIso(), person: profile.name },
        ...s.timeLogs,
      ],
      work: s.work.map((w) => (w.id === workId ? { ...w, hours: (w.hours || 0) + logged } : w)),
      activities: item
        ? [stamp(profile, "logged", `${logged}h on ${item.title}`), ...s.activities].slice(0, 40)
        : s.activities,
    }));
  },
  setTimeForDay: (workId, date, hours) => {
    if (!Number.isFinite(hours)) return;
    const profile = get().profile;
    const logged = Math.max(0, roundHours(hours));
    set((s) => {
      const others = s.timeLogs.filter(
        (t) => !(t.workId === workId && t.date === date && t.person === profile.name),
      );
      const timeLogs =
        logged > 0
          ? [{ id: uid("tl"), workId, hours: logged, note: "Timesheet", date, person: profile.name }, ...others]
          : others;
      return {
        timeLogs,
        work: s.work.map((w) => (w.id === workId ? { ...w, hours: workHoursFromLogs(timeLogs, workId) } : w)),
      };
    });
  },
  startTimer: (workId) => {
    const current = get().timer;
    if (current?.workId === workId) return;
    if (current) get().stopTimer();
    set({ timer: { workId, startedAt: new Date().toISOString() } satisfies RunningTimer });
  },
  stopTimer: () => {
    const timer = get().timer;
    if (!timer) return null;
    const item = get().work.find((w) => w.id === timer.workId);
    const ms = Date.now() - new Date(timer.startedAt).getTime();
    const hours = roundHours(ms / 3_600_000);
    set({ timer: null });
    if (hours >= 0.25) {
      get().logTime(timer.workId, hours, "Timer");
    }
    return { hours, title: item?.title ?? "Work" };
  },
  snoozeInbox: (id, days) =>
    set((s) => ({
      snoozedUntil: { ...s.snoozedUntil, [id]: addDaysIso(todayIso(), days) },
    })),
  clearInboxItem: (id) =>
    set((s) => ({
      clearedInbox: s.clearedInbox.includes(id) ? s.clearedInbox : [...s.clearedInbox, id],
    })),
  addTeamMember: (member) =>
    set((s) => ({
      team: [
        ...s.team,
        {
          ...member,
          id: uid("tm"),
          status: member.status ?? "active",
          certifications: member.certifications ?? [],
          startedAt: member.startedAt || todayIso(),
        },
      ],
    })),
  updateTeamMember: (id, patch) =>
    set((s) => ({ team: s.team.map((m) => (m.id === id ? { ...m, ...patch } : m)) })),
  removeTeamMember: (id) =>
    set((s) => ({
      team: s.team.filter((m) => m.id !== id),
      accountant: id === "t_accountant" ? null : s.accountant,
    })),
  addDeal: (d) => {
    const id = uid("deal");
    const profile = get().profile;
    set((s) => ({
      deals: [{ ...d, id }, ...s.deals],
      activities: [stamp(profile, "opened", d.title), ...s.activities].slice(0, 40),
    }));
    return id;
  },
  updateDeal: (id, patch) => set((s) => ({ deals: s.deals.map((d) => (d.id === id ? { ...d, ...patch } : d)) })),
  moveDeal: (id, stage) => {
    const item = get().deals.find((d) => d.id === id);
    const profile = get().profile;
    set((s) => ({
      deals: s.deals.map((d) => (d.id === id ? { ...d, stage } : d)),
      activities: item
        ? [stamp(profile, "moved", `${item.title} → ${dealStageLabel(stage)}`), ...s.activities].slice(0, 40)
        : s.activities,
    }));
  },
  removeDeal: (id) => set((s) => ({ deals: s.deals.filter((d) => d.id !== id) })),
  setInsight: (insight) => set({ insight }),
  addLaunch: (t) => {
    const id = uid("ln");
    const profile = get().profile;
    set((s) => ({
      launchTasks: [{ ...t, id }, ...s.launchTasks],
      activities: [stamp(profile, "tracked", t.title), ...s.activities].slice(0, 40),
    }));
    return id;
  },
  toggleLaunch: (id) =>
    set((s) => ({
      launchTasks: s.launchTasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    })),
  removeLaunch: (id) => set((s) => ({ launchTasks: s.launchTasks.filter((t) => t.id !== id) })),
  addVault: (d) => {
    const id = uid("doc");
    const profile = get().profile;
    set((s) => ({
      vault: [{ ...d, id, addedAt: todayIso() }, ...s.vault],
      activities: [stamp(profile, "filed", d.title), ...s.activities].slice(0, 40),
    }));
    return id;
  },
  updateVault: (id, patch) => set((s) => ({ vault: s.vault.map((d) => (d.id === id ? { ...d, ...patch } : d)) })),
  removeVault: (id) => set((s) => ({ vault: s.vault.filter((d) => d.id !== id) })),
  addOffering: (o) => {
    const id = uid("off");
    set((s) => ({ offerings: [{ ...o, id }, ...s.offerings] }));
    return id;
  },
  toggleOffering: (id) =>
    set((s) => ({ offerings: s.offerings.map((o) => (o.id === id ? { ...o, active: !o.active } : o)) })),
  setAiPermission: (agent, level) =>
    set((s) => ({ aiPermissions: { ...s.aiPermissions, [agent]: level } })),
  setAgentBrief: (agent, brief) =>
    set((s) => ({
      agentBriefs: { ...s.agentBriefs, [agent]: brief },
      insight: agent === "ceo" ? brief : s.insight,
    })),
  connectSystem: (id) =>
    set((s) => ({
      linkedSystems: s.linkedSystems.includes(id)
        ? s.linkedSystems.filter((item) => item !== id)
        : [...s.linkedSystems, id],
    })),
  setTourDone: (done) => set({ tourDone: done }),
}));
