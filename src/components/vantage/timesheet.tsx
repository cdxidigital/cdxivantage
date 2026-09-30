import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Square } from "lucide-react";
import { toast } from "sonner";
import { useVantage } from "@/lib/vantage/store";
import { addDaysIso, downloadCsv, fmtDay, startOfWeekIso, todayIso, weekDays } from "@/lib/vantage/format";
import { hoursForDay, hoursThisWeek } from "@/lib/vantage/selectors";
import type { WorkItem } from "@/lib/vantage/types";

export function TimesheetView() {
  const data = useVantage();
  const setTimeForDay = useVantage((s) => s.setTimeForDay);
  const startTimer = useVantage((s) => s.startTimer);
  const stopTimer = useVantage((s) => s.stopTimer);
  const [weekStart, setWeekStart] = useState(() => startOfWeekIso());
  const days = weekDays(weekStart);
  const today = todayIso();
  const person = data.profile.name;

  const rows = useMemo(() => {
    const ids = new Set<string>();
    const list: WorkItem[] = [];
    for (const w of data.work) {
      if (w.status !== "done") {
        list.push(w);
        ids.add(w.id);
      }
    }
    for (const t of data.timeLogs) {
      if (days.includes(t.date) && !ids.has(t.workId)) {
        const w = data.work.find((item) => item.id === t.workId);
        if (w) {
          list.push(w);
          ids.add(w.id);
        }
      }
    }
    return list;
  }, [data.work, data.timeLogs, days]);

  const weekHours = days.reduce(
    (sum, day) => sum + data.timeLogs.filter((t) => t.date === day).reduce((n, t) => n + t.hours, 0),
    0,
  );
  const mine = days.reduce(
    (sum, day) =>
      sum + data.timeLogs.filter((t) => t.date === day && t.person === person).reduce((n, t) => n + t.hours, 0),
    0,
  );

  const exportSheet = () => {
    const header = ["Work", "Owner", ...days.map((d) => fmtDay(d, "EEE d MMM")), "Total"];
    const body = rows.map((w) => {
      const cells = days.map((d) => hoursForDay(data, w.id, d, person));
      return [w.title, w.owner, ...cells, cells.reduce((n, v) => n + v, 0)];
    });
    downloadCsv(`timesheet-${weekStart}.csv`, [header, ...body]);
    toast.success("Timesheet exported");
  };

  return (
    <>
      <div className="metric-grid">
        <div className="metric-card">
          <div className="metric-top">
            <span>This week</span>
          </div>
          <strong className="metric-value">{hoursThisWeek(data)}h</strong>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <span>Selected week</span>
          </div>
          <strong className="metric-value">{weekHours}h</strong>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <span>Your hours</span>
          </div>
          <strong className="metric-value">{mine}h</strong>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <span>Open work</span>
          </div>
          <strong className="metric-value">{data.work.filter((w) => w.status !== "done").length}</strong>
        </div>
      </div>

      <div className="toolbar">
        <button
          className="button-ghost"
          onClick={() => setWeekStart(addDaysIso(weekStart, -7))}
          aria-label="Previous week"
        >
          <ChevronLeft size={16} />
        </button>
        <strong className="week-label">
          {fmtDay(weekStart, "d MMM")} – {fmtDay(days[6] ?? weekStart, "d MMM yyyy")}
        </strong>
        <button
          className="button-ghost"
          onClick={() => setWeekStart(addDaysIso(weekStart, 7))}
          aria-label="Next week"
        >
          <ChevronRight size={16} />
        </button>
        <button className="button-ghost" onClick={() => setWeekStart(startOfWeekIso())}>
          This week
        </button>
        <span className="grow" />
        <button className="button-ghost" onClick={exportSheet}>
          Export CSV
        </button>
      </div>

      {rows.length === 0 ? (
        <section className="module-placeholder panel">
          <p className="panel-kicker">Time</p>
          <h2>Nothing to log yet</h2>
          <p>Create work items and the weekly grid will appear here.</p>
        </section>
      ) : (
        <section className="panel timesheet-panel">
          <div className="timesheet-scroll">
            <table className="timesheet">
              <thead>
                <tr>
                  <th>Work</th>
                  {days.map((day) => (
                    <th key={day} className={day === today ? "today" : ""}>
                      {fmtDay(day, "EEE")}
                      <small>{fmtDay(day, "d MMM")}</small>
                    </th>
                  ))}
                  <th>Total</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((w) => {
                  const cells = days.map((day) => hoursForDay(data, w.id, day, person));
                  const total = cells.reduce((n, v) => n + v, 0);
                  const running = data.timer?.workId === w.id;
                  return (
                    <tr key={w.id}>
                      <td>
                        <strong>{w.title}</strong>
                        <div className="muted-line">
                          {w.owner} · {w.status.replace("-", " ")}
                        </div>
                      </td>
                      {days.map((day, i) => (
                        <td key={day} className={day === today ? "today" : ""}>
                          <input
                            type="number"
                            min={0}
                            step={0.25}
                            aria-label={`${w.title} ${fmtDay(day)}`}
                            defaultValue={cells[i] || ""}
                            key={`${w.id}-${day}-${cells[i]}`}
                            onBlur={(e) => {
                              const next = Number(e.target.value || 0);
                              if (!Number.isFinite(next) || next === cells[i]) return;
                              setTimeForDay(w.id, day, next);
                            }}
                          />
                        </td>
                      ))}
                      <td className="num">{total || "—"}</td>
                      <td>
                        {running ? (
                          <button
                            className="button-ghost"
                            onClick={() => {
                              const result = stopTimer();
                              if (result && result.hours >= 0.25) toast.success(`Logged ${result.hours}h`);
                              else toast("Timer stopped");
                            }}
                          >
                            <Square size={13} /> Stop
                          </button>
                        ) : (
                          <button className="button-ghost" onClick={() => startTimer(w.id)}>
                            <Play size={13} /> Start
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
}
