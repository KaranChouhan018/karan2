# Portfolio Template - Demo Version

This is a premium portfolio template built with Next.js, featuring stunning animations, 3D effects, and modern design principles.

## 🚀 Features

- **Modern Design**: Clean, professional layout with attention to detail
- **Smooth Animations**: GSAP-powered animations and transitions
- **3D Effects**: Interactive 3D elements and distortion effects
- **Responsive**: Fully responsive design for all devices
- **Performance Optimized**: Built with Next.js for optimal performance
- **Easy Customization**: Well-structured code for easy modifications

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Animations**: GSAP, Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **Typography**: Custom fonts with optimal loading
- **Performance**: Optimized images and assets

## 📝 Customization Guide

### 1. Personal Information
Update the following files with your information:

**src/components/SceneText.jsx**
```jsx
// Change "YOUR NAME" to your actual name
<h1>HI THERE, I&apos;M</h1>
<h1>YOUR NAME.</h1>

// Update location
<h1>Based in Your Location</h1>
```

**src/components/Navbar.jsx**
```jsx
// Update brand name
<h1>YourBrand <sup>©</sup></h1>
```

**src/app/layout.js**
```jsx
// Update metadata
title: "YourBrand - Front End Developer",
description: "Your Name, Freelance Front End Developer...",
```

### 2. Contact Information
**src/components/CtaSection.jsx** & **src/Nav/index.jsx**
```jsx
// Replace placeholder email
<span data-hover="your@email.com">your@email.com</span>
```

**src/components/Footer.jsx**
```jsx
// Update copyright
<p>© 2025 Your Name <br /> All rights reserved.</p>
```

### 3. External Links
All external links have been replaced with "#" for demo purposes. Update these in:

- **src/components/FeaturedWork.jsx**: Project URLs
- **src/components/Footer.jsx**: Social media links
- **src/components/AboutSvg.jsx**: Portfolio links
- **src/components/CtaSection.jsx**: Booking/contact links
- **src/components/Navbar.jsx**: Call-to-action links
- **src/Nav/index.jsx**: Social media links

### 4. Images
Replace the following images with your own:
- `/public/profile.jpg` - Your profile photo
- `/public/p1.png` to `/public/p10.jpg` - Your project screenshots
- `/public/image1.jpg`, `/public/image2.jpg` - Testimonial photos

### 5. Project Portfolio
Update **src/components/FeaturedWork.jsx** with your projects:
```jsx
const WORKS = [
  {
    id: 1,
    title: 'Your Project Name',
    categories: ['WEB', 'DESIGN', 'DEVELOPMENT'],
    image: '/images/your-project-image.jpg',
    centerImage: '/your-project-mockup.png',
    slug: 'https://your-project-url.com'
  },
  // Add more projects...
];
```

### 6. Testimonials
Update **src/components/Testimonial.jsx** with real testimonials:
```jsx
const testimonials = [
  {
    id: 1,
    quote: '"Your client testimonial here"',
    name: "Client Name",
    role: "Client Role",
    company: "Company Name",
    tags: ["SERVICE1", "SERVICE2"],
    imageSrc: "/client-photo.jpg",
  },
  // Add more testimonials...
];
```

## 🚀 Getting Started

1. **Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

3. **Build for Production**
```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
├── common/             # Reusable components
├── hooks/              # Custom React hooks
├── Nav/                # Navigation components
├── Preloader/          # Loading screen
└── shaders/            # WebGL shaders
```

## 🎨 Customization Tips

1. **Colors**: Update the color scheme in `src/app/globals.css`
2. **Fonts**: Replace fonts in `public/fonts/` and update `src/app/layout.js`
3. **Animations**: Modify GSAP animations in component files
4. **Layout**: Adjust component layouts and spacing as needed

## 📱 Responsive Design

The template is fully responsive with breakpoints for:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ⚡ Performance

- Optimized images with Next.js Image component
- Lazy loading for better performance
- Minimal bundle size with tree shaking
- Efficient animations with GSAP

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This is a premium template. Please ensure you have the proper license before using it commercially.

## 🆘 Support

For customization help or technical support, please refer to the documentation or contact support.

---

**Note**: This is a demo version with placeholder content and disabled external links. All links have been replaced with "#" for demonstration purposes. You can easily update them with your actual URLs when customizing the template.