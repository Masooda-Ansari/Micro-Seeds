const PRODUCTS = [
  {
    id: 1,
    name: "Premium Wheat Seeds",
    category: "grain",
    description: "High-yield, drought-resistant wheat variety for better harvest even in semi-arid regions.",
    badge: "Best Seller",
    badgeClass: "",
    rating: 4.8,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80"
    // ☝️ Replace emoji:"🌾" with image:"YOUR_IMAGE_URL"
  },
  {
    id: 2,
    name: "Basmati Rice Seeds",
    category: "grain",
    description: "Aromatic long-grain rice with strong resistance to lodging and blast disease.",
    badge: "Organic",
    badgeClass: "organic",
    rating: 4.9,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Tomato F1 Hybrid",
    category: "vegetable",
    description: "Disease-resistant, high-yielding tomato variety with 90-day crop cycle.",
    badge: "New",
    badgeClass: "",
    rating: 4.7,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Spinach Micro Greens",
    category: "vegetable",
    description: "Fast-growing nutritious spinach perfect for micro-green production and home gardens.",
    badge: "Organic",
    badgeClass: "organic",
    rating: 4.6,
    reviews: 54,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Basil Herb Seeds",
    category: "herb",
    description: "Italian sweet basil with rich aroma, ideal for culinary and medicinal applications.",
    badge: "Popular",
    badgeClass: "",
    rating: 4.8,
    reviews: 83,
    image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Coriander Seeds",
    category: "herb",
    description: "Quick-germinating coriander seeds optimized for tropical climates and year-round cultivation.",
    badge: "Organic",
    badgeClass: "organic",
    rating: 4.7,
    reviews: 121,
    image: "https://www.vegetariantimes.com/wp-content/uploads/2017/01/edible-gardening-101-harvesting-coriander-seeds-2-corriander-seeds-leaves-powder.jpg"
  }
];

const TESTIMONIALS = [
  { name: "Ramesh Patel", role: "Wheat Farmer, Gujarat", text: "Micro Seeds' wheat variety gave me 40% more yield than my usual seeds. Exceptional quality and germination rate!", initials: "RP" },
  { name: "Sunita Devi", role: "Vegetable Grower, Bihar", text: "I've been using their tomato seeds for two seasons now. Disease resistance is remarkable and the fruits are firm.", initials: "SD" },
  { name: "Arjun Singh", role: "Rice Farmer, Punjab", text: "The Basmati seeds are truly superior. My crop is the best in the village this year. Thank you Micro Seeds!", initials: "AS" },
  { name: "Meera Nair", role: "Home Gardener, Kerala", text: "Started with the micro greens kit. So easy to grow and incredibly nutritious. Will order again!", initials: "MN" },
  { name: "Vijay Kumar", role: "Commercial Farmer, MP", text: "Bulk ordering was smooth, pricing was fair, and the seeds performed exactly as promised. Great company.", initials: "VK" },
  { name: "Lakshmi Rao", role: "Herb Farmer, Karnataka", text: "The basil and coriander seeds are outstanding. Germination was above 95%. Highly recommend!", initials: "LR" }
];

/* ===========================
   CART STATE
=========================== */
let cart = {};

/* ===========================
   LOADER
=========================== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1600);
});

/* ===========================
   RENDER PRODUCTS
=========================== */
function renderProducts(filter = 'all') {
  const grid = document.getElementById('products-grid');
  const filtered = filter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(p => `
    <div class="product-card reveal" data-id="${p.id}">
      <div class="product-card-img">

        <!-- ❌ OLD emoji version — DELETE THIS -->
        <!-- <div style="display:grid;place-items:center;height:100%;background:var(--parchment);font-size:5rem">${p.emoji}</div> -->

        <!-- ✅ NEW image version — USE THIS -->
        <img 
          src="${p.image}" 
          alt="${p.name}"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';"
        />
        <!-- Fallback if image fails to load -->
        <div style="display:none;place-items:center;height:100%;background:var(--parchment);color:var(--bark);font-size:0.9rem">
          No Image
        </div>

        ${p.badge ? `<span class="product-badge ${p.badgeClass}">${p.badge}</span>` : ''}
      </div>
      <div class="product-card-body">
        <div class="product-category">${p.category}</div>
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="product-footer">
          <div class="product-rating">
            <span class="stars">★★★★★</span>
            ${p.rating} (${p.reviews})
          </div>
          <button class="add-to-cart" onclick="addToCart(${p.id})" aria-label="Add to cart">+</button>
        </div>
      </div>
    </div>
  `).join('');

  setTimeout(() => observeReveal(), 50);
}

/* ===========================
   RENDER TESTIMONIALS (infinite)
=========================== */
function renderTestimonials() {
  const track = document.getElementById('testimonials-track');
  const all = [...TESTIMONIALS, ...TESTIMONIALS]; // duplicate for infinite
  track.innerHTML = all.map(t => `
    <div class="testimonial-card">
      <div class="quote-mark">"</div>
      <p>${t.text}</p>
      <div class="testimonial-author">
        <div class="author-avatar">${t.initials}</div>
        <div>
          <div class="author-name">${t.name}</div>
          <div class="author-role">${t.role}</div>
        </div>
      </div>
    </div>
  `).join('');
}

/* ===========================
   FILTER TABS
=========================== */
document.querySelectorAll('.filter-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
});

/* ===========================
   CART FUNCTIONS
=========================== */
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  if (cart[id]) {
    cart[id].qty++;
  } else {
    cart[id] = { ...product, qty: 1 };
  }
  updateCartUI();
  showToast(`${product.emoji} ${product.name} added to cart!`, 'success');
}

function removeFromCart(id) {
  if (cart[id]) {
    cart[id].qty--;
    if (cart[id].qty <= 0) delete cart[id];
    updateCartUI();
  }
}

function updateCartUI() {
  const items = Object.values(cart);
  const total = items.reduce((s, i) => s + i.qty, 0);
  const countEl = document.getElementById('cart-count');
  countEl.textContent = total;
  countEl.classList.toggle('visible', total > 0);

  const cartItemsEl = document.getElementById('cart-items');
  const cartFooter = document.getElementById('cart-footer');

  if (items.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🌱</div>
        <p>Your cart is empty.<br>Add some seeds!</p>
      </div>`;
    cartFooter.style.display = 'none';
    return;
  }

  cartItemsEl.innerHTML = items.map(item => `
    <div class="cart-item">
      <div style="font-size:2rem">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="removeFromCart(${item.id})">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="addToCart(${item.id})">+</button>
        </div>
      </div>
    </div>
  `).join('');

  cartFooter.style.display = 'block';
  document.getElementById('cart-total').textContent = `${total} Item${total > 1 ? 's' : ''}`;
}

function toggleCart() {
  document.getElementById('cart-overlay').classList.toggle('open');
  document.getElementById('cart-sidebar').classList.toggle('open');
  document.body.style.overflow = document.getElementById('cart-sidebar').classList.contains('open') ? 'hidden' : '';
}

function checkout() {
  const items = Object.values(cart);
  if (items.length === 0) return;
  const list = items.map(i => `${i.qty}x ${i.name}`).join(', ');
  document.getElementById('message').value = `Quote Request for: ${list}`;
  toggleCart();
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  showToast('📋 Items added to quote form!', 'success');
}

/* ===========================
   TOAST
=========================== */
function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✅' : '❌'}</span> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

/* ===========================
   CONTACT FORM
=========================== */
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  if (!name || !phone) {
    showToast('Please fill in your name and phone number.', 'error');
    return;
  }
  document.getElementById('contact-form').style.display = 'none';
  document.getElementById('form-success').style.display = 'block';
  showToast('Message sent successfully! 🌱', 'success');
});

/* ===========================
   NEWSLETTER
=========================== */
function subscribeNewsletter() {
  const email = document.getElementById('newsletter-email').value.trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }
  document.getElementById('newsletter-email').value = '';
  showToast('🌱 Welcome to Micro Seeds newsletter!', 'success');
}

/* ===========================
   NAVBAR SCROLL
=========================== */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 60);

  const btt = document.getElementById('back-to-top');
  btt.classList.toggle('visible', window.scrollY > 400);

  updateActiveNav();
});

function updateActiveNav() {
  const sections = ['hero', 'products', 'manufacturing', 'about', 'contact'];
  const links = document.querySelectorAll('.nav-links a');
  let current = 'hero';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) current = id;
  });
  links.forEach(a => {
    const href = a.getAttribute('href').replace('#', '');
    a.classList.toggle('active', href === current);
  });
}

/* ===========================
   HAMBURGER
=========================== */
document.getElementById('hamburger').addEventListener('click', function() {
  this.classList.toggle('open');
  document.getElementById('mobile-menu').classList.toggle('open');
});

function closeMobileMenu() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobile-menu').classList.remove('open');
}

/* ===========================
   SCROLL REVEAL
=========================== */
function observeReveal() {
  const els = document.querySelectorAll('.reveal:not(.visible)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

/* ===========================
   BACK TO TOP
=========================== */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ===========================
   INIT
=========================== */
renderProducts();
renderTestimonials();
observeReveal();
