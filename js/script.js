document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamically Load the Navbar
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    
    if (navbarPlaceholder) {
        fetch('navbar.html')
            .then(response => {
                if (!response.ok) throw new Error('Navbar failed to load');
                return response.text();
            })
            .then(data => {
                navbarPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Error:', error));
    }

});