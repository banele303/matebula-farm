# Mathebula Farm - Brand Guidelines

## Brand Identity

Mathebula Farm represents **fresh, sustainable, and community-focused agriculture**. Our brand identity emphasizes quality, approachability, and a deep connection to the land and community we serve.

---

## Color Palette

### Primary Brand Colors - Farm Fresh Green

Our primary color palette is built around natural, earthy greens that represent growth, freshness, and sustainability.

```css
--brand-green-50:  #f0f9eb   /* Very light green - backgrounds */
--brand-green-100: #dcfce7   /* Light green - subtle highlights */
--brand-green-200: #bbf7d0   /* Soft green - hover states */
--brand-green-300: #86efac   /* Medium light green - accents */
--brand-green-400: #4ade80   /* Fresh green - interactive elements */
--brand-green-500: #22c55e   /* Primary green - main brand color ✓ */
--brand-green-600: #16a34a   /* Deep green - primary buttons ✓ */
--brand-green-700: #15803d   /* Forest green - headers, footers ✓ */
--brand-green-800: #166534   /* Dark forest - dark sections */
--brand-green-900: #14532d   /* Very dark green - text on light backgrounds */
```

### Secondary Colors - Earth Tones

Supporting colors that evoke natural, organic, and farm-fresh qualities.

```css
--brand-earth-50:  #faf7f0   /* Cream - soft backgrounds */
--brand-earth-100: #f5ede1   /* Light tan - alternative backgrounds */
--brand-earth-200: #ede0cc   /* Soft tan - borders, dividers */
--brand-earth-300: #d6bc9e   /* Medium tan - secondary elements */
--brand-earth-400: #b88d64   /* Earth brown - warm accents */
```

### Accent Colors

Special accent colors for highlighting quality and freshness.

```css
--brand-gold-400:   #fbbf24   /* Gold - quality badges, certifications */
--brand-gold-500:   #f59e0b   /* Deep gold - premium indicators */
--brand-orange-500: #f97316   /* Fresh orange - urgency, CTAs */
```

---

## Typography

### Primary Font: Inter

- **Headings**: Bold (700) and Semibold (600)
- **Body**: Regular (400) and Medium (500)
- **Small Text**: Regular (400)

### Font Sizes (Mobile-First)

```css
/* Headings */
h1: text-4xl sm:text-5xl lg:text-6xl xl:text-7xl
h2: text-3xl sm:text-4xl lg:text-5xl
h3: text-2xl sm:text-3xl lg:text-4xl
h4: text-xl sm:text-2xl lg:text-3xl

/* Body */
body: text-base (16px)
large: text-lg (18px)
small: text-sm (14px)
tiny: text-xs (12px)
```

---

## Design Principles

### 1. **Freshness First**
- Use bright, vibrant greens (#22c55e, #4ade80)
- Maintain high contrast for readability
- Incorporate natural imagery (eggs, vegetables, farm landscapes)

### 2. **Professional Yet Approachable**
- Clean, modern layouts with generous whitespace
- Rounded corners (border-radius: 0.625rem - 1rem)
- Friendly micro-interactions and hover states
- Professional color combinations with warm undertones

### 3. **Community Focus**
- Highlight B-BBEE Level 1 certification prominently
- Use testimonials and community imagery
- Emphasize local, sustainable farming practices
- Showcase transparency and trust

### 4. **Mobile-First Responsive Design**
- Breakpoints:
  - sm: 640px (small tablets)
  - md: 768px (tablets)
  - lg: 1024px (laptops)
  - xl: 1280px (desktops)
- Touch-friendly button sizes (min 44px height)
- Collapsible navigation for mobile
- Optimized images for all screen sizes

---

## Component Patterns

### Buttons

#### Primary CTA (Call-to-Action)
```jsx
className="px-6 py-3 bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 
text-white font-bold rounded-xl hover:shadow-xl hover:shadow-green-500/30 
hover:scale-105 active:scale-95 transition-all"
```

#### Secondary Button
```jsx
className="px-6 py-3 bg-white/10 backdrop-blur-md border-2 border-white/40 
text-white font-bold rounded-xl hover:bg-white/20 transition-all"
```

#### Ghost Button
```jsx
className="px-4 py-2 text-green-600 hover:text-green-700 hover:bg-green-50 
rounded-lg font-semibold transition-colors"
```

### Cards

#### Standard Card
```jsx
className="bg-white rounded-2xl border border-green-100 p-6 
hover:shadow-xl hover:shadow-green-500/10 transition-all"
```

#### Feature Card
```jsx
className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl 
hover:bg-white/15 hover:border-white/40 hover:scale-105 transition-all"
```

### Gradients

#### Primary Green Gradient
```css
background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
```

#### Hero Background Gradient
```css
background: linear-gradient(to bottom right, #166534, #15803d, #047857);
```

#### Text Gradient (Headings)
```css
background: linear-gradient(135deg, #22c55e, #4ade80);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

---

## Shadows & Effects

### Standard Shadow
```css
box-shadow: 0 10px 40px -10px rgba(34, 197, 94, 0.3);
```

### Hover Shadow
```css
box-shadow: 0 20px 60px -15px rgba(34, 197, 94, 0.4);
```

### Glow Effect (for badges, indicators)
```css
box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
```

---

## Imagery Guidelines

### Photos
- **Style**: Natural, authentic, high-quality
- **Subjects**: Farm landscapes, fresh produce, happy customers, team members
- **Treatment**: Slight warm color grading, high contrast
- **Overlay**: 30-50% opacity with green gradient overlay for hero sections

### Logos
- Primary: `/new-logo.png` - Full color logo with transparent background
- Usage: Always maintain adequate clear space around logo
- Minimum size: 80px width for digital

### Icons
- **Style**: Rounded, friendly, consistent stroke width
- **Color**: Match section theme (green-600 for primary, white for dark backgrounds)
- **Size**: 20px (icons), 24px (feature icons), 32px+ (hero icons)

---

## Accessibility Standards

### Color Contrast
- Text on light backgrounds: Minimum 4.5:1 ratio
- Text on dark backgrounds: Use white or light green (#86efac)
- Interactive elements: Clear focus states with 2px outline

### Interactive Elements
- Minimum touch target: 44x44px
- Clear hover states with color and scale changes
- Focus indicators for keyboard navigation
- Loading states for async actions

### Text
- Line height: 1.5-1.75 for body text
- Paragraph width: Max 65-75 characters per line
- Font size: Minimum 14px for body text

---

## Animation & Motion

### Timing
- Fast: 150ms (small hover effects)
- Medium: 300ms (transitions, dropdowns)
- Slow: 500-800ms (page transitions, hero animations)

### Easing
- `ease-out`: Element entering
- `ease-in`: Element exiting
- `ease-in-out`: Element changing state

### Recommended Animations
```jsx
// Scale on hover
hover:scale-105 transition-transform duration-300

// Fade in
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.8 }}

// Slide up
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: "easeOut" }}
```

---

## Voice & Tone

### Brand Voice
- **Authentic**: Genuine, transparent, down-to-earth
- **Knowledgeable**: Expert in farming, confident in quality
- **Community-Oriented**: Warm, inclusive, supportive
- **Professional**: Reliable, organized, trustworthy

### Writing Guidelines
- Use active voice
- Keep sentences concise and clear
- Emphasize benefits over features
- Include specific details (5,000 layers, A-grade eggs, Level 1 B-BBEE)
- End with clear calls-to-action

### Example Messaging
✅ **Good**: "Premium A-grade eggs from 5,000 free-range layers, delivered fresh to your door"
❌ **Avoid**: "We sell eggs"

✅ **Good**: "B-BBEE Level 1 Certified - Empowering communities through sustainable agriculture"
❌ **Avoid**: "We're B-BBEE certified"

---

## Contact Information

Always display consistently across all platforms:

- **Phone**: +27 73 523 0659
- **Email**: info@mathebulafarm.co.za
- **Location**: Honingnestkrans, North of Pretoria
- **Certification**: B-BBEE Level 1 Certified

---

## Implementation Checklist

When creating new pages or components:

- [ ] Use brand green color palette (#16a34a, #22c55e, #4ade80)
- [ ] Include proper mobile responsive breakpoints
- [ ] Add hover and focus states to interactive elements
- [ ] Maintain 16px minimum font size for readability
- [ ] Use rounded corners (rounded-lg to rounded-2xl)
- [ ] Include B-BBEE Level 1 badge where appropriate
- [ ] Optimize images for web (WebP format preferred)
- [ ] Test on mobile devices (< 768px width)
- [ ] Ensure color contrast meets WCAG 2.1 AA standards
- [ ] Add smooth animations with appropriate timing

---

**Last Updated**: October 2025  
**Version**: 1.0  
**Maintained By**: Mathebula Farm Development Team
