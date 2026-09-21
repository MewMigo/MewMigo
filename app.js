function label(category) {
  const labels = {
    toys: "Toys",
    furniture: "Furniture",
    feeding: "Feeding",
    litter: "Litter",
    grooming: "Grooming",
    travel: "Travel & Safety"
  };

  return labels[category] || category;
}

function productCard(product) {
  return `
    <article class="product-card">
      <div class="product-icon">${product.icon}</div>
      <div class="product-body">
        <span class="pill">${label(product.category)}</span>
        <h3>${product.name}</h3>
        <p class="muted">${product.description}</p>
        <div class="product-meta">
          <span>Best for: <strong>${product.bestFor}</strong></span>
        </div>
        <a class="btn small primary" href="${product.url}" target="_blank" rel="nofollow sponsored noopener">
          Check price at ${product.retailer} →
        </a>
      </div>
    </article>
  `;
}

function renderProducts(list, target) {
  const el = document.querySelector(target);
  if (!el) return;

  el.innerHTML = list.map(productCard).join("") || '<div class="empty">No products matched your search.</div>';
}

function initShop() {
  const grid = document.querySelector("#product-grid");
  if (!grid || typeof PRODUCTS === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const initialCategory = params.get("category") || "all";

  const categorySelect = document.querySelector("#category");
  const searchInput = document.querySelector("#search");

  if (categorySelect) {
    categorySelect.value = initialCategory;
  }

  function update() {
    const q = (searchInput ? searchInput.value : "").toLowerCase().trim();
    const cat = categorySelect ? categorySelect.value : "all";

    const filtered = PRODUCTS.filter((product) => {
      const matchesCategory = cat === "all" || product.category === cat;
      const haystack = `${product.name} ${product.description} ${product.bestFor} ${product.category}`.toLowerCase();
      const matchesSearch = !q || haystack.includes(q);
      return matchesCategory && matchesSearch;
    });

    renderProducts(filtered, "#product-grid");
  }

  if (searchInput) {
    searchInput.addEventListener("input", update);
  }

  if (categorySelect) {
    categorySelect.addEventListener("change", update);
  }

  update();
}

function initMobileNav() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-header nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

function initializePage() {
  if (typeof PRODUCTS !== "undefined") {
    renderProducts(PRODUCTS.slice(0, 6), "#featured-products");
  }

  initShop();
  initMobileNav();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePage);
} else {
  initializePage();
}
