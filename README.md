# Melvin Peralta - Personal Resume Website

![Website Preview](public/preview.png)

## 🚀 Overview

A modern, responsive personal portfolio and resume website built with React. This project showcases my professional experience, education, skills, and provides multiple ways for potential employers and clients to contact me.

## ✨ Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablets, and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Interactive UI**: Smooth animations and transitions powered by Framer Motion
- **Progressive Web App**: Installable on mobile devices with offline capabilities
- **Contact Form**: Built-in form with email integration
- **Calendly Integration**: Schedule meetings directly from the website
- **SEO Optimized**: Proper metadata and structured content for better search engine visibility
- **Performance Optimized**: Lazy loading, code splitting, and optimized assets

## 🛠️ Technologies Used

- **React**: Frontend library for building user interfaces
- **CSS Modules**: Scoped styling for components
- **React Icons**: Extensive icon collection
- **Framer Motion**: Animation library
- **React Router**: For page navigation
- **Vite**: Fast build tool and development server
- **PWA Support**: Service workers for offline functionality

## 🏗️ Project Structure

```
my-resume-website/
│
├── public/              # Static assets and icons
│   ├── icons/           # Favicon and app icons
│   └── images/          # Images used across the site
│
├── src/
│   ├── assets/          # Images, styles, and other assets
│   │
│   ├── components/      # Reusable UI components
│   │   ├── about/       # Components for About page
│   │   ├── common/      # Shared components
│   │   ├── contact/     # Contact page components
│   │   ├── home/        # Home page components
│   │   ├── layout/      # Layout components (Header, Footer)
│   │   ├── navigation/  # Navigation components
│   │   └── resume/      # Resume page components
│   │
│   ├── config/          # Configuration files
│   ├── data/            # Data files (experience, education)
│   ├── pages/           # Page components
│   ├── services/        # API and service functions
│   ├── utils/           # Utility functions
│   │
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
│
├── scripts/             # Build scripts
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## 📋 Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/my-resume-website.git
   cd my-resume-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Install the missing PWA plugin:
   ```bash
   npm install vite-plugin-pwa --save-dev
   # or
   yarn add vite-plugin-pwa --dev
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🚢 Deployment

This site can be easily deployed to various platforms:

### Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command to `npm run build` and publish directory to `dist`

### Vercel

1. Push your code to GitHub
2. Import your repository to Vercel
3. Set build command to `npm run build` and output directory to `dist`

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

To make this your own:

1. Update personal information in data files:
   - `src/data/experienceData.js`
   - `src/data/educationData.js`

2. Replace images in the `public/images/` directory with your own

3. Update content in component files to match your profile

4. Customize theme colors in CSS variables

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Icons by [React Icons](https://react-icons.github.io/react-icons/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Font families from [Google Fonts](https://fonts.google.com/)

---

Designed and developed by Melvin Peralta © 2023
```