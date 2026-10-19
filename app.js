/*
  PORTFOLIO CUSTOMIZATION
  1) Change developerName and tagline.
  2) Replace example projects with your real apps.
  3) Add only links you control or have permission to share.
  4) Never put API keys, passwords, bot tokens or private data in this public file.
*/
const portfolioConfig = {
  developerName: "NEON LABS",
  tagline: "Independent App Developer",
  contacts: [
    { label: "GitHub", url: "", icon: "⌘" },
    { label: "Telegram", url: "", icon: "➤" },
    { label: "Email", url: "", icon: "✉" }
  ]
};

// Replace examples below. Use https:// links for public demos/downloads.
// Set demo/download/source to "" if you do not have a real link yet.
const projects = [
  {
    name: "Gujarat Job & Yojana",
    category: "Android",
    status: "IN PROGRESS",
    icon: "✦",
    type: "GOVERNMENT UPDATES",
    description: "A planned all-in-one app for Gujarat job updates, government schemes, scholarships and verified official links.",
    tags: ["Android", "Firebase", "Updates"],
    demo: "",
    download: "",
    source: ""
  },
  {
    name: "FF Sensi Pro",
    category: "Gaming",
    status: "IN PROGRESS",
    icon: "⌖",
    type: "GAMING TOOL",
    description: "A Free Fire sensitivity companion concept with device profiles, presets and a gaming-inspired interface.",
    tags: ["Gaming", "Android", "UI Design"],
    demo: "",
    download: "",
    source: ""
  },
  {
    name: "Silent GMR Like Bot",
    category: "Gaming",
    status: "EXPERIMENT",
    icon: "↗",
    type: "TELEGRAM BOT",
    description: "A gaming-community bot project. Add a description of its supported, authorized features and current status.",
    tags: ["Python", "Telegram", "Bot"],
    demo: "",
    download: "",
    source: ""
  },
  {
    name: "Developer Toolkit",
    category: "Utility",
    status: "CONCEPT",
    icon: "⌘",
    type: "PRODUCTIVITY",
    description: "A place for small utilities and experiments that make everyday digital tasks easier.",
    tags: ["Utility", "Web", "Experiments"],
    demo: "",
    download: "",
    source: ""
  }
];

const $ = (selector) => document.querySelector(selector);
const safeUrl = (value) => {
  if (!value) return "";
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch { return ""; }
};
function makeLink(label, url, extraClass = "") {
  const valid = safeUrl(url);
  if (!valid) return `<span class="disabled ${extraClass}">${label} · SOON</span>`;
  return `<a class="${extraClass}" href="${valid}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
}
function renderProjects(filter = "all") {
  const shown = projects.filter(p => filter === "all" || p.category === filter);
  $("#projectGrid").innerHTML = shown.map((p, index) => `
    <article class="project-card">
      <div class="project-cover">
        <span class="cover-index">PROJECT / ${String(projects.indexOf(p)+1).padStart(2,"0")}</span>
        <div class="cover-icon" aria-hidden="true">${p.icon || "✦"}</div>
        <span class="cover-type">${p.type || p.category}</span>
      </div>
      <div class="project-info">
        <div class="project-meta"><h3>${escapeHTML(p.name)}</h3><span class="status">${escapeHTML(p.status || "PROJECT")}</span></div>
        <p>${escapeHTML(p.description)}</p>
        <div class="tags">${(p.tags || []).map(t => `<span>${escapeHTML(t)}</span>`).join("")}</div>
        <div class="project-actions">${makeLink("Demo", p.demo)}${makeLink("Download", p.download)}${makeLink("Source", p.source)}</div>
      </div>
    </article>`).join("");
  $("#projectCount").textContent = String(projects.length).padStart(2, "0");
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function renderContacts() {
  $("#contactLinks").innerHTML = portfolioConfig.contacts.map(c => {
    const url = safeUrl(c.url);
    return url ? `<a class="contact-link" href="${url}" target="_blank" rel="noopener noreferrer">${c.icon || "↗"} &nbsp; ${escapeHTML(c.label)} ↗</a>` :
      `<span class="contact-link">${c.icon || "↗"} &nbsp; Add ${escapeHTML(c.label)} link</span>`;
  }).join("");
}
function applyBrand() {
  const name = portfolioConfig.developerName || "YOUR NAME";
  $("#brandName").textContent = name.toUpperCase();
  $("#footerBrand").textContent = name.toUpperCase();
  $("#footerName").textContent = name;
  document.title = `${name} — App Developer Portfolio`;
}
$("#filters").addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  document.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b === button));
  renderProjects(button.dataset.filter);
});
$("#menuToggle").addEventListener("click", () => $("#nav").classList.toggle("open"));
$("#nav").addEventListener("click", event => { if (event.target.closest("a")) $("#nav").classList.remove("open"); });
$("#year").textContent = new Date().getFullYear();
applyBrand(); renderProjects(); renderContacts();
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}

// Scroll reveal animation with accessibility-friendly fallback.
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.hero-copy,.hero-art,.section-heading,.project-grid,.about-visual,.about-copy,.skills-section,.contact-box').forEach(el => {
    el.classList.add('reveal'); revealObserver.observe(el);
  });
}
