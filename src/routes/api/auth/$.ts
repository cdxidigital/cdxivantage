import { createFileRoute } from "@tanstack/react-router";
import { auth } from "@/lib/auth/server";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => auth.handler(request),
      POST: async ({ request }) => {
        const { ensureSeedAccounts } = await import("@/lib/vantage/seed-accounts.server");
        await ensureSeedAccounts();
        return auth.handler(request);
      },
    },
  },
});
