export type ModuleId =
  | "overview"
  | "inbox"
  | "launch"
  | "work"
  | "pipeline"
  | "customers"
  | "finance"
  | "time"
  | "calendar"
  | "people"
  | "vault"
  | "compliance"
  | "reports"
  | "settings";

export type RangeId = "7d" | "30d" | "quarter";
export type WorkStatus = "on-hold" | "scheduled" | "in-progress" | "needs-review" | "done";
export type WorkPriority = "low" | "medium" | "high";
export type CustomerStatus = "active" | "prospect" | "inactive";
export type FinanceType = "invoice" | "payment" | "expense";
export type FinanceStatus = "paid" | "outstanding" | "overdue" | "draft";
export type EventKind = "internal" | "external";
export type ComplianceStatus = "Urgent" | "Due soon" | "Up to date";
export type PortalId = "mygov" | "asic" | "abr" | "ato";
export type LedgerId = "xero" | "myob" | "quickbooks" | "reckon";
export type AccountantEngagement = "bas" | "tax" | "advisory" | "full";
export type AvatarColor = "blue" | "coral" | "violet";
export type CreateKind = "work" | "customer" | "event" | "finance" | "compliance" | "deal" | "launch" | "vault" | "person";
export type InboxKind = "work" | "finance" | "compliance" | "followup" | "event" | "deal" | "launch" | "vault";
export type DealStage = "lead" | "qualified" | "proposal" | "won" | "lost";
export type ThemeId = "light" | "dark";

export type LifecycleStage = "idea" | "start" | "run" | "grow" | "transform" | "exit";
export type EntityType = "sole-trader" | "partnership" | "pty-ltd" | "trust" | "other";
export type LaunchArea = "identity" | "legal" | "finance" | "insurance" | "brand" | "digital";
export type VaultKind = "contract" | "policy" | "licence" | "corporate" | "ip" | "other";
export type PersonStatus = "active" | "onboarding" | "contractor";
export type OfferingKind = "service" | "subscription" | "product";
export type AiAgentId = "ceo" | "cfo" | "coo" | "cmo" | "legal" | "assist";
export type AiCapability = "observe" | "recommend" | "prepare";
export type LinkedSystemId = "hubspot" | "stripe" | "microsoft";

export type WorkCheck = {
  id: string;
  title: string;
  done: boolean;
};

export type WorkItem = {
  id: string;
  title: string;
  team: string;
  customerId?: string;
  status: WorkStatus;
  priority: WorkPriority;
  due: string;
  owner: string;
  notes: string;
  createdAt: string;
  hours: number;
  checklist: WorkCheck[];
};

export type Customer = {
  id: string;
  name: string;
  contact: string;
  email: string;
  status: CustomerStatus;
  value: number;
  industry: string;
  location: string;
  notes: string;
  followUp: string;
};

export type FinanceRecord = {
  id: string;
  type: FinanceType;
  customerId?: string;
  title: string;
  amount: number;
  gst: number;
  status: FinanceStatus;
  date: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  kind: EventKind;
  location: string;
  relatedWorkId?: string;
};

export type ComplianceRecord = {
  id: string;
  title: string;
  category: string;
  authority: string;
  jurisdiction: string;
  status: ComplianceStatus;
  due: string;
  owner: string;
  evidence: boolean;
  source: string;
};

export type ActivityItem = {
  id: string;
  name: string;
  action: string;
  detail: string;
  time: string;
  initials: string;
  color: AvatarColor;
  at: string;
};

export type TimeLog = {
  id: string;
  workId: string;
  hours: number;
  note: string;
  date: string;
  person: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  email: string;
  status: PersonStatus;
  certifications: string[];
  startedAt: string;
};

export type Portal = {
  id: PortalId;
  name: string;
  label: string;
  description: string;
  href: string;
  accent: "purple" | "cyan" | "blue";
  prerequisites: string;
};

export type Accountant = {
  name: string;
  firm: string;
  email: string;
  phone: string;
  engagement: AccountantEngagement;
};

export type Profile = {
  name: string;
  email: string;
  role: string;
  initials: string;
};

export type Deal = {
  id: string;
  title: string;
  customerId?: string;
  stage: DealStage;
  value: number;
  owner: string;
  closeDate: string;
  notes: string;
};

export type InsightBrief = {
  at: string;
  headline: string;
  priorities: string[];
  risks: string[];
  wins: string[];
  nextMove: string;
  agent?: AiAgentId;
};

export type RunningTimer = {
  workId: string;
  startedAt: string;
};

export type BusinessRecord = {
  legalName: string;
  tradingName: string;
  abn: string;
  acn: string;
  entityType: EntityType;
  industry: string;
  founded: string;
  state: string;
  website: string;
  directors: string;
};

export type IdeaCanvas = {
  concept: string;
  market: string;
  model: string;
  nextStep: string;
};

export type LaunchTask = {
  id: string;
  title: string;
  area: LaunchArea;
  stage: LifecycleStage;
  done: boolean;
  due: string;
  owner: string;
  notes: string;
};

export type VaultDoc = {
  id: string;
  title: string;
  kind: VaultKind;
  addedAt: string;
  renewsOn: string;
  counterparty: string;
  extracted: string;
  notes: string;
};

export type Offering = {
  id: string;
  name: string;
  kind: OfferingKind;
  price: number;
  unit: string;
  active: boolean;
};

export type VantageData = {
  workspaceName: string;
  profile: Profile;
  signedIn: boolean;
  customers: Customer[];
  work: WorkItem[];
  finance: FinanceRecord[];
  events: CalendarEvent[];
  compliance: ComplianceRecord[];
  activities: ActivityItem[];
  connectedPortals: PortalId[];
  lastChecked: Record<string, string>;
  noticeVisible: boolean;
  team: TeamMember[];
  timeLogs: TimeLog[];
  snoozedUntil: Record<string, string>;
  clearedInbox: string[];
  deals: Deal[];
  insight: InsightBrief | null;
  theme: ThemeId;
  timer: RunningTimer | null;
  lifecycle: LifecycleStage;
  business: BusinessRecord;
  ideaCanvas: IdeaCanvas;
  launchTasks: LaunchTask[];
  vault: VaultDoc[];
  offerings: Offering[];
  agentBriefs: Partial<Record<AiAgentId, InsightBrief>>;
  aiPermissions: Record<AiAgentId, AiCapability>;
  linkedSystems: LinkedSystemId[];
  tourDone: boolean;
  accountant: Accountant | null;
  ledger: LedgerId | null;
};
