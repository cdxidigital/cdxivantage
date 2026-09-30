import { useMemo, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { useVantage } from "@/lib/vantage/store";
import { DEAL_STAGES, dealStageLabel, fmtDay, money } from "@/lib/vantage/format";
import { customerName, pipelineValue } from "@/lib/vantage/selectors";
import type { Deal, DealStage } from "@/lib/vantage/types";

const OPEN: DealStage[] = ["lead", "qualified", "proposal"];

export function PipelineView({ onCreate }: { onCreate: () => void }) {
  const data = useVantage();
  const moveDeal = useVantage((s) => s.moveDeal);
  const updateDeal = useVantage((s) => s.updateDeal);
  const removeDeal = useVantage((s) => s.removeDeal);
  const [selected, setSelected] = useState<Deal | null>(null);
  const [q, setQ] = useState("");
  const [showClosed, setShowClosed] = useState(false);
  const [over, setOver] = useState<DealStage | null>(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return data.deals.filter((d) => {
      if (!showClosed && (d.stage === "won" || d.stage === "lost")) return false;
      if (!query) return true;
      return (
        d.title.toLowerCase().includes(query) ||
        d.owner.toLowerCase().includes(query) ||
        customerName(data, d.customerId).toLowerCase().includes(query)
      );
    });
  }, [data, q, showClosed]);

  const columns = showClosed ? DEAL_STAGES.map((s) => s.id) : OPEN;
  const openValue = pipelineValue(data);
  const won = data.deals.filter((d) => d.stage === "won").reduce((s, d) => s + d.value, 0);

  return (
    <>
      <div className="metric-grid">
        <div className="metric-card">
          <div className="metric-top">
            <span>Open pipeline</span>
          </div>
          <strong className="metric-value">{money(openValue)}</strong>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <span>Active deals</span>
          </div>
          <strong className="metric-value">{data.deals.filter((d) => d.stage !== "won" && d.stage !== "lost").length}</strong>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <span>Won</span>
          </div>
          <strong className="metric-value">{money(won)}</strong>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <span>Proposal stage</span>
          </div>
          <strong className="metric-value">
            {money(data.deals.filter((d) => d.stage === "proposal").reduce((s, d) => s + d.value, 0))}
          </strong>
        </div>
      </div>
      <div className="toolbar">
        <input
          type="search"
          placeholder="Filter deals"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Filter deals"
        />
        <button className="button-ghost" onClick={() => setShowClosed((v) => !v)}>
          {showClosed ? "Hide closed" : "Show closed"}
        </button>
        <span className="grow" />
        <button className="button-primary" onClick={onCreate}>
          <Plus size={16} /> New deal
        </button>
      </div>
      {filtered.length === 0 ? (
        <section className="module-placeholder panel">
          <p className="panel-kicker">Pipeline</p>
          <h2>No deals in this view</h2>
          <p>Add a deal to see value move from lead to won.</p>
          <button className="button-primary" onClick={onCreate}>
            <Plus size={16} /> Create deal
          </button>
        </section>
      ) : (
        <div className="kanban">
          {columns.map((stage) => {
            const items = filtered.filter((d) => d.stage === stage);
            const total = items.reduce((s, d) => s + d.value, 0);
            return (
              <section
                className={`kanban-col ${over === stage ? "drop-over" : ""}`}
                key={stage}
                onDragOver={(e) => {
                  e.preventDefault();
                  setOver(stage);
                }}
                onDragLeave={() => setOver((cur) => (cur === stage ? null : cur))}
                onDrop={(e) => {
                  e.preventDefault();
                  setOver(null);
                  const id = e.dataTransfer.getData("text/deal-id");
                  if (id) {
                    moveDeal(id, stage);
                    toast.success(`Moved to ${dealStageLabel(stage)}`);
                  }
                }}
              >
                <header>
                  <span>{dealStageLabel(stage)}</span>
                  <em>
                    {items.length} · {money(total)}
                  </em>
                </header>
                {items.map((item) => (
                  <button
                    key={item.id}
                    className="kanban-card"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/deal-id", item.id);
                      e.dataTransfer.effectAllowed = "move";
                    }}
                    onClick={() => setSelected(item)}
                  >
                    <strong>{item.title}</strong>
                    <span>
                      {item.owner} · {fmtDay(item.closeDate)}
                    </span>
                    <footer>
                      <em className="prio medium">{money(item.value)}</em>
                      <span>{customerName(data, item.customerId) || "No account"}</span>
                    </footer>
                  </button>
                ))}
              </section>
            );
          })}
        </div>
      )}

      {selected && (
        <div
          className="dialog-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <section className="create-dialog wide" role="dialog" aria-modal="true">
            <div className="dialog-header">
              <div>
                <p className="panel-kicker">Deal</p>
                <h2>{selected.title}</h2>
              </div>
              <button className="icon-button" onClick={() => setSelected(null)} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <form
              className="form-grid two"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                updateDeal(selected.id, {
                  title: String(fd.get("title")),
                  stage: String(fd.get("stage")) as DealStage,
                  value: Number(fd.get("value") || 0),
                  closeDate: String(fd.get("closeDate")),
                  owner: String(fd.get("owner")),
                  notes: String(fd.get("notes")),
                  customerId: String(fd.get("customerId") || "") || undefined,
                });
                toast.success("Deal updated");
                setSelected(null);
              }}
            >
              <div className="field full">
                <label htmlFor="dl-title">Title</label>
                <input id="dl-title" name="title" defaultValue={selected.title} />
              </div>
              <div className="field">
                <label htmlFor="dl-stage">Stage</label>
                <select id="dl-stage" name="stage" defaultValue={selected.stage}>
                  {DEAL_STAGES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="dl-val">Value (AUD)</label>
                <input id="dl-val" name="value" type="number" defaultValue={selected.value} />
              </div>
              <div className="field">
                <label htmlFor="dl-close">Close date</label>
                <input id="dl-close" name="closeDate" type="date" defaultValue={selected.closeDate} />
              </div>
              <div className="field">
                <label htmlFor="dl-owner">Owner</label>
                <input id="dl-owner" name="owner" defaultValue={selected.owner} />
              </div>
              <div className="field full">
                <label htmlFor="dl-cus">Customer</label>
                <select id="dl-cus" name="customerId" defaultValue={selected.customerId ?? ""}>
                  <option value="">No account yet</option>
                  {data.customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field full">
                <label htmlFor="dl-notes">Notes</label>
                <textarea id="dl-notes" name="notes" defaultValue={selected.notes} rows={3} />
              </div>
              <div className="dialog-actions full">
                <button
                  type="button"
                  className="button-ghost danger"
                  onClick={() => {
                    removeDeal(selected.id);
                    toast.success("Deal removed");
                    setSelected(null);
                  }}
                >
                  <Trash2 size={14} /> Delete
                </button>
                {selected.stage !== "won" && (
                  <button
                    type="button"
                    className="button-ghost"
                    onClick={() => {
                      moveDeal(selected.id, "won");
                      toast.success("Marked won");
                      setSelected(null);
                    }}
                  >
                    Mark won
                  </button>
                )}
                <button className="button-primary" type="submit">
                  Save
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
