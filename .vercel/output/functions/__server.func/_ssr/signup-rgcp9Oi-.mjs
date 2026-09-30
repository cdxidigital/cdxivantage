import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, v as Link, x as require_jsx_runtime, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { t as GROK_PROVIDERS } from "./server-C02Wrfly.mjs";
import { a as useCurrentUserState, t as VantageLockup } from "./mark-DlNeCDdE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-rgcp9Oi-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Signup() {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignupForm, {});
}
function SignupForm() {
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(null);
	async function completeSession(token) {
		if (token && typeof window !== "undefined") try {
			window.sessionStorage.setItem("grok-auth.bearer-token", token);
		} catch {}
		try {
			await authClient.getSession();
		} catch {}
		window.location.assign("/");
	}
	async function createAccount() {
		setError(null);
		const nextName = name.trim();
		const nextEmail = email.trim();
		if (nextName.length < 2) {
			setError("Enter the name that should appear on the workspace.");
			return;
		}
		if (password.length < 8) {
			setError("Use at least 8 characters for the password.");
			return;
		}
		if (password !== confirm) {
			setError("Passwords do not match.");
			return;
		}
		const { data, error: authError } = await authClient.signUp.email({
			name: nextName,
			email: nextEmail,
			password,
			callbackURL: "/"
		});
		if (authError) {
			setError(authError.message || "Could not create the workspace. Try a different email.");
			return;
		}
		await completeSession(data?.token);
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
					children: "New workspace"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Create your vantage" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Start an empty operating view for your firm. You can restore the Northline demo later." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "login-form",
					onSubmit: (event) => {
						event.preventDefault();
						setBusy("email");
						createAccount().finally(() => setBusy(null));
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "signup-name",
								children: "Your name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "signup-name",
								name: "name",
								autoComplete: "name",
								value: name,
								onChange: (e) => setName(e.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "signup-email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "signup-email",
								name: "email",
								type: "email",
								autoComplete: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "signup-password",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "signup-password",
								name: "password",
								type: "password",
								autoComplete: "new-password",
								minLength: 8,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "signup-confirm",
								children: "Confirm password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "signup-confirm",
								name: "confirm",
								type: "password",
								autoComplete: "new-password",
								minLength: 8,
								value: confirm,
								onChange: (e) => setConfirm(e.target.value),
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
							children: busy === "email" ? "Creating workspace…" : "Create workspace"
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "auth-switch",
					children: ["Already have a workspace? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						children: "Sign in"
					})]
				})
			]
		})
	});
}
//#endregion
export { Signup as component };
