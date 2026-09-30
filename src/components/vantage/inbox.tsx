import { Archive, CalendarDays, Check, Clock3, FileCheck2, FolderKanban, Handshake, Rocket, UsersRound, WalletCards } from "lucide-react";
import { toast } from "sonner";
import { useVantage } from "@/lib/vantage/store";
import { inboxItems, outstandingTotal, weeklyBriefing, type InboxEntry } from "@/lib/vantage/selectors";
import { fmtDay, money } from "@/lib/vantage/format";

const ICONS = {
  work: FolderKanban,
  finance: WalletCards,
  compliance: FileCheck2,
  followup: UsersRound,
  event: CalendarDays,
  deal: Handshake,
  launch: Rocket,
  vault: Archive,
};

export function InboxView() {
  const data = useVantage();
  const items = inboxItems(data);
  const brief = weeklyBriefing(data);
  const moveWork = useVantage((s) => s.moveWork);
  const updateFinance = useVantage((s) => s.updateFinance);
  const markReviewed = useVantage((s) => s.markReviewed);
  const updateCustomer = useVantage((s) => s.updateCustomer);
  const snoozeInbox = useVantage((s) => s.snoozeInbox);
  const clearInboxItem = useVantage((s) => s.clearInboxItem);
  const moveDeal = useVantage((s) => s.moveDeal);
  const toggleLaunch = useVantage((s) => s.toggleLaunch);
  const setModule = useVantage((s) => s.setModule);

  const act = (item: InboxEntry) => {
    if (item.kind === "work") {
      moveWork(item.id, "done");
      toast.success("Marked done");
    } else if (item.kind === "finance") {
      updateFinance(item.id, { status: "paid" });
      toast.success("Marked paid");
    } else if (item.kind === "compliance") {
      markReviewed(item.id);
      toast.success("Marked reviewed");
    } else if (item.kind === "followup") {
      const customerId = item.id.replace(/^fu-/, "");
      updateCustomer(customerId, { followUp: "" });
      clearInboxItem(item.id);
      toast.success("Follow-up cleared");
    } else if (item.kind === "deal") {
      moveDeal(item.id, "won");
      toast.success("Marked won");
    } else if (item.kind === "launch") {
      toggleLaunch(item.id);
      toast.success("Setup item done");
    } else if (item.kind === "vault") {
      snoozeInbox(item.id, 14);
      toast.success("Snoozed 14 days");
    } else {
      clearInboxItem(item.id);
    }
  };

  return (
    <>
      <div className="briefing-banner">
        <div>
          <p className="panel-kicker">This week</p>
          <h2>{items.length === 0 ? "Inbox is clear." : `${items.length} items need a decision.`}</h2>
          <ul>
            {brief.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div className="briefing-stats">
          <div>
            <strong>{money(outstandingTotal(data.finance))}</strong>
            <span>To collect</span>
          </div>
          <div>
            <strong>{money(brief.pipeline)}</strong>
            <span>Pipeline</span>
          </div>
          <div>
            <strong>{brief.hours}h</strong>
            <span>Hours this week</span>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <section className="module-placeholder panel">
          <p className="panel-kicker">Inbox</p>
          <h2>You are clear for now</h2>
          <p>Overdue invoices, high-priority work, deals, compliance, and follow-ups land here.</p>
          <button className="button-ghost" onClick={() => setModule("overview")}>
            Back to overview
          </button>
        </section>
      ) : (
        <section className="panel inbox-panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Action list</p>
              <h2>Decide, then move on</h2>
            </div>
          </div>
          <ul className="inbox-list">
            {items.map((item) => {
              const Icon = ICONS[item.kind];
              return (
                <li key={item.id} className={`inbox-row tone-${item.tone}`}>
                  <div className={`inbox-icon tone-${item.tone}`}>
                    <Icon size={16} />
                  </div>
                  <div className="inbox-copy">
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </div>
                  <em>{fmtDay(item.due, "d MMM")}</em>
                  <div className="inbox-actions">
                    <button className="button-ghost" onClick={() => setModule(item.module)}>
                      Open
                    </button>
                    <button
                      className="button-ghost"
                      onClick={() => {
                        snoozeInbox(item.id, 1);
                        toast.success("Snoozed until tomorrow");
                      }}
                    >
                      <Clock3 size={14} /> Snooze
                    </button>
                    <button className="button-primary" onClick={() => act(item)}>
                      <Check size={14} /> {item.action}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
}
