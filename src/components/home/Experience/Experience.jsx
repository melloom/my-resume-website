import React, { useState, useCallback, useRef, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaBriefcase, FaBuilding, FaCalendarAlt, FaMapMarkerAlt, FaMedal
} from 'react-icons/fa';
import { experienceData } from '../../../data/experienceData';
import styles from './Experience.module.css';

// Lazy load the modal for better performance
const ExperienceModal = lazy(() => import('./ExperienceModal'));

const Experience = React.forwardRef((props, forwardedRef) => {
  // Animation control for scroll reveal
  const controls = useAnimation();
  const [inViewRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Combine refs
  const setRefs = useCallback(node => {
    // Set both refs
    if (forwardedRef) {
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else {
        forwardedRef.current = node;
      }
    }
    inViewRef(node);
  }, [forwardedRef, inViewRef]);

  // State management
  const [hoveredJob, setHoveredJob] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Collect all unique skills from experienceData
  const allSkills = Array.from(
    new Set(
      experienceData.flatMap(job => job.skills || [])
    )
  );

  // Check if on mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animation effect based on view
  useEffect(() => {
    if (inView) {
      controls.start(i => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: 0.1 + (i * 0.1)
        }
      }));
    }
  }, [controls, inView]);

  // Mouse event handlers
  const handleMouseEnter = useCallback((jobId) => {
    setHoveredJob(jobId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredJob(null);
  }, []);

  // Modal handling
  const openJobDetails = useCallback((jobId, e) => {
    if (e) e.stopPropagation();

    // Set job data
    setSelectedJob(jobId);

    // Save scroll position
    const scrollY = window.scrollY;
    setScrollPosition(scrollY);

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Show modal
    setShowModal(true);
  }, []);

  // Close modal function
  const closeJobDetails = useCallback(() => {
    // Hide modal first
    setShowModal(false);

    // Unlock scroll
    document.body.style.overflow = '';

    // Restore position after a small delay
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
      // Reset selected job
      setSelectedJob(null);
    }, 200);
  }, [scrollPosition]);

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showModal) {
        closeJobDetails();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal, closeJobDetails]);

  // Cleanup body styles on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Reset error state on mount
  useEffect(() => {
    setHasError(false);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  // Fix the syntax error in cardVariants - missing closing brace
  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: i => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: i * 0.08,
        mass: 1
      }
    }) // Fixed by adding proper closing braces
  };

  if (hasError) {
    return (
      <section ref={setRefs} className={styles.experience} id="experience">
        <div className="container">
          <h2 className={styles.sectionTitle}>Professional Experience</h2>
          <p>There was an error loading this section. Please refresh the page.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={setRefs}
      className={styles.experience}
      id="experience-section" // Changed ID to be more specific
    >
      <div className={styles.backgroundGradient}></div>
      <div className="container">
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className={styles.sectionTitle}>
            <span className={styles.titleIcon}><FaBriefcase /></span>
            Professional Experience
          </h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.sectionSubtitle}>
            My journey building exceptional client relationships and driving revenue growth
          </p>
        </motion.div>

        <motion.div
          className={styles.experienceGrid}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {experienceData.map((job, index) => (
            <motion.div
              key={job.id}
              custom={index}
              variants={cardVariants}
              className={`${styles.experienceCard} ${hoveredJob === job.id ? styles.hovered : ''}`}
              onMouseEnter={() => handleMouseEnter(job.id)}
              onMouseLeave={handleMouseLeave}
              style={{
                '--job-color': job.color
              }}
            >
              <div className={styles.cardContent}>
                {/* Creative Initial instead of icon or image */}
                <div className={styles.cardImageContainer} style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: `linear-gradient(135deg, ${job.color || '#6366f1'} 60%, #a855f7 100%)`
                }}>
                  <span className={styles.companyInitial}>
                    {job.id === 'long-home' ? 'LHP' :
                     job.id === 'baltimore-health' ? 'BCHD' :
                     job.id === 'aerotek' ? 'ATK' :
                     job.company?.trim()?.charAt(0) || '?'}
                  </span>
                  <span className={styles.companyNameOverlay}>{job.company}</span>
                </div>
                <div className={styles.cardScrollable}>
                  <div className={styles.jobHeader}>
                    <div className={styles.jobPeriod}>
                      <FaCalendarAlt className={styles.periodIcon} />
                      <span>{job.period}</span>
                    </div>
                    <h3 className={styles.jobTitle}>{job.title}</h3>
                    <div className={styles.companyInfo}>
                      <div className={styles.companyName}>
                        <FaBuilding className={styles.companyIcon} />
                        <span>{job.company}</span>
                      </div>
                      <div className={styles.jobLocation}>
                        <FaMapMarkerAlt className={styles.locationIcon} />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.jobDescription}>
                    <p>{job.description}</p>
                  </div>
                  <div className={styles.jobTags}>
                    {job.skills && job.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className={styles.jobTag}>{skill}</span>
                    ))}
                    {job.skills && job.skills.length > 3 && (
                      <span className={styles.moreTags}>+{job.skills.length - 3}</span>
                    )}
                  </div>
                  <div className={styles.cardFooter}>
                    <button
                      className={styles.detailsButton}
                      onClick={(e) => openJobDetails(job.id, e)}
                    >
                      View Full Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View Full Resume Button */}
        <div className={styles.viewResumeContainer}>
          <a href="/resume" className={styles.viewResumeButton}>
            View Full Job History
            <span className={styles.arrowIcon}>→</span>
          </a>
        </div>

        {/* Skills & Knowledge Section */}
        <div className={styles.skillsShowcase}>
          <h3 className={styles.showcaseTitle}>Skills & Knowledge</h3>
          <div className={styles.skillsGrid}>
            {allSkills.map((skill, idx) => (
              <div key={idx} className={styles.skillItem}>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Suspense fallback={
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#1e293b',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
          }}>
            Loading details...
          </div>
        </div>
      }>
        {showModal && selectedJob && (
          <ExperienceModal
            isOpen={showModal}
            onClose={closeJobDetails}
            experienceItem={experienceData.find(item => item.id === selectedJob)}
          />
        )}
      </Suspense>
    </section>
  );
});

Experience.displayName = 'Experience';

export default React.memo(Experience);