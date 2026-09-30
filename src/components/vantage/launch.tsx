import { useMemo, useState } from "react";
import { Check, Plus, Rocket } from "lucide-react";
import { toast } from "sonner";
import { useVantage } from "@/lib/vantage/store";
import { launchProgress } from "@/lib/vantage/selectors";
import { LAUNCH_AREAS, LIFECYCLE_STAGES, stageNote } from "@/lib/vantage/lifecycle";
import { fmtDay } from "@/lib/vantage/format";
import type { LaunchArea, LifecycleStage } from "@/lib/vantage/types";

export function LaunchCentre({ onCreate }: { onCreate: () => void }) {
  const data = useVantage();
  const toggleLaunch = useVantage((s) => s.toggleLaunch);
  const setIdeaCanvas = useVantage((s) => s.setIdeaCanvas);
  const setLifecycle = useVantage((s) => s.setLifecycle);
  const tasks = data.launchTasks;
  const progress = launchProgress(data);
  const [area, setArea] = useState<"all" | LaunchArea>("all");
  const filtered = useMemo(
    () => tasks.filter((t) => area === "all" || t.area === area),
    [tasks, area],
  );
  const open = filtered.filter((t) => !t.done).length;

  return (
    <div className="launch-centre">
      <section className="panel launch-hero">
        <div>
          <p className="panel-kicker">Setup autopilot</p>
          <h2>Walk the business from idea to operating.</h2>
          <p>
            {stageNote(data.lifecycle)} Tick items as you complete them. Vantage keeps the master record — Xero,
            HubSpot, and the rest sit underneath.
          </p>
        </div>
        <div className="launch-score">
          <span>Setup complete</span>
          <strong>{progress}%</strong>
          <small>
            {tasks.filter((t) => t.done).length} of {tasks.length} items
          </small>
        </div>
      </section>

      <div className="life-rail" role="list">
        {LIFECYCLE_STAGES.map((stage) => (
          <button
            key={stage.id}
            role="listitem"
            className={`life-step ${data.lifecycle === stage.id ? "active" : ""}`}
            onClick={() => {
              setLifecycle(stage.id);
              toast.success(`Stage set to ${stage.label}`);
            }}
          >
            <em>{stage.verb}</em>
            <strong>{stage.label}</strong>
          </button>
        ))}
      </div>

      {(data.lifecycle === "idea" || data.lifecycle === "start") && (
        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Idea canvas</p>
              <h2>What are you building?</h2>
            </div>
          </div>
          <form
            className="form-grid two"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              setIdeaCanvas({
                concept: String(fd.get("concept") || ""),
                market: String(fd.get("market") || ""),
                model: String(fd.get("model") || ""),
                nextStep: String(fd.get("nextStep") || ""),
              });
              toast.success("Canvas saved");
            }}
          >
            <div className="field full">
              <label htmlFor="idea-concept">Concept</label>
              <textarea id="idea-concept" name="concept" rows={2} defaultValue={data.ideaCanvas.concept} />
            </div>
            <div className="field">
              <label htmlFor="idea-market">Target market</label>
              <textarea id="idea-market" name="market" rows={2} defaultValue={data.ideaCanvas.market} />
            </div>
            <div className="field">
              <label htmlFor="idea-model">Model</label>
              <textarea id="idea-model" name="model" rows={2} defaultValue={data.ideaCanvas.model} />
            </div>
            <div className="field full">
              <label htmlFor="idea-next">Next step</label>
              <input id="idea-next" name="nextStep" defaultValue={data.ideaCanvas.nextStep} />
            </div>
            <div className="dialog-actions full">
              <button className="button-primary" type="submit">
                Save canvas
              </button>
            </div>
          </form>
        </section>
      )}

      <div className="toolbar">
        <div className="chip-row" role="tablist" aria-label="Setup area">
          <button className={area === "all" ? "chip active" : "chip"} onClick={() => setArea("all")}>
            All · {open} open
          </button>
          {LAUNCH_AREAS.map((item) => (
            <button
              key={item.id}
              className={area === item.id ? "chip active" : "chip"}
              onClick={() => setArea(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button className="button-primary" onClick={onCreate}>
          <Plus size={16} /> Add setup item
        </button>
      </div>

      {filtered.length === 0 ? (
        <section className="panel">
          <div className="empty-icon">
            <Rocket size={20} />
          </div>
          <h2>No setup items yet.</h2>
          <p className="heading-note">Add the first registration, policy, or operating system to track.</p>
        </section>
      ) : (
        <ul className="launch-list">
          {filtered.map((task) => (
            <li key={task.id} className={`launch-row ${task.done ? "done" : ""}`}>
              <button
                className="check-hit"
                aria-pressed={task.done}
                aria-label={task.done ? `Reopen ${task.title}` : `Complete ${task.title}`}
                onClick={() => toggleLaunch(task.id)}
              >
                {task.done ? <Check size={14} /> : null}
              </button>
              <div>
                <strong>{task.title}</strong>
                <span>
                  {LAUNCH_AREAS.find((a) => a.id === task.area)?.label} · {stageLabelSafe(task.stage)} ·{" "}
                  {task.owner}
                  {task.due ? ` · ${fmtDay(task.due)}` : ""}
                </span>
                {task.notes ? <small>{task.notes}</small> : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function stageLabelSafe(id: LifecycleStage) {
  return LIFECYCLE_STAGES.find((s) => s.id === id)?.label ?? id;
}
