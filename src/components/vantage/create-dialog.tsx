import { useState } from "react";
import {
  Archive,
  ArrowUpRight,
  CalendarDays,
  FileCheck2,
  FolderKanban,
  Handshake,
  Rocket,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useVantage } from "@/lib/vantage/store";
import { todayIso } from "@/lib/vantage/format";
import type { CreateKind, ModuleId } from "@/lib/vantage/types";

const KINDS: { id: CreateKind; title: string; note: string; icon: typeof FolderKanban; module: ModuleId }[] = [
  { id: "work", title: "Work item", note: "Start a project, task, or deliverable", icon: FolderKanban, module: "work" },
  { id: "deal", title: "Deal", note: "Track a lead through to won", icon: Handshake, module: "pipeline" },
  { id: "customer", title: "Customer", note: "Add a customer or prospect", icon: UsersRound, module: "customers" },
  { id: "person", title: "Person", note: "Add an operator, hire, or contractor", icon: UsersRound, module: "people" },
  { id: "event", title: "Calendar event", note: "Schedule time with your team", icon: CalendarDays, module: "calendar" },
  { id: "finance", title: "Finance record", note: "Log an invoice, payment, or expense", icon: WalletCards, module: "finance" },
  { id: "launch", title: "Setup item", note: "Track a registration, policy, or system", icon: Rocket, module: "launch" },
  { id: "vault", title: "Vault document", note: "File a contract, policy, or licence", icon: Archive, module: "vault" },
  { id: "compliance", title: "Compliance item", note: "Track a registration, licence, or control", icon: FileCheck2, module: "compliance" },
];

export function CreateDialog({
  onClose,
  initial,
}: {
  onClose: () => void;
  initial?: CreateKind | null;
}) {
  const [kind, setKind] = useState<CreateKind | null>(initial ?? null);
  const customers = useVantage((s) => s.customers);
  const addWork = useVantage((s) => s.addWork);
  const addCustomer = useVantage((s) => s.addCustomer);
  const addEvent = useVantage((s) => s.addEvent);
  const addFinance = useVantage((s) => s.addFinance);
  const addCompliance = useVantage((s) => s.addCompliance);
  const addDeal = useVantage((s) => s.addDeal);
  const addLaunch = useVantage((s) => s.addLaunch);
  const addVault = useVantage((s) => s.addVault);
  const addTeamMember = useVantage((s) => s.addTeamMember);
  const setModule = useVantage((s) => s.setModule);
  const profile = useVantage((s) => s.profile);

  const finish = (module: ModuleId, label: string) => {
    setModule(module);
    toast.success(`${label} created`);
    onClose();
  };

  return (
    <div
      className="dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="create-dialog wide" role="dialog" aria-modal="true" aria-labelledby="create-title">
        <div className="dialog-header">
          <div>
            <p className="panel-kicker">Quick action</p>
            <h2 id="create-title">{kind ? `New ${KINDS.find((k) => k.id === kind)?.title}` : "Create something new"}</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close create dialog">
            <X size={18} />
          </button>
        </div>

        {!kind &&
          KINDS.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} className="create-option" onClick={() => setKind(item.id)}>
                <Icon size={18} />
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.note}</small>
                </span>
                <ArrowUpRight size={15} />
              </button>
            );
          })}

        {kind === "work" && (
          <form
            className="form-grid two"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const title = String(fd.get("title") || "").trim();
              if (!title) return;
              addWork({
                title,
                team: String(fd.get("team") || "Delivery · Internal"),
                customerId: String(fd.get("customerId") || "") || undefined,
                status: "scheduled",
                priority: (String(fd.get("priority") || "medium") as "low" | "medium" | "high"),
                due: String(fd.get("due") || todayIso()),
                owner: String(fd.get("owner") || profile.name),
                notes: String(fd.get("notes") || ""),
              });
              finish("work", title);
            }}
          >
            <div className="field full">
              <label htmlFor="w-title">Title</label>
              <input id="w-title" name="title" required placeholder="Name the work" />
            </div>
            <div className="field">
              <label htmlFor="w-due">Due</label>
              <input id="w-due" name="due" type="date" defaultValue={todayIso()} />
            </div>
            <div className="field">
              <label htmlFor="w-prio">Priority</label>
              <select id="w-prio" name="priority" defaultValue="medium">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="w-team">Team</label>
              <input id="w-team" name="team" defaultValue="Delivery · Internal" />
            </div>
            <div className="field">
              <label htmlFor="w-owner">Owner</label>
              <input id="w-owner" name="owner" defaultValue={profile.name} />
            </div>
            <div className="field full">
              <label htmlFor="w-cus">Customer</label>
              <select id="w-cus" name="customerId" defaultValue="">
                <option value="">Internal</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field full">
              <label htmlFor="w-notes">Notes</label>
              <textarea id="w-notes" name="notes" rows={3} />
            </div>
            <div className="dialog-actions full">
              <button type="button" className="button-ghost" onClick={() => setKind(null)}>
                Back
              </button>
              <button className="button-primary" type="submit">
                Create work
              </button>
            </div>
          </form>
        )}

        {kind === "customer" && (
          <form
            className="form-grid two"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const name = String(fd.get("name") || "").trim();
              if (!name) return;
              addCustomer({
                name,
                contact: String(fd.get("contact") || ""),
                email: String(fd.get("email") || ""),
                status: "prospect",
                value: Number(fd.get("value") || 0),
                industry: String(fd.get("industry") || "Professional services"),
                location: String(fd.get("location") || "Perth, WA"),
                notes: String(fd.get("notes") || ""),
              });
              finish("customers", name);
            }}
          >
            <div className="field full">
              <label htmlFor="c-name">Business name</label>
              <input id="c-name" name="name" required placeholder="Harbour Dental Group" />
            </div>
            <div className="field">
              <label htmlFor="c-contact">Contact</label>
              <input id="c-contact" name="contact" />
            </div>
            <div className="field">
              <label htmlFor="c-email">Email</label>
              <input id="c-email" name="email" type="email" />
            </div>
            <div className="field">
              <label htmlFor="c-ind">Industry</label>
              <input id="c-ind" name="industry" defaultValue="Professional services" />
            </div>
            <div className="field">
              <label htmlFor="c-loc">Location</label>
              <input id="c-loc" name="location" defaultValue="Perth, WA" />
            </div>
            <div className="field full">
              <label htmlFor="c-val">Estimated annual value (AUD)</label>
              <input id="c-val" name="value" type="number" min={0} step={100} defaultValue={0} />
            </div>
            <div className="field full">
              <label htmlFor="c-notes">Notes</label>
              <textarea id="c-notes" name="notes" rows={3} />
            </div>
            <div className="dialog-actions full">
              <button type="button" className="button-ghost" onClick={() => setKind(null)}>
                Back
              </button>
              <button className="button-primary" type="submit">
                Add customer
              </button>
            </div>
          </form>
        )}

        {kind === "event" && (
          <form
            className="form-grid two"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const title = String(fd.get("title") || "").trim();
              if (!title) return;
              addEvent({
                title,
                date: String(fd.get("date") || todayIso()),
                time: String(fd.get("time") || "09:00"),
                kind: String(fd.get("kind") || "internal") as "internal" | "external",
                location: String(fd.get("location") || ""),
              });
              finish("calendar", title);
            }}
          >
            <div className="field full">
              <label htmlFor="e-title">Title</label>
              <input id="e-title" name="title" required />
            </div>
            <div className="field">
              <label htmlFor="e-date">Date</label>
              <input id="e-date" name="date" type="date" defaultValue={todayIso()} />
            </div>
            <div className="field">
              <label htmlFor="e-time">Time</label>
              <input id="e-time" name="time" type="time" defaultValue="09:00" />
            </div>
            <div className="field">
              <label htmlFor="e-kind">Type</label>
              <select id="e-kind" name="kind" defaultValue="internal">
                <option value="internal">Internal</option>
                <option value="external">External</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="e-loc">Location</label>
              <input id="e-loc" name="location" placeholder="Studio or video" />
            </div>
            <div className="dialog-actions full">
              <button type="button" className="button-ghost" onClick={() => setKind(null)}>
                Back
              </button>
              <button className="button-primary" type="submit">
                Schedule
              </button>
            </div>
          </form>
        )}

        {kind === "finance" && (
          <form
            className="form-grid two"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const title = String(fd.get("title") || "").trim();
              if (!title) return;
              const amount = Number(fd.get("amount"));
              if (!Number.isFinite(amount) || amount < 0) return;
              addFinance({
                title,
                type: String(fd.get("type") || "invoice") as "invoice" | "payment" | "expense",
                customerId: String(fd.get("customerId") || "") || undefined,
                amount,
                status: String(fd.get("status") || "outstanding") as "paid" | "outstanding" | "overdue" | "draft",
                date: String(fd.get("date") || todayIso()),
              });
              finish("finance", title);
            }}
          >
            <div className="field full">
              <label htmlFor="f-title">Description</label>
              <input id="f-title" name="title" required />
            </div>
            <div className="field">
              <label htmlFor="f-type">Type</label>
              <select id="f-type" name="type" defaultValue="invoice">
                <option value="invoice">Invoice</option>
                <option value="payment">Payment</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-amt">Amount (AUD)</label>
              <input id="f-amt" name="amount" type="number" min={0} step={50} required />
            </div>
            <div className="field">
              <label htmlFor="f-status">Status</label>
              <select id="f-status" name="status" defaultValue="outstanding">
                <option value="draft">Draft</option>
                <option value="outstanding">Outstanding</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-date">Date</label>
              <input id="f-date" name="date" type="date" defaultValue={todayIso()} />
            </div>
            <div className="field full">
              <label htmlFor="f-cus">Customer</label>
              <select id="f-cus" name="customerId" defaultValue="">
                <option value="">None</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="dialog-actions full">
              <button type="button" className="button-ghost" onClick={() => setKind(null)}>
                Back
              </button>
              <button className="button-primary" type="submit">
                Log record
              </button>
            </div>
          </form>
        )}

        {kind === "compliance" && (
          <form
            className="form-grid two"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const title = String(fd.get("title") || "").trim();
              if (!title) return;
              addCompliance({
                title,
                category: String(fd.get("category") || "Registration"),
                authority: String(fd.get("authority") || "ASIC"),
                jurisdiction: String(fd.get("jurisdiction") || "Commonwealth"),
                status: "Due soon",
                due: String(fd.get("due") || todayIso()),
                owner: String(fd.get("owner") || profile.name),
                evidence: false,
                source: String(fd.get("source") || "https://business.gov.au/"),
              });
              finish("compliance", title);
            }}
          >
            <div className="field full">
              <label htmlFor="k-title">Obligation</label>
              <input id="k-title" name="title" required placeholder="Licence, registration, or control" />
            </div>
            <div className="field">
              <label htmlFor="k-cat">Category</label>
              <input id="k-cat" name="category" defaultValue="Registration" />
            </div>
            <div className="field">
              <label htmlFor="k-auth">Authority</label>
              <input id="k-auth" name="authority" defaultValue="ASIC" />
            </div>
            <div className="field">
              <label htmlFor="k-jur">Jurisdiction</label>
              <input id="k-jur" name="jurisdiction" defaultValue="Western Australia" />
            </div>
            <div className="field">
              <label htmlFor="k-due">Due</label>
              <input id="k-due" name="due" type="date" defaultValue={todayIso()} />
            </div>
            <div className="field full">
              <label htmlFor="k-src">Official source URL</label>
              <input id="k-src" name="source" defaultValue="https://business.gov.au/" />
            </div>
            <div className="dialog-actions full">
              <button type="button" className="button-ghost" onClick={() => setKind(null)}>
                Back
              </button>
              <button className="button-primary" type="submit">
                Track obligation
              </button>
            </div>
          </form>
        )}

        {kind === "deal" && (
          <form
            className="form-grid two"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const title = String(fd.get("title") || "").trim();
              if (!title) return;
              addDeal({
                title,
                customerId: String(fd.get("customerId") || "") || undefined,
                stage: "lead",
                value: Number(fd.get("value") || 0),
                owner: String(fd.get("owner") || profile.name),
                closeDate: String(fd.get("closeDate") || todayIso()),
                notes: String(fd.get("notes") || ""),
              });
              finish("pipeline", title);
            }}
          >
            <div className="field full">
              <label htmlFor="d-title">Deal name</label>
              <input id="d-title" name="title" required placeholder="Karratha operations retainer" />
            </div>
            <div className="field">
              <label htmlFor="d-val">Value (AUD)</label>
              <input id="d-val" name="value" type="number" min={0} step={100} defaultValue={0} />
            </div>
            <div className="field">
              <label htmlFor="d-close">Expected close</label>
              <input id="d-close" name="closeDate" type="date" defaultValue={todayIso()} />
            </div>
            <div className="field">
              <label htmlFor="d-owner">Owner</label>
              <input id="d-owner" name="owner" defaultValue={profile.name} />
            </div>
            <div className="field">
              <label htmlFor="d-cus">Customer</label>
              <select id="d-cus" name="customerId" defaultValue="">
                <option value="">No account yet</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field full">
              <label htmlFor="d-notes">Notes</label>
              <textarea id="d-notes" name="notes" rows={3} />
            </div>
            <div className="dialog-actions full">
              <button type="button" className="button-ghost" onClick={() => setKind(null)}>
                Back
              </button>
              <button className="button-primary" type="submit">
                Open deal
              </button>
            </div>
          </form>
        )}

        {kind === "launch" && (
          <form
            className="form-grid two"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const title = String(fd.get("title") || "").trim();
              if (!title) return;
              addLaunch({
                title,
                area: (String(fd.get("area") || "identity") as "identity" | "legal" | "finance" | "insurance" | "brand" | "digital"),
                stage: (String(fd.get("stage") || "start") as "idea" | "start" | "run" | "grow" | "transform" | "exit"),
                done: false,
                due: String(fd.get("due") || todayIso()),
                owner: String(fd.get("owner") || profile.name),
                notes: String(fd.get("notes") || ""),
              });
              finish("launch", title);
            }}
          >
            <div className="field full">
              <label htmlFor="ln-title">Setup item</label>
              <input id="ln-title" name="title" required placeholder="ABN registered" />
            </div>
            <div className="field">
              <label htmlFor="ln-area">Area</label>
              <select id="ln-area" name="area" defaultValue="identity">
                <option value="identity">Identity</option>
                <option value="legal">Legal</option>
                <option value="finance">Finance</option>
                <option value="insurance">Insurance</option>
                <option value="brand">Brand</option>
                <option value="digital">Digital</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="ln-stage">Stage</label>
              <select id="ln-stage" name="stage" defaultValue="start">
                <option value="idea">Idea</option>
                <option value="start">Start</option>
                <option value="run">Run</option>
                <option value="grow">Grow</option>
                <option value="transform">Transform</option>
                <option value="exit">Exit</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="ln-due">Due</label>
              <input id="ln-due" name="due" type="date" defaultValue={todayIso()} />
            </div>
            <div className="field">
              <label htmlFor="ln-owner">Owner</label>
              <input id="ln-owner" name="owner" defaultValue={profile.name} />
            </div>
            <div className="field full">
              <label htmlFor="ln-notes">Notes</label>
              <textarea id="ln-notes" name="notes" rows={2} />
            </div>
            <div className="dialog-actions full">
              <button type="button" className="button-ghost" onClick={() => setKind(null)}>
                Back
              </button>
              <button className="button-primary" type="submit">
                Track item
              </button>
            </div>
          </form>
        )}

        {kind === "vault" && (
          <form
            className="form-grid two"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const title = String(fd.get("title") || "").trim();
              if (!title) return;
              addVault({
                title,
                kind: (String(fd.get("kind") || "contract") as "contract" | "policy" | "licence" | "corporate" | "ip" | "other"),
                renewsOn: String(fd.get("renewsOn") || ""),
                counterparty: String(fd.get("counterparty") || ""),
                extracted: String(fd.get("extracted") || ""),
                notes: String(fd.get("notes") || ""),
              });
              finish("vault", title);
            }}
          >
            <div className="field full">
              <label htmlFor="v-title">Document</label>
              <input id="v-title" name="title" required placeholder="Professional indemnity policy" />
            </div>
            <div className="field">
              <label htmlFor="v-kind">Kind</label>
              <select id="v-kind" name="kind" defaultValue="contract">
                <option value="contract">Contract</option>
                <option value="policy">Policy</option>
                <option value="licence">Licence</option>
                <option value="corporate">Corporate</option>
                <option value="ip">IP</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="v-renew">Renews</label>
              <input id="v-renew" name="renewsOn" type="date" />
            </div>
            <div className="field full">
              <label htmlFor="v-party">Counterparty</label>
              <input id="v-party" name="counterparty" />
            </div>
            <div className="field full">
              <label htmlFor="v-ext">Extracted terms</label>
              <textarea id="v-ext" name="extracted" rows={2} placeholder="Limits, notice periods, key clauses" />
            </div>
            <div className="dialog-actions full">
              <button type="button" className="button-ghost" onClick={() => setKind(null)}>
                Back
              </button>
              <button className="button-primary" type="submit">
                File in vault
              </button>
            </div>
          </form>
        )}

        {kind === "person" && (
          <form
            className="form-grid two"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const name = String(fd.get("name") || "").trim();
              if (!name) return;
              addTeamMember({
                name,
                role: String(fd.get("role") || "Operator"),
                email: String(fd.get("email") || ""),
                status: (String(fd.get("status") || "active") as "active" | "onboarding" | "contractor"),
                certifications: String(fd.get("certs") || "")
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
                startedAt: String(fd.get("startedAt") || todayIso()),
              });
              finish("people", name);
            }}
          >
            <div className="field full">
              <label htmlFor="pe-name">Name</label>
              <input id="pe-name" name="name" required />
            </div>
            <div className="field">
              <label htmlFor="pe-role">Role</label>
              <input id="pe-role" name="role" defaultValue="Operator" />
            </div>
            <div className="field">
              <label htmlFor="pe-email">Email</label>
              <input id="pe-email" name="email" type="email" />
            </div>
            <div className="field">
              <label htmlFor="pe-st">Status</label>
              <select id="pe-st" name="status" defaultValue="active">
                <option value="active">Active</option>
                <option value="onboarding">Onboarding</option>
                <option value="contractor">Contractor</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="pe-start">Started</label>
              <input id="pe-start" name="startedAt" type="date" defaultValue={todayIso()} />
            </div>
            <div className="field full">
              <label htmlFor="pe-certs">Certifications (comma separated)</label>
              <input id="pe-certs" name="certs" placeholder="GAICD, PMP" />
            </div>
            <div className="dialog-actions full">
              <button type="button" className="button-ghost" onClick={() => setKind(null)}>
                Back
              </button>
              <button className="button-primary" type="submit">
                Add person
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
