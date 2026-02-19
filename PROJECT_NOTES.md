# BLACKINT - Premium Digital Agency Website

## Overview
A high-end, motion-first, editorial-style agency website built with React, Motion (Framer Motion), and Tailwind CSS v4.

## Design Philosophy
- **Motion-First**: Every interaction is smooth and intentional
- **Editorial Layouts**: Asymmetric grids with oversized typography
- **Minimal UI**: High contrast black/white with orange accents
- **Luxury Aesthetic**: Premium feel throughout

## Key Features

### Pages
1. **Homepage** - Hero, featured work, services preview, client marquee, CTA
2. **Services** - Service pillars, process timeline
3. **Work** - Portfolio grid with filtering
4. **Case Study** - Detailed project breakdown with stats
5. **About** - Philosophy, values, team, testimonials
6. **Insights** - Blog with featured articles
7. **Contact** - Contact form with info

### Components
- Custom cursor (desktop only)
- Preloader animation
- Smooth scroll navigation
- Motion animations throughout
- Responsive design
- Project cards with hover effects
- Logo marquee
- Parallax images

## Brand System

### Colors
- Black: `#000000`
- White: `#FFFFFF`
- Orange: `#FF4D00` (CTAs and accents)
- Blue: `#2563EB` (minimal use)

### Typography
- Font: Inter (Google Fonts)
- Headlines: 90-140px (desktop), 800-900 weight
- Body: 18px, line-height 1.6
- Labels: Uppercase, +4% letter spacing

### Spacing
- XS: 8px
- SM: 16px
- MD: 24px
- LG: 48px
- XL: 72px
- XXL: 120px

## Technical Stack
- React 18.3.1
- React Router DOM (routing)
- Motion/React (animations)
- Tailwind CSS v4
- Lucide React (icons)
- Unsplash (imagery)

## Motion Design Notes
The website uses Motion (modern Framer Motion) for:
- Page transitions
- Scroll-triggered animations
- Hover interactions
- Custom cursor
- Preloader sequence
- Stagger animations for lists
- Parallax effects

## Responsive Design
- Desktop-first approach
- Breakpoint at 768px (md)
- Mobile: Single column, reduced animations
- Large tap targets on mobile
- Custom cursor disabled on touch devices

## Future Enhancements
To make this production-ready, consider adding:
- Lenis smooth scroll library
- GSAP for more complex animations
- Section pinning on scroll
- More advanced parallax
- Video backgrounds
- Form validation
- CMS integration
- Analytics
- SEO optimization

## Performance Considerations
- Images are loaded from Unsplash
- Motion animations use GPU acceleration
- Minimal bundle size with tree-shaking
- Lazy loading for routes
