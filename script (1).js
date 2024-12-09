// Products Data
const products = [
  {
    id: 1,
    name: "Paket Sayuran Hijau",
    price: 50000,
    image: "foto/fto8.jpeg",
    description:
      "Bayam, kangkung, sawi, dan brokoli segar langsung dari petani.",
  },
  {
    id: 2,
    name: "Paket Buah Segar",
    price: 75000,
    image: "foto/fto2.jpeg",
    description: "Apel, jeruk, pisang, dan mangga pilihan kualitas terbaik.",
  },
  {
    id: 3,
    name: "Paket Bumbu Dapur",
    price: 35000,
    image: "foto/fto8.jpeg",
    description:
      "Bawang merah, bawang putih, jahe, lengkuas, dan bumbu dapur lengkap.",
  },
  {
    id: 4,
    name: "Paket Sayur Soup",
    price: 45000,
    image: "foto/fto7.jpeg",
    description: "Wortel, kentang, kol, daun bawang, dan seledri untuk soup.",
  },
];

// DOM Elements
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const productsGrid = document.getElementById("productsGrid");
const contactForm = document.getElementById("contactForm");

// Toggle Mobile Menu
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-container")) {
    navLinks.classList.remove("active");
  }
});

// Format price to IDR
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

// Render Products
const renderProducts = () => {
  productsGrid.innerHTML = products
    .map(
      (product) => `
        <div class="product-card fade-in">
            <img src="${product.image}" alt="${
        product.name
      }" class="product-image" loading="lazy">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${formatPrice(product.price)}</p>
                <p class="product-description">${product.description}</p>
                <button class="btn" onclick="orderProduct(${product.id})">
                    Pesan Sekarang
                </button>
            </div>
        </div>
    `
    )
    .join("");
};

// Order Product Function
const orderProduct = (productId) => {
  const product = products.find((p) => p.id === productId);
  if (product) {
    const whatsappMessage = encodeURIComponent(
      `Halo TOSAMA, saya ingin memesan ${product.name} seharga ${formatPrice(
        product.price
      )}`
    );
    window.open(`https://wa.me/081381818787?text=${whatsappMessage}`, "_blank");
  }
};

// Handle Contact Form
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  try {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show success message
    alert("Terima kasih! Pesan Anda telah terkirim.");
    contactForm.reset();
  } catch (error) {
    alert("Maaf, terjadi kesalahan. Silakan coba lagi.");
  }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Close mobile menu after clicking
      navLinks.classList.remove("active");
    }
  });
});

// Intersection Observer for Animation
const observeElements = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  document
    .querySelectorAll(".product-card, .feature-card, .contact-card")
    .forEach((element) => {
      observer.observe(element);
    });
};

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  observeElements();
});

// Add loading state to images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('img[loading="lazy"]');

  images.forEach((img) => {
    img.classList.add("skeleton");

    img.addEventListener("load", () => {
      img.classList.remove("skeleton");
    });
  });
});

// Handle scroll events for navbar
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.style.transform = "translateY(-100%)";
  } else {
    navbar.style.transform = "translateY(0)";
  }

  lastScroll = currentScroll;
});
