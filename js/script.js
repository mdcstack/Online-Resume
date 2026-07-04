document.addEventListener('DOMContentLoaded', () => {
    
    // 1. The Foolproof Check
    // Detects if we are on the root Home page rather than relying on folder names
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
    
    // 2. Set the fetch path
    // If on the Home page, look in navigation/. If on a sub-page, step out (../) first.
    const navbarUrl = isHomePage ? 'navigation/navbar.html' : '../navigation/navbar.html';
    
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    
    if (navbarPlaceholder) {
        fetch(navbarUrl)
            .then(response => {
                if (!response.ok) throw new Error('Navbar failed to load from: ' + navbarUrl);
                return response.text();
            })
            .then(data => {
                // Inject the navbar HTML
                navbarPlaceholder.innerHTML = data;
                
                // 3. Dynamically rewrite the links
                const links = navbarPlaceholder.querySelectorAll('a');
                
                links.forEach(link => {
                    const href = link.getAttribute('href');
                    
                    // Only modify internal page links
                    if (href && !href.startsWith('http') && !href.startsWith('#')) {
                        
                        if (isHomePage) {
                            // We are in index.html. 
                            // Push all links (except Home) into the portfolio folder.
                            if (href !== 'index.html') {
                                link.setAttribute('href', 'portfolio/' + href);
                            }
                        } else {
                            // We are inside a sub-page (like about.html).
                            // Push the Home link OUT of the folder. Keep the rest the same.
                            if (href === 'index.html') {
                                link.setAttribute('href', '../index.html');
                            }
                        }
                    }
                });
                // ==========================================
                // NEW: Mobile Menu Toggle Logic
                // ==========================================
                const mobileMenu = document.getElementById('mobile-menu');
                const navMenu = document.querySelector('.nav-menu');

                if (mobileMenu && navMenu) {
                    // Open/Close menu when clicking the hamburger
                    mobileMenu.addEventListener('click', () => {
                        mobileMenu.classList.toggle('is-active');
                        navMenu.classList.toggle('active');
                        
                        // Prevent background scrolling when menu is open
                        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
                    });
                    
                    // Close the menu automatically if a link is clicked
                    const navLinks = navMenu.querySelectorAll('a');
                    navLinks.forEach(link => {
                        link.addEventListener('click', () => {
                            mobileMenu.classList.remove('is-active');
                            navMenu.classList.remove('active');
                            document.body.style.overflow = 'auto';
                        });
                    });
                }
                // ==========================================
            })
            .catch(error => console.error('Routing Error:', error));
    }
});