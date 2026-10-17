
/* =========================================================
   PHILIPS AJIBOLA — PERSONAL PORTFOLIO
   File: js/script.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. MOBILE NAVIGATION
    // ==========================================

    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener("click", () => {
            const isOpen = navbarCollapse.classList.toggle("show");

            navbarToggler.setAttribute("aria-expanded", String(isOpen));

            const icon = navbarToggler.querySelector("i");

            if (icon) {
                icon.classList.toggle("bi-list", !isOpen);
                icon.classList.toggle("bi-x-lg", isOpen);
            }
        });

        // Close mobile navigation after clicking a link
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navbarCollapse.classList.remove("show");
                navbarToggler.setAttribute("aria-expanded", "false");

                const icon = navbarToggler.querySelector("i");

                if (icon) {
                    icon.classList.remove("bi-x-lg");
                    icon.classList.add("bi-list");
                }
            });
        });

        // Close navigation when clicking outside it
        document.addEventListener("click", (event) => {
            const clickedInsideNavbar =
                navbarCollapse.contains(event.target) ||
                navbarToggler.contains(event.target);

            if (!clickedInsideNavbar && navbarCollapse.classList.contains("show")) {
                navbarCollapse.classList.remove("show");
                navbarToggler.setAttribute("aria-expanded", "false");

                const icon = navbarToggler.querySelector("i");

                if (icon) {
                    icon.classList.remove("bi-x-lg");
                    icon.classList.add("bi-list");
                }
            }
        });
    }

    // ==========================================
    // 2. STICKY NAVBAR EFFECT
    // ==========================================

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbar, { passive: true });
    updateNavbar();

    // ==========================================
    // 3. SCROLL REVEAL ANIMATIONS
    // ==========================================

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("active");
        });
    }

    // ==========================================
    // 4. ACTIVE NAVIGATION LINK ON SCROLL
    // ==========================================

    const sections = document.querySelectorAll("main section[id]");

    function updateActiveNavLink() {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.id;
            }
        });

        navLinks.forEach((link) => {
            const target = link.getAttribute("href");

            link.classList.toggle(
                "active",
                target === `#${currentSection}` && currentSection !== ""
            );
        });
    }

    window.addEventListener("scroll", updateActiveNavLink, {
        passive: true
    });

    updateActiveNavLink();

    // ==========================================
    // 5. PROJECT FILTERING
    // ==========================================

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = (
                button.dataset.filter || "all"
            ).toLowerCase();

            // Update active filter button
            filterButtons.forEach((filterButton) => {
                filterButton.classList.remove("active");
                filterButton.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            // Show matching projects
            projectCards.forEach((card) => {
                const categories = (
                    card.dataset.category || "other"
                )
                    .toLowerCase()
                    .split(/\s+/);

                const shouldShow =
                    selectedFilter === "all" ||
                    categories.includes(selectedFilter);

                card.classList.toggle("hide-project", !shouldShow);
            });
        });
    });

    // ==========================================
    // 6. SKILL BAR ANIMATIONS
    // ==========================================

    const skillBars = document.querySelectorAll(".skill-progress");

    function animateSkillBars() {
        skillBars.forEach((bar) => {
            const skillLevel = bar.dataset.progress;

            if (skillLevel !== undefined) {
                const percentage = Math.min(
                    100,
                    Math.max(0, Number(skillLevel) || 0)
                );

                bar.style.setProperty("--skill-level", `${percentage}%`);
            }
        });
    }

    if ("IntersectionObserver" in window) {
        const skillObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateSkillBars();
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.2 }
        );

        const skillsSection = document.querySelector("#skills");

        if (skillsSection) {
            skillObserver.observe(skillsSection);
        }
    } else {
        animateSkillBars();
    }

    // ==========================================
    // 7. CURRENT YEAR IN FOOTER
    // ==========================================

    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach((element) => {
        element.textContent = new Date().getFullYear();
    });

    // ==========================================
    // 8. BACK-TO-TOP BUTTON
    // ==========================================

    const backToTopButtons = document.querySelectorAll(".back-to-top");

    backToTopButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const href = button.getAttribute("href");

            // Allow ordinary external links to behave normally
            if (href === "#" || href === "#top") {
                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        });
    });

    // ==========================================
    // 9. CONTACT FORM VALIDATION
    // ==========================================

    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const nameInput = contactForm.querySelector(
                '[name="name"], [name="fullName"]'
            );

            const emailInput = contactForm.querySelector(
                '[name="email"]'
            );

            const messageInput = contactForm.querySelector(
                '[name="message"]'
            );

            const name = nameInput?.value.trim() || "";
            const email = emailInput?.value.trim() || "";
            const message = messageInput?.value.trim() || "";

            if (!name || !email || !message) {
                alert("Please complete all required fields.");
                return;
            }

            // This portfolio currently validates the form locally.
            // Connect a backend or form service to actually send messages.
            alert(
                `Thanks, ${name}! Your form is valid. ` +
                "The contact form still needs an email service or backend to send your message."
            );
        });
    }

    // ==========================================
    // 10. DYNAMIC TYPING EFFECT
    // ==========================================

    const typedElement = document.querySelector(".typed-text");

    if (typedElement) {
        const words = [
            "Frontend Developer",
            "Web Developer",
            "UI Enthusiast"
        ];

        let wordIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (deleting) {
                characterIndex--;
            } else {
                characterIndex++;
            }

            typedElement.textContent = currentWord.substring(
                0,
                characterIndex
            );

            let delay = deleting ? 55 : 100;

            if (!deleting && characterIndex === currentWord.length) {
                deleting = true;
                delay = 1500;
            } else if (deleting && characterIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                delay = 350;
            }

            window.setTimeout(typeEffect, delay);
        }

        typeEffect();
    }

    // ==========================================
    // 11. IMAGE FALLBACK
    // ==========================================

    const images = document.querySelectorAll("img");

    images.forEach((image) => {
        image.addEventListener("error", () => {
            image.classList.add("image-unavailable");
        });
    });

    // ==========================================
    // 12. REDUCED MOTION SUPPORT
    // ==========================================

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        document.documentElement.style.scrollBehavior = "auto";
    }

    console.log("Philips Ajibola's portfolio JavaScript loaded successfully.");
});