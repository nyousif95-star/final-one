/* ========================================
   لؤلؤة عبيه للتجارة - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========== NAVBAR SCROLL ==========
    const navbar = document.getElementById('navbar');
    const handleNavScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll();

    // ========== MOBILE MENU ==========
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    let overlay = null;

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');

        if (navLinks.classList.contains('active')) {
            overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:999;';
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';
            overlay.addEventListener('click', closeMenu);
        } else {
            closeMenu();
        }
    });

    function closeMenu() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        if (overlay) {
            overlay.remove();
            overlay = null;
        }
        document.body.style.overflow = '';
    }

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ========== ACTIVE NAV LINK ==========
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

    function setActiveNav() {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + id) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', setActiveNav);

    // ========== COUNTER ANIMATION ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        const statsSection = document.getElementById('stats');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            countersAnimated = true;
            statNumbers.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const update = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + '+';
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                requestAnimationFrame(update);
            });
        }
    }
    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // ========== SCROLL ANIMATIONS (IntersectionObserver) ==========
    const fadeElements = document.querySelectorAll(
        '.service-card, .project-card, .stat-card, .why-card, .value-item, .contact-card, .contact-form-wrapper, .about-content, .about-visual, .section-header'
    );
    fadeElements.forEach(el => el.classList.add('fade-up'));

    const observerCallback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const parent = el.parentElement;
                const siblings = parent ? Array.from(parent.querySelectorAll('.fade-up')) : [];
                const idx = siblings.indexOf(el);
                const delay = idx >= 0 ? idx * 80 : 0;
                setTimeout(() => el.classList.add('visible'), delay);
                fadeObserver.unobserve(el);
            }
        });
    };

    const fadeObserver = new IntersectionObserver(observerCallback, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // ========== BACK TO TOP ==========
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========== YEAR ==========
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

  // ========== CONTACT FORM ==========
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // تأثيرات زر الإرسال للحصول على تفاعل مرئي (UI Feedback)
            const btn = form.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<span>جاري إرسال طلبك...</span>';
            btn.disabled = true;

            // إرسال البيانات مباشرة إلى بريدك الإلكتروني في الخلفية
            // قم باستبدال YOUR_SERVICE_ID و YOUR_TEMPLATE_ID بمعلومات حسابك
            emailjs.sendForm(service_00wix8i,template_aj3ty5a, this)
                .then(() => {
                    // في حال نجاح الإرسال بصمت
                    btn.innerHTML = '<span>تم إرسال الطلب بنجاح ✓</span>';
                    btn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
                    form.reset(); // تفريغ الحقول بعد الإرسال
                }, (error) => {
                    // في حال حدوث خطأ
                    console.error('عذراً، فشل الإرسال:', error);
                    btn.innerHTML = '<span>فشل الإرسال، حاول مجدداً</span>';
                    btn.style.background = '#e74c3c';
                })
                .finally(() => {
                    // إعادة الزر لوضعه الطبيعي بعد 3 ثوانٍ
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3000);
                });
        });
    }
    // ========== SMOOTH SCROLL for anchors ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
