import { useVantage } from "@/lib/vantage/store";
import {
  activeCustomers,
  complianceScore,
  hoursByPerson,
  hoursLogged,
  openWork,
  outstandingTotal,
  paidRevenue,
  pipelineValue,
  workByStatus,
  wonValue,
} from "@/lib/vantage/selectors";
import { brandCase, dealStageLabel, downloadCsv, downloadText, money, rangeLabel, workStatusLabel } from "@/lib/vantage/format";
import { buildPassport, stageLabel } from "@/lib/vantage/lifecycle";
import type { DealStage, WorkStatus } from "@/lib/vantage/types";
import { toast } from "sonner";

export function ReportsView() {
  const data = useVantage();
  const revenue = paidRevenue(data.finance, data.range);
  const outstanding = outstandingTotal(data.finance);
  const counts = workByStatus(data);
  const open = openWork(data).length;
  const score = complianceScore(data);
  const customers = activeCustomers(data);
  const pipeline = pipelineValue(data);
  const won = wonValue(data, data.range);
  const hours = hoursLogged(data, data.range);
  const people = hoursByPerson(data, data.range);

  const byCustomer = customers
    .map((c) => ({
      name: c.name,
      value: data.finance
        .filter((f) => f.customerId === c.id && f.type === "invoice" && f.status === "paid")
        .reduce((s, f) => s + f.amount, 0),
    }))
    .sort((a, b) => b.value - a.value);
  const maxCust = Math.max(1, ...byCustomer.map((c) => c.value));

  const statuses: WorkStatus[] = ["in-progress", "needs-review", "scheduled", "on-hold", "done"];
  const maxWork = Math.max(1, ...statuses.map((s) => counts[s]));
  const stages: DealStage[] = ["lead", "qualified", "proposal", "won", "lost"];
  const stageValue = (stage: DealStage) =>
    data.deals.filter((d) => d.stage === stage).reduce((s, d) => s + d.value, 0);
  const maxDeal = Math.max(1, ...stages.map(stageValue));
  const maxHours = Math.max(1, ...people.map((p) => p.hours));

  const exportAll = () => {
    downloadCsv(`vantage-report-${data.range}.csv`, [
      ["Metric", "Value"],
      ["Revenue", revenue],
      ["Outstanding", outstanding],
      ["Pipeline", pipeline],
      ["Won", won],
      ["Hours", hours],
      ["Open work", open],
      ["Compliance score", score],
      ["Lifecycle", stageLabel(data.lifecycle)],
    ]);
    toast.success("Report exported");
  };

  const exportPassport = () => {
    downloadText(
      `business-passport-${(data.business.tradingName || data.workspaceName).replace(/\s+/g, "-").toLowerCase()}.txt`,
      buildPassport(data),
    );
    toast.success("Business Passport downloaded");
  };

  return (
    <>
      <div className="toolbar">
        <span className="grow" />
        <button className="button-ghost" onClick={exportPassport}>
          Download Business Passport
        </button>
        <button className="button-ghost" onClick={exportAll}>
          Export CSV
        </button>
      </div>
      <section className="panel passport-panel">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Exit engine</p>
            <h2>Business Passport</h2>
          </div>
        </div>
        <p>
          A hand-over-ready snapshot of {brandCase(data.business.legalName || data.workspaceName)}
          {data.business.abn ? ` · ABN ${data.business.abn}` : ""} · stage {stageLabel(data.lifecycle)}. Use this pack
          for a buyer, successor, or incoming operator.
        </p>
      </section>
      <div className="metric-grid">
        <div className="metric-card">
          <div className="metric-top">
            <span>{rangeLabel(data.range)} revenue</span>
          </div>
          <strong className="metric-value">{money(revenue)}</strong>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <span>Open pipeline</span>
          </div>
          <strong className="metric-value">{money(pipeline)}</strong>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <span>Hours logged</span>
          </div>
          <strong className="metric-value">{hours}h</strong>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <span>Compliance score</span>
          </div>
          <strong className="metric-value">{score}%</strong>
        </div>
      </div>
      <div className="report-grid">
        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Customers</p>
              <h2>Paid invoices by account</h2>
            </div>
          </div>
          <div className="bar-list">
            {byCustomer.length === 0 && <p className="heading-note">Add customers and paid invoices to populate this report.</p>}
            {byCustomer.map((row) => (
              <div className="bar-row" key={row.name}>
                <span>{row.name}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${(row.value / maxCust) * 100}%` }} />
                </div>
                <em>{money(row.value)}</em>
              </div>
            ))}
          </div>
        </section>
        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Delivery</p>
              <h2>Work by status</h2>
            </div>
          </div>
          <div className="bar-list">
            {statuses.map((status) => (
              <div className="bar-row" key={status}>
                <span>{workStatusLabel(status)}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${(counts[status] / maxWork) * 100}%` }} />
                </div>
                <em>{counts[status]}</em>
              </div>
            ))}
          </div>
        </section>
        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Sales</p>
              <h2>Pipeline by stage</h2>
            </div>
          </div>
          <div className="bar-list">
            {data.deals.length === 0 && <p className="heading-note">Add deals to see the funnel.</p>}
            {stages.map((stage) => (
              <div className="bar-row" key={stage}>
                <span>{dealStageLabel(stage)}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${(stageValue(stage) / maxDeal) * 100}%` }} />
                </div>
                <em>{money(stageValue(stage))}</em>
              </div>
            ))}
          </div>
        </section>
        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Capacity</p>
              <h2>Hours by person</h2>
            </div>
          </div>
          <div className="bar-list">
            {people.length === 0 && <p className="heading-note">Log time to see utilisation.</p>}
            {people.map((row) => (
              <div className="bar-row" key={row.name}>
                <span>{row.name}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${(row.hours / maxHours) * 100}%` }} />
                </div>
                <em>{row.hours}h</em>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
