import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, v as Link, x as require_jsx_runtime, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { t as GROK_PROVIDERS } from "./server-C02Wrfly.mjs";
import { a as useCurrentUserState, t as VantageLockup } from "./mark-DlNeCDdE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-tqIwjll-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEMO_LOGINS = [
	{
		email: "alex@cdxi.digital",
		password: "VantageDemo1!",
		name: "Alex Kim",
		role: "Admin"
	},
	{
		email: "priya@cdxi.digital",
		password: "VantageDemo1!",
		name: "Priya Nair",
		role: "Customer success"
	},
	{
		email: "tom@cdxi.digital",
		password: "VantageDemo1!",
		name: "Tom Walsh",
		role: "Operations"
	}
];
function Login() {
	const { user, isPending } = useCurrentUserState();
	(0, import_react.useLayoutEffect)(() => {
		document.documentElement.dataset.theme = "light";
	}, []);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "logged-out",
		"aria-busy": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "logged-out-card login-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VantageLockup, {
				stacked: true,
				tagline: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "boot-pulse boot-pulse-wide" })]
		})
	});
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginForm, {});
}
function LoginForm() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(null);
	async function completeEmailSignIn(nextEmail, nextPassword) {
		setError(null);
		const { data, error: authError } = await authClient.signIn.email({
			email: nextEmail,
			password: nextPassword,
			callbackURL: "/"
		});
		if (authError) {
			setError(authError.message || "Could not sign in. Check the email and password.");
			return;
		}
		if (data?.token && typeof window !== "undefined") try {
			window.sessionStorage.setItem("grok-auth.bearer-token", data.token);
		} catch {}
		try {
			await authClient.getSession();
		} catch {}
		window.location.assign("/");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "logged-out",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "logged-out-card login-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "land-brand",
					"aria-label": "cdxi vantage home",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VantageLockup, {
						stacked: true,
						tagline: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "Secure workspace"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Sign in to vantage" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Use your account, a demo login, or continue with Google or X." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "login-form",
					onSubmit: (event) => {
						event.preventDefault();
						setBusy("email");
						completeEmailSignIn(email.trim(), password).finally(() => setBusy(null));
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "login-email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "login-email",
								name: "email",
								type: "email",
								autoComplete: "username",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "login-password",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "login-password",
								name: "password",
								type: "password",
								autoComplete: "current-password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								required: true
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "login-error",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "button-primary login-submit",
							type: "submit",
							disabled: busy !== null,
							children: busy === "email" ? "Signing in…" : "Sign in"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "login-or",
					children: "or continue with"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "login-oauth",
					children: GROK_PROVIDERS.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "button-ghost",
						disabled: busy !== null,
						onClick: () => {
							setBusy("oauth");
							signIn(provider.providerId, { callbackURL: "/" }).catch((err) => {
								setBusy(null);
								setError(err instanceof Error ? err.message : "Sign-in failed");
							});
						},
						children: ["Continue with ", provider.label]
					}, provider.providerId))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "demo-logins",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: "Demo accounts"
					}), DEMO_LOGINS.map((account) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "demo-chip",
						disabled: busy !== null,
						onClick: () => {
							setEmail(account.email);
							setPassword(account.password);
							setBusy("demo");
							completeEmailSignIn(account.email, account.password).finally(() => setBusy(null));
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: account.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: account.role }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: account.email })
						]
					}, account.email))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["Demo password is ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "VantageDemo1!" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "auth-switch",
					children: ["New to vantage? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/signup",
						children: "Create a workspace"
					})]
				})
			]
		})
	});
}
//#endregion
export { Login as component };
