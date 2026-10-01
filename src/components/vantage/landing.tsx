import { useLayoutEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Archive,
  Clock3,
  FileCheck2,
  FolderKanban,
  Handshake,
  Rocket,
  Sparkles,
} from "lucide-react";
import { VantageLockup } from "./mark";
import { createSeed } from "@/lib/vantage/seed";
import { attentionCount, hoursThisWeek, openWork, pipelineValue } from "@/lib/vantage/selectors";
import type { WorkStatus } from "@/lib/vantage/types";

const STAGES = ["Idea", "Start", "Run", "Grow", "Transform", "Exit"] as const;

const FEATURES = [
  {
    icon: Rocket,
    title: "Launch",
    copy: "Stand up the entity, registrations, and first operating checklist without a tangle of tabs.",
  },
  {
    icon: Handshake,
    title: "Pipeline",
    copy: "Move work from lead to won, with value and follow-up sitting next to the people who own it.",
  },
  {
    icon: FolderKanban,
    title: "Work",
    copy: "Boards, checklists, and hours in one place so delivery stays visible as the firm scales.",
  },
  {
    icon: Clock3,
    title: "Time",
    copy: "Log the week, start a live timer, and keep utilisation honest against live jobs.",
  },
  {
    icon: Archive,
    title: "Vault",
    copy: "Contracts, licences, and policies stay with the workspace — ready for diligence or a sale.",
  },
  {
    icon: FileCheck2,
    title: "Compliance",
    copy: "ASIC, BAS, and lodgement dates surface before they become a scramble.",
  },
] as const;

const SAMPLE = createSeed();
const SAMPLE_HOURS = hoursThisWeek(SAMPLE);
const PREVIEW_COLUMNS: { label: string; status: WorkStatus }[] = [
  { label: "In progress", status: "in-progress" },
  { label: "Needs review", status: "needs-review" },
  { label: "Scheduled", status: "scheduled" },
];

function compactMoney(amount: number) {
  if (Math.abs(amount) >= 1000) {
    const thousands = amount / 1000;
    const rounded = thousands >= 100 ? Math.round(thousands) : Math.round(thousands * 10) / 10;
    return `$${Number.isInteger(rounded) ? rounded : rounded}k`;
  }
  return `$${Math.round(amount)}`;
}

export function LandingBoot() {
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = "light";
  }, []);
  return (
    <main className="logged-out" aria-busy="true" aria-label="Loading vantage">
      <div className="logged-out-card">
        <VantageLockup stacked tagline />
        <div className="boot-pulse boot-pulse-wide" />
      </div>
    </main>
  );
}

export function LandingPage() {
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = "light";
  }, []);

  return (
    <div className="land">
      <header className="land-nav">
        <Link to="/" className="land-brand" aria-label="cdxi vantage home">
          <VantageLockup />
        </Link>
        <div className="land-nav-actions">
          <Link to="/login" className="button-ghost">
            Sign in
          </Link>
          <Link to="/signup" className="button-primary">
            Create workspace
          </Link>
        </div>
      </header>

      <main>
        <section className="land-hero">
          <p className="eyebrow">The business operating platform</p>
          <h1>Build it. Run it. Grow it. Exit it.</h1>
          <p className="land-lede">
            One workspace for how a professional-services firm actually operates — pipeline, delivery,
            time, records, and compliance — in view.
          </p>
          <div className="land-hero-actions">
            <Link to="/signup" className="button-primary">
              Create your workspace
            </Link>
            <Link to="/login" className="button-ghost">
              Sign in or try a demo
            </Link>
          </div>
          <ul className="land-stages" aria-label="Business lifecycle">
            {STAGES.map((stage, i) => (
              <li key={stage}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {stage}
              </li>
            ))}
          </ul>
        </section>

        <section className="land-preview" aria-hidden="true">
          <div className="land-preview-frame">
            <div className="land-preview-bar">
              <i />
              <i />
              <i />
              <strong>Northline Advisory</strong>
              <em>Live workspace</em>
            </div>
            <div className="land-preview-metrics">
              <article>
                <span>Pipeline</span>
                <strong>{compactMoney(pipelineValue(SAMPLE))}</strong>
              </article>
              <article>
                <span>Open work</span>
                <strong>{openWork(SAMPLE).length}</strong>
              </article>
              <article>
                <span>Hours this week</span>
                <strong>{Number.isInteger(SAMPLE_HOURS) ? SAMPLE_HOURS : SAMPLE_HOURS.toFixed(1)}</strong>
              </article>
              <article>
                <span>Attention</span>
                <strong>{attentionCount(SAMPLE)}</strong>
              </article>
            </div>
            <div className="land-preview-board">
              {PREVIEW_COLUMNS.map((column) => {
                const titles = SAMPLE.work.filter((item) => item.status === column.status).slice(0, 2);
                if (titles.length === 0) return null;
                return (
                  <div key={column.status}>
                    <span>{column.label}</span>
                    {titles.map((item) => (
                      <p key={item.id}>{item.title}</p>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="land-features">
          <p className="eyebrow">In the operating view</p>
          <h2>Everything that used to live in twelve tools.</h2>
          <div className="land-feature-grid">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title}>
                  <span className="land-feature-icon">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <h3>{feature.title}</h3>
                  <p>{feature.copy}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="land-brief">
          <Sparkles size={18} strokeWidth={1.8} />
          <div>
            <h2>A weekly operating brief, on demand.</h2>
            <p>
              Ask Grok for the week’s priorities, risks, and next move from the live workspace — not a
              separate slide deck.
            </p>
          </div>
        </section>

        <section className="land-close">
          <h2>Start a workspace in a minute.</h2>
          <p>Your own empty operating view, or sign in to the Northline Advisory demo.</p>
          <div className="land-hero-actions">
            <Link to="/signup" className="button-primary">
              Create workspace
            </Link>
            <Link to="/login" className="button-ghost">
              Sign in
            </Link>
          </div>
        </section>
      </main>

      <footer className="land-foot">
        <span>
          <span className="cdxi">cdxi</span> vantage
        </span>
        <span>The business operating platform</span>
      </footer>
    </div>
  );
}
