import { ArrowUpRight } from "lucide-react";
import { VantageLockup } from "./mark";

export function SignedOut({ onSignIn }: { onSignIn: () => void }) {
  return (
    <main className="logged-out">
      <div className="logged-out-card">
        <VantageLockup stacked tagline />
        <span className="eyebrow">Business operating platform</span>
        <h1>Operations, in view.</h1>
        <p>
          Your workspace is signed out. Sign in to continue managing the work that moves the business
          forward.
        </p>
        <button className="button-primary" onClick={onSignIn}>
          Sign in to vantage <ArrowUpRight size={15} />
        </button>
        <small>Secure workspace · cdxi digital</small>
      </div>
    </main>
  );
}
