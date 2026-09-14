const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const faqItems = document.querySelectorAll(".faq-item");
    const faqAnswers = document.querySelectorAll(".faq-answer");

// Toggle mobile menu open/close on hamburger click
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

    if (!processSteps.length) return;

    const processSwiper = new Swiper(".process-carousel", {
        slidesPerView: 1,
        spaceBetween: 0,

        speed: 500,

        // Enable mouse/touch dragging
        allowTouchMove: true,

        // Don't loop unless you specifically want
        // step 4 -> step 1 behavior
        loop: false,

        // Optional
        grabCursor: true,

        on: {
            init: function () {
                updateProcessStep(this.activeIndex);
            },

            slideChange: function () {
                updateProcessStep(this.activeIndex);
            }
        }
    });


    function updateProcessStep(index) {

        processSteps.forEach((step, stepIndex) => {

            step.classList.toggle(
                "process-step-active",
                stepIndex === index
            );

        });

    }


    // Click step navigation
    processSteps.forEach((step, index) => {

        step.addEventListener("click", function () {
            processSwiper.slideTo(index);
        });

    });

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


// TESTIMONIAL 
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("testimonialTrack");
  const cards = Array.from(track.children);
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("dotsContainer");

  let currentIndex = 0;

  // Determine cards per view depending on window size
  const getCardsPerView = () => {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
  };

  // Get total slides needed
  const getMaxIndex = () => {
    return Math.max(0, cards.length - getCardsPerView());
  };

  // Create indicator dots dynamically
  const renderDots = () => {
    dotsContainer.innerHTML = "";
    const totalDots = getMaxIndex() + 1;

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  };

  // Move slider to specific index
  const goToSlide = (index) => {
    const maxIndex = getMaxIndex();
    currentIndex = Math.min(Math.max(index, 0), maxIndex);

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 24; // matches CSS gap
    const moveAmount = (cardWidth + gap) * currentIndex;

    track.style.transform = `translateX(-${moveAmount}px)`;

    updateControls();
  };

  // Update dots & button disabled states
  const updateControls = () => {
    const dots = Array.from(dotsContainer.children);
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= getMaxIndex();
  };

  // Event Listeners
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) goToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < getMaxIndex()) goToSlide(currentIndex + 1);
  });

  // Re-calculate on window resize
  window.addEventListener("resize", () => {
    renderDots();
    goToSlide(Math.min(currentIndex, getMaxIndex()));
  });

  // Initial setup
  renderDots();
  updateControls();
});