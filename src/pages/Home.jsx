import React, { useEffect, useRef } from 'react';
import Hero from '../components/home/Hero/Hero';
import AboutMe from '../components/home/AboutMe/AboutMe';
import Experience from '../components/home/Experience/Experience';
import Education from '../components/home/Education/Education';
import Contact from '../components/home/Contact/Contact';
import SideNav from '../components/navigation/SideNav';
import BackToTop from '../components/common/BackToTop';
// Footer is now imported in App.jsx for all pages

function Home() {
  // Create refs for each section
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);

  // Reset scroll position on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Make sure sections have proper IDs matching what SideNav is looking for
  useEffect(() => {
    // Log all section containers to help debugging
    console.log("Hero section:", document.getElementById('hero'));
    console.log("About section:", document.getElementById('about'));
    console.log("Experience container:", document.getElementById('experience-container'));
    console.log("Education container:", document.getElementById('education-container'));
    console.log("Contact container:", document.getElementById('contact-container'));
  }, []);

  // Define custom job titles if needed
  const jobTitles = [
    "Sales Development Representative",
    "Business Development Representative",
    "Frontend Developer",
    "Software Engineer",
    "Technical Support Engineer",
    "Junior Web Developer"
  ];

  return (
    <>
      <SideNav />
      <BackToTop /> {/* Add BackToTop component */}
      <main id="top">
        {/* Make sure ID matches what's in SideNav.jsx */}
        <section id="hero">
          <Hero
            name="Melvin Peralta"
            profileImage="/photo 1.jpg"
            jobTitles={jobTitles}
          />
        </section>

        <AboutMe ref={aboutRef} />

        {/* Make sure this ID exactly matches what's in SideNav.jsx */}
        <div id="experience-container" className="section-container">
          <Experience ref={experienceRef} />
        </div>

        {/* Make sure this ID exactly matches what's in SideNav.jsx */}
        <div id="education-container" className="section-container">
          <Education ref={educationRef} />
        </div>

        <div id="contact-container" className="section-container">
          <Contact ref={contactRef} />
        </div>
      </main>
    </>
  );
}

export default Home;