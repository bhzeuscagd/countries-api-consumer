export const setupThemeToggle = () => {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const themeText = document.getElementById("theme-text");

    const updateThemeUI = (theme: string) => {
        if (theme === "dark") {
            // Update Icon to Sun for switching back to light
            themeIcon?.setAttribute("href", "/atlas.svg#sunny");
            if (themeText) themeText.textContent = "Light Mode";
        } else {
            // Update Icon to Moon for switching to dark
            themeIcon?.setAttribute("href", "/atlas.svg#moon");
            if (themeText) themeText.textContent = "Dark Mode";
        }
    };

    // Initial load UI sync
    const currentTheme = localStorage.getItem("theme") || 
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    
    updateThemeUI(currentTheme);

    // Toggle event
    themeToggleBtn?.addEventListener("click", () => {
        const isDark = document.documentElement.classList.contains("dark");
        const newTheme = isDark ? "light" : "dark";

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        localStorage.setItem("theme", newTheme);
        updateThemeUI(newTheme);
    });
};

export const setupFilters = () => {
    const filterLabel = document.querySelector('label[for="filter-toggle"] span');
    const filterOptions = document.querySelectorAll('#filter-toggle ~ ul li button');
    const countryCards = document.querySelectorAll('.country-card');
    const searchInput = document.getElementById('search-input') as HTMLInputElement;

    let currentRegion = "All";
    let currentSearch = "";

    const filterCards = () => {
        countryCards.forEach(card => {
            const cardRegion = card.getAttribute('data-region') || "";
            const cardName = card.getAttribute('data-name') || "";
            
            const matchesRegion = currentRegion === "All" || cardRegion === currentRegion;
            const matchesSearch = currentSearch === "" || cardName.includes(currentSearch);

            if (matchesRegion && matchesSearch) {
                card.parentElement?.classList.remove('hidden');
            } else {
                card.parentElement?.classList.add('hidden');
            }
        });
    };

    filterOptions.forEach(option => {
        option.addEventListener('click', () => {
            currentRegion = option.textContent?.trim() || "All";
            
            // Update label text conditionally on "All"
            if (filterLabel) {
                filterLabel.textContent = currentRegion === "All" ? "Filter by Region" : currentRegion;
            }
            
            // Uncheck the hidden checkbox to close the dropdown
            const toggle = document.getElementById('filter-toggle') as HTMLInputElement;
            if (toggle) toggle.checked = false;

            filterCards();
        });
    });

    if (searchInput) {
        // Also listen to keyup events explicitly, as 'input' might be firing inconsistently on some mobile keyboards or Astro forms.
        ['input', 'keyup'].forEach(eventType => {
            searchInput.addEventListener(eventType, (e) => {
                currentSearch = (e.target as HTMLInputElement).value.toLowerCase().trim();
                filterCards();
            });
        });
    }
};
