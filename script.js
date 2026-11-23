/**
 * BEAST MODE FITNESS — JAVASCRIPT CONTROLLER
 * Production-quality vanilla JavaScript implementation.
 * Features:
 *   - Mobile drawer navigation with keyboard & ARIA support
 *   - Sticky navigation with scrollspy active highlighting
 *   - Video playback toggle & prefers-reduced-motion fallback
 *   - Program exploration modal with curriculum data injection
 *   - Pricing period toggle (Monthly / Annual 20% discount)
 *   - Interactive membership selection to form prefill & pulse
 *   - Responsive image gallery filtering
 *   - Interactive full-screen gallery lightbox with arrow & ESC keys
 *   - Form validation with accessible live feedback & demo receipt modal
 *   - Smooth scroll-to-top button
 *   - IntersectionObserver scroll reveal animations
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Navigation & Header Controllers
     ========================================================================== */
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const sections = document.querySelectorAll('main > section[id]');

  // Header scroll shadow & compact state
  const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // Mobile Drawer Toggle
  const openDrawer = () => {
    mobileDrawer.removeAttribute('hidden');
    // Force reflow
    void mobileDrawer.offsetWidth;
    mobileDrawer.classList.add('open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!mobileDrawer.classList.contains('open')) {
        mobileDrawer.setAttribute('hidden', '');
      }
    }, 350);
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close drawer on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Scrollspy: Highlight active link based on scroll position
  const handleScrollspy = () => {
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', handleScrollspy, { passive: true });

  /* ==========================================================================
     2. Hero Video Controls & Reduced Motion Support
     ========================================================================== */
  const heroVideo = document.getElementById('heroVideo');
  const videoToggleBtn = document.getElementById('videoToggleBtn');
  const videoToggleText = document.getElementById('videoToggleText');
  const iconPause = videoToggleBtn ? videoToggleBtn.querySelector('.icon-pause') : null;
  const iconPlay = videoToggleBtn ? videoToggleBtn.querySelector('.icon-play') : null;

  // Check for reduced motion preference
  const mediaQueryPrefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const applyMotionPreference = () => {
    if (mediaQueryPrefersReducedMotion.matches && heroVideo) {
      heroVideo.pause();
      if (videoToggleText) videoToggleText.textContent = 'PLAY VIDEO';
      if (iconPause) iconPause.style.display = 'none';
      if (iconPlay) iconPlay.style.display = 'inline-block';
    }
  };
  applyMotionPreference();
  mediaQueryPrefersReducedMotion.addEventListener('change', applyMotionPreference);

  if (videoToggleBtn && heroVideo) {
    videoToggleBtn.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play().then(() => {
          videoToggleText.textContent = 'PAUSE VIDEO';
          if (iconPause) iconPause.style.display = 'inline-block';
          if (iconPlay) iconPlay.style.display = 'none';
        }).catch(err => {
          console.warn('Video playback was prevented:', err);
        });
      } else {
        heroVideo.pause();
        videoToggleText.textContent = 'PLAY VIDEO';
        if (iconPause) iconPause.style.display = 'none';
        if (iconPlay) iconPlay.style.display = 'inline-block';
      }
    });
  }

  /* ==========================================================================
     3. Training Programs Data & Interactive Modal
     ========================================================================== */
  const programsData = {
    'bodybuilding': {
      title: 'BODYBUILDING & HYPERTROPHY PROTOCOL',
      tag: 'HYPERTROPHY & SCULPTING',
      image: 'assets/bodybuilding-curl.jpg',
      lead: 'Engineered for maximal muscular hypertrophy, structural symmetry, and time-under-tension overload. This curriculum combines heavy compound baseline lifts with high-intensity isolation mechanics.',
      split: [
        'Day 1: Heavy Chest & Lateral Delts (Incline Barbell Press, Cable Flyes, Lateral Raise clusters)',
        'Day 2: Posterior Chain & Lats (Barbell Rows, Neutral Grip Pull-downs, Romanian Deadlifts)',
        'Day 3: Quad Dominant Legs & Calves (Hack Squats, Leg Extensions, Donkey Calf Raises)',
        'Day 4: Shoulders & Upper Traps (Overhead Military Press, Facepulls, Heavy Shrugs)',
        'Day 5: High-Volume Arm Day (Barbell Bicep Curls, Skullcrushers, Cable Pushdowns)'
      ],
      outcomes: ['Peak Muscle Hypertrophy', 'Aesthetic V-Taper Symmetry', 'Time-Under-Tension Mastery', 'Joint-Safe Leverage Mechanics']
    },
    'powerlifting': {
      title: 'STRENGTH & POWERLIFTING PEAKING',
      tag: 'MAXIMAL FORCE & POWER',
      image: 'assets/deadlift-strength.jpg',
      lead: 'Periodized peaking blocks designed to systematically shatter PRs in the Squat, Bench Press, and Deadlift. Master central nervous system recruitment and optimal technical efficiency.',
      split: [
        'Day 1: Max Effort Squat (Competition Squat wave loading, deficit split squats, ab wheel)',
        'Day 2: Max Effort Bench Press (Pause competition bench, close grip presses, heavy rows)',
        'Day 3: Dynamic Effort Lower (Speed deadlifts with band tension, box squats, reverse hypers)',
        'Day 4: Dynamic Effort Upper (Speed bench with chains, overhead pin presses, pull-ups)'
      ],
      outcomes: ['SBD Total PR Increase', 'Neuromuscular Drive Adaptation', 'Competition Technique Mastery', 'Tendon & Ligament Fortification']
    },
    'conditioning': {
      title: 'METABOLIC CONDITIONING & FAT LOSS',
      tag: 'METABOLIC FIRE',
      image: 'assets/conditioning.jpg',
      lead: 'High-output anaerobic intervals and heavy resistance conditioning that burns stubborn visceral fat while fiercely safeguarding hard-earned muscle mass.',
      split: [
        'Session 1: High-Traction Sprint Turf Sled Pushes, Prowler Drives & Heavy Battle Ropes',
        'Session 2: Concept2 Rower & SkiErg Lactate Threshold Ladders',
        'Session 3: Heavy Kettlebell Snatch Complexes & Assault AirBike Tabata Intervals',
        'Session 4: Functional Strongman Sandbag Carries & Rotational Core Conditioning'
      ],
      outcomes: ['Rapid Visceral Fat Reduction', 'Elevated Lactate Threshold', 'Relentless Anaerobic Stamina', 'Lean Body Recomposition']
    },
    'personal-training': {
      title: '1-ON-1 ELITE APEX COACHING',
      tag: '1-ON-1 APEX MENTORSHIP',
      image: 'assets/personal-training.jpg',
      lead: 'Uncompromising one-on-one mentorship with our master coaching staff. Full movement screen, custom-tailored periodization blocks, weekly biometric analysis, and direct nutrition coaching.',
      split: [
        'Phase 1: Biomechanical Movement Screen, Mobility Audit & Structural Symmetry Check',
        'Phase 2: Individualized Periodization Protocol tailored to your schedule and goals',
        'Phase 3: High-Definition Video Lifting Analysis & Real-Time Technique Correction',
        'Phase 4: Deload Architecture, Peaking Phase & Biometric Accountability Review'
      ],
      outcomes: ['Customized Periodization Protocol', 'Zero Stagnation / Guaranteed Overload', 'Injury Prevention & Joint Health', 'Direct 24/7 Coach Accountability']
    }
  };

  const programModal = document.getElementById('programModal');
  const modalClose = document.getElementById('modalClose');
  const modalProgramImg = document.getElementById('modalProgramImg');
  const modalProgramTag = document.getElementById('modalProgramTag');
  const modalProgramTitle = document.getElementById('modalProgramTitle');
  const modalProgramLead = document.getElementById('modalProgramLead');
  const modalProgramSplit = document.getElementById('modalProgramSplit');
  const modalProgramOutcomes = document.getElementById('modalProgramOutcomes');
  const modalEnquireBtn = document.getElementById('modalEnquireBtn');
  let currentModalProgramKey = '';

  const openProgramModal = (key) => {
    const data = programsData[key];
    if (!data) return;

    currentModalProgramKey = key;
    modalProgramImg.src = data.image;
    modalProgramImg.alt = data.title;
    modalProgramTag.textContent = data.tag;
    modalProgramTitle.textContent = data.title;
    modalProgramLead.textContent = data.lead;

    // Populate split
    modalProgramSplit.innerHTML = '';
    data.split.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      modalProgramSplit.appendChild(li);
    });

    // Populate outcomes
    modalProgramOutcomes.innerHTML = '';
    data.outcomes.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'modal-tag';
      span.textContent = tag;
      modalProgramOutcomes.appendChild(span);
    });

    programModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeProgramModal = () => {
    programModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.explore-program-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const key = btn.getAttribute('data-program-key');
      openProgramModal(key);
    });
  });

  document.querySelectorAll('.footer-program-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const key = link.getAttribute('data-program-key');
      if (key) {
        openProgramModal(key);
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeProgramModal);
  }

  if (programModal) {
    programModal.addEventListener('click', (e) => {
      if (e.target === programModal) {
        closeProgramModal();
      }
    });
  }

  // Pre-select program in contact form from modal
  if (modalEnquireBtn) {
    modalEnquireBtn.addEventListener('click', () => {
      closeProgramModal();
      const planDropdown = document.getElementById('preferredPlan');
      const goalDropdown = document.getElementById('trainingGoal');
      const contactSection = document.getElementById('contact');

      if (currentModalProgramKey === 'bodybuilding') {
        if (goalDropdown) goalDropdown.value = 'Bodybuilding';
        if (planDropdown) planDropdown.value = 'Pro';
      } else if (currentModalProgramKey === 'powerlifting') {
        if (goalDropdown) goalDropdown.value = 'Powerlifting';
        if (planDropdown) planDropdown.value = 'Pro';
      } else if (currentModalProgramKey === 'conditioning') {
        if (goalDropdown) goalDropdown.value = 'Fat Loss';
        if (planDropdown) planDropdown.value = 'Pro';
      } else if (currentModalProgramKey === 'personal-training') {
        if (planDropdown) planDropdown.value = 'Personal Training';
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Pulse effect on form
        const formCol = document.querySelector('.contact-form');
        if (formCol) {
          formCol.style.boxShadow = '0 0 35px rgba(210, 10, 36, 0.7)';
          setTimeout(() => {
            formCol.style.boxShadow = '';
          }, 1500);
        }
      }
    });
  }

  /* ==========================================================================
     4. Pricing Period Toggle (Monthly vs. Annual 20% Discount)
     ========================================================================== */
  const pricingToggle = document.getElementById('pricingToggle');
  const amountEls = document.querySelectorAll('.pricing-value-box .amount');
  const billingNoteEls = document.querySelectorAll('.billing-note');

  if (pricingToggle) {
    pricingToggle.addEventListener('click', () => {
      const isAnnual = pricingToggle.getAttribute('aria-checked') === 'true';
      const newState = !isAnnual;
      pricingToggle.setAttribute('aria-checked', String(newState));

      amountEls.forEach(amountEl => {
        const monthly = amountEl.getAttribute('data-monthly');
        const annual = amountEl.getAttribute('data-annual');
        if (newState) {
          amountEl.textContent = Number(annual).toLocaleString('en-IN');
        } else {
          amountEl.textContent = Number(monthly).toLocaleString('en-IN');
        }
      });

      billingNoteEls.forEach(noteEl => {
        if (newState) {
          noteEl.textContent = noteEl.getAttribute('data-annual-note') || 'Billed annually (Save 20%)';
        } else {
          noteEl.textContent = 'Standard monthly billing';
        }
      });
    });
  }

  /* ==========================================================================
     5. Membership Plan Selection Interaction (Scroll & Prefill)
     ========================================================================== */
  document.querySelectorAll('.select-plan-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const planName = btn.getAttribute('data-plan');
      const planDropdown = document.getElementById('preferredPlan');
      const contactSection = document.getElementById('contact');

      if (planDropdown && planName) {
        planDropdown.value = planName;
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        const formEl = document.querySelector('.contact-form');
        if (formEl) {
          formEl.style.boxShadow = '0 0 35px rgba(210, 10, 36, 0.7)';
          setTimeout(() => {
            formEl.style.boxShadow = '';
          }, 1500);
        }
      }
    });
  });

  /* ==========================================================================
     6. Trainer Consultation Interaction
     ========================================================================== */
  document.querySelectorAll('.trainer-book-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const trainerName = btn.getAttribute('data-trainer');
      const planDropdown = document.getElementById('preferredPlan');
      const messageField = document.getElementById('message');
      const contactSection = document.getElementById('contact');

      if (planDropdown) {
        planDropdown.value = 'Personal Training';
      }

      if (messageField && trainerName) {
        messageField.value = `I would like to request a 1-on-1 coaching consultation with ${trainerName}.`;
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        const formEl = document.querySelector('.contact-form');
        if (formEl) {
          formEl.style.boxShadow = '0 0 35px rgba(210, 10, 36, 0.7)';
          setTimeout(() => {
            formEl.style.boxShadow = '';
          }, 1500);
        }
      }
    });
  });

  /* ==========================================================================
     7. Gallery Filtering & Fullscreen Lightbox
     ========================================================================== */
  const filterPills = document.querySelectorAll('.gallery-filters .filter-pill');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let activeVisibleItems = [...galleryItems];
  let currentLightboxIndex = 0;

  // Filter functionality
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      const filterValue = pill.getAttribute('data-filter');

      activeVisibleItems = [];
      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          activeVisibleItems.push(item);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox functions
  const openLightbox = (visibleIndex) => {
    if (!activeVisibleItems.length) return;
    currentLightboxIndex = visibleIndex;
    updateLightboxContent();
    lightboxModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightboxModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  const updateLightboxContent = () => {
    const item = activeVisibleItems[currentLightboxIndex];
    if (!item) return;

    const img = item.querySelector('img');
    const caption = item.getAttribute('data-caption') || img.alt || '';
    
    lightboxImg.src = img.src;
    lightboxImg.alt = caption;
    lightboxCaption.textContent = caption;
    lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${activeVisibleItems.length}`;
  };

  const showNextLightbox = () => {
    currentLightboxIndex = (currentLightboxIndex + 1) % activeVisibleItems.length;
    updateLightboxContent();
  };

  const showPrevLightbox = () => {
    currentLightboxIndex = (currentLightboxIndex - 1 + activeVisibleItems.length) % activeVisibleItems.length;
    updateLightboxContent();
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = activeVisibleItems.indexOf(item);
      if (idx !== -1) {
        openLightbox(idx);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevLightbox);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-stage')) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation for Lightbox & Modals
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.hasAttribute('hidden')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNextLightbox();
      if (e.key === 'ArrowLeft') showPrevLightbox();
    }
    if (!programModal.hasAttribute('hidden') && e.key === 'Escape') {
      closeProgramModal();
    }
  });

  /* ==========================================================================
     8. Contact Form Validation & Redirection to success.html
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const preferredPlan = document.getElementById('preferredPlan');
  const trainingGoal = document.getElementById('trainingGoal');
  const message = document.getElementById('message');
  const demoConsent = document.getElementById('demoConsent');
  const submitBtn = document.getElementById('submitBtn');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const phoneError = document.getElementById('phoneError');
  const consentError = document.getElementById('consentError');

  // Input Validation Rules
  const validateName = () => {
    const val = fullName.value.trim();
    if (val.length < 2) {
      fullName.classList.add('is-invalid');
      if (nameError) nameError.classList.add('visible');
      return false;
    }
    fullName.classList.remove('is-invalid');
    if (nameError) nameError.classList.remove('visible');
    return true;
  };

  const validateEmail = () => {
    const val = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      email.classList.add('is-invalid');
      if (emailError) emailError.classList.add('visible');
      return false;
    }
    email.classList.remove('is-invalid');
    if (emailError) emailError.classList.remove('visible');
    return true;
  };

  const validatePhone = () => {
    const val = phone.value.trim().replace(/\D/g, '');
    if (val.length < 10) {
      phone.classList.add('is-invalid');
      if (phoneError) phoneError.classList.add('visible');
      return false;
    }
    phone.classList.remove('is-invalid');
    if (phoneError) phoneError.classList.remove('visible');
    return true;
  };

  const validateConsent = () => {
    if (!demoConsent.checked) {
      if (consentError) consentError.classList.add('visible');
      return false;
    }
    if (consentError) consentError.classList.remove('visible');
    return true;
  };

  // Attach live blur & input listeners
  if (fullName) {
    fullName.addEventListener('blur', validateName);
    fullName.addEventListener('input', () => {
      if (fullName.classList.contains('is-invalid')) validateName();
    });
  }
  if (email) {
    email.addEventListener('blur', validateEmail);
    email.addEventListener('input', () => {
      if (email.classList.contains('is-invalid')) validateEmail();
    });
  }
  if (phone) {
    phone.addEventListener('blur', validatePhone);
    phone.addEventListener('input', () => {
      if (phone.classList.contains('is-invalid')) validatePhone();
    });
  }
  if (demoConsent) {
    demoConsent.addEventListener('change', validateConsent);
  }

  // Form submission handler
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isPhoneValid = validatePhone();
      const isConsentValid = validateConsent();

      if (!isNameValid || !isEmailValid || !isPhoneValid || !isConsentValid) {
        // Focus on first invalid input
        if (!isNameValid) fullName.focus();
        else if (!isEmailValid) email.focus();
        else if (!isPhoneValid) phone.focus();
        else if (!isConsentValid) demoConsent.focus();
        return;
      }

      // Show loading spinner
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      // Capture entered values
      const enteredName = fullName.value.trim();
      const enteredEmail = email.value.trim();
      const enteredPhone = phone.value.trim();
      const enteredPlan = preferredPlan.value;
      const enteredGoal = trainingGoal.value;
      const enteredMessage = message.value.trim() || 'No additional notes provided.';
      const submissionId = 'BMF-' + Date.now().toString(36).toUpperCase();

      // Store in sessionStorage for success.html display
      try {
        const payload = {
          name: enteredName,
          email: enteredEmail,
          phone: enteredPhone,
          plan: enteredPlan,
          goal: enteredGoal,
          message: enteredMessage,
          id: submissionId
        };
        sessionStorage.setItem('bmf_submission', JSON.stringify(payload));
      } catch (err) {
        console.warn('SessionStorage unavailable:', err);
      }

      // Smooth redirection to dedicated success.html confirmation page
      setTimeout(() => {
        contactForm.reset();
        window.location.href = 'success.html';
      }, 450);
    });
  }

  // HTML entity escaper for safe demo receipts
  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  /* ==========================================================================
     9. Back to Top Button
     ========================================================================== */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     10. Scroll Reveal Animations (IntersectionObserver)
     ========================================================================== */
  const revealItems = document.querySelectorAll('.reveal-item');
  if ('IntersectionObserver' in window && !mediaQueryPrefersReducedMotion.matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    // Fallback: immediately reveal all
    revealItems.forEach(item => item.classList.add('revealed'));
  }
});
