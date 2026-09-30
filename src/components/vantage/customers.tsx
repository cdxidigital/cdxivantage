import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useVantage } from "@/lib/vantage/store";
import { fmtDay, money, statusTone } from "@/lib/vantage/format";
import type { Customer, CustomerStatus } from "@/lib/vantage/types";

export function CustomersView({ onCreate }: { onCreate: () => void }) {
  const customers = useVantage((s) => s.customers);
  const updateCustomer = useVantage((s) => s.updateCustomer);
  const removeCustomer = useVantage((s) => s.removeCustomer);
  const work = useVantage((s) => s.work);
  const finance = useVantage((s) => s.finance);
  const events = useVantage((s) => s.events);
  const deals = useVantage((s) => s.deals);
  const setModule = useVantage((s) => s.setModule);
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(customers[0]?.id ?? null);

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return customers.filter(
      (c) =>
        !query ||
        c.name.toLowerCase().includes(query) ||
        c.contact.toLowerCase().includes(query) ||
        c.industry.toLowerCase().includes(query),
    );
  }, [customers, q]);

  const selected = customers.find((c) => c.id === selectedId) ?? list[0] ?? null;

  return (
    <>
      <div className="toolbar">
        <input
          type="search"
          placeholder="Search customers"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search customers"
        />
        <span className="grow" />
        <button className="button-primary" onClick={onCreate}>
          <Plus size={16} /> Add customer
        </button>
      </div>
      {customers.length === 0 ? (
        <section className="module-placeholder panel">
          <p className="panel-kicker">Customers</p>
          <h2>No customers yet</h2>
          <p>Add a customer to start tracking value, work, and invoices in one place.</p>
          <button className="button-primary" onClick={onCreate}>
            <Plus size={16} /> Add customer
          </button>
        </section>
      ) : (
        <div className="split">
          <section className="panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">Directory</p>
                <h2>{list.length} accounts</h2>
              </div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th className="num">Value</th>
                </tr>
              </thead>
              <tbody>
                {list.map((c) => (
                  <tr key={c.id} onClick={() => setSelectedId(c.id)}>
                    <td>
                      <strong>{c.name}</strong>
                      <div className="muted-line">{c.industry}</div>
                    </td>
                    <td>{c.contact}</td>
                    <td>
                      <span className={`status-chip ${statusTone(c.status)}`}>{c.status}</span>
                    </td>
                    <td className="num">{money(c.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          {selected && (
            <CustomerDetail
              customer={selected}
              relatedWork={work.filter((w) => w.customerId === selected.id)}
              relatedFinance={finance.filter((f) => f.customerId === selected.id)}
              relatedEvents={events.filter((e) =>
                work.some((w) => w.customerId === selected.id && w.id === e.relatedWorkId),
              )}
              relatedDeals={deals.filter((d) => d.customerId === selected.id)}
              onSave={(patch) => {
                updateCustomer(selected.id, patch);
                toast.success("Customer updated");
              }}
              onDelete={() => {
                removeCustomer(selected.id);
                setSelectedId(null);
                toast.success("Customer removed");
              }}
              onOpen={(module) => setModule(module)}
            />
          )}
        </div>
      )}
    </>
  );
}

function CustomerDetail({
  customer,
  relatedWork,
  relatedFinance,
  relatedEvents,
  relatedDeals,
  onSave,
  onDelete,
  onOpen,
}: {
  customer: Customer;
  relatedWork: { id: string; title: string; status: string }[];
  relatedFinance: { id: string; title: string; amount: number; status: string }[];
  relatedEvents: { id: string; title: string; date: string }[];
  relatedDeals: { id: string; title: string; stage: string; value: number }[];
  onSave: (patch: Partial<Customer>) => void;
  onDelete: () => void;
  onOpen: (module: "work" | "finance" | "calendar" | "pipeline") => void;
}) {
  const outstanding = relatedFinance
    .filter((f) => f.status === "outstanding" || f.status === "overdue")
    .reduce((s, f) => s + f.amount, 0);

  return (
    <section className="panel detail-card">
      <p className="panel-kicker">{customer.location}</p>
      <h3>{customer.name}</h3>
      <p className="heading-note">{customer.notes || "No notes yet."}</p>
      <div className="detail-meta">
        <div>
          Contact <b>{customer.contact || "—"}</b>
        </div>
        <div>
          Email <b>{customer.email || "—"}</b>
        </div>
        <div>
          Industry <b>{customer.industry}</b>
        </div>
        <div>
          Open work <b>{relatedWork.filter((w) => w.status !== "done").length}</b>
        </div>
        <div>
          Outstanding <b>{money(outstanding)}</b>
        </div>
        <div>
          Pipeline <b>{relatedDeals.filter((d) => d.stage !== "won" && d.stage !== "lost").length}</b>
        </div>
      </div>

      <div className="related-stack">
        {relatedWork.slice(0, 3).map((w) => (
          <button key={w.id} className="related-chip" onClick={() => onOpen("work")}>
            Work · {w.title}
          </button>
        ))}
        {relatedDeals.slice(0, 2).map((d) => (
          <button key={d.id} className="related-chip" onClick={() => onOpen("pipeline")}>
            Deal · {d.title} · {money(d.value)}
          </button>
        ))}
        {relatedFinance.slice(0, 2).map((f) => (
          <button key={f.id} className="related-chip" onClick={() => onOpen("finance")}>
            {f.title} · {money(f.amount)}
          </button>
        ))}
        {relatedEvents.slice(0, 2).map((e) => (
          <button key={e.id} className="related-chip" onClick={() => onOpen("calendar")}>
            {fmtDay(e.date)} · {e.title}
          </button>
        ))}
      </div>

      <form
        className="form-grid two"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          onSave({
            status: String(fd.get("status")) as CustomerStatus,
            value: Number(fd.get("value") || 0),
            notes: String(fd.get("notes") || ""),
            contact: String(fd.get("contact") || ""),
            email: String(fd.get("email") || ""),
            followUp: String(fd.get("followUp") || ""),
          });
        }}
      >
        <div className="field">
          <label htmlFor="cs-status">Status</label>
          <select id="cs-status" name="status" defaultValue={customer.status} key={customer.id + customer.status}>
            <option value="active">Active</option>
            <option value="prospect">Prospect</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="cs-val">Annual value</label>
          <input id="cs-val" name="value" type="number" defaultValue={customer.value} key={customer.id} />
        </div>
        <div className="field">
          <label htmlFor="cs-contact">Contact</label>
          <input id="cs-contact" name="contact" defaultValue={customer.contact} key={customer.id + "c"} />
        </div>
        <div className="field">
          <label htmlFor="cs-email">Email</label>
          <input id="cs-email" name="email" defaultValue={customer.email} key={customer.id + "e"} />
        </div>
        <div className="field">
          <label htmlFor="cs-fu">Follow up</label>
          <input id="cs-fu" name="followUp" type="date" defaultValue={customer.followUp} key={customer.id + "f"} />
        </div>
        <div className="field full">
          <label htmlFor="cs-notes">Notes</label>
          <textarea id="cs-notes" name="notes" defaultValue={customer.notes} key={customer.id + "n"} rows={3} />
        </div>
        <div className="dialog-actions full">
          <button type="button" className="button-ghost danger" onClick={onDelete}>
            <Trash2 size={14} /> Remove
          </button>
          <button className="button-primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </section>
  );
}
