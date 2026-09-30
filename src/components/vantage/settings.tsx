import { useState, useSyncExternalStore } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { signOut } from "@/lib/auth/client";
import { hasGateSessionMarker } from "@/lib/auth/gate-session-marker";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import { useVantage } from "@/lib/vantage/store";
import { useInstallPrompt } from "@/components/vantage/guide";
import { PracticePanel } from "./practice";
import { AI_AGENTS, AI_LEVELS, LINKED_SYSTEMS } from "@/lib/vantage/lifecycle";
import type { AiCapability, EntityType, ThemeId } from "@/lib/vantage/types";

const subscribeToNothing = () => () => {};

export function SettingsView() {
  const workspaceName = useVantage((s) => s.workspaceName);
  const profile = useVantage((s) => s.profile);
  const theme = useVantage((s) => s.theme);
  const setWorkspaceName = useVantage((s) => s.setWorkspaceName);
  const setProfile = useVantage((s) => s.setProfile);
  const setTheme = useVantage((s) => s.setTheme);
  const restoreDemo = useVantage((s) => s.restoreDemo);
  const clearWorkspace = useVantage((s) => s.clearWorkspace);
  const business = useVantage((s) => s.business);
  const setBusiness = useVantage((s) => s.setBusiness);
  const aiPermissions = useVantage((s) => s.aiPermissions);
  const setAiPermission = useVantage((s) => s.setAiPermission);
  const linkedSystems = useVantage((s) => s.linkedSystems);
  const connectSystem = useVantage((s) => s.connectSystem);
  const setTourDone = useVantage((s) => s.setTourDone);
  const { canInstall, installed, install } = useInstallPrompt();
  const user = useCurrentUser();
  const [signingOut, setSigningOut] = useState(false);
  const gateSession = useSyncExternalStore(
    subscribeToNothing,
    hasGateSessionMarker,
    () => false,
  );
  const origin = useSyncExternalStore(
    subscribeToNothing,
    () => window.location.origin,
    () => "",
  );

  return (
    <div className="settings-grid">
      <section className="panel settings-card">
        <p className="panel-kicker">Workspace</p>
        <h2>Workspace identity</h2>
        <p>The workspace name appears in the sidebar, breadcrumbs, and exports.</p>
        <form
          className="form-grid"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            setWorkspaceName(String(fd.get("workspace") || workspaceName));
            toast.success("Workspace saved");
          }}
        >
          <div className="field">
            <label htmlFor="ws-name">Workspace name</label>
            <input id="ws-name" name="workspace" key={workspaceName} defaultValue={workspaceName} />
          </div>
          <div className="dialog-actions">
            <button className="button-primary" type="submit">
              Save workspace
            </button>
            <button
              type="button"
              className="button-ghost"
              onClick={() => {
                setTourDone(false);
                toast.success("Tour started");
              }}
            >
              Show me around
            </button>
          </div>
        </form>
      </section>

      <section className="panel settings-card">
        <p className="panel-kicker">Master record</p>
        <h2>Business identity</h2>
        <p>Legal structure, ABN, and directors. This is the graph everything else hangs off.</p>
        <form
          className="form-grid two"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            setBusiness({
              legalName: String(fd.get("legalName") || "").trim() || business.legalName,
              tradingName: String(fd.get("tradingName") || "").trim(),
              abn: String(fd.get("abn") || "").trim(),
              acn: String(fd.get("acn") || "").trim(),
              entityType: String(fd.get("entityType") || "pty-ltd") as EntityType,
              industry: String(fd.get("industry") || "").trim(),
              founded: String(fd.get("founded") || ""),
              state: String(fd.get("state") || "").trim() || "WA",
              website: String(fd.get("website") || "").trim(),
              directors: String(fd.get("directors") || "").trim(),
            });
            toast.success("Business record saved");
          }}
        >
          <div className="field">
            <label htmlFor="b-legal">Legal name</label>
            <input id="b-legal" name="legalName" key={business.legalName} defaultValue={business.legalName} />
          </div>
          <div className="field">
            <label htmlFor="b-trade">Trading name</label>
            <input id="b-trade" name="tradingName" key={business.tradingName} defaultValue={business.tradingName} />
          </div>
          <div className="field">
            <label htmlFor="b-abn">ABN</label>
            <input id="b-abn" name="abn" defaultValue={business.abn} />
          </div>
          <div className="field">
            <label htmlFor="b-acn">ACN</label>
            <input id="b-acn" name="acn" defaultValue={business.acn} />
          </div>
          <div className="field">
            <label htmlFor="b-ent">Entity</label>
            <select id="b-ent" name="entityType" defaultValue={business.entityType}>
              <option value="sole-trader">Sole trader</option>
              <option value="partnership">Partnership</option>
              <option value="pty-ltd">Pty Ltd</option>
              <option value="trust">Trust</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="b-ind">Industry</label>
            <input id="b-ind" name="industry" defaultValue={business.industry} />
          </div>
          <div className="field">
            <label htmlFor="b-found">Founded</label>
            <input id="b-found" name="founded" type="date" defaultValue={business.founded} />
          </div>
          <div className="field">
            <label htmlFor="b-state">State</label>
            <input id="b-state" name="state" defaultValue={business.state} />
          </div>
          <div className="field full">
            <label htmlFor="b-dir">Directors</label>
            <input id="b-dir" name="directors" defaultValue={business.directors} />
          </div>
          <div className="field full">
            <label htmlFor="b-web">Website</label>
            <input id="b-web" name="website" defaultValue={business.website} />
          </div>
          <div className="dialog-actions full">
            <button className="button-primary" type="submit">
              Save business
            </button>
          </div>
        </form>
      </section>

      <section className="panel settings-card">
        <p className="panel-kicker">AI layer</p>
        <h2>Agent permissions</h2>
        <p>Observe, recommend, or prepare. Assist covers workspace issues and Australian business law. Agents never execute. Briefs run only when you ask.</p>
        <ul className="perm-list">
          {AI_AGENTS.map((agent) => (
            <li key={agent.id}>
              <div>
                <strong>{agent.title}</strong>
                <span>{agent.brief}</span>
              </div>
              <select
                aria-label={`${agent.title} capability`}
                value={aiPermissions[agent.id]}
                onChange={(e) => {
                  setAiPermission(agent.id, e.target.value as AiCapability);
                  toast.success(`${agent.title} set to ${e.target.value}`);
                }}
              >
                {AI_LEVELS.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.label}
                  </option>
                ))}
              </select>
            </li>
          ))}
        </ul>
      </section>

      <PracticePanel />

      <section className="panel settings-card">
        <p className="panel-kicker">Ecosystem</p>
        <h2>Systems of record</h2>
        <p>Vantage sits above the specialist tools. The accounting ledger is chosen above. Toggle the others when that integration is live.</p>
        <div className="system-list">
          {LINKED_SYSTEMS.map((sys) => {
            const on = linkedSystems.includes(sys.id);
            return (
              <button
                key={sys.id}
                className={on ? "system-chip on" : "system-chip"}
                onClick={() => {
                  connectSystem(sys.id);
                  toast.success(on ? `${sys.name} unlinked` : `${sys.name} marked as linked`);
                }}
              >
                <strong>{sys.name}</strong>
                <span>{on ? "Linked" : sys.role}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="panel settings-card">
        <p className="panel-kicker">Appearance</p>
        <h2>Theme</h2>
        <p>Switch the operating view between paper and night without leaving the workspace.</p>
        <div className="theme-toggle" role="group" aria-label="Theme">
          {(["light", "dark"] as ThemeId[]).map((id) => (
            <button
              key={id}
              className={theme === id ? "button-primary" : "button-ghost"}
              onClick={() => {
                setTheme(id);
                toast.success(id === "dark" ? "Night theme on" : "Paper theme on");
              }}
            >
              {id === "dark" ? "Night" : "Paper"}
            </button>
          ))}
        </div>
      </section>

      <section className="panel settings-card">
        <p className="panel-kicker">Account</p>
        <h2>Signed-in profile</h2>
        <p>
          Signed in as {user?.primaryEmail || profile.email}. Profile details stay with this workspace.
        </p>
        <form
          className="form-grid"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            setProfile({
              name: String(fd.get("name") || profile.name),
              email: String(fd.get("email") || profile.email),
              role: String(fd.get("role") || profile.role),
              initials: profile.initials,
            });
            toast.success("Profile saved");
          }}
        >
          <div className="field">
            <label htmlFor="p-name">Name</label>
            <input id="p-name" name="name" defaultValue={profile.name} />
          </div>
          <div className="field">
            <label htmlFor="p-email">Email</label>
            <input id="p-email" name="email" type="email" defaultValue={profile.email} />
          </div>
          <div className="field">
            <label htmlFor="p-role">Role</label>
            <input id="p-role" name="role" defaultValue={profile.role} />
          </div>
          <div className="dialog-actions">
            <button className="button-primary" type="submit">
              Save profile
            </button>
          </div>
        </form>
      </section>

      <section className="panel settings-card">
        <p className="panel-kicker">Android</p>
        <h2>Install on Android</h2>
        <p>
          Download the cdxi vantage app for phones, tablets, and foldables. On first open, enter this
          workspace address so the app wraps your signed-in operation.
        </p>
        {origin && (
          <p className="muted-line" style={{ marginTop: 10 }}>
            Workspace URL: {origin}
          </p>
        )}
        <div className="heading-actions" style={{ marginTop: 16 }}>
          {canInstall && (
            <button type="button" className="button-primary" onClick={() => void install()}>
              <Download size={16} />
              Install app
            </button>
          )}
          {installed && <span className="muted-line">Installed on this device.</span>}
          <a className="button-primary" href="/cdxi-vantage.apk" download="cdxi-vantage.apk">
            <Download size={16} />
            Download Android app
          </a>
        </div>
        <p className="muted-line" style={{ marginTop: 12 }}>
          Allow installs from this source when prompted. You can also add vantage to the home screen
          from the browser menu. Long-press Back in the app to change the workspace URL.
        </p>
      </section>

      <section className="panel settings-card">
        <p className="panel-kicker">Data</p>
        <h2>Workspace data</h2>
        <p>
          Restore the Northline Advisory sample, or clear everything and start from an empty operating view. Changes
          save to this account.
        </p>
        <div className="heading-actions" style={{ marginTop: 16 }}>
          <button
            className="button-primary"
            onClick={() => {
              restoreDemo();
              toast.success("Demo data restored");
            }}
          >
            Restore demo
          </button>
          <button
            className="button-ghost"
            onClick={() => {
              clearWorkspace();
              toast.success("Workspace cleared");
            }}
          >
            Clear workspace
          </button>
        </div>
      </section>

      <section className="panel settings-card">
        <p className="panel-kicker">Session</p>
        <h2>Sign out</h2>
        {gateSession ? (
          <p>This session is managed by Grok, so sign-out is not available here.</p>
        ) : (
          <>
            <p>Returns you to the vantage home page. Workspace data stays on this account.</p>
            <div className="heading-actions" style={{ marginTop: 16 }}>
              <button
                className="button-ghost"
                disabled={signingOut}
                onClick={() => {
                  setSigningOut(true);
                  void signOut("/").catch(() => setSigningOut(false));
                }}
              >
                {signingOut ? "Signing out…" : "Sign out"}
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
