const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const faqItems = document.querySelectorAll(".faq-item");
    const faqAnswers = document.querySelectorAll(".faq-answer");


document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu open/close on hamburger click
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener("click", function() {
      // Handle Active State Switch
      navLinks.forEach(item => item.classList.remove("active"));
      this.classList.add("active");

      // Close Menu
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
});

// Process
document.addEventListener("DOMContentLoaded", function () {
    const processSteps = document.querySelectorAll(".process-step");
    const processTrack = document.querySelector(".process-track");

    if (!processSteps.length || !processTrack) return;

    let processCurrentStep = 0;

    function processGoToStep(index) {
        processCurrentStep = index;

        // Move carousel
        processTrack.style.transform =
            `translateX(-${index * 25}%)`;

        // Update active step
        processSteps.forEach((step, stepIndex) => {
            step.classList.toggle(
                "process-step-active",
                stepIndex === index
            );
        });
    }

    processSteps.forEach((step, index) => {
        step.addEventListener("click", function () {
            processGoToStep(index);
        });
    });

    // Initialize
    processGoToStep(0);
});


// Faq accordion
    faqItems.forEach((item, index) => {
      const button = item.querySelector(".faq-button");

      button.addEventListener("click", () => {

        // Remove active state from all questions
        faqItems.forEach((faqItem) => {
          faqItem.classList.remove("is-active");
        });

        // Remove active state from all answers
        faqAnswers.forEach((answer) => {
          answer.classList.remove("is-active");
        });

        // Activate clicked question
        item.classList.add("is-active");

        // Activate corresponding answer
        if (faqAnswers[index]) {
          faqAnswers[index].classList.add("is-active");
        }
      });
    });



/* =========================================
       TESTIMONIALS CAROUSEL
    ========================================= */

    const testimonialsTrack =
      document.getElementById("testimonialsTrack");

    const testimonialsPrev =
      document.getElementById("testimonialsPrev");

    const testimonialsNext =
      document.getElementById("testimonialsNext");

    const testimonialsDots =
      document.getElementById("testimonialsDots");


    let testimonialsCards = Array.from(
      testimonialsTrack.querySelectorAll(".testimonials-card")
    );

    let testimonialsCurrent = 0;

    let testimonialsIsMoving = false;

    let testimonialsAutoplay;


    /* =========================================
       HOW MANY CARDS ARE VISIBLE?
    ========================================= */

    function testimonialsVisibleCards() {

      if (window.innerWidth <= 600) {
        return 1;
      }

      if (window.innerWidth <= 850) {
        return 2;
      }

      return 3;
    }


    /* =========================================
       CREATE INFINITE CLONES
    ========================================= */

    function testimonialsCreateClones() {

      /*
        Clone the first few cards and put them
        at the end so the carousel can continue
        moving forward infinitely.
      */

      const visible =
        testimonialsVisibleCards();

      for (let i = 0; i < visible; i++) {

        const clone =
          testimonialsCards[i].cloneNode(true);

        clone.classList.add(
          "testimonials-card-clone"
        );

        testimonialsTrack.appendChild(clone);
      }


      /*
        Clone the last few cards and put them
        before the original cards.
      */

      for (
        let i = testimonialsCards.length - visible;
        i < testimonialsCards.length;
        i++
      ) {

        const clone =
          testimonialsCards[i].cloneNode(true);

        clone.classList.add(
          "testimonials-card-clone"
        );

        testimonialsTrack.insertBefore(
          clone,
          testimonialsTrack.firstChild
        );
      }

      /*
        Recalculate all cards after cloning.
      */

      testimonialsCards =
        Array.from(
          testimonialsTrack.querySelectorAll(
            ".testimonials-card"
          )
        );
    }


    /* =========================================
       CARD WIDTH
    ========================================= */

    function testimonialsGetStep() {

      const card =
        testimonialsTrack.querySelector(
          ".testimonials-card"
        );

      const cardWidth =
        card.getBoundingClientRect().width;

      const trackStyle =
        window.getComputedStyle(
          testimonialsTrack
        );

      const gap =
        parseFloat(trackStyle.columnGap) || 0;

      return cardWidth + gap;
    }


    /* =========================================
       SET POSITION
    ========================================= */

    function testimonialsSetPosition(
      position,
      animate = true
    ) {

      const step =
        testimonialsGetStep();

      testimonialsTrack.style.transition =
        animate
          ? "transform 0.55s cubic-bezier(.22,.61,.36,1)"
          : "none";

      testimonialsTrack.style.transform =
        `translateX(-${position * step}px)`;
    }


    /* =========================================
       DOTS
    ========================================= */

    function testimonialsCreateDots() {

      testimonialsDots.innerHTML = "";

      /*
        We use one dot per original card group.
      */

      const total =
        testimonialsCards.length -
        (testimonialsVisibleCards() * 2);

      const visible =
        testimonialsVisibleCards();

      const dotCount =
        Math.max(1, total - visible + 1);

      for (let i = 0; i < dotCount; i++) {

        const dot =
          document.createElement("button");

        dot.type = "button";

        dot.className =
          "testimonials-dot";

        dot.setAttribute(
          "aria-label",
          `Go to testimonial ${i + 1}`
        );

        dot.addEventListener("click", () => {

          testimonialsCurrent =
            i + visible;

          testimonialsSetPosition(
            testimonialsCurrent
          );

          testimonialsUpdateDots();
          testimonialsRestartAutoplay();

        });

        testimonialsDots.appendChild(dot);
      }

      testimonialsUpdateDots();
    }


    /* =========================================
       UPDATE ACTIVE DOT
    ========================================= */

    function testimonialsUpdateDots() {

      const dots =
        testimonialsDots.querySelectorAll(
          ".testimonials-dot"
        );

      if (!dots.length) return;

      const originalTotal =
        testimonialsCards.length -
        (testimonialsVisibleCards() * 2);

      let activeIndex =
        testimonialsCurrent -
        testimonialsVisibleCards();

      activeIndex =
        ((activeIndex % originalTotal) +
          originalTotal) %
        originalTotal;

      dots.forEach((dot, index) => {

        dot.classList.toggle(
          "is-active",
          index === activeIndex
        );

      });
    }


    /* =========================================
       NEXT
    ========================================= */

    function testimonialsGoNext() {

      if (testimonialsIsMoving) return;

      testimonialsIsMoving = true;

      testimonialsCurrent++;

      testimonialsSetPosition(
        testimonialsCurrent
      );

      testimonialsUpdateDots();
    }


    /* =========================================
       PREVIOUS
    ========================================= */

    function testimonialsGoPrevious() {

      if (testimonialsIsMoving) return;

      testimonialsIsMoving = true;

      testimonialsCurrent--;

      testimonialsSetPosition(
        testimonialsCurrent
      );

      testimonialsUpdateDots();
    }


    /* =========================================
       HANDLE INFINITE LOOP
    ========================================= */

    testimonialsTrack.addEventListener(
      "transitionend",
      () => {

        const visible =
          testimonialsVisibleCards();

        const originalTotal =
          testimonialsCards.length -
          (visible * 2);


        /*
          If we've reached the cloned cards
          at the end, instantly jump back
          to the corresponding original card.
        */

        if (
          testimonialsCurrent >=
          originalTotal + visible
        ) {

          testimonialsCurrent =
            visible;

          testimonialsSetPosition(
            testimonialsCurrent,
            false
          );
        }


        /*
          If we've reached the cloned cards
          at the beginning, jump forward.
        */

        if (
          testimonialsCurrent < visible
        ) {

          testimonialsCurrent =
            originalTotal +
            visible -
            1;

          testimonialsSetPosition(
            testimonialsCurrent,
            false
          );
        }


        testimonialsIsMoving = false;

        testimonialsUpdateDots();

      }
    );


    /* =========================================
       BUTTON EVENTS
    ========================================= */

    testimonialsNext.addEventListener(
      "click",
      testimonialsGoNext
    );

    testimonialsPrev.addEventListener(
      "click",
      testimonialsGoPrevious
    );


    /* =========================================
       AUTOPLAY
    ========================================= */

    function testimonialsStartAutoplay() {

      clearInterval(testimonialsAutoplay);

      testimonialsAutoplay =
        setInterval(() => {

          testimonialsGoNext();

        }, 4000);
    }


    function testimonialsStopAutoplay() {

      clearInterval(testimonialsAutoplay);

    }


    function testimonialsRestartAutoplay() {

      testimonialsStopAutoplay();

      testimonialsStartAutoplay();

    }


    /* =========================================
       PAUSE WHEN HOVERING
    ========================================= */

    const testimonialsCarousel =
      document.querySelector(
        ".testimonials-carousel"
      );

    testimonialsCarousel.addEventListener(
      "mouseenter",
      testimonialsStopAutoplay
    );

    testimonialsCarousel.addEventListener(
      "mouseleave",
      testimonialsStartAutoplay
    );


    /* =========================================
       TOUCH / SWIPE
    ========================================= */

    let testimonialsTouchStart = 0;

    let testimonialsTouchEnd = 0;


    testimonialsCarousel.addEventListener(
      "touchstart",
      (event) => {

        testimonialsTouchStart =
          event.touches[0].clientX;

        testimonialsStopAutoplay();

      },
      { passive: true }
    );


    testimonialsCarousel.addEventListener(
      "touchend",
      (event) => {

        testimonialsTouchEnd =
          event.changedTouches[0].clientX;

        const distance =
          testimonialsTouchStart -
          testimonialsTouchEnd;

        if (Math.abs(distance) > 50) {

          if (distance > 0) {
            testimonialsGoNext();
          } else {
            testimonialsGoPrevious();
          }

        }

        testimonialsStartAutoplay();

      },
      { passive: true }
    );


    /* =========================================
       INITIALIZE
    ========================================= */

    function testimonialsInitialize() {

      /*
        Remove existing clones when resizing.
      */

      const clones =
        testimonialsTrack.querySelectorAll(
          ".testimonials-card-clone"
        );

      clones.forEach((clone) => {
        clone.remove();
      });


      /*
        Reset original cards.
      */

      testimonialsCards =
        Array.from(
          testimonialsTrack.querySelectorAll(
            ".testimonials-card"
          )
        );


      /*
        Create clones.
      */

      testimonialsCreateClones();


      /*
        Start at the first original card.
      */

      const visible =
        testimonialsVisibleCards();

      testimonialsCurrent =
        visible;


      testimonialsSetPosition(
        testimonialsCurrent,
        false
      );


      testimonialsCreateDots();

    }


    testimonialsInitialize();


    /* =========================================
       RESPONSIVE REINITIALIZATION
    ========================================= */

    let testimonialsResizeTimer;

    window.addEventListener(
      "resize",
      () => {

        clearTimeout(
          testimonialsResizeTimer
        );

        testimonialsResizeTimer =
          setTimeout(() => {

            testimonialsInitialize();

          }, 200);

      }
    );


    /* Start autoplay */

    testimonialsStartAutoplay();
