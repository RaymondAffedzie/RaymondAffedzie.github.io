/** @format */

// ================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('fade-in')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
            if (entry.target.classList.contains('slide-in-left')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
            if (entry.target.classList.contains('slide-in-right')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
            if (entry.target.classList.contains('zoom-in')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
    animatedElements.forEach(el => observer.observe(el));
});

// ================================
// SMOOTH SCROLLING FOR NAVIGATION
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ================================
// NAVBAR BACKGROUND ON SCROLL
// ================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ================================
// PORTFOLIO FILTER FUNCTIONALITY
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// ================================
// MULTI-STEP CONTACT FORM WIZARD
// ================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing multi-step form wizard...');
    
    const form = document.getElementById('contactForm');
    const stepIndicators = document.querySelectorAll('.step-indicator .step');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const steps = document.querySelectorAll('.form-step');
    
    console.log('Form elements found:', {
        form: !!form,
        stepIndicators: stepIndicators.length,
        nextBtns: nextBtns.length,
        prevBtns: prevBtns.length,
        steps: steps.length
    });
    
    if (!form || steps.length === 0) {
        console.error('Multi-step form elements not found');
        return;
    }
    
    let currentStep = 0;
    
    // Function to show a specific step
    function showStep(stepIndex) {
        console.log(`Showing step ${stepIndex + 1} of ${steps.length}`);
        
        // Hide all steps
        steps.forEach((step, index) => {
            if (index === stepIndex) {
                step.classList.add('active');
                step.style.display = 'block';
                step.style.opacity = '1';
                console.log(`Step ${index + 1} made active`);
            } else {
                step.classList.remove('active');
                step.style.display = 'none';
                step.style.opacity = '0';
            }
        });
        
        // Update step indicators
        stepIndicators.forEach((indicator, index) => {
            indicator.classList.remove('active', 'completed');
            if (index < stepIndex) {
                indicator.classList.add('completed');
            } else if (index === stepIndex) {
                indicator.classList.add('active');
            }
        });
        
        currentStep = stepIndex;
        
        // Update progress bar if it exists
        const progressBar = document.querySelector('.wizard-progress-bar');
        if (progressBar) {
            const progress = ((stepIndex + 1) / steps.length) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }
    
    // Function to validate current step
    function validateStep(stepIndex) {
        const currentStepElement = steps[stepIndex];
        const requiredFields = currentStepElement.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            const fieldContainer = field.closest('.form-group') || field.parentElement;
            let errorElement = fieldContainer.querySelector('.error-message');
            
            // Create error message element if it doesn't exist
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.style.color = '#e74c3c';
                errorElement.style.fontSize = '0.875rem';
                errorElement.style.marginTop = '0.25rem';
                errorElement.style.display = 'none';
                fieldContainer.appendChild(errorElement);
            }
            
            // Clear previous errors
            field.classList.remove('error');
            errorElement.style.display = 'none';
            
            // Check if field is empty
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                errorElement.textContent = `${field.getAttribute('placeholder') || field.name || 'This field'} is required`;
                errorElement.style.display = 'block';
                return;
            }
            
            // Email validation
            if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    isValid = false;
                    field.classList.add('error');
                    errorElement.textContent = 'Please enter a valid email address';
                    errorElement.style.display = 'block';
                }
            }
            
            // Phone validation
            if (field.type === 'tel') {
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (!phoneRegex.test(field.value.replace(/[\s\-\(\)]/g, ''))) {
                    isValid = false;
                    field.classList.add('error');
                    errorElement.textContent = 'Please enter a valid phone number';
                    errorElement.style.display = 'block';
                }
            }
            
            // URL validation
            if (field.type === 'url') {
                try {
                    new URL(field.value);
                } catch {
                    isValid = false;
                    field.classList.add('error');
                    errorElement.textContent = 'Please enter a valid URL';
                    errorElement.style.display = 'block';
                }
            }
        });
        
        return isValid;
    }
    
    // Next button functionality
    nextBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`Next button clicked from step ${currentStep + 1}`);
            
            if (validateStep(currentStep)) {
                if (currentStep < steps.length - 1) {
                    showStep(currentStep + 1);
                    // Add smooth transition effect
                    steps[currentStep].style.transform = 'translateX(0)';
                }
            } else {
                console.log('Validation failed for current step');
                // Scroll to first error field
                const firstError = steps[currentStep].querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });
    });
    
    // Previous button functionality
    prevBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`Previous button clicked from step ${currentStep + 1}`);
            
            if (currentStep > 0) {
                showStep(currentStep - 1);
                // Add smooth transition effect
                steps[currentStep].style.transform = 'translateX(0)';
            }
        });
    });
    
    // Step indicator click functionality
    stepIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            console.log(`Step indicator ${index + 1} clicked`);
            
            // Allow going to previous steps or current step
            if (index <= currentStep) {
                showStep(index);
            } else {
                // For forward navigation, validate all previous steps
                let canProceed = true;
                for (let i = currentStep; i < index; i++) {
                    if (!validateStep(i)) {
                        canProceed = false;
                        showNotification(`Please complete step ${i + 1} before proceeding`, 'error');
                        break;
                    }
                }
                if (canProceed) {
                    showStep(index);
                }
            }
        });
    });
    
    // Initialize first step
    showStep(0);
    
    // Character counter for textarea
    const messageField = document.getElementById('message');
    const charCounter = document.querySelector('.char-counter');
    
    if (messageField) {
        messageField.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = this.getAttribute('maxlength') || 500;
            
            if (charCounter) {
                charCounter.textContent = `${currentLength}/${maxLength}`;
                
                if (currentLength > maxLength * 0.9) {
                    charCounter.style.color = '#e74c3c';
                } else if (currentLength > maxLength * 0.7) {
                    charCounter.style.color = '#f39c12';
                } else {
                    charCounter.style.color = '#666';
                }
            }
        });
    }
    
    // File upload functionality
    const fileInput = document.getElementById('attachment');
    const fileList = document.querySelector('.file-list');
    let uploadedFiles = [];
    
    if (fileInput && fileList) {
        fileInput.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            
            files.forEach(file => {
                if (file.size > 5 * 1024 * 1024) { // 5MB limit
                    showNotification('File size should not exceed 5MB', 'error');
                    return;
                }
                
                // Check for duplicate files
                if (uploadedFiles.some(f => f.name === file.name)) {
                    showNotification('File already added', 'error');
                    return;
                }
                
                uploadedFiles.push(file);
                
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                fileItem.style.cssText = `
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 12px;
                    background: #f8f9fa;
                    border: 1px solid #e9ecef;
                    border-radius: 4px;
                    margin-bottom: 8px;
                `;
                
                fileItem.innerHTML = `
                    <div>
                        <span class="file-name" style="font-weight: 500;">${file.name}</span>
                        <span class="file-size" style="color: #666; font-size: 0.875rem;">(${(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <button type="button" class="remove-file" data-filename="${file.name}" 
                            style="background: #e74c3c; color: white; border: none; border-radius: 50%; 
                                   width: 24px; height: 24px; cursor: pointer; display: flex; 
                                   align-items: center; justify-content: center;">
                        ×
                    </button>
                `;
                
                fileList.appendChild(fileItem);
            });
            
            // Reset input
            fileInput.value = '';
        });
        
        // Remove file functionality
        fileList.addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-file')) {
                const filename = e.target.dataset.filename;
                uploadedFiles = uploadedFiles.filter(file => file.name !== filename);
                e.target.closest('.file-item').remove();
                showNotification('File removed', 'info');
            }
        });
    }
    
    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate final step
        if (!validateStep(steps.length - 1)) {
            const firstError = steps[steps.length - 1].querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }
        
        const submitBtn = form.querySelector('.submit-btn, [type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
        
        try {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="mdi mdi-loading mdi-spin"></i> Sending...';
            }
            
            const formData = new FormData(form);
            
            // Add uploaded files
            uploadedFiles.forEach(file => {
                formData.append('attachments[]', file);
            });
            
            // Simulate form submission (replace with actual endpoint)
            console.log('Submitting form with data:', Object.fromEntries(formData));
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();
            uploadedFiles = [];
            if (fileList) fileList.innerHTML = '';
            showStep(0);
            
            // Reset character counter
            if (charCounter) {
                charCounter.textContent = '0/500';
                charCounter.style.color = '#666';
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        }
    });
    
    // Real-time validation on input
    const allInputs = form.querySelectorAll('input, textarea, select');
    allInputs.forEach(input => {
        input.addEventListener('blur', function() {
            // Only validate if the field has been touched
            if (this.value.trim() || this.classList.contains('error')) {
                const stepIndex = Array.from(steps).findIndex(step => step.contains(this));
                if (stepIndex !== -1) {
                    // Validate just this field
                    const fieldContainer = this.closest('.form-group') || this.parentElement;
                    const errorElement = fieldContainer.querySelector('.error-message');
                    
                    this.classList.remove('error');
                    if (errorElement) errorElement.style.display = 'none';
                    
                    if (!this.value.trim() && this.hasAttribute('required')) {
                        this.classList.add('error');
                        if (errorElement) {
                            errorElement.textContent = `${this.getAttribute('placeholder') || this.name || 'This field'} is required`;
                            errorElement.style.display = 'block';
                        }
                    }
                }
            }
        });
        
        input.addEventListener('input', function() {
            // Clear error state when user starts typing
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const fieldContainer = this.closest('.form-group') || this.parentElement;
                const errorElement = fieldContainer.querySelector('.error-message');
                if (errorElement) errorElement.style.display = 'none';
            }
        });
    });
});

// ================================
// NOTIFICATION SYSTEM
// ================================
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'ℹ'}
            </div>
            <span class="notification-message">${message}</span>
            <button class="notification-close">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification with animation
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    
    // Auto hide after specified duration
    const autoHide = setTimeout(() => {
        hideNotification(notification);
    }, duration);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoHide);
        hideNotification(notification);
    });
    
    // Click to dismiss
    notification.addEventListener('click', (e) => {
        if (e.target === notification || e.target.classList.contains('notification-content')) {
            clearTimeout(autoHide);
            hideNotification(notification);
        }
    });
    
    function hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// ================================
// NOTIFICATION STYLES
// ================================
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('#notification-styles')) {
        const notificationStyles = `
            <style id="notification-styles">
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    min-width: 320px;
                    max-width: 420px;
                    padding: 16px 20px;
                    border-radius: 12px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
                    z-index: 10000;
                    transform: translateX(450px);
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    font-family: 'Poppins', sans-serif;
                    backdrop-filter: blur(10px);
                    cursor: pointer;
                }
                
                .notification.show {
                    transform: translateX(0);
                }
                
                .notification-success {
                    background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
                    border-left: 4px solid #28a745;
                    color: #155724;
                }
                
                .notification-error {
                    background: linear-gradient(135deg, #f8d7da 0%, #f1b0b7 100%);
                    border-left: 4px solid #dc3545;
                    color: #721c24;
                }
                
                .notification-warning {
                    background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
                    border-left: 4px solid #ffc107;
                    color: #856404;
                }
                
                .notification-info {
                    background: linear-gradient(135deg, #d1ecf1 0%, #b3d7ff 100%);
                    border-left: 4px solid #17a2b8;
                    color: #0c5460;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .notification-icon {
                    font-size: 18px;
                    font-weight: bold;
                    flex-shrink: 0;
                }
                
                .notification-message {
                    flex: 1;
                    font-size: 14px;
                    line-height: 1.4;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                    color: inherit;
                    padding: 0;
                    margin-left: auto;
                    opacity: 0.7;
                    transition: opacity 0.2s;
                    flex-shrink: 0;
                }
                
                .notification-close:hover {
                    opacity: 1;
                }
                
                @media (max-width: 768px) {
                    .notification {
                        right: 10px;
                        left: 10px;
                        min-width: auto;
                        max-width: none;
                        transform: translateY(-100px);
                    }
                    
                    .notification.show {
                        transform: translateY(0);
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', notificationStyles);
    }
});

// ================================
// TYPING ANIMATION FOR HERO TEXT
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const text = typingElement.textContent;
        const speed = 100;
        let i = 0;
        
        typingElement.textContent = '';
        typingElement.style.borderRight = '2px solid #007bff';
        
        function typeWriter() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                // Blinking cursor effect
                setInterval(() => {
                    typingElement.style.borderRight = typingElement.style.borderRight === '2px solid transparent' 
                        ? '2px solid #007bff' : '2px solid transparent';
                }, 500);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }
});

// ================================
// PARALLAX EFFECT FOR HERO BACKGROUND
// ================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.particle, .parallax-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    // Parallax for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// ================================
// ENHANCED MOBILE MENU
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    if (navbarToggler && navbarCollapse) {
        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
        
        // Escape key closes mobile menu
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    }
});

// ================================
// KEYBOARD NAVIGATION ACCESSIBILITY
// ================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// ================================
// LOADING SCREEN
// ================================
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    // Page load performance tracking
    if (window.performance) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});

// ================================
// SKILLS PROGRESS ANIMATION
// ================================
function initSkillsProgressAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const width = progressBar.dataset.width || progressBar.getAttribute('data-width');
                    setTimeout(() => {
                        progressBar.style.width = width + '%';
                        progressBar.style.transition = 'width 1.5s ease-in-out';
                    }, Math.random() * 500 + 100);
                }
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillItems.forEach(item => skillObserver.observe(item));
}

// ================================
// TESTIMONIAL SLIDER FUNCTIONALITY
// ================================
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonials-dots .dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (testimonialCards.length === 0) return;
    
    let currentSlide = 0;
    let isTransitioning = false;
    
    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            if (window.innerWidth > 768) {
                // Desktop: show all cards with different opacities
                card.style.opacity = i === index ? '1' : '0.3';
                card.style.transform = i === index ? 'scale(1)' : 'scale(0.95)';
            } else {
                // Mobile: show one card at a time
                card.style.display = i === index ? 'block' : 'none';
            }
            
            if (i === index) {
                card.classList.add('active');
            }
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
        
        setTimeout(() => {
            isTransitioning = false;
        }, 300);
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
        showSlide(currentSlide);
    }
    
    // Initialize
    showSlide(0);
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto-slide every 5 seconds (pause on hover)
    let autoSlideInterval = setInterval(nextSlide, 5000);
    
    const testimonialSection = document.querySelector('.testimonials-section');
    if (testimonialSection) {
        testimonialSection.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        testimonialSection.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        showSlide(currentSlide);
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    testimonialSection?.addEventListener('touchstart', e => {
        startX = e.changedTouches[0].screenX;
    });
    
    testimonialSection?.addEventListener('touchend', e => {
        endX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (startX - endX > 50) {
            nextSlide(); // Swipe left
        } else if (endX - startX > 50) {
            prevSlide(); // Swipe right
        }
    }
}

// ================================
// SCROLL TO TOP BUTTON
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ================================
// INITIALIZE ALL COMPONENTS
// ================================
document.addEventListener('DOMContentLoaded', function() {
    // Add critical CSS to ensure sections are visible
    const criticalCSS = `
        <style id="critical-visibility">
            .about-section,
            .social-section,
            .services-section,
            .projects-section,
            #services,
            #projects,
            .about-section .slide-in,
            .social-section .slide-in,
            .services-section .slide-in,
            .projects-section .slide-in {
                opacity: 1 !important;
                visibility: visible !important;
                display: block !important;
                transform: translate(0, 0) !important;
            }
            
            .about-connect-section,
            .glass-card,
            .social-platform,
            .service-card,
            .project-card,
            .section-label,
            .section-title,
            .section-description {
                opacity: 1 !important;
                visibility: visible !important;
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', criticalCSS);
    
    // Ensure critical sections are visible immediately
    ensureSectionsVisible();
    
    // Additional fix for section headers specifically
    ensureSectionHeadersVisible();
    
    // Initialize existing components
    initSkillsProgressAnimation();
    initTestimonialSlider();
    
    // Initialize new component enhancements
    initHeroStatsCounter();
    initAboutSection();
    initSocialSection();
    initServiceSection();
    initProjectSection();
    initEnhancedTestimonialSection();
    initEnhancedSkillsSection();
    
    // Add loading states to forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('[type="submit"]');
            if (submitBtn && !submitBtn.disabled) {
                submitBtn.classList.add('loading');
            }
        });
    });
    
    // Initialize section visibility tracking for navigation
    initSectionVisibilityTracking();
});

// ================================
// ENSURE SECTIONS ARE VISIBLE
// ================================
function ensureSectionsVisible() {
    const criticalSections = [
        '.about-section',
        '.social-section',
        '.services-section',
        '.projects-section',
        '#about',
        '#socials',
        '#services',
        '#projects'
    ];
    
    criticalSections.forEach(selector => {
        const section = document.querySelector(selector);
        if (section) {
            section.style.opacity = '1';
            section.style.visibility = 'visible';
            section.style.display = 'block';
            
            // Fix slide-in elements that might be hidden
            const slideInElements = section.querySelectorAll('.slide-in');
            slideInElements.forEach(element => {
                element.classList.add('appear');
                element.style.opacity = '1';
                element.style.transform = 'translate(0, 0)';
            });
            
            // Ensure all children are visible too
            const children = section.querySelectorAll('*');
            children.forEach(child => {
                if (child.style.opacity === '0' || child.style.visibility === 'hidden') {
                    child.style.opacity = '1';
                    child.style.visibility = 'visible';
                }
            });
        }
    });
    
    // Force visibility on critical elements
    const criticalElements = [
        '.about-connect-section',
        '.profile-card',
        '.skills-grid',
        '.social-connect-panel',
        '.glass-card',
        '.social-platform',
        '.service-card',
        '.project-card',
        '.section-label',
        '.section-title',
        '.section-description'
    ];
    
    criticalElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.opacity = '1';
            element.style.visibility = 'visible';
            element.style.display = element.style.display || 'block';
        });
    });
}

// ================================
// ENSURE SECTION HEADERS ARE VISIBLE
// ================================
function ensureSectionHeadersVisible() {
    // Target the specific elements mentioned by the user
    const sectionHeaders = [
        '.section-label',
        '.section-title', 
        '.section-description',
        '.col-12.text-center.mb-5',
        '.col-12.text-center'
    ];
    
    sectionHeaders.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.opacity = '1';
            element.style.visibility = 'visible';
            element.style.display = element.style.display || 'block';
            element.style.transform = 'translate(0, 0)';
            
            // Remove any classes that might hide the element
            element.classList.remove('slide-in');
            element.classList.add('appear');
        });
    });
    
    // Specifically target the containers mentioned by the user
    const specificContainers = document.querySelectorAll('div.col-12.text-center.mb-5, div.row.slide-in.from-bottom');
    specificContainers.forEach(container => {
        container.style.opacity = '1';
        container.style.visibility = 'visible';
        container.style.display = 'block';
        container.style.transform = 'translate(0, 0)';
        container.classList.add('appear');
        
        // Also ensure all children are visible
        const children = container.querySelectorAll('*');
        children.forEach(child => {
            child.style.opacity = '1';
            child.style.visibility = 'visible';
        });
    });
}

// ================================
// SECTION VISIBILITY TRACKING FOR NAVIGATION
// ================================
function initSectionVisibilityTracking() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.id;
            const navLink = document.querySelector(`[data-section="${sectionId}"]`);
            
            if (entry.isIntersecting) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current section's nav link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px' // Account for fixed header
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// ================================
// HERO STATS COUNTER ANIMATION
// ================================
function initHeroStatsCounter() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.dataset.target);
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target;
                            clearInterval(counter);
                        } else {
                            stat.textContent = Math.floor(current);
                        }
                    }, 16);
                });
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
}

// ================================
// ABOUT SECTION ENHANCEMENTS
// ================================
function initAboutSection() {
    // Ensure about section content is visible first
    const aboutSection = document.querySelector('.about-section');
    const aboutContent = document.querySelector('.about-content-wrapper');
    
    if (aboutSection) {
        aboutSection.style.opacity = '1';
        aboutSection.style.visibility = 'visible';
    }
    
    if (aboutContent) {
        aboutContent.style.opacity = '1';
        aboutContent.style.visibility = 'visible';
    }
    
    // Animated Counter Function
    function animateCounter(element, target, duration = 2000) {
        let current = 0;
        const increment = target / (duration / 16); // 60fps
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Skill Bar Animation
    function animateSkillBar(skillBar, targetWidth) {
        setTimeout(() => {
            skillBar.style.width = targetWidth;
        }, 500);
    }
    
    // Expertise items hover effects and skill bars
    const expertiseItems = document.querySelectorAll('.expertise-item');
    expertiseItems.forEach(item => {
        // Ensure items are visible
        item.style.opacity = '1';
        item.style.visibility = 'visible';
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Unified About & Connect section animation
    const unifiedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate profile stats
                const profileStats = entry.target.querySelectorAll('.profile-stats .stat-item');
                profileStats.forEach((item, index) => {
                    setTimeout(() => {
                        const target = parseInt(item.getAttribute('data-target'));
                        const numberElement = item.querySelector('.stat-number');
                        if (numberElement && target) {
                            animateCounter(numberElement, target);
                        }
                    }, index * 200);
                });

                // Animate skill proficiency bars
                const proficiencyBars = entry.target.querySelectorAll('.proficiency-fill');
                proficiencyBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const targetWidth = bar.getAttribute('data-width');
                        if (targetWidth) {
                            bar.style.width = targetWidth;
                        }
                    }, 500 + (index * 200));
                });

                // Animate social platforms with stagger
                const socialPlatforms = entry.target.querySelectorAll('.social-platform');
                socialPlatforms.forEach((platform, index) => {
                    setTimeout(() => {
                        platform.style.opacity = '1';
                        platform.style.transform = 'translateX(0)';
                        platform.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    }, 800 + (index * 100));
                });

                // Animate glass cards entrance
                const glassCards = entry.target.querySelectorAll('.glass-card');
                glassCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    }, index * 200);
                });
                
                unifiedObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    const unifiedSection = document.querySelector('.about-connect-section');
    if (unifiedSection) {
        unifiedObserver.observe(unifiedSection);
        
        // Initialize social platforms with hidden state
        const socialPlatforms = unifiedSection.querySelectorAll('.social-platform');
        socialPlatforms.forEach(platform => {
            platform.style.opacity = '0';
            platform.style.transform = 'translateX(-20px)';
        });
        
        // Initialize glass cards with hidden state
        const glassCards = unifiedSection.querySelectorAll('.glass-card');
        glassCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        });
    }

    // Code editor typing effect
    const codeLines = [
        'const developer = {',
        '  name: "Raymond Affedzie",',
        '  skills: ["JavaScript", "React", "Node.js", "Python"],',
        '  passion: "Crafting unique digital experiences",',
        '  status: "Available for hire!"',
        '};'
    ];
    
    const codeContent = document.querySelector('.code-content');
    if (codeContent) {
        let lineIndex = 0;
        let charIndex = 0;
        
        function typeCode() {
            if (lineIndex < codeLines.length) {
                if (charIndex < codeLines[lineIndex].length) {
                    const currentLine = codeContent.children[lineIndex];
                    if (currentLine) {
                        currentLine.textContent += codeLines[lineIndex][charIndex];
                        charIndex++;
                        setTimeout(typeCode, 50);
                    }
                } else {
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(typeCode, 500);
                }
            }
        }
        
        // Start typing animation when about section is visible
        const typingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeCode, 1000);
                    typingObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        if (aboutSectionEl) {
            typingObserver.observe(aboutSectionEl);
        } else {
            // Fallback: start typing immediately if section not found
            setTimeout(typeCode, 2000);
        }
    }
}

// ================================
// SOCIAL SECTION ENHANCEMENTS
// ================================
function initSocialSection() {
    // Ensure social section is visible first
    const socialSection = document.querySelector('.social-section');
    if (socialSection) {
        socialSection.style.opacity = '1';
        socialSection.style.visibility = 'visible';
    }
    
    // Animated Counter Function for Social Stats
    function animateCounter(element, target, duration = 2000) {
        let current = 0;
        const increment = target / (duration / 16); // 60fps
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    const socialPlatforms = document.querySelectorAll('.social-platform');
    
    // Ensure all platforms are visible by default
    socialPlatforms.forEach(platform => {
        platform.style.opacity = '1';
        platform.style.transform = 'translateX(0)';
        platform.style.visibility = 'visible';
    });
    
    socialPlatforms.forEach(platform => {
        // Enhanced hover animations
        platform.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Add enhanced glow effect
            const platformType = this.classList[1]; // linkedin, github, twitter, instagram, etc.
            switch(platformType) {
                case 'linkedin':
                    this.style.boxShadow = '0 8px 32px rgba(0, 119, 181, 0.2)';
                    break;
                case 'github':
                    this.style.boxShadow = '0 8px 32px rgba(51, 51, 51, 0.2)';
                    break;
                case 'twitter':
                    this.style.boxShadow = '0 8px 32px rgba(29, 161, 242, 0.2)';
                    break;
                case 'instagram':
                    this.style.boxShadow = '0 8px 32px rgba(225, 48, 108, 0.2)';
                    break;
                case 'telegram':
                    this.style.boxShadow = '0 8px 32px rgba(0, 136, 204, 0.2)';
                    break;
                case 'email':
                    this.style.boxShadow = '0 8px 32px rgba(234, 67, 53, 0.2)';
                    break;
                default:
                    this.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
            }
        });
        
        platform.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
        });
        
        // Add click tracking with subtle animation
        platform.addEventListener('click', function() {
            const platformType = this.classList[1];
            console.log(`Social link clicked: ${platformType}`);
            
            // Add click animation
            this.style.transform = 'translateX(6px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateX(8px) scale(1.02)';
            }, 150);
        });
    });

}

// ================================
// SERVICE SECTION ENHANCEMENTS
// ================================
function initServiceSection() {
    // Ensure services section is visible first
    const servicesSection = document.querySelector('.services-section, #services');
    if (servicesSection) {
        servicesSection.style.opacity = '1';
        servicesSection.style.visibility = 'visible';
    }
    
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Ensure all service cards are visible by default
    serviceCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.visibility = 'visible';
    });
    
    serviceCards.forEach(card => {
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Icon rotation
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'rotate(360deg)';
                icon.style.transition = 'transform 0.6s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Add click interaction for service details
        card.addEventListener('click', function() {
            const serviceTitle = this.querySelector('.service-title')?.textContent;
            const serviceDesc = this.querySelector('.service-desc')?.textContent;
            
            // Create modal or show more details (you can customize this)
            showServiceModal(serviceTitle, serviceDesc);
        });
    });
    
    // Staggered entrance animation
    const servicesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.service-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animated-in');
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    }, index * 200);
                });
                servicesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    const servicesContainer = document.querySelector('.services-section, #services');
    if (servicesContainer) {
        // Since we want everything visible, don't hide the cards initially
        // Just ensure they are visible and apply observer for additional animations
        serviceCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.visibility = 'visible';
        });
        // Still observe for potential animation enhancements, but don't hide content
        servicesObserver.observe(servicesContainer);
    }
}

// Service modal function
function showServiceModal(title, description) {
    // Simple modal implementation
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="this.closest('.service-modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <p>${description}</p>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="document.querySelector('#contact').scrollIntoView({behavior: 'smooth'}); this.closest('.service-modal').remove();">
                        Get Quote
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(modal);
}

// ================================
// PROJECT SECTION ENHANCEMENTS
// ================================
function initProjectSection() {
    // Ensure projects section is visible first
    const projectsSection = document.querySelector('.projects-section, #projects');
    if (projectsSection) {
        projectsSection.style.opacity = '1';
        projectsSection.style.visibility = 'visible';
    }
    
    const projectCards = document.querySelectorAll('.project-card');
    
    // Ensure all project cards are visible by default
    projectCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.visibility = 'visible';
    });
    
    projectCards.forEach(card => {
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
            
            // Image zoom effect
            const image = this.querySelector('.project-image img');
            if (image) {
                image.style.transform = 'scale(1.1)';
                image.style.transition = 'transform 0.4s ease';
            }
            
            // Show overlay
            const overlay = this.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.visibility = 'visible';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            
            const image = this.querySelector('.project-image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
            
            const overlay = this.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
            }
        });
        
        // Project links interaction
        const projectLinks = card.querySelectorAll('.project-link');
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
                // Add click tracking
                const projectTitle = card.querySelector('.project-title')?.textContent;
                console.log(`Project link clicked: ${projectTitle}`);
            });
        });
    });
    
    // Project filtering functionality (if filter buttons exist)
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects
                projectCards.forEach(card => {
                    const categories = card.dataset.categories?.split(',') || [];
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Projects entrance animation
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.project-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    }, index * 150);
                });
                projectsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    const projectsContainer = document.querySelector('.projects-section, #projects');
    if (projectsContainer) {
        // Since we want everything visible, don't hide the cards initially
        // Just ensure they are visible and apply observer for additional animations
        projectCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.visibility = 'visible';
        });
        // Still observe for potential animation enhancements, but don't hide content
        projectsObserver.observe(projectsContainer);
    }
}

// ================================
// ENHANCED TESTIMONIAL SECTION
// ================================
function initEnhancedTestimonialSection() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.testimonial-prev, .testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-next, .testimonial-btn.next');
    
    if (testimonialCards.length === 0) return;
    
    let currentSlide = 0;
    let isTransitioning = false;
    let autoSlideInterval;
    
    function showSlide(index, direction = 'next') {
        if (isTransitioning) return;
        isTransitioning = true;
        
        const currentCard = testimonialCards[currentSlide];
        const nextCard = testimonialCards[index];
        
        // Exit animation for current card
        if (currentCard) {
            currentCard.style.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
            currentCard.style.opacity = '0';
        }
        
        // Enter animation for next card
        setTimeout(() => {
            testimonialCards.forEach((card, i) => {
                card.classList.remove('active');
                if (i === index) {
                    card.classList.add('active');
                    card.style.transform = 'translateX(0)';
                    card.style.opacity = '1';
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentSlide = index;
            isTransitioning = false;
        }, 300);
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % testimonialCards.length;
        showSlide(next, 'next');
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
        showSlide(prev, 'prev');
    }
    
    // Initialize testimonials
    function initTestimonials() {
        testimonialCards.forEach((card, index) => {
            card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            if (index === 0) {
                card.classList.add('active');
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateX(100%)';
                card.style.display = 'none';
            }
        });
        
        // Initialize dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === 0);
            dot.addEventListener('click', () => {
                if (index !== currentSlide) {
                    const direction = index > currentSlide ? 'next' : 'prev';
                    showSlide(index, direction);
                }
            });
        });
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Auto-slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    // Pause auto-slide on hover
    const testimonialSection = document.querySelector('.testimonials-section, #testimonials');
    if (testimonialSection) {
        testimonialSection.addEventListener('mouseenter', stopAutoSlide);
        testimonialSection.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    
    testimonialCards.forEach(card => {
        card.addEventListener('touchstart', e => {
            startX = e.changedTouches[0].screenX;
        });
        
        card.addEventListener('touchend', e => {
            endX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (startX - endX > swipeThreshold) {
            nextSlide(); // Swipe left
        } else if (endX - startX > swipeThreshold) {
            prevSlide(); // Swipe right
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (testimonialSection && isInViewport(testimonialSection)) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        }
    });
    
    // Initialize and start
    initTestimonials();
    startAutoSlide();
    
    // Entrance animation for testimonial section
    const testimonialsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                testimonialsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    if (testimonialSection) {
        testimonialSection.style.opacity = '0';
        testimonialSection.style.transform = 'translateY(30px)';
        testimonialSection.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        testimonialsObserver.observe(testimonialSection);
    }
}

// Helper function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ================================
// SKILLS SECTION ENHANCEMENTS
// ================================
function initEnhancedSkillsSection() {
    const skillItems = document.querySelectorAll('.skill-item');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Enhanced skills observer with staggered animation
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skills = entry.target.querySelectorAll('.skill-item');
                
                skills.forEach((skill, index) => {
                    setTimeout(() => {
                        // Animate skill item entrance
                        skill.style.opacity = '1';
                        skill.style.transform = 'translateX(0)';
                        skill.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        
                        // Animate progress bar
                        const progressBar = skill.querySelector('.skill-progress');
                        if (progressBar) {
                            const width = progressBar.dataset.width || progressBar.getAttribute('data-width');
                            setTimeout(() => {
                                progressBar.style.width = width + '%';
                                progressBar.style.transition = 'width 2s cubic-bezier(0.4, 0, 0.2, 1)';
                            }, 200);
                        }
                    }, index * 150);
                });
                
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe skills containers
    const skillsContainers = document.querySelectorAll('.skills-grid');
    skillsContainers.forEach(container => {
        // Initially hide skills for animation
        const skills = container.querySelectorAll('.skill-item');
        skills.forEach(skill => {
            skill.style.opacity = '0';
            skill.style.transform = 'translateX(-30px)';
        });
        
        skillsObserver.observe(container);
    });
    
    // Interactive skill hover effects
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
            
            const progressBar = this.querySelector('.skill-progress');
            if (progressBar) {
                progressBar.style.background = 'linear-gradient(90deg, #007bff, #28a745)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            
            const progressBar = this.querySelector('.skill-progress');
            if (progressBar) {
                progressBar.style.background = '';
            }
        });
    });
}

// ================================
// ERROR HANDLING & PERFORMANCE
// ================================
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Optional: Send error to analytics
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
            
            console.log(`Performance: Page Load: ${pageLoadTime}ms, DOM Ready: ${domReadyTime}ms`);
        }, 0);
    });
}

// ================================
// SERVICE WORKER REGISTRATION
// ================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registered: ', registration.scope);
            })
            .catch(function(registrationError) {
                console.log('ServiceWorker registration failed: ', registrationError);
            });
    });
}

// ================================
// DYNAMIC CSS ANIMATIONS
// ================================
// Add CSS animation keyframes dynamically
const socialAnimationStyles = document.createElement('style');
socialAnimationStyles.textContent = `
    @keyframes socialCardEntrance {
        0% {
            opacity: 0;
            transform: translateY(30px) rotateX(-15deg) scale(0.9);
        }
        100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg) scale(1);
        }
    }
    
    @keyframes aboutStatEntrance {
        0% {
            opacity: 0;
            transform: translateX(-20px) scale(0.8);
        }
        100% {
            opacity: 1;
            transform: translateX(0) scale(1);
        }
    }
`;
document.head.appendChild(socialAnimationStyles);
