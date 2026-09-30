import { useMemo, useState } from "react";
import { Play, Plus, Square, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { useVantage } from "@/lib/vantage/store";
import { fmtDay, WORK_STATUS, workStatusLabel } from "@/lib/vantage/format";
import type { WorkItem, WorkStatus } from "@/lib/vantage/types";

const COLS: WorkStatus[] = ["on-hold", "scheduled", "in-progress", "needs-review"];

export function WorkBoard({ onCreate }: { onCreate: () => void }) {
  const work = useVantage((s) => s.work);
  const customers = useVantage((s) => s.customers);
  const moveWork = useVantage((s) => s.moveWork);
  const updateWork = useVantage((s) => s.updateWork);
  const removeWork = useVantage((s) => s.removeWork);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [showDone, setShowDone] = useState(false);
  const [over, setOver] = useState<WorkStatus | null>(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return work.filter((w) => {
      if (!showDone && w.status === "done") return false;
      if (!query) return true;
      return (
        w.title.toLowerCase().includes(query) ||
        w.owner.toLowerCase().includes(query) ||
        w.team.toLowerCase().includes(query)
      );
    });
  }, [work, q, showDone]);

  const selected = work.find((w) => w.id === selectedId) ?? null;
  const columns = showDone ? [...COLS, "done" as const] : COLS;

  return (
    <>
      <div className="toolbar">
        <input
          type="search"
          placeholder="Filter work"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Filter work"
        />
        <button className="button-ghost" onClick={() => setShowDone((v) => !v)}>
          {showDone ? "Hide done" : "Show done"}
        </button>
        <span className="grow" />
        <button className="button-primary" onClick={onCreate}>
          <Plus size={16} /> New work
        </button>
      </div>
      {filtered.length === 0 ? (
        <section className="module-placeholder panel">
          <p className="panel-kicker">Work</p>
          <h2>No work in this view</h2>
          <p>Create a work item or clear the filter to see the pipeline.</p>
          <button className="button-primary" onClick={onCreate}>
            <Plus size={16} /> Create work
          </button>
        </section>
      ) : (
        <div className="kanban">
          {columns.map((status) => {
            const items = filtered.filter((w) => w.status === status);
            return (
              <section
                className={`kanban-col ${over === status ? "drop-over" : ""}`}
                key={status}
                onDragOver={(e) => {
                  e.preventDefault();
                  setOver(status);
                }}
                onDragLeave={() => setOver((cur) => (cur === status ? null : cur))}
                onDrop={(e) => {
                  e.preventDefault();
                  setOver(null);
                  const id = e.dataTransfer.getData("text/work-id");
                  if (id) {
                    moveWork(id, status);
                    toast.success(`Moved to ${workStatusLabel(status)}`);
                  }
                }}
              >
                <header>
                  <span>{workStatusLabel(status)}</span>
                  <em>{items.length}</em>
                </header>
                {items.map((item) => {
                  const checks = item.checklist ?? [];
                  const done = checks.filter((c) => c.done).length;
                  return (
                    <button
                      key={item.id}
                      className="kanban-card"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/work-id", item.id);
                        e.dataTransfer.effectAllowed = "move";
                      }}
                      onClick={() => setSelectedId(item.id)}
                    >
                      <strong>{item.title}</strong>
                      <span>
                        {item.owner} · {fmtDay(item.due)}
                      </span>
                      {checks.length > 0 && (
                        <span>
                          {done}/{checks.length} checks · {item.hours || 0}h
                        </span>
                      )}
                      <footer>
                        <em className={`prio ${item.priority}`}>{item.priority}</em>
                        <span>{customers.find((c) => c.id === item.customerId)?.name || "Internal"}</span>
                      </footer>
                    </button>
                  );
                })}
              </section>
            );
          })}
        </div>
      )}

      {selected && (
        <WorkDetail
          item={selected}
          onClose={() => setSelectedId(null)}
          onSave={(patch) => {
            updateWork(selected.id, patch);
            toast.success("Work updated");
            setSelectedId(null);
          }}
          onDelete={() => {
            removeWork(selected.id);
            toast.success("Work removed");
            setSelectedId(null);
          }}
          onDone={() => {
            moveWork(selected.id, "done");
            toast.success("Marked done");
            setSelectedId(null);
          }}
        />
      )}
    </>
  );
}

function WorkDetail({
  item,
  onClose,
  onSave,
  onDelete,
  onDone,
}: {
  item: WorkItem;
  onClose: () => void;
  onSave: (patch: Partial<WorkItem>) => void;
  onDelete: () => void;
  onDone: () => void;
}) {
  const addCheck = useVantage((s) => s.addCheck);
  const toggleCheck = useVantage((s) => s.toggleCheck);
  const removeCheck = useVantage((s) => s.removeCheck);
  const logTime = useVantage((s) => s.logTime);
  const startTimer = useVantage((s) => s.startTimer);
  const stopTimer = useVantage((s) => s.stopTimer);
  const timer = useVantage((s) => s.timer);
  const timeLogs = useVantage((s) => s.timeLogs);
  const [checkTitle, setCheckTitle] = useState("");
  const running = timer?.workId === item.id;
  const checks = item.checklist ?? [];
  const recentLogs = timeLogs.filter((t) => t.workId === item.id).slice(0, 5);

  return (
    <div
      className="dialog-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section className="create-dialog wide" role="dialog" aria-modal="true">
        <div className="dialog-header">
          <div>
            <p className="panel-kicker">Work item</p>
            <h2>{item.title}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <form
          className="form-grid two"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            onSave({
              title: String(fd.get("title")),
              status: String(fd.get("status")) as WorkStatus,
              priority: String(fd.get("priority")) as WorkItem["priority"],
              due: String(fd.get("due")),
              owner: String(fd.get("owner")),
              notes: String(fd.get("notes")),
            });
          }}
        >
          <div className="field full">
            <label htmlFor="ed-title">Title</label>
            <input id="ed-title" name="title" defaultValue={item.title} />
          </div>
          <div className="field">
            <label htmlFor="ed-status">Status</label>
            <select id="ed-status" name="status" defaultValue={item.status}>
              {WORK_STATUS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="ed-prio">Priority</label>
            <select id="ed-prio" name="priority" defaultValue={item.priority}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="ed-due">Due</label>
            <input id="ed-due" name="due" type="date" defaultValue={item.due} />
          </div>
          <div className="field">
            <label htmlFor="ed-owner">Owner</label>
            <input id="ed-owner" name="owner" defaultValue={item.owner} />
          </div>
          <div className="field full">
            <label htmlFor="ed-notes">Notes</label>
            <textarea id="ed-notes" name="notes" defaultValue={item.notes} rows={3} />
          </div>

          <div className="field full checklist-block">
            <label>Checklist</label>
            {checks.length === 0 && <p className="heading-note">Break the work into checks the team can tick off.</p>}
            <ul className="check-list">
              {checks.map((c) => (
                <li key={c.id} className="check-row">
                  <label>
                    <input type="checkbox" checked={c.done} onChange={() => toggleCheck(item.id, c.id)} />
                    <span className={c.done ? "done" : ""}>{c.title}</span>
                  </label>
                  <button type="button" className="row-action" onClick={() => removeCheck(item.id, c.id)} aria-label="Remove check">
                    <Trash2 size={13} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="check-add">
              <input
                value={checkTitle}
                onChange={(e) => setCheckTitle(e.target.value)}
                placeholder="Add a check"
                aria-label="New check"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCheck(item.id, checkTitle);
                    setCheckTitle("");
                  }
                }}
              />
              <button
                type="button"
                className="button-ghost"
                onClick={() => {
                  addCheck(item.id, checkTitle);
                  setCheckTitle("");
                }}
              >
                Add
              </button>
            </div>
          </div>

          <div className="field full time-block">
            <label>Time</label>
            <p className="heading-note">{item.hours || 0}h logged against this item.</p>
            <div className="time-actions">
              {running ? (
                <button
                  type="button"
                  className="button-ghost"
                  onClick={() => {
                    const result = stopTimer();
                    if (result && result.hours >= 0.25) toast.success(`Logged ${result.hours}h`);
                    else toast("Timer stopped");
                  }}
                >
                  <Square size={14} /> Stop timer
                </button>
              ) : (
                <button type="button" className="button-ghost" onClick={() => startTimer(item.id)}>
                  <Play size={14} /> Start timer
                </button>
              )}
              <div className="log-inline">
                <input
                  id="log-hours"
                  type="number"
                  min={0.25}
                  step={0.25}
                  placeholder="Hours"
                  aria-label="Hours"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.currentTarget.parentElement?.querySelector("button")?.click();
                    }
                  }}
                />
                <input
                  id="log-note"
                  placeholder="Note"
                  aria-label="Time note"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.currentTarget.parentElement?.querySelector("button")?.click();
                    }
                  }}
                />
                <button
                  className="button-ghost"
                  type="button"
                  onClick={(e) => {
                    const root = e.currentTarget.parentElement;
                    if (!root) return;
                    const hoursInput = root.querySelector("#log-hours") as HTMLInputElement | null;
                    const noteInput = root.querySelector("#log-note") as HTMLInputElement | null;
                    const hours = Number(hoursInput?.value || 0);
                    logTime(item.id, hours, noteInput?.value || "Logged time");
                    if (hours > 0) toast.success(`Logged ${hours}h`);
                    if (hoursInput) hoursInput.value = "";
                    if (noteInput) noteInput.value = "";
                  }}
                >
                  Log
                </button>
              </div>
            </div>
            {recentLogs.length > 0 && (
              <ul className="time-log-list">
                {recentLogs.map((t) => (
                  <li key={t.id}>
                    <strong>{t.hours}h</strong> {t.person} · {fmtDay(t.date)} · {t.note}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="dialog-actions full">
            <button type="button" className="button-ghost danger" onClick={onDelete}>
              <Trash2 size={14} /> Delete
            </button>
            {item.status !== "done" && (
              <button type="button" className="button-ghost" onClick={onDone}>
                Mark done
              </button>
            )}
            <button className="button-primary" type="submit">
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
