# Melvin Peralta - Personal Resume Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-netlify-badge-id/deploy-status)](https://app.netlify.com/sites/melvinworks/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.3-purple)](https://vitejs.dev/)

![Website Preview](public/preview.png)

## 🌟 Live Demo

Visit my portfolio at [melvinworks.bio](https://melvinworks.bio)

## 🚀 Overview

A modern, responsive personal portfolio and resume website built with React. This project showcases my professional experience, education, skills, and provides multiple ways for potential employers and clients to contact me.

## ✨ Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablets, and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes with system preference detection
- **Interactive UI**: Smooth animations and transitions powered by Framer Motion
- **Progressive Web App**: Installable on mobile devices with offline capabilities
- **Contact Form**: Built-in form with email integration using EmailJS
- **Calendly Integration**: Schedule meetings directly from the website
- **SEO Optimized**: Proper metadata and structured content for better search engine visibility
- **Performance Optimized**: Lazy loading, code splitting, and optimized assets
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels and keyboard navigation
- **Analytics**: Built-in analytics tracking
- **Social Sharing**: Easy sharing of portfolio sections
- **Print-Friendly**: Optimized resume for printing

## 🛠️ Technologies Used

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 6.3.3
- **Styling**: 
  - CSS Modules
  - SASS
  - Tailwind CSS
- **Icons & UI**: 
  - React Icons
  - Font Awesome
- **Animation**: Framer Motion
- **Routing**: React Router v6
- **Form Handling**: EmailJS
- **PWA Support**: Vite PWA Plugin
- **Development Tools**:
  - ESLint
  - Prettier
  - TypeScript
- **Deployment**: Netlify

## 🏗️ Project Structure

```
my-resume-website/
│
├── public/              # Static assets and icons
│   ├── icons/          # Favicon and app icons
│   ├── images/         # Images used across the site
│   └── offline.html    # Offline fallback page
│
├── src/
│   ├── assets/         # Images, styles, and other assets
│   │
│   ├── components/     # Reusable UI components
│   │   ├── about/      # Components for About page
│   │   ├── common/     # Shared components
│   │   ├── contact/    # Contact page components
│   │   ├── home/       # Home page components
│   │   ├── layout/     # Layout components (Header, Footer)
│   │   ├── navigation/ # Navigation components
│   │   └── resume/     # Resume page components
│   │
│   ├── config/         # Configuration files
│   ├── data/           # Data files (experience, education)
│   ├── pages/          # Page components
│   ├── services/       # API and service functions
│   ├── utils/          # Utility functions
│   │
│   ├── App.jsx         # Main application component
│   ├── index.css       # Global styles
│   └── main.jsx        # Entry point
│
├── scripts/            # Build scripts
├── .env               # Environment variables
├── package.json       # Dependencies and scripts
└── vite.config.js     # Vite configuration
```

## 📋 Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn
- Git

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/melloom/my-resume-website.git
   cd my-resume-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🚢 Deployment

### Netlify (Recommended)

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command to `npm run build` and publish directory to `dist`
4. Add environment variables in Netlify dashboard

### Vercel

1. Push your code to GitHub
2. Import your repository to Vercel
3. Set build command to `npm run build` and output directory to `dist`
4. Add environment variables in Vercel dashboard

### GitHub Pages

1. Update `vite.config.js` with your base path:
   ```javascript
   export default defineConfig({
     base: '/my-resume-website/',
     // ...other config
   })
   ```
2. Deploy using:
   ```bash
   npm run build
   npm run deploy
   ```

## 🎨 Customization

### Personal Information

1. Update data files in `src/data/`:
   - `experienceData.js`: Your work experience
   - `educationData.js`: Your education history
   - `skillsData.js`: Your skills and expertise

2. Replace images:
   - Profile picture: `public/images/profile.jpg`
   - Project screenshots: `public/screenshots/`
   - Favicon and app icons: `public/icons/`

### Styling

1. Theme colors: Edit CSS variables in `src/index.css`
2. Typography: Update font imports in `index.html`
3. Layout: Modify component styles in respective CSS modules

### Features

1. Contact Form: Update EmailJS configuration in `.env`
2. Analytics: Add your tracking ID in `src/config/analytics.js`
3. Social Links: Update in `src/config/social.js`

## 📝 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run push`: Build, commit, push to GitHub, and deploy to Netlify

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by [React Icons](https://react-icons.github.io/react-icons/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Font families from [Google Fonts](https://fonts.google.com/)
- Build tool by [Vite](https://vitejs.dev/)
- Hosting by [Netlify](https://www.netlify.com/)

## 📞 Contact

Melvin Peralta - [@melloom](https://github.com/melloom)

Project Link: [https://github.com/melloom/my-resume-website](https://github.com/melloom/my-resume-website)

---

Designed and developed by Melvin Peralta © 2024
```