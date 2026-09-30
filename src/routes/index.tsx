import { createFileRoute } from "@tanstack/react-router";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { VantageApp } from "@/components/vantage/shell";
import { LandingPage } from "@/components/vantage/landing";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { sessionUser } = Route.useRouteContext();
  const { user, isPending } = useCurrentUserState();
  // Cookie sessions skip the marketing page. Bearer-only sessions resolve on the
  // client; don't hold signed-out visitors on a blank pulse while that check runs.
  if (user || (sessionUser && isPending)) return <VantageApp />;
  return <LandingPage />;
}
