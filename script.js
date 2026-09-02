const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1499,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2499,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 1999,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    name: "Backpack",
    price: 999,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 5,
    name: "Sunglasses",
    price: 799,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 6,
    name: "Classic Watch",
    price: 1799,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80"
  }
];

let cart = [];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

function displayProducts() {
  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  const filtered = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search);
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (filtered.length === 0) {
    productGrid.innerHTML = "<p>No products found.</p>";
    return;
  }

  productGrid.innerHTML = filtered.map(product => `
    <div class="card">
      <img src="${product.image}" alt="${product.name}">
      <div class="card-body">
        <span class="category">${product.category}</span>
        <h3>${product.name}</h3>
        <p class="price">₹${product.price.toLocaleString("en-IN")}</p>
        <button class="add-btn" onclick="addToCart(${product.id})">
          Add to Cart
        </button>
      </div>
    </div>
  `).join("");
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({...product, quantity: 1});
  }

  updateCart();
  alert(product.name + " added to cart!");
}

function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = count;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty">Your cart is empty.</p>';
    cartTotal.textContent = "0";
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-row">
      <div>
        <strong>${item.name}</strong>
        <p>₹${item.price.toLocaleString("en-IN")} × ${item.quantity}</p>
      </div>
      <div>
        <button onclick="changeQuantity(${item.id}, -1)">−</button>
        <button onclick="changeQuantity(${item.id}, 1)">+</button>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = total.toLocaleString("en-IN");
}

function changeQuantity(id, amount) {
  const item = cart.find(item => item.id === id);
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== id);
  }

  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

cartBtn.addEventListener("click", () => {
  cartModal.classList.remove("hidden");
  updateCart();
});

closeCart.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

cartModal.addEventListener("click", event => {
  if (event.target === cartModal) {
    cartModal.classList.add("hidden");
  }
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Order placed successfully! This is a demo checkout.");
  cart = [];
  updateCart();
  cartModal.classList.add("hidden");
});

searchInput.addEventListener("input", displayProducts);
categoryFilter.addEventListener("change", displayProducts);

displayProducts();
updateCart();