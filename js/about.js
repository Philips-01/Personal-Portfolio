document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. SCROLL REVEAL ANIMATIONS
    // ==========================================

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
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
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    }

    // ==========================================
    // 2. CLOSE MOBILE NAVBAR AFTER NAVIGATION
    // ==========================================

    const navbarCollapse = document.querySelector("#mainNavbar");
    const navLinks = document.querySelectorAll(
        "#mainNavbar .nav-link, #mainNavbar .nav-cta"
    );

    if (navbarCollapse && window.bootstrap) {
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (
                    navbarCollapse.classList.contains("show") &&
                    window.innerWidth < 992
                ) {
                    const collapseInstance =
                        window.bootstrap.Collapse.getOrCreateInstance(
                            navbarCollapse
                        );

                    collapseInstance.hide();
                }
            });
        });
    }

    // ==========================================
    // 3. CURRENT YEAR IN FOOTER
    // ==========================================

    const yearElements = document.querySelectorAll(".current-year");
    const currentYear = new Date().getFullYear();

    yearElements.forEach((element) => {
        element.textContent = currentYear;
    });

    // ==========================================
    // 4. SMOOTH SCROLL FOR INTERNAL LINKS
    // ==========================================

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: reduceMotion ? "auto" : "smooth",
                block: "start"
            });
        });
    });

    // ==========================================
    // 5. NAVBAR SCROLL EFFECT
    // ==========================================

    const navbar = document.querySelector(".about-navbar");

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
    // 6. PREVENT EMPTY PLACEHOLDER LINKS
    // ==========================================

    document.querySelectorAll('a[href="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
        });
    });

    // ==========================================
    // 7. DEVELOPMENT CONSOLE MESSAGE
    // ==========================================

    console.log(
        "About page loaded successfully — Philips Ajibola Portfolio."
    );
});