import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { useVantage } from "@/lib/vantage/store";
import type { ModuleId } from "@/lib/vantage/types";

type InstallPrompt = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

const STEPS: { module: ModuleId; kicker: string; title: string; body: string }[] = [
  {
    module: "overview",
    kicker: "1 · Command centre",
    title: "This is the whole business",
    body: "The rail across the top is the lifecycle — Idea through Exit. Metrics, the brief, and what needs you today sit underneath. Move the stage only when the firm actually moves.",
  },
  {
    module: "launch",
    kicker: "2 · Launch",
    title: "Setup lives in one list",
    body: "Identity, legal, money, insurance, brand, and systems. Tick a step when it is done. The idea canvas stays with you if you are still shaping the offer.",
  },
  {
    module: "customers",
    kicker: "3 · Customers",
    title: "Every client has a 360",
    body: "Add the businesses you serve. Open one to see their work, deals, invoices, and the next conversation — not a pile of separate tools.",
  },
  {
    module: "pipeline",
    kicker: "4 · Pipeline",
    title: "Move value toward won",
    body: "A deal starts as a lead. Advance it when the conversation moves. Won deals feed the reports. Lost ones stay visible so the pattern is honest.",
  },
  {
    module: "work",
    kicker: "5 · Work and time",
    title: "Delivery, then the hours",
    body: "Open a job, tick the checklist, and log time on the same record. The timesheet and the live timer use those same hours.",
  },
  {
    module: "finance",
    kicker: "6 · Money",
    title: "Invoices stay until they are paid",
    body: "Pick one ledger — Xero, MYOB, QuickBooks, or Reckon — and add the accountant who lodges for you. Invoices and GST stay on the record until they are paid.",
  },
  {
    module: "inbox",
    kicker: "7 · Inbox",
    title: "Start the day here",
    body: "What needs a decision is collected in one list. Snooze it, clear it, or open the record. Search anything with the shortcut in the top bar.",
  },
  {
    module: "settings",
    kicker: "8 · You're in",
    title: "Make it yours",
    body: "Name the business, set what the agents may do, and use Assist on any page when something breaks or a state-law question comes up. You can replay this tour from Shortcuts.",
  },
];

export function useInstallPrompt() {
  const [prompt, setPrompt] = useState<InstallPrompt | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    setInstalled(standalone);
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPrompt(event as InstallPrompt);
    };
    const onInstalled = () => {
      setInstalled(true);
      setPrompt(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const install = async () => {
    if (!prompt) return false;
    await prompt.prompt();
    const choice = await prompt.userChoice;
    setPrompt(null);
    return choice.outcome === "accepted";
  };

  return { canInstall: Boolean(prompt) && !installed, installed, install };
}

export function WorkspaceGuide({ onCreate }: { onCreate: () => void }) {
  const setModule = useVantage((s) => s.setModule);
  const setTourDone = useVantage((s) => s.setTourDone);
  const [step, setStep] = useState(0);
  const { canInstall, installed, install } = useInstallPrompt();
  const current = STEPS[step] ?? STEPS[0];
  const last = step === STEPS.length - 1;

  useEffect(() => {
    setModule(current.module);
    const root = document.querySelector(".vantage-app");
    root?.setAttribute("data-guide", current.module);
    root?.classList.add("guiding");
    return () => {
      root?.removeAttribute("data-guide");
      root?.classList.remove("guiding");
    };
  }, [current.module, setModule]);

  const finish = () => setTourDone(true);

  return (
    <aside className="guide-dock" role="dialog" aria-labelledby="guide-title" data-step={current.module}>
      <div className="guide-top">
        <p className="panel-kicker">{current.kicker}</p>
        <button type="button" className="icon-button" onClick={finish} aria-label="Skip the tour">
          <X size={16} />
        </button>
      </div>
      <h2 id="guide-title">{current.title}</h2>
      <p>{current.body}</p>
      <div className="guide-dots" aria-hidden="true">
        {STEPS.map((item, index) => (
          <i key={item.module} className={index === step ? "on" : ""} />
        ))}
      </div>
      <div className="guide-actions">
        <button type="button" className="button-ghost" onClick={finish}>
          Skip
        </button>
        <span className="grow" />
        {step > 0 && (
          <button type="button" className="button-ghost" onClick={() => setStep((n) => n - 1)}>
            Back
          </button>
        )}
        {last && canInstall && (
          <button
            type="button"
            className="button-ghost"
            onClick={() => {
              void install();
            }}
          >
            <Download size={15} /> Install
          </button>
        )}
        {last && !canInstall && installed && <span className="guide-note">Installed</span>}
        {last ? (
          <button
            type="button"
            className="button-primary"
            onClick={() => {
              finish();
              onCreate();
            }}
          >
            Create first record
          </button>
        ) : (
          <button type="button" className="button-primary" onClick={() => setStep((n) => n + 1)}>
            Next
          </button>
        )}
      </div>
    </aside>
  );
}
