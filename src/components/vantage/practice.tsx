import { useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { toast } from "sonner";
import { LEDGERS } from "@/lib/vantage/lifecycle";
import { useVantage } from "@/lib/vantage/store";
import type { AccountantEngagement, LedgerId } from "@/lib/vantage/types";

const ENGAGEMENTS: { id: AccountantEngagement; label: string }[] = [
  { id: "full", label: "Full service" },
  { id: "bas", label: "BAS and activity statements" },
  { id: "tax", label: "Income tax" },
  { id: "advisory", label: "Advisory only" },
];

export function PracticePanel() {
  const accountant = useVantage((s) => s.accountant);
  const ledger = useVantage((s) => s.ledger);
  const setAccountant = useVantage((s) => s.setAccountant);
  const clearAccountant = useVantage((s) => s.clearAccountant);
  const setLedger = useVantage((s) => s.setLedger);
  const [pending, setPending] = useState<LedgerId | null>(null);
  const chosen = LEDGERS.find((item) => item.id === ledger);
  const opening = LEDGERS.find((item) => item.id === pending);

  return (
    <div className="practice-grid">
      <section className="panel settings-card">
        <p className="panel-kicker">Adviser</p>
        <h2>Accountant</h2>
        <p>The person who lodges for this business. They appear on People as a contractor. Vantage does not email them.</p>
        <form
          className="form-grid two"
          key={accountant?.email || "none"}
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const name = String(fd.get("name") || "").trim();
            const email = String(fd.get("email") || "").trim();
            if (!name) return;
            if (email && !email.includes("@")) {
              toast.error("Enter a real email, or leave it blank.");
              return;
            }
            setAccountant({
              name,
              firm: String(fd.get("firm") || "").trim(),
              email,
              phone: String(fd.get("phone") || "").trim(),
              engagement: String(fd.get("engagement") || "full") as AccountantEngagement,
            });
            toast.success(`${name} saved as accountant`);
          }}
        >
          <div className="field">
            <label htmlFor="acc-name">Name</label>
            <input id="acc-name" name="name" required defaultValue={accountant?.name ?? ""} placeholder="Jordan Hale" />
          </div>
          <div className="field">
            <label htmlFor="acc-firm">Firm</label>
            <input id="acc-firm" name="firm" defaultValue={accountant?.firm ?? ""} placeholder="Hale & Co" />
          </div>
          <div className="field">
            <label htmlFor="acc-email">Email</label>
            <input id="acc-email" name="email" type="email" defaultValue={accountant?.email ?? ""} placeholder="jordan@hale.co" />
          </div>
          <div className="field">
            <label htmlFor="acc-phone">Phone</label>
            <input id="acc-phone" name="phone" defaultValue={accountant?.phone ?? ""} placeholder="08 9000 0000" />
          </div>
          <div className="field full">
            <label htmlFor="acc-scope">Engagement</label>
            <select id="acc-scope" name="engagement" defaultValue={accountant?.engagement ?? "full"}>
              {ENGAGEMENTS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className="dialog-actions full">
            <button className="button-primary" type="submit">
              Save accountant
            </button>
            {accountant && (
              <button
                className="button-ghost"
                type="button"
                onClick={() => {
                  clearAccountant();
                  toast.success("Accountant removed");
                }}
              >
                Remove
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="panel settings-card">
        <p className="panel-kicker">Ledger</p>
        <h2>Accounting software</h2>
        <p>
          One system of record. {chosen ? `${chosen.name} is selected.` : "None selected yet."} Sign-in stays on their
          site. Vantage never stores that password.
        </p>
        <div className="system-list">
          {LEDGERS.map((item) => {
            const on = ledger === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={on ? "system-chip on" : "system-chip"}
                onClick={() => setPending(item.id)}
              >
                <strong>{item.name}</strong>
                <span>{on ? "Selected" : item.note}</span>
              </button>
            );
          })}
        </div>
        {ledger && (
          <div className="dialog-actions" style={{ marginTop: 12 }}>
            <a className="button-ghost" href={chosen?.href} target="_blank" rel="noreferrer">
              Open {chosen?.name} <ArrowUpRight size={14} />
            </a>
            <button
              type="button"
              className="button-ghost"
              onClick={() => {
                setLedger(null);
                toast.success("Accounting software cleared");
              }}
            >
              Disconnect
            </button>
          </div>
        )}
      </section>

      {opening && (
        <div
          className="dialog-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setPending(null);
          }}
        >
          <section className="create-dialog" role="dialog" aria-modal="true" aria-labelledby="ledger-title">
            <div className="dialog-header">
              <div>
                <p className="panel-kicker">Guided connection</p>
                <h2 id="ledger-title">Connect {opening.name}</h2>
              </div>
              <button type="button" className="icon-button" onClick={() => setPending(null)} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <p>{opening.note} You will sign in on the official {opening.name} site. Come back and confirm once the file is open.</p>
            <div className="dialog-actions">
              <a className="button-ghost" href={opening.href} target="_blank" rel="noreferrer">
                Open {opening.name} <ArrowUpRight size={14} />
              </a>
              <button
                type="button"
                className="button-primary"
                onClick={() => {
                  setLedger(opening.id);
                  setPending(null);
                  toast.success(`${opening.name} set as the ledger`);
                }}
              >
                I've signed in
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
