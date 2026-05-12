function initScrollSpy() {
  const nav = document.querySelector("[data-scrollspy-nav]");

  if (!nav) {
    return;
  }

  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sectionById = new Map();

  links.forEach((link) => {
    const targetId = link.getAttribute("href")?.slice(1);
    if (!targetId) return;

    const section = document.getElementById(targetId);
    if (section) sectionById.set(targetId, section);
  });

  if (!sectionById.size) {
    return;
  }

  const setActive = (activeId) => {
    links.forEach((link) => {
      const id = link.getAttribute("href")?.slice(1);
      link.classList.toggle("is-active", id === activeId);
      link.setAttribute("aria-current", id === activeId ? "true" : "false");
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target?.id) {
        setActive(visible.target.id);
      }
    },
    {
      rootMargin: "-20% 0px -65% 0px",
      threshold: [0.15, 0.3, 0.6],
    }
  );

  sectionById.forEach((section) => observer.observe(section));
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof window.initFlowbite === "function") {
    window.initFlowbite();
  }

  initScrollSpy();
});
