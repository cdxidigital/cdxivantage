import { useState } from "react";
import { LifeBuoy, X } from "lucide-react";
import { toast } from "sonner";
import { generateInsight } from "@/lib/vantage/api";
import { insightSnapshot } from "@/lib/vantage/selectors";
import { useVantage } from "@/lib/vantage/store";

export function AssistDialog({
  moduleLabel,
  onClose,
}: {
  moduleLabel: string;
  onClose: () => void;
}) {
  const data = useVantage();
  const brief = useVantage((s) => s.agentBriefs.assist);
  const level = useVantage((s) => s.aiPermissions.assist ?? "recommend");
  const setAgentBrief = useVantage((s) => s.setAgentBrief);
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);

  const ask = async () => {
    setBusy(true);
    try {
      const asked = question.trim();
      const result = await generateInsight({
        data: {
          snapshot: insightSnapshot(data),
          agent: "assist",
          level,
          question: asked ? `On the ${moduleLabel} screen. ${asked}` : `On the ${moduleLabel} screen. What needs attention?`,
        },
      });
      if (result.ok) {
        setAgentBrief("assist", result.brief);
        toast.success("Assist is ready");
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("Assist could not answer just now.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="dialog-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section className="create-dialog assist-dialog" role="dialog" aria-modal="true" aria-labelledby="assist-title">
        <div className="dialog-header">
          <div>
            <p className="panel-kicker">Workspace · Australian business law</p>
            <h2 id="assist-title">Assist</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close assist">
            <X size={18} />
          </button>
        </div>
        <p className="assist-note">
          Ask about a problem on this page, or about business law in any state or territory. This is general
          information, not legal advice. Confirm with a lawyer or your accountant before you rely on it.
        </p>
        <div className="field assist-ask">
          <label htmlFor="assist-question">What's the issue?</label>
          <textarea
            id="assist-question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Example: hired in Queensland, company is in WA — which workers compensation scheme?"
            maxLength={800}
          />
        </div>
        <div className="dialog-actions">
          <button className="button-ghost" type="button" onClick={onClose}>
            Close
          </button>
          <button className="button-primary" type="button" onClick={() => void ask()} disabled={busy}>
            <LifeBuoy size={15} />
            {busy ? "Looking…" : "Ask"}
          </button>
        </div>
        {brief && (
          <div className="assist-result">
            <h3>{brief.headline}</h3>
            {brief.priorities.length > 0 && (
              <div>
                <p className="panel-kicker">What to do</p>
                <ul>
                  {brief.priorities.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            )}
            {brief.risks.length > 0 && (
              <div>
                <p className="panel-kicker">Watch</p>
                <ul>
                  {brief.risks.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            )}
            {brief.nextMove && <p>{brief.nextMove}</p>}
          </div>
        )}
      </section>
    </div>
  );
}
