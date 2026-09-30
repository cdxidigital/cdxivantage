import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useVantage } from "@/lib/vantage/store";
import { customerName, outstandingTotal, paidRevenue } from "@/lib/vantage/selectors";
import { fmtDay, money } from "@/lib/vantage/format";
import type { FinanceRecord, FinanceStatus } from "@/lib/vantage/types";
import { PracticePanel } from "./practice";

export function FinanceView({ onCreate }: { onCreate: () => void }) {
  const data = useVantage();
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return data.finance.filter((f) => {
      if (type !== "all" && f.type !== type) return false;
      return !query || f.title.toLowerCase().includes(query);
    });
  }, [data.finance, q, type]);

  const revenue = paidRevenue(data.finance, data.range);
  const outstanding = outstandingTotal(data.finance);
  const overdue = data.finance.filter((f) => f.status === "overdue").reduce((s, f) => s + f.amount, 0);

  return (
    <>
      <div className="metric-grid">
        <div className="metric-card">
          <div className="metric-top">
            <span>Paid this period</span>
          </div>
          <strong className="metric-value">{money(revenue)}</strong>
          <div className="metric-change positive">
            <span>Invoices marked paid</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <span>Outstanding</span>
          </div>
          <strong className="metric-value">{money(outstanding)}</strong>
          <div className="metric-change negative">
            <span>Awaiting payment</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <span>Overdue</span>
          </div>
          <strong className="metric-value">{money(overdue)}</strong>
          <div className="metric-change negative">
            <span>Needs follow-up</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <span>Records</span>
          </div>
          <strong className="metric-value">{data.finance.length}</strong>
          <div className="metric-change positive">
            <span>In the ledger</span>
          </div>
        </div>
      </div>
      <PracticePanel />
      <div className="toolbar">
        <input type="search" placeholder="Search ledger" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search finance" />
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Filter type">
          <option value="all">All types</option>
          <option value="invoice">Invoices</option>
          <option value="payment">Payments</option>
          <option value="expense">Expenses</option>
        </select>
        <span className="grow" />
        <button className="button-primary" onClick={onCreate}>
          <Plus size={16} /> Log record
        </button>
      </div>
      <section className="panel">
        {list.length === 0 ? (
          <div className="compliance-empty">
            <strong>Ledger is empty</strong>
            <span>Log an invoice or expense to start the operating picture.</span>
            <button className="button-primary" onClick={onCreate}>
              <Plus size={15} /> Log record
            </button>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Type</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th className="num">Amount</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {list.map((row) => (
                <FinanceRow key={row.id} row={row} />
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}

function FinanceRow({ row }: { row: FinanceRecord }) {
  const data = useVantage();
  const updateFinance = useVantage((s) => s.updateFinance);
  const removeFinance = useVantage((s) => s.removeFinance);
  return (
    <tr>
      <td>
        <strong>{row.title}</strong>
      </td>
      <td style={{ textTransform: "capitalize" }}>{row.type}</td>
      <td>{customerName(data, row.customerId) || "—"}</td>
      <td>{fmtDay(row.date, "d MMM yyyy")}</td>
      <td>
        <select
          className="filter-select"
          value={row.status}
          aria-label={`Status for ${row.title}`}
          onChange={(e) => {
            updateFinance(row.id, { status: e.target.value as FinanceStatus });
            toast.success("Status updated");
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <option value="draft">Draft</option>
          <option value="outstanding">Outstanding</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
      </td>
      <td className="num">{money(row.amount)}</td>
      <td>
        <div className="row-actions">
          <button
            className="icon-button"
            aria-label={`Delete ${row.title}`}
            onClick={(e) => {
              e.stopPropagation();
              removeFinance(row.id);
              toast.success("Record removed");
            }}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
}
