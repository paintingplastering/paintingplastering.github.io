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
});
