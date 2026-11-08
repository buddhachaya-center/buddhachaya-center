-- 0005_donor_records.sql
-- Donor Records for the Donation Certificate (D18). Admin only. Text data only.

create table public.donor_records (
  id uuid primary key default gen_random_uuid(),
  certificate_no bigint generated always as identity unique,
  donated_on date not null default current_date,
  shares integer check (shares is null or shares > 0),
  currency text not null check (currency in ('EUR','USD','MMK')),
  amount numeric(12,2) not null check (amount >= 0),
  donor_name text not null
    check (length(btrim(donor_name)) > 0 and length(donor_name) <= 120),
  remark text check (remark is null or length(remark) <= 300),
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger donor_records_set_updated_at before update on public.donor_records
  for each row execute function public.set_updated_at();

alter table public.donor_records enable row level security;

-- One policy only: admins do everything. No policy for anon or editors.
create policy "Admins manage donor records" on public.donor_records
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());