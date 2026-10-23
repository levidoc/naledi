const SERVICES = [
  { id: 'diagnostics', n: '01', title: 'Vehicle diagnostics', short: 'Make sense of warning lights, running issues and scan results.', description: 'A focused consultation to help interpret symptoms, diagnostic results and sensible next steps for your vehicle.', category: 'diagnostics', image: '/manus-storage/async-images/NAsYuzTBXEJa1IhWDUe9OY/image-2.webp', imageAlt: 'A diagnostic scan tool connected inside a graphite vehicle', price: 650 },
  { id: 'maintenance', n: '02', title: 'Maintenance planning', short: 'Build a clear, practical plan for keeping your car in good shape.', description: 'Review your vehicle’s needs and create a maintenance direction based on use, mileage and priorities.', category: 'maintenance', image: '/manus-storage/async-images/NAsYuzTBXEJa1IhWDUe9OY/image-3.webp', imageAlt: 'A technician checking the engine bay during a maintenance inspection', price: 480 },
  { id: 'upgrades', n: '03', title: 'Upgrade consultation', short: 'Explore upgrades that suit your goals and your existing vehicle.', description: 'Compare upgrade options, compatibility and sensible priorities before investing in changes.', category: 'upgrades', image: '/manus-storage/async-images/NAsYuzTBXEJa1IhWDUe9OY/image-4.webp', imageAlt: 'A wheel and suspension setup being reviewed beside a vehicle', price: 550 },
  { id: 'handling', n: '04', title: 'Vehicle handling advice', short: 'Understand setup choices and how they affect your driving feel.', description: 'Get practical guidance on vehicle handling, setup considerations and questions to raise with a workshop.', category: 'handling', image: '/manus-storage/async-images/NAsYuzTBXEJa1IhWDUe9OY/image-5.webp', imageAlt: 'A graphite vehicle being inspected on a wheel alignment rack', price: 420 }
];
const CONTACT = { phone: '+27 00 000 0000', email: 'hello@naledi-consultants.example' };
const money = (amount) => `R ${Number(amount).toLocaleString('en-ZA')}`;
const root = document.querySelector('#main');
const footer = document.querySelector('#site-footer');
const cookieRoot = document.querySelector('#cookie-root');
let activeFilter = 'all';
let toastTimer;

function getCart() {
  try { return JSON.parse(localStorage.getItem('naledi_demo_cart') || '[]'); } catch { return []; }
}
function saveCart(cart) { localStorage.setItem('naledi_demo_cart', JSON.stringify(cart)); }
function total() { return getCart().reduce((sum, line) => sum + line.price * line.quantity, 0); }
function selectedService(id) { return SERVICES.find((item) => item.id === id); }
function moneyNote() { return '<p class="price-note">Illustrative preview fees only · final scope and pricing to be confirmed.</p>'; }
function serviceCards(items) {
  if (!items.length) return '<p class="body-copy">No services match that search. Try another term or choose a different filter.</p>';
  return items.map((s) => `<article class="service-card"><a class="service-photo" href="#payment" data-add="${s.id}" aria-label="Choose ${s.title} and review your order"><img src="${s.image}" alt="${s.imageAlt}" loading="lazy"></a><div class="service-card-body"><div class="service-card-heading"><h3>${s.title}</h3><span class="card-price">${money(s.price)}</span></div><p>${s.description}</p><div class="card-bottom"><span class="price-label">One-time · cash only</span><button class="add-button" type="button" data-add="${s.id}" aria-label="Add ${s.title} to your preview order">Choose service <span aria-hidden="true">+</span></button></div></div></article>`).join('');
}
function pageIntro(label, title, description) {
  return `<section class="page-hero"><div class="shell"><div class="breadcrumb"><a href="#home">Home</a><span>/</span><span>${label}</span></div><div class="eyebrow">Naledi Consultants <span class="index">/ ${label}</span></div><h1 class="display-title">${title}</h1><p class="body-copy">${description}</p></div></section>`;
}
function homePage() {
  return `<section class="hero"><img class="hero-image" src="/manus-storage/async-images/NAsYuzTBXEJa1IhWDUe9OY/image-1.webp" alt="Graphite performance car in a dark, precision-focused workshop" /><div class="shell hero-inner"><div class="hero-copy"><div class="eyebrow"><span class="index">NC — 001</span> Vehicle advisory, on your side</div><h1 class="display-title">A clearer road<br>to a <span>better-running car.</span></h1><p class="hero-lede">Understand what your vehicle needs next. Get practical guidance on diagnostics, maintenance and upgrades—before you commit to the work.</p><div class="hero-actions"><a class="button-primary" href="#catalog">Explore consultations <span aria-hidden="true">↗</span></a><a class="button-quiet" href="#about">How we help <span aria-hidden="true">→</span></a></div><div class="hero-foot"><div class="hero-metric"><span class="metric-no">01</span><span class="metric-label">Advice built around<br>your existing vehicle</span></div><div class="hero-metric"><span class="metric-no">02</span><span class="metric-label">Clear options,<br>no pressure</span></div><div class="hero-metric"><span class="metric-no">03</span><span class="metric-label">One-off<br>consultations</span></div></div></div></div><div class="hero-stamp">PRACTICAL KNOW-HOW / CLEAR NEXT STEPS</div></section>
    <div class="ticker" aria-label="Service areas"><div class="ticker-track"><b>DIAGNOSTICS</b><i>✳</i><b>MAINTENANCE</b><i>✳</i><b>UPGRADE PLANNING</b><i>✳</i><b>VEHICLE HANDLING</b><i>✳</i><b>DIAGNOSTICS</b><i>✳</i><b>MAINTENANCE</b><i>✳</i><b>UPGRADE PLANNING</b><i>✳</i></div></div>
    <section class="section"><div class="shell"><div class="section-head"><div><div class="eyebrow">A considered next step</div><h2 class="display-title">Good advice<br>starts with <span>your car.</span></h2></div><p>Not sure which route makes sense? Start with a focused consultation. We’ll help you understand the question before you spend on the answer.</p></div><div class="service-feature"><div class="service-feature-intro"><div><span class="eyebrow"><span class="index">01 / 04</span> What we can help with</span><h3 class="display-title">Make the next<br>move with <span>clarity.</span></h3><p>Choose an area to explore. Every offer is a one-time vehicle consultation, not a workshop repair or a physical product.</p></div><a class="text-link" href="#shop">See all services <span>↗</span></a></div><div class="service-feature-list">${SERVICES.map((s) => `<a class="service-row" href="#catalog"><img class="service-row-image" src="${s.image}" alt="" loading="lazy"><span><h3>${s.title}</h3><p>${s.short}</p></span><span class="service-arrow" aria-hidden="true">↗</span></a>`).join('')}</div></div>${moneyNote()}</div></section>
    <section class="section-tight"><div class="shell"><div class="stat-band"><div class="stat"><b>Vehicle-first</b><span>Advice for the car you own</span></div><div class="stat"><b>Plain-spoken</b><span>Understand your options</span></div><div class="stat"><b>One-off</b><span>No recurring plans</span></div><div class="stat"><b>Cash only</b><span>Payment by arrangement</span></div></div></div></section>
    <section class="section"><div class="shell"><div class="callout"><div><h3>Bring the question. Leave with a plan.</h3><p>Tell us what you drive and what you’re trying to solve. We’ll help you find the right consultation.</p></div><a class="button-primary" href="#contact-us">Talk to Naledi <span>↗</span></a></div></div></section>`;
}
function shopPage() {
  return `${pageIntro('Services', 'Advice for the car you already own.', 'Explore practical vehicle consultations for diagnosis, maintenance, upgrades and handling. Choose a starting point and we’ll help define the next step.')}
    <section class="section"><div class="shell"><div class="section-head"><div><div class="eyebrow">A service, not a part</div><h2 class="display-title">Consultations<br>that <span>move you forward.</span></h2></div><p>Illustrative fees are shown for design preview only. Final scope and price are confirmed before any service is booked.</p></div><div class="service-grid">${serviceCards(SERVICES)}</div>${moneyNote()}</div></section><section class="section-tight"><div class="shell"><div class="callout"><div><h3>Not sure where to start?</h3><p>Describe the symptoms, plan or upgrade you’re considering.</p></div><a class="button-quiet" href="#contact-us">Ask a question <span>↗</span></a></div></div></section>`;
}
function catalogPage() {
  const filters = [['all','All services'],['diagnostics','Diagnostics'],['maintenance','Maintenance'],['upgrades','Upgrades'],['handling','Handling']];
  return `${pageIntro('Catalog', 'Find the right place to start.', 'Use the service guide to compare consultation areas. Every selection is a one-time service, with cash payment arranged once your request has been reviewed.')}
    <section class="section"><div class="shell"><div class="catalog-toolbar"><div class="filter-list" aria-label="Filter services">${filters.map(([key,label]) => `<button class="filter-chip" type="button" data-filter="${key}" aria-pressed="${activeFilter===key}">${label}</button>`).join('')}</div><label class="search-box"><span class="sr-only">Search services</span><input id="catalog-search" type="search" placeholder="Search service guide…" autocomplete="off"></label></div><div class="service-grid" id="service-list">${serviceCards(SERVICES)}</div>${moneyNote()}</div></section>`;
}
function aboutPage() {
  return `${pageIntro('Our approach', 'Better decisions start with better questions.', 'Naledi Consultants helps drivers make informed choices about their existing vehicles. Our role is to make the options easier to understand—not to push parts or promise a quick fix.')}
    <section class="section"><div class="shell approach-grid"><div><div class="eyebrow">How we see it</div><h2 class="display-title">The right advice<br>for the <span>road ahead.</span></h2><p class="body-copy">A warning light, an overdue service or a tempting upgrade can raise more questions than answers. A clear conversation can help you prioritise what matters and what to ask next.</p><a class="text-link" href="#catalog">Explore our services <span>↗</span></a></div><div class="approach-list"><article class="approach-item"><span class="num">01</span><div><h3>Start with your context</h3><p>Your vehicle, how you use it, what you’ve noticed and what you want to change.</p></div></article><article class="approach-item"><span class="num">02</span><div><h3>Make the options clear</h3><p>We help translate diagnostic findings, maintenance needs or upgrade choices into practical next steps.</p></div></article><article class="approach-item"><span class="num">03</span><div><h3>Keep you in control</h3><p>Advice is a starting point for an informed decision. You choose what to do, and when.</p></div></article></div></div></section><section class="section-tight"><div class="shell"><div class="callout"><div><h3>Good work begins with a clear brief.</h3><p>Tell us what you drive and what you have in mind.</p></div><a class="button-primary" href="#contact-us">Get in touch <span>↗</span></a></div></div></section>`;
}
function contactPage() {
  return `${pageIntro('Contact us', 'Let’s talk about your vehicle.', 'Share what you drive and the question you’re trying to answer. These contact details are temporary placeholders for the design preview.')}
    <section class="section"><div class="shell contact-layout"><div><div class="eyebrow">We’re ready when you are</div><h2 class="display-title">Start a<br><span>conversation.</span></h2><p class="body-copy">Whether you have a warning light, a maintenance question or an upgrade in mind, a little context helps us point you in the right direction.</p><div class="contact-detail"><span>Phone · dummy number</span><a href="tel:+27000000000">${CONTACT.phone}</a></div><div class="contact-detail"><span>Email · dummy address</span><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></div><div class="contact-detail"><span>Service model</span><strong>Online vehicle consultations</strong></div></div><form class="form-panel preview-form" data-form="contact"><div class="eyebrow">Send an enquiry</div><h2>Tell us what’s going on.</h2><p class="form-intro">A few details are enough to get the conversation started.</p><div class="form-grid"><div class="field"><label for="contact-name">Your name</label><input id="contact-name" name="name" autocomplete="name" placeholder="Name" required></div><div class="field"><label for="contact-email">Email</label><input id="contact-email" type="email" name="email" autocomplete="email" placeholder="you@example.com" required></div><div class="field"><label for="contact-vehicle">Vehicle</label><input id="contact-vehicle" name="vehicle" placeholder="Year, make and model"></div><div class="field"><label for="contact-topic">What do you need?</label><select id="contact-topic" name="topic"><option>Vehicle diagnostics</option><option>Maintenance planning</option><option>Upgrade consultation</option><option>Vehicle handling advice</option><option>Something else</option></select></div><div class="field full"><label for="contact-message">A little more detail</label><textarea id="contact-message" name="message" placeholder="Tell us what you’ve noticed or what you’re planning."></textarea></div></div><button class="button-primary form-submit" type="submit">Preview enquiry <span>↗</span></button><p class="form-footnote">Design preview only — this form does not send or store personal information.</p><div class="form-status" role="status"></div></form></div></section>`;
}
function policyPage() {
  const policies = [
    ['01','Service terms','Naledi Consultants provides vehicle-related guidance and consultations. Advice is based on information shared by the customer and is not a substitute for a physical inspection, manufacturer guidance or work performed by a qualified repair professional. Scope, availability and any fee should be confirmed before a consultation is booked.'],
    ['02','Cash payment','The planned payment method is a one-time cash transaction. No online card payment or recurring billing is offered. The cash amount, timing and any in-person arrangement must be confirmed with the customer before a service is finalised.'],
    ['03','Cancellations','Contact the business as early as possible if you need to change a consultation. The final cancellation, rescheduling and any refund conditions will be confirmed before the service is offered. This draft is placeholder policy copy and requires business approval.'],
    ['04','Privacy','Only share information needed to discuss your vehicle and consultation. The design preview does not send form submissions or create real accounts. A production privacy notice must explain what data is collected, how long it is kept, and how customers can request access or deletion.'],
    ['05','Cookies','This preview uses a necessary first-party cookie to remember your consent choice. Optional analytics or advertising cookies are not active in this design stage. You can revisit your selection using the cookie settings control.'],
    ['06','Indicative pricing','Displayed prices are illustrative placeholders for the design preview—not a confirmed quote or offer. Final scope and fee must be confirmed with Naledi Consultants before any consultation is booked or paid for.']
  ];
  return `${pageIntro('Policies', 'Clear terms. No surprises.', 'A preview of the customer policies area. Service terms and sample prices need business review before launch.')}
    <section class="section"><div class="shell"><div class="policy-grid">${policies.map(([n,title,text]) => `<article class="policy-card"><span class="num">${n} / POLICY</span><h2>${title}</h2><p>${text}</p></article>`).join('')}</div><p class="form-footnote" style="margin-top:18px">Draft content for design review only. This is not legal advice or approved final policy copy.</p></div></section>`;
}
function accountPage() {
  const mode = sessionStorage.getItem('naledi_auth_mode') || 'signin';
  const user = sessionStorage.getItem('naledi_demo_account');
  if (user) {
    const customer = JSON.parse(user);
    return `${pageIntro('Accounts', 'Your consultation space.', 'Review your profile and see what a customer account will look like when connected to the store.')}
      <section class="section"><div class="shell"><div class="auth-wrap"><aside class="auth-aside"><div class="eyebrow">Account preview</div><h2 class="display-title">Made for<br><span>your next step.</span></h2><p>Keep your consultation details and follow-up in one place.</p></aside><div class="auth-form"><div class="account-summary"><span class="eyebrow">Signed in · local preview</span><h3>${escapeHtml(customer.name || 'Naledi customer')}</h3><p>${escapeHtml(customer.email || '')}</p><div class="empty-orders">Your consultation history will appear here after the live store connection is enabled.</div><button class="button-quiet" type="button" data-signout style="margin-top:16px">End preview session</button><p class="form-footnote">This is a temporary browser-only preview account, not a secure customer account.</p></div></div></div></div></section>`;
  }
  return `${pageIntro('Accounts', 'Your vehicle journey, in one place.', 'Create an account or sign in to see how customer access will work. These preview accounts are stored only for the current browser tab.')}
    <section class="section"><div class="shell"><div class="auth-wrap"><aside class="auth-aside"><div class="eyebrow">A little more continuity</div><h2 class="display-title">Keep the<br><span>details together.</span></h2><p>In the connected store, an account can help you keep track of your consultations and future conversations.</p><ul><li>Consultation history</li><li>Your contact details</li><li>One-off service requests</li></ul></aside><div class="auth-form"><div class="auth-warning">Design preview only · account security and data are not connected yet.</div><div class="auth-tabs" role="tablist" aria-label="Account access"><button class="auth-tab" type="button" data-auth="signin" role="tab" aria-selected="${mode==='signin'}">Sign in</button><button class="auth-tab" type="button" data-auth="register" role="tab" aria-selected="${mode==='register'}">Create account</button></div><form class="preview-form" data-form="account"><div class="form-grid">${mode==='register'?'<div class="field full"><label for="account-name">Your name</label><input id="account-name" name="name" autocomplete="name" required placeholder="Full name"></div>':''}<div class="field full"><label for="account-email">Email address</label><input id="account-email" type="email" name="email" autocomplete="email" required placeholder="you@example.com"></div><div class="field full"><label for="account-password">Password</label><input id="account-password" type="password" name="password" autocomplete="${mode==='register'?'new-password':'current-password'}" minlength="8" required placeholder="At least 8 characters"></div></div><button class="button-primary form-submit" type="submit">${mode==='register'?'Preview account creation':'Preview sign in'} <span>↗</span></button><p class="form-footnote">Do not enter a real or reused password in this visual preview.</p><div class="form-status" role="status"></div></form></div></div></div></section>`;
}
function paymentPage() {
  const cart = getCart();
  const lines = cart.length ? cart.map((line) => `<div class="order-item"><div><h3>${escapeHtml(line.title)}</h3><p>One-time vehicle consultation · quantity ${line.quantity}</p><button type="button" data-remove="${line.id}">Remove from preview order</button></div><strong>${money(line.price * line.quantity)}</strong></div>`).join('') : '<div class="order-empty">No service selected yet. Browse the catalog to choose a consultation.</div>';
  const amountText = cart.length ? money(total()) : '—';
  return `${pageIntro('Payment', 'A simple, one-time transaction.', 'Review your selected consultation and share the details needed to confirm the scope. This design preview does not create or submit a real order.')}
    <section class="section"><div class="shell checkout-layout"><div class="checkout-panel"><div class="step-label">01 / Your consultation</div><h2>Review your selection</h2>${lines}<div class="order-total"><span>Illustrative total · once-off</span><b>${amountText}</b></div><p class="form-footnote">Preview fee only; final amount must be confirmed before booking.</p><div class="cash-option"><input type="radio" checked disabled aria-label="Cash payment selected"><span><b>Cash · one-time payment</b><span>No card payment, subscriptions or automatic billing. Payment arrangements to be agreed after a request is reviewed.</span></span></div><a class="text-link" href="#catalog">Add or change a service <span>↗</span></a></div><div class="checkout-panel"><div class="step-label">02 / Your details</div><h2>Request a consultation</h2><div class="auth-warning">Preview only · no booking or payment is submitted. Cash payment is not collected online.</div><form class="preview-form" data-form="payment"><div class="form-grid"><div class="field full"><label for="pay-name">Your name</label><input id="pay-name" name="name" autocomplete="name" required placeholder="Full name"></div><div class="field full"><label for="pay-email">Email address</label><input id="pay-email" type="email" name="email" autocomplete="email" required placeholder="you@example.com"></div><div class="field full"><label for="pay-vehicle">Vehicle</label><input id="pay-vehicle" name="vehicle" placeholder="Year, make and model" required></div><div class="field full"><label for="pay-notes">What would you like help with?</label><textarea id="pay-notes" name="notes" placeholder="Share a brief description."></textarea></div></div><button class="button-primary form-submit" type="submit">Preview request <span>↗</span></button><p class="form-footnote">Submitting this form only displays a local preview message.</p><div class="form-status" role="status"></div></form></div></div></section>`;
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
const pages = { home: homePage, shop: shopPage, catalog: catalogPage, about: aboutPage, 'contact-us': contactPage, policies: policyPage, accounts: accountPage, payment: paymentPage };
function currentRoute() {
  const hash = location.hash.slice(1).split('?')[0];
  return Object.hasOwn(pages, hash) ? hash : 'home';
}
function renderFooter() {
  footer.innerHTML = `<div class="shell footer-main"><div class="footer-brand"><a class="brand" href="#home"><span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 40 40" fill="none"><path d="M9 30V10l22 20V10" stroke="currentColor" stroke-width="3.3" stroke-linecap="square"/><path d="M5 34h30" stroke="currentColor" stroke-width="1.4" opacity=".55"/><circle cx="31" cy="10" r="2.5" fill="currentColor"/></svg></span><span class="brand-copy"><strong>NALEDI <i>CONSULTANTS</i></strong><small>VEHICLE ADVISORY</small></span></a><p>Practical consultations for the vehicle you already own. Clear next steps, built around your goals.</p></div><div class="footer-col"><h3>Explore</h3><a href="#shop">Services</a><a href="#catalog">Service catalog</a><a href="#about">Our approach</a><a href="#accounts">Customer account</a></div><div class="footer-col"><h3>Information</h3><a href="#policies">Policies</a><a href="#contact-us">Contact us</a><a href="#payment">Cash payment preview</a></div><div class="footer-col"><h3>Reach out</h3><span>${CONTACT.phone}</span><a href="mailto:${CONTACT.email}">${CONTACT.email}</a><span>Dummy contact details</span></div></div><div class="shell footer-bottom"><span>© ${new Date().getFullYear()} Naledi Consultants · design preview</span><span>One-time consultation · cash payment only</span><a href="#policies">Policies</a><button class="footer-cookie-settings" type="button" data-cookie="manage">Cookie settings</button></div>`;
}
function setShopMenuOpen(open) {
  const drawer = document.querySelector('#shop-menu');
  const backdrop = document.querySelector('.menu-backdrop');
  const toggle = document.querySelector('.menu-toggle');
  if (!drawer || !backdrop || !toggle) return;
  drawer.hidden = false;
  drawer.classList.toggle('open', open);
  drawer.setAttribute('aria-hidden', String(!open));
  backdrop.hidden = !open;
  document.body.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close shop menu' : 'Open shop menu');
  if (open) drawer.querySelector('a')?.focus({ preventScroll: true });
  else {
    drawer.hidden = true;
    if (document.activeElement?.closest('#shop-menu')) toggle.focus({ preventScroll: true });
  }
}
function updateNavigation(route) {
  document.querySelectorAll('.primary-nav [data-route], .shop-drawer [data-route]').forEach((link) => {
    const target = link.dataset.route;
    if (target === route) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  });
  const checkoutLink = document.querySelector('.header-cta');
  if (checkoutLink) {
    const quantity = getCart().reduce((sum, line) => sum + line.quantity, 0);
    checkoutLink.href = quantity ? '#payment' : '#catalog';
    checkoutLink.innerHTML = quantity ? `Review order (${quantity}) <span aria-hidden="true">↗</span>` : 'Explore services <span aria-hidden="true">↗</span>';
  }
  setShopMenuOpen(false);
}
function render() {
  const route = currentRoute();
  root.innerHTML = `<div class="route-enter">${pages[route]()}</div>`;
  updateNavigation(route);
  document.title = `${route === 'home' ? 'Vehicle advice, with a clear direction' : route.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())} — Naledi Consultants`;
  renderFooter();
  if (route === 'catalog') applyCatalogFilter();
}
function applyCatalogFilter() {
  const search = (document.querySelector('#catalog-search')?.value || '').trim().toLowerCase();
  const filtered = SERVICES.filter((service) => (activeFilter === 'all' || service.category === activeFilter) && `${service.title} ${service.short} ${service.description}`.toLowerCase().includes(search));
  const list = document.querySelector('#service-list');
  if (list) list.innerHTML = serviceCards(filtered);
}
function showToast(message) {
  document.querySelector('.toast')?.remove();
  const el = document.createElement('div');
  el.className = 'toast'; el.setAttribute('role','status'); el.textContent = message;
  document.body.append(el);
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.remove(), 2800);
}
function addService(id) {
  const service = selectedService(id); if (!service) return;
  const cart = getCart(); const existing = cart.find((line) => line.id === id);
  if (existing) existing.quantity += 1; else cart.push({ id: service.id, title: service.title, price: service.price, quantity: 1 });
  saveCart(cart); updateNavigation(currentRoute()); showToast(`${service.title} added to your preview order.`);
}
function setConsent(value) {
  const serialized = encodeURIComponent(JSON.stringify(value));
  document.cookie = `naledi_cookie_consent=${serialized}; Max-Age=31536000; Path=/; SameSite=Lax`;
  renderCookieBanner();
}
function readConsent() {
  const match = document.cookie.match(/(?:^|; )naledi_cookie_consent=([^;]+)/);
  if (!match) return null;
  try { return JSON.parse(decodeURIComponent(match[1])); } catch { return null; }
}
function renderCookieBanner() {
  const consent = readConsent();
  if (consent) { cookieRoot.innerHTML = ''; return; }
  cookieRoot.innerHTML = `<section class="cookie-banner" role="dialog" aria-modal="false" aria-labelledby="cookie-title"><div class="cookie-head"><h2 id="cookie-title">Your cookie choice.</h2><button class="cookie-close" type="button" aria-label="Dismiss cookie notice" data-cookie="essential">×</button></div><p>We use one essential cookie to remember this choice. Optional measurement cookies are off in this preview. Choose your preference.</p><div class="cookie-settings"><label><input type="checkbox" checked disabled> Essential · always on</label><label><input id="analytics-consent" type="checkbox"> Analytics · optional</label></div><div class="cookie-actions"><button type="button" data-cookie="accept">Accept selection</button><button type="button" data-cookie="essential">Essential only</button><button type="button" data-cookie="settings">Cookie settings</button></div></section>`;
}
window.addEventListener('hashchange', render);
if (!location.hash) history.replaceState(null, '', '#home');
render(); renderCookieBanner();

document.addEventListener('click', (event) => {
  const menuToggle = event.target.closest('.menu-toggle');
  if (menuToggle) { setShopMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true'); return; }
  if (event.target.closest('[data-menu-close]')) { setShopMenuOpen(false); return; }
  const add = event.target.closest('[data-add]');
  if (add) { addService(add.dataset.add); return; }
  const filter = event.target.closest('[data-filter]');
  if (filter) { activeFilter = filter.dataset.filter; document.querySelectorAll('[data-filter]').forEach((button) => button.setAttribute('aria-pressed', String(button === filter))); applyCatalogFilter(); return; }
  const remove = event.target.closest('[data-remove]');
  if (remove) { saveCart(getCart().filter((line) => line.id !== remove.dataset.remove)); render(); return; }
  const auth = event.target.closest('[data-auth]');
  if (auth) { sessionStorage.setItem('naledi_auth_mode', auth.dataset.auth); render(); return; }
  if (event.target.closest('[data-signout]')) { sessionStorage.removeItem('naledi_demo_account'); render(); return; }
  const cookie = event.target.closest('[data-cookie]');
  if (cookie) {
    if (cookie.dataset.cookie === 'settings') { document.querySelector('.cookie-settings')?.classList.toggle('open'); return; }
    if (cookie.dataset.cookie === 'manage') { document.cookie = 'naledi_cookie_consent=; Max-Age=0; Path=/; SameSite=Lax'; renderCookieBanner(); return; }
    const analytics = cookie.dataset.cookie === 'accept' && document.querySelector('#analytics-consent')?.checked;
    setConsent({ essential: true, analytics: Boolean(analytics), savedAt: new Date().toISOString() }); return;
  }
});
document.addEventListener('input', (event) => { if (event.target.id === 'catalog-search') applyCatalogFilter(); });
document.addEventListener('submit', (event) => {
  const form = event.target.closest('.preview-form'); if (!form) return;
  event.preventDefault();
  const status = form.querySelector('.form-status');
  if (form.dataset.form === 'account') {
    const data = new FormData(form); const mode = sessionStorage.getItem('naledi_auth_mode') || 'signin';
    const previewUser = { email: data.get('email'), name: mode === 'register' ? data.get('name') : (String(data.get('email')).split('@')[0] || 'Naledi customer') };
    sessionStorage.setItem('naledi_demo_account', JSON.stringify(previewUser)); render(); return;
  }
  if (form.dataset.form === 'payment') {
    if (!getCart().length) { status.textContent = 'Choose a consultation from the catalog before reviewing a payment preview.'; }
    else { status.textContent = 'Preview complete. No request, booking, payment, or personal information was sent or saved.'; }
  } else {
    status.textContent = 'Preview only. Your enquiry has not been sent or stored. The live contact form will be connected during integration.';
  }
  status.classList.add('visible');
});

document.addEventListener('keydown', (event) => {
  const menuOpen = document.querySelector('.menu-toggle')?.getAttribute('aria-expanded') === 'true';
  if (event.key === 'Escape' && menuOpen) { setShopMenuOpen(false); return; }
  if (event.key !== 'Tab' || !menuOpen) return;
  const drawer = document.querySelector('#shop-menu');
  const focusable = [...drawer.querySelectorAll('a[href], button:not([disabled])')];
  const first = focusable[0]; const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
