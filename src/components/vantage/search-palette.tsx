import { useEffect, useMemo, useRef, useState } from "react";
import { Archive, CalendarDays, FileCheck2, FolderKanban, Handshake, Rocket, Search, UsersRound, WalletCards, X } from "lucide-react";
import { useVantage } from "@/lib/vantage/store";
import type { ModuleId } from "@/lib/vantage/types";

const NAV: { id: ModuleId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "inbox", label: "Inbox" },
  { id: "launch", label: "Launch" },
  { id: "work", label: "Work" },
  { id: "pipeline", label: "Pipeline" },
  { id: "customers", label: "Customers" },
  { id: "finance", label: "Finance" },
  { id: "time", label: "Time" },
  { id: "calendar", label: "Calendar" },
  { id: "people", label: "People" },
  { id: "vault", label: "Vault" },
  { id: "compliance", label: "Compliance" },
  { id: "reports", label: "Reports" },
  { id: "settings", label: "Settings" },
];

type Hit = { key: string; label: string; hint: string; run: () => void; icon: typeof Search };

export function SearchPalette({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const setModule = useVantage((s) => s.setModule);
  const customers = useVantage((s) => s.customers);
  const work = useVantage((s) => s.work);
  const finance = useVantage((s) => s.finance);
  const events = useVantage((s) => s.events);
  const compliance = useVantage((s) => s.compliance);
  const deals = useVantage((s) => s.deals);
  const launchTasks = useVantage((s) => s.launchTasks);
  const vault = useVantage((s) => s.vault);
  const team = useVantage((s) => s.team);

  const hits = useMemo(() => {
    const query = q.trim().toLowerCase();
    const go = (id: ModuleId) => {
      setModule(id);
      onClose();
    };
    const list: Hit[] = [];
    for (const n of NAV) {
      if (!query || n.label.toLowerCase().includes(query)) {
        list.push({ key: `nav-${n.id}`, label: n.label, hint: "Go", run: () => go(n.id), icon: Search });
      }
    }
    const match = (s: string) => !query || s.toLowerCase().includes(query);
    for (const c of customers) {
      if (match(c.name) || match(c.contact) || match(c.email)) {
        list.push({
          key: c.id,
          label: c.name,
          hint: "Customer",
          run: () => go("customers"),
          icon: UsersRound,
        });
      }
    }
    for (const w of work) {
      if (match(w.title) || match(w.owner) || match(w.team)) {
        list.push({
          key: w.id,
          label: w.title,
          hint: "Work",
          run: () => go("work"),
          icon: FolderKanban,
        });
      }
    }
    for (const f of finance) {
      if (match(f.title)) {
        list.push({
          key: f.id,
          label: f.title,
          hint: "Finance",
          run: () => go("finance"),
          icon: WalletCards,
        });
      }
    }
    for (const e of events) {
      if (match(e.title) || match(e.location)) {
        list.push({
          key: e.id,
          label: e.title,
          hint: "Calendar",
          run: () => go("calendar"),
          icon: CalendarDays,
        });
      }
    }
    for (const c of compliance) {
      if (match(c.title) || match(c.authority) || match(c.category)) {
        list.push({
          key: c.id,
          label: c.title,
          hint: "Compliance",
          run: () => go("compliance"),
          icon: FileCheck2,
        });
      }
    }
    for (const d of deals) {
      if (match(d.title) || match(d.owner) || match(d.notes)) {
        list.push({
          key: d.id,
          label: d.title,
          hint: "Deal",
          run: () => go("pipeline"),
          icon: Handshake,
        });
      }
    }
    for (const t of launchTasks) {
      if (match(t.title) || match(t.area) || match(t.owner)) {
        list.push({
          key: t.id,
          label: t.title,
          hint: "Launch",
          run: () => go("launch"),
          icon: Rocket,
        });
      }
    }
    for (const v of vault) {
      if (match(v.title) || match(v.counterparty) || match(v.extracted)) {
        list.push({
          key: v.id,
          label: v.title,
          hint: "Vault",
          run: () => go("vault"),
          icon: Archive,
        });
      }
    }
    for (const p of team) {
      if (match(p.name) || match(p.role) || match(p.email)) {
        list.push({
          key: p.id,
          label: p.name,
          hint: "People",
          run: () => go("people"),
          icon: UsersRound,
        });
      }
    }
    return list.slice(0, 18);
  }, [q, customers, work, finance, events, compliance, deals, launchTasks, vault, team, setModule, onClose]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSel(0);
  }, [q]);

  const onKey = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSel((i) => Math.min(i + 1, Math.max(hits.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSel((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      hits[sel]?.run();
    }
  };

  return (
    <div
      className="search-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="search-panel" role="dialog" aria-modal="true" aria-label="Search">
        <div className="search-head">
          <Search size={18} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="Search work, deals, customers, finance..."
          />
          <button onClick={onClose} aria-label="Close search">
            <X size={18} />
          </button>
        </div>
        {hits.length === 0 ? (
          <p className="search-hint">No matches. Try a customer, work item, or module name.</p>
        ) : (
          <div className="search-group">
            <p>Results</p>
            {hits.map((hit, i) => {
              const Icon = hit.icon;
              return (
                <button
                  key={hit.key}
                  className="search-hit"
                  data-selected={i === sel}
                  onMouseEnter={() => setSel(i)}
                  onClick={hit.run}
                >
                  <Icon size={15} />
                  <span>{hit.label}</span>
                  <small>{hit.hint}</small>
                </button>
              );
            })}
          </div>
        )}
        <p className="search-hint">
          Press <kbd>ESC</kbd> to close · <kbd>↑</kbd> <kbd>↓</kbd> to move · <kbd>Enter</kbd> to open
        </p>
      </div>
    </div>
  );
}
