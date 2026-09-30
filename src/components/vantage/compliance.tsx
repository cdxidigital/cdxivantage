import { useMemo, useState } from "react";
import { ArrowUpRight, Check, CircleHelp, FileCheck2, Landmark, Plus, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import { useVantage } from "@/lib/vantage/store";
import { PORTALS } from "@/lib/vantage/seed";
import { complianceScore, nextDeadline } from "@/lib/vantage/selectors";
import { fmtDay } from "@/lib/vantage/format";
import type { ComplianceStatus, Portal } from "@/lib/vantage/types";

export function ComplianceWorkspace({ onCreate }: { onCreate: () => void }) {
  const data = useVantage();
  const markReviewed = useVantage((s) => s.markReviewed);
  const connectPortal = useVantage((s) => s.connectPortal);
  const disconnectPortal = useVantage((s) => s.disconnectPortal);
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [selectedPortal, setSelectedPortal] = useState<Portal | null>(null);

  const categories = Array.from(new Set(data.compliance.map((r) => r.category)));
  const filtered = useMemo(
    () =>
      data.compliance.filter(
        (record) =>
          (statusFilter === "All statuses" || record.status === statusFilter) &&
          (categoryFilter === "All categories" || record.category === categoryFilter),
      ),
    [data.compliance, statusFilter, categoryFilter],
  );

  const urgent = data.compliance.filter((r) => r.status === "Urgent").length;
  const soon = data.compliance.filter((r) => r.status === "Due soon").length;
  const ready = data.compliance.filter((r) => r.status === "Up to date").length;
  const score = complianceScore(data);
  const next = nextDeadline(data);

  const chip = (status: ComplianceStatus) => status.toLowerCase().replace(" ", "-");

  return (
    <div className="compliance-workspace">
      <div className="compliance-intro">
        <div>
          <p className="panel-kicker">Australia-wide compliance</p>
          <h2>Stay registered. Stay ready.</h2>
          <p>
            Track core registrations, licences, permits, tax, privacy, employment, and insurance obligations in one
            guided workspace.
          </p>
        </div>
        <div className="compliance-score">
          <span>Readiness score</span>
          <strong>{score}%</strong>
          <small>Based on reviewed records</small>
        </div>
      </div>

      <div className="compliance-stats">
        <div>
          <span>Urgent</span>
          <strong className="status-urgent">{urgent}</strong>
          <small>Needs action now</small>
        </div>
        <div>
          <span>Due soon</span>
          <strong className="status-soon">{soon}</strong>
          <small>Next 30 days</small>
        </div>
        <div>
          <span>Up to date</span>
          <strong className="status-ready">{ready}</strong>
          <small>Reviewed records</small>
        </div>
        <div>
          <span>Next deadline</span>
          <strong>{next ? fmtDay(next.due, "d MMM") : "—"}</strong>
          <small>{next ? next.title : "Nothing pending"}</small>
        </div>
      </div>

      <div className="compliance-disclaimer">
        <CircleHelp size={16} />
        <span>
          This guided checklist is for operational planning, not legal advice. Requirements vary by business activity,
          structure, workforce, and state or territory. Confirm obligations with the relevant government authority or a
          qualified adviser.
        </span>
      </div>

      <section className="portal-section">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Secure access</p>
            <h2>Government portal connections</h2>
          </div>
          <span className="portal-beta-label">Beta · guided handoff</span>
        </div>
        <div className="portal-intro">
          <ShieldCheck size={16} />
          <span>
            vantage never collects government passwords, myGovID details, RAM credentials, or access tokens. Authenticate
            only on official government domains.
          </span>
        </div>
        <div className="portal-grid">
          {PORTALS.map((portal) => {
            const connected = data.connectedPortals.includes(portal.id);
            return (
              <article className={`portal-card ${portal.accent}`} key={portal.id}>
                <div className="portal-card-top">
                  <div className="portal-icon">
                    <Landmark size={18} />
                  </div>
                  <span className={connected ? "portal-state connected" : "portal-state"}>
                    {connected ? `Checked ${data.lastChecked[portal.id] || "today"}` : "Not connected"}
                  </span>
                </div>
                <p className="panel-kicker">{portal.label}</p>
                <h3>{portal.name}</h3>
                <p>{portal.description}</p>
                <small>Prerequisite: {portal.prerequisites}</small>
                <div className="portal-card-actions">
                  <button className="portal-connect-button" onClick={() => setSelectedPortal(portal)}>
                    {connected ? "Review access" : "Connect guide"} <ArrowUpRight size={14} />
                  </button>
                  {connected && (
                    <button
                      className="portal-check-button"
                      onClick={() => {
                        disconnectPortal(portal.id);
                        toast.success(`${portal.name} marked not connected`);
                      }}
                    >
                      Disconnect
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="panel compliance-panel">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Obligation register</p>
            <h2>Registrations, licences & controls</h2>
          </div>
          <a className="source-link" href="https://business.gov.au/" target="_blank" rel="noreferrer">
            Open business.gov.au <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="compliance-filters">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter compliance status">
            <option>All statuses</option>
            <option>Urgent</option>
            <option>Due soon</option>
            <option>Up to date</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter compliance category"
          >
            <option>All categories</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <button className="button-ghost" onClick={onCreate}>
            <Plus size={14} /> Add
          </button>
          <span>
            {filtered.length} of {data.compliance.length} records
          </span>
        </div>
        <div className="compliance-table">
          {filtered.length === 0 ? (
            <div className="compliance-empty">
              <FileCheck2 size={22} />
              <strong>Your compliance register is ready</strong>
              <span>Add your first registration, licence, permit, or policy review to begin tracking obligations.</span>
              <button
                className="button-primary"
                onClick={() => window.open("https://ablis.business.gov.au/", "_blank", "noopener,noreferrer")}
              >
                <Plus size={15} /> Start with ABLIS discovery
              </button>
            </div>
          ) : (
            filtered.map((record) => (
              <article className="compliance-record" key={record.id}>
                <div className={`compliance-status-dot ${chip(record.status)}`} />
                <div className="compliance-record-main">
                  <strong>{record.title}</strong>
                  <span>
                    {record.category} · {record.authority}
                  </span>
                  <small>{record.jurisdiction}</small>
                </div>
                <div className="compliance-meta">
                  <span className={`status-chip ${chip(record.status)}`}>{record.status}</span>
                  <strong>{fmtDay(record.due, "d MMM yyyy")}</strong>
                  <small>
                    {record.owner} · {record.evidence ? "Evidence attached" : "Evidence needed"}
                  </small>
                </div>
                <div className="compliance-actions">
                  <a href={record.source} target="_blank" rel="noreferrer" aria-label={`Open official guidance for ${record.title}`}>
                    <ArrowUpRight size={15} />
                  </a>
                  <button
                    onClick={() => markReviewed(record.id)}
                    disabled={record.status === "Up to date" && record.evidence}
                    aria-label={`Mark ${record.title} reviewed`}
                  >
                    <Check size={15} />
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {selectedPortal && (
        <div
          className="dialog-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setSelectedPortal(null);
          }}
        >
          <div className="create-dialog portal-dialog" role="dialog" aria-modal="true" aria-labelledby="portal-dialog-title">
            <div className="dialog-header">
              <div>
                <p className="panel-kicker">Guided connection</p>
                <h2 id="portal-dialog-title">Connect {selectedPortal.name}</h2>
              </div>
              <button className="icon-button" onClick={() => setSelectedPortal(null)} aria-label="Close portal connection guide">
                <X size={17} />
              </button>
            </div>
            <p className="portal-dialog-copy">
              You will leave vantage and authenticate directly on the official {selectedPortal.name} website. We do not
              ask for or store government credentials.
            </p>
            <ol className="portal-steps">
              <li>
                <span>1</span>
                <div>
                  <strong>Check prerequisites</strong>
                  <small>{selectedPortal.prerequisites}</small>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <strong>Open the official portal</strong>
                  <small>Review the domain before entering any information.</small>
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <strong>Return and confirm access</strong>
                  <small>Come back to vantage and mark this connection as checked.</small>
                </div>
              </li>
            </ol>
            <div className="portal-dialog-actions">
              <a className="button-ghost" href={selectedPortal.href} target="_blank" rel="noreferrer">
                Open official site <ArrowUpRight size={15} />
              </a>
              <button
                className="button-primary"
                type="button"
                onClick={() => {
                  connectPortal(selectedPortal.id);
                  toast.success(`${selectedPortal.name} marked as checked`);
                  setSelectedPortal(null);
                }}
              >
                I've confirmed access
              </button>
              <button className="text-button" type="button" onClick={() => setSelectedPortal(null)}>
                Not now
              </button>
            </div>
            <small className="portal-security-note">
              Portal access and live API synchronisation are separate. Availability depends on government onboarding,
              permissions, and approved provider access.
            </small>
          </div>
        </div>
      )}
    </div>
  );
}
