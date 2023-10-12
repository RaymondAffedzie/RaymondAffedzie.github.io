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
    
window.onscroll = function() {
    const currentScrollPos = window.scrollY;
    const navbar = document.getElementById("siteNavbar");
    
    if (prevScrollPos > currentScrollPos) {
        // Show the navbar when scrolling up
        navbar.classList.remove("d-none");
    } else {
        // Hide the navbar when scrolling down
        navbar.classList.add("d-none");
    }
    
    prevScrollPos = currentScrollPos;
}