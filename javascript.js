// --- script.js ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Highlight Active Nav Link
    // Uses the filename to automatically set the active class
    let currentPath = window.location.pathname.split('/').pop().toLowerCase();
    // Fix: Handle root path or index.html mapping to home.html
    if (!currentPath || currentPath === 'index.html') currentPath = 'home.html';

    document.querySelectorAll('nav a').forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop().toLowerCase();
        // Handle "car rentals.html" which has a space
        const standardizedLinkPath = linkPath.replace(/%20/g, ' ');

        if (standardizedLinkPath === currentPath) {
            link.classList.add('active');
        }
    });

    // 2. Car Rentals Tab Logic (for car rentals.html)
    const tabs = document.querySelectorAll('.tabs .tab');
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });
    }

    // 3. Footer Copyright Year
    const footerElement = document.querySelector('footer p');
    if (footerElement) {
        footerElement.textContent = `© ${new Date().getFullYear()} Wander & Co. | Est. 1955 | All Rights Reserved`;
    }

    // 4. Lazy Loading for Images
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });

    // 5. Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.textContent = 'TOP';
    backToTopBtn.className = 'back-to-top';

    // 50s Vibe: Retro styling injected directly
    Object.assign(backToTopBtn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: 'none',
        backgroundColor: '#17E9E0', // Retro Teal
        color: '#FFF',
        border: '2px solid #FFF',
        borderRadius: '50%',
        padding: '12px',
        fontFamily: '"Courier New", Courier, monospace',
        cursor: 'pointer',
        zIndex: '1000',
        boxShadow: '3px 3px 0px rgba(0,0,0,0.2)'
    });

    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 6. Form Validation for Sign In
    const signInForm = document.querySelector('form');
    if (signInForm && window.location.pathname.includes('signin.html')) {
        signInForm.addEventListener('submit', (e) => {
            const email = signInForm.querySelector('input[type="email"]');
            const password = signInForm.querySelector('input[type="password"]');

            if (!email.value || !password.value) {
                e.preventDefault();
                alert('Please fill in all fields.');
            } else if (!/\S+@\S+\.\S+/.test(email.value)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
            }
        });
    }

    // 7. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 8. Image Gallery Modal (for offers and hotels)
    const images = document.querySelectorAll('.hotel-card img, .offer-card img, .image-right img');
    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'modal';
            
            // Functional: Ensure modal covers screen and centers content
            Object.assign(modal.style, {
                position: 'fixed',
                top: '0', left: '0', width: '100%', height: '100%',
                backgroundColor: 'rgba(0,0,0,0.8)',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                zIndex: '2000', cursor: 'zoom-out'
            });

            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            
            // 50s Vibe: Polaroid Photo Style
            Object.assign(modalImg.style, {
                maxWidth: '90%', maxHeight: '85%',
                border: '15px solid #fff',
                borderBottom: '50px solid #fff', // Thicker bottom for Polaroid look
                boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
            });

            // Improvise: Add a retro "Close" stamp button
            const closeBtn = document.createElement('button');
            closeBtn.textContent = 'X';
            Object.assign(closeBtn.style, {
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#B22222', // Vintage Red
                color: '#fff',
                border: '2px solid #fff',
                borderRadius: '50%',
                width: '40px', height: '40px',
                fontSize: '18px', fontFamily: '"Courier New", monospace',
                cursor: 'pointer', boxShadow: '2px 2px 5px rgba(0,0,0,0.3)'
            });

            modal.appendChild(closeBtn);
            modal.appendChild(modalImg);
            modal.addEventListener('click', () => modal.remove());
            document.body.appendChild(modal);
        });
    });

    // 9. Search Box Functionality
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        const searchInput = searchBox.querySelector('input');
        const searchBtn = searchBox.querySelector('button');

        const performSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                alert(`Searching for vintage getaways in: ${query}...`);
                // In a real app, this would redirect: window.location.href = `offers.html?q=${query}`;
            } else {
                alert('Please enter a destination to start your journey.');
            }
        };

        if (searchBtn) searchBtn.addEventListener('click', performSearch);
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') performSearch();
            });
        }
    }

    // 10. Generic Handler for other buttons (e.g., "Book Now" on other pages)
    document.body.addEventListener('click', (e) => {
        // Check if clicked element is a button, not inside search box, and not a form submit
        if (e.target.tagName === 'BUTTON' && 
            !e.target.closest('.search-box') && 
            !e.target.closest('form') &&
            !e.target.classList.contains('back-to-top') &&
            e.target.textContent !== 'X') {
            
            alert('This booking feature is coming soon! Please contact us directly.');
        }
    });
});