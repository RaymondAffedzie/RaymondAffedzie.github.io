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