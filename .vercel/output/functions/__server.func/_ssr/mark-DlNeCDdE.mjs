import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as authClient } from "./client-B40BzJxt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mark-DlNeCDdE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
function VantageMark({ className }) {
	const uid = (0, import_react.useId)().replace(/:/g, "");
	const gradC = `vmC-${uid}`;
	const gradA = `vmA-${uid}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className,
		viewBox: "20 10 118 80",
		width: "38",
		height: "26",
		"aria-hidden": "true",
		focusable: "false",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: gradC,
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "#7F00FF"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "#0088FF"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: gradA,
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "#0088FF"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "#00FFFF"
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M 60 10 A 40 40 0 0 0 20 50 A 40 40 0 0 0 60 90 L 60 70 A 20 20 0 0 1 40 50 A 20 20 0 0 1 60 30 Z",
				fill: `url(#${gradC})`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M 70 10 L 110 50 L 70 90 L 98 90 L 138 50 L 98 10 Z",
				fill: `url(#${gradA})`
			})
		]
	});
}
function VantageMarkMono({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className,
		viewBox: "20 10 118 80",
		width: "38",
		height: "26",
		"aria-hidden": "true",
		focusable: "false",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M 60 10 A 40 40 0 0 0 20 50 A 40 40 0 0 0 60 90 L 60 70 A 20 20 0 0 1 40 50 A 20 20 0 0 1 60 30 Z",
			fill: "currentColor"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M 70 10 L 110 50 L 70 90 L 98 90 L 138 50 L 98 10 Z",
			fill: "currentColor"
		})]
	});
}
function VantageLockup({ stacked = false, tagline = false, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `vantage-lockup ${stacked ? "stacked" : ""} ${className}`.trim(),
		"aria-label": "cdxi vantage",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VantageMark, { className: "vantage-lockup-mark" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "vantage-lockup-type",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "cdxi",
					children: "cdxi"
				}),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "|" }),
				" vantage"
			] }), tagline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "The business operating platform" })]
		})]
	});
}
//#endregion
export { useCurrentUserState as a, useCurrentUser as i, VantageMark as n, VantageMarkMono as r, VantageLockup as t };
