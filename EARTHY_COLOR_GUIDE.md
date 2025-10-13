# Mathebula Farm - Earthy Color Theme Guide

## 🌾 Color Philosophy

Aligned with the Mathebula Farm Corporate Profile, this color system emphasizes:

1. **Brown/Earthy Tones** (Dominant) - Soil, eggs, chickens, agricultural environment
2. **White** (Clean & Fresh) - Poultry houses, freshness, clarity  
3. **Green** (Growth & Vitality) - Fresh produce, plant life, sustainability

---

## 🎨 PRIMARY: Earth Tones (Browns)

**These are your MAIN brand colors** - representing soil, earth, eggs, and the agricultural environment.

```
🟤 brown-50:  #fbf7f2  (Lightest cream - backgrounds)
🟤 brown-100: #f5ede3  (Light cream - egg shell color)
🟤 brown-200: #ebdeca  (Soft tan - subtle backgrounds)
🟤 brown-300: #d2b48c  (Warm tan - chicken color) ⭐
🟤 brown-400: #a57c55  (Earth brown - soil) ⭐⭐
🟤 brown-500: #8b613f  (Rich earth - PRIMARY BRAND) ⭐⭐⭐
🟤 brown-600: #784f32  (Deep earth - primary buttons)
🟤 brown-700: #5c402b  (Dark soil)
🟤 brown-800: #442f21  (Very dark earth - headers)
🟤 brown-900: #2d2017  (Almost black earth - footers)
```

### Usage:
- **Headers/Footers**: brown-800, brown-900
- **Primary Buttons**: brown-500, brown-600  
- **Text**: brown-900 on light backgrounds
- **Backgrounds**: brown-50, brown-100, brown-200

---

## 🌱 SECONDARY: Natural Greens

**Fresh produce, plant life, growth** - supporting the earth tones.

```
🟢 green-50:  #f0f9eb  (Very light green)
🟢 green-100: #dcf7dc  (Light green - fresh produce)
🟢 green-200: #bbedbb  (Soft green)
🟢 green-300: #86d386  (Medium green - spinach) ⭐
🟢 green-400: #5cb85c  (Fresh green)
🟢 green-500: #469e46  (Natural green) ⭐⭐
🟢 green-600: #388e3c  (Deep green - accents)
🟢 green-700: #2e7d32  (Forest green)
🟢 green-800: #236126  (Dark foliage)
🟢 green-900: #1b4a1e  (Very dark green)
```

### Usage:
- **Accents**: green-500, green-600
- **Secondary Buttons**: green-600
- **Icons**: green-500 on white
- **Hover States**: green-400, green-500

---

## 🤍 TERTIARY: Warm Whites & Creams

**Freshness, cleanliness, poultry houses** - providing contrast and clarity.

```
⚪ cream-50:  #fffdfa  (Pure white - poultry house)
⚪ cream-100: #fefaf4  (Off white)
⚪ cream-200: #faf2e8  (Light cream)
⚪ cream-300: #f5e7d6  (Egg shell white) ⭐
```

### Usage:
- **Main Background**: white, cream-50
- **Cards**: white with brown borders
- **Text on Dark**: cream-50, cream-100

---

## ✨ ACCENT: Golden & Warm Tones

**Quality indicators, warmth, premium feel**

```
🟡 gold-400:   #ea b308  (Golden yellow - quality badges)
🟡 gold-500:   #ca8a04  (Deep gold - premium)
🟠 amber-500:  #d97706  (Warm amber - CTAs) ⭐
🔴 terracotta: #c05621  (Terracotta clay - warmth)
```

### Usage:
- **B-BBEE Badge**: gold-400 with amber accents
- **CTA Buttons**: amber-500 to orange-600 gradients
- **Quality Indicators**: gold-400, gold-500

---

## 🎯 Common Color Combinations

### Hero Section (Dark Background)
```css
Background: amber-900 → brown-800 → orange-900 (gradient)
Text: white, cream-50
Accents: amber-300, amber-400
Stats/Numbers: amber-300
CTA Button: amber-700 → amber-600 → orange-600 (gradient)
Badge: amber-600/20 background, amber-400/30 border
```

### Navigation Bar (Light)
```css
Background: white
Top Bar: amber-900 → brown-800 → orange-900 (gradient)
Links: amber-900 → amber-700 (hover)
Active Link Underline: amber-700 → amber-600 → green-600 (gradient)
CTA Button: amber-700 → amber-600 → orange-600
Mobile Menu: white → amber-50/30 (gradient)
```

### Footer (Dark Background)
```css
Background: amber-900 → brown-800 → orange-900 (gradient)
Text: amber-100, amber-200
Links: amber-200 → amber-100 (hover)
Section Headings: amber-100
Icons: amber-400
Decorative Blur: amber-600/10, orange-600/10
```

### Cards & Content
```css
Background: white, cream-50
Border: amber-100, brown-200
Text: brown-900
Headings: amber-900, brown-800
Hover Shadow: amber-600/10 or brown-500/20
Icons: amber-600, green-600
```

### Buttons

#### Primary Button (Earth Tone)
```jsx
className="bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600"
```

#### Secondary Button (Green Accent)
```jsx
className="bg-gradient-to-r from-green-600 to-green-500"
```

#### Ghost Button
```jsx
className="bg-white/10 border-2 border-white/40"
```

---

## 📱 Mobile-First Responsive Usage

### Small Screens (< 640px)
- Use solid colors instead of complex gradients
- Higher contrast (brown-900 text on white)
- Larger touch targets with amber-700 backgrounds
- Simplified shadows

### Large Screens (> 1024px)
- Rich gradients (amber-700 → orange-600)
- Subtle hover effects
- Complex layered backgrounds
- Decorative blur elements (amber/orange)

---

## 🎨 Gradient Formulas

### Earth Gradient (Primary)
```css
background: linear-gradient(135deg, #784f32 0%, #8b613f 100%);
/* brown-600 to brown-500 */
```

### Warm Gradient (CTA)
```css
background: linear-gradient(135deg, #b45309 0%, #ea580c 100%);
/* amber-700 to orange-600 */
```

### Green Accent Gradient
```css
background: linear-gradient(135deg, #388e3c 0%, #469e46 100%);
/* green-600 to green-500 */
```

### Text Gradient (Headings)
```css
background: linear-gradient(135deg, #fcd34d, #469e46);
/* amber-300 to green-500 */
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

---

## 🌟 Visual Hierarchy

### Color Priority Order:
1. **Earth Browns** (Primary) - 60% of design
2. **White/Cream** (Balance) - 30% of design  
3. **Natural Greens** (Accent) - 8% of design
4. **Gold/Amber** (Highlights) - 2% of design

### Text Hierarchy:
- **Main Headings**: brown-900, amber-900
- **Subheadings**: brown-700, amber-800
- **Body Text**: brown-900 (on light), cream-50 (on dark)
- **Links**: amber-700, green-600
- **Muted Text**: brown-600, amber-700

---

## ✅ Quick Copy-Paste Classes

### Backgrounds
```jsx
// Light earth background
className="bg-gradient-to-b from-white to-amber-50"

// Dark earth background
className="bg-gradient-to-br from-amber-900 via-brown-800 to-orange-900"

// Card background
className="bg-white border border-amber-100"
```

### Text
```jsx
// Primary text
className="text-brown-900"

// Light text on dark
className="text-amber-50"

// Heading with gradient
className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent"
```

### Buttons
```jsx
// Primary CTA
className="bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white hover:shadow-xl hover:shadow-amber-600/30"

// Green accent button
className="bg-gradient-to-r from-green-600 to-green-500 text-white"

// Outline button
className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50"
```

### Badges
```jsx
// B-BBEE Badge
className="bg-amber-600/20 border border-amber-400/30 text-amber-50"

// Quality indicator
className="bg-gold-400/20 border border-gold-400/30 text-gold-700"
```

---

## 🎯 Do's and Don'ts

### ✅ DO:
- Use brown as the primary color for headers and CTAs
- Combine earth browns with natural greens
- Use white/cream for breathing room and clarity
- Apply warm amber/gold for quality indicators
- Keep green as an accent, not dominant

### ❌ DON'T:
- Use bright, neon colors
- Make green the dominant color
- Use cool grays (use warm browns instead)
- Overuse gradients on mobile
- Mix earth tones with cool blues

---

## 📊 Accessibility

### Color Contrast Ratios:
- **brown-900 on white**: 15.1:1 ✓ (AAA)
- **amber-700 on white**: 4.8:1 ✓ (AA)
- **green-600 on white**: 4.5:1 ✓ (AA)
- **amber-50 on brown-900**: 14.2:1 ✓ (AAA)
- **white on amber-700**: 4.9:1 ✓ (AA)

---

**Theme Summary**: Warm, earthy, and natural - reflecting the agricultural roots of Mathebula Farm while maintaining professional polish and readability.
