# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio website for **Wisan Studio**, a luxury interior design and architecture firm. It's a static site built with vanilla HTML, CSS, and JavaScript showcasing architectural projects across Southern California.

**Key Technologies:**
- Vanilla JavaScript (ES6+) - No frameworks or build tools
- HTML5 with semantic structure
- CSS3 with modern features (Grid, Flexbox, CSS Custom Properties)
- Static file deployment (no server/backend required)

## Architecture & File Structure

### Core Pages
- `index.html` - Homepage with hero, about, services, portfolio sections, and contact form
- `projects.html` - Dedicated projects showcase page with full galleries

### JavaScript Modules
- `script.js` - Core functionality (navigation, forms, animations, contact)
- `projects.js` - Gallery modal system with image carousel
- `image-config.js` - **CRITICAL**: Centralized image configuration (single source of truth)

### Styling
- `styles.css` - Global styles with responsive design (800+ lines)
- `projects.css` - Projects page specific styles

### Image Management
The site uses a centralized image configuration system via `image-config.js`:

```javascript
IMAGE_CONFIG = {
  basePath: '../images/',
  homepage: { logo, hero },
  projects: {
    'project-key': { title, description, location, folder, images }
  }
}
```

**Current Projects (9 total):**
1. Luxury Gym (wellness-club) - Venice Beach
2. Joshua Tree Airbnb (joshua-tree) - Joshua Tree
3. Single Family+ADU (single-family-adu) - Los Angeles
4. Expansion ADU (luxury-expansion) - Santa Monica
5. Multiple Unit Apartment (multi-apartment) - Hollywood
6. Duplex (multi-condo) - Inglewood
7. Family Renovation (family-renovation) - Westwood
8. Customized ADU (customized-adu) - Pasadena
9. General Office TI (tenant-improvement) - Anaheim

## Development Commands

**No build system** - This is a static site with no package.json, bundler, or build tools.

### Local Development
```bash
# Serve locally (choose any method):
python -m http.server 8000
# OR
npx serve .
# OR
php -S localhost:8000
```

### Testing
- **No automated tests** - Manual browser testing only
- Test responsive design at breakpoints: 1200px, 968px, 768px, 480px
- Test gallery functionality (modal, carousel, keyboard navigation)
- Test contact form validation

## Key Development Patterns

### Adding New Projects
1. **Add images** to `images/projects/[project-folder]/`
2. **Update `image-config.js`** with new project entry:
   ```javascript
   'project-key': {
     title: 'Project Title',
     description: 'Detailed description...',
     location: 'City, CA',
     category: 'residential' | 'commercial',
     folder: 'actual-folder-name',
     coverImage: 'cover-image.jpg',
     images: ['image1.jpg', 'image2.jpg', ...]
   }
   ```
3. **No code changes needed** - the site will automatically display the new project

### Image Organization
- Homepage images: `images/homepage/`
- Project images: `images/projects/[folder-name]/`
- Follow existing naming conventions in each project folder
- Recommended size: 1200x800px or similar high-resolution

### Responsive Design
- **Mobile-first** approach with progressive enhancement
- Breakpoints: 1200px (desktop), 968px (tablet), 768px (mobile), 480px (small mobile)
- Test navigation hamburger menu on mobile
- Verify gallery modal works across devices

## Important Files to Understand

### `image-config.js` - Central Configuration
- **Single source of truth** for all images and project data
- Exports both CommonJS and browser globals
- Helper functions: `getProjectCoverImage()`, `getProjectGallery()`, etc.
- **Always update this file when adding/modifying projects**

### `script.js` - Core Functionality
- Mobile navigation toggle
- Cookie consent management (localStorage)
- Contact form validation and submission
- Scroll animations using Intersection Observer
- CTA button navigation

### `projects.js` - Gallery System
- Modal gallery with image carousel
- Thumbnail navigation
- Keyboard controls (arrows, Escape)
- Integrates with `image-config.js` for dynamic content

## Contact Form Notes
- **Client-side only** - no backend integration
- Email validation with regex
- Form submission shows success message but doesn't actually send email
- Consider integrating with Netlify Forms, Formspree, or similar service for production

## Deployment
- **Static hosting ready** - can deploy to:
  - GitHub Pages
  - Netlify
  - Vercel
  - Any static file server
- **No build step required** - deploy entire directory as-is
- Images are served directly from `/images` folder

## Code Quality Guidelines

### When Modifying JavaScript
- Maintain ES6+ syntax and modern JavaScript patterns
- Keep vanilla JS approach (no framework dependencies)
- Preserve existing event handling patterns
- Test gallery functionality after changes

### When Updating Styles
- Use existing CSS custom properties for colors
- Maintain responsive design patterns
- Test across all breakpoints
- Preserve hover effects and transitions

### When Adding Features
- **Prioritize simplicity** - this is a showcase site, not a complex application
- Maintain the centralized image configuration approach
- Keep consistent with existing design patterns
- Ensure mobile responsiveness

## Existing Documentation
- `IMAGE_GUIDE.md` - Instructions for organizing project images
- `HOMEPAGE_IMAGES.md` - Guide for homepage image placement
- Note: These docs reference old project names but the pattern is still valid

## Common Tasks

### Update Project Gallery
1. Add images to `images/projects/[folder]/`
2. Update the `images` array in `image-config.js`
3. Test gallery functionality

### Modify Contact Form
1. Update validation in `script.js`
2. Consider backend integration for actual email sending
3. Update success/error messaging

### Add New Page
1. Create new HTML file following existing structure
2. Import necessary CSS and JS files
3. Update navigation in existing pages
4. Maintain responsive design patterns

### Performance Optimization
- Optimize images (WebP format, appropriate sizing)
- Consider lazy loading for project galleries
- Minify CSS/JS for production (currently unminified)