document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Add scroll listener for header background change
    const header = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Darker background when scrolling
            header.style.background = 'rgba(15, 23, 42, 0.8)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            // Revert to transparent glass
            header.style.background = 'rgba(255, 255, 255, 0.05)';
            header.style.boxShadow = 'none';
        }
    });

    // 3. Scroll reveal animation for sections
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with the 'reveal' class
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // 4. Hatch Pets mini interaction
    const featuredPetCard = document.querySelector('.featured-pet-card');

    if (featuredPetCard) {
        const button = featuredPetCard.querySelector('.hatch-btn');
        const status = featuredPetCard.querySelector('.pet-status');

        button.addEventListener('click', () => {
            featuredPetCard.classList.add('hatching');
            button.disabled = true;
            button.textContent = '孵化中...';
            status.textContent = 'ひびが光りはじめました...';

            window.setTimeout(() => {
                featuredPetCard.classList.remove('hatching');
                featuredPetCard.classList.add('hatched');
                status.textContent = '相棒が孵化しました';
                button.textContent = '孵化しました！';
            }, 950);
        }, { once: true });
    }

});
