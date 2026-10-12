const KEY = "shadowbanned-cart";

function readCart() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}
function writeCart(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
  updateCartCount();
}
function updateCartCount() {
  const n = readCart().reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = `Bag ${n}`;
  });
}
function addItem(product) {
  const items = readCart();
  const found = items.find((i) => i.id === product.id && i.size === product.size);
  if (found) found.qty += 1;
  else items.push({ ...product, qty: 1 });
  writeCart(items);
  const toast = document.querySelector(".toast");
  if (toast) {
    toast.textContent = `${product.name} / ${product.size} added`;
    toast.style.display = "block";
    setTimeout(() => { toast.style.display = "none"; }, 1800);
  }
}
function money(cents) {
  return `$${(cents / 100).toFixed(0)}`;
}

document.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-add]");
  if (!btn) return;
  const card = btn.closest("[data-product]");
  const size = card.querySelector("select")?.value || "M";
  addItem({
    id: card.dataset.id,
    name: card.dataset.name,
    price: Number(card.dataset.price),
    image: card.querySelector("img")?.getAttribute("src") || "",
    size
  });
});

function renderCart() {
  const root = document.querySelector("[data-cart]");
  if (!root) return;
  const items = readCart();
  if (!items.length) {
    root.innerHTML = `<p class="muted">Your bag is empty. The algorithm has nothing to hide.</p>`;
    return;
  }
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  root.innerHTML = `
    ${items.map((item) => `
      <div class="bag-row">
        <img class="bag-thumb" src="${item.image || ""}" alt="${item.name}" />
        <div class="bag-copy">
          <strong>${item.name}</strong>
          <div class="tag">Size ${item.size} · Qty ${item.qty}</div>
        </div>
        <div class="bag-price">${money(item.price * item.qty)}</div>
      </div>
    `).join("")}
    <div class="card-body"><strong>Total</strong><strong>${money(total)}</strong></div>
    <p class="notice">Checkout is not connected yet. This bag is a demo so you can see the flow. When you are ready, swap this for Shopify, Square, or Stripe.</p>
    <button class="btn" id="clear-cart" type="button">Clear bag</button>
  `;
  document.getElementById("clear-cart")?.addEventListener("click", () => {
    writeCart([]);
    renderCart();
  });
}

document.addEventListener("click", (event) => {
  const toggle = event.target.closest(".menu-toggle");
  if (toggle) {
    event.preventDefault();
    toggle.closest(".nav")?.classList.toggle("open");
    return;
  }
  if (!event.target.closest(".nav")) {
    document.querySelector(".nav.open")?.classList.remove("open");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
  const form = document.querySelector("[data-contact]");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent("Shadowbanned inquiry");
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`);
    window.location.href = `mailto:info@shadowbanned.com?subject=${subject}&body=${body}`;
  });
});
