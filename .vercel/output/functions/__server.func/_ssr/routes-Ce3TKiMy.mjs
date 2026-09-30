import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, v as Link, x as require_jsx_runtime, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-DWjPk7OX.mjs";
import { a as startOfMonth, d as startOfWeek, f as addMonths, i as endOfWeek, l as isSameDay, n as isSameMonth, o as eachDayOfInterval, r as format, s as endOfMonth, t as parseISO, u as compareAsc } from "../_libs/date-fns.mjs";
import { B as statusTone, C as formatDuration, D as inRange, E as headingDate, F as relativeFrom, H as weekDays, I as roundHours, L as stageLabel, N as rangeLabel, O as initials, P as rangeStart, R as stageNote, S as fmtDay, T as gstOf, U as workStatusLabel, V as todayIso, b as downloadCsv, c as LAUNCH_AREAS, d as LINKED_SYSTEMS, g as addDaysIso, h as WORK_STATUS, i as DEAL_STAGES, k as money, l as LEDGERS, m as VAULT_KINDS, n as AI_LEVELS, r as CDXI_PACKAGES, t as AI_AGENTS, u as LIFECYCLE_STAGES, v as buildPassport, w as greeting, x as downloadText, y as dealStageLabel, z as startOfWeekIso } from "./lifecycle-B-aIlvx1.mjs";
import { i as signOut } from "./client-B40BzJxt.mjs";
import { a as hasGateSessionMarker } from "./server-C02Wrfly.mjs";
import { a as useCurrentUserState, i as useCurrentUser, n as VantageMark, r as VantageMarkMono, t as VantageLockup } from "./mark-DlNeCDdE.mjs";
import { A as ChevronLeft, C as FileCheck2, D as Clock3, E as Command, F as Bell, I as ArrowUpRight, L as ArrowDownRight, M as Check, N as CalendarDays, O as CircleHelp, P as BriefcaseBusiness, R as Archive, S as FileText, T as Download, _ as LayoutDashboard, a as Trash2, b as Handshake, c as Sparkles, d as Search, f as Rocket, g as Menu, h as Moon, j as ChevronDown, k as ChevronRight, l as ShieldCheck, m as Play, n as WalletCards, o as Sun, p as Plus, r as UsersRound, s as Square, t as X, u as Settings2, v as Landmark, w as Ellipsis, x as FolderKanban, y as Inbox } from "../_libs/lucide-react.mjs";
import { n as Route$3, r as createSsrRpc } from "./router-DngkPb0k.mjs";
import { i as normalizeWorkspace, n as createSeed, r as emptyWorkspace, t as PORTALS } from "./seed-ChAzxHg7.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Ce3TKiMy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function uid(prefix = "id") {
	return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}
var COLORS = [
	"blue",
	"coral",
	"violet"
];
function colorFor(name) {
	return COLORS[name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length] ?? "blue";
}
function stamp(profile, action, detail) {
	return {
		id: uid("act"),
		name: profile.name,
		action,
		detail,
		time: "Just now",
		initials: profile.initials || initials(profile.name),
		color: colorFor(profile.name),
		at: (/* @__PURE__ */ new Date()).toISOString()
	};
}
function workHoursFromLogs(logs, workId) {
	return logs.filter((t) => t.workId === workId).reduce((n, t) => n + t.hours, 0);
}
function workspacePayload(s) {
	return {
		workspaceName: s.workspaceName,
		profile: s.profile,
		signedIn: true,
		customers: s.customers,
		work: s.work,
		finance: s.finance,
		events: s.events,
		compliance: s.compliance,
		activities: s.activities,
		connectedPortals: s.connectedPortals,
		lastChecked: s.lastChecked,
		noticeVisible: s.noticeVisible,
		team: s.team,
		timeLogs: s.timeLogs,
		snoozedUntil: s.snoozedUntil,
		clearedInbox: s.clearedInbox,
		deals: s.deals,
		insight: s.insight,
		theme: s.theme,
		timer: s.timer,
		lifecycle: s.lifecycle,
		business: s.business,
		ideaCanvas: s.ideaCanvas,
		launchTasks: s.launchTasks,
		vault: s.vault,
		offerings: s.offerings,
		agentBriefs: s.agentBriefs,
		aiPermissions: s.aiPermissions,
		linkedSystems: s.linkedSystems,
		tourDone: s.tourDone,
		accountant: s.accountant,
		ledger: s.ledger
	};
}
var empty = emptyWorkspace();
var signedOutShell = {
	workspaceName: "Workspace",
	profile: {
		name: "You",
		email: "",
		role: "Operator",
		initials: "YO"
	}
};
var useVantage = create()((set, get) => ({
	...empty,
	hydrated: false,
	module: "overview",
	range: "30d",
	setHydrated: () => set({ hydrated: true }),
	resetSession: () => set({
		...emptyWorkspace(signedOutShell),
		hydrated: false,
		module: "overview",
		range: "30d"
	}),
	hydrateFromServer: (data) => set({
		...normalizeWorkspace(data),
		hydrated: true
	}),
	setModule: (module) => set({ module }),
	setRange: (range) => set({ range }),
	dismissNotice: () => set({ noticeVisible: false }),
	setWorkspaceName: (workspaceName) => set({ workspaceName }),
	setProfile: (profile) => {
		const prev = get().profile;
		const next = {
			...profile,
			initials: initials(profile.name)
		};
		set((s) => ({
			profile: next,
			team: s.team.map((member) => member.id === "t_self" || prev.email && member.email === prev.email ? {
				...member,
				name: next.name,
				email: next.email,
				role: next.role
			} : member)
		}));
	},
	setTheme: (theme) => set({ theme }),
	setLifecycle: (lifecycle) => {
		const profile = get().profile;
		set((s) => ({
			lifecycle,
			activities: [stamp(profile, "moved", `Lifecycle → ${lifecycle}`), ...s.activities].slice(0, 40)
		}));
	},
	setBusiness: (business) => set({ business }),
	setIdeaCanvas: (ideaCanvas) => set({ ideaCanvas }),
	addCustomer: (c) => {
		const id = uid("cus");
		const profile = get().profile;
		set((s) => ({
			customers: [{
				...c,
				id,
				followUp: c.followUp || ""
			}, ...s.customers],
			activities: [stamp(profile, "added", `${c.name} as a customer`), ...s.activities].slice(0, 40)
		}));
		return id;
	},
	updateCustomer: (id, patch) => set((s) => ({ customers: s.customers.map((c) => c.id === id ? {
		...c,
		...patch
	} : c) })),
	removeCustomer: (id) => set((s) => ({ customers: s.customers.filter((c) => c.id !== id) })),
	addWork: (w) => {
		const id = uid("wrk");
		const profile = get().profile;
		set((s) => ({
			work: [{
				...w,
				id,
				createdAt: todayIso(),
				hours: w.hours ?? 0,
				checklist: w.checklist ?? []
			}, ...s.work],
			activities: [stamp(profile, "created", w.title), ...s.activities].slice(0, 40)
		}));
		return id;
	},
	updateWork: (id, patch) => set((s) => ({ work: s.work.map((w) => w.id === id ? {
		...w,
		...patch
	} : w) })),
	moveWork: (id, status) => {
		const item = get().work.find((w) => w.id === id);
		const profile = get().profile;
		set((s) => ({
			work: s.work.map((w) => w.id === id ? {
				...w,
				status
			} : w),
			activities: item ? [stamp(profile, "moved", `${item.title} → ${workStatusLabel(status)}`), ...s.activities].slice(0, 40) : s.activities
		}));
	},
	removeWork: (id) => set((s) => ({
		work: s.work.filter((w) => w.id !== id),
		timeLogs: s.timeLogs.filter((t) => t.workId !== id),
		timer: s.timer?.workId === id ? null : s.timer
	})),
	addCheck: (workId, title) => {
		const trimmed = title.trim();
		if (!trimmed) return;
		set((s) => ({ work: s.work.map((w) => w.id === workId ? {
			...w,
			checklist: [...w.checklist ?? [], {
				id: uid("chk"),
				title: trimmed,
				done: false
			}]
		} : w) }));
	},
	toggleCheck: (workId, checkId) => set((s) => ({ work: s.work.map((w) => w.id === workId ? {
		...w,
		checklist: (w.checklist ?? []).map((c) => c.id === checkId ? {
			...c,
			done: !c.done
		} : c)
	} : w) })),
	removeCheck: (workId, checkId) => set((s) => ({ work: s.work.map((w) => w.id === workId ? {
		...w,
		checklist: (w.checklist ?? []).filter((c) => c.id !== checkId)
	} : w) })),
	addFinance: (f) => {
		const id = uid("fin");
		const profile = get().profile;
		const amount = Number.isFinite(f.amount) ? Math.max(0, f.amount) : 0;
		set((s) => ({
			finance: [{
				...f,
				id,
				amount,
				gst: f.gst ?? (f.type === "payment" ? 0 : gstOf(amount))
			}, ...s.finance],
			activities: [stamp(profile, "logged", f.title), ...s.activities].slice(0, 40)
		}));
		return id;
	},
	updateFinance: (id, patch) => set((s) => ({ finance: s.finance.map((f) => f.id === id ? {
		...f,
		...patch
	} : f) })),
	removeFinance: (id) => set((s) => ({ finance: s.finance.filter((f) => f.id !== id) })),
	addEvent: (e) => {
		const id = uid("evt");
		const profile = get().profile;
		set((s) => ({
			events: [{
				...e,
				id
			}, ...s.events],
			activities: [stamp(profile, "scheduled", e.title), ...s.activities].slice(0, 40)
		}));
		return id;
	},
	updateEvent: (id, patch) => set((s) => ({ events: s.events.map((e) => e.id === id ? {
		...e,
		...patch
	} : e) })),
	removeEvent: (id) => set((s) => ({ events: s.events.filter((e) => e.id !== id) })),
	addCompliance: (c) => {
		const id = uid("cmp");
		const profile = get().profile;
		set((s) => ({
			compliance: [{
				...c,
				id
			}, ...s.compliance],
			activities: [stamp(profile, "tracked", c.title), ...s.activities].slice(0, 40)
		}));
		return id;
	},
	markReviewed: (id) => {
		const item = get().compliance.find((c) => c.id === id);
		const profile = get().profile;
		set((s) => ({
			compliance: s.compliance.map((c) => c.id === id ? {
				...c,
				status: "Up to date",
				evidence: true
			} : c),
			activities: item ? [stamp(profile, "reviewed", item.title), ...s.activities].slice(0, 40) : s.activities
		}));
	},
	updateCompliance: (id, patch) => set((s) => ({ compliance: s.compliance.map((c) => c.id === id ? {
		...c,
		...patch
	} : c) })),
	removeCompliance: (id) => set((s) => ({ compliance: s.compliance.filter((c) => c.id !== id) })),
	connectPortal: (id) => set((s) => ({
		connectedPortals: s.connectedPortals.includes(id) ? s.connectedPortals : [...s.connectedPortals, id],
		lastChecked: {
			...s.lastChecked,
			[id]: "Just now"
		}
	})),
	disconnectPortal: (id) => set((s) => ({
		connectedPortals: s.connectedPortals.filter((item) => item !== id),
		lastChecked: Object.fromEntries(Object.entries(s.lastChecked).filter(([key]) => key !== id))
	})),
	setAccountant: (accountant) => {
		const profile = get().profile;
		const label = accountant.engagement === "bas" ? "BAS" : accountant.engagement === "tax" ? "Tax" : accountant.engagement === "advisory" ? "Advisory" : "Full service";
		set((s) => {
			const member = {
				id: "t_accountant",
				name: accountant.name,
				role: "Accountant",
				email: accountant.email,
				status: "contractor",
				certifications: [label],
				startedAt: s.team.find((person) => person.id === "t_accountant")?.startedAt || todayIso()
			};
			return {
				accountant,
				team: s.team.some((person) => person.id === "t_accountant") ? s.team.map((person) => person.id === "t_accountant" ? member : person) : [...s.team, member],
				activities: [stamp(profile, "added", `${accountant.name} · accountant`), ...s.activities].slice(0, 40)
			};
		});
	},
	clearAccountant: () => set((s) => ({
		accountant: null,
		team: s.team.filter((person) => person.id !== "t_accountant")
	})),
	setLedger: (id) => {
		const profile = get().profile;
		const name = id ? LEDGERS.find((item) => item.id === id)?.name ?? "Ledger" : "Accounting ledger";
		set((s) => ({
			ledger: id,
			launchTasks: s.launchTasks.map((task) => task.id === "ln_xero" ? {
				...task,
				done: Boolean(id),
				title: id ? `${name} connected as system of record` : "Accounting ledger connected",
				notes: id ? `Sign-in stays on ${name}. Vantage does not store that password.` : "Choose a ledger in Finance."
			} : task),
			activities: [stamp(profile, id ? "linked" : "unlinked", name), ...s.activities].slice(0, 40)
		}));
	},
	restoreDemo: () => {
		const next = createSeed();
		const { profile, workspaceName, module, range, theme } = get();
		set({
			...next,
			profile,
			workspaceName,
			team: next.team,
			hydrated: true,
			module,
			range,
			theme
		});
	},
	clearWorkspace: () => {
		const { workspaceName, profile, module, range, theme, tourDone } = get();
		set({
			...emptyWorkspace({
				workspaceName,
				profile
			}),
			hydrated: true,
			module,
			range,
			theme,
			tourDone
		});
	},
	logTime: (workId, hours, note, date) => {
		if (!Number.isFinite(hours) || hours <= 0) return;
		const item = get().work.find((w) => w.id === workId);
		const profile = get().profile;
		const logged = roundHours(hours);
		set((s) => ({
			timeLogs: [{
				id: uid("tl"),
				workId,
				hours: logged,
				note,
				date: date || todayIso(),
				person: profile.name
			}, ...s.timeLogs],
			work: s.work.map((w) => w.id === workId ? {
				...w,
				hours: (w.hours || 0) + logged
			} : w),
			activities: item ? [stamp(profile, "logged", `${logged}h on ${item.title}`), ...s.activities].slice(0, 40) : s.activities
		}));
	},
	setTimeForDay: (workId, date, hours) => {
		if (!Number.isFinite(hours)) return;
		const profile = get().profile;
		const logged = Math.max(0, roundHours(hours));
		set((s) => {
			const others = s.timeLogs.filter((t) => !(t.workId === workId && t.date === date && t.person === profile.name));
			const timeLogs = logged > 0 ? [{
				id: uid("tl"),
				workId,
				hours: logged,
				note: "Timesheet",
				date,
				person: profile.name
			}, ...others] : others;
			return {
				timeLogs,
				work: s.work.map((w) => w.id === workId ? {
					...w,
					hours: workHoursFromLogs(timeLogs, workId)
				} : w)
			};
		});
	},
	startTimer: (workId) => {
		const current = get().timer;
		if (current?.workId === workId) return;
		if (current) get().stopTimer();
		set({ timer: {
			workId,
			startedAt: (/* @__PURE__ */ new Date()).toISOString()
		} });
	},
	stopTimer: () => {
		const timer = get().timer;
		if (!timer) return null;
		const item = get().work.find((w) => w.id === timer.workId);
		const ms = Date.now() - new Date(timer.startedAt).getTime();
		const hours = roundHours(ms / 36e5);
		set({ timer: null });
		if (hours >= .25) get().logTime(timer.workId, hours, "Timer");
		return {
			hours,
			title: item?.title ?? "Work"
		};
	},
	snoozeInbox: (id, days) => set((s) => ({ snoozedUntil: {
		...s.snoozedUntil,
		[id]: addDaysIso(todayIso(), days)
	} })),
	clearInboxItem: (id) => set((s) => ({ clearedInbox: s.clearedInbox.includes(id) ? s.clearedInbox : [...s.clearedInbox, id] })),
	addTeamMember: (member) => set((s) => ({ team: [...s.team, {
		...member,
		id: uid("tm"),
		status: member.status ?? "active",
		certifications: member.certifications ?? [],
		startedAt: member.startedAt || todayIso()
	}] })),
	updateTeamMember: (id, patch) => set((s) => ({ team: s.team.map((m) => m.id === id ? {
		...m,
		...patch
	} : m) })),
	removeTeamMember: (id) => set((s) => ({
		team: s.team.filter((m) => m.id !== id),
		accountant: id === "t_accountant" ? null : s.accountant
	})),
	addDeal: (d) => {
		const id = uid("deal");
		const profile = get().profile;
		set((s) => ({
			deals: [{
				...d,
				id
			}, ...s.deals],
			activities: [stamp(profile, "opened", d.title), ...s.activities].slice(0, 40)
		}));
		return id;
	},
	updateDeal: (id, patch) => set((s) => ({ deals: s.deals.map((d) => d.id === id ? {
		...d,
		...patch
	} : d) })),
	moveDeal: (id, stage) => {
		const item = get().deals.find((d) => d.id === id);
		const profile = get().profile;
		set((s) => ({
			deals: s.deals.map((d) => d.id === id ? {
				...d,
				stage
			} : d),
			activities: item ? [stamp(profile, "moved", `${item.title} → ${dealStageLabel(stage)}`), ...s.activities].slice(0, 40) : s.activities
		}));
	},
	removeDeal: (id) => set((s) => ({ deals: s.deals.filter((d) => d.id !== id) })),
	setInsight: (insight) => set({ insight }),
	addLaunch: (t) => {
		const id = uid("ln");
		const profile = get().profile;
		set((s) => ({
			launchTasks: [{
				...t,
				id
			}, ...s.launchTasks],
			activities: [stamp(profile, "tracked", t.title), ...s.activities].slice(0, 40)
		}));
		return id;
	},
	toggleLaunch: (id) => set((s) => ({ launchTasks: s.launchTasks.map((t) => t.id === id ? {
		...t,
		done: !t.done
	} : t) })),
	removeLaunch: (id) => set((s) => ({ launchTasks: s.launchTasks.filter((t) => t.id !== id) })),
	addVault: (d) => {
		const id = uid("doc");
		const profile = get().profile;
		set((s) => ({
			vault: [{
				...d,
				id,
				addedAt: todayIso()
			}, ...s.vault],
			activities: [stamp(profile, "filed", d.title), ...s.activities].slice(0, 40)
		}));
		return id;
	},
	updateVault: (id, patch) => set((s) => ({ vault: s.vault.map((d) => d.id === id ? {
		...d,
		...patch
	} : d) })),
	removeVault: (id) => set((s) => ({ vault: s.vault.filter((d) => d.id !== id) })),
	addOffering: (o) => {
		const id = uid("off");
		set((s) => ({ offerings: [{
			...o,
			id
		}, ...s.offerings] }));
		return id;
	},
	toggleOffering: (id) => set((s) => ({ offerings: s.offerings.map((o) => o.id === id ? {
		...o,
		active: !o.active
	} : o) })),
	setAiPermission: (agent, level) => set((s) => ({ aiPermissions: {
		...s.aiPermissions,
		[agent]: level
	} })),
	setAgentBrief: (agent, brief) => set((s) => ({
		agentBriefs: {
			...s.agentBriefs,
			[agent]: brief
		},
		insight: agent === "ceo" ? brief : s.insight
	})),
	connectSystem: (id) => set((s) => ({ linkedSystems: s.linkedSystems.includes(id) ? s.linkedSystems.filter((item) => item !== id) : [...s.linkedSystems, id] })),
	setTourDone: (done) => set({ tourDone: done })
}));
var loadWorkspace = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("564951651fa510b3147c022a28e74f533b65f7fa50328e142239fffce0581704"));
var saveWorkspace = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("d30b5013780a31ee8419df0467d118b32add030f9f743759d2ab2c7e81bc3e85"));
var generateInsight = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("8aa366f4cbf75c7bfa00897b2d8ef1084cc084695ace61de1b7a87bacc2fced9"));
function openWork(data) {
	return data.work.filter((w) => w.status !== "done");
}
function workByStatus(data) {
	const counts = {
		"on-hold": 0,
		scheduled: 0,
		"in-progress": 0,
		"needs-review": 0,
		done: 0
	};
	for (const w of data.work) counts[w.status] += 1;
	return counts;
}
function paidRevenue(records, range, now = /* @__PURE__ */ new Date()) {
	return records.filter((f) => f.type === "invoice" && f.status === "paid" && inRange(f.date, range, now)).reduce((sum, f) => sum + f.amount, 0);
}
function previousRevenue(records, range, now = /* @__PURE__ */ new Date()) {
	const start = rangeStart(range, now);
	const span = now.getTime() - start.getTime();
	const prevEnd = /* @__PURE__ */ new Date(start.getTime() - 1);
	const prevStart = new Date(prevEnd.getTime() - span);
	return records.filter((f) => {
		if (f.type !== "invoice" || f.status !== "paid") return false;
		const d = parseISO(f.date);
		return d >= prevStart && d <= prevEnd;
	}).reduce((sum, f) => sum + f.amount, 0);
}
function outstandingTotal(records) {
	return records.filter((f) => f.type === "invoice" && (f.status === "outstanding" || f.status === "overdue")).reduce((sum, f) => sum + f.amount, 0);
}
function hoursLogged(data, range, now = /* @__PURE__ */ new Date()) {
	return data.timeLogs.filter((t) => inRange(t.date, range, now)).reduce((sum, t) => sum + t.hours, 0);
}
function activeCustomers(data) {
	return data.customers.filter((c) => c.status === "active");
}
function revenueSeries(records, range, now = /* @__PURE__ */ new Date()) {
	const start = rangeStart(range, now);
	const bucketDays = Math.max(1, Math.round((now.getTime() - start.getTime()) / 864e5) + 1) > 20 ? 7 : 1;
	const buckets = [];
	const cursor = new Date(start);
	while (cursor <= now) {
		const key = cursor.toISOString().slice(0, 10);
		const end = new Date(cursor);
		end.setDate(end.getDate() + bucketDays);
		const value = records.filter((f) => {
			if (f.type !== "invoice" || f.status !== "paid") return false;
			const d = parseISO(f.date);
			return d >= cursor && d < end && d <= now;
		}).reduce((sum, f) => sum + f.amount, 0);
		const label = cursor.toLocaleDateString("en-AU", {
			day: "numeric",
			month: "short"
		});
		buckets.push({
			key,
			label,
			value
		});
		cursor.setDate(cursor.getDate() + bucketDays);
	}
	let running = 0;
	return buckets.map((b) => {
		running += b.value;
		return {
			...b,
			cumulative: running
		};
	});
}
function upcomingWork(data, limit = 4) {
	const today = todayIso();
	return [...data.work].filter((w) => w.status !== "done" && w.due >= today).sort((a, b) => compareAsc(parseISO(a.due), parseISO(b.due))).slice(0, limit);
}
function nextDeadline(data) {
	const open = data.compliance.filter((c) => c.status !== "Up to date");
	if (open.length === 0) return null;
	return [...open].sort((a, b) => a.due.localeCompare(b.due))[0] ?? null;
}
function complianceScore(data) {
	if (data.compliance.length === 0) return 0;
	const ready = data.compliance.filter((c) => c.status === "Up to date").length;
	return Math.round(ready / data.compliance.length * 100);
}
function attentionCount(data) {
	return inboxItems(data).length;
}
function notifications(data) {
	return inboxItems(data).slice(0, 6).map((item) => ({
		id: item.id,
		title: item.title,
		detail: item.detail,
		module: item.module
	}));
}
function customerName(data, id) {
	if (!id) return "";
	return data.customers.find((c) => c.id === id)?.name ?? "";
}
function openDeals(data) {
	return data.deals.filter((d) => d.stage !== "won" && d.stage !== "lost");
}
function pipelineValue(data) {
	return openDeals(data).reduce((sum, d) => sum + d.value, 0);
}
function wonValue(data, range, now = /* @__PURE__ */ new Date()) {
	return data.deals.filter((d) => d.stage === "won" && inRange(d.closeDate, range, now)).reduce((sum, d) => sum + d.value, 0);
}
function hoursThisWeek(data, now = /* @__PURE__ */ new Date()) {
	const days = new Set(weekDays(startOfWeekIso(now)));
	return data.timeLogs.filter((t) => days.has(t.date)).reduce((sum, t) => sum + t.hours, 0);
}
function hoursByPerson(data, range, now = /* @__PURE__ */ new Date()) {
	const map = /* @__PURE__ */ new Map();
	for (const t of data.timeLogs) {
		if (!inRange(t.date, range, now)) continue;
		map.set(t.person, (map.get(t.person) ?? 0) + t.hours);
	}
	return [...map.entries()].map(([name, hours]) => ({
		name,
		hours
	})).sort((a, b) => b.hours - a.hours);
}
function hoursForDay(data, workId, date, person) {
	return data.timeLogs.filter((t) => t.workId === workId && t.date === date && (!person || t.person === person)).reduce((sum, t) => sum + t.hours, 0);
}
function openLaunch(data) {
	return data.launchTasks.filter((t) => !t.done);
}
function launchProgress(data) {
	if (data.launchTasks.length === 0) return 0;
	const done = data.launchTasks.filter((t) => t.done).length;
	return Math.round(done / data.launchTasks.length * 100);
}
function vaultDueSoon(data, now = /* @__PURE__ */ new Date()) {
	const today = todayIso(now);
	const horizon = addDaysIso(today, 45);
	return data.vault.filter((d) => d.renewsOn && d.renewsOn <= horizon);
}
function visible(data, id) {
	if (data.clearedInbox.includes(id)) return false;
	const until = data.snoozedUntil[id];
	if (until && until > todayIso()) return false;
	return true;
}
function inboxItems(data, now = /* @__PURE__ */ new Date()) {
	const today = todayIso(now);
	const items = [];
	for (const f of data.finance.filter((x) => x.type === "invoice" && (x.status === "overdue" || x.status === "outstanding"))) {
		if (!visible(data, f.id)) continue;
		items.push({
			id: f.id,
			kind: "finance",
			title: f.title,
			detail: `${f.status === "overdue" ? "Overdue invoice" : "Outstanding invoice"} · collect`,
			tone: f.status === "overdue" ? "urgent" : "soon",
			module: "finance",
			due: f.date,
			action: "Mark paid"
		});
	}
	for (const w of data.work.filter((x) => x.status !== "done" && (x.priority === "high" || x.due <= today))) {
		if (!visible(data, w.id)) continue;
		items.push({
			id: w.id,
			kind: "work",
			title: w.title,
			detail: w.due < today ? `Overdue · ${w.owner}` : `Due ${w.due} · ${w.owner}`,
			tone: w.due < today || w.priority === "high" ? "urgent" : "soon",
			module: "work",
			due: w.due,
			action: "Mark done"
		});
	}
	for (const c of data.compliance.filter((x) => x.status !== "Up to date")) {
		if (!visible(data, c.id)) continue;
		items.push({
			id: c.id,
			kind: "compliance",
			title: c.title,
			detail: `${c.status} · ${c.authority}`,
			tone: c.status === "Urgent" ? "urgent" : "soon",
			module: "compliance",
			due: c.due,
			action: "Mark reviewed"
		});
	}
	for (const c of data.customers.filter((x) => x.followUp && x.followUp <= today)) {
		if (!visible(data, `fu-${c.id}`)) continue;
		items.push({
			id: `fu-${c.id}`,
			kind: "followup",
			title: `Follow up ${c.name}`,
			detail: `${c.contact || c.email || "No contact"} · due ${c.followUp}`,
			tone: c.followUp < today ? "urgent" : "soon",
			module: "customers",
			due: c.followUp,
			action: "Snooze 7 days"
		});
	}
	for (const e of data.events.filter((x) => x.date === today)) {
		if (!visible(data, e.id)) continue;
		items.push({
			id: e.id,
			kind: "event",
			title: e.title,
			detail: `Today at ${e.time} · ${e.location}`,
			tone: "neutral",
			module: "calendar",
			due: e.date,
			action: "Clear"
		});
	}
	for (const d of data.deals.filter((x) => x.stage !== "won" && x.stage !== "lost" && x.closeDate <= today)) {
		if (!visible(data, d.id)) continue;
		items.push({
			id: d.id,
			kind: "deal",
			title: d.title,
			detail: `Close date ${d.closeDate} · ${d.owner}`,
			tone: d.closeDate < today ? "urgent" : "soon",
			module: "pipeline",
			due: d.closeDate,
			action: "Mark won"
		});
	}
	for (const t of data.launchTasks.filter((x) => !x.done && x.due && x.due <= addDaysIso(today, 14))) {
		if (!visible(data, t.id)) continue;
		items.push({
			id: t.id,
			kind: "launch",
			title: t.title,
			detail: `Setup · ${t.area} · due ${t.due}`,
			tone: t.due < today ? "urgent" : "soon",
			module: "launch",
			due: t.due,
			action: "Mark done"
		});
	}
	for (const d of data.vault.filter((x) => x.renewsOn && x.renewsOn <= addDaysIso(today, 45))) {
		if (!visible(data, d.id)) continue;
		items.push({
			id: d.id,
			kind: "vault",
			title: d.title,
			detail: `Renews ${d.renewsOn} · ${d.counterparty || d.kind}`,
			tone: d.renewsOn <= today ? "urgent" : "soon",
			module: "vault",
			due: d.renewsOn,
			action: "Snooze 14 days"
		});
	}
	const rank = {
		urgent: 0,
		soon: 1,
		neutral: 2
	};
	return items.sort((a, b) => rank[a.tone] - rank[b.tone] || a.due.localeCompare(b.due));
}
function weeklyBriefing(data, now = /* @__PURE__ */ new Date()) {
	const today = todayIso(now);
	const weekEnd = new Date(now);
	weekEnd.setDate(weekEnd.getDate() + 7);
	const end = todayIso(weekEnd);
	const dueWork = data.work.filter((w) => w.status !== "done" && w.due >= today && w.due < end).length;
	const collect = outstandingTotal(data.finance);
	const overdue = data.finance.filter((f) => f.status === "overdue").length;
	const compliance = data.compliance.filter((c) => c.status !== "Up to date").length;
	const hours = hoursThisWeek(data, now);
	const events = data.events.filter((e) => e.date >= today && e.date < end).length;
	const pipeline = pipelineValue(data);
	const setup = openLaunch(data).length;
	const lines = [];
	if (collect > 0) lines.push(`${money(collect)} sitting in unpaid invoices${overdue ? ` (${overdue} overdue)` : ""}.`);
	if (pipeline > 0) lines.push(`${money(pipeline)} in open pipeline.`);
	if (dueWork) lines.push(`${dueWork} work item${dueWork === 1 ? "" : "s"} due in the next seven days.`);
	if (compliance) lines.push(`${compliance} compliance item${compliance === 1 ? "" : "s"} still need a review.`);
	if (setup) lines.push(`${setup} setup item${setup === 1 ? "" : "s"} still open in Launch.`);
	if (events) lines.push(`${events} calendar event${events === 1 ? "" : "s"} this week.`);
	if (hours) lines.push(`${hours} hours logged this week.`);
	if (lines.length === 0) lines.push("Nothing urgent. Use the week to move work forward.");
	return {
		lines,
		dueWork,
		collect,
		overdue,
		compliance,
		hours,
		events,
		pipeline,
		setup
	};
}
function insightSnapshot(data) {
	const brief = weeklyBriefing(data);
	return {
		workspace: data.workspaceName,
		operator: data.profile.name,
		unpaid: brief.collect,
		overdueInvoices: data.finance.filter((f) => f.status === "overdue").map((f) => ({
			title: f.title,
			amount: f.amount
		})),
		openWork: openWork(data).map((w) => ({
			title: w.title,
			status: w.status,
			due: w.due,
			owner: w.owner,
			priority: w.priority
		})),
		pipeline: openDeals(data).map((d) => ({
			title: d.title,
			stage: d.stage,
			value: d.value,
			closeDate: d.closeDate,
			owner: d.owner
		})),
		compliance: data.compliance.filter((c) => c.status !== "Up to date").map((c) => ({
			title: c.title,
			status: c.status,
			due: c.due
		})),
		followUps: data.customers.filter((c) => c.followUp).map((c) => ({
			name: c.name,
			followUp: c.followUp
		})),
		hoursThisWeek: brief.hours,
		eventsThisWeek: brief.events,
		lifecycle: data.lifecycle,
		business: {
			legalName: data.business.legalName,
			abn: data.business.abn,
			stage: data.lifecycle
		},
		launchOpen: openLaunch(data).map((t) => ({
			title: t.title,
			due: t.due,
			area: t.area
		})),
		vaultRenewals: vaultDueSoon(data).map((d) => ({
			title: d.title,
			renewsOn: d.renewsOn
		})),
		people: data.team.map((p) => ({
			name: p.name,
			role: p.role,
			status: p.status
		}))
	};
}
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
function MetricCard({ label, value, change, note, trend, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "metric-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "metric-top",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "metric-icon",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 16 })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
				className: "metric-value",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `metric-change ${trend === "down" ? "negative" : "positive"}`,
				children: [
					trend === "down" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 14 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: change }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: note })
				]
			})
		]
	});
}
function Sparkline({ series }) {
	const width = 462;
	const height = 150;
	const max = Math.max(1, ...series.map((s) => s.cumulative));
	const ticks = [
		max,
		max * .66,
		max * .33,
		0
	];
	const points = series.map((s, i) => {
		return [series.length <= 1 ? 0 : i / (series.length - 1) * width, 142 - s.cumulative / max * 134];
	});
	const pointStr = points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
	const last = points[points.length - 1];
	const first = points[0];
	const area = first ? `M${first[0].toFixed(1)},${first[1].toFixed(1)} ${points.slice(1).map(([x, y]) => `L${x.toFixed(1)},${y.toFixed(1)}`).join(" ")} L${width},${height} L0,${height} Z` : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "chart-wrap",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "y-axis",
			children: ticks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t >= 1e3 ? `$${Math.round(t / 1e3)}k` : `$${Math.round(t)}` }, t))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			className: "chart",
			viewBox: `0 0 ${width} ${height}`,
			preserveAspectRatio: "none",
			role: "img",
			"aria-label": "Revenue over the selected period",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "area",
					x1: "0",
					x2: "0",
					y1: "0",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0",
						stopColor: "#7f00ff",
						stopOpacity: "0.22"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "1",
						stopColor: "#00ffff",
						stopOpacity: "0"
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: area,
					fill: "url(#area)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
					points: pointStr,
					fill: "none",
					stroke: "#7f00ff",
					strokeWidth: "3",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				}),
				last && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: last[0],
					cy: last[1],
					r: "4",
					fill: "#7f00ff"
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "x-axis",
		children: series.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.label }, s.key))
	})] });
}
function LifecycleRail() {
	const lifecycle = useVantage((s) => s.lifecycle);
	const setLifecycle = useVantage((s) => s.setLifecycle);
	const setModule = useVantage((s) => s.setModule);
	const data = useVantage();
	const setup = launchProgress(data);
	const open = openLaunch(data).length;
	const renewals = vaultDueSoon(data).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "command-banner",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "panel-kicker",
				children: "Command centre"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
				data.business.tradingName || data.workspaceName,
				" is in ",
				LIFECYCLE_STAGES.find((s) => s.id === lifecycle)?.label,
				"."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: stageNote(lifecycle) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "heading-actions",
				style: { marginTop: 12 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "button-ghost",
					onClick: () => setModule("launch"),
					children: ["Launch ", open ? `· ${open} open` : `· ${setup}%`]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "button-ghost",
					onClick: () => setModule("vault"),
					children: ["Vault ", renewals ? `· ${renewals} due` : ""]
				})]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "life-rail compact",
			role: "list",
			children: LIFECYCLE_STAGES.map((stage) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				role: "listitem",
				className: `life-step ${lifecycle === stage.id ? "active" : ""}`,
				onClick: () => {
					setLifecycle(stage.id);
					toast.success(`Stage set to ${stage.label}`);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: stage.label })
			}, stage.id))
		})]
	});
}
function InsightPanel() {
	const insight = useVantage((s) => s.insight);
	const agentBriefs = useVantage((s) => s.agentBriefs);
	const aiPermissions = useVantage((s) => s.aiPermissions);
	const setInsight = useVantage((s) => s.setInsight);
	const setAgentBrief = useVantage((s) => s.setAgentBrief);
	const data = useVantage();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [agent, setAgent] = (0, import_react.useState)("ceo");
	const current = agent === "ceo" ? agentBriefs.ceo ?? insight : agentBriefs[agent] ?? null;
	const meta = AI_AGENTS.find((a) => a.id === agent);
	const run = async () => {
		setBusy(true);
		try {
			const result = await generateInsight({ data: {
				snapshot: insightSnapshot(data),
				agent,
				level: aiPermissions[agent]
			} });
			if (result.ok) {
				setAgentBrief(agent, result.brief);
				if (agent === "ceo") setInsight(result.brief);
				toast.success(`${meta?.title ?? "Brief"} ready`);
			} else toast.error(result.error);
		} catch {
			toast.error("Could not generate a briefing.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel insight-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "panel-kicker",
					children: "Operating layer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: current?.headline ?? meta?.title ?? "Ask Grok" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "button-ghost",
					onClick: () => void run(),
					disabled: busy,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 15 }), busy ? "Writing…" : current ? "Refresh" : "Generate"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "agent-tabs",
				role: "tablist",
				"aria-label": "Vantage agents",
				children: AI_AGENTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					role: "tab",
					"aria-selected": agent === item.id,
					className: agent === item.id ? "chip active" : "chip",
					onClick: () => setAgent(item.id),
					children: item.title.replace("Vantage ", "")
				}, item.id))
			}),
			current ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "insight-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: "Priorities"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: (current.priorities ?? []).map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line)) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: "Watch"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: (current.risks ?? []).map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line)) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "panel-kicker",
							children: "Next move"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: current.nextMove }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							relativeFrom(current.at),
							" · ",
							aiPermissions[agent]
						] })
					] })
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "heading-note",
				children: [meta?.brief, " Runs only when you ask. Capability is set in Settings."]
			})
		]
	});
}
function MarketplaceStrip() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel market-strip",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel-header",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "panel-kicker",
					children: "cdxi · implementation"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "When software is not enough" })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "heading-note",
				children: "Vantage is the operating system. cdxi is the service arm for sites, integrations, and growth systems."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "market-grid",
				children: CDXI_PACKAGES.map((pack) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: pack.name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: pack.price }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pack.note })
				] }, pack.id))
			})
		]
	});
}
function Overview({ onCreate }) {
	const data = useVantage();
	const range = data.range;
	const now = /* @__PURE__ */ new Date();
	const revenue = paidRevenue(data.finance, range, now);
	const prev = previousRevenue(data.finance, range, now);
	const delta = prev === 0 ? revenue > 0 ? 100 : 0 : Math.round((revenue - prev) / prev * 100);
	const customers = activeCustomers(data).length;
	const open = openWork(data).length;
	const outstanding = outstandingTotal(data.finance);
	const series = revenueSeries(data.finance, range, now);
	const counts = workByStatus(data);
	const pipelineOpen = open;
	const upcoming = upcomingWork(data, 4);
	const bare = data.customers.length + data.work.length + data.finance.length + data.deals.length + data.launchTasks.length + data.vault.length + data.compliance.length + data.events.length === 0;
	const pipeline = pipelineValue(data);
	const pct = (n) => pipelineOpen ? Math.round(n / pipelineOpen * 100) : 0;
	const rows = [
		{
			color: "blue",
			label: "In progress",
			count: counts["in-progress"],
			key: "in-progress"
		},
		{
			color: "orange",
			label: "Needs review",
			count: counts["needs-review"],
			key: "needs-review"
		},
		{
			color: "purple",
			label: "Scheduled",
			count: counts.scheduled,
			key: "scheduled"
		},
		{
			color: "gray",
			label: "On hold",
			count: counts["on-hold"],
			key: "on-hold"
		}
	];
	const go = (id) => data.setModule(id);
	if (bare) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifecycleRail, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "fresh-overview panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "empty-icon",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 20 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "panel-kicker",
				children: "Your workspace is ready"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Start with the business, not another tool." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Capture the idea, run setup autopilot, or restore the Northline Advisory sample to see a firm already in Grow." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "heading-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "button-primary",
					onClick: onCreate,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 17 }), " Create your first record"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "button-ghost",
					onClick: () => go("launch"),
					children: "Open Launch"
				})]
			})
		]
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifecycleRail, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "metric-grid",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					label: "Revenue",
					value: money(revenue),
					change: prev ? `${delta > 0 ? "+" : ""}${delta}%` : "This period",
					note: prev ? `from ${money(prev)}` : "No prior period",
					trend: delta < 0 ? "down" : "up",
					icon: WalletCards
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					label: "Active customers",
					value: String(customers),
					change: `${data.customers.length} total`,
					note: "In the workspace",
					trend: "up",
					icon: UsersRound
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					label: "Open work",
					value: String(open),
					change: `${counts.done} done`,
					note: "Across delivery",
					trend: open > 8 ? "down" : "up",
					icon: BriefcaseBusiness
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					label: "Pipeline",
					value: money(pipeline),
					change: `${data.deals.filter((d) => d.stage !== "won" && d.stage !== "lost").length} open`,
					note: outstanding ? `${money(outstanding)} unpaid` : "No unpaid invoices",
					trend: pipeline > 0 ? "up" : "flat",
					icon: WalletCards
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsightPanel, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "dashboard-grid",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel chart-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "panel-kicker",
							children: "Performance"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Revenue overview" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "more-button",
							"aria-label": "Open finance",
							onClick: () => go("finance"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { size: 19 })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "chart-summary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: money(revenue) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: delta < 0 ? "negative" : "positive",
								children: [
									delta < 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 14 }),
									" ",
									Math.abs(delta),
									"%"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: prev ? `from ${money(prev)}` : "this period" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, { series })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel pipeline-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "panel-kicker",
							children: "Work pipeline"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Current status" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "more-button",
							"aria-label": "Open work",
							onClick: () => go("work"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { size: 19 })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pipeline-total",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: pipelineOpen }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "open work items" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pipeline-bar",
						children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `bar-${r.color}`,
							style: { width: `${pct(r.count)}%` }
						}, r.key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pipeline-list",
						children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pipeline-row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: `status-dot ${r.color}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.label }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: r.count }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [pct(r.count), "%"] })
							]
						}, r.key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "text-button",
						onClick: () => go("work"),
						children: ["View all work ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 14 })]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lower-grid",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel upcoming-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: "Next up"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Upcoming work" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "text-button",
						onClick: () => go("calendar"),
						children: ["See calendar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 14 })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "work-list",
					children: [upcoming.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "heading-note",
						children: "Nothing scheduled. Create work to fill the week."
					}), upcoming.map((item, i) => {
						const tone = i % 3 === 1 ? "orange" : i % 3 === 2 ? "purple" : "blue";
						const day = fmtDay(item.due, "d");
						const month = fmtDay(item.due, "MMM").toUpperCase();
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "work-row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `date-block ${tone}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: day }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: month })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "work-copy",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.team })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "row-action",
									"aria-label": `Open ${item.title}`,
									onClick: () => go("work"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 16 })
								})
							]
						}, item.id);
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel activity-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: "Team pulse"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Recent activity" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "more-button",
						"aria-label": "More activity",
						onClick: () => go("work"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { size: 19 })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "activity-list",
					children: [data.activities.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "heading-note",
						children: "Activity will land here as the team works."
					}), data.activities.slice(0, 5).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "activity-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `avatar avatar-${item.color}`,
								children: item.initials
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.name }),
								" ",
								item.action
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.detail })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: relativeFrom(item.at) })
						]
					}, item.id))]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketplaceStrip, {})
	] });
}
var ICONS = {
	work: FolderKanban,
	finance: WalletCards,
	compliance: FileCheck2,
	followup: UsersRound,
	event: CalendarDays,
	deal: Handshake,
	launch: Rocket,
	vault: Archive
};
function InboxView() {
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
	const act = (item) => {
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
		} else clearInboxItem(item.id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "briefing-banner",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "panel-kicker",
				children: "This week"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: items.length === 0 ? "Inbox is clear." : `${items.length} items need a decision.` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: brief.lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line)) })
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "briefing-stats",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: money(outstandingTotal(data.finance)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "To collect" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: money(brief.pipeline) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pipeline" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [brief.hours, "h"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hours this week" })] })
			]
		})]
	}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "module-placeholder panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "panel-kicker",
				children: "Inbox"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "You are clear for now" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Overdue invoices, high-priority work, deals, compliance, and follow-ups land here." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "button-ghost",
				onClick: () => setModule("overview"),
				children: "Back to overview"
			})
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel inbox-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "panel-header",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "panel-kicker",
				children: "Action list"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Decide, then move on" })] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "inbox-list",
			children: items.map((item) => {
				const Icon = ICONS[item.kind];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: `inbox-row tone-${item.tone}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `inbox-icon tone-${item.tone}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 16 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inbox-copy",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.detail })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: fmtDay(item.due, "d MMM") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inbox-actions",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "button-ghost",
									onClick: () => setModule(item.module),
									children: "Open"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "button-ghost",
									onClick: () => {
										snoozeInbox(item.id, 1);
										toast.success("Snoozed until tomorrow");
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 14 }), " Snooze"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "button-primary",
									onClick: () => act(item),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }),
										" ",
										item.action
									]
								})
							]
						})
					]
				}, item.id);
			})
		})]
	})] });
}
var COLS = [
	"on-hold",
	"scheduled",
	"in-progress",
	"needs-review"
];
function WorkBoard({ onCreate }) {
	const work = useVantage((s) => s.work);
	const customers = useVantage((s) => s.customers);
	const moveWork = useVantage((s) => s.moveWork);
	const updateWork = useVantage((s) => s.updateWork);
	const removeWork = useVantage((s) => s.removeWork);
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [q, setQ] = (0, import_react.useState)("");
	const [showDone, setShowDone] = (0, import_react.useState)(false);
	const [over, setOver] = (0, import_react.useState)(null);
	const filtered = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return work.filter((w) => {
			if (!showDone && w.status === "done") return false;
			if (!query) return true;
			return w.title.toLowerCase().includes(query) || w.owner.toLowerCase().includes(query) || w.team.toLowerCase().includes(query);
		});
	}, [
		work,
		q,
		showDone
	]);
	const selected = work.find((w) => w.id === selectedId) ?? null;
	const columns = showDone ? [...COLS, "done"] : COLS;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "toolbar",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "search",
					placeholder: "Filter work",
					value: q,
					onChange: (e) => setQ(e.target.value),
					"aria-label": "Filter work"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "button-ghost",
					onClick: () => setShowDone((v) => !v),
					children: showDone ? "Hide done" : "Show done"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "grow" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "button-primary",
					onClick: onCreate,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), " New work"]
				})
			]
		}),
		filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "module-placeholder panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "panel-kicker",
					children: "Work"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "No work in this view" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Create a work item or clear the filter to see the pipeline." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "button-primary",
					onClick: onCreate,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), " Create work"]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "kanban",
			children: columns.map((status) => {
				const items = filtered.filter((w) => w.status === status);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: `kanban-col ${over === status ? "drop-over" : ""}`,
					onDragOver: (e) => {
						e.preventDefault();
						setOver(status);
					},
					onDragLeave: () => setOver((cur) => cur === status ? null : cur),
					onDrop: (e) => {
						e.preventDefault();
						setOver(null);
						const id = e.dataTransfer.getData("text/work-id");
						if (id) {
							moveWork(id, status);
							toast.success(`Moved to ${workStatusLabel(status)}`);
						}
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: workStatusLabel(status) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: items.length })] }), items.map((item) => {
						const checks = item.checklist ?? [];
						const done = checks.filter((c) => c.done).length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "kanban-card",
							draggable: true,
							onDragStart: (e) => {
								e.dataTransfer.setData("text/work-id", item.id);
								e.dataTransfer.effectAllowed = "move";
							},
							onClick: () => setSelectedId(item.id),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									item.owner,
									" · ",
									fmtDay(item.due)
								] }),
								checks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									done,
									"/",
									checks.length,
									" checks · ",
									item.hours || 0,
									"h"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: `prio ${item.priority}`,
									children: item.priority
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: customers.find((c) => c.id === item.customerId)?.name || "Internal" })] })
							]
						}, item.id);
					})]
				}, status);
			})
		}),
		selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkDetail, {
			item: selected,
			onClose: () => setSelectedId(null),
			onSave: (patch) => {
				updateWork(selected.id, patch);
				toast.success("Work updated");
				setSelectedId(null);
			},
			onDelete: () => {
				removeWork(selected.id);
				toast.success("Work removed");
				setSelectedId(null);
			},
			onDone: () => {
				moveWork(selected.id, "done");
				toast.success("Marked done");
				setSelectedId(null);
			}
		})
	] });
}
function WorkDetail({ item, onClose, onSave, onDelete, onDone }) {
	const addCheck = useVantage((s) => s.addCheck);
	const toggleCheck = useVantage((s) => s.toggleCheck);
	const removeCheck = useVantage((s) => s.removeCheck);
	const logTime = useVantage((s) => s.logTime);
	const startTimer = useVantage((s) => s.startTimer);
	const stopTimer = useVantage((s) => s.stopTimer);
	const timer = useVantage((s) => s.timer);
	const timeLogs = useVantage((s) => s.timeLogs);
	const [checkTitle, setCheckTitle] = (0, import_react.useState)("");
	const running = timer?.workId === item.id;
	const checks = item.checklist ?? [];
	const recentLogs = timeLogs.filter((t) => t.workId === item.id).slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "dialog-backdrop",
		onMouseDown: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "create-dialog wide",
			role: "dialog",
			"aria-modal": "true",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dialog-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "panel-kicker",
					children: "Work item"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: item.title })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "icon-button",
					onClick: onClose,
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "form-grid two",
				onSubmit: (e) => {
					e.preventDefault();
					const fd = new FormData(e.currentTarget);
					onSave({
						title: String(fd.get("title")),
						status: String(fd.get("status")),
						priority: String(fd.get("priority")),
						due: String(fd.get("due")),
						owner: String(fd.get("owner")),
						notes: String(fd.get("notes"))
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "ed-title",
							children: "Title"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "ed-title",
							name: "title",
							defaultValue: item.title
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "ed-status",
							children: "Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "ed-status",
							name: "status",
							defaultValue: item.status,
							children: WORK_STATUS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s.id,
								children: s.label
							}, s.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "ed-prio",
							children: "Priority"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "ed-prio",
							name: "priority",
							defaultValue: item.priority,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "high",
									children: "High"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "medium",
									children: "Medium"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "low",
									children: "Low"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "ed-due",
							children: "Due"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "ed-due",
							name: "due",
							type: "date",
							defaultValue: item.due
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "ed-owner",
							children: "Owner"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "ed-owner",
							name: "owner",
							defaultValue: item.owner
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "ed-notes",
							children: "Notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "ed-notes",
							name: "notes",
							defaultValue: item.notes,
							rows: 3
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field full checklist-block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Checklist" }),
							checks.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "heading-note",
								children: "Break the work into checks the team can tick off."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "check-list",
								children: checks.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "check-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: c.done,
										onChange: () => toggleCheck(item.id, c.id)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: c.done ? "done" : "",
										children: c.title
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "row-action",
										onClick: () => removeCheck(item.id, c.id),
										"aria-label": "Remove check",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 13 })
									})]
								}, c.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "check-add",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: checkTitle,
									onChange: (e) => setCheckTitle(e.target.value),
									placeholder: "Add a check",
									"aria-label": "New check",
									onKeyDown: (e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											addCheck(item.id, checkTitle);
											setCheckTitle("");
										}
									}
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "button-ghost",
									onClick: () => {
										addCheck(item.id, checkTitle);
										setCheckTitle("");
									},
									children: "Add"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field full time-block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Time" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "heading-note",
								children: [item.hours || 0, "h logged against this item."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "time-actions",
								children: [running ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "button-ghost",
									onClick: () => {
										const result = stopTimer();
										if (result && result.hours >= .25) toast.success(`Logged ${result.hours}h`);
										else toast("Timer stopped");
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { size: 14 }), " Stop timer"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "button-ghost",
									onClick: () => startTimer(item.id),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 14 }), " Start timer"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "log-inline",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "log-hours",
											type: "number",
											min: .25,
											step: .25,
											placeholder: "Hours",
											"aria-label": "Hours",
											onKeyDown: (e) => {
												if (e.key === "Enter") {
													e.preventDefault();
													e.currentTarget.parentElement?.querySelector("button")?.click();
												}
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "log-note",
											placeholder: "Note",
											"aria-label": "Time note",
											onKeyDown: (e) => {
												if (e.key === "Enter") {
													e.preventDefault();
													e.currentTarget.parentElement?.querySelector("button")?.click();
												}
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "button-ghost",
											type: "button",
											onClick: (e) => {
												const root = e.currentTarget.parentElement;
												if (!root) return;
												const hoursInput = root.querySelector("#log-hours");
												const noteInput = root.querySelector("#log-note");
												const hours = Number(hoursInput?.value || 0);
												logTime(item.id, hours, noteInput?.value || "Logged time");
												if (hours > 0) toast.success(`Logged ${hours}h`);
												if (hoursInput) hoursInput.value = "";
												if (noteInput) noteInput.value = "";
											},
											children: "Log"
										})
									]
								})]
							}),
							recentLogs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "time-log-list",
								children: recentLogs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [t.hours, "h"] }),
									" ",
									t.person,
									" · ",
									fmtDay(t.date),
									" · ",
									t.note
								] }, t.id))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dialog-actions full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "button-ghost danger",
								onClick: onDelete,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 }), " Delete"]
							}),
							item.status !== "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "button-ghost",
								onClick: onDone,
								children: "Mark done"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "button-primary",
								type: "submit",
								children: "Save"
							})
						]
					})
				]
			})]
		})
	});
}
var OPEN = [
	"lead",
	"qualified",
	"proposal"
];
function PipelineView({ onCreate }) {
	const data = useVantage();
	const moveDeal = useVantage((s) => s.moveDeal);
	const updateDeal = useVantage((s) => s.updateDeal);
	const removeDeal = useVantage((s) => s.removeDeal);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [q, setQ] = (0, import_react.useState)("");
	const [showClosed, setShowClosed] = (0, import_react.useState)(false);
	const [over, setOver] = (0, import_react.useState)(null);
	const filtered = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return data.deals.filter((d) => {
			if (!showClosed && (d.stage === "won" || d.stage === "lost")) return false;
			if (!query) return true;
			return d.title.toLowerCase().includes(query) || d.owner.toLowerCase().includes(query) || customerName(data, d.customerId).toLowerCase().includes(query);
		});
	}, [
		data,
		q,
		showClosed
	]);
	const columns = showClosed ? DEAL_STAGES.map((s) => s.id) : OPEN;
	const openValue = pipelineValue(data);
	const won = data.deals.filter((d) => d.stage === "won").reduce((s, d) => s + d.value, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "metric-grid",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "metric-top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open pipeline" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "metric-value",
						children: money(openValue)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "metric-top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Active deals" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "metric-value",
						children: data.deals.filter((d) => d.stage !== "won" && d.stage !== "lost").length
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "metric-top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Won" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "metric-value",
						children: money(won)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "metric-top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Proposal stage" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "metric-value",
						children: money(data.deals.filter((d) => d.stage === "proposal").reduce((s, d) => s + d.value, 0))
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "toolbar",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "search",
					placeholder: "Filter deals",
					value: q,
					onChange: (e) => setQ(e.target.value),
					"aria-label": "Filter deals"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "button-ghost",
					onClick: () => setShowClosed((v) => !v),
					children: showClosed ? "Hide closed" : "Show closed"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "grow" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "button-primary",
					onClick: onCreate,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), " New deal"]
				})
			]
		}),
		filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "module-placeholder panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "panel-kicker",
					children: "Pipeline"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "No deals in this view" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Add a deal to see value move from lead to won." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "button-primary",
					onClick: onCreate,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), " Create deal"]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "kanban",
			children: columns.map((stage) => {
				const items = filtered.filter((d) => d.stage === stage);
				const total = items.reduce((s, d) => s + d.value, 0);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: `kanban-col ${over === stage ? "drop-over" : ""}`,
					onDragOver: (e) => {
						e.preventDefault();
						setOver(stage);
					},
					onDragLeave: () => setOver((cur) => cur === stage ? null : cur),
					onDrop: (e) => {
						e.preventDefault();
						setOver(null);
						const id = e.dataTransfer.getData("text/deal-id");
						if (id) {
							moveDeal(id, stage);
							toast.success(`Moved to ${dealStageLabel(stage)}`);
						}
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: dealStageLabel(stage) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
						items.length,
						" · ",
						money(total)
					] })] }), items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "kanban-card",
						draggable: true,
						onDragStart: (e) => {
							e.dataTransfer.setData("text/deal-id", item.id);
							e.dataTransfer.effectAllowed = "move";
						},
						onClick: () => setSelected(item),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								item.owner,
								" · ",
								fmtDay(item.closeDate)
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: "prio medium",
								children: money(item.value)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: customerName(data, item.customerId) || "No account" })] })
						]
					}, item.id))]
				}, stage);
			})
		}),
		selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "dialog-backdrop",
			onMouseDown: (e) => {
				if (e.target === e.currentTarget) setSelected(null);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "create-dialog wide",
				role: "dialog",
				"aria-modal": "true",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dialog-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: "Deal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: selected.title })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "icon-button",
						onClick: () => setSelected(null),
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "form-grid two",
					onSubmit: (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						updateDeal(selected.id, {
							title: String(fd.get("title")),
							stage: String(fd.get("stage")),
							value: Number(fd.get("value") || 0),
							closeDate: String(fd.get("closeDate")),
							owner: String(fd.get("owner")),
							notes: String(fd.get("notes")),
							customerId: String(fd.get("customerId") || "") || void 0
						});
						toast.success("Deal updated");
						setSelected(null);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "dl-title",
								children: "Title"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "dl-title",
								name: "title",
								defaultValue: selected.title
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "dl-stage",
								children: "Stage"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								id: "dl-stage",
								name: "stage",
								defaultValue: selected.stage,
								children: DEAL_STAGES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s.id,
									children: s.label
								}, s.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "dl-val",
								children: "Value (AUD)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "dl-val",
								name: "value",
								type: "number",
								defaultValue: selected.value
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "dl-close",
								children: "Close date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "dl-close",
								name: "closeDate",
								type: "date",
								defaultValue: selected.closeDate
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "dl-owner",
								children: "Owner"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "dl-owner",
								name: "owner",
								defaultValue: selected.owner
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "dl-cus",
								children: "Customer"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "dl-cus",
								name: "customerId",
								defaultValue: selected.customerId ?? "",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "No account yet"
								}), data.customers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.id,
									children: c.name
								}, c.id))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "dl-notes",
								children: "Notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "dl-notes",
								name: "notes",
								defaultValue: selected.notes,
								rows: 3
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dialog-actions full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "button-ghost danger",
									onClick: () => {
										removeDeal(selected.id);
										toast.success("Deal removed");
										setSelected(null);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 }), " Delete"]
								}),
								selected.stage !== "won" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "button-ghost",
									onClick: () => {
										moveDeal(selected.id, "won");
										toast.success("Marked won");
										setSelected(null);
									},
									children: "Mark won"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "button-primary",
									type: "submit",
									children: "Save"
								})
							]
						})
					]
				})]
			})
		})
	] });
}
function CustomersView({ onCreate }) {
	const customers = useVantage((s) => s.customers);
	const updateCustomer = useVantage((s) => s.updateCustomer);
	const removeCustomer = useVantage((s) => s.removeCustomer);
	const work = useVantage((s) => s.work);
	const finance = useVantage((s) => s.finance);
	const events = useVantage((s) => s.events);
	const deals = useVantage((s) => s.deals);
	const setModule = useVantage((s) => s.setModule);
	const [q, setQ] = (0, import_react.useState)("");
	const [selectedId, setSelectedId] = (0, import_react.useState)(customers[0]?.id ?? null);
	const list = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return customers.filter((c) => !query || c.name.toLowerCase().includes(query) || c.contact.toLowerCase().includes(query) || c.industry.toLowerCase().includes(query));
	}, [customers, q]);
	const selected = customers.find((c) => c.id === selectedId) ?? list[0] ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "toolbar",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "search",
				placeholder: "Search customers",
				value: q,
				onChange: (e) => setQ(e.target.value),
				"aria-label": "Search customers"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "grow" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "button-primary",
				onClick: onCreate,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), " Add customer"]
			})
		]
	}), customers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "module-placeholder panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "panel-kicker",
				children: "Customers"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "No customers yet" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Add a customer to start tracking value, work, and invoices in one place." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "button-primary",
				onClick: onCreate,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), " Add customer"]
			})
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "split",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel-header",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "panel-kicker",
					children: "Directory"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [list.length, " accounts"] })] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "data-table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Name" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Contact" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "num",
						children: "Value"
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					onClick: () => setSelectedId(c.id),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: c.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "muted-line",
							children: c.industry
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.contact }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `status-chip ${statusTone(c.status)}`,
							children: c.status
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "num",
							children: money(c.value)
						})
					]
				}, c.id)) })]
			})]
		}), selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerDetail, {
			customer: selected,
			relatedWork: work.filter((w) => w.customerId === selected.id),
			relatedFinance: finance.filter((f) => f.customerId === selected.id),
			relatedEvents: events.filter((e) => work.some((w) => w.customerId === selected.id && w.id === e.relatedWorkId)),
			relatedDeals: deals.filter((d) => d.customerId === selected.id),
			onSave: (patch) => {
				updateCustomer(selected.id, patch);
				toast.success("Customer updated");
			},
			onDelete: () => {
				removeCustomer(selected.id);
				setSelectedId(null);
				toast.success("Customer removed");
			},
			onOpen: (module) => setModule(module)
		})]
	})] });
}
function CustomerDetail({ customer, relatedWork, relatedFinance, relatedEvents, relatedDeals, onSave, onDelete, onOpen }) {
	const outstanding = relatedFinance.filter((f) => f.status === "outstanding" || f.status === "overdue").reduce((s, f) => s + f.amount, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel detail-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "panel-kicker",
				children: customer.location
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: customer.name }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "heading-note",
				children: customer.notes || "No notes yet."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "detail-meta",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Contact ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: customer.contact || "—" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Email ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: customer.email || "—" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Industry ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: customer.industry })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Open work ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: relatedWork.filter((w) => w.status !== "done").length })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Outstanding ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: money(outstanding) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Pipeline ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: relatedDeals.filter((d) => d.stage !== "won" && d.stage !== "lost").length })] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "related-stack",
				children: [
					relatedWork.slice(0, 3).map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "related-chip",
						onClick: () => onOpen("work"),
						children: ["Work · ", w.title]
					}, w.id)),
					relatedDeals.slice(0, 2).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "related-chip",
						onClick: () => onOpen("pipeline"),
						children: [
							"Deal · ",
							d.title,
							" · ",
							money(d.value)
						]
					}, d.id)),
					relatedFinance.slice(0, 2).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "related-chip",
						onClick: () => onOpen("finance"),
						children: [
							f.title,
							" · ",
							money(f.amount)
						]
					}, f.id)),
					relatedEvents.slice(0, 2).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "related-chip",
						onClick: () => onOpen("calendar"),
						children: [
							fmtDay(e.date),
							" · ",
							e.title
						]
					}, e.id))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "form-grid two",
				onSubmit: (e) => {
					e.preventDefault();
					const fd = new FormData(e.currentTarget);
					onSave({
						status: String(fd.get("status")),
						value: Number(fd.get("value") || 0),
						notes: String(fd.get("notes") || ""),
						contact: String(fd.get("contact") || ""),
						email: String(fd.get("email") || ""),
						followUp: String(fd.get("followUp") || "")
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "cs-status",
							children: "Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "cs-status",
							name: "status",
							defaultValue: customer.status,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "active",
									children: "Active"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "prospect",
									children: "Prospect"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "inactive",
									children: "Inactive"
								})
							]
						}, customer.id + customer.status)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "cs-val",
							children: "Annual value"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "cs-val",
							name: "value",
							type: "number",
							defaultValue: customer.value
						}, customer.id)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "cs-contact",
							children: "Contact"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "cs-contact",
							name: "contact",
							defaultValue: customer.contact
						}, customer.id + "c")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "cs-email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "cs-email",
							name: "email",
							defaultValue: customer.email
						}, customer.id + "e")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "cs-fu",
							children: "Follow up"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "cs-fu",
							name: "followUp",
							type: "date",
							defaultValue: customer.followUp
						}, customer.id + "f")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "cs-notes",
							children: "Notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "cs-notes",
							name: "notes",
							defaultValue: customer.notes,
							rows: 3
						}, customer.id + "n")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dialog-actions full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "button-ghost danger",
							onClick: onDelete,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 }), " Remove"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "button-primary",
							type: "submit",
							children: "Save"
						})]
					})
				]
			})
		]
	});
}
var ENGAGEMENTS = [
	{
		id: "full",
		label: "Full service"
	},
	{
		id: "bas",
		label: "BAS and activity statements"
	},
	{
		id: "tax",
		label: "Income tax"
	},
	{
		id: "advisory",
		label: "Advisory only"
	}
];
function PracticePanel() {
	const accountant = useVantage((s) => s.accountant);
	const ledger = useVantage((s) => s.ledger);
	const setAccountant = useVantage((s) => s.setAccountant);
	const clearAccountant = useVantage((s) => s.clearAccountant);
	const setLedger = useVantage((s) => s.setLedger);
	const [pending, setPending] = (0, import_react.useState)(null);
	const chosen = LEDGERS.find((item) => item.id === ledger);
	const opening = LEDGERS.find((item) => item.id === pending);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "practice-grid",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel settings-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: "Adviser"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Accountant" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The person who lodges for this business. They appear on People as a contractor. Vantage does not email them." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "form-grid two",
						onSubmit: (e) => {
							e.preventDefault();
							const fd = new FormData(e.currentTarget);
							const name = String(fd.get("name") || "").trim();
							const email = String(fd.get("email") || "").trim();
							if (!name) return;
							if (email && !email.includes("@")) {
								toast.error("Enter a real email, or leave it blank.");
								return;
							}
							setAccountant({
								name,
								firm: String(fd.get("firm") || "").trim(),
								email,
								phone: String(fd.get("phone") || "").trim(),
								engagement: String(fd.get("engagement") || "full")
							});
							toast.success(`${name} saved as accountant`);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "acc-name",
									children: "Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "acc-name",
									name: "name",
									required: true,
									defaultValue: accountant?.name ?? "",
									placeholder: "Jordan Hale"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "acc-firm",
									children: "Firm"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "acc-firm",
									name: "firm",
									defaultValue: accountant?.firm ?? "",
									placeholder: "Hale & Co"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "acc-email",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "acc-email",
									name: "email",
									type: "email",
									defaultValue: accountant?.email ?? "",
									placeholder: "jordan@hale.co"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "acc-phone",
									children: "Phone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "acc-phone",
									name: "phone",
									defaultValue: accountant?.phone ?? "",
									placeholder: "08 9000 0000"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "acc-scope",
									children: "Engagement"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									id: "acc-scope",
									name: "engagement",
									defaultValue: accountant?.engagement ?? "full",
									children: ENGAGEMENTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: item.id,
										children: item.label
									}, item.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "dialog-actions full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "button-primary",
									type: "submit",
									children: "Save accountant"
								}), accountant && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "button-ghost",
									type: "button",
									onClick: () => {
										clearAccountant();
										toast.success("Accountant removed");
									},
									children: "Remove"
								})]
							})
						]
					}, accountant?.email || "none")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel settings-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: "Ledger"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Accounting software" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"One system of record. ",
						chosen ? `${chosen.name} is selected.` : "None selected yet.",
						" Sign-in stays on their site. Vantage never stores that password."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "system-list",
						children: LEDGERS.map((item) => {
							const on = ledger === item.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: on ? "system-chip on" : "system-chip",
								onClick: () => setPending(item.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: on ? "Selected" : item.note })]
							}, item.id);
						})
					}),
					ledger && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dialog-actions",
						style: { marginTop: 12 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "button-ghost",
							href: chosen?.href,
							target: "_blank",
							rel: "noreferrer",
							children: [
								"Open ",
								chosen?.name,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 14 })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "button-ghost",
							onClick: () => {
								setLedger(null);
								toast.success("Accounting software cleared");
							},
							children: "Disconnect"
						})]
					})
				]
			}),
			opening && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dialog-backdrop",
				onMouseDown: (event) => {
					if (event.target === event.currentTarget) setPending(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "create-dialog",
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "ledger-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dialog-header",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "panel-kicker",
								children: "Guided connection"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								id: "ledger-title",
								children: ["Connect ", opening.name]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "icon-button",
								onClick: () => setPending(null),
								"aria-label": "Close",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							opening.note,
							" You will sign in on the official ",
							opening.name,
							" site. Come back and confirm once the file is open."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dialog-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								className: "button-ghost",
								href: opening.href,
								target: "_blank",
								rel: "noreferrer",
								children: [
									"Open ",
									opening.name,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 14 })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "button-primary",
								onClick: () => {
									setLedger(opening.id);
									setPending(null);
									toast.success(`${opening.name} set as the ledger`);
								},
								children: "I've signed in"
							})]
						})
					]
				})
			})
		]
	});
}
function FinanceView({ onCreate }) {
	const data = useVantage();
	const [q, setQ] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("all");
	const list = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return data.finance.filter((f) => {
			if (type !== "all" && f.type !== type) return false;
			return !query || f.title.toLowerCase().includes(query);
		});
	}, [
		data.finance,
		q,
		type
	]);
	const revenue = paidRevenue(data.finance, data.range);
	const outstanding = outstandingTotal(data.finance);
	const overdue = data.finance.filter((f) => f.status === "overdue").reduce((s, f) => s + f.amount, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "metric-grid",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "metric-top",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Paid this period" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "metric-value",
							children: money(revenue)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "metric-change positive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Invoices marked paid" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "metric-top",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Outstanding" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "metric-value",
							children: money(outstanding)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "metric-change negative",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Awaiting payment" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "metric-top",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Overdue" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "metric-value",
							children: money(overdue)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "metric-change negative",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Needs follow-up" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "metric-top",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Records" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "metric-value",
							children: data.finance.length
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "metric-change positive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "In the ledger" })
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PracticePanel, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "toolbar",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "search",
					placeholder: "Search ledger",
					value: q,
					onChange: (e) => setQ(e.target.value),
					"aria-label": "Search finance"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: type,
					onChange: (e) => setType(e.target.value),
					"aria-label": "Filter type",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All types"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "invoice",
							children: "Invoices"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "payment",
							children: "Payments"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "expense",
							children: "Expenses"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "grow" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "button-primary",
					onClick: onCreate,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), " Log record"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "panel",
			children: list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "compliance-empty",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Ledger is empty" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Log an invoice or expense to start the operating picture." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "button-primary",
						onClick: onCreate,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 15 }), " Log record"]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "data-table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Description" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Type" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Customer" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Date" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "num",
						children: "Amount"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceRow, { row }, row.id)) })]
			})
		})
	] });
}
function FinanceRow({ row }) {
	const data = useVantage();
	const updateFinance = useVantage((s) => s.updateFinance);
	const removeFinance = useVantage((s) => s.removeFinance);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: row.title }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			style: { textTransform: "capitalize" },
			children: row.type
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: customerName(data, row.customerId) || "—" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDay(row.date, "d MMM yyyy") }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			className: "filter-select",
			value: row.status,
			"aria-label": `Status for ${row.title}`,
			onChange: (e) => {
				updateFinance(row.id, { status: e.target.value });
				toast.success("Status updated");
			},
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "draft",
					children: "Draft"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "outstanding",
					children: "Outstanding"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "paid",
					children: "Paid"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "overdue",
					children: "Overdue"
				})
			]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: "num",
			children: money(row.amount)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "row-actions",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "icon-button",
				"aria-label": `Delete ${row.title}`,
				onClick: (e) => {
					e.stopPropagation();
					removeFinance(row.id);
					toast.success("Record removed");
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 15 })
			})
		}) })
	] });
}
function TimesheetView() {
	const data = useVantage();
	const setTimeForDay = useVantage((s) => s.setTimeForDay);
	const startTimer = useVantage((s) => s.startTimer);
	const stopTimer = useVantage((s) => s.stopTimer);
	const [weekStart, setWeekStart] = (0, import_react.useState)(() => startOfWeekIso());
	const days = weekDays(weekStart);
	const today = todayIso();
	const person = data.profile.name;
	const rows = (0, import_react.useMemo)(() => {
		const ids = /* @__PURE__ */ new Set();
		const list = [];
		for (const w of data.work) if (w.status !== "done") {
			list.push(w);
			ids.add(w.id);
		}
		for (const t of data.timeLogs) if (days.includes(t.date) && !ids.has(t.workId)) {
			const w = data.work.find((item) => item.id === t.workId);
			if (w) {
				list.push(w);
				ids.add(w.id);
			}
		}
		return list;
	}, [
		data.work,
		data.timeLogs,
		days
	]);
	const weekHours = days.reduce((sum, day) => sum + data.timeLogs.filter((t) => t.date === day).reduce((n, t) => n + t.hours, 0), 0);
	const mine = days.reduce((sum, day) => sum + data.timeLogs.filter((t) => t.date === day && t.person === person).reduce((n, t) => n + t.hours, 0), 0);
	const exportSheet = () => {
		const header = [
			"Work",
			"Owner",
			...days.map((d) => fmtDay(d, "EEE d MMM")),
			"Total"
		];
		const body = rows.map((w) => {
			const cells = days.map((d) => hoursForDay(data, w.id, d, person));
			return [
				w.title,
				w.owner,
				...cells,
				cells.reduce((n, v) => n + v, 0)
			];
		});
		downloadCsv(`timesheet-${weekStart}.csv`, [header, ...body]);
		toast.success("Timesheet exported");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "metric-grid",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "metric-top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "This week" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "metric-value",
						children: [hoursThisWeek(data), "h"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "metric-top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Selected week" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "metric-value",
						children: [weekHours, "h"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "metric-top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your hours" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "metric-value",
						children: [mine, "h"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "metric-top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open work" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "metric-value",
						children: data.work.filter((w) => w.status !== "done").length
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "toolbar",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "button-ghost",
					onClick: () => setWeekStart(addDaysIso(weekStart, -7)),
					"aria-label": "Previous week",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 16 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
					className: "week-label",
					children: [
						fmtDay(weekStart, "d MMM"),
						" – ",
						fmtDay(days[6] ?? weekStart, "d MMM yyyy")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "button-ghost",
					onClick: () => setWeekStart(addDaysIso(weekStart, 7)),
					"aria-label": "Next week",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "button-ghost",
					onClick: () => setWeekStart(startOfWeekIso()),
					children: "This week"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "grow" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "button-ghost",
					onClick: exportSheet,
					children: "Export CSV"
				})
			]
		}),
		rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "module-placeholder panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "panel-kicker",
					children: "Time"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Nothing to log yet" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Create work items and the weekly grid will appear here." })
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "panel timesheet-panel",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "timesheet-scroll",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "timesheet",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Work" }),
						days.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
							className: day === today ? "today" : "",
							children: [fmtDay(day, "EEE"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: fmtDay(day, "d MMM") })]
						}, day)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Total" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((w) => {
						const cells = days.map((day) => hoursForDay(data, w.id, day, person));
						const total = cells.reduce((n, v) => n + v, 0);
						const running = data.timer?.workId === w.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: w.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "muted-line",
								children: [
									w.owner,
									" · ",
									w.status.replace("-", " ")
								]
							})] }),
							days.map((day, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: day === today ? "today" : "",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: 0,
									step: .25,
									"aria-label": `${w.title} ${fmtDay(day)}`,
									defaultValue: cells[i] || "",
									onBlur: (e) => {
										const next = Number(e.target.value || 0);
										if (!Number.isFinite(next) || next === cells[i]) return;
										setTimeForDay(w.id, day, next);
									}
								}, `${w.id}-${day}-${cells[i]}`)
							}, day)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "num",
								children: total || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: running ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "button-ghost",
								onClick: () => {
									const result = stopTimer();
									if (result && result.hours >= .25) toast.success(`Logged ${result.hours}h`);
									else toast("Timer stopped");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { size: 13 }), " Stop"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "button-ghost",
								onClick: () => startTimer(w.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 13 }), " Start"]
							}) })
						] }, w.id);
					}) })]
				})
			})
		})
	] });
}
function CalendarView({ onCreate }) {
	const events = useVantage((s) => s.events);
	const removeEvent = useVantage((s) => s.removeEvent);
	const [cursor, setCursor] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const [selected, setSelected] = (0, import_react.useState)(todayIso());
	const days = (0, import_react.useMemo)(() => {
		const start = startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 });
		const end = endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 });
		return eachDayOfInterval({
			start,
			end
		});
	}, [cursor]);
	const dayEvents = events.filter((e) => e.date === selected).sort((a, b) => a.time.localeCompare(b.time));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "cal-wrap",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "panel-kicker",
					children: "Workspace calendar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: format(cursor, "MMMM yyyy") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "heading-actions",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "icon-button",
							"aria-label": "Previous month",
							onClick: () => setCursor((d) => addMonths(d, -1)),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 18 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "icon-button",
							"aria-label": "Next month",
							onClick: () => setCursor((d) => addMonths(d, 1)),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 18 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "button-primary",
							onClick: onCreate,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), " Event"]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "cal-grid",
				style: { marginTop: 16 },
				children: [[
					"Mon",
					"Tue",
					"Wed",
					"Thu",
					"Fri",
					"Sat",
					"Sun"
				].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "cal-dow",
					children: d
				}, d)), days.map((day) => {
					const iso = format(day, "yyyy-MM-dd");
					const items = events.filter((e) => e.date === iso);
					const muted = !isSameMonth(day, cursor);
					const today = isSameDay(day, /* @__PURE__ */ new Date());
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: `cal-day${muted ? " muted" : ""}${today ? " today" : ""}${iso === selected ? " selected" : ""}`,
						onClick: () => setSelected(iso),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: format(day, "d") }),
							items.slice(0, 2).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `cal-pip${e.kind === "external" ? " external" : ""}`,
								children: e.title
							}, e.id)),
							items.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "cal-pip",
								children: ["+", items.length - 2]
							})
						]
					}, iso);
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel-header",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "panel-kicker",
					children: "Selected day"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: format(/* @__PURE__ */ new Date(selected + "T12:00:00"), "EEEE d MMM") })] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "day-list",
				children: [dayEvents.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "heading-note",
					children: "Nothing booked. Add an event to this day."
				}), dayEvents.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "day-event",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
							e.time,
							" · ",
							e.title
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [e.kind === "external" ? "External" : "Internal", e.location ? ` · ${e.location}` : ""] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "row-actions",
							style: { marginTop: 8 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "icon-button",
								"aria-label": `Delete ${e.title}`,
								onClick: () => {
									removeEvent(e.id);
									toast.success("Event removed");
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 15 })
							})
						})
					]
				}, e.id))]
			})]
		})]
	});
}
function ComplianceWorkspace({ onCreate }) {
	const data = useVantage();
	const markReviewed = useVantage((s) => s.markReviewed);
	const connectPortal = useVantage((s) => s.connectPortal);
	const disconnectPortal = useVantage((s) => s.disconnectPortal);
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("All statuses");
	const [categoryFilter, setCategoryFilter] = (0, import_react.useState)("All categories");
	const [selectedPortal, setSelectedPortal] = (0, import_react.useState)(null);
	const categories = Array.from(new Set(data.compliance.map((r) => r.category)));
	const filtered = (0, import_react.useMemo)(() => data.compliance.filter((record) => (statusFilter === "All statuses" || record.status === statusFilter) && (categoryFilter === "All categories" || record.category === categoryFilter)), [
		data.compliance,
		statusFilter,
		categoryFilter
	]);
	const urgent = data.compliance.filter((r) => r.status === "Urgent").length;
	const soon = data.compliance.filter((r) => r.status === "Due soon").length;
	const ready = data.compliance.filter((r) => r.status === "Up to date").length;
	const score = complianceScore(data);
	const next = nextDeadline(data);
	const chip = (status) => status.toLowerCase().replace(" ", "-");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "compliance-workspace",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "compliance-intro",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: "Australia-wide compliance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Stay registered. Stay ready." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Track core registrations, licences, permits, tax, privacy, employment, and insurance obligations in one guided workspace." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "compliance-score",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Readiness score" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [score, "%"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Based on reviewed records" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "compliance-stats",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Urgent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "status-urgent",
							children: urgent
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Needs action now" })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Due soon" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "status-soon",
							children: soon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Next 30 days" })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Up to date" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "status-ready",
							children: ready
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Reviewed records" })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Next deadline" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: next ? fmtDay(next.due, "d MMM") : "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: next ? next.title : "Nothing pending" })
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "compliance-disclaimer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "This guided checklist is for operational planning, not legal advice. Requirements vary by business activity, structure, workforce, and state or territory. Confirm obligations with the relevant government authority or a qualified adviser." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-section",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "panel-kicker",
							children: "Secure access"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Government portal connections" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "portal-beta-label",
							children: "Beta · guided handoff"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "portal-intro",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "vantage never collects government passwords, myGovID details, RAM credentials, or access tokens. Authenticate only on official government domains." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "portal-grid",
						children: PORTALS.map((portal) => {
							const connected = data.connectedPortals.includes(portal.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: `portal-card ${portal.accent}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "portal-card-top",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "portal-icon",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { size: 18 })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: connected ? "portal-state connected" : "portal-state",
											children: connected ? `Checked ${data.lastChecked[portal.id] || "today"}` : "Not connected"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "panel-kicker",
										children: portal.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: portal.name }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: portal.description }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["Prerequisite: ", portal.prerequisites] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "portal-card-actions",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											className: "portal-connect-button",
											onClick: () => setSelectedPortal(portal),
											children: [
												connected ? "Review access" : "Connect guide",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 14 })
											]
										}), connected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "portal-check-button",
											onClick: () => {
												disconnectPortal(portal.id);
												toast.success(`${portal.name} marked not connected`);
											},
											children: "Disconnect"
										})]
									})
								]
							}, portal.id);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel compliance-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "panel-kicker",
							children: "Obligation register"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Registrations, licences & controls" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "source-link",
							href: "https://business.gov.au/",
							target: "_blank",
							rel: "noreferrer",
							children: ["Open business.gov.au ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 14 })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "compliance-filters",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: statusFilter,
								onChange: (e) => setStatusFilter(e.target.value),
								"aria-label": "Filter compliance status",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All statuses" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Urgent" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Due soon" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Up to date" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: categoryFilter,
								onChange: (e) => setCategoryFilter(e.target.value),
								"aria-label": "Filter compliance category",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All categories" }), categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: category }, category))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "button-ghost",
								onClick: onCreate,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), " Add"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								filtered.length,
								" of ",
								data.compliance.length,
								" records"
							] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "compliance-table",
						children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "compliance-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, { size: 22 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Your compliance register is ready" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add your first registration, licence, permit, or policy review to begin tracking obligations." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "button-primary",
									onClick: () => window.open("https://ablis.business.gov.au/", "_blank", "noopener,noreferrer"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 15 }), " Start with ABLIS discovery"]
								})
							]
						}) : filtered.map((record) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "compliance-record",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `compliance-status-dot ${chip(record.status)}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "compliance-record-main",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: record.title }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											record.category,
											" · ",
											record.authority
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: record.jurisdiction })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "compliance-meta",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `status-chip ${chip(record.status)}`,
											children: record.status
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: fmtDay(record.due, "d MMM yyyy") }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											record.owner,
											" · ",
											record.evidence ? "Evidence attached" : "Evidence needed"
										] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "compliance-actions",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: record.source,
										target: "_blank",
										rel: "noreferrer",
										"aria-label": `Open official guidance for ${record.title}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => markReviewed(record.id),
										disabled: record.status === "Up to date" && record.evidence,
										"aria-label": `Mark ${record.title} reviewed`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 15 })
									})]
								})
							]
						}, record.id))
					})
				]
			}),
			selectedPortal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dialog-backdrop",
				role: "presentation",
				onMouseDown: (event) => {
					if (event.currentTarget === event.target) setSelectedPortal(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "create-dialog portal-dialog",
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "portal-dialog-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dialog-header",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "panel-kicker",
								children: "Guided connection"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								id: "portal-dialog-title",
								children: ["Connect ", selectedPortal.name]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "icon-button",
								onClick: () => setSelectedPortal(null),
								"aria-label": "Close portal connection guide",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 17 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "portal-dialog-copy",
							children: [
								"You will leave vantage and authenticate directly on the official ",
								selectedPortal.name,
								" website. We do not ask for or store government credentials."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
							className: "portal-steps",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Check prerequisites" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: selectedPortal.prerequisites })] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Open the official portal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Review the domain before entering any information." })] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Return and confirm access" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Come back to vantage and mark this connection as checked." })] })] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "portal-dialog-actions",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									className: "button-ghost",
									href: selectedPortal.href,
									target: "_blank",
									rel: "noreferrer",
									children: ["Open official site ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "button-primary",
									type: "button",
									onClick: () => {
										connectPortal(selectedPortal.id);
										toast.success(`${selectedPortal.name} marked as checked`);
										setSelectedPortal(null);
									},
									children: "I've confirmed access"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "text-button",
									type: "button",
									onClick: () => setSelectedPortal(null),
									children: "Not now"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "portal-security-note",
							children: "Portal access and live API synchronisation are separate. Availability depends on government onboarding, permissions, and approved provider access."
						})
					]
				})
			})
		]
	});
}
function ReportsView() {
	const data = useVantage();
	const revenue = paidRevenue(data.finance, data.range);
	const outstanding = outstandingTotal(data.finance);
	const counts = workByStatus(data);
	const open = openWork(data).length;
	const score = complianceScore(data);
	const customers = activeCustomers(data);
	const pipeline = pipelineValue(data);
	const won = wonValue(data, data.range);
	const hours = hoursLogged(data, data.range);
	const people = hoursByPerson(data, data.range);
	const byCustomer = customers.map((c) => ({
		name: c.name,
		value: data.finance.filter((f) => f.customerId === c.id && f.type === "invoice" && f.status === "paid").reduce((s, f) => s + f.amount, 0)
	})).sort((a, b) => b.value - a.value);
	const maxCust = Math.max(1, ...byCustomer.map((c) => c.value));
	const statuses = [
		"in-progress",
		"needs-review",
		"scheduled",
		"on-hold",
		"done"
	];
	const maxWork = Math.max(1, ...statuses.map((s) => counts[s]));
	const stages = [
		"lead",
		"qualified",
		"proposal",
		"won",
		"lost"
	];
	const stageValue = (stage) => data.deals.filter((d) => d.stage === stage).reduce((s, d) => s + d.value, 0);
	const maxDeal = Math.max(1, ...stages.map(stageValue));
	const maxHours = Math.max(1, ...people.map((p) => p.hours));
	const exportAll = () => {
		downloadCsv(`vantage-report-${data.range}.csv`, [
			["Metric", "Value"],
			["Revenue", revenue],
			["Outstanding", outstanding],
			["Pipeline", pipeline],
			["Won", won],
			["Hours", hours],
			["Open work", open],
			["Compliance score", score],
			["Lifecycle", stageLabel(data.lifecycle)]
		]);
		toast.success("Report exported");
	};
	const exportPassport = () => {
		downloadText(`business-passport-${(data.business.tradingName || data.workspaceName).replace(/\s+/g, "-").toLowerCase()}.txt`, buildPassport(data));
		toast.success("Business Passport downloaded");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "toolbar",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "grow" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "button-ghost",
					onClick: exportPassport,
					children: "Download Business Passport"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "button-ghost",
					onClick: exportAll,
					children: "Export CSV"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel passport-panel",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel-header",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "panel-kicker",
					children: "Exit engine"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Business Passport" })] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"A hand-over-ready snapshot of ",
				data.business.legalName || data.workspaceName,
				data.business.abn ? ` · ABN ${data.business.abn}` : "",
				" · stage ",
				stageLabel(data.lifecycle),
				". Use this pack for a buyer, successor, or incoming operator."
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "metric-grid",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "metric-top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [rangeLabel(data.range), " revenue"] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "metric-value",
						children: money(revenue)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "metric-top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open pipeline" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "metric-value",
						children: money(pipeline)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "metric-top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hours logged" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "metric-value",
						children: [hours, "h"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "metric-top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Compliance score" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "metric-value",
						children: [score, "%"]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "report-grid",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "panel-header",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "panel-kicker",
							children: "Customers"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Paid invoices by account" })] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bar-list",
						children: [byCustomer.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "heading-note",
							children: "Add customers and paid invoices to populate this report."
						}), byCustomer.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bar-row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bar-track",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "bar-fill",
										style: { width: `${row.value / maxCust * 100}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: money(row.value) })
							]
						}, row.name))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "panel-header",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "panel-kicker",
							children: "Delivery"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Work by status" })] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bar-list",
						children: statuses.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bar-row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: workStatusLabel(status) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bar-track",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "bar-fill",
										style: { width: `${counts[status] / maxWork * 100}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: counts[status] })
							]
						}, status))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "panel-header",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "panel-kicker",
							children: "Sales"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Pipeline by stage" })] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bar-list",
						children: [data.deals.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "heading-note",
							children: "Add deals to see the funnel."
						}), stages.map((stage) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bar-row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: dealStageLabel(stage) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bar-track",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "bar-fill",
										style: { width: `${stageValue(stage) / maxDeal * 100}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: money(stageValue(stage)) })
							]
						}, stage))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "panel-header",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "panel-kicker",
							children: "Capacity"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Hours by person" })] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bar-list",
						children: [people.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "heading-note",
							children: "Log time to see utilisation."
						}), people.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bar-row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bar-track",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "bar-fill",
										style: { width: `${row.hours / maxHours * 100}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [row.hours, "h"] })
							]
						}, row.name))]
					})]
				})
			]
		})
	] });
}
var STEPS = [
	{
		module: "overview",
		kicker: "1 · Command centre",
		title: "This is the whole business",
		body: "The rail across the top is the lifecycle — Idea through Exit. Metrics, the brief, and what needs you today sit underneath. Move the stage only when the firm actually moves."
	},
	{
		module: "launch",
		kicker: "2 · Launch",
		title: "Setup lives in one list",
		body: "Identity, legal, money, insurance, brand, and systems. Tick a step when it is done. The idea canvas stays with you if you are still shaping the offer."
	},
	{
		module: "customers",
		kicker: "3 · Customers",
		title: "Every client has a 360",
		body: "Add the businesses you serve. Open one to see their work, deals, invoices, and the next conversation — not a pile of separate tools."
	},
	{
		module: "pipeline",
		kicker: "4 · Pipeline",
		title: "Move value toward won",
		body: "A deal starts as a lead. Advance it when the conversation moves. Won deals feed the reports. Lost ones stay visible so the pattern is honest."
	},
	{
		module: "work",
		kicker: "5 · Work and time",
		title: "Delivery, then the hours",
		body: "Open a job, tick the checklist, and log time on the same record. The timesheet and the live timer use those same hours."
	},
	{
		module: "finance",
		kicker: "6 · Money",
		title: "Invoices stay until they are paid",
		body: "Pick one ledger — Xero, MYOB, QuickBooks, or Reckon — and add the accountant who lodges for you. Invoices and GST stay on the record until they are paid."
	},
	{
		module: "inbox",
		kicker: "7 · Inbox",
		title: "Start the day here",
		body: "What needs a decision is collected in one list. Snooze it, clear it, or open the record. Search anything with the shortcut in the top bar."
	},
	{
		module: "settings",
		kicker: "8 · You're in",
		title: "Make it yours",
		body: "Name the business, set what the agents may do, and install vantage on your phone. Create the first record whenever you are ready — you can replay this tour from Shortcuts."
	}
];
function useInstallPrompt() {
	const [prompt, setPrompt] = (0, import_react.useState)(null);
	const [installed, setInstalled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
		setInstalled(standalone);
		const onPrompt = (event) => {
			event.preventDefault();
			setPrompt(event);
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
	return {
		canInstall: Boolean(prompt) && !installed,
		installed,
		install
	};
}
function WorkspaceGuide({ onCreate }) {
	const setModule = useVantage((s) => s.setModule);
	const setTourDone = useVantage((s) => s.setTourDone);
	const [step, setStep] = (0, import_react.useState)(0);
	const { canInstall, installed, install } = useInstallPrompt();
	const current = STEPS[step] ?? STEPS[0];
	const last = step === STEPS.length - 1;
	(0, import_react.useEffect)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "guide-dock",
		role: "dialog",
		"aria-labelledby": "guide-title",
		"data-step": current.module,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "guide-top",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "panel-kicker",
					children: current.kicker
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "icon-button",
					onClick: finish,
					"aria-label": "Skip the tour",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "guide-title",
				children: current.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: current.body }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "guide-dots",
				"aria-hidden": "true",
				children: STEPS.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: index === step ? "on" : "" }, item.module))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "guide-actions",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "button-ghost",
						onClick: finish,
						children: "Skip"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "grow" }),
					step > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "button-ghost",
						onClick: () => setStep((n) => n - 1),
						children: "Back"
					}),
					last && canInstall && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "button-ghost",
						onClick: () => {
							install();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }), " Install"]
					}),
					last && !canInstall && installed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "guide-note",
						children: "Installed"
					}),
					last ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "button-primary",
						onClick: () => {
							finish();
							onCreate();
						},
						children: "Create first record"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "button-primary",
						onClick: () => setStep((n) => n + 1),
						children: "Next"
					})
				]
			})
		]
	});
}
var subscribeToNothing$1 = () => () => {};
function SettingsView() {
	const workspaceName = useVantage((s) => s.workspaceName);
	const profile = useVantage((s) => s.profile);
	const theme = useVantage((s) => s.theme);
	const setWorkspaceName = useVantage((s) => s.setWorkspaceName);
	const setProfile = useVantage((s) => s.setProfile);
	const setTheme = useVantage((s) => s.setTheme);
	const restoreDemo = useVantage((s) => s.restoreDemo);
	const clearWorkspace = useVantage((s) => s.clearWorkspace);
	const business = useVantage((s) => s.business);
	const setBusiness = useVantage((s) => s.setBusiness);
	const aiPermissions = useVantage((s) => s.aiPermissions);
	const setAiPermission = useVantage((s) => s.setAiPermission);
	const linkedSystems = useVantage((s) => s.linkedSystems);
	const connectSystem = useVantage((s) => s.connectSystem);
	const setTourDone = useVantage((s) => s.setTourDone);
	const { canInstall, installed, install } = useInstallPrompt();
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing$1, hasGateSessionMarker, () => false);
	const origin = (0, import_react.useSyncExternalStore)(subscribeToNothing$1, () => window.location.origin, () => "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "settings-grid",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel settings-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: "Workspace"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Workspace identity" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The workspace name appears in the sidebar, breadcrumbs, and exports." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "form-grid",
						onSubmit: (e) => {
							e.preventDefault();
							const fd = new FormData(e.currentTarget);
							setWorkspaceName(String(fd.get("workspace") || workspaceName));
							toast.success("Workspace saved");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "ws-name",
								children: "Workspace name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "ws-name",
								name: "workspace",
								defaultValue: workspaceName
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dialog-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "button-primary",
								type: "submit",
								children: "Save workspace"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "button-ghost",
								onClick: () => {
									setTourDone(false);
									toast.success("Tour started");
								},
								children: "Show me around"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel settings-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: "Master record"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Business identity" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Legal structure, ABN, and directors. This is the graph everything else hangs off." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "form-grid two",
						onSubmit: (e) => {
							e.preventDefault();
							const fd = new FormData(e.currentTarget);
							setBusiness({
								legalName: String(fd.get("legalName") || "").trim() || business.legalName,
								tradingName: String(fd.get("tradingName") || "").trim(),
								abn: String(fd.get("abn") || "").trim(),
								acn: String(fd.get("acn") || "").trim(),
								entityType: String(fd.get("entityType") || "pty-ltd"),
								industry: String(fd.get("industry") || "").trim(),
								founded: String(fd.get("founded") || ""),
								state: String(fd.get("state") || "").trim() || "WA",
								website: String(fd.get("website") || "").trim(),
								directors: String(fd.get("directors") || "").trim()
							});
							toast.success("Business record saved");
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "b-legal",
									children: "Legal name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "b-legal",
									name: "legalName",
									defaultValue: business.legalName
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "b-trade",
									children: "Trading name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "b-trade",
									name: "tradingName",
									defaultValue: business.tradingName
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "b-abn",
									children: "ABN"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "b-abn",
									name: "abn",
									defaultValue: business.abn
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "b-acn",
									children: "ACN"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "b-acn",
									name: "acn",
									defaultValue: business.acn
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "b-ent",
									children: "Entity"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "b-ent",
									name: "entityType",
									defaultValue: business.entityType,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "sole-trader",
											children: "Sole trader"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "partnership",
											children: "Partnership"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "pty-ltd",
											children: "Pty Ltd"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "trust",
											children: "Trust"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "other",
											children: "Other"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "b-ind",
									children: "Industry"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "b-ind",
									name: "industry",
									defaultValue: business.industry
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "b-found",
									children: "Founded"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "b-found",
									name: "founded",
									type: "date",
									defaultValue: business.founded
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "b-state",
									children: "State"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "b-state",
									name: "state",
									defaultValue: business.state
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "b-dir",
									children: "Directors"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "b-dir",
									name: "directors",
									defaultValue: business.directors
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "b-web",
									children: "Website"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "b-web",
									name: "website",
									defaultValue: business.website
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dialog-actions full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "button-primary",
									type: "submit",
									children: "Save business"
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel settings-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: "AI layer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Agent permissions" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Observe, recommend, or prepare. Agents never execute. Briefs run only when you ask." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "perm-list",
						children: AI_AGENTS.map((agent) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: agent.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: agent.brief })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							"aria-label": `${agent.title} capability`,
							value: aiPermissions[agent.id],
							onChange: (e) => {
								setAiPermission(agent.id, e.target.value);
								toast.success(`${agent.title} set to ${e.target.value}`);
							},
							children: AI_LEVELS.map((level) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: level.id,
								children: level.label
							}, level.id))
						})] }, agent.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PracticePanel, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel settings-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: "Ecosystem"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Systems of record" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Vantage sits above the specialist tools. The accounting ledger is chosen above. Toggle the others when that integration is live." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "system-list",
						children: LINKED_SYSTEMS.map((sys) => {
							const on = linkedSystems.includes(sys.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: on ? "system-chip on" : "system-chip",
								onClick: () => {
									connectSystem(sys.id);
									toast.success(on ? `${sys.name} unlinked` : `${sys.name} marked as linked`);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: sys.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: on ? "Linked" : sys.role })]
							}, sys.id);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel settings-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: "Appearance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Theme" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Switch the operating view between paper and night without leaving the workspace." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "theme-toggle",
						role: "group",
						"aria-label": "Theme",
						children: ["light", "dark"].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: theme === id ? "button-primary" : "button-ghost",
							onClick: () => {
								setTheme(id);
								toast.success(id === "dark" ? "Night theme on" : "Paper theme on");
							},
							children: id === "dark" ? "Night" : "Paper"
						}, id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel settings-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: "Account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Signed-in profile" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Signed in as ",
						user?.primaryEmail || profile.email,
						". Profile details stay with this workspace."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "form-grid",
						onSubmit: (e) => {
							e.preventDefault();
							const fd = new FormData(e.currentTarget);
							setProfile({
								name: String(fd.get("name") || profile.name),
								email: String(fd.get("email") || profile.email),
								role: String(fd.get("role") || profile.role),
								initials: profile.initials
							});
							toast.success("Profile saved");
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "p-name",
									children: "Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "p-name",
									name: "name",
									defaultValue: profile.name
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "p-email",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "p-email",
									name: "email",
									type: "email",
									defaultValue: profile.email
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "p-role",
									children: "Role"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "p-role",
									name: "role",
									defaultValue: profile.role
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dialog-actions",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "button-primary",
									type: "submit",
									children: "Save profile"
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel settings-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: "Android"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Install on Android" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Download the cdxi vantage app for phones, tablets, and foldables. On first open, enter this workspace address so the app wraps your signed-in operation." }),
					origin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "muted-line",
						style: { marginTop: 10 },
						children: ["Workspace URL: ", origin]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "heading-actions",
						style: { marginTop: 16 },
						children: [
							canInstall && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "button-primary",
								onClick: () => void install(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 16 }), "Install app"]
							}),
							installed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "muted-line",
								children: "Installed on this device."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								className: "button-primary",
								href: "/cdxi-vantage.apk",
								download: "cdxi-vantage.apk",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 16 }), "Download Android app"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted-line",
						style: { marginTop: 12 },
						children: "Allow installs from this source when prompted. You can also add vantage to the home screen from the browser menu. Long-press Back in the app to change the workspace URL."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel settings-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: "Data"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Workspace data" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Restore the Northline Advisory sample, or clear everything and start from an empty operating view. Changes save to this account." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "heading-actions",
						style: { marginTop: 16 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "button-primary",
							onClick: () => {
								restoreDemo();
								toast.success("Demo data restored");
							},
							children: "Restore demo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "button-ghost",
							onClick: () => {
								clearWorkspace();
								toast.success("Workspace cleared");
							},
							children: "Clear workspace"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel settings-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: "Session"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Sign out" }),
					gateSession ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This session is managed by Grok, so sign-out is not available here." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Returns you to the vantage home page. Workspace data stays on this account." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "heading-actions",
						style: { marginTop: 16 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "button-ghost",
							disabled: signingOut,
							onClick: () => {
								setSigningOut(true);
								signOut("/").catch(() => setSigningOut(false));
							},
							children: signingOut ? "Signing out…" : "Sign out"
						})
					})] })
				]
			})
		]
	});
}
function LaunchCentre({ onCreate }) {
	const data = useVantage();
	const toggleLaunch = useVantage((s) => s.toggleLaunch);
	const setIdeaCanvas = useVantage((s) => s.setIdeaCanvas);
	const setLifecycle = useVantage((s) => s.setLifecycle);
	const tasks = data.launchTasks;
	const progress = launchProgress(data);
	const [area, setArea] = (0, import_react.useState)("all");
	const filtered = (0, import_react.useMemo)(() => tasks.filter((t) => area === "all" || t.area === area), [tasks, area]);
	const open = filtered.filter((t) => !t.done).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "launch-centre",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel launch-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: "Setup autopilot"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Walk the business from idea to operating." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [stageNote(data.lifecycle), " Tick items as you complete them. Vantage keeps the master record — Xero, HubSpot, and the rest sit underneath."] })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "launch-score",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Setup complete" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [progress, "%"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							tasks.filter((t) => t.done).length,
							" of ",
							tasks.length,
							" items"
						] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "life-rail",
				role: "list",
				children: LIFECYCLE_STAGES.map((stage) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					role: "listitem",
					className: `life-step ${data.lifecycle === stage.id ? "active" : ""}`,
					onClick: () => {
						setLifecycle(stage.id);
						toast.success(`Stage set to ${stage.label}`);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: stage.verb }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: stage.label })]
				}, stage.id))
			}),
			(data.lifecycle === "idea" || data.lifecycle === "start") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "panel-header",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: "Idea canvas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "What are you building?" })] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "form-grid two",
					onSubmit: (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						setIdeaCanvas({
							concept: String(fd.get("concept") || ""),
							market: String(fd.get("market") || ""),
							model: String(fd.get("model") || ""),
							nextStep: String(fd.get("nextStep") || "")
						});
						toast.success("Canvas saved");
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "idea-concept",
								children: "Concept"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "idea-concept",
								name: "concept",
								rows: 2,
								defaultValue: data.ideaCanvas.concept
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "idea-market",
								children: "Target market"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "idea-market",
								name: "market",
								rows: 2,
								defaultValue: data.ideaCanvas.market
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "idea-model",
								children: "Model"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "idea-model",
								name: "model",
								rows: 2,
								defaultValue: data.ideaCanvas.model
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "idea-next",
								children: "Next step"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "idea-next",
								name: "nextStep",
								defaultValue: data.ideaCanvas.nextStep
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dialog-actions full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "button-primary",
								type: "submit",
								children: "Save canvas"
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "toolbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "chip-row",
					role: "tablist",
					"aria-label": "Setup area",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: area === "all" ? "chip active" : "chip",
						onClick: () => setArea("all"),
						children: [
							"All · ",
							open,
							" open"
						]
					}), LAUNCH_AREAS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: area === item.id ? "chip active" : "chip",
						onClick: () => setArea(item.id),
						children: item.label
					}, item.id))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "button-primary",
					onClick: onCreate,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), " Add setup item"]
				})]
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "empty-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { size: 20 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "No setup items yet." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "heading-note",
						children: "Add the first registration, policy, or operating system to track."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "launch-list",
				children: filtered.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: `launch-row ${task.done ? "done" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "check-hit",
						"aria-pressed": task.done,
						"aria-label": task.done ? `Reopen ${task.title}` : `Complete ${task.title}`,
						onClick: () => toggleLaunch(task.id),
						children: task.done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }) : null
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: task.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							LAUNCH_AREAS.find((a) => a.id === task.area)?.label,
							" · ",
							stageLabelSafe(task.stage),
							" ·",
							" ",
							task.owner,
							task.due ? ` · ${fmtDay(task.due)}` : ""
						] }),
						task.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: task.notes }) : null
					] })]
				}, task.id))
			})
		]
	});
}
function stageLabelSafe(id) {
	return LIFECYCLE_STAGES.find((s) => s.id === id)?.label ?? id;
}
function VaultView({ onCreate }) {
	const vault = useVantage((s) => s.vault);
	const data = useVantage();
	const removeVault = useVantage((s) => s.removeVault);
	const [kind, setKind] = (0, import_react.useState)("all");
	const due = vaultDueSoon(data);
	const rows = (0, import_react.useMemo)(() => vault.filter((d) => kind === "all" || d.kind === kind), [vault, kind]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "metric-grid",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "metric-top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Documents" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "metric-value",
						children: vault.length
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "metric-top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Renewing in 45 days" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "metric-value",
						children: due.length
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "metric-top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Contracts" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "metric-value",
						children: vault.filter((d) => d.kind === "contract").length
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "metric-top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Policies" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "metric-value",
						children: vault.filter((d) => d.kind === "policy").length
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "toolbar",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "chip-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: kind === "all" ? "chip active" : "chip",
					onClick: () => setKind("all"),
					children: "All"
				}), VAULT_KINDS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: kind === item.id ? "chip active" : "chip",
					onClick: () => setKind(item.id),
					children: item.label
				}, item.id))]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "button-primary",
				onClick: onCreate,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), " File document"]
			})]
		}),
		rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "empty-icon",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { size: 20 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "The vault is empty." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "heading-note",
					children: "File constitutions, contracts, policies, and IP so renewals surface in the inbox."
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "vault-list",
			children: rows.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "vault-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: VAULT_KINDS.find((k) => k.id === doc.kind)?.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: doc.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [doc.counterparty || "Internal", doc.renewsOn ? ` · renews ${fmtDay(doc.renewsOn)}` : " · no renewal"] }),
					doc.extracted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "vault-extract",
						children: doc.extracted
					}) : null,
					doc.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: doc.notes }) : null
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "button-ghost",
					onClick: () => {
						removeVault(doc.id);
						toast.success("Removed from vault");
					},
					children: "Remove"
				})]
			}, doc.id))
		})
	] });
}
var STATUS = [
	{
		id: "active",
		label: "Active"
	},
	{
		id: "onboarding",
		label: "Onboarding"
	},
	{
		id: "contractor",
		label: "Contractor"
	}
];
function PeopleView({ onCreate }) {
	const team = useVantage((s) => s.team);
	const data = useVantage();
	const updateTeamMember = useVantage((s) => s.updateTeamMember);
	const removeTeamMember = useVantage((s) => s.removeTeamMember);
	const hours = hoursByPerson(data, data.range);
	const hoursFor = (name) => hours.find((h) => h.name === name)?.hours ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "toolbar",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "heading-note",
			style: { margin: 0 },
			children: "Roles, certifications, and onboarding. The people graph sits on the same master record as customers and cash."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "button-primary",
			onClick: onCreate,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), " Add person"]
		})]
	}), team.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "empty-icon",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, { size: 20 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "No people yet." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "heading-note",
				children: "Add the first operator, contractor, or hire."
			})
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "people-grid",
		children: team.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "panel person-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "person-head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "avatar avatar-blue",
						children: initials(person.name)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: person.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: person.role })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted-line",
					children: person.email
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "muted-line",
					children: [hoursFor(person.name), "h this period"]
				}),
				(person.certifications ?? []).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "related-stack",
					children: (person.certifications ?? []).map((cert) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "related-chip",
						children: cert
					}, cert))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: `st-${person.id}`,
						children: "Status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						id: `st-${person.id}`,
						value: person.status || "active",
						onChange: (e) => {
							updateTeamMember(person.id, { status: e.target.value });
							toast.success("Status updated");
						},
						children: STATUS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.id,
							children: s.label
						}, s.id))
					})]
				}),
				person.id !== "t_self" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "button-ghost",
					onClick: () => {
						removeTeamMember(person.id);
						toast.success("Person removed");
					},
					children: "Remove"
				})
			]
		}, person.id))
	})] });
}
var NAV = [
	{
		id: "overview",
		label: "Overview"
	},
	{
		id: "inbox",
		label: "Inbox"
	},
	{
		id: "launch",
		label: "Launch"
	},
	{
		id: "work",
		label: "Work"
	},
	{
		id: "pipeline",
		label: "Pipeline"
	},
	{
		id: "customers",
		label: "Customers"
	},
	{
		id: "finance",
		label: "Finance"
	},
	{
		id: "time",
		label: "Time"
	},
	{
		id: "calendar",
		label: "Calendar"
	},
	{
		id: "people",
		label: "People"
	},
	{
		id: "vault",
		label: "Vault"
	},
	{
		id: "compliance",
		label: "Compliance"
	},
	{
		id: "reports",
		label: "Reports"
	},
	{
		id: "settings",
		label: "Settings"
	}
];
function SearchPalette({ onClose }) {
	const [q, setQ] = (0, import_react.useState)("");
	const [sel, setSel] = (0, import_react.useState)(0);
	const inputRef = (0, import_react.useRef)(null);
	const setModule = useVantage((s) => s.setModule);
	const customers = useVantage((s) => s.customers);
	const work = useVantage((s) => s.work);
	const finance = useVantage((s) => s.finance);
	const events = useVantage((s) => s.events);
	const compliance = useVantage((s) => s.compliance);
	const deals = useVantage((s) => s.deals);
	const launchTasks = useVantage((s) => s.launchTasks);
	const vault = useVantage((s) => s.vault);
	const team = useVantage((s) => s.team);
	const hits = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		const go = (id) => {
			setModule(id);
			onClose();
		};
		const list = [];
		for (const n of NAV) if (!query || n.label.toLowerCase().includes(query)) list.push({
			key: `nav-${n.id}`,
			label: n.label,
			hint: "Go",
			run: () => go(n.id),
			icon: Search
		});
		const match = (s) => !query || s.toLowerCase().includes(query);
		for (const c of customers) if (match(c.name) || match(c.contact) || match(c.email)) list.push({
			key: c.id,
			label: c.name,
			hint: "Customer",
			run: () => go("customers"),
			icon: UsersRound
		});
		for (const w of work) if (match(w.title) || match(w.owner) || match(w.team)) list.push({
			key: w.id,
			label: w.title,
			hint: "Work",
			run: () => go("work"),
			icon: FolderKanban
		});
		for (const f of finance) if (match(f.title)) list.push({
			key: f.id,
			label: f.title,
			hint: "Finance",
			run: () => go("finance"),
			icon: WalletCards
		});
		for (const e of events) if (match(e.title) || match(e.location)) list.push({
			key: e.id,
			label: e.title,
			hint: "Calendar",
			run: () => go("calendar"),
			icon: CalendarDays
		});
		for (const c of compliance) if (match(c.title) || match(c.authority) || match(c.category)) list.push({
			key: c.id,
			label: c.title,
			hint: "Compliance",
			run: () => go("compliance"),
			icon: FileCheck2
		});
		for (const d of deals) if (match(d.title) || match(d.owner) || match(d.notes)) list.push({
			key: d.id,
			label: d.title,
			hint: "Deal",
			run: () => go("pipeline"),
			icon: Handshake
		});
		for (const t of launchTasks) if (match(t.title) || match(t.area) || match(t.owner)) list.push({
			key: t.id,
			label: t.title,
			hint: "Launch",
			run: () => go("launch"),
			icon: Rocket
		});
		for (const v of vault) if (match(v.title) || match(v.counterparty) || match(v.extracted)) list.push({
			key: v.id,
			label: v.title,
			hint: "Vault",
			run: () => go("vault"),
			icon: Archive
		});
		for (const p of team) if (match(p.name) || match(p.role) || match(p.email)) list.push({
			key: p.id,
			label: p.name,
			hint: "People",
			run: () => go("people"),
			icon: UsersRound
		});
		return list.slice(0, 18);
	}, [
		q,
		customers,
		work,
		finance,
		events,
		compliance,
		deals,
		launchTasks,
		vault,
		team,
		setModule,
		onClose
	]);
	(0, import_react.useEffect)(() => {
		inputRef.current?.focus();
	}, []);
	(0, import_react.useEffect)(() => {
		setSel(0);
	}, [q]);
	const onKey = (event) => {
		if (event.key === "ArrowDown") {
			event.preventDefault();
			setSel((i) => Math.min(i + 1, Math.max(hits.length - 1, 0)));
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			setSel((i) => Math.max(i - 1, 0));
		} else if (event.key === "Enter") {
			event.preventDefault();
			hits[sel]?.run();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "search-overlay",
		role: "presentation",
		onMouseDown: (event) => {
			if (event.target === event.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "search-panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Search",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "search-head",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 18 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: inputRef,
							value: q,
							onChange: (e) => setQ(e.target.value),
							onKeyDown: onKey,
							placeholder: "Search work, deals, customers, finance..."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							"aria-label": "Close search",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
						})
					]
				}),
				hits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "search-hint",
					children: "No matches. Try a customer, work item, or module name."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "search-group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Results" }), hits.map((hit, i) => {
						const Icon = hit.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "search-hit",
							"data-selected": i === sel,
							onMouseEnter: () => setSel(i),
							onClick: hit.run,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 15 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: hit.label }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: hit.hint })
							]
						}, hit.key);
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "search-hint",
					children: [
						"Press ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "ESC" }),
						" to close · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "↑" }),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "↓" }),
						" to move · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "Enter" }),
						" to open"
					]
				})
			]
		})
	});
}
var KINDS = [
	{
		id: "work",
		title: "Work item",
		note: "Start a project, task, or deliverable",
		icon: FolderKanban,
		module: "work"
	},
	{
		id: "deal",
		title: "Deal",
		note: "Track a lead through to won",
		icon: Handshake,
		module: "pipeline"
	},
	{
		id: "customer",
		title: "Customer",
		note: "Add a customer or prospect",
		icon: UsersRound,
		module: "customers"
	},
	{
		id: "person",
		title: "Person",
		note: "Add an operator, hire, or contractor",
		icon: UsersRound,
		module: "people"
	},
	{
		id: "event",
		title: "Calendar event",
		note: "Schedule time with your team",
		icon: CalendarDays,
		module: "calendar"
	},
	{
		id: "finance",
		title: "Finance record",
		note: "Log an invoice, payment, or expense",
		icon: WalletCards,
		module: "finance"
	},
	{
		id: "launch",
		title: "Setup item",
		note: "Track a registration, policy, or system",
		icon: Rocket,
		module: "launch"
	},
	{
		id: "vault",
		title: "Vault document",
		note: "File a contract, policy, or licence",
		icon: Archive,
		module: "vault"
	},
	{
		id: "compliance",
		title: "Compliance item",
		note: "Track a registration, licence, or control",
		icon: FileCheck2,
		module: "compliance"
	}
];
function CreateDialog({ onClose, initial }) {
	const [kind, setKind] = (0, import_react.useState)(initial ?? null);
	const customers = useVantage((s) => s.customers);
	const addWork = useVantage((s) => s.addWork);
	const addCustomer = useVantage((s) => s.addCustomer);
	const addEvent = useVantage((s) => s.addEvent);
	const addFinance = useVantage((s) => s.addFinance);
	const addCompliance = useVantage((s) => s.addCompliance);
	const addDeal = useVantage((s) => s.addDeal);
	const addLaunch = useVantage((s) => s.addLaunch);
	const addVault = useVantage((s) => s.addVault);
	const addTeamMember = useVantage((s) => s.addTeamMember);
	const setModule = useVantage((s) => s.setModule);
	const profile = useVantage((s) => s.profile);
	const finish = (module, label) => {
		setModule(module);
		toast.success(`${label} created`);
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "dialog-backdrop",
		onMouseDown: (event) => {
			if (event.target === event.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "create-dialog wide",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "create-title",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dialog-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "panel-kicker",
						children: "Quick action"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "create-title",
						children: kind ? `New ${KINDS.find((k) => k.id === kind)?.title}` : "Create something new"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "icon-button",
						onClick: onClose,
						"aria-label": "Close create dialog",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})]
				}),
				!kind && KINDS.map((item) => {
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "create-option",
						onClick: () => setKind(item.id),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.note })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 })
						]
					}, item.id);
				}),
				kind === "work" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "form-grid two",
					onSubmit: (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						const title = String(fd.get("title") || "").trim();
						if (!title) return;
						addWork({
							title,
							team: String(fd.get("team") || "Delivery · Internal"),
							customerId: String(fd.get("customerId") || "") || void 0,
							status: "scheduled",
							priority: String(fd.get("priority") || "medium"),
							due: String(fd.get("due") || todayIso()),
							owner: String(fd.get("owner") || profile.name),
							notes: String(fd.get("notes") || "")
						});
						finish("work", title);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "w-title",
								children: "Title"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "w-title",
								name: "title",
								required: true,
								placeholder: "Name the work"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "w-due",
								children: "Due"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "w-due",
								name: "due",
								type: "date",
								defaultValue: todayIso()
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "w-prio",
								children: "Priority"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "w-prio",
								name: "priority",
								defaultValue: "medium",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "high",
										children: "High"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "medium",
										children: "Medium"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "low",
										children: "Low"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "w-team",
								children: "Team"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "w-team",
								name: "team",
								defaultValue: "Delivery · Internal"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "w-owner",
								children: "Owner"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "w-owner",
								name: "owner",
								defaultValue: profile.name
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "w-cus",
								children: "Customer"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "w-cus",
								name: "customerId",
								defaultValue: "",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Internal"
								}), customers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.id,
									children: c.name
								}, c.id))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "w-notes",
								children: "Notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "w-notes",
								name: "notes",
								rows: 3
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dialog-actions full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "button-ghost",
								onClick: () => setKind(null),
								children: "Back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "button-primary",
								type: "submit",
								children: "Create work"
							})]
						})
					]
				}),
				kind === "customer" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "form-grid two",
					onSubmit: (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						const name = String(fd.get("name") || "").trim();
						if (!name) return;
						addCustomer({
							name,
							contact: String(fd.get("contact") || ""),
							email: String(fd.get("email") || ""),
							status: "prospect",
							value: Number(fd.get("value") || 0),
							industry: String(fd.get("industry") || "Professional services"),
							location: String(fd.get("location") || "Perth, WA"),
							notes: String(fd.get("notes") || "")
						});
						finish("customers", name);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "c-name",
								children: "Business name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "c-name",
								name: "name",
								required: true,
								placeholder: "Harbour Dental Group"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "c-contact",
								children: "Contact"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "c-contact",
								name: "contact"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "c-email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "c-email",
								name: "email",
								type: "email"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "c-ind",
								children: "Industry"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "c-ind",
								name: "industry",
								defaultValue: "Professional services"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "c-loc",
								children: "Location"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "c-loc",
								name: "location",
								defaultValue: "Perth, WA"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "c-val",
								children: "Estimated annual value (AUD)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "c-val",
								name: "value",
								type: "number",
								min: 0,
								step: 100,
								defaultValue: 0
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "c-notes",
								children: "Notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "c-notes",
								name: "notes",
								rows: 3
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dialog-actions full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "button-ghost",
								onClick: () => setKind(null),
								children: "Back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "button-primary",
								type: "submit",
								children: "Add customer"
							})]
						})
					]
				}),
				kind === "event" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "form-grid two",
					onSubmit: (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						const title = String(fd.get("title") || "").trim();
						if (!title) return;
						addEvent({
							title,
							date: String(fd.get("date") || todayIso()),
							time: String(fd.get("time") || "09:00"),
							kind: String(fd.get("kind") || "internal"),
							location: String(fd.get("location") || "")
						});
						finish("calendar", title);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "e-title",
								children: "Title"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "e-title",
								name: "title",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "e-date",
								children: "Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "e-date",
								name: "date",
								type: "date",
								defaultValue: todayIso()
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "e-time",
								children: "Time"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "e-time",
								name: "time",
								type: "time",
								defaultValue: "09:00"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "e-kind",
								children: "Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "e-kind",
								name: "kind",
								defaultValue: "internal",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "internal",
									children: "Internal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "external",
									children: "External"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "e-loc",
								children: "Location"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "e-loc",
								name: "location",
								placeholder: "Studio or video"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dialog-actions full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "button-ghost",
								onClick: () => setKind(null),
								children: "Back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "button-primary",
								type: "submit",
								children: "Schedule"
							})]
						})
					]
				}),
				kind === "finance" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "form-grid two",
					onSubmit: (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						const title = String(fd.get("title") || "").trim();
						if (!title) return;
						const amount = Number(fd.get("amount"));
						if (!Number.isFinite(amount) || amount < 0) return;
						addFinance({
							title,
							type: String(fd.get("type") || "invoice"),
							customerId: String(fd.get("customerId") || "") || void 0,
							amount,
							status: String(fd.get("status") || "outstanding"),
							date: String(fd.get("date") || todayIso())
						});
						finish("finance", title);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "f-title",
								children: "Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "f-title",
								name: "title",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "f-type",
								children: "Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "f-type",
								name: "type",
								defaultValue: "invoice",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "invoice",
										children: "Invoice"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "payment",
										children: "Payment"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "expense",
										children: "Expense"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "f-amt",
								children: "Amount (AUD)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "f-amt",
								name: "amount",
								type: "number",
								min: 0,
								step: 50,
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "f-status",
								children: "Status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "f-status",
								name: "status",
								defaultValue: "outstanding",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "draft",
										children: "Draft"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "outstanding",
										children: "Outstanding"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "paid",
										children: "Paid"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "overdue",
										children: "Overdue"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "f-date",
								children: "Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "f-date",
								name: "date",
								type: "date",
								defaultValue: todayIso()
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "f-cus",
								children: "Customer"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "f-cus",
								name: "customerId",
								defaultValue: "",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "None"
								}), customers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.id,
									children: c.name
								}, c.id))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dialog-actions full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "button-ghost",
								onClick: () => setKind(null),
								children: "Back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "button-primary",
								type: "submit",
								children: "Log record"
							})]
						})
					]
				}),
				kind === "compliance" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "form-grid two",
					onSubmit: (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						const title = String(fd.get("title") || "").trim();
						if (!title) return;
						addCompliance({
							title,
							category: String(fd.get("category") || "Registration"),
							authority: String(fd.get("authority") || "ASIC"),
							jurisdiction: String(fd.get("jurisdiction") || "Commonwealth"),
							status: "Due soon",
							due: String(fd.get("due") || todayIso()),
							owner: String(fd.get("owner") || profile.name),
							evidence: false,
							source: String(fd.get("source") || "https://business.gov.au/")
						});
						finish("compliance", title);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "k-title",
								children: "Obligation"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "k-title",
								name: "title",
								required: true,
								placeholder: "Licence, registration, or control"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "k-cat",
								children: "Category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "k-cat",
								name: "category",
								defaultValue: "Registration"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "k-auth",
								children: "Authority"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "k-auth",
								name: "authority",
								defaultValue: "ASIC"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "k-jur",
								children: "Jurisdiction"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "k-jur",
								name: "jurisdiction",
								defaultValue: "Western Australia"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "k-due",
								children: "Due"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "k-due",
								name: "due",
								type: "date",
								defaultValue: todayIso()
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "k-src",
								children: "Official source URL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "k-src",
								name: "source",
								defaultValue: "https://business.gov.au/"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dialog-actions full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "button-ghost",
								onClick: () => setKind(null),
								children: "Back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "button-primary",
								type: "submit",
								children: "Track obligation"
							})]
						})
					]
				}),
				kind === "deal" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "form-grid two",
					onSubmit: (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						const title = String(fd.get("title") || "").trim();
						if (!title) return;
						addDeal({
							title,
							customerId: String(fd.get("customerId") || "") || void 0,
							stage: "lead",
							value: Number(fd.get("value") || 0),
							owner: String(fd.get("owner") || profile.name),
							closeDate: String(fd.get("closeDate") || todayIso()),
							notes: String(fd.get("notes") || "")
						});
						finish("pipeline", title);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "d-title",
								children: "Deal name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "d-title",
								name: "title",
								required: true,
								placeholder: "Karratha operations retainer"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "d-val",
								children: "Value (AUD)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "d-val",
								name: "value",
								type: "number",
								min: 0,
								step: 100,
								defaultValue: 0
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "d-close",
								children: "Expected close"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "d-close",
								name: "closeDate",
								type: "date",
								defaultValue: todayIso()
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "d-owner",
								children: "Owner"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "d-owner",
								name: "owner",
								defaultValue: profile.name
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "d-cus",
								children: "Customer"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "d-cus",
								name: "customerId",
								defaultValue: "",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "No account yet"
								}), customers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.id,
									children: c.name
								}, c.id))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "d-notes",
								children: "Notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "d-notes",
								name: "notes",
								rows: 3
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dialog-actions full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "button-ghost",
								onClick: () => setKind(null),
								children: "Back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "button-primary",
								type: "submit",
								children: "Open deal"
							})]
						})
					]
				}),
				kind === "launch" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "form-grid two",
					onSubmit: (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						const title = String(fd.get("title") || "").trim();
						if (!title) return;
						addLaunch({
							title,
							area: String(fd.get("area") || "identity"),
							stage: String(fd.get("stage") || "start"),
							done: false,
							due: String(fd.get("due") || todayIso()),
							owner: String(fd.get("owner") || profile.name),
							notes: String(fd.get("notes") || "")
						});
						finish("launch", title);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "ln-title",
								children: "Setup item"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "ln-title",
								name: "title",
								required: true,
								placeholder: "ABN registered"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "ln-area",
								children: "Area"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "ln-area",
								name: "area",
								defaultValue: "identity",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "identity",
										children: "Identity"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "legal",
										children: "Legal"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "finance",
										children: "Finance"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "insurance",
										children: "Insurance"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "brand",
										children: "Brand"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "digital",
										children: "Digital"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "ln-stage",
								children: "Stage"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "ln-stage",
								name: "stage",
								defaultValue: "start",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "idea",
										children: "Idea"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "start",
										children: "Start"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "run",
										children: "Run"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "grow",
										children: "Grow"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "transform",
										children: "Transform"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "exit",
										children: "Exit"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "ln-due",
								children: "Due"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "ln-due",
								name: "due",
								type: "date",
								defaultValue: todayIso()
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "ln-owner",
								children: "Owner"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "ln-owner",
								name: "owner",
								defaultValue: profile.name
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "ln-notes",
								children: "Notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "ln-notes",
								name: "notes",
								rows: 2
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dialog-actions full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "button-ghost",
								onClick: () => setKind(null),
								children: "Back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "button-primary",
								type: "submit",
								children: "Track item"
							})]
						})
					]
				}),
				kind === "vault" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "form-grid two",
					onSubmit: (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						const title = String(fd.get("title") || "").trim();
						if (!title) return;
						addVault({
							title,
							kind: String(fd.get("kind") || "contract"),
							renewsOn: String(fd.get("renewsOn") || ""),
							counterparty: String(fd.get("counterparty") || ""),
							extracted: String(fd.get("extracted") || ""),
							notes: String(fd.get("notes") || "")
						});
						finish("vault", title);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "v-title",
								children: "Document"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "v-title",
								name: "title",
								required: true,
								placeholder: "Professional indemnity policy"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "v-kind",
								children: "Kind"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "v-kind",
								name: "kind",
								defaultValue: "contract",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "contract",
										children: "Contract"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "policy",
										children: "Policy"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "licence",
										children: "Licence"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "corporate",
										children: "Corporate"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "ip",
										children: "IP"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "other",
										children: "Other"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "v-renew",
								children: "Renews"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "v-renew",
								name: "renewsOn",
								type: "date"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "v-party",
								children: "Counterparty"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "v-party",
								name: "counterparty"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "v-ext",
								children: "Extracted terms"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "v-ext",
								name: "extracted",
								rows: 2,
								placeholder: "Limits, notice periods, key clauses"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dialog-actions full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "button-ghost",
								onClick: () => setKind(null),
								children: "Back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "button-primary",
								type: "submit",
								children: "File in vault"
							})]
						})
					]
				}),
				kind === "person" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "form-grid two",
					onSubmit: (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						const name = String(fd.get("name") || "").trim();
						if (!name) return;
						addTeamMember({
							name,
							role: String(fd.get("role") || "Operator"),
							email: String(fd.get("email") || ""),
							status: String(fd.get("status") || "active"),
							certifications: String(fd.get("certs") || "").split(",").map((s) => s.trim()).filter(Boolean),
							startedAt: String(fd.get("startedAt") || todayIso())
						});
						finish("people", name);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "pe-name",
								children: "Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "pe-name",
								name: "name",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "pe-role",
								children: "Role"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "pe-role",
								name: "role",
								defaultValue: "Operator"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "pe-email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "pe-email",
								name: "email",
								type: "email"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "pe-st",
								children: "Status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "pe-st",
								name: "status",
								defaultValue: "active",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "active",
										children: "Active"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "onboarding",
										children: "Onboarding"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "contractor",
										children: "Contractor"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "pe-start",
								children: "Started"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "pe-start",
								name: "startedAt",
								type: "date",
								defaultValue: todayIso()
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "pe-certs",
								children: "Certifications (comma separated)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "pe-certs",
								name: "certs",
								placeholder: "GAICD, PMP"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dialog-actions full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "button-ghost",
								onClick: () => setKind(null),
								children: "Back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "button-primary",
								type: "submit",
								children: "Add person"
							})]
						})
					]
				})
			]
		})
	});
}
var MODULES = [
	{
		id: "overview",
		label: "Overview",
		icon: LayoutDashboard
	},
	{
		id: "inbox",
		label: "Inbox",
		icon: Inbox
	},
	{
		id: "launch",
		label: "Launch",
		icon: Rocket
	},
	{
		id: "work",
		label: "Work",
		icon: FolderKanban
	},
	{
		id: "pipeline",
		label: "Pipeline",
		icon: Handshake
	},
	{
		id: "customers",
		label: "Customers",
		icon: UsersRound
	},
	{
		id: "finance",
		label: "Finance",
		icon: WalletCards
	}
];
var RECORD_MODULES = [
	{
		id: "time",
		label: "Time",
		icon: Clock3
	},
	{
		id: "calendar",
		label: "Calendar",
		icon: CalendarDays
	},
	{
		id: "people",
		label: "People",
		icon: UsersRound
	},
	{
		id: "vault",
		label: "Vault",
		icon: Archive
	},
	{
		id: "compliance",
		label: "Compliance",
		icon: FileCheck2
	}
];
var ALL_MODULES = [...MODULES, ...RECORD_MODULES];
var RANGE_OPTIONS = [
	{
		id: "30d",
		label: "Last 30 days"
	},
	{
		id: "7d",
		label: "Last 7 days"
	},
	{
		id: "quarter",
		label: "This quarter"
	}
];
var subscribeToNothing = () => () => {};
function VantageApp() {
	const { user, isPending } = useCurrentUserState();
	const hydrated = useVantage((s) => s.hydrated);
	(0, import_react.useEffect)(() => {
		if (!user) {
			useVantage.getState().resetSession();
			document.documentElement.dataset.theme = "light";
			return;
		}
		let cancelled = false;
		useVantage.getState().resetSession();
		loadWorkspace().then((data) => {
			if (!cancelled) useVantage.getState().hydrateFromServer(data);
		}).catch(() => {
			if (!cancelled) useVantage.getState().setHydrated();
		});
		return () => {
			cancelled = true;
		};
	}, [user?.id]);
	if (isPending || user && !hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceSkeleton, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workspace, {});
}
function WorkspaceSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "vantage-app boot-shell",
		"aria-busy": "true",
		"aria-label": "Loading workspace",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "sidebar",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "brand-lockup",
					"aria-label": "cdxi vantage",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VantageMarkMono, { className: "brand-mark" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "cdxi",
							children: "cdxi"
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "|" }),
						" vantage"
					] }) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "boot-pulse" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "boot-pulse" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "boot-pulse" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "workspace-shell",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "topbar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mobile-brand",
						"aria-label": "cdxi vantage",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VantageMark, { className: "brand-mark" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "cdxi",
								children: "cdxi"
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "|" }),
							" vantage"
						] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "boot-pulse boot-pulse-wide" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "boot-pulse boot-pulse-wide" })
			]
		})]
	});
}
function Workspace() {
	const data = useVantage();
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [notifyOpen, setNotifyOpen] = (0, import_react.useState)(false);
	const [mobileMenuOpen, setMobileMenuOpen] = (0, import_react.useState)(false);
	const [showSearch, setShowSearch] = (0, import_react.useState)(false);
	const [showCreate, setShowCreate] = (0, import_react.useState)(false);
	const [createKind, setCreateKind] = (0, import_react.useState)(null);
	const [showHelp, setShowHelp] = (0, import_react.useState)(false);
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, () => false);
	const openCount = openWork(data).length;
	const complianceBadge = data.compliance.filter((c) => c.status !== "Up to date").length;
	const pipelineBadge = openDeals(data).length;
	const launchBadge = openLaunch(data).length;
	const vaultBadge = vaultDueSoon(data).length;
	const notes = notifications(data);
	const attention = attentionCount(data);
	const activeLabel = ALL_MODULES.find((m) => m.id === data.module)?.label ?? (data.module === "reports" ? "Reports" : "Settings");
	const badges = (0, import_react.useMemo)(() => ({
		work: openCount,
		compliance: complianceBadge,
		inbox: attention,
		pipeline: pipelineBadge,
		launch: launchBadge,
		vault: vaultBadge
	}), [
		openCount,
		complianceBadge,
		attention,
		pipelineBadge,
		launchBadge,
		vaultBadge
	]);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.key === "Escape") {
				setShowSearch(false);
				setMenuOpen(false);
				setNotifyOpen(false);
				setMobileMenuOpen(false);
				setShowCreate(false);
				setShowHelp(false);
			}
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				setShowSearch(true);
			}
			const target = event.target;
			const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable);
			if (!typing && event.key.toLowerCase() === "c" && !event.metaKey && !event.ctrlKey) {
				event.preventDefault();
				setShowCreate(true);
			}
			if (!typing && event.key === "?") {
				event.preventDefault();
				setShowHelp((v) => !v);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.dataset.theme = data.theme || "light";
	}, [data.theme]);
	(0, import_react.useEffect)(() => {
		if (!data.hydrated) return;
		let timer = 0;
		const unsub = useVantage.subscribe((state) => {
			if (!state.hydrated) return;
			window.clearTimeout(timer);
			timer = window.setTimeout(() => {
				saveWorkspace({ data: workspacePayload(state) });
			}, 450);
		});
		return () => {
			unsub();
			window.clearTimeout(timer);
		};
	}, [data.hydrated]);
	const leave = () => {
		if (gateSession || signingOut) return;
		setSigningOut(true);
		signOut("/").catch(() => setSigningOut(false));
	};
	const navigate = (id) => {
		data.setModule(id);
		setMobileMenuOpen(false);
		setMenuOpen(false);
		setNotifyOpen(false);
	};
	const openCreate = (kind) => {
		setCreateKind(kind ?? null);
		setShowCreate(true);
	};
	const heading = data.module === "overview" ? greeting(data.profile.name) : data.module === "inbox" ? "Today's inbox" : data.module === "time" ? "Timesheet" : data.module === "launch" ? "Launch centre" : data.module === "vault" ? "Business vault" : data.module === "people" ? "People" : activeLabel;
	const note = data.module === "overview" ? "The operating system for this business — not another tool in the stack." : data.module === "inbox" ? "Clear what needs a decision, then get back to the work." : data.module === "pipeline" ? "Move value from lead to won." : data.module === "time" ? "Log hours against live work, or start a timer." : data.module === "launch" ? "Setup autopilot: identity, legal, insurance, brand, and systems." : data.module === "vault" ? "Contracts, policies, IP, and the dates that must not slip." : data.module === "people" ? "Roles, certifications, and who is onboarding." : data.module === "reports" ? "Numbers plus a hand-over-ready Business Passport." : `Review and manage your ${activeLabel.toLowerCase()} workspace.`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: `vantage-app theme-${data.theme || "light"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "bottom-right",
				richColors: true,
				closeButton: true,
				theme: data.theme === "dark" ? "dark" : "light"
			}),
			mobileMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sidebar-scrim",
				onClick: () => setMobileMenuOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `sidebar ${mobileMenuOpen ? "sidebar-open" : ""}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "brand-lockup",
						"aria-label": "cdxi vantage",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VantageMarkMono, { className: "brand-mark" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "cdxi",
								children: "cdxi"
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "|" }),
							" vantage"
						] }) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "workspace-switcher",
						onClick: () => navigate("settings"),
						"aria-label": "Open workspace settings",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "workspace-avatar",
								children: data.workspaceName.slice(0, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "workspace-name",
								children: data.workspaceName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 14 })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "primary-nav",
						"aria-label": "Primary navigation",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "nav-label",
								children: "Workspace"
							}),
							MODULES.map((module) => {
								const Icon = module.icon;
								const isActive = data.module === module.id;
								const badge = module.id === "inbox" ? badges.inbox : module.id === "work" ? badges.work : module.id === "pipeline" ? badges.pipeline : module.id === "launch" ? badges.launch : 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: `nav-item ${isActive ? "active" : ""}`,
									"data-module": module.id,
									onClick: () => navigate(module.id),
									"aria-current": isActive ? "page" : void 0,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											size: 17,
											strokeWidth: 1.8
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: module.label }),
										badge > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: badge })
									]
								}, module.id);
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "nav-label second",
								children: "Record"
							}),
							RECORD_MODULES.map((module) => {
								const Icon = module.icon;
								const isActive = data.module === module.id;
								const badge = module.id === "compliance" ? badges.compliance : module.id === "vault" ? badges.vault : 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: `nav-item ${isActive ? "active" : ""}`,
									"data-module": module.id,
									onClick: () => navigate(module.id),
									"aria-current": isActive ? "page" : void 0,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											size: 17,
											strokeWidth: 1.8
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: module.label }),
										badge > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: badge })
									]
								}, module.id);
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "nav-label second",
								children: "Manage"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: `nav-item ${data.module === "reports" ? "active" : ""}`,
								"data-module": "reports",
								onClick: () => navigate("reports"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
									size: 17,
									strokeWidth: 1.8
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reports" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: `nav-item ${data.module === "settings" ? "active" : ""}`,
								"data-module": "settings",
								onClick: () => navigate("settings"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, {
									size: 17,
									strokeWidth: 1.8
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Settings" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sidebar-bottom",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "help-link",
							onClick: () => setShowHelp(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Shortcuts" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "user-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "avatar avatar-blue",
									children: data.profile.initials
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data.profile.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data.profile.role })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "sidebar-more",
									"aria-label": "Open account menu",
									onClick: () => setMenuOpen((v) => !v),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { size: 17 })
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "workspace-shell",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "topbar",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mobile-brand",
								"aria-label": "cdxi vantage",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VantageMark, { className: "brand-mark" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "cdxi",
										children: "cdxi"
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "|" }),
									" vantage"
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "breadcrumbs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data.workspaceName }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "slash",
										children: "/"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: activeLabel })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "topbar-actions",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "icon-button mobile-menu",
										onClick: () => setMobileMenuOpen((v) => !v),
										"aria-label": mobileMenuOpen ? "Close menu" : "Open menu",
										children: mobileMenuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 19 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 19 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "search-button",
										onClick: () => setShowSearch(true),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 17 }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Search anything" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("kbd", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, { size: 11 }), " K"] })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerChip, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "icon-button theme-button",
										onClick: () => data.setTheme(data.theme === "dark" ? "light" : "dark"),
										"aria-label": data.theme === "dark" ? "Switch to paper theme" : "Switch to night theme",
										children: data.theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { size: 18 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "icon-button",
										onClick: () => {
											setNotifyOpen((v) => !v);
											setMenuOpen(false);
										},
										"aria-label": "Notifications",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { size: 18 }), attention > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "profile-button",
										onClick: () => {
											setMenuOpen((v) => !v);
											setNotifyOpen(false);
										},
										"aria-expanded": menuOpen,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "avatar avatar-blue",
											children: data.profile.initials
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 14 })]
									}),
									menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "profile-menu",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data.profile.name }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data.profile.email }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => navigate("settings"),
												children: "Account settings"
											}),
											!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: leave,
												disabled: signingOut,
												children: signingOut ? "Signing out…" : "Sign out"
											})
										]
									}),
									notifyOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "notify-menu",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Needs attention" }),
											notes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "notify-empty",
												children: "You are clear for now."
											}),
											notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												className: "notify-item",
												onClick: () => navigate(n.module),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: n.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n.detail })]
											}, n.id))
										]
									})
								]
							})
						]
					}),
					showSearch && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchPalette, { onClose: () => setShowSearch(false) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "content",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "page-heading",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "eyebrow",
										children: [
											headingDate(),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "live-dot" }),
											" Live workspace"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: heading }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "heading-note",
										children: note
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "heading-actions",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: data.range,
										onChange: (e) => data.setRange(e.target.value),
										"aria-label": "Date range",
										children: RANGE_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: opt.id,
											children: opt.label
										}, opt.id))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "button-primary",
										onClick: () => openCreate(),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 17 }), " Create new"]
									})]
								})]
							}),
							data.noticeVisible && data.module === "overview" && attention > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "notice",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "notice-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { size: 17 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Your week at a glance" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										attention,
										" ",
										attention === 1 ? "priority needs" : "priorities need",
										" attention before Friday."
									] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "notice-link",
										onClick: () => navigate("inbox"),
										children: "Open inbox"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "notice-close",
										onClick: data.dismissNotice,
										"aria-label": "Dismiss",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 15 })
									})
								]
							}),
							data.module === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, { onCreate: () => openCreate() }),
							data.module === "inbox" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InboxView, {}),
							data.module === "launch" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LaunchCentre, { onCreate: () => openCreate("launch") }),
							data.module === "work" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkBoard, { onCreate: () => openCreate("work") }),
							data.module === "pipeline" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PipelineView, { onCreate: () => openCreate("deal") }),
							data.module === "customers" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomersView, { onCreate: () => openCreate("customer") }),
							data.module === "finance" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceView, { onCreate: () => openCreate("finance") }),
							data.module === "time" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimesheetView, {}),
							data.module === "calendar" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarView, { onCreate: () => openCreate("event") }),
							data.module === "people" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeopleView, { onCreate: () => openCreate("person") }),
							data.module === "vault" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VaultView, { onCreate: () => openCreate("vault") }),
							data.module === "compliance" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplianceWorkspace, { onCreate: () => openCreate("compliance") }),
							data.module === "reports" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportsView, {}),
							data.module === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsView, {}),
							!data.tourDone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceGuide, { onCreate: () => openCreate() }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
								className: "footer",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "cdxi | vantage" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Build it. Run it. Grow it. Exit it." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										data.workspaceName,
										" · ",
										rangeLabel(data.range)
									] })
								]
							})
						]
					}),
					showCreate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateDialog, {
						initial: createKind,
						onClose: () => {
							setShowCreate(false);
							setCreateKind(null);
						}
					}),
					showHelp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dialog-backdrop",
						onMouseDown: (e) => {
							if (e.target === e.currentTarget) setShowHelp(false);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "create-dialog",
							role: "dialog",
							"aria-modal": "true",
							"aria-labelledby": "shortcuts-title",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "dialog-header",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "panel-kicker",
										children: "Keyboard"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										id: "shortcuts-title",
										children: "Shortcuts"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "icon-button",
										onClick: () => setShowHelp(false),
										"aria-label": "Close shortcuts",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "shortcut-list",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("kbd", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, { size: 11 }), " K"] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Search anything" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "C" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Create new" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "?" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Show shortcuts" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "Esc" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Close overlay" })] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "dialog-actions",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "button-primary",
										onClick: () => {
											data.setTourDone(false);
											setShowHelp(false);
										},
										children: "Take the tour"
									})
								})
							]
						})
					})
				]
			})
		]
	});
}
function TimerChip() {
	const timer = useVantage((s) => s.timer);
	const work = useVantage((s) => s.work);
	const stopTimer = useVantage((s) => s.stopTimer);
	const setModule = useVantage((s) => s.setModule);
	const [, setTick] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!timer) return;
		const id = window.setInterval(() => setTick((n) => n + 1), 1e3);
		return () => window.clearInterval(id);
	}, [timer]);
	if (!timer) return null;
	const item = work.find((w) => w.id === timer.workId);
	const elapsed = Date.now() - new Date(timer.startedAt).getTime();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "timer-chip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "timer-label",
			onClick: () => setModule("time"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 14 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDuration(elapsed) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item?.title ?? "Timer" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "icon-button",
			"aria-label": "Stop timer",
			onClick: () => {
				const result = stopTimer();
				if (result && result.hours >= .25) toast.success(`Logged ${result.hours}h on ${result.title}`);
				else toast("Timer stopped");
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { size: 14 })
		})]
	});
}
var STAGES = [
	"Idea",
	"Start",
	"Run",
	"Grow",
	"Transform",
	"Exit"
];
var FEATURES = [
	{
		icon: Rocket,
		title: "Launch",
		copy: "Stand up the entity, registrations, and first operating checklist without a tangle of tabs."
	},
	{
		icon: Handshake,
		title: "Pipeline",
		copy: "Move work from lead to won, with value and follow-up sitting next to the people who own it."
	},
	{
		icon: FolderKanban,
		title: "Work",
		copy: "Boards, checklists, and hours in one place so delivery stays visible as the firm scales."
	},
	{
		icon: Clock3,
		title: "Time",
		copy: "Log the week, start a live timer, and keep utilisation honest against live jobs."
	},
	{
		icon: Archive,
		title: "Vault",
		copy: "Contracts, licences, and policies stay with the workspace — ready for diligence or a sale."
	},
	{
		icon: FileCheck2,
		title: "Compliance",
		copy: "ASIC, BAS, and lodgement dates surface before they become a scramble."
	}
];
function LandingPage() {
	(0, import_react.useLayoutEffect)(() => {
		document.documentElement.dataset.theme = "light";
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "land",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "land-nav",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "land-brand",
					"aria-label": "cdxi vantage home",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VantageLockup, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "land-nav-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "button-ghost",
						children: "Sign in"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/signup",
						className: "button-primary",
						children: "Create workspace"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "land-hero",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "The business operating platform"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Build it. Run it. Grow it. Exit it." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "land-lede",
							children: "One workspace for how a professional-services firm actually operates — pipeline, delivery, time, records, and compliance — in view."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "land-hero-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/signup",
								className: "button-primary",
								children: "Create your workspace"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "button-ghost",
								children: "Sign in or try a demo"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "land-stages",
							"aria-label": "Business lifecycle",
							children: STAGES.map((stage, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(i + 1).padStart(2, "0") }), stage] }, stage))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "land-preview",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "land-preview-frame",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "land-preview-bar",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Northline Advisory" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Live workspace" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "land-preview-metrics",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pipeline" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "$186k" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open work" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "12" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hours this week" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "41.5" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Attention" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "6" })] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "land-preview-board",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Proposal" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Karratha ops advisory" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Harbour Dental onboarding" })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "In progress" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Q3 executive review" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Westport extra capacity" })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Needs review" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "BAS Q1 lodgement" })] })
								]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "land-features",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "In the operating view"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Everything that used to live in twelve tools." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "land-feature-grid",
							children: FEATURES.map((feature) => {
								const Icon = feature.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "land-feature-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											size: 18,
											strokeWidth: 1.8
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: feature.title }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: feature.copy })
								] }, feature.title);
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "land-brief",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
						size: 18,
						strokeWidth: 1.8
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "A weekly operating brief, on demand." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ask Grok for the week’s priorities, risks, and next move from the live workspace — not a separate slide deck." })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "land-close",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Start a workspace in a minute." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your own empty operating view, or sign in to the Northline Advisory demo." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "land-hero-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/signup",
								className: "button-primary",
								children: "Create workspace"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "button-ghost",
								children: "Sign in"
							})]
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "land-foot",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "cdxi",
					children: "cdxi"
				}), " vantage"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "The business operating platform" })]
			})
		]
	});
}
function Home() {
	const { sessionUser } = Route$3.useRouteContext();
	const { user, isPending } = useCurrentUserState();
	if (user || sessionUser && isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VantageApp, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingPage, {});
}
//#endregion
export { Home as component };
