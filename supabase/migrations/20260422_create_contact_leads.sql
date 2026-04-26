create extension if not exists pgcrypto;

create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc'::text, now()),
  name text not null,
  email text not null,
  whatsapp text,
  service text not null,
  message text not null,
  source_path text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referrer text,
  user_agent text not null,
  ip_hash text not null,
  captcha_status text not null,
  submission_status text not null,
  notification_status text not null,
  notification_id text,
  blocked_reason text,
  constraint contact_leads_service_check check (service in ('web', 'ecommerce', 'automations', 'unsure')),
  constraint contact_leads_captcha_status_check check (captcha_status in ('passed', 'failed', 'skipped')),
  constraint contact_leads_submission_status_check check (submission_status in ('accepted', 'blocked')),
  constraint contact_leads_notification_status_check check (
    notification_status in ('pending', 'sent', 'failed', 'skipped')
  )
);

create index if not exists contact_leads_created_at_idx
  on public.contact_leads (created_at desc);

create index if not exists contact_leads_ip_hash_created_at_idx
  on public.contact_leads (ip_hash, created_at desc);

alter table public.contact_leads enable row level security;
