# Frontend Mentor - REST Countries API with color theme switcher

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*

### Links

- Solution URL: *(Coming Soon)*
- Live Site URL: [https://countries-api-gray-ten.vercel.app](https://countries-api-gray-ten.vercel.app)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- **[Astro](https://astro.build/)** - The web framework for content-driven websites
- **[Tailwind CSS v4](https://tailwindcss.com/)** - For utility-first rapid styling
- **Vanilla JavaScript** - For interactive filtering and search features without heavy framework overhead

### What I learned

This project was a great dive into **Astro**'s powerful pre-rendering abilities alongside modern **Tailwind v4**.

I managed to build a native-feeling Dropdown menu just using CSS and the `peer-checked` trick to keep the Javascript footprint to the absolute minimum:

```html
<details class="group relative w-full lg:w-48 bg-white dark:bg-blue-900 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-none focus-within:ring-2 focus-within:ring-blue-500">
    <summary class="flex items-center justify-between px-6 py-4 cursor-pointer text-gray-950 dark:text-white font-semibold outline-none list-none marker:hidden">
        <label for="filter-toggle" class="cursor-pointer w-full flex items-center justify-between">
            <span>Filter by Region</span>
            <Icon name="arrow" class="..." />
        </label>
    </summary>
    <input type="checkbox" id="filter-toggle" class="sr-only peer" />
    <ul class="...">...</ul>
</details>
```

I also leveraged Astro's `getStaticPaths()` function to fetch all the country details directly from a JSON source and create blazing fast individual static pages for all 250 countries:

```javascript
// Tell Astro to pre-render a route for every country in the JSON file
export async function getStaticPaths() {
    return data.map((c: any) => ({
        params: { country: createSlug(c.name) },
        props: { name: c.name },
    }));
}
```

### Continued development

For future iterations or projects, I plan to:
1. Handle true API Fetching (instead of using `data.json`) to manage loading states or Astro Server Side Rendering (SSR).
2. Learn more about Astro's `ViewTransitions` to make the navigation between the Grid and the Country details feel completely seamless without full page loads.
3. Optimize search filtering using fuzzy search libraries to help with typographical errors.

### Useful resources

- [Astro Documentation](https://docs.astro.build/) - Helped me understand Static Site Generation and routing perfectly.
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs/) - Crucial for learning the new `@theme` engine and global variables instead of the old `tailwind.config.js`.

## Author

- Frontend Mentor - [@bhzeuscagd](https://www.frontendmentor.io/profile/bhzeuscagd)
- Portfolio - [cagd](https://portfolio-cagd.vercel.app/)

# countries-api-consumer
