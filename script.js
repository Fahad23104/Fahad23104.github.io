document.addEventListener("DOMContentLoaded", () => {
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectGrid = document.querySelector('.project-grid');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // --- 1. Portfolio Filtering Logic ---
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            // Auto-scroll back to the first item when a filter is clicked
            projectGrid.scrollTo({ left: 0, behavior: 'smooth' });
        });
    });

    // --- 2. Carousel Button Navigation (With Safety Checks) ---
    const getScrollAmount = () => projectGrid.clientWidth + 30; // Card width + gap

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            projectGrid.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            projectGrid.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    }

    // --- 3. Vertical Mouse-Wheel to Horizontal Scroll Logic ---
    projectGrid.addEventListener('wheel', (evt) => {
        const maxScrollLeft = projectGrid.scrollWidth - projectGrid.clientWidth;
        
        // If scrolling down and we haven't reached the right end
        if (evt.deltaY > 0 && projectGrid.scrollLeft < maxScrollLeft - 5) {
            evt.preventDefault(); 
            projectGrid.scrollBy({ left: projectGrid.clientWidth, behavior: 'smooth' });
        } 
        // If scrolling up and we haven't reached the left end
        else if (evt.deltaY < 0 && projectGrid.scrollLeft > 5) {
            evt.preventDefault(); 
            projectGrid.scrollBy({ left: -projectGrid.clientWidth, behavior: 'smooth' });
        }
    });

    // --- 4. Scroll Reveal Animation Logic ---
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15 
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
});