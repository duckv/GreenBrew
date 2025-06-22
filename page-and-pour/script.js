// Global state
let cart = [];
let currentPage = "home";

// Menu data
const menuItems = [
  {
    id: 1,
    name: "Butter Croissant",
    description: "Flaky, buttery pastry made with French butter",
    price: 3.5,
    category: "pastries",
    image: "🥐",
  },
  {
    id: 2,
    name: "Pain au Chocolat",
    description: "Croissant filled with rich dark chocolate",
    price: 4.25,
    category: "pastries",
    image: "🥐",
  },
  {
    id: 3,
    name: "Almond Danish",
    description: "Sweet pastry topped with sliced almonds and glaze",
    price: 4.75,
    category: "pastries",
    image: "🥐",
  },
  {
    id: 4,
    name: "Sourdough Loaf",
    description: "Traditional artisan sourdough, baked fresh daily",
    price: 6.5,
    category: "breads",
    image: "🥖",
  },
  {
    id: 5,
    name: "Multigrain Bread",
    description: "Hearty bread with seeds and whole grains",
    price: 7.25,
    category: "breads",
    image: "🍞",
  },
  {
    id: 6,
    name: "Baguette",
    description: "Classic French baguette with crispy crust",
    price: 4.0,
    category: "breads",
    image: "🥖",
  },
  {
    id: 7,
    name: "Chocolate Layer Cake",
    description: "Rich chocolate cake with three layers and ganache",
    price: 45.0,
    category: "cakes",
    image: "🍰",
  },
  {
    id: 8,
    name: "Red Velvet Cake",
    description: "Classic red velvet with cream cheese frosting",
    price: 42.0,
    category: "cakes",
    image: "🎂",
  },
  {
    id: 9,
    name: "Lemon Tart",
    description: "Tangy lemon curd in a buttery pastry shell",
    price: 5.5,
    category: "cakes",
    image: "🍋",
  },
  {
    id: 10,
    name: "Chocolate Chip Cookies",
    description: "Classic cookies with premium chocolate chips",
    price: 2.75,
    category: "cookies",
    image: "🍪",
  },
  {
    id: 11,
    name: "Oatmeal Raisin Cookies",
    description: "Chewy cookies with oats and plump raisins",
    price: 2.5,
    category: "cookies",
    image: "🍪",
  },
  {
    id: 12,
    name: "Sugar Cookies",
    description: "Decorated sugar cookies, perfect for any occasion",
    price: 3.0,
    category: "cookies",
    image: "🍪",
  },
  {
    id: 13,
    name: "Freshly Brewed Coffee",
    description: "Single-origin coffee, roasted in-house",
    price: 3.25,
    category: "beverages",
    image: "☕",
  },
  {
    id: 14,
    name: "Hot Chocolate",
    description: "Rich hot chocolate topped with whipped cream",
    price: 4.5,
    category: "beverages",
    image: "🍫",
  },
  {
    id: 15,
    name: "Fresh Orange Juice",
    description: "Squeezed fresh daily from local oranges",
    price: 3.75,
    category: "beverages",
    image: "🍊",
  },
];

// DOM elements
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const cartCountElement = document.getElementById("cart-count");
const floatingCartCountElement = document.getElementById("floating-cart-count");
const floatingCart = document.getElementById("floating-cart");
const toastContainer = document.getElementById("toast-container");
const contactForm = document.getElementById("contact-form");

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeNavigation();
  initializeMenuFilters();
  renderMenu();
  initializeContactForm();
  updateCartDisplay();
});

// Navigation functionality
function initializeNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const footerLinks = document.querySelectorAll(".footer-section a[data-page]");

  [...navLinks, ...footerLinks].forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const page = this.getAttribute("data-page");
      navigateToPage(page);
    });
  });
}

function navigateToPage(page) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((p) => {
    p.classList.remove("active");
  });

  // Show target page
  const targetPage = document.getElementById(`${page}-page`);
  if (targetPage) {
    targetPage.classList.add("active");
  }

  // Update navigation active state
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("data-page") === page) {
      link.classList.add("active");
    }
  });

  currentPage = page;

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Menu filtering functionality
function initializeMenuFilters() {
  const categoryButtons = document.querySelectorAll(".category-btn");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Filter menu items
      const category = this.getAttribute("data-category");
      filterMenu(category);
    });
  });
}

function filterMenu(category) {
  const filteredItems =
    category === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === category);

  renderMenuItems(filteredItems);
}

function renderMenu() {
  renderMenuItems(menuItems);
}

function renderMenuItems(items) {
  const menuGrid = document.getElementById("menu-grid");
  if (!menuGrid) return;

  menuGrid.innerHTML = items
    .map(
      (item) => `
    <div class="menu-item" data-category="${item.category}">
      <div class="item-content">
        <div class="item-image" style="font-size: 2rem; margin-bottom: 1rem;">${item.image}</div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="item-price">
          <span class="price">$${item.price.toFixed(2)}</span>
          <button class="btn btn-primary" onclick="addToCart('${item.name}', ${item.price})">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

// Cart functionality
function addToCart(itemName, price) {
  const existingItem = cart.find((item) => item.name === itemName);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: itemName,
      price: price,
      quantity: 1,
    });
  }

  updateCartDisplay();
  showToast(`${itemName} added to cart!`, "success");

  // Show floating cart if not already visible
  if (cart.length > 0) {
    floatingCart.classList.add("show");
  }
}

function removeFromCart(itemName) {
  cart = cart.filter((item) => item.name !== itemName);
  updateCartDisplay();

  if (cart.length === 0) {
    floatingCart.classList.remove("show");
  }
}

function updateCartDisplay() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Update cart count badges
  cartCountElement.textContent = totalItems;
  floatingCartCountElement.textContent = totalItems;

  // Update cart total
  cartTotalElement.textContent = totalPrice.toFixed(2);

  // Render cart items
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML =
      cart.length === 0
        ? '<p style="text-align: center; color: #6b7280; padding: 2rem;">Your cart is empty</p>'
        : cart
            .map(
              (item) => `
          <div class="cart-item">
            <div class="cart-item-info">
              <h4>${item.name}</h4>
              <p>Quantity: ${item.quantity}</p>
            </div>
            <div class="cart-item-price">
              $${(item.price * item.quantity).toFixed(2)}
              <button onclick="removeFromCart('${item.name}')" style="margin-left: 0.5rem; background: none; border: none; color: #ef4444; cursor: pointer;">✕</button>
            </div>
          </div>
        `,
            )
            .join("");
  }
}

function toggleCart() {
  cartModal.classList.toggle("active");
}

function checkout() {
  if (cart.length === 0) {
    showToast("Your cart is empty!", "error");
    return;
  }

  // Simulate checkout process
  showToast("Thank you for your order! We'll have it ready soon.", "success");
  cart = [];
  updateCartDisplay();
  toggleCart();
  floatingCart.classList.remove("show");
}

// Toast notifications
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-message">${message}</div>
  `;

  toastContainer.appendChild(toast);

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Contact form functionality
function initializeContactForm() {
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());

      // Simulate form submission
      console.log("Form submitted:", data);

      showToast(
        "Thank you for your message! We'll get back to you soon.",
        "success",
      );
      this.reset();
    });
  }
}

// Modal functionality
document.addEventListener("click", function (e) {
  if (e.target === cartModal) {
    toggleCart();
  }
});

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && cartModal.classList.contains("active")) {
    toggleCart();
  }
});

// Hero button functionality
document.addEventListener("DOMContentLoaded", function () {
  const heroBtns = document.querySelectorAll(".hero-buttons .btn");

  heroBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (
        this.textContent.includes("Order") ||
        this.textContent.includes("Browse")
      ) {
        navigateToPage("menu");
      } else if (this.textContent.includes("Menu")) {
        navigateToPage("menu");
      }
    });
  });
});

// Smooth scrolling for internal links
document.addEventListener("click", function (e) {
  if (
    e.target.tagName === "A" &&
    e.target.getAttribute("href")?.startsWith("#")
  ) {
    e.preventDefault();
    const targetId = e.target.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
});

// Header scroll effect
let lastScrollY = window.scrollY;

window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");

  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    // Scrolling down
    header.style.transform = "translateY(-100%)";
  } else {
    // Scrolling up
    header.style.transform = "translateY(0)";
  }

  lastScrollY = window.scrollY;
});

// Add transition to header
document.querySelector(".header").style.transition = "transform 0.3s ease";

// Loading animation for menu items
function animateMenuItems() {
  const menuItems = document.querySelectorAll(".menu-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 100);
        }
      });
    },
    { threshold: 0.1 },
  );

  menuItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(item);
  });
}

// Call animation when menu is rendered
const originalRenderMenuItems = renderMenuItems;
renderMenuItems = function (items) {
  originalRenderMenuItems(items);
  setTimeout(animateMenuItems, 100);
};

// Page load analytics (placeholder)
function trackPageView(page) {
  console.log(`Page viewed: ${page}`);
  // In a real application, you would send this data to an analytics service
}

// Track initial page load
trackPageView("home");

// Track navigation
const originalNavigateToPage = navigateToPage;
navigateToPage = function (page) {
  originalNavigateToPage(page);
  trackPageView(page);
};
