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

  // Testimonial carousel (scoped to #testimonials so other carousels are unaffected)
  const testimonialSection = document.querySelector("#testimonials");
  const slides = testimonialSection ? testimonialSection.querySelectorAll(".carousel-slide") : [];
  const prevBtn = testimonialSection ? testimonialSection.querySelector(".prev-btn") : null;
  const nextBtn = testimonialSection ? testimonialSection.querySelector(".next-btn") : null;
  const dotsContainer = testimonialSection ? testimonialSection.querySelector(".carousel-dots") : null;
  let currentSlide = 0;

  if (slides.length && prevBtn && nextBtn && dotsContainer) {
    slides.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        goToSlide(index);
      });
      dotsContainer.appendChild(dot);
    });

    const dots = testimonialSection.querySelectorAll(".dot");

    function updateDotVisibility(currentIndex, totalDots) {
      dots.forEach((dot) => {
        dot.classList.remove("active", "close-dot", "visible-dot");
        dot.style.left = "50%";
      });

      const visibleDotsCount = Math.min(5, totalDots);
      const halfVisible = Math.floor(visibleDotsCount / 2);
      const dotIndicesToShow = [];

      for (let i = currentIndex - halfVisible; i <= currentIndex + halfVisible; i++) {
        let wrappedIndex = i;
        if (i < 0) wrappedIndex = totalDots + i;
        if (i >= totalDots) wrappedIndex = i - totalDots;

        if (dotIndicesToShow.length < visibleDotsCount && !dotIndicesToShow.includes(wrappedIndex)) {
          dotIndicesToShow.push(wrappedIndex);
        }
      }

      dotIndicesToShow.sort((a, b) => a - b);

      dotIndicesToShow.forEach((dotIndex, positionIndex) => {
        const dot = dots[dotIndex];
        const offset = (positionIndex - Math.floor(visibleDotsCount / 2)) * 25;
        dot.style.left = `calc(50% + ${offset}px)`;

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

    function showSlide(n) {
      slides.forEach((slide) => {
        slide.classList.remove("active");
      });
      slides[n].classList.add("active");
      updateDotVisibility(n, slides.length);
      slides.forEach((slide) => {
        const video = slide.querySelector("video");
        if (video) video.pause();
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }

    function goToSlide(n) {
      currentSlide = n;
      showSlide(currentSlide);
    }

    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);
    updateDotVisibility(currentSlide, slides.length);
  }

  initProjectsSection();
});

function escapeHtml(text) {
  const d = document.createElement("div");
  d.textContent = text;
  return d.innerHTML;
}

/**
 * Add more entries to PROJECTS_DATA when you upload additional project images
 * (e.g. img/project-2-01.png, …) and match the same shape as project 1.
 */
function initProjectsSection() {
  const PROJECTS_DATA = [
    {
      title: "London Muslim Mosque — Exterior",
      description: "Commercial exterior painting, prep, and façade work.",
      images: Array.from({ length: 15 }, (_, i) => ({
        src: `img/project-1-${String(i + 1).padStart(2, "0")}.png`,
        alt: `London Muslim Mosque exterior painting — photo ${i + 1} of 15`,
      })),
    },
    {
      title: "Interior — Textured ceiling repair",
      description: "Popcorn ceiling patch, drywall, mud, and finish work.",
      images: Array.from({ length: 5 }, (_, i) => ({
        src: `img/project-2-${String(i + 1).padStart(2, "0")}.png`,
        alt: `Interior ceiling repair and textured finish — photo ${i + 1} of 5`,
      })),
    },
    {
      title: "Interior — Ceiling patch & skim",
      description: "Water-damage area, drywall patch, joint compound, and finish prep.",
      images: Array.from({ length: 3 }, (_, i) => ({
        src: `img/project-3-${String(i + 1).padStart(2, "0")}.png`,
        alt: `Interior ceiling drywall repair and skim — photo ${i + 1} of 3`,
      })),
    },
    {
      title: "Interior — Basement suite & kitchenette",
      description: "Stairs, wall prep, millwork, kitchenette, and finished basement living space.",
      images: Array.from({ length: 4 }, (_, i) => ({
        src: `img/project-4-${String(i + 1).padStart(2, "0")}.png`,
        alt: `Basement interior remodel and kitchenette — photo ${i + 1} of 4`,
      })),
    },
    {
      title: "Interior — Insulation, vapor barrier & flooring",
      description: "Wall access, insulation, sealing, utilities, and laminate floor install.",
      images: [
        { src: "img/project-5-01.png", alt: "Wall repair, insulation, and flooring — photo 1 of 4" },
        { src: "img/project-5-02.png", alt: "Wall repair, insulation, and flooring — photo 2 of 4" },
        { src: "img/project-5-03.png", alt: "Wall repair, insulation, and flooring — photo 3 of 4" },
        { src: "img/project-5-05.png", alt: "Wall repair, insulation, and flooring — photo 4 of 4" },
      ],
    },
    {
      title: "Interior — Lath, insulation & plaster",
      description: "Stripped lath, vapor barrier, and ceiling and wall plaster prep.",
      images: Array.from({ length: 9 }, (_, i) => ({
        src: `img/project-6-${String(i + 1).padStart(2, "0")}.png`,
        alt: `Interior plaster and lath restoration — photo ${i + 1} of 9`,
      })),
    },
    {
      title: "Garage — Interior finish & storage",
      description: "Painted garage interior, wall shelving, and door hardware.",
      images: Array.from({ length: 4 }, (_, i) => ({
        src: `img/project-7-${String(i + 1).padStart(2, "0")}.png`,
        alt: `Garage interior painting and shelving — photo ${i + 1} of 4`,
      })),
    },
    {
      title: "Interior — Plaster removal & new drywall ceiling",
      description: "Lath and plaster demo, drywall install, mud, and wall prep in a blue room.",
      images: Array.from({ length: 9 }, (_, i) => ({
        src: `img/project-8-${String(i + 1).padStart(2, "0")}.png`,
        alt: `Ceiling plaster removal and drywall finishing — photo ${i + 1} of 9`,
      })),
    },
  ];

  const slidesRoot = document.getElementById("projects-slides");
  const dotsWrap = document.getElementById("projects-carousel-dots");
  const lb = document.getElementById("project-lightbox");
  if (!slidesRoot || !dotsWrap || !lb || PROJECTS_DATA.length === 0) return;

  const nProjects = PROJECTS_DATA.length;

  slidesRoot.innerHTML = PROJECTS_DATA.map((proj, pi) => {
    const cover = proj.images[proj.images.length - 1];
    const count = proj.images.length;
    return `
    <div class="project-carousel-slide${pi === 0 ? " active" : ""}" data-project-index="${pi}">
      <button type="button" class="project-tile" data-project-index="${pi}" aria-label="${escapeHtml(proj.title)} — open ${count} photos">
        <img src="${escapeHtml(cover.src)}" alt="${escapeHtml(cover.alt)}" loading="${pi === 0 ? "eager" : "lazy"}" width="560" height="560" />
        <div class="project-tile-overlay">
          <span class="project-tile-title">${escapeHtml(proj.title)}</span>
          <span class="project-tile-meta">${count} photo${count === 1 ? "" : "s"} · Click to view</span>
        </div>
      </button>
    </div>`;
  }).join("");

  dotsWrap.innerHTML = PROJECTS_DATA.map(
    (_, i) =>
      `<button type="button" class="project-dot${i === 0 ? " active" : ""}" data-index="${i}" aria-label="Show project ${i + 1}"></button>`
  ).join("");

  const slideEls = () => slidesRoot.querySelectorAll(".project-carousel-slide");

  let currentProject = 0;
  let scrollSyncing = false;
  const prevProj = document.querySelector(".project-carousel-prev");
  const nextProj = document.querySelector(".project-carousel-next");

  function applyProjectState(index) {
    const i = (index + nProjects) % nProjects;
    currentProject = i;
    slideEls().forEach((el, di) => {
      el.classList.toggle("active", di === currentProject);
    });
    dotsWrap.querySelectorAll(".project-dot").forEach((d, di) => {
      d.classList.toggle("active", di === currentProject);
    });
  }

  function syncActiveFromScrollPosition() {
    if (scrollSyncing) return;
    const slides = [...slideEls()];
    if (slides.length === 0) return;
    const root = slidesRoot.getBoundingClientRect();
    let best = 0;
    let bestRatio = -1;
    slides.forEach((el, di) => {
      const r = el.getBoundingClientRect();
      const overlap = Math.min(r.right, root.right) - Math.max(r.left, root.left);
      const ratio = r.width > 0 ? Math.max(0, overlap) / r.width : 0;
      if (ratio > bestRatio) {
        bestRatio = ratio;
        best = di;
      }
    });
    if (bestRatio > 0.15 && best !== currentProject) {
      applyProjectState(best);
    }
  }

  function goProject(i, scrollIntoView = true) {
    applyProjectState(i);
    if (!scrollIntoView || nProjects <= 1) return;
    const slides = slideEls();
    const target = slides[currentProject];
    if (!target) return;
    scrollSyncing = true;
    target.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    window.setTimeout(() => {
      scrollSyncing = false;
    }, 650);
  }

  let scrollDebounce;
  function onProjectsScroll() {
    if (scrollSyncing) return;
    clearTimeout(scrollDebounce);
    scrollDebounce = window.setTimeout(syncActiveFromScrollPosition, 60);
  }

  slidesRoot.addEventListener("scroll", onProjectsScroll, { passive: true });
  slidesRoot.addEventListener("scrollend", syncActiveFromScrollPosition, { passive: true });

  if (nProjects <= 1) {
    if (prevProj) prevProj.style.display = "none";
    if (nextProj) nextProj.style.display = "none";
    dotsWrap.style.display = "none";
  } else {
    prevProj?.addEventListener("click", () => goProject(currentProject - 1));
    nextProj?.addEventListener("click", () => goProject(currentProject + 1));
    dotsWrap.addEventListener("click", (e) => {
      const dot = e.target.closest(".project-dot");
      if (dot) goProject(Number(dot.dataset.index));
    });
  }

  window.requestAnimationFrame(() => {
    syncActiveFromScrollPosition();
  });

  const lbImg = document.getElementById("project-lightbox-img");
  const lbCap = document.getElementById("project-lightbox-caption");
  const lbClose = lb.querySelector(".project-lightbox-close");
  const lbBackdrop = lb.querySelector(".project-lightbox-backdrop");
  const lbPrev = lb.querySelector(".project-lightbox-prev");
  const lbNext = lb.querySelector(".project-lightbox-next");

  let lbProject = 0;
  let lbImage = 0;

  function updateLightboxImage() {
    const imgs = PROJECTS_DATA[lbProject].images;
    const im = imgs[lbImage];
    lbImg.src = im.src;
    lbImg.alt = im.alt;
    lbCap.textContent = `${PROJECTS_DATA[lbProject].title} — ${lbImage + 1} / ${imgs.length}`;
  }

  function openLightbox(pi, ii) {
    lbProject = pi;
    lbImage = ii;
    updateLightboxImage();
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lbClose?.focus();
  }

  function closeLightbox() {
    lb.hidden = true;
    document.body.style.overflow = "";
  }

  function lightboxPrev() {
    const imgs = PROJECTS_DATA[lbProject].images;
    lbImage = lbImage <= 0 ? imgs.length - 1 : lbImage - 1;
    updateLightboxImage();
  }

  function lightboxNext() {
    const imgs = PROJECTS_DATA[lbProject].images;
    lbImage = (lbImage + 1) % imgs.length;
    updateLightboxImage();
  }

  slidesRoot.addEventListener("click", (e) => {
    const tile = e.target.closest(".project-tile");
    if (tile) openLightbox(Number(tile.dataset.projectIndex), 0);
  });

  lbClose?.addEventListener("click", closeLightbox);
  lbBackdrop?.addEventListener("click", closeLightbox);
  lbPrev?.addEventListener("click", (ev) => {
    ev.stopPropagation();
    lightboxPrev();
  });
  lbNext?.addEventListener("click", (ev) => {
    ev.stopPropagation();
    lightboxNext();
  });

  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      lightboxPrev();
    } else if (e.key === "ArrowRight") {
      lightboxNext();
    }
  });

  let lbTouchStartX = 0;
  const lbInner = lb.querySelector(".project-lightbox-inner");
  const swipeTarget = lbInner || lb;
  swipeTarget.addEventListener(
    "touchstart",
    (e) => {
      if (lb.hidden) return;
      lbTouchStartX = e.touches[0]?.screenX ?? 0;
    },
    { passive: true }
  );
  swipeTarget.addEventListener(
    "touchend",
    (e) => {
      if (lb.hidden) return;
      const x = e.changedTouches[0].screenX;
      const dx = x - lbTouchStartX;
      if (Math.abs(dx) < 56) return;
      if (dx < 0) lightboxNext();
      else lightboxPrev();
    },
    { passive: true }
  );
}
