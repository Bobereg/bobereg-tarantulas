document.addEventListener('DOMContentLoaded', () => {

    // NOWA LOGIKA HAMBURGERA
    const hamburgerInput = document.querySelector('.hamburger input');
    const navUl = document.querySelector('#nav-ul');

    if (hamburgerInput && navUl) { 
        hamburgerInput.addEventListener('change', () => {
            // Synchronizuj stan menu (active) ze stanem checkboxa (checked)
            if (hamburgerInput.checked) {
                navUl.classList.add('active');
            } else {
                navUl.classList.remove('active');
            }
        });
    }

    const navLinks = document.querySelectorAll('#nav-ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navUl && hamburgerInput) { 
                navUl.classList.remove('active'); // Zamknij menu
                hamburgerInput.checked = false; // Odznacz checkbox (resetuje animację hamburgera)
            }
        });
    });

});

/* --- KOD PRZEŁĄCZNIKA MOTYWU --- */
(function () {
    const root = document.documentElement;
    const toggle = document.getElementById('themeToggle');
    
    if (!toggle) {
        return; 
    }

    const STORAGE_KEY = 'site-theme'; 

    function getSavedTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function saveTheme(value) {
        try {
            localStorage.setItem(STORAGE_KEY, value);
        } catch (e) { /* ignore */ }
    }

    function applyTheme(value) {
        if (value === 'dark') {
            root.setAttribute('data-theme', 'dark');
            toggle.setAttribute('aria-checked', 'true');
        } else { 
            root.removeAttribute('data-theme');
            toggle.setAttribute('aria-checked', 'false');
        }
    }

    function initTheme() {
        const saved = getSavedTheme();
        if (saved === 'dark' || saved === 'light') {
            applyTheme(saved);
        } else {
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
        }
    }

    function toggleTheme() {
        const isDarkNow = root.getAttribute('data-theme') === 'dark';
        const newTheme = isDarkNow ? 'light' : 'dark';
        applyTheme(newTheme);
        saveTheme(newTheme);
    }

    toggle.addEventListener('click', function (e) {
        e.preventDefault();
        toggleTheme();
    });

    if (window.matchMedia) {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        if (mq.addEventListener) { 
            mq.addEventListener('change', function (e) {
                if (!getSavedTheme()) {
                    applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        } else if (mq.addListener) { 
             mq.addListener(function (e) {
                if (!getSavedTheme()) {
                    applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    initTheme();
})();