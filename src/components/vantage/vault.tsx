import { useMemo, useState } from "react";
import { Archive, Plus } from "lucide-react";
import { toast } from "sonner";
import { useVantage } from "@/lib/vantage/store";
import { vaultDueSoon } from "@/lib/vantage/selectors";
import { VAULT_KINDS } from "@/lib/vantage/lifecycle";
import { fmtDay } from "@/lib/vantage/format";
import type { VaultKind } from "@/lib/vantage/types";

export function VaultView({ onCreate }: { onCreate: () => void }) {
  const vault = useVantage((s) => s.vault);
  const data = useVantage();
  const removeVault = useVantage((s) => s.removeVault);
  const [kind, setKind] = useState<"all" | VaultKind>("all");
  const due = vaultDueSoon(data);
  const rows = useMemo(
    () => vault.filter((d) => kind === "all" || d.kind === kind),
    [vault, kind],
  );

  return (
    <>
      <div className="metric-grid">
        <div className="metric-card">
          <div className="metric-top">
            <span>Documents</span>
          </div>
          <strong className="metric-value">{vault.length}</strong>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <span>Renewing in 45 days</span>
          </div>
          <strong className="metric-value">{due.length}</strong>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <span>Contracts</span>
          </div>
          <strong className="metric-value">{vault.filter((d) => d.kind === "contract").length}</strong>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <span>Policies</span>
          </div>
          <strong className="metric-value">{vault.filter((d) => d.kind === "policy").length}</strong>
        </div>
      </div>

      <div className="toolbar">
        <div className="chip-row">
          <button className={kind === "all" ? "chip active" : "chip"} onClick={() => setKind("all")}>
            All
          </button>
          {VAULT_KINDS.map((item) => (
            <button
              key={item.id}
              className={kind === item.id ? "chip active" : "chip"}
              onClick={() => setKind(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button className="button-primary" onClick={onCreate}>
          <Plus size={16} /> File document
        </button>
      </div>

      {rows.length === 0 ? (
        <section className="panel">
          <div className="empty-icon">
            <Archive size={20} />
          </div>
          <h2>The vault is empty.</h2>
          <p className="heading-note">
            File constitutions, contracts, policies, and IP so renewals surface in the inbox.
          </p>
        </section>
      ) : (
        <ul className="vault-list">
          {rows.map((doc) => (
            <li key={doc.id} className="vault-row">
              <div>
                <p className="panel-kicker">{VAULT_KINDS.find((k) => k.id === doc.kind)?.label}</p>
                <strong>{doc.title}</strong>
                <span>
                  {doc.counterparty || "Internal"}
                  {doc.renewsOn ? ` · renews ${fmtDay(doc.renewsOn)}` : " · no renewal"}
                </span>
                {doc.extracted ? <p className="vault-extract">{doc.extracted}</p> : null}
                {doc.notes ? <small>{doc.notes}</small> : null}
              </div>
              <button
                className="button-ghost"
                onClick={() => {
                  removeVault(doc.id);
                  toast.success("Removed from vault");
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
