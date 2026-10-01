import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  MoreHorizontal,
  Plus,
  Sparkles,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { toast } from "sonner";
import { useVantage } from "@/lib/vantage/store";
import { generateInsight } from "@/lib/vantage/api";
import {
  activeCustomers,
  insightSnapshot,
  launchProgress,
  openLaunch,
  openWork,
  outstandingTotal,
  paidRevenue,
  pipelineValue,
  previousRevenue,
  revenueSeries,
  upcomingWork,
  vaultDueSoon,
  workByStatus,
} from "@/lib/vantage/selectors";
import { brandCase, fmtDay, money, relativeFrom } from "@/lib/vantage/format";
import { AI_AGENTS, CDXI_PACKAGES, LIFECYCLE_STAGES, stageNote } from "@/lib/vantage/lifecycle";
import type { AiAgentId, ModuleId } from "@/lib/vantage/types";

function MetricCard({
  label,
  value,
  change,
  note,
  trend,
  icon: Icon,
}: {
  label: string;
  value: string;
  change: string;
  note: string;
  trend: "up" | "down" | "flat";
  icon: typeof WalletCards;
}) {
  return (
    <div className="metric-card">
      <div className="metric-top">
        <span>{label}</span>
        <div className="metric-icon">
          <Icon size={16} />
        </div>
      </div>
      <strong className="metric-value">{value}</strong>
      <div className={`metric-change ${trend === "down" ? "negative" : trend === "up" ? "positive" : ""}`}>
        {trend === "down" ? <ArrowDownRight size={14} /> : trend === "up" ? <ArrowUpRight size={14} /> : null}
        <b>{change}</b>
        <span>{note}</span>
      </div>
    </div>
  );
}

function Sparkline({
  series,
}: {
  series: { key: string; label: string; cumulative: number }[];
}) {
  const width = 462;
  const height = 150;
  const max = Math.max(1, ...series.map((s) => s.cumulative));
  const ticks = [max, max * 0.66, max * 0.33, 0];
  const points = series.map((s, i) => {
    const x = series.length <= 1 ? 0 : (i / (series.length - 1)) * width;
    const y = height - 8 - (s.cumulative / max) * (height - 16);
    return [x, y] as const;
  });
  const pointStr = points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const last = points[points.length - 1];
  const first = points[0];
  const area = first
    ? `M${first[0].toFixed(1)},${first[1].toFixed(1)} ${points
        .slice(1)
        .map(([x, y]) => `L${x.toFixed(1)},${y.toFixed(1)}`)
        .join(" ")} L${width},${height} L0,${height} Z`
    : "";

  return (
    <>
      <div className="chart-wrap">
        <div className="y-axis">
          {ticks.map((t) => (
            <span key={t}>{t >= 1000 ? `$${Math.round(t / 1000)}k` : `$${Math.round(t)}`}</span>
          ))}
        </div>
        <svg className="chart" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" role="img" aria-label="Revenue over the selected period">
          <defs>
            <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#7f00ff" stopOpacity="0.22" />
              <stop offset="1" stopColor="#00ffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#area)" />
          <polyline
            points={pointStr}
            fill="none"
            stroke="#7f00ff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {last && <circle cx={last[0]} cy={last[1]} r="4" fill="#7f00ff" />}
        </svg>
      </div>
      <div className="x-axis">
        {series.map((s) => (
          <span key={s.key}>{s.label}</span>
        ))}
      </div>
    </>
  );
}

function LifecycleRail() {
  const lifecycle = useVantage((s) => s.lifecycle);
  const setLifecycle = useVantage((s) => s.setLifecycle);
  const setModule = useVantage((s) => s.setModule);
  const data = useVantage();
  const setup = launchProgress(data);
  const open = openLaunch(data).length;
  const renewals = vaultDueSoon(data).length;

  return (
    <section className="command-banner">
      <div>
        <p className="panel-kicker">Command centre</p>
        <h2>
          {brandCase(data.business.tradingName || data.workspaceName)} is in {LIFECYCLE_STAGES.find((s) => s.id === lifecycle)?.label}.
        </h2>
        <p>{stageNote(lifecycle)}</p>
        <div className="heading-actions" style={{ marginTop: 12 }}>
          <button className="button-ghost" onClick={() => setModule("launch")}>
            Launch {open ? `· ${open} open` : `· ${setup}%`}
          </button>
          <button className="button-ghost" onClick={() => setModule("vault")}>
            Vault {renewals ? `· ${renewals} due` : ""}
          </button>
        </div>
      </div>
      <div className="life-rail compact" role="list">
        {LIFECYCLE_STAGES.map((stage) => (
          <button
            key={stage.id}
            role="listitem"
            className={`life-step ${lifecycle === stage.id ? "active" : ""}`}
            onClick={() => {
              setLifecycle(stage.id);
              toast.success(`Stage set to ${stage.label}`);
            }}
          >
            <strong>{stage.label}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}

function InsightPanel() {
  const insight = useVantage((s) => s.insight);
  const agentBriefs = useVantage((s) => s.agentBriefs);
  const aiPermissions = useVantage((s) => s.aiPermissions);
  const setInsight = useVantage((s) => s.setInsight);
  const setAgentBrief = useVantage((s) => s.setAgentBrief);
  const data = useVantage();
  const [busy, setBusy] = useState(false);
  const [agent, setAgent] = useState<AiAgentId>("ceo");
  const [question, setQuestion] = useState("");
  const current = agent === "ceo" ? (agentBriefs.ceo ?? insight) : (agentBriefs[agent] ?? null);
  const meta = AI_AGENTS.find((a) => a.id === agent);

  const run = async () => {
    setBusy(true);
    try {
      const result = await generateInsight({
        data: {
          snapshot: insightSnapshot(data),
          agent,
          level: aiPermissions[agent] ?? "recommend",
          question: agent === "assist" && question.trim() ? question.trim() : undefined,
        },
      });
      if (result.ok) {
        setAgentBrief(agent, result.brief);
        if (agent === "ceo") setInsight(result.brief);
        toast.success(`${meta?.title ?? "Brief"} ready`);
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("Could not generate a briefing.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="panel insight-panel">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Operating layer</p>
          <h2>{current?.headline ?? meta?.title ?? "Ask Grok"}</h2>
        </div>
        <button className="button-ghost" onClick={() => void run()} disabled={busy}>
          <Sparkles size={15} />
          {busy ? "Writing…" : current ? "Refresh" : "Generate"}
        </button>
      </div>
      <div className="agent-tabs" role="tablist" aria-label="Vantage agents">
        {AI_AGENTS.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={agent === item.id}
            className={agent === item.id ? "chip active" : "chip"}
            onClick={() => setAgent(item.id)}
          >
            {item.title.replace("Vantage ", "")}
          </button>
        ))}
      </div>
      {agent === "assist" && (
        <div className="field assist-ask">
          <label htmlFor="assist-brief">What's the issue?</label>
          <textarea
            id="assist-brief"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="A problem on this workspace, or business law in a state."
            maxLength={800}
          />
          <p className="assist-note">
            General information, not legal advice. Confirm with a lawyer or your accountant before you rely on it.
          </p>
        </div>
      )}
      {current ? (
        <div className="insight-grid">
          <div>
            <p className="panel-kicker">Priorities</p>
            <ul>
              {(current.priorities ?? []).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="panel-kicker">Watch</p>
            <ul>
              {(current.risks ?? []).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="panel-kicker">Next move</p>
            <p>{current.nextMove}</p>
            <small>
              {relativeFrom(current.at)} · {aiPermissions[agent]}
            </small>
          </div>
        </div>
      ) : (
        <p className="heading-note">{meta?.brief} Runs only when you ask. Capability is set in Settings.</p>
      )}
    </section>
  );
}

function MarketplaceStrip() {
  return (
    <section className="panel market-strip">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">cdxi · implementation</p>
          <h2>When software is not enough</h2>
        </div>
      </div>
      <p className="heading-note">
        Vantage is the operating system. cdxi is the service arm for sites, integrations, and growth systems.
      </p>
      <div className="market-grid">
        {CDXI_PACKAGES.map((pack) => (
          <article key={pack.id}>
            <strong>{pack.name}</strong>
            <em>{pack.price}</em>
            <span>{pack.note}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Overview({ onCreate }: { onCreate: () => void }) {
  const data = useVantage();
  const range = data.range;
  const now = new Date();
  const revenue = paidRevenue(data.finance, range, now);
  const prev = previousRevenue(data.finance, range, now);
  const delta = prev > 0 ? Math.round(((revenue - prev) / prev) * 100) : null;
  const customers = activeCustomers(data).length;
  const open = openWork(data).length;
  const outstanding = outstandingTotal(data.finance);
  const series = revenueSeries(data.finance, range, now);
  const counts = workByStatus(data);
  const pipelineOpen = open;
  const upcoming = upcomingWork(data, 4);
  const bare =
    data.customers.length +
      data.work.length +
      data.finance.length +
      data.deals.length +
      data.launchTasks.length +
      data.vault.length +
      data.compliance.length +
      data.events.length ===
    0;
  const pipeline = pipelineValue(data);

  const pct = (n: number) => (pipelineOpen ? Math.round((n / pipelineOpen) * 100) : 0);
  const rows = [
    { color: "blue", label: "In progress", count: counts["in-progress"], key: "in-progress" as const },
    { color: "orange", label: "Needs review", count: counts["needs-review"], key: "needs-review" as const },
    { color: "purple", label: "Scheduled", count: counts.scheduled, key: "scheduled" as const },
    { color: "gray", label: "On hold", count: counts["on-hold"], key: "on-hold" as const },
  ];

  const go = (id: ModuleId) => data.setModule(id);

  if (bare) {
    return (
      <>
        <LifecycleRail />
        <section className="fresh-overview panel">
        <div className="empty-icon">
          <Sparkles size={20} />
        </div>
        <p className="panel-kicker">Your workspace is ready</p>
        <h2>Start with the business, not another tool.</h2>
        <p>
          Capture the idea, run setup autopilot, or restore the Northline Advisory sample to see a firm already in
          Grow.
        </p>
        <div className="heading-actions">
          <button className="button-primary" onClick={onCreate}>
            <Plus size={17} /> Create your first record
          </button>
          <button className="button-ghost" onClick={() => go("launch")}>
            Open Launch
          </button>
        </div>
      </section>
      </>
    );
  }

  return (
    <>
      <LifecycleRail />

      <div className="metric-grid">
        <MetricCard
          label="Revenue"
          value={money(revenue)}
          change={delta === null ? "This period" : `${delta > 0 ? "+" : ""}${delta}%`}
          note={delta === null ? "No prior period" : `from ${money(prev)}`}
          trend={delta === null || delta === 0 ? "flat" : delta < 0 ? "down" : "up"}
          icon={WalletCards}
        />
        <MetricCard
          label="Active customers"
          value={String(customers)}
          change={`${data.customers.length} total`}
          note="In the workspace"
          trend="up"
          icon={UsersRound}
        />
        <MetricCard
          label="Open work"
          value={String(open)}
          change={`${counts.done} done`}
          note="Across delivery"
          trend={open > 8 ? "down" : "up"}
          icon={BriefcaseBusiness}
        />
        <MetricCard
          label="Pipeline"
          value={money(pipeline)}
          change={`${data.deals.filter((d) => d.stage !== "won" && d.stage !== "lost").length} open`}
          note={outstanding ? `${money(outstanding)} unpaid` : "No unpaid invoices"}
          trend={pipeline > 0 ? "up" : "flat"}
          icon={WalletCards}
        />
      </div>

      <InsightPanel />

      <div className="dashboard-grid">
        <section className="panel chart-panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Performance</p>
              <h2>Revenue overview</h2>
            </div>
            <button className="more-button" aria-label="Open finance" onClick={() => go("finance")}>
              <MoreHorizontal size={19} />
            </button>
          </div>
          <div className="chart-summary">
            <strong>{money(revenue)}</strong>
            {delta === null ? (
              <span>No prior period</span>
            ) : (
              <span className={delta < 0 ? "negative" : delta > 0 ? "positive" : ""}>
                {delta < 0 ? <ArrowDownRight size={14} /> : delta > 0 ? <ArrowUpRight size={14} /> : null}{" "}
                {delta > 0 ? "+" : ""}
                {delta}%
              </span>
            )}
            {delta !== null && <span>from {money(prev)}</span>}
          </div>
          <Sparkline series={series} />
        </section>

        <section className="panel pipeline-panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Work pipeline</p>
              <h2>Current status</h2>
            </div>
            <button className="more-button" aria-label="Open work" onClick={() => go("work")}>
              <MoreHorizontal size={19} />
            </button>
          </div>
          <div className="pipeline-total">
            <strong>{pipelineOpen}</strong>
            <span>open work items</span>
          </div>
          <div className="pipeline-bar">
            {rows.map((r) => (
              <span key={r.key} className={`bar-${r.color}`} style={{ width: `${pct(r.count)}%` }} />
            ))}
          </div>
          <div className="pipeline-list">
            {rows.map((r) => (
              <div className="pipeline-row" key={r.key}>
                <i className={`status-dot ${r.color}`} />
                <span>{r.label}</span>
                <strong>{r.count}</strong>
                <em>{pct(r.count)}%</em>
              </div>
            ))}
          </div>
          <button className="text-button" onClick={() => go("work")}>
            View all work <ArrowUpRight size={14} />
          </button>
        </section>
      </div>

      <div className="lower-grid">
        <section className="panel upcoming-panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Next up</p>
              <h2>Upcoming work</h2>
            </div>
            <button className="text-button" onClick={() => go("calendar")}>
              See calendar <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="work-list">
            {upcoming.length === 0 && <p className="heading-note">Nothing scheduled. Create work to fill the week.</p>}
            {upcoming.map((item, i) => {
              const tone = i % 3 === 1 ? "orange" : i % 3 === 2 ? "purple" : "blue";
              const day = fmtDay(item.due, "d");
              const month = fmtDay(item.due, "MMM").toUpperCase();
              return (
                <div className="work-row" key={item.id}>
                  <div className={`date-block ${tone}`}>
                    <strong>{day}</strong>
                    <span>{month}</span>
                  </div>
                  <div className="work-copy">
                    <strong>{item.title}</strong>
                    <span>{item.team}</span>
                  </div>
                  <button className="row-action" aria-label={`Open ${item.title}`} onClick={() => go("work")}>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <section className="panel activity-panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Team pulse</p>
              <h2>Recent activity</h2>
            </div>
            <button className="more-button" aria-label="More activity" onClick={() => go("work")}>
              <MoreHorizontal size={19} />
            </button>
          </div>
          <div className="activity-list">
            {data.activities.length === 0 && <p className="heading-note">Activity will land here as the team works.</p>}
            {data.activities.slice(0, 5).map((item) => (
              <div className="activity-row" key={item.id}>
                <div className={`avatar avatar-${item.color}`}>{item.initials}</div>
                <div>
                  <p>
                    <strong>{item.name}</strong> {item.action}
                  </p>
                  <span>{item.detail}</span>
                </div>
                <time>{relativeFrom(item.at)}</time>
              </div>
            ))}
          </div>
        </section>
      </div>

      <MarketplaceStrip />
    </>
  );
}
