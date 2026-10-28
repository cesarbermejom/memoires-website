// Cookie consent for Google Analytics. gtag.js is not loaded at all until the
// visitor accepts (Consent Mode "basic"), so nothing reaches Google before a
// yes. The choice lives in localStorage; the footer "Cookies" button reopens
// the banner so it can be withdrawn as easily as it was given.
(() => {
  const GA_ID = "G-SZ75GLM4NL";
  const KEY = "consent";

  const read = () => {
    try {
      return localStorage.getItem(KEY);
    } catch {
      return null;
    }
  };
  const write = (value) => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
  };

  function loadAnalytics() {
    if (window.gtag) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      dataLayer.push(arguments);
    };
    gtag("js", new Date());
    gtag("config", GA_ID);
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.append(script);
  }

  // GA writes _ga cookies on the bare domain (.memoires.app), so expire them
  // both there and on the current host.
  function clearAnalyticsCookies() {
    const domain = location.hostname.replace(/^www\./, "");
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.split("=")[0].trim();
      if (!name.startsWith("_ga")) continue;
      document.cookie = `${name}=; max-age=0; path=/`;
      document.cookie = `${name}=; max-age=0; path=/; domain=.${domain}`;
    }
  }

  // Reject and Accept share one style on purpose: refusing must be as easy
  // and as visible as agreeing.
  const button =
    "inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-full border border-line bg-paper px-5 text-sm font-semibold text-ink transition-colors duration-200 hover:border-amber-glow";

  function showBanner() {
    if (document.getElementById("consent")) return;
    const banner = document.createElement("div");
    banner.id = "consent";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.className =
      "fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[60] mx-auto max-w-xl rounded-2xl border border-line bg-card p-5 text-sm text-ink shadow-[var(--shadow-hover)] sm:p-6";
    banner.innerHTML = `
      <p class="leading-relaxed text-ink-soft text-pretty">
        Can we use Google Analytics cookies to count visits to this website?
        They stay off unless you accept, and they have nothing to do with the
        app.
        <a href="/privacy/#website" class="font-medium text-amber underline underline-offset-2">Details</a>
      </p>
      <div class="mt-4 flex gap-3">
        <button type="button" data-consent="denied" class="${button}">Reject</button>
        <button type="button" data-consent="granted" class="${button}">Accept</button>
      </div>`;
    banner.addEventListener("click", (event) => {
      const choice = event.target.closest("[data-consent]")?.dataset.consent;
      if (!choice) return;
      const previous = read();
      write(choice);
      banner.remove();
      if (choice === "granted") {
        loadAnalytics();
      } else if (previous === "granted") {
        // gtag.js is already running on this page; a reload is the only way
        // to unload it.
        clearAnalyticsCookies();
        location.reload();
      }
    });
    document.body.append(banner);
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-cookie-settings]")) showBanner();
  });

  const choice = read();
  if (choice === "granted") loadAnalytics();
  else if (choice !== "denied") showBanner();
})();
