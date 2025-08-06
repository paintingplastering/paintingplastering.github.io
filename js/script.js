document.addEventListener("DOMContentLoaded", function () {
  const fadeInElements = document.querySelectorAll("section");
  const header = document.querySelector("header");

  window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 50);
  });

  let menu = document.querySelector("#menu-icon");
  let navlist = document.querySelector(".navlist");

  menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navlist.classList.toggle("open");
  };

  window.onscroll = () => {
    menu.classList.remove("bx-x");
    navlist.classList.remove("open");
  };

  function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= windowHeight && rect.bottom >= 0;
  }

  function onScroll() {
    for (const element of fadeInElements) {
      if (isElementVisible(element)) {
        element.classList.add("visible");
      }
    }
  }

  window.addEventListener("scroll", onScroll);
  onScroll();

  // Testimonial Carousel Functionality
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dotsContainer = document.querySelector(".carousel-dots");
  let currentSlide = 0;

  // Create dots for each slide
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  // Function to update dot visibility
  function updateDotVisibility(currentIndex, totalDots) {
    // Hide all dots first
    dots.forEach((dot) => {
      dot.classList.remove("active", "close-dot", "visible-dot");
      dot.style.left = "50%"; // Reset position
    });

    // Calculate visible dots (show max 5 dots at a time)
    const visibleDotsCount = Math.min(5, totalDots);
    const halfVisible = Math.floor(visibleDotsCount / 2);

    // Get the dot indices to show
    let dotIndicesToShow = [];

    for (let i = currentIndex - halfVisible; i <= currentIndex + halfVisible; i++) {
      // Handle wrapping around the carousel
      let wrappedIndex = i;
      if (i < 0) wrappedIndex = totalDots + i;
      if (i >= totalDots) wrappedIndex = i - totalDots;

      if (dotIndicesToShow.length < visibleDotsCount && !dotIndicesToShow.includes(wrappedIndex)) {
        dotIndicesToShow.push(wrappedIndex);
      }
    }

    // Sort dot indices for proper positioning
    dotIndicesToShow.sort((a, b) => a - b);

    // Position the dots
    dotIndicesToShow.forEach((dotIndex, positionIndex) => {
      const dot = dots[dotIndex];

      // Calculate offset from center (50%)
      const offset = (positionIndex - Math.floor(visibleDotsCount / 2)) * 25; // 25px spacing

      // Position and show this dot
      dot.style.left = `calc(50% + ${offset}px)`;

      // Add appropriate class based on distance from current slide
      if (dotIndex === currentIndex) {
        dot.classList.add("active");
      } else if (
        Math.abs(dotIndex - currentIndex) === 1 ||
        (dotIndex === 0 && currentIndex === totalDots - 1) ||
        (dotIndex === totalDots - 1 && currentIndex === 0)
      ) {
        dot.classList.add("close-dot");
      } else {
        dot.classList.add("visible-dot");
      }
    });
  }

  // Initialize the carousel
  function showSlide(n) {
    // Hide all slides
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Show the current slide
    slides[n].classList.add("active");

    // Update dot visibility and active state
    updateDotVisibility(n, slides.length);

    // Pause all videos when changing slides
    slides.forEach((slide) => {
      const video = slide.querySelector("video");
      if (video) video.pause();
    });
  }

  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  // Go to a specific slide
  function goToSlide(n) {
    currentSlide = n;
    showSlide(currentSlide);
  }

  // Add event listeners
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);

  // Initialize dot visibility for the first slide
  updateDotVisibility(currentSlide, slides.length);

  // Auto-advance the carousel (optional)
  // let carouselInterval = setInterval(nextSlide, 6000);

  // Pause auto-advance when hovering over carousel (optional)
  // const carouselContainer = document.querySelector('.carousel-container');
  // if (carouselContainer) {
  //   carouselContainer.addEventListener('mouseenter', () => {
  //     clearInterval(carouselInterval);
  //   });
  //   carouselContainer.addEventListener('mouseleave', () => {
  //     carouselInterval = setInterval(nextSlide, 6000);
  //   });
  // }
});
