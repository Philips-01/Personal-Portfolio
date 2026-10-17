document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("projectsNavbar");
  const navMenu = document.getElementById("projectsNav");
  const filterButtons = document.querySelectorAll(".filter-btn[data-filter]");
  const projectItems = document.querySelectorAll(".project-item[data-category]");
  const visibleProjectCount = document.getElementById("visibleProjectCount");
  const emptyProjects = document.getElementById("emptyProjects");
  const currentYear = document.getElementById("currentYear");
  const backToTop = document.getElementById("backToTop");

  // Update footer year.
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Navbar background effect on scroll.
  function updateNavbar() {
    if (!navbar) return;

    navbar.classList.toggle("scrolled", window.scrollY > 35);
  }

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  // Reveal elements as they enter the viewport.
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback for browsers without IntersectionObserver.
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // Filter projects by category.
  function filterProjects(category) {
    let visibleCount = 0;

    projectItems.forEach((item) => {
      const itemCategory = item.dataset.category;
      const shouldShow = category === "all" || itemCategory === category;

      item.classList.toggle("is-hidden", !shouldShow);

      if (shouldShow) {
        visibleCount++;
        item.setAttribute("aria-hidden", "false");
      } else {
        item.setAttribute("aria-hidden", "true");
      }
    });

    // Update active filter styling and accessibility state.
    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === category;

      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    // Update the visible project count.
    if (visibleProjectCount) {
      visibleProjectCount.textContent = String(visibleCount).padStart(2, "0");
    }

    // Show a message if the selected category has no projects.
    if (emptyProjects) {
      emptyProjects.classList.toggle("d-none", visibleCount !== 0);
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterProjects(button.dataset.filter);
    });
  });

  // "View All Projects" empty-state button also uses data-filter="all".
  // The main filter listener handles it as well.
  if (emptyProjects) {
    const emptyStateButton = emptyProjects.querySelector('[data-filter="all"]');

    if (emptyStateButton) {
      emptyStateButton.addEventListener("click", () => {
        filterProjects("all");
      });
    }
  }

  // Close the mobile menu after selecting a navigation link.
  if (navMenu && window.bootstrap) {
    navMenu.querySelectorAll(".nav-link, .nav-contact-btn").forEach((link) => {
      link.addEventListener("click", () => {
        const collapse = window.bootstrap.Collapse.getInstance(navMenu);

        if (collapse && navMenu.classList.contains("show")) {
          collapse.hide();
        }
      });
    });
  }

  // Back-to-top link.
  if (backToTop) {
    backToTop.addEventListener("click", (event) => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth"
      });
    });
  }

  console.log("Philips Ajibola's Projects page is ready.");
});