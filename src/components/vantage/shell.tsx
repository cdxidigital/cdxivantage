import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  Archive,
  Bell,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  Clock3,
  Command,
  FileCheck2,
  FileText,
  FolderKanban,
  Handshake,
  Inbox,
  LayoutDashboard,
  LifeBuoy,
  Menu,
  Moon,
  MoreHorizontal,
  Plus,
  Rocket,
  Search,
  Settings2,
  Square,
  Sun,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { useVantage, workspacePayload } from "@/lib/vantage/store";
import { loadWorkspace, saveWorkspace } from "@/lib/vantage/api";
import { brandCase, greeting, headingDate, rangeLabel, formatDuration } from "@/lib/vantage/format";
import { attentionCount, notifications, openDeals, openLaunch, openWork, vaultDueSoon } from "@/lib/vantage/selectors";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { signOut } from "@/lib/auth/client";
import { hasGateSessionMarker } from "@/lib/auth/gate-session-marker";
import type { CreateKind, ModuleId, RangeId } from "@/lib/vantage/types";
import { AssistDialog } from "./assist";
import { Overview } from "./overview";
import { InboxView } from "./inbox";
import { WorkBoard } from "./work";
import { PipelineView } from "./pipeline";
import { CustomersView } from "./customers";
import { FinanceView } from "./finance";
import { TimesheetView } from "./timesheet";
import { CalendarView } from "./calendar-view";
import { ComplianceWorkspace } from "./compliance";
import { ReportsView } from "./reports";
import { SettingsView } from "./settings";
import { LaunchCentre } from "./launch";
import { VaultView } from "./vault";
import { PeopleView } from "./people";
import { SearchPalette } from "./search-palette";
import { CreateDialog } from "./create-dialog";
import { VantageMark, VantageMarkMono } from "./mark";
import { WorkspaceGuide } from "./guide";

const MODULES: { id: ModuleId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "launch", label: "Launch", icon: Rocket },
  { id: "work", label: "Work", icon: FolderKanban },
  { id: "pipeline", label: "Pipeline", icon: Handshake },
  { id: "customers", label: "Customers", icon: UsersRound },
  { id: "finance", label: "Finance", icon: WalletCards },
];

const RECORD_MODULES: { id: ModuleId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "time", label: "Time", icon: Clock3 },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "people", label: "People", icon: UsersRound },
  { id: "vault", label: "Vault", icon: Archive },
  { id: "compliance", label: "Compliance", icon: FileCheck2 },
];

const ALL_MODULES = [...MODULES, ...RECORD_MODULES];

const RANGE_OPTIONS: { id: RangeId; label: string }[] = [
  { id: "30d", label: "Last 30 days" },
  { id: "7d", label: "Last 7 days" },
  { id: "quarter", label: "This quarter" },
];

const subscribeToNothing = () => () => {};

export function VantageApp() {
  const { user, isPending } = useCurrentUserState();
  const hydrated = useVantage((s) => s.hydrated);

  useEffect(() => {
    if (!user) {
      useVantage.getState().resetSession();
      document.documentElement.dataset.theme = "light";
      return;
    }
    let cancelled = false;
    useVantage.getState().resetSession();
    void loadWorkspace()
      .then((data) => {
        if (!cancelled) useVantage.getState().hydrateFromServer(data);
      })
      .catch(() => {
        if (!cancelled) useVantage.getState().setHydrated();
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  if (isPending || (user && !hydrated)) return <WorkspaceSkeleton />;
  if (!user) return <RedirectToSignIn />;
  return <Workspace />;
}

function WorkspaceSkeleton() {
  return (
    <main className="vantage-app boot-shell" aria-busy="true" aria-label="Loading workspace">
      <aside className="sidebar">
        <div className="brand-lockup" aria-label="cdxi vantage">
          <VantageMarkMono className="brand-mark" />
          <div>
            <strong>
              <span className="cdxi">cdxi</span> <em>|</em> vantage
            </strong>
          </div>
        </div>
        <div className="boot-pulse" />
        <div className="boot-pulse" />
        <div className="boot-pulse" />
      </aside>
      <section className="workspace-shell">
        <header className="topbar">
          <div className="mobile-brand" aria-label="cdxi vantage">
            <VantageMark className="brand-mark" />
            <strong>
              <span className="cdxi">cdxi</span> <em>|</em> vantage
            </strong>
          </div>
        </header>
        <div className="boot-pulse boot-pulse-wide" />
        <div className="boot-pulse boot-pulse-wide" />
      </section>
    </main>
  );
}

function Workspace() {
  const data = useVantage();
  const workspaceLabel = brandCase(data.workspaceName);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [createKind, setCreateKind] = useState<CreateKind | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showAssist, setShowAssist] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const gateSession = useSyncExternalStore(
    subscribeToNothing,
    hasGateSessionMarker,
    () => false,
  );

  const openCount = openWork(data).length;
  const complianceBadge = data.compliance.filter((c) => c.status !== "Up to date").length;
  const pipelineBadge = openDeals(data).length;
  const launchBadge = openLaunch(data).length;
  const vaultBadge = vaultDueSoon(data).length;
  const notes = notifications(data);
  const attention = attentionCount(data);
  const activeLabel =
    ALL_MODULES.find((m) => m.id === data.module)?.label ??
    (data.module === "reports" ? "Reports" : "Settings");

  const badges = useMemo(
    () => ({
      work: openCount,
      compliance: complianceBadge,
      inbox: attention,
      pipeline: pipelineBadge,
      launch: launchBadge,
      vault: vaultBadge,
    }),
    [openCount, complianceBadge, attention, pipelineBadge, launchBadge, vaultBadge],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowSearch(false);
        setMenuOpen(false);
        setNotifyOpen(false);
        setMobileMenuOpen(false);
        setShowCreate(false);
        setShowHelp(false);
        setShowAssist(false);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setShowSearch(true);
      }
      const target = event.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable);
      if (!typing && event.key.toLowerCase() === "c" && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        setShowCreate(true);
      }
      if (!typing && event.key === "?") {
        event.preventDefault();
        setShowHelp((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = data.theme || "light";
  }, [data.theme]);

  useEffect(() => {
    const current = document.querySelector<HTMLElement>(".primary-nav [aria-current='page'], .primary-nav [data-module].active");
    current?.scrollIntoView({ block: "nearest" });
  }, [data.module]);

  useEffect(() => {
    if (!data.hydrated) return;
    let timer = 0;
    const unsub = useVantage.subscribe((state) => {
      if (!state.hydrated) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        void saveWorkspace({ data: workspacePayload(state) });
      }, 450);
    });
    return () => {
      unsub();
      window.clearTimeout(timer);
    };
  }, [data.hydrated]);

  const leave = () => {
    if (gateSession || signingOut) return;
    setSigningOut(true);
    void signOut("/").catch(() => setSigningOut(false));
  };

  const navigate = (id: ModuleId) => {
    data.setModule(id);
    setMobileMenuOpen(false);
    setMenuOpen(false);
    setNotifyOpen(false);
  };

  const openCreate = (kind?: CreateKind) => {
    setCreateKind(kind ?? null);
    setShowCreate(true);
  };

  const heading =
    data.module === "overview"
      ? greeting(data.profile.name)
      : data.module === "inbox"
        ? "Today's inbox"
        : data.module === "time"
          ? "Timesheet"
          : data.module === "launch"
            ? "Launch centre"
            : data.module === "vault"
              ? "Business vault"
              : data.module === "people"
                ? "People"
                : activeLabel;
  const note =
    data.module === "overview"
      ? "The operating system for this business — not another tool in the stack."
      : data.module === "inbox"
        ? "Clear what needs a decision, then get back to the work."
        : data.module === "pipeline"
          ? "Move value from lead to won."
          : data.module === "time"
            ? "Log hours against live work, or start a timer."
            : data.module === "launch"
              ? "Setup autopilot: identity, legal, insurance, brand, and systems."
              : data.module === "vault"
                ? "Contracts, policies, IP, and the dates that must not slip."
                : data.module === "people"
                  ? "Roles, certifications, and who is onboarding."
                  : data.module === "reports"
                    ? "Numbers plus a hand-over-ready Business Passport."
                    : `Review and manage your ${activeLabel.toLowerCase()} workspace.`;

  return (
    <main className={`vantage-app theme-${data.theme || "light"}`}>
      <Toaster position="bottom-right" richColors closeButton theme={data.theme === "dark" ? "dark" : "light"} />
      {mobileMenuOpen && <div className="sidebar-scrim" onClick={() => setMobileMenuOpen(false)} />}
      <aside className={`sidebar ${mobileMenuOpen ? "sidebar-open" : ""}`}>
        <div className="brand-lockup" aria-label="cdxi vantage">
          <VantageMarkMono className="brand-mark" />
          <div>
            <strong>
              <span className="cdxi">cdxi</span> <em>|</em> vantage
            </strong>
          </div>
        </div>
        <button
          className="workspace-switcher"
          onClick={() => navigate("settings")}
          aria-label="Open workspace settings"
        >
          <span className="workspace-avatar">{workspaceLabel.slice(0, 1)}</span>
          <span className="workspace-name">{workspaceLabel}</span>
          <ChevronDown size={14} />
        </button>
        <nav className="primary-nav" aria-label="Primary navigation">
          <p className="nav-label">Workspace</p>
          {MODULES.map((module) => {
            const Icon = module.icon;
            const isActive = data.module === module.id;
            const badge =
              module.id === "inbox"
                ? badges.inbox
                : module.id === "work"
                  ? badges.work
                  : module.id === "pipeline"
                    ? badges.pipeline
                    : module.id === "launch"
                      ? badges.launch
                      : 0;
            return (
              <button
                key={module.id}
                className={`nav-item ${isActive ? "active" : ""}`}
                data-module={module.id}
                onClick={() => navigate(module.id)}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={17} strokeWidth={1.8} />
                <span>{module.label}</span>
                {badge > 0 && <em>{badge}</em>}
              </button>
            );
          })}
          <p className="nav-label second">Record</p>
          {RECORD_MODULES.map((module) => {
            const Icon = module.icon;
            const isActive = data.module === module.id;
            const badge =
              module.id === "compliance"
                ? badges.compliance
                : module.id === "vault"
                  ? badges.vault
                  : 0;
            return (
              <button
                key={module.id}
                className={`nav-item ${isActive ? "active" : ""}`}
                data-module={module.id}
                onClick={() => navigate(module.id)}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={17} strokeWidth={1.8} />
                <span>{module.label}</span>
                {badge > 0 && <em>{badge}</em>}
              </button>
            );
          })}
          <p className="nav-label second">Manage</p>
          <button
            className={`nav-item ${data.module === "reports" ? "active" : ""}`}
            data-module="reports"
            onClick={() => navigate("reports")}
            aria-current={data.module === "reports" ? "page" : undefined}
          >
            <FileText size={17} strokeWidth={1.8} />
            <span>Reports</span>
          </button>
          <button
            className={`nav-item ${data.module === "settings" ? "active" : ""}`}
            data-module="settings"
            onClick={() => navigate("settings")}
            aria-current={data.module === "settings" ? "page" : undefined}
          >
            <Settings2 size={17} strokeWidth={1.8} />
            <span>Settings</span>
          </button>
        </nav>
        <div className="sidebar-bottom">
          <button className="help-link" onClick={() => setShowHelp(true)}>
            <CircleHelp size={17} />
            <span>Shortcuts</span>
          </button>
          <div className="user-card">
            <div className="avatar avatar-blue">{data.profile.initials}</div>
            <div>
              <strong>{data.profile.name}</strong>
              <span>{data.profile.role}</span>
            </div>
            <button
              className="sidebar-more"
              aria-label="Open account menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <MoreHorizontal size={17} />
            </button>
          </div>
        </div>
      </aside>

      <section className="workspace-shell">
        <header className="topbar">
          <div className="mobile-brand" aria-label="cdxi vantage">
            <VantageMark className="brand-mark" />
            <strong>
              <span className="cdxi">cdxi</span> <em>|</em> vantage
            </strong>
          </div>
          <div className="breadcrumbs">
            <span>{workspaceLabel}</span>
            <span className="slash">/</span>
            <strong>{activeLabel}</strong>
          </div>
          <div className="topbar-actions">
            <button
              className="icon-button mobile-menu"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
            <button className="search-button" onClick={() => setShowSearch(true)}>
              <Search size={17} />
              <span>Search anything</span>
              <kbd>
                <Command size={11} /> K
              </kbd>
            </button>
            <TimerChip />
            <button
              className="icon-button theme-button"
              onClick={() => data.setTheme(data.theme === "dark" ? "light" : "dark")}
              aria-label={data.theme === "dark" ? "Switch to paper theme" : "Switch to night theme"}
            >
              {data.theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="icon-button"
              onClick={() => {
                setNotifyOpen((v) => !v);
                setMenuOpen(false);
              }}
              aria-label="Notifications"
            >
              <Bell size={18} />
              {attention > 0 && <i />}
            </button>
            <button
              className="profile-button"
              onClick={() => {
                setMenuOpen((v) => !v);
                setNotifyOpen(false);
              }}
              aria-expanded={menuOpen}
            >
              <span className="avatar avatar-blue">{data.profile.initials}</span>
              <ChevronDown size={14} />
            </button>
            {menuOpen && (
              <div className="profile-menu">
                <strong>{data.profile.name}</strong>
                <span>{data.profile.email}</span>
                <hr />
                <button onClick={() => navigate("settings")}>Account settings</button>
                {!gateSession && (
                  <button onClick={leave} disabled={signingOut}>
                    {signingOut ? "Signing out…" : "Sign out"}
                  </button>
                )}
              </div>
            )}
            {notifyOpen && (
              <div className="notify-menu">
                <h3>Needs attention</h3>
                {notes.length === 0 && <p className="notify-empty">You are clear for now.</p>}
                {notes.map((n) => (
                  <button
                    key={n.id}
                    className="notify-item"
                    onClick={() => navigate(n.module)}
                  >
                    <strong>{n.title}</strong>
                    <span>{n.detail}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        {showSearch && <SearchPalette onClose={() => setShowSearch(false)} />}

        <div className="content">
          <div className="page-heading">
            <div>
              <p className="eyebrow">
                {headingDate()} <span className="live-dot" /> Live workspace
              </p>
              <h1>{heading}</h1>
              <p className="heading-note">{note}</p>
            </div>
            <div className="heading-actions">
              <select
                value={data.range}
                onChange={(e) => data.setRange(e.target.value as RangeId)}
                aria-label="Date range"
              >
                {RANGE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <button className="button-ghost" type="button" onClick={() => setShowAssist(true)}>
                <LifeBuoy size={16} /> Assist
              </button>
              <button className="button-primary" onClick={() => openCreate()}>
                <Plus size={17} /> Create new
              </button>
            </div>
          </div>

          {data.noticeVisible && data.module === "overview" && attention > 0 && (
            <div className="notice">
              <div className="notice-icon">
                <Bell size={17} />
              </div>
              <div>
                <strong>Your week at a glance</strong>
                <span>
                  {attention} {attention === 1 ? "priority needs" : "priorities need"} attention before Friday.
                </span>
              </div>
              <button className="notice-link" onClick={() => navigate("inbox")}>
                Open inbox
              </button>
              <button className="notice-close" onClick={data.dismissNotice} aria-label="Dismiss">
                <X size={15} />
              </button>
            </div>
          )}

          {data.module === "overview" && <Overview onCreate={() => openCreate()} />}
          {data.module === "inbox" && <InboxView />}
          {data.module === "launch" && <LaunchCentre onCreate={() => openCreate("launch")} />}
          {data.module === "work" && <WorkBoard onCreate={() => openCreate("work")} />}
          {data.module === "pipeline" && <PipelineView onCreate={() => openCreate("deal")} />}
          {data.module === "customers" && <CustomersView onCreate={() => openCreate("customer")} />}
          {data.module === "finance" && <FinanceView onCreate={() => openCreate("finance")} />}
          {data.module === "time" && <TimesheetView />}
          {data.module === "calendar" && <CalendarView onCreate={() => openCreate("event")} />}
          {data.module === "people" && <PeopleView onCreate={() => openCreate("person")} />}
          {data.module === "vault" && <VaultView onCreate={() => openCreate("vault")} />}
          {data.module === "compliance" && <ComplianceWorkspace onCreate={() => openCreate("compliance")} />}
          {data.module === "reports" && <ReportsView />}
          {data.module === "settings" && <SettingsView />}

          {!data.tourDone && <WorkspaceGuide onCreate={() => openCreate()} />}

          <footer className="footer">
            <span>cdxi | vantage</span>
            <span>Build it. Run it. Grow it. Exit it.</span>
            <span>{workspaceLabel} · {rangeLabel(data.range)}</span>
          </footer>
        </div>

        {showCreate && (
          <CreateDialog
            initial={createKind}
            onClose={() => {
              setShowCreate(false);
              setCreateKind(null);
            }}
          />
        )}
        {showAssist && <AssistDialog moduleLabel={activeLabel} onClose={() => setShowAssist(false)} />}
        {showHelp && (
          <div
            className="dialog-backdrop"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setShowHelp(false);
            }}
          >
            <section className="create-dialog" role="dialog" aria-modal="true" aria-labelledby="shortcuts-title">
              <div className="dialog-header">
                <div>
                  <p className="panel-kicker">Keyboard</p>
                  <h2 id="shortcuts-title">Shortcuts</h2>
                </div>
                <button className="icon-button" onClick={() => setShowHelp(false)} aria-label="Close shortcuts">
                  <X size={18} />
                </button>
              </div>
              <dl className="shortcut-list">
                <div>
                  <dt>
                    <kbd>
                      <Command size={11} /> K
                    </kbd>
                  </dt>
                  <dd>Search anything</dd>
                </div>
                <div>
                  <dt>
                    <kbd>C</kbd>
                  </dt>
                  <dd>Create new</dd>
                </div>
                <div>
                  <dt>
                    <kbd>?</kbd>
                  </dt>
                  <dd>Show shortcuts</dd>
                </div>
                <div>
                  <dt>
                    <kbd>Esc</kbd>
                  </dt>
                  <dd>Close overlay</dd>
                </div>
              </dl>
              <p className="assist-note">Assist sits on every page for a workspace problem or a question of Australian business law.</p>
              <div className="dialog-actions">
                <button
                  type="button"
                  className="button-primary"
                  onClick={() => {
                    data.setTourDone(false);
                    setShowHelp(false);
                  }}
                >
                  Take the tour
                </button>
              </div>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}

function TimerChip() {
  const timer = useVantage((s) => s.timer);
  const work = useVantage((s) => s.work);
  const stopTimer = useVantage((s) => s.stopTimer);
  const setModule = useVantage((s) => s.setModule);
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!timer) return;
    const id = window.setInterval(() => setTick((n) => n + 1), 1000);
    return () => window.clearInterval(id);
  }, [timer]);

  if (!timer) return null;
  const item = work.find((w) => w.id === timer.workId);
  const elapsed = Date.now() - new Date(timer.startedAt).getTime();

  return (
    <div className="timer-chip">
      <button className="timer-label" onClick={() => setModule("time")}>
        <Clock3 size={14} />
        <span>{formatDuration(elapsed)}</span>
        <small>{item?.title ?? "Timer"}</small>
      </button>
      <button
        className="icon-button"
        aria-label="Stop timer"
        onClick={() => {
          const result = stopTimer();
          if (result && result.hours >= 0.25) toast.success(`Logged ${result.hours}h on ${result.title}`);
          else toast("Timer stopped");
        }}
      >
        <Square size={14} />
      </button>
    </div>
  );
}
