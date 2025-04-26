import React, { useState, useEffect } from 'react';
import { FaDownload, FaEnvelope, FaFileAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import styles from './Hero.module.css';

// JobTitleAnimation component incorporated directly in the file
const JobTitleAnimation = ({ jobTitles = [], typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000 }) => {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [jobIndex, setJobIndex] = useState(0);
  const [delta, setDelta] = useState(typingSpeed);
  const [isBlinking, setIsBlinking] = useState(true);
  // Static prefix that doesn't change
  const staticPrefix = "I'm a";

  // Use provided titles if they exist, otherwise use defaults
  // Ensure we don't have duplicates
  const titles = jobTitles.length > 0 ?
    Array.from(new Set([...jobTitles])) :
    [
      'Sales Development Representative',
      'Business Development Representative',
      'Lead Generation Specialist',
      'Sales Professional',
      'Customer Relationship Manager',
      'Sales Team Leader',
      'Revenue Generation Specialist',
      'Outbound Sales Specialist',
      'Client Acquisition Expert',
      'Growth Strategy Consultant',
      'Junior Web Developer',
      'Frontend Developer',
      'Software Engineer',
      'IT Support Specialist',
      'Technical Support Engineer',
      'Data Analyst',
      'UX/UI Designer',
      'Quality Assurance Tester',
      'Technical Writer',
      'Junior Project Manager'
    ];

  // Improved animation logic
  useEffect(() => {
    const ticker = setTimeout(() => {
      tick();
    }, delta);

    return () => clearTimeout(ticker);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentText, isDeleting, jobIndex, delta]);

  const tick = () => {
    const currentJobTitle = titles[jobIndex];
    const fullText = currentJobTitle;

    // Stop blinking during typing or deleting
    if (!isDeleting && currentText.length === 0) {
      setIsBlinking(true);
    } else {
      setIsBlinking(false);
    }

    if (!isDeleting) {
      setCurrentText(fullText.substring(0, currentText.length + 1));
      setDelta(typingSpeed);

      if (currentText === fullText) {
        setIsDeleting(true);
        setDelta(pauseDuration);
        setIsBlinking(true); // Start blinking during pause
      }
    } else {
      setCurrentText(fullText.substring(0, currentText.length - 1));
      setDelta(deletingSpeed);

      if (currentText === '') {
        setIsDeleting(false);
        setJobIndex((prev) => (prev + 1) % titles.length);
        setDelta(typingSpeed);
        setIsBlinking(true); // Start blinking when empty
      }
    }
  };

  return (
    <div className={styles.jobTitleAnimation}>
      <span className={styles.staticPrefix}>{staticPrefix}</span>
      <div className={styles.titleContainer}>
        <span className={styles.jobTitle}>{currentText}</span>
        <span className={`${styles.cursor} ${isBlinking ? styles.blink : ''}`}></span>
      </div>
    </div>
  );
};

// Update the Hero function to fix the image path
const Hero = ({
  name = "Melvin Peralta",
  // Update path to use the correct photo from public directory 
  profileImage = "/photo 1.jpg", // Updated path to match actual file location
  jobTitles = []
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(profileImage);
  const [imageError, setImageError] = useState(false);

  // Simplified navigation handler for all links
  const handleNavigation = (e, path, options = {}) => {
    e.preventDefault();
    e.stopPropagation();

    // Always set the internal navigation flag
    sessionStorage.setItem('internalNavigation', 'true');

    // Set additional flags based on destination
    if (options.isResume) {
      sessionStorage.setItem('forceScrollTop', 'true');
      localStorage.setItem('resumeScrollNeeded', 'true');
    } else if (options.isContact) {
      sessionStorage.setItem('forceScrollTopContact', 'true');
      localStorage.setItem('contactScrollNeeded', 'true');
      sessionStorage.setItem('contactNavigation', 'true');
    }

    // Use direct location navigation for consistent behavior
    window.location.href = path;
  };

  // Default job titles list if none provided
  const defaultJobTitles = [
    "Sales Dev Rep",
    "Business Dev Rep",
    "Lead Gen Spec",
    "Sales Professional",
    "Customer Relations Mgr",
    "Sales Team Leader",
    "Revenue Gen Spec",
    "Outbound Sales Rep",
    "Client Acq Expert",
    "Growth Strategist",
    "Customer Success Mgr",
    "Junior Web Dev",
    "Frontend Dev",
    "Software Eng",
    "IT Support Spec",
    "Technical Support",
    "Tech Consultant",
    "Data Analyst",
    "UX/UI Designer",
    "QA Spec",
    "Technical Writer",
    "Project Coordinator"
  ];

  // Enhanced profile image component with better error handling
  const ProfileImageComponent = () => (
    <div className={styles.image}>
      <div className={`${styles.imageFrame} ${imageLoaded ? styles.loaded : ''}`}>
        {imageError ? (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            color: 'white',
            flexDirection: 'column',
            padding: '1rem'
          }}>
            <p>Image not found</p>
            <small style={{ fontSize: '0.7rem' }}>Looking for: {imageSrc}</small>
          </div>
        ) : (
          <img
            src={imageSrc}
            alt={name}
            className={styles.staticProfileImage}
            onLoad={() => {
              console.log("Image loaded successfully:", imageSrc);
              setImageLoaded(true);
            }}
            onError={() => {
              console.error("Image failed to load:", imageSrc);
              // Try alternative paths
              if (imageSrc === profileImage) {
                console.log("Trying photo 2 as fallback");
                setImageSrc("/photo 2.jpg"); // Try second photo
              } else if (imageSrc === "/photo 2.jpg") {
                console.log("Trying without leading slash");
                setImageSrc("photo 1.jpg");
              } else {
                console.log("All paths failed, showing error state");
                setImageError(true);
              }
            }}
          />
        )}
      </div>
    </div>
  );

  return (
    <section className={styles.heroSection}>
      <div className={styles.hero}>
        <div className={styles.heroBackground}></div>

        <div className={styles.content}>
          <div className={styles.text}>
            <h1 className={styles.title}>{name}</h1>

            <div className={styles.jobTitleWrapper}>
              <JobTitleAnimation
                jobTitles={jobTitles.length > 0 ? jobTitles : defaultJobTitles}
                deletingSpeed={40}
                pauseDuration={1500}
              />
            </div>

            {/* Mobile-only image that appears after the job title animation */}
            <div className={styles.mobileOnlyImage}>
              <ProfileImageComponent />
            </div>

            <p className={styles.description}>
              Helping businesses grow through strategic sales planning,
              innovative outreach methods, and exceptional customer relationship management.
              With a proven track record of exceeding sales targets and optimizing lead generation.
            </p>

            <div className={styles.cta}>
              <a
                href="/contact#top"
                onClick={(e) => handleNavigation(e, '/contact#top', { isContact: true })}
                className={styles.btnPrimary}
              >
                <FaEnvelope /> Contact Me
              </a>
              <a
                href="/images/school/Resume/Resume.pdf"
                download
                className={styles.btnSecondary}
                onClick={(e) => e.stopPropagation()}
              >
                <FaDownload /> Download Resume
              </a>

              {/* Combined social links and navigation button */}
              <div className={styles.buttonsContainer}>
                <div className={styles.socialLinks}>
                  <a
                    href="https://github.com/melloom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <FaGithub /> GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/melvin-peralta-de-la-cruz-077557215"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <FaLinkedin /> LinkedIn
                  </a>
                </div>

                <div className={styles.navigationButtons}>
                  <a
                    href="/resume#top"
                    onClick={(e) => handleNavigation(e, '/resume#top', { isResume: true })}
                    className={styles.navButton}
                  >
                    <FaFileAlt /> View Resume
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop-only image (hidden on mobile) */}
          <div className={styles.desktopOnlyImage}>
            <ProfileImageComponent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;