/* AdaptLend match form — one big friendly question per screen. */

/* ---------- Supabase (see README.md for table setup) ---------- */
const SUPABASE_URL = "https://jaqtpjsnnsyxispgyzya.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_sXx0Rk_xOE6UmULnzQ94LA_ZdsWRnYW"; // publishable key — safe to expose; RLS is insert-only

/* Custom stroke icons, 24px grid. Rendered inside .opt-icon containers. */
const ICONS = {
  key: '<circle cx="7.5" cy="15.5" r="3.5"/><path d="m10.3 12.7 8.2-8.2"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>',
  banknote: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15 9-2.2 5.2L9 15l2.2-5.2L15 9Z"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/>',
  umbrella: '<path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9Z"/><path d="M12 3v9"/><path d="M12 12v6a2.5 2.5 0 0 1-5 0"/>',
  buildings: '<path d="M3 21h18"/><path d="M5 21V9h6v12"/><path d="M11 21V4h8v17"/><path d="M14.5 8h2M14.5 12h2M14.5 16h2M7 13h2M7 17h2"/>',
  wallet: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M16 15h2"/>',
  asterisk: '<path d="M12 4v16"/><path d="m5 8 14 8"/><path d="M19 8 5 16"/>',
  bank: '<path d="m3 9 9-6 9 6"/><path d="M5 9v9M9.5 9v9M14.5 9v9M19 9v9"/><path d="M3 18h18"/><path d="M2 21h20"/>',
  coins: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
  document: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z"/><path d="M14 3v6h6"/><path d="M9 14h6M9 17h6"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3Z"/>',
  thumbsup: '<path d="M7 11v10"/><path d="M7 11h2.8a2 2 0 0 0 1.8-1.1L14 4a2.4 2.4 0 0 1 2.3 3l-.8 3h3.6a2 2 0 0 1 1.9 2.6l-1.9 6.9A2 2 0 0 1 17.2 21H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h2Z"/>',
  wave: '<path d="M2 15.5c2.5-6 5-6 7.5 0s5 6 7.5 0 3-4.5 5-3.5"/>',
  sunrise: '<path d="M3 21h18"/><path d="M17 21a5 5 0 0 0-10 0"/><path d="M12 12V8"/><path d="M6.7 14.7 5.2 13.2"/><path d="M17.3 14.7l1.5-1.5"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.2 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4"/><path d="M12 17.5h.01"/>',
  home: '<path d="m3 10.5 9-7.5 9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-5h4v5"/>',
  building: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/><path d="M11 21v-3h2v3"/><path d="M3 21h18"/>',
  terrain: '<path d="m8 4 4 8 4.5-4.5L21 20H3L8 4Z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  bars1: '<path d="M3 21h18"/><path d="M6 21v-4"/>',
  bars2: '<path d="M3 21h18"/><path d="M6 21v-4"/><path d="M11 21v-8"/>',
  bars3: '<path d="M3 21h18"/><path d="M6 21v-4"/><path d="M11 21v-8"/><path d="M16 21V9"/>',
  bars4: '<path d="M3 21h18"/><path d="M6 21v-4"/><path d="M11 21v-8"/><path d="M16 21V9"/><path d="M21 21V5"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
};

function icon(name, strokeWidth = 1.75) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

const STAR = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3Z"/></svg>';
const FIVE_STARS = `<div class="stars" aria-label="5 out of 5 stars">${STAR.repeat(5)}</div>`;

/* Shown on the celebration screen (placeholders — swap for real reviews). */
const REVIEWS = [
  { quote: "I'm 71 and retired. Nobody would count my savings until AdaptLend. It felt like talking to a friend who happened to know mortgages.", who: "Eleanor P.", meta: "Asset-based loan · Naples, FL" },
  { quote: "Two years after my bankruptcy, I owned a home again. Not once did anyone make me feel judged.", who: "Denise W.", meta: "Fresh start loan · Columbus, OH" },
];

const QUESTIONS = [
  {
    id: "goal",
    question: "What brings you here today?",
    hint: "There are no wrong answers in this whole form. Promise.",
    options: [
      { value: "buy", icon: "key", label: "Buying a home" },
      { value: "refi", icon: "refresh", label: "Refinancing one I own" },
      { value: "cashout", icon: "banknote", label: "Pulling cash out of my home" },
      { value: "exploring", icon: "compass", label: "Just exploring my options", sub: "Smart. Look before you leap." },
    ],
  },
  {
    id: "income",
    question: "How do you make your money these days?",
    hint: "Pick whichever fits best — 'it's complicated' is a perfectly good answer.",
    options: [
      { value: "business", icon: "briefcase", label: "I own a business / self-employed",
        affirm: "Good news: your bank statements can speak for you — no perfect tax returns required." },
      { value: "retired", icon: "umbrella", label: "I'm retired, living off savings",
        affirm: "Good news: your savings can qualify you. No paycheck needed." },
      { value: "rentals", icon: "buildings", label: "Rental properties",
        affirm: "Nice. If the rent covers the mortgage, that can be enough on its own." },
      { value: "w2", icon: "wallet", label: "A regular paycheck" },
      { value: "complicated", icon: "asterisk", label: "It's complicated",
        affirm: "Our favorite answer. Banks hate complicated. We love it." },
    ],
  },
  {
    id: "docs",
    question: "What could you show us, if we asked nicely?",
    hint: "This just tells us which loan programs fit. Nothing is required today.",
    options: [
      { value: "statements", icon: "bank", label: "Bank statements", sub: "12–24 months of deposits" },
      { value: "assets", icon: "coins", label: "Savings & investments", sub: "Retirement accounts count too" },
      { value: "rent", icon: "buildings", label: "The property's rent covers it" },
      { value: "taxes", icon: "document", label: "Full tax returns" },
      { value: "talk", icon: "phone", label: "Let's talk about it", sub: "Also a fine answer" },
    ],
  },
  {
    id: "credit",
    question: "How's your credit been treating you?",
    hint: "We don't check anything today — this is just between us.",
    options: [
      { value: "great", icon: "star", label: "Great, honestly" },
      { value: "good", icon: "thumbsup", label: "Pretty good" },
      { value: "bumps", icon: "wave", label: "A few bumps along the road",
        affirm: "Bumps are fine. Roads have them." },
      { value: "event", icon: "sunrise", label: "A big event — bankruptcy, foreclosure, or similar",
        affirm: "That's exactly what fresh-start loans exist for. You're in the right place." },
      { value: "unsure", icon: "help", label: "Honestly not sure" },
    ],
  },
  {
    id: "property",
    question: "Tell us about the property.",
    hint: "The one you're buying, or the one you own.",
    options: [
      { value: "house", icon: "home", label: "A regular house" },
      { value: "condo", icon: "building", label: "A condo" },
      { value: "investment", icon: "buildings", label: "An investment property", sub: "Rental, 2–4 units, short-term rental" },
      { value: "unusual", icon: "terrain", label: "Something unusual", sub: "Condotel, mixed-use, land, barndominium…",
        affirm: "Unusual properties are a specialty of ours. The weirder the better." },
      { value: "none", icon: "search", label: "Haven't found it yet" },
    ],
  },
  {
    id: "amount",
    question: "Roughly how much would you want to borrow?",
    hint: "A ballpark is plenty.",
    options: [
      { value: "small", icon: "bars1", label: "Under $300,000" },
      { value: "medium", icon: "bars2", label: "$300,000 – $700,000" },
      { value: "large", icon: "bars3", label: "$700,000 – $1.5 million" },
      { value: "jumbo", icon: "bars4", label: "Over $1.5 million" },
    ],
  },
];

/* Loan-product matching: first rule that fits wins. Used for lead routing —
   the match is delivered by email, never shown on-screen. */
const PRODUCTS = [
  { match: (a) => a.income === "retired" || a.docs === "assets", name: "Asset-Based Loan" },
  { match: (a) => a.income === "rentals" || a.docs === "rent" || a.property === "investment", name: "DSCR Investor Loan" },
  { match: (a) => a.income === "business" || a.docs === "statements", name: "Bank Statement Loan" },
  { match: (a) => a.credit === "event" || a.credit === "bumps", name: "Fresh Start Loan" },
  { match: (a) => a.property === "unusual", name: "Specialty Property Loan" },
  { match: (a) => a.amount === "jumbo" || a.amount === "large", name: "Jumbo Non-QM Loan" },
  { match: () => true, name: "Flexible-Doc Loan" },
];

const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC"];

const STATE_NAMES = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
  MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
  OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
  SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
  VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
  DC: "Washington, DC",
};

const TOTAL_STEPS = QUESTIONS.length + 1; // + contact step

const overlay = document.getElementById("formOverlay");
const formBody = document.getElementById("formBody");
const progressBar = document.getElementById("progressBar");

let answers = {};
let stepIndex = 0;
let pendingAffirm = "";
let seededIds = new Set(); // questions pre-answered from a hero card; skipped going forward

/* ---------- open / close ---------- */

document.querySelectorAll("[data-open-form]").forEach((btn) => {
  btn.addEventListener("click", () => {
    answers = {};
    stepIndex = 0;
    pendingAffirm = "";
    seededIds = new Set();
    const seed = btn.dataset.seed;
    if (seed) {
      // seeded from a hero situation card: pre-answer the income/credit/property question
      if (seed === "business" || seed === "retired" || seed === "rentals") { answers.income = seed; seededIds.add("income"); }
      if (seed === "investor") { answers.income = "rentals"; seededIds.add("income"); }
      if (seed === "credit") { answers.credit = "event"; seededIds.add("credit"); }
      if (seed === "unusual") { answers.property = "unusual"; seededIds.add("property"); }
      // surface the matching affirmation when the seeded question gets skipped
      for (const id of seededIds) {
        const q = QUESTIONS.find((qq) => qq.id === id);
        const opt = q.options.find((o) => o.value === answers[id]);
        if (opt && opt.affirm) pendingAffirm = opt.affirm;
      }
    }
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    renderStep();
  });
});

document.querySelector("[data-close-form]").addEventListener("click", closeForm);

// guide pages link here as /?match=<seed> ("open" = unseeded) to launch the form directly
const matchParam = new URLSearchParams(location.search).get("match");
if (matchParam !== null) {
  const seededBtn = document.querySelector(`[data-open-form][data-seed="${matchParam}"]`);
  (seededBtn || document.querySelector("[data-open-form]")).click();
}

function closeForm() {
  overlay.hidden = true;
  document.body.style.overflow = "";
}

/* ---------- rendering ---------- */

function setProgress() {
  const pct = Math.min(100, Math.round((stepIndex / TOTAL_STEPS) * 100));
  progressBar.style.width = pct + "%";
}

function renderStep() {
  while (stepIndex < QUESTIONS.length && seededIds.has(QUESTIONS[stepIndex].id)) stepIndex++;
  setProgress();
  if (stepIndex < QUESTIONS.length) {
    renderQuestion(QUESTIONS[stepIndex]);
  } else if (stepIndex === QUESTIONS.length) {
    renderContact();
  }
  formBody.scrollIntoView({ block: "start" });
}

function renderQuestion(q) {
  const affirmHtml = pendingAffirm
    ? `<div class="affirmation">${icon("check", 2)}<span>${pendingAffirm}</span></div>`
    : "";
  pendingAffirm = "";

  formBody.innerHTML = `
    <p class="form-step-label">Question ${stepIndex + 1} of ${TOTAL_STEPS} · about two minutes total</p>
    ${affirmHtml}
    <h2 class="form-question" id="formQuestion">${q.question}</h2>
    <p class="form-hint">${q.hint}</p>
    <div class="option-list">
      ${q.options
        .map(
          (o) => `
        <button class="option-btn" data-value="${o.value}">
          <span class="opt-icon">${icon(o.icon)}</span>
          <span>${o.label}${o.sub ? `<span class="opt-sub">${o.sub}</span>` : ""}</span>
        </button>`
        )
        .join("")}
    </div>
    <div class="form-nav">
      ${stepIndex > 0 ? '<button class="back-btn" data-back>← Go back a question</button>' : ""}
    </div>
  `;

  formBody.querySelectorAll(".option-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.dataset.value;
      answers[q.id] = value;
      const opt = q.options.find((o) => o.value === value);
      if (opt && opt.affirm) pendingAffirm = opt.affirm;
      stepIndex++;
      renderStep();
    });
  });

  const back = formBody.querySelector("[data-back]");
  if (back) back.addEventListener("click", goBack);
}

function goBack() {
  stepIndex--;
  // landing on a seeded question via back makes it answerable like any other
  if (stepIndex >= 0 && stepIndex < QUESTIONS.length) seededIds.delete(QUESTIONS[stepIndex].id);
  pendingAffirm = "";
  renderStep();
}

/* ---------- contact step ---------- */

function renderContact() {
  // youngest allowed birthday: 18 years ago today
  const now = new Date();
  const maxDob = `${now.getFullYear() - 18}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  formBody.innerHTML = `
    <p class="form-step-label">Last one · question ${TOTAL_STEPS} of ${TOTAL_STEPS}</p>
    <h2 class="form-question" id="formQuestion">Where should your specialist reach you?</h2>
    <p class="form-hint">Everything below is required — your specialist has to verify it's really you before they can talk numbers. Nothing here checks your credit.</p>
    <div class="contact-grid">
      <div class="field-row">
        <div class="contact-field">
          <label for="cFirst">First (legal)</label>
          <input id="cFirst" type="text" autocomplete="given-name">
        </div>
        <div class="contact-field">
          <label for="cLast">Last (legal)</label>
          <input id="cLast" type="text" autocomplete="family-name">
        </div>
      </div>
      <div class="field-row">
        <div class="contact-field">
          <label for="cEmail">Email</label>
          <input id="cEmail" type="email" autocomplete="email" placeholder="you@example.com">
          <p class="field-note">Your rate email is sent here.</p>
        </div>
        <div class="contact-field">
          <label for="cPhone">Phone number</label>
          <input id="cPhone" type="tel" autocomplete="tel" placeholder="(555) 555-5555">
          <p class="field-note">Identity is verified before your quote is shared.</p>
        </div>
      </div>
      <div class="contact-field">
        <label for="cDob">Date of birth <span class="label-note">needed for verification</span></label>
        <input id="cDob" type="date" max="${maxDob}">
      </div>
      <div class="contact-field">
        <label for="cStreet">Street address</label>
        <div class="ac-anchor">
          <input id="cStreet" type="text" autocomplete="off" placeholder="Start typing your address…">
          <div class="ac-list" id="acList" hidden></div>
        </div>
        <p class="field-note">Condo or apartment? Pick the building, then add your unit below.</p>
      </div>
      <div class="field-row">
        <div class="contact-field">
          <label for="cUnit">Apt / unit / suite <span class="label-note">if any</span></label>
          <input id="cUnit" type="text" autocomplete="address-line2">
        </div>
        <div class="contact-field">
          <label for="cCity">City</label>
          <input id="cCity" type="text" autocomplete="address-level2">
        </div>
      </div>
      <div class="field-row">
        <div class="contact-field">
          <label for="cState">State</label>
          <select id="cState">
            <option value="">Choose…</option>
            ${US_STATES.map((s) => `<option value="${s}">${s}</option>`).join("")}
          </select>
        </div>
        <div class="contact-field">
          <label for="cZip">ZIP</label>
          <input id="cZip" type="text" inputmode="numeric" autocomplete="postal-code" maxlength="10">
        </div>
      </div>
      <div class="consent">
        <input type="checkbox" id="cConsent">
        <label for="cConsent">I agree to AdaptLend's <a href="terms.html" target="_blank" rel="noopener">Terms of Use</a> and <a href="privacy.html" target="_blank" rel="noopener">Privacy Policy</a>, and I give my express written consent for AdaptLend and its participating brokers and loan originators to contact me about my inquiry at the number and email above — including by automated calls, prerecorded or artificial voice, texts, and email, even if my number is on a do-not-call registry. Consent isn't a condition of getting a loan, message and data rates may apply, and I can opt out anytime (reply STOP to texts).</label>
      </div>
    </div>
    <p class="form-error" id="contactError"></p>
    <div class="form-nav">
      <button class="btn btn-primary btn-lg" id="submitBtn">Get matched</button>
      <button class="back-btn" data-back>← Go back</button>
    </div>
    <p class="submit-note">Submitting doesn't check your credit or commit you to anything.</p>
  `;

  attachAddressAutocomplete();

  // live-format the phone number as (555) 555-5555 while typing
  const phoneInput = document.getElementById("cPhone");
  phoneInput.addEventListener("input", () => {
    const d = phoneInput.value.replace(/\D/g, "").slice(0, 10);
    phoneInput.value =
      d.length > 6 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` :
      d.length > 3 ? `(${d.slice(0, 3)}) ${d.slice(3)}` :
      d.length > 0 ? `(${d}` : "";
  });

  formBody.querySelector("[data-back]").addEventListener("click", goBack);
  formBody.querySelector("#submitBtn").addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    if (btn.disabled) return;

    const get = (id) => document.getElementById(id).value.trim();
    const contact = {
      first_name: get("cFirst"),
      last_name: get("cLast"),
      email: get("cEmail"),
      phone: get("cPhone"),
      dob: get("cDob"),
      street: get("cStreet"),
      unit: get("cUnit"),
      city: get("cCity"),
      state: get("cState"),
      zip: get("cZip"),
    };

    const problems = [];
    if (!contact.first_name || !contact.last_name) problems.push("your legal first and last name");
    if (!/^\S+@\S+\.\S+$/.test(contact.email)) problems.push("a valid email");
    if (contact.phone.replace(/\D/g, "").length < 10) problems.push("a valid phone number");
    if (!contact.dob) problems.push("your date of birth");
    else if (contact.dob > maxDob) problems.push("a date of birth showing you're at least 18");
    if (!contact.street || !contact.city || !contact.state || !/^\d{5}(-\d{4})?$/.test(contact.zip)) {
      problems.push("your full address (street, city, state, and 5-digit ZIP)");
    }
    if (!document.getElementById("cConsent").checked) {
      problems.push("the consent box checked, so your specialist is allowed to reach out");
    }

    const errorEl = document.getElementById("contactError");
    if (problems.length) {
      errorEl.textContent = "Almost there — we still need " + problems.join(", ") + ".";
      errorEl.classList.add("visible");
      return;
    }
    errorEl.classList.remove("visible");

    btn.disabled = true;
    btn.textContent = "Matching you…";
    contact.tcpa_consent = true;
    answers.contact = contact;
    answers.matched_product = PRODUCTS.find((p) => p.match(answers)).name;
    await submitLead(answers);
    stepIndex++;
    renderCelebration();
  });
}

/* Address autocomplete backed by OpenStreetMap Nominatim (no API key).
   Units live in the separate Apt/Unit field — autocomplete picks the building. */
function attachAddressAutocomplete() {
  const input = document.getElementById("cStreet");
  const list = document.getElementById("acList");
  let timer;

  const hide = () => { list.hidden = true; list.innerHTML = ""; };

  input.addEventListener("input", () => {
    clearTimeout(timer);
    const q = input.value.trim();
    if (q.length < 4) { hide(); return; }
    timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&countrycodes=us&limit=5&q=${encodeURIComponent(q)}`
        );
        const results = (await res.json()).filter((r) => r.address);
        if (!results.length) { hide(); return; }
        list.innerHTML = results
          .map((r, i) => `<button type="button" class="ac-item" data-i="${i}">${escapeHtml(formatSuggestion(r))}</button>`)
          .join("");
        list.hidden = false;
        list.querySelectorAll(".ac-item").forEach((item) => {
          item.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            applySuggestion(results[Number(item.dataset.i)]);
            hide();
          });
        });
      } catch {
        hide(); // autocomplete is best-effort; typing manually always works
      }
    }, 350);
  });

  input.addEventListener("blur", () => setTimeout(hide, 150));
  input.addEventListener("keydown", (ev) => { if (ev.key === "Escape") hide(); });
}

function formatSuggestion(r) {
  const a = r.address;
  const street = [a.house_number, a.road].filter(Boolean).join(" ");
  const city = a.city || a.town || a.village || a.hamlet || "";
  const state = (a["ISO3166-2-lvl4"] || "").split("-")[1] || "";
  const parts = [street || r.name, city, [state, a.postcode].filter(Boolean).join(" ")].filter(Boolean);
  return parts.join(", ");
}

function applySuggestion(r) {
  const a = r.address;
  const set = (id, v) => { if (v) document.getElementById(id).value = v; };
  set("cStreet", [a.house_number, a.road].filter(Boolean).join(" ") || r.name);
  set("cCity", a.city || a.town || a.village || a.hamlet);
  set("cState", (a["ISO3166-2-lvl4"] || "").split("-")[1]);
  set("cZip", a.postcode);
  document.getElementById("cUnit").focus();
}

/* ---------- celebration ---------- */

function renderCelebration() {
  progressBar.style.width = "100%";
  const first = escapeHtml(answers.contact.first_name);
  const loanType = answers.matched_product.replace(/ Loan$/, "");
  const stateName = STATE_NAMES[answers.contact.state] || answers.contact.state;

  formBody.innerHTML = `
    <div class="celebrate">
      <div class="celebrate-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="celebrate-check" d="M20 6 9 17l-5-5"/></svg>
      </div>
      <p class="result-kicker">It's official</p>
      <h2 class="celebrate-title">You've been matched, ${first}.</h2>
      <p class="celebrate-sub">You're paired with a top producer specializing in closing <span class="hl">${loanType} loans</span> in <span class="hl">${stateName}</span>. They'll be contacting you shortly.</p>
      <p class="celebrate-note">${icon("check", 2)}<span>Check your email for your match — and peek at spam, just in case.</span></p>
      <div class="celebrate-reviews">
        <p class="celebrate-reviews-label">You're in good company</p>
        ${REVIEWS.map(
          (r) => `
        <figure class="celebrate-review">
          ${FIVE_STARS}
          <blockquote>"${r.quote}"</blockquote>
          <figcaption><strong>${r.who}</strong> · ${r.meta}</figcaption>
        </figure>`
        ).join("")}
      </div>
      <div class="form-nav celebrate-nav">
        <button class="back-btn" data-close-result>← Back to the site</button>
      </div>
    </div>
  `;

  launchConfetti();
  formBody.querySelector("[data-close-result]").addEventListener("click", closeForm);
}

/* Brand-palette confetti: one restrained burst, then gone. */
function launchConfetti() {
  const colors = ["#10b981", "#34d399", "#f5b942", "#ffffff", "#1a2440"];
  const box = document.createElement("div");
  box.className = "confetti";
  for (let i = 0; i < 48; i++) {
    const p = document.createElement("i");
    const size = 5 + Math.random() * 5;
    p.style.left = Math.random() * 100 + "%";
    p.style.width = size + "px";
    p.style.height = (Math.random() < 0.35 ? size : size * 1.9) + "px";
    p.style.background = colors[i % colors.length];
    p.style.borderRadius = Math.random() < 0.35 ? "50%" : "2px";
    p.style.setProperty("--dur", (2.6 + Math.random() * 1.8).toFixed(2) + "s");
    p.style.setProperty("--delay", (Math.random() * 0.5).toFixed(2) + "s");
    p.style.setProperty("--sway", (Math.random() * 180 - 90).toFixed(0) + "px");
    p.style.setProperty("--rot", (360 + Math.random() * 540).toFixed(0) + "deg");
    box.appendChild(p);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 5500);
}

/* ---------- lead delivery (Supabase) ---------- */

async function submitLead(lead) {
  const row = {
    goal: lead.goal,
    income: lead.income,
    docs: lead.docs,
    credit: lead.credit,
    property: lead.property,
    amount: lead.amount,
    matched_product: lead.matched_product,
    ...lead.contact,
  };
  console.log("AdaptLend lead:", JSON.stringify(row, null, 2));

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn("Supabase not configured — lead logged only. Set SUPABASE_URL and SUPABASE_ANON_KEY in script.js (see README.md).");
    return;
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
    if (!res.ok) console.error("Supabase insert failed:", res.status, await res.text());
  } catch (err) {
    console.error("Supabase insert error:", err);
  }

  // fire the matched welcome email (borrower To, specialist CC'd) — best-effort
  try {
    await fetch(`${SUPABASE_URL}/functions/v1/send-welcome`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
      body: JSON.stringify({
        first_name: lead.contact.first_name,
        email: lead.contact.email,
        loan_type: lead.matched_product.replace(/ Loan$/, ""),
        state_name: STATE_NAMES[lead.contact.state] || lead.contact.state,
      }),
    });
  } catch (err) {
    console.error("Welcome email error:", err);
  }
}
