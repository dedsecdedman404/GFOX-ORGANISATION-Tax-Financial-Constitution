// Enhanced Animations and Interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Parallax effect on mouse move
    const hero = document.querySelector('.hero');
    
    if (hero) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            
            hero.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
    
    // Article card hover effects
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Act section number display
    const actSections = document.querySelectorAll('.act-section');
    
    actSections.forEach((section, index) => {
        const actNumber = section.getAttribute('data-act');
        
        // Add visual indicator on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    section.style.borderLeftColor = 'var(--color-accent-orange)';
                } else {
                    section.style.borderLeftColor = 'var(--border-subtle)';
                }
            });
        }, {
            threshold: 0.3
        });
        
        observer.observe(section);
    });
    
    // Signature animation on scroll into view
    const signatureBlocks = document.querySelectorAll('.signature-block');
    
    const signatureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.5
    });
    
    signatureBlocks.forEach(block => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(20px)';
        block.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        signatureObserver.observe(block);
    });
    
    // Add ripple effect to logo
    const logo = document.querySelector('.logo-placeholder');
    
    if (logo) {
        logo.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Highlight current section in view
    const sections = document.querySelectorAll('.act-section, .preamble-section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add subtle glow effect to current section
                entry.target.style.boxShadow = '0 0 30px rgba(255, 107, 53, 0.1)';
            } else {
                entry.target.style.boxShadow = 'none';
            }
        });
    }, {
        threshold: 0.5
    });
    
    sections.forEach(section => {
        section.style.transition = 'box-shadow 0.5s ease';
        sectionObserver.observe(section);
    });
    
    // Reading progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--color-accent-orange), var(--color-accent-orange-light));
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px var(--glow-orange);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        progressBar.style.width = progress + '%';
    });
    
    // Console easter egg
    console.log('%c🦊 GFOX ORGANISATION', 'color: #ff6b35; font-size: 24px; font-weight: bold;');
    console.log('%cOfficial Tax & Financial Constitution', 'color: #a1a1a6; font-size: 14px;');
    console.log('%cBuilt with premium design standards', 'color: #6e6e73; font-size: 12px; font-style: italic;');
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);