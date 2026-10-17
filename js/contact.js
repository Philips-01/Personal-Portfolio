document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("contactNavbar");
  const navMenu = document.getElementById("contactNav");

  const contactForm = document.getElementById("contactForm");
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const projectType = document.getElementById("projectType");
  const budget = document.getElementById("budget");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  const characterCount = document.getElementById("characterCount");
  const formFeedback = document.getElementById("formFeedback");
  const currentYear = document.getElementById("currentYear");
  const backToTop = document.getElementById("backToTop");

  // Replace this with the email address where you want to receive messages.
  const recipientEmail = "your-email@example.com";

  // Footer year.
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Navbar scroll effect.
  function updateNavbar() {
    if (!navbar) return;

    navbar.classList.toggle("scrolled", window.scrollY > 35);
  }

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  // Reveal animations.
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
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // Close the mobile menu after navigation.
  if (navMenu && window.bootstrap) {
    navMenu.querySelectorAll(".nav-link, .contact-nav-btn").forEach((link) => {
      link.addEventListener("click", () => {
        const collapse = window.bootstrap.Collapse.getInstance(navMenu);

        if (collapse && navMenu.classList.contains("show")) {
          collapse.hide();
        }
      });
    });
  }

  // Back to top.
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

  // Contact method placeholders.
  document.querySelectorAll("[data-placeholder-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const destination = link.getAttribute("href");

      if (!destination || destination === "#") {
        event.preventDefault();

        const platform = link.dataset.placeholderLink;
        const platformName =
          platform === "github" ? "GitHub" :
          platform === "linkedin" ? "LinkedIn" :
          "social profile";

        showFeedback(
          `Add your actual ${platformName} profile URL in contact.html before using this link.`,
          "error"
        );
      }
    });
  });

  // Character counter.
  function updateCharacterCount() {
    if (!message || !characterCount) return;

    characterCount.textContent = `${message.value.length} / 3000`;
  }

  if (message) {
    message.addEventListener("input", updateCharacterCount);
    updateCharacterCount();
  }

  // Feedback helper.
  function showFeedback(text, type) {
    if (!formFeedback) return;

    formFeedback.textContent = text;
    formFeedback.className = `form-feedback show ${type}`;
  }

  function clearFeedback() {
    if (!formFeedback) return;

    formFeedback.textContent = "";
    formFeedback.className = "form-feedback";
  }

  // Validation helpers.
  function setFieldError(field, errorId, errorMessage) {
    const errorElement = document.getElementById(errorId);

    if (field) {
      field.classList.toggle("is-invalid", Boolean(errorMessage));
      field.classList.toggle("is-valid", !errorMessage && field.value.trim() !== "");
      field.setAttribute("aria-invalid", String(Boolean(errorMessage)));
    }

    if (errorElement) {
      errorElement.textContent = errorMessage;
    }
  }

  function validateName() {
    const value = fullName.value.trim();

    if (value.length < 2) {
      setFieldError(fullName, "fullNameError", "Please enter your name.");
      return false;
    }

    setFieldError(fullName, "fullNameError", "");
    return true;
  }

  function validateEmail() {
    const value = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value)) {
      setFieldError(email, "emailError", "Enter a valid email address.");
      return false;
    }

    setFieldError(email, "emailError", "");
    return true;
  }

  function validateProjectType() {
    if (!projectType.value) {
      setFieldError(projectType, "projectTypeError", "Please select a topic.");
      return false;
    }

    setFieldError(projectType, "projectTypeError", "");
    return true;
  }

  function validateSubject() {
    if (subject.value.trim().length < 3) {
      setFieldError(subject, "subjectError", "Please enter a subject of at least 3 characters.");
      return false;
    }

    setFieldError(subject, "subjectError", "");
    return true;
  }

  function validateMessage() {
    const value = message.value.trim();

    if (value.length < 10) {
      setFieldError(message, "messageError", "Your message must contain at least 10 characters.");
      return false;
    }

    setFieldError(message, "messageError", "");
    return true;
  }

  // Clear field errors as the user edits.
  [
    [fullName, validateName],
    [email, validateEmail],
    [projectType, validateProjectType],
    [subject, validateSubject],
    [message, validateMessage]
  ].forEach(([field, validator]) => {
    if (!field) return;

    field.addEventListener("input", () => {
      if (field.classList.contains("is-invalid") || field.classList.contains("is-valid")) {
        validator();
      }

      clearFeedback();
    });

    field.addEventListener("change", () => {
      if (field.classList.contains("is-invalid") || field.classList.contains("is-valid")) {
        validator();
      }

      clearFeedback();
    });
  });

  // Topic cards can preselect the relevant form option.
  document.querySelectorAll("[data-topic]").forEach((link) => {
    link.addEventListener("click", () => {
      const topic = link.dataset.topic;

      if (projectType) {
        projectType.value = topic;
        validateProjectType();
      }
    });
  });

  // Validate and prepare an email draft.
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      clearFeedback();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isProjectTypeValid = validateProjectType();
      const isSubjectValid = validateSubject();
      const isMessageValid = validateMessage();

      const isFormValid =
        isNameValid &&
        isEmailValid &&
        isProjectTypeValid &&
        isSubjectValid &&
        isMessageValid;

      if (!isFormValid) {
        showFeedback(
          "Please correct the highlighted fields before continuing.",
          "error"
        );

        const firstInvalidField = contactForm.querySelector(".is-invalid");

        if (firstInvalidField) {
          firstInvalidField.focus();
        }

        return;
      }

      // Prevent accidentally using the example recipient address.
      if (
        !recipientEmail ||
        recipientEmail === "your-email@example.com" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)
      ) {
        showFeedback(
          "Your form is valid. Replace recipientEmail in js/contact.js with your actual email address to enable email drafts.",
          "error"
        );
        return;
      }

      const formData = {
        name: fullName.value.trim(),
        email: email.value.trim(),
        topic: projectType.value,
        budget: budget.value || "Not specified",
        subject: subject.value.trim(),
        message: message.value.trim()
      };

      const emailSubject = `[Portfolio Contact] ${formData.subject}`;

      const emailBody = [
        "Hello Philips,",
        "",
        "You have received a message from your portfolio contact form.",
        "",
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        `Topic: ${formData.topic}`,
        `Budget: ${formData.budget}`,
        "",
        "Message:",
        formData.message,
        "",
        "Please reply directly to the sender's email address above."
      ].join("\n");

      const mailtoUrl =
        `mailto:${recipientEmail}` +
        `?subject=${encodeURIComponent(emailSubject)}` +
        `&body=${encodeURIComponent(emailBody)}`;

      showFeedback(
        "Your message is ready. Your email application should open with the details filled in. Review it and press Send there.",
        "success"
      );

      // Opening the email application does not guarantee delivery.
      window.location.href = mailtoUrl;
    });
  }

  console.log("Philips Ajibola's Contact page is ready.");
});