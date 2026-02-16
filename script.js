// ---------- JOJO CAKES – FULL WEBSITE JAVASCRIPT ----------
// NAVIGATION · ACTIVE LINKS · GALLERY · TESTIMONIALS · WHATSAPP FORM · MOBILE

// ===== 1. TOGGLE MOBILE MENU =====
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
    navToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });
}

// ===== 2. ACTIVE NAVIGATION LINK ON SCROLL =====
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function setActiveLink() {
    let scrollY = window.scrollY + 120; // offset for fixed header

    sections.forEach(function(section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(function(link) {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active-link');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// ===== 3. SMOOTH SCROLL ON NAV LINK CLICK + CLOSE MOBILE MENU =====
navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
            // close mobile nav after clicking
            if (mainNav) {
                mainNav.classList.remove('active');
            }
        }
    });
});

// ===== 4. GALLERY FILTERING =====
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        // remove active class from all filter buttons
        filterBtns.forEach(function(b) {
            b.classList.remove('active');
        });
        // add active class to clicked button
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        galleryItems.forEach(function(item) {
            if (filterValue === 'all' || item.dataset.category === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ===== 5. TESTIMONIAL SLIDER =====
const testimonialControls = document.querySelectorAll('.testimonial-control');
const testimonialsContainer = document.getElementById('testimonialsContainer');
let currentTestimonial = 0;

function showTestimonial(index) {
    if (!testimonialsContainer) return;
    testimonialsContainer.style.transform = 'translateX(-' + index * 100 + '%)';
    
    testimonialControls.forEach(function(ctrl) {
        ctrl.classList.remove('active');
    });
    
    if (testimonialControls[index]) {
        testimonialControls[index].classList.add('active');
    }
    
    currentTestimonial = index;
}

// add click event to each testimonial dot
testimonialControls.forEach(function(ctrl) {
    ctrl.addEventListener('click', function() {
        const idx = parseInt(this.getAttribute('data-index'));
        showTestimonial(idx);
    });
});

// auto-rotate testimonials every 6 seconds
let testimonialInterval = setInterval(function() {
    if (testimonialControls.length > 0) {
        let next = (currentTestimonial + 1) % testimonialControls.length;
        showTestimonial(next);
    }
}, 6000);

// ===== 6. CONTACT FORM – SEND TO OWNER'S WHATSAPP =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // get form values
        const nameInput = this.querySelector('input[placeholder*="name"]');
        const emailInput = this.querySelector('input[type="email"]');
        const phoneInput = this.querySelector('input[type="tel"]');
        const messageTextarea = this.querySelector('textarea');

        const name = nameInput ? nameInput.value.trim() : 'Customer';
        const email = emailInput ? emailInput.value.trim() : 'Not provided';
        const phone = phoneInput ? phoneInput.value.trim() : 'Not provided';
        const message = messageTextarea ? messageTextarea.value.trim() : 'No message';

        // compose WhatsApp message
        // %0a is line break, %0a%0a is double line break
        let whatsappMessage = '';
        whatsappMessage += '*Jojo Cakes – New Order Inquiry*';
        whatsappMessage += '%0a%0a';
        whatsappMessage += '*Name:* ' + name;
        whatsappMessage += '%0a';
        whatsappMessage += '*Email:* ' + email;
        whatsappMessage += '%0a';
        whatsappMessage += '*Phone:* ' + phone;
        whatsappMessage += '%0a';
        whatsappMessage += '*Message:* ' + message;

        // YOUR WHATSAPP NUMBER (Uganda)
        // remove first zero, add country code 256
        const ownerNumber = '256705536608'; // 0705-536608

        // create WhatsApp URL
        const whatsappURL = 'https://wa.me/' + ownerNumber + '?text=' + whatsappMessage;

        // open WhatsApp in new tab
        window.open(whatsappURL, '_blank');

        // optional confirmation
        alert('📱 Opening WhatsApp to send your message. Please press send.');

        // reset the form
        this.reset();
    });
}

// ===== 7. CLOSE MOBILE NAV WHEN CLICKING OUTSIDE =====
document.addEventListener('click', function(e) {
    if (mainNav && mainNav.classList.contains('active')) {
        if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
            mainNav.classList.remove('active');
        }
    }
});

// ===== 8. FOOTER LINKS – SMOOTH SCROLL =====
const footerLinks = document.querySelectorAll('.footer-col a[href^="#"]');

footerLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===== 9. HERO BUTTONS AND CATEGORY CARDS – ALREADY SMOOTH =====
// no additional code needed – they use the same #href smooth scroll