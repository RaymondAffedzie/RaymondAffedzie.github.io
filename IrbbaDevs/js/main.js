// iRBbA Devs Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navbar island — scroll effect (adds opacity / scrolled class)
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ─── Water canvas animation (hero section only) ──────────────────────
    const canvas = document.getElementById('waterCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W, H;
        let drops = [];
        let ripples = [];
        let mouseX = -1, mouseY = -1;
        let mouseMoveTimer = null;

        function resizeCanvas() {
            const hero = canvas.parentElement;
            W = canvas.width  = hero.offsetWidth;
            H = canvas.height = hero.offsetHeight;
        }

        /* ── Drop ── */
        class Drop {
            constructor(x, y) {
                this.reset(x, y);
            }
            reset(x, y) {
                this.x      = (x !== undefined) ? x : Math.random() * W;
                this.y      = (y !== undefined) ? y : -12;
                this.vy     = 2.5 + Math.random() * 3.5;
                this.r      = 1.2 + Math.random() * 1.8;
                this.alpha  = 0.35 + Math.random() * 0.45;
                this.active = true;
            }
            update() {
                this.y += this.vy;
                if (this.y > H + 20) {
                    // Spawn a ripple where it "lands"
                    const landY = H - 8 + Math.random() * 16;
                    ripples.push(new Ripple(this.x, landY));
                    this.reset();
                }
            }
            draw() {
                ctx.save();
                ctx.beginPath();
                // Slightly elongated teardrop
                ctx.ellipse(this.x, this.y, this.r, this.r * 2.2, 0, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(147, 197, 253, ${this.alpha})`;
                ctx.fill();
                ctx.restore();
            }
        }

        /* ── Ripple ── */
        class Ripple {
            constructor(x, y, maxR) {
                this.x      = x;
                this.y      = y;
                this.r      = 0;
                this.maxR   = maxR || 55 + Math.random() * 65;
                this.speed  = 1.2 + Math.random() * 1.4;
                this.alpha  = 0.55;
            }
            update() {
                this.r     += this.speed;
                this.alpha  = 0.55 * (1 - this.r / this.maxR);
            }
            done() { return this.r >= this.maxR; }
            draw() {
                if (this.alpha <= 0) return;
                ctx.save();
                // Outer ring
                ctx.beginPath();
                ctx.ellipse(this.x, this.y, this.r, this.r * 0.38, 0, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(96, 165, 250, ${this.alpha})`;
                ctx.lineWidth   = 1.4;
                ctx.stroke();

                // Inner ring
                if (this.r > 18) {
                    ctx.beginPath();
                    ctx.ellipse(this.x, this.y, this.r * 0.55, this.r * 0.22, 0, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(186, 230, 253, ${this.alpha * 0.55})`;
                    ctx.lineWidth   = 0.8;
                    ctx.stroke();
                }
                ctx.restore();
            }
        }

        /* ── Init drops ── */
        function initDrops() {
            drops = [];
            const count = Math.max(18, Math.floor(W / 55));
            for (let i = 0; i < count; i++) {
                const d = new Drop();
                d.y = Math.random() * H;   // stagger vertically on load
                drops.push(d);
            }
        }

        /* ── Render background ── */
        function drawBackground() {
            const g = ctx.createLinearGradient(0, 0, 0, H);
            g.addColorStop(0,    '#0c1628');
            g.addColorStop(0.55, '#0d1a2e');
            g.addColorStop(1,    '#071020');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);

            // Subtle shimmer grid
            ctx.save();
            ctx.strokeStyle = 'rgba(37, 99, 235, 0.04)';
            ctx.lineWidth   = 1;
            const gap = 70;
            for (let x = 0; x < W; x += gap) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
            }
            for (let y = 0; y < H; y += gap) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
            }
            ctx.restore();
        }

        /* ── Main loop ── */
        function animate() {
            drawBackground();

            drops.forEach(d => { d.update(); d.draw(); });

            ripples = ripples.filter(r => !r.done());
            ripples.forEach(r => { r.update(); r.draw(); });

            requestAnimationFrame(animate);
        }

        /* ── Mouse interaction ── */
        const heroSection = canvas.parentElement;
        heroSection.addEventListener('mousemove', function(e) {
            const rect = heroSection.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;

            // Spawn ripple at cursor (throttled to ~80 ms)
            if (!mouseMoveTimer) {
                ripples.push(new Ripple(mouseX, mouseY, 45 + Math.random() * 35));
                mouseMoveTimer = setTimeout(() => { mouseMoveTimer = null; }, 80);
            }
        });

        heroSection.addEventListener('click', function(e) {
            const rect = heroSection.getBoundingClientRect();
            const cx = e.clientX - rect.left;
            const cy = e.clientY - rect.top;
            // Burst of ripples on click
            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                    ripples.push(new Ripple(
                        cx + (Math.random() - 0.5) * 20,
                        cy + (Math.random() - 0.5) * 20,
                        60 + Math.random() * 50
                    ));
                }, i * 60);
            }
        });

        resizeCanvas();
        initDrops();
        animate();

        window.addEventListener('resize', () => { resizeCanvas(); initDrops(); });
    }
    // ─────────────────────────────────────────────────────────────────────

    // Portfolio filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const blogItems = document.querySelectorAll('.blog-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter portfolio items
            if (portfolioItems.length > 0) {
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
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
            }
            
            // Filter blog items
            if (blogItems.length > 0) {
                blogItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
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
            }
        });
    });

    // Initialize portfolio and blog item transitions
    portfolioItems.forEach(item => {
        item.style.transition = 'all 0.3s ease';
    });
    
    blogItems.forEach(item => {
        item.style.transition = 'all 0.3s ease';
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Show success message (in production, this would send to a server)
            alert(`Thank you ${name}! Your message has been sent. We'll get back to you at ${email} soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Demo form submission
    const demoForm = document.getElementById('demoForm');
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const product = document.getElementById('product').value;
            
            // Show success message
            alert(`Thank you ${firstName} ${lastName}! Your demo request for ${product} has been received. We'll contact you at ${email} to schedule your personalized demonstration.`);
            
            // Reset form
            demoForm.reset();
        });
    }

    // Newsletter form
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            alert(`Thank you for subscribing! You'll receive updates at ${email}.`);
            
            this.reset();
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ─── IntersectionObserver Scroll Reveal ─────────────────────────────────
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    const revealTargets = [
        '.serve-card', '.why-card', '.value-card', '.team-card',
        '.testimonial-card', '.blog-card', '.portfolio-card',
        '.timeline-item', '.product-preview-card', '.stat-item',
        '.section-title', '.section-subtitle', '.page-title'
    ];
    revealTargets.forEach(sel => {
        document.querySelectorAll(sel).forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${(i % 4) * 0.1}s`;
            revealObserver.observe(el);
        });
    });

    // Product selector in demo form
    const institutionType = document.getElementById('institutionType');
    const productSelect = document.getElementById('product');
    
    if (institutionType && productSelect) {
        institutionType.addEventListener('change', function() {
            const type = this.value;
            
            // Auto-suggest product based on institution type
            if (type === 'hotel' || type === 'resort' || type === 'guesthouse' || type === 'hostel') {
                productSelect.value = 'hoscare';
            } else if (type === 'school' || type === 'college') {
                productSelect.value = 'edumanage';
            } else if (type === 'bank') {
                productSelect.value = 'financecore';
            } else if (type === 'government' || type === 'ngo' || type === 'enterprise') {
                productSelect.value = 'erp';
            }
        });
    }

    // Form validation helpers
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            form.classList.add('was-validated');
        });
    });

    // Accordion auto-collapse
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add smooth transition effect
            const target = this.getAttribute('data-bs-target');
            const targetElement = document.querySelector(target);
            
            if (targetElement) {
                targetElement.style.transition = 'all 0.3s ease';
            }
        });
    });

    // Set minimum date for demo date picker
    const preferredDate = document.getElementById('preferredDate');
    if (preferredDate) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrow.getDate()).padStart(2, '0');
        
        preferredDate.min = `${year}-${month}-${day}`;
    }

    // ─── 3D Tilt Cards ───────────────────────────────────────────────────────
    document.querySelectorAll('.serve-card, .why-card, .testimonial-card, .blog-card, .portfolio-card').forEach(card => {
        card.classList.add('tilt-card');
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width  - 0.5;
            const y = (e.clientY - r.top)  / r.height - 0.5;
            card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-8px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) translateY(0)';
        });
    });

    // ─── Counter Animations ──────────────────────────────────────────────────
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el  = entry.target;
            const raw = el.innerText;
            const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
            const suffix = raw.replace(/[0-9.,]/g, '').trim();
            const duration = 1600;
            const start = performance.now();
            const easeOut = t => 1 - Math.pow(1 - t, 3);
            const frame = ts => {
                const p = Math.min((ts - start) / duration, 1);
                const val = Math.round(easeOut(p) * num);
                el.innerText = (Number.isInteger(num) ? val.toLocaleString() : val) + (suffix || '');
                if (p < 1) requestAnimationFrame(frame);
            };
            requestAnimationFrame(frame);
            counterObserver.unobserve(el);
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

    // ─── Parallax Page Header ────────────────────────────────────────────────
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        window.addEventListener('scroll', () => {
            pageHeader.style.backgroundPositionY = `${window.scrollY * 0.3}px`;
        }, { passive: true });
    }

    // ─── Magnetic Buttons ────────────────────────────────────────────────────
    document.querySelectorAll('.btn-primary, .btn-light').forEach(btn => {
        btn.classList.add('magnetic');
        btn.addEventListener('mousemove', e => {
            const r = btn.getBoundingClientRect();
            const dx = (e.clientX - (r.left + r.width  / 2)) * 0.35;
            const dy = (e.clientY - (r.top  + r.height / 2)) * 0.35;
            btn.style.transform = `translate(${dx}px, ${dy}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });

    // ─── Floating Particles (dark sections) ─────────────────────────────────
    document.querySelectorAll('.serve-section, .why-choose, .testimonials, .how-it-works').forEach(section => {
        for (let i = 0; i < 8; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 4 + 2;
            p.style.cssText = [
                `width:${size}px`, `height:${size}px`,
                `left:${Math.random() * 100}%`,
                `top:${Math.random() * 100}%`,
                `--duration:${Math.random() * 6 + 5}s`,
                `animation-delay:${Math.random() * -8}s`,
                `opacity:${Math.random() * 0.5 + 0.2}`
            ].join(';');
            const colors = ['rgba(0,212,255,0.5)', 'rgba(168,85,247,0.5)', 'rgba(59,130,246,0.5)'];
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            section.style.position = 'relative';
            section.appendChild(p);
        }
    });
});

// Utility function to format currency
function formatCurrency(amount, currency = '$') {
    return `${currency}${amount.toLocaleString()}`;
}

// Utility function to validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Loading animation
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loading-spinner';
    loader.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.querySelector('.loading-spinner');
    if (loader) {
        loader.remove();
    }
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Print functionality for reports (if needed)
function printPage() {
    window.print();
}

// Export data to CSV (utility function)
function exportToCSV(data, filename = 'export.csv') {
    const csv = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

// ─── Theme Toggle ─────────────────────────────────────────────────────────────
(function () {
    var toggle = document.getElementById('themeToggle');
    var icon   = document.getElementById('themeIcon');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (icon) icon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';
        try { localStorage.setItem('irb-theme', theme); } catch(e) {}
    }

    // Sync icon to whatever the anti-FOUT head script already set
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    if (icon) icon.className = current === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';

    if (toggle) {
        toggle.addEventListener('click', function () {
            var t = document.documentElement.getAttribute('data-theme') || 'dark';
            applyTheme(t === 'dark' ? 'light' : 'dark');
        });
    }
})();

console.log('iRBbA Devs Website Loaded Successfully');
