// start of sliders and faderes
const faders = document.querySelectorAll('.fade-in');
const sliders = document.querySelectorAll('.slide-in');

const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -150px 0px"
};

const appearOnScroll = new IntersectionObserver
(function(
    entries,
    appearOnScroll
) {
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            return;
        }else{
            entry.target.classList.add("appear");
            appearOnScroll.unobserve(entry.target);
        }
    });
}, 
appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

sliders.forEach(slider => {
    appearOnScroll.observe(slider);
});

// end of sliders and faders

// start of current page
const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('nav ul li a').forEach(link => {
    if(link.href.includes(`${activePage}`)){
        link.classList.add('active');
    }
});
// end of current page


let prevScrollPos = window.scrollY;

window.addEventListener("scroll", function() {
    const currentScrollPos = window.scrollY;
    const navbar = document.getElementById("siteNavbar");

    // Add scrolled class when user scrolls down more than 50px for better navbar visibility
    if (currentScrollPos > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // Keep navbar visible at all times for better UX - removed hiding behavior
    prevScrollPos = currentScrollPos;
});


// back to top script
const backToTopBtn = document.getElementById("backToTopBtn");

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

// end of back to top

// Enhanced Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Form validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validateForm() {
        let isValid = true;
        
        formInputs.forEach(input => {
            const formGroup = input.parentElement;
            const errorMessage = formGroup.querySelector('.error-message');
            
            // Remove existing error states
            formGroup.classList.remove('error');
            
            if (!input.value.trim()) {
                formGroup.classList.add('error');
                isValid = false;
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                formGroup.classList.add('error');
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const formGroup = this.parentElement;
            
            if (this.value.trim()) {
                formGroup.classList.remove('error');
            }
            
            if (this.type === 'email' && this.value.trim() && !validateEmail(this.value)) {
                formGroup.classList.add('error');
            }
        });
        
        input.addEventListener('input', function() {
            const formGroup = this.parentElement;
            if (formGroup.classList.contains('error') && this.value.trim()) {
                formGroup.classList.remove('error');
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="mdi mdi-loading mdi-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form submission logic)
            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you soon.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
});

// Enhanced Skills Animation
document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.getElementById('skills');
    const skillBrands = document.querySelectorAll('.brands');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBrands.forEach((brand, index) => {
                    setTimeout(() => {
                        brand.style.animation = `skillsSlideIn 0.6s ease-out ${index * 0.1}s both`;
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.3 });
    
    skillsObserver.observe(skillsSection);
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes skillsSlideIn {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;
document.head.appendChild(style);