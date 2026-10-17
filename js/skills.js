document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. SCROLL REVEAL ANIMATIONS
    // ==========================================

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        prefersReducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    } else {
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
                rootMargin: "0px 0px -30px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    }

    // ==========================================
    // 2. MOBILE NAVBAR
    // Bootstrap handles opening and closing.
    // This code closes it after navigation.
    // ==========================================

    const navbarCollapse = document.querySelector("#skillsNavbar");

    const navLinks = document.querySelectorAll(
        "#skillsNavbar .nav-link, #skillsNavbar .nav-cta"
    );

    if (navbarCollapse && window.bootstrap) {
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (
                    navbarCollapse.classList.contains("show") &&
                    window.innerWidth < 992
                ) {
                    const collapse =
                        window.bootstrap.Collapse.getOrCreateInstance(
                            navbarCollapse
                        );

                    collapse.hide();
                }
            });
        });
    }

    // ==========================================
    // 3. NAVBAR SCROLL EFFECT
    // ==========================================

    const navbar = document.querySelector(".skills-navbar");

    function updateNavbar() {
        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();

    // ==========================================
    // 4. SMOOTH SCROLL
    // ==========================================

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            const target = document.querySelector(href);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });
        });
    });

    // ==========================================
    // 5. CURRENT FOOTER YEAR
    // ==========================================

    document.querySelectorAll(".current-year").forEach((element) => {
        element.textContent = new Date().getFullYear();
    });

    // ==========================================
    // 6. TECHNOLOGY CARD INTERACTIONS
    // ==========================================

    const techCards = document.querySelectorAll(
        ".tech-card, .workflow-card, .learning-tech-card"
    );

    techCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.classList.add("is-hovered");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("is-hovered");
        });
    });

    // ==========================================
    // 7. CONSOLE MESSAGE
    // ==========================================

    console.log(
        "Philips Ajibola | Skills page loaded successfully."
    );
});