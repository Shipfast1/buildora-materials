const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const menuButton = $(".menu-toggle");
menuButton.addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", document.body.classList.contains("menu-open"));
});
$$(".mobile-menu a").forEach(link => link.addEventListener("click", () => document.body.classList.remove("menu-open")));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$(".reveal").forEach(element => revealObserver.observe(element));

const productTrack = $(".product-track");
$(".product-next").addEventListener("click", () => productTrack.scrollBy({ left: 420, behavior: "smooth" }));
$(".product-prev").addEventListener("click", () => productTrack.scrollBy({ left: -420, behavior: "smooth" }));

const calculate = () => {
  const length = Number($("#length").value) || 0;
  const width = Number($("#width").value) || 0;
  const rate = Number($("#calc-product").value);
  const allowance = $("#waste").checked ? 1.1 : 1;
  const product = $("#calc-product").selectedIndex;
  const value = length * width * rate * allowance;
  const units = ["m²", "L", "L", " bags"];
  $("#estimate").textContent = `${product === 3 ? Math.ceil(value) : value.toFixed(1)}${units[product]}`;
};
["length", "width", "calc-product", "waste"].forEach(id => $(`#${id}`).addEventListener("input", calculate));

$("#add-estimate").addEventListener("click", () => {
  const selected = $("#calc-product").options[$("#calc-product").selectedIndex].text;
  const matching = $$('input[name="product"]').find(input => selected.toLowerCase().includes(input.value.toLowerCase().split(" ")[0]));
  if (matching) matching.checked = true;
  $('textarea[name="notes"]').value = `Estimator result: ${$("#estimate").textContent} of ${selected}.`;
  $("#quote").scrollIntoView({ behavior: "smooth" });
});

let currentStep = 1;
const showStep = step => {
  currentStep = step;
  $$(".form-step").forEach(panel => panel.classList.toggle("active", Number(panel.dataset.step) === step));
  $$(".form-progress span").forEach((bar, index) => bar.classList.toggle("active", index < step));
};
$$(".next-step").forEach(button => button.addEventListener("click", () => showStep(Math.min(3, currentStep + 1))));
$$(".back-step").forEach(button => button.addEventListener("click", () => showStep(Math.max(1, currentStep - 1))));

const ADMIN_WHATSAPP = "919962144145";
const ADMIN_EMAIL = "info@buildoramaterials.in";

const buildQuoteMessage = () => {
  const products = $$('input[name="product"]:checked').map(input => input.value).join(", ") || "Not specified";
  const project = $('select[name="project"]').value;
  const notes = $('textarea[name="notes"]').value.trim() || "No additional notes";
  const name = $('input[name="name"]').value.trim();
  const phone = $('input[name="phone"]').value.trim() || "Not provided";
  const email = $('input[name="email"]').value.trim();

  return [
    "New Quote Request - Buildora Materials",
    "",
    `Products: ${products}`,
    `Project type: ${project}`,
    `Project details: ${notes}`,
    "",
    `Customer: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`
  ].join("\n");
};

$("#quote-form").addEventListener("submit", event => {
  event.preventDefault();
  const message = buildQuoteMessage();
  const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
  const emailUrl = `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent("New quote request from " + $('input[name="name"]').value.trim())}&body=${encodeURIComponent(message)}`;

  $("#whatsapp-again").href = whatsappUrl;
  $("#email-quote").href = emailUrl;
  window.open(whatsappUrl, "_blank", "noopener");
  $(".form-progress").style.display = "none";
  $$(".form-step").forEach(step => step.classList.remove("active"));
  $(".form-success").style.display = "block";
});
$("#reset-form").addEventListener("click", () => {
  $("#quote-form").reset();
  $(".form-success").style.display = "none";
  $(".form-progress").style.display = "flex";
  showStep(1);
});

const statsObserver = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting) return;
  $$("[data-count]").forEach(counter => {
    const target = Number(counter.dataset.count);
    const duration = 1200;
    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      counter.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3))).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  statsObserver.disconnect();
}, { threshold: 0.4 });
statsObserver.observe($(".stats"));

const searchPanel = $(".search-panel");
$(".search-toggle").addEventListener("click", () => {
  searchPanel.classList.add("open");
  searchPanel.setAttribute("aria-hidden", "false");
  setTimeout(() => $("#site-search").focus(), 450);
});
$(".search-close").addEventListener("click", closeSearch);
function closeSearch() {
  searchPanel.classList.remove("open");
  searchPanel.setAttribute("aria-hidden", "true");
}
const catalog = [
  ["Epoxy flooring systems", "Metallic, self-leveling and industrial finishes"],
  ["Ceramic & porcelain tiles", "Indoor, outdoor, wall and floor collections"],
  ["Waterproofing systems", "Bathrooms, terraces, roofs and foundations"],
  ["Cement & repair mortars", "Structural and general-purpose materials"],
  ["Tile adhesives & grout", "Flexible bonds and designer grout colors"]
];
$("#site-search").addEventListener("input", event => {
  const query = event.target.value.toLowerCase();
  const matches = query ? catalog.filter(item => item.join(" ").toLowerCase().includes(query)) : [];
  $("#search-results").innerHTML = matches.map(item => `<a class="search-result" href="#quote"><strong>${item[0]}</strong><span>${item[1]} →</span></a>`).join("");
  $$(".search-result").forEach(result => result.addEventListener("click", closeSearch));
});

const modal = $(".modal");
$(".video-trigger").addEventListener("click", () => {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
});
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}
$(".modal-close").addEventListener("click", closeModal);
$(".modal-cta").addEventListener("click", closeModal);
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeModal();
    closeSearch();
  }
});

$("#newsletter").addEventListener("submit", event => {
  event.preventDefault();
  $("#newsletter-message").textContent = "You're on the list. Welcome to Buildora.";
  event.target.reset();
});

calculate();
