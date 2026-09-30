import { format, parseISO, isValid } from "date-fns";
import type {
  RangeId,
  WorkStatus,
  FinanceStatus,
  ComplianceStatus,
  CustomerStatus,
  DealStage,
} from "./types";

export const AUD = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

export const AUD_FULL = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  minimumFractionDigits: 2,
});

export function money(n: number, compact = true) {
  return compact ? AUD.format(n) : AUD_FULL.format(n);
}

export function gstOf(amount: number) {
  return Math.round(amount / 11);
}

export function parseDay(iso: string) {
  const d = parseISO(iso);
  return isValid(d) ? d : new Date(iso);
}

export function fmtDay(iso: string, pattern = "d MMM") {
  try {
    return format(parseDay(iso), pattern);
  } catch {
    return iso;
  }
}

export function todayIso(d = new Date()) {
  return format(d, "yyyy-MM-dd");
}

export function addDaysIso(iso: string, days: number) {
  const d = parseDay(iso);
  d.setDate(d.getDate() + days);
  return format(d, "yyyy-MM-dd");
}

export function greeting(name: string, now = new Date()) {
  const h = now.getHours();
  const first = name.split(" ")[0] || "there";
  const part = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  return `${part}, ${first}.`;
}

export function headingDate(now = new Date()) {
  return format(now, "EEEE, d MMMM yyyy");
}

export function rangeLabel(range: RangeId) {
  if (range === "7d") return "Last 7 days";
  if (range === "quarter") return "This quarter";
  return "Last 30 days";
}

export function rangeStart(range: RangeId, now = new Date()) {
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

export function inRange(iso: string, range: RangeId, now = new Date()) {
  const d = parseDay(iso);
  return d >= rangeStart(range, now) && d <= now;
}

export const WORK_STATUS: { id: WorkStatus; label: string }[] = [
  { id: "on-hold", label: "On hold" },
  { id: "scheduled", label: "Scheduled" },
  { id: "in-progress", label: "In progress" },
  { id: "needs-review", label: "Needs review" },
  { id: "done", label: "Done" },
];

export function workStatusLabel(s: WorkStatus) {
  return WORK_STATUS.find((x) => x.id === s)?.label ?? s;
}

export const DEAL_STAGES: { id: DealStage; label: string }[] = [
  { id: "lead", label: "Lead" },
  { id: "qualified", label: "Qualified" },
  { id: "proposal", label: "Proposal" },
  { id: "won", label: "Won" },
  { id: "lost", label: "Lost" },
];

export function dealStageLabel(s: DealStage) {
  return DEAL_STAGES.find((x) => x.id === s)?.label ?? s;
}

export function statusTone(
  s: WorkStatus | FinanceStatus | ComplianceStatus | CustomerStatus | DealStage,
) {
  if (s === "done" || s === "paid" || s === "Up to date" || s === "active" || s === "won") return "ready";
  if (s === "overdue" || s === "Urgent" || s === "inactive" || s === "lost") return "urgent";
  if (
    s === "needs-review" ||
    s === "outstanding" ||
    s === "Due soon" ||
    s === "prospect" ||
    s === "proposal" ||
    s === "qualified"
  )
    return "soon";
  return "neutral";
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

/** The fourtee2 wordmark is never title case. */
export function brandCase(value: string) {
  return value.replace(/fourtee2/gi, "fourtee2");
}

export function relativeFrom(iso: string, now = new Date()) {
  const t = parseDay(iso).getTime();
  const diff = now.getTime() - t;
  const mins = Math.round(diff / 60000);
  if (mins < 2) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return fmtDay(iso, "d MMM");
}

export function startOfWeekIso(d = new Date()) {
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return format(monday, "yyyy-MM-dd");
}

export function weekDays(startIso: string) {
  return Array.from({ length: 7 }, (_, i) => addDaysIso(startIso, i));
}

export function formatDuration(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

export function roundHours(hours: number) {
  return Math.round(hours * 4) / 4;
}

export function downloadCsv(filename: string, rows: (string | number)[][]) {
  const body = rows
    .map((row) =>
      row
        .map((cell) => {
          const value = String(cell ?? "");
          if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
          return value;
        })
        .join(","),
    )
    .join("\n");
  const blob = new Blob([body], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadText(filename: string, body: string) {
  const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
