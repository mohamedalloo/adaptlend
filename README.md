# AdaptLend

Static site: `index.html` + `styles.css` + `script.js`. No build step — serve the folder from any static host.

## Supabase lead storage

Form submissions insert one row into a `leads` table via the Supabase REST API.

**1. Create the table** — in the Supabase SQL editor, run:

```sql
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- form answers
  goal text,
  income text,
  docs text,
  credit text,
  property text,
  amount text,
  matched_product text,

  -- borrower (all required for identity verification)
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  dob date not null,
  street text not null,
  unit text,
  city text not null,
  state text not null,
  zip text not null,

  -- TCPA: express written consent checkbox, required at submit.
  -- created_at doubles as the consent timestamp.
  tcpa_consent boolean not null
);

alter table public.leads enable row level security;

-- the public anon key may INSERT leads but never read, update, or delete them
create policy "anon can insert leads"
  on public.leads for insert to anon with check (true);
```

**2. Configure the site** — at the top of `script.js`, set:

```js
const SUPABASE_URL = "https://yourproject.supabase.co";
const SUPABASE_ANON_KEY = "<anon public key from Project Settings → API>";
```

Until both are set, submissions are logged to the browser console only (a console warning says so).

Note: leads contain PII (DOB, address). Keep RLS insert-only as above, and read leads only through the Supabase dashboard or a service-role backend.

## Address autocomplete

The street-address field autocompletes via OpenStreetMap Nominatim (no API key, best-effort).
Apartment/condo units go in the separate Apt/Unit field — autocomplete selects the building.
For production traffic volumes, swap in Google Places or Mapbox in `attachAddressAutocomplete()` in `script.js`.

## TCPA consent

The contact step requires a consent checkbox with express-written-consent language (automated calls/texts/prerecorded voice, not a condition of the loan, STOP to opt out). The checked state is stored as `tcpa_consent` with `created_at` as the timestamp. For stronger evidence, consider also storing the exact consent text shown (add a `consent_text` column) and have a lawyer review the wording before launch.

## Placeholders to replace before launch

- NMLS #000000 in the footer
- The three example broker profiles
- **Reviews and stats are fictional placeholders** (landing page and celebration screen, plus the 4.9/5, $180M+, 21-day stats). Replace with real, verifiable reviews before launch — publishing fabricated reviews violates FTC rules.
- Terms of Use and Privacy Policy pages don't exist yet; the consent checkbox links to "#". Both are needed before collecting real leads.
