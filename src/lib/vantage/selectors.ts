import { compareAsc, parseISO } from "date-fns";
import { addDaysIso, inRange, money, rangeStart, startOfWeekIso, todayIso, weekDays } from "./format";
import type {
  Deal,
  DealStage,
  FinanceRecord,
  InboxKind,
  ModuleId,
  RangeId,
  VantageData,
  WorkStatus,
} from "./types";

export function openWork(data: VantageData) {
  return data.work.filter((w) => w.status !== "done");
}

export function workByStatus(data: VantageData) {
  const counts: Record<WorkStatus, number> = {
    "on-hold": 0,
    scheduled: 0,
    "in-progress": 0,
    "needs-review": 0,
    done: 0,
  };
  for (const w of data.work) counts[w.status] += 1;
  return counts;
}

export function paidRevenue(records: FinanceRecord[], range: RangeId, now = new Date()) {
  return records
    .filter((f) => f.type === "invoice" && f.status === "paid" && inRange(f.date, range, now))
    .reduce((sum, f) => sum + f.amount, 0);
}

export function previousRevenue(records: FinanceRecord[], range: RangeId, now = new Date()) {
  const start = rangeStart(range, now);
  const span = now.getTime() - start.getTime();
  const prevEnd = new Date(start.getTime() - 1);
  const prevStart = new Date(prevEnd.getTime() - span);
  return records
    .filter((f) => {
      if (f.type !== "invoice" || f.status !== "paid") return false;
      const d = parseISO(f.date);
      return d >= prevStart && d <= prevEnd;
    })
    .reduce((sum, f) => sum + f.amount, 0);
}

export function outstandingTotal(records: FinanceRecord[]) {
  return records
    .filter((f) => f.type === "invoice" && (f.status === "outstanding" || f.status === "overdue"))
    .reduce((sum, f) => sum + f.amount, 0);
}

export function gstCollected(records: FinanceRecord[], range: RangeId, now = new Date()) {
  return records
    .filter((f) => f.type === "invoice" && f.status === "paid" && inRange(f.date, range, now))
    .reduce((sum, f) => sum + (f.gst || 0), 0);
}

export function hoursLogged(data: VantageData, range: RangeId, now = new Date()) {
  return data.timeLogs
    .filter((t) => inRange(t.date, range, now))
    .reduce((sum, t) => sum + t.hours, 0);
}

export function activeCustomers(data: VantageData) {
  return data.customers.filter((c) => c.status === "active");
}

export function revenueSeries(records: FinanceRecord[], range: RangeId, now = new Date()) {
  const start = rangeStart(range, now);
  const days = Math.max(1, Math.round((now.getTime() - start.getTime()) / 86400000) + 1);
  const bucketDays = days > 20 ? 7 : 1;
  const buckets: { label: string; value: number; key: string }[] = [];
  const cursor = new Date(start);
  while (cursor <= now) {
    const key = cursor.toISOString().slice(0, 10);
    const end = new Date(cursor);
    end.setDate(end.getDate() + bucketDays);
    const value = records
      .filter((f) => {
        if (f.type !== "invoice" || f.status !== "paid") return false;
        const d = parseISO(f.date);
        return d >= cursor && d < end && d <= now;
      })
      .reduce((sum, f) => sum + f.amount, 0);
    const label = cursor.toLocaleDateString("en-AU", { day: "numeric", month: "short" });
    buckets.push({ key, label, value });
    cursor.setDate(cursor.getDate() + bucketDays);
  }
  let running = 0;
  return buckets.map((b) => {
    running += b.value;
    return { ...b, cumulative: running };
  });
}

export function upcomingWork(data: VantageData, limit = 4) {
  const today = todayIso();
  return [...data.work]
    .filter((w) => w.status !== "done" && w.due >= today)
    .sort((a, b) => compareAsc(parseISO(a.due), parseISO(b.due)))
    .slice(0, limit);
}

export function nextDeadline(data: VantageData) {
  const open = data.compliance.filter((c) => c.status !== "Up to date");
  if (open.length === 0) return null;
  return [...open].sort((a, b) => a.due.localeCompare(b.due))[0] ?? null;
}

export function complianceScore(data: VantageData) {
  if (data.compliance.length === 0) return 0;
  const ready = data.compliance.filter((c) => c.status === "Up to date").length;
  return Math.round((ready / data.compliance.length) * 100);
}

export function attentionCount(data: VantageData) {
  return inboxItems(data).length;
}

export function notifications(data: VantageData) {
  return inboxItems(data)
    .slice(0, 6)
    .map((item) => ({
      id: item.id,
      title: item.title,
      detail: item.detail,
      module: item.module,
    }));
}

export function customerName(data: VantageData, id?: string) {
  if (!id) return "";
  return data.customers.find((c) => c.id === id)?.name ?? "";
}

export function openDeals(data: VantageData) {
  return data.deals.filter((d) => d.stage !== "won" && d.stage !== "lost");
}

export function pipelineValue(data: VantageData) {
  return openDeals(data).reduce((sum, d) => sum + d.value, 0);
}

export function dealsByStage(data: VantageData) {
  const counts: Record<DealStage, number> = {
    lead: 0,
    qualified: 0,
    proposal: 0,
    won: 0,
    lost: 0,
  };
  for (const d of data.deals) counts[d.stage] += 1;
  return counts;
}

export function wonValue(data: VantageData, range: RangeId, now = new Date()) {
  return data.deals
    .filter((d) => d.stage === "won" && inRange(d.closeDate, range, now))
    .reduce((sum, d) => sum + d.value, 0);
}

export function hoursThisWeek(data: VantageData, now = new Date()) {
  const days = new Set(weekDays(startOfWeekIso(now)));
  return data.timeLogs.filter((t) => days.has(t.date)).reduce((sum, t) => sum + t.hours, 0);
}

export function hoursByPerson(data: VantageData, range: RangeId, now = new Date()) {
  const map = new Map<string, number>();
  for (const t of data.timeLogs) {
    if (!inRange(t.date, range, now)) continue;
    map.set(t.person, (map.get(t.person) ?? 0) + t.hours);
  }
  return [...map.entries()]
    .map(([name, hours]) => ({ name, hours }))
    .sort((a, b) => b.hours - a.hours);
}

export function hoursForDay(data: VantageData, workId: string, date: string, person?: string) {
  return data.timeLogs
    .filter((t) => t.workId === workId && t.date === date && (!person || t.person === person))
    .reduce((sum, t) => sum + t.hours, 0);
}

export function openLaunch(data: VantageData) {
  return data.launchTasks.filter((t) => !t.done);
}

export function launchProgress(data: VantageData) {
  if (data.launchTasks.length === 0) return 0;
  const done = data.launchTasks.filter((t) => t.done).length;
  return Math.round((done / data.launchTasks.length) * 100);
}

export function vaultDueSoon(data: VantageData, now = new Date()) {
  const today = todayIso(now);
  const horizon = addDaysIso(today, 45);
  return data.vault.filter((d) => d.renewsOn && d.renewsOn <= horizon);
}

export function onboardingPeople(data: VantageData) {
  return data.team.filter((p) => p.status === "onboarding");
}

export type InboxEntry = {
  id: string;
  kind: InboxKind;
  title: string;
  detail: string;
  tone: "urgent" | "soon" | "neutral";
  module: ModuleId;
  due: string;
  action: string;
};

function visible(data: VantageData, id: string) {
  if (data.clearedInbox.includes(id)) return false;
  const until = data.snoozedUntil[id];
  if (until && until > todayIso()) return false;
  return true;
}

export function inboxItems(data: VantageData, now = new Date()): InboxEntry[] {
  const today = todayIso(now);
  const items: InboxEntry[] = [];

  for (const f of data.finance.filter((x) => x.type === "invoice" && (x.status === "overdue" || x.status === "outstanding"))) {
    if (!visible(data, f.id)) continue;
    items.push({
      id: f.id,
      kind: "finance",
      title: f.title,
      detail: `${f.status === "overdue" ? "Overdue invoice" : "Outstanding invoice"} · collect`,
      tone: f.status === "overdue" ? "urgent" : "soon",
      module: "finance",
      due: f.date,
      action: "Mark paid",
    });
  }

  for (const w of data.work.filter((x) => x.status !== "done" && (x.priority === "high" || x.due <= today))) {
    if (!visible(data, w.id)) continue;
    items.push({
      id: w.id,
      kind: "work",
      title: w.title,
      detail: w.due < today ? `Overdue · ${w.owner}` : `Due ${w.due} · ${w.owner}`,
      tone: w.due < today || w.priority === "high" ? "urgent" : "soon",
      module: "work",
      due: w.due,
      action: "Mark done",
    });
  }

  for (const c of data.compliance.filter((x) => x.status !== "Up to date")) {
    if (!visible(data, c.id)) continue;
    items.push({
      id: c.id,
      kind: "compliance",
      title: c.title,
      detail: `${c.status} · ${c.authority}`,
      tone: c.status === "Urgent" ? "urgent" : "soon",
      module: "compliance",
      due: c.due,
      action: "Mark reviewed",
    });
  }

  for (const c of data.customers.filter((x) => x.followUp && x.followUp <= today)) {
    if (!visible(data, `fu-${c.id}`)) continue;
    items.push({
      id: `fu-${c.id}`,
      kind: "followup",
      title: `Follow up ${c.name}`,
      detail: `${c.contact || c.email || "No contact"} · due ${c.followUp}`,
      tone: c.followUp < today ? "urgent" : "soon",
      module: "customers",
      due: c.followUp,
      action: "Snooze 7 days",
    });
  }

  for (const e of data.events.filter((x) => x.date === today)) {
    if (!visible(data, e.id)) continue;
    items.push({
      id: e.id,
      kind: "event",
      title: e.title,
      detail: `Today at ${e.time} · ${e.location}`,
      tone: "neutral",
      module: "calendar",
      due: e.date,
      action: "Clear",
    });
  }

  for (const d of data.deals.filter((x) => x.stage !== "won" && x.stage !== "lost" && x.closeDate <= today)) {
    if (!visible(data, d.id)) continue;
    items.push({
      id: d.id,
      kind: "deal",
      title: d.title,
      detail: `Close date ${d.closeDate} · ${d.owner}`,
      tone: d.closeDate < today ? "urgent" : "soon",
      module: "pipeline",
      due: d.closeDate,
      action: "Mark won",
    });
  }

  for (const t of data.launchTasks.filter((x) => !x.done && x.due && x.due <= addDaysIso(today, 14))) {
    if (!visible(data, t.id)) continue;
    items.push({
      id: t.id,
      kind: "launch",
      title: t.title,
      detail: `Setup · ${t.area} · due ${t.due}`,
      tone: t.due < today ? "urgent" : "soon",
      module: "launch",
      due: t.due,
      action: "Mark done",
    });
  }

  for (const d of data.vault.filter((x) => x.renewsOn && x.renewsOn <= addDaysIso(today, 45))) {
    if (!visible(data, d.id)) continue;
    items.push({
      id: d.id,
      kind: "vault",
      title: d.title,
      detail: `Renews ${d.renewsOn} · ${d.counterparty || d.kind}`,
      tone: d.renewsOn <= today ? "urgent" : "soon",
      module: "vault",
      due: d.renewsOn,
      action: "Snooze 14 days",
    });
  }

  const rank = { urgent: 0, soon: 1, neutral: 2 };
  return items.sort((a, b) => rank[a.tone] - rank[b.tone] || a.due.localeCompare(b.due));
}

export function weeklyBriefing(data: VantageData, now = new Date()) {
  const today = todayIso(now);
  const weekEnd = new Date(now);
  weekEnd.setDate(weekEnd.getDate() + 7);
  const end = todayIso(weekEnd);
  const dueWork = data.work.filter((w) => w.status !== "done" && w.due >= today && w.due < end).length;
  const collect = outstandingTotal(data.finance);
  const overdue = data.finance.filter((f) => f.status === "overdue").length;
  const compliance = data.compliance.filter((c) => c.status !== "Up to date").length;
  const hours = hoursThisWeek(data, now);
  const events = data.events.filter((e) => e.date >= today && e.date < end).length;
  const pipeline = pipelineValue(data);
  const setup = openLaunch(data).length;
  const lines: string[] = [];
  if (collect > 0) lines.push(`${money(collect)} sitting in unpaid invoices${overdue ? ` (${overdue} overdue)` : ""}.`);
  if (pipeline > 0) lines.push(`${money(pipeline)} in open pipeline.`);
  if (dueWork) lines.push(`${dueWork} work item${dueWork === 1 ? "" : "s"} due in the next seven days.`);
  if (compliance) lines.push(`${compliance} compliance item${compliance === 1 ? "" : "s"} still need a review.`);
  if (setup) lines.push(`${setup} setup item${setup === 1 ? "" : "s"} still open in Launch.`);
  if (events) lines.push(`${events} calendar event${events === 1 ? "" : "s"} this week.`);
  if (hours) lines.push(`${hours} hours logged this week.`);
  if (lines.length === 0) lines.push("Nothing urgent. Use the week to move work forward.");
  return { lines, dueWork, collect, overdue, compliance, hours, events, pipeline, setup };
}

export function insightSnapshot(data: VantageData) {
  const brief = weeklyBriefing(data);
  return {
    workspace: data.workspaceName,
    operator: data.profile.name,
    unpaid: brief.collect,
    overdueInvoices: data.finance
      .filter((f) => f.status === "overdue")
      .map((f) => ({ title: f.title, amount: f.amount })),
    openWork: openWork(data).map((w) => ({
      title: w.title,
      status: w.status,
      due: w.due,
      owner: w.owner,
      priority: w.priority,
    })),
    pipeline: openDeals(data).map((d: Deal) => ({
      title: d.title,
      stage: d.stage,
      value: d.value,
      closeDate: d.closeDate,
      owner: d.owner,
    })),
    compliance: data.compliance
      .filter((c) => c.status !== "Up to date")
      .map((c) => ({ title: c.title, status: c.status, due: c.due })),
    followUps: data.customers
      .filter((c) => c.followUp)
      .map((c) => ({ name: c.name, followUp: c.followUp })),
    hoursThisWeek: brief.hours,
    eventsThisWeek: brief.events,
    lifecycle: data.lifecycle,
    business: {
      legalName: data.business.legalName,
      tradingName: data.business.tradingName,
      abn: data.business.abn,
      entityType: data.business.entityType,
      state: data.business.state || "WA",
      industry: data.business.industry,
      stage: data.lifecycle,
    },
    accountant: data.accountant?.name
      ? { name: data.accountant.name, firm: data.accountant.firm, email: data.accountant.email }
      : null,
    ledger: data.ledger,
    launchOpen: openLaunch(data).map((t) => ({ title: t.title, due: t.due, area: t.area })),
    vaultRenewals: vaultDueSoon(data).map((d) => ({ title: d.title, renewsOn: d.renewsOn })),
    people: data.team.map((p) => ({ name: p.name, role: p.role, status: p.status })),
  };
}
