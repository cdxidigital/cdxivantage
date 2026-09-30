-- Per-user vantage workspaces. Payload is the operating view for that account.
create table if not exists workspaces (
  user_id    text primary key,
  payload    jsonb not null,
  updated_at timestamptz not null default now()
);
