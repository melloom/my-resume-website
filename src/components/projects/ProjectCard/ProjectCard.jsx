import React, { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode, FaStar, FaEye, FaCalendarAlt, FaTag } from 'react-icons/fa';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project, isLoading: parentLoading }) => {
  const { title, description, image, technologies, link, github } = project;
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Remove mock data for project stats
  const projectStats = {
    stars: 0,
    views: 0,
    lastUpdated: ''
  };

  useEffect(() => {
    if (image) {
      setIsLoading(true);
      setImageError(false);
    }
  }, [image]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const toggleDetails = (e) => {
    e.preventDefault();
    setShowDetails(!showDetails);
  };

  return (
    <div 
      className={`${styles.card} ${isHovered ? styles.cardHovered : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageContainer}>
        {!imageLoaded && (isLoading || parentLoading) && (
          <div className={styles.imageLoader}>
            <div className={styles.spinner}></div>
            <span className={styles.loadingText}>Loading project preview...</span>
          </div>
        )}
        {imageError ? (
          <div className={styles.fallbackImage}>
            <FaCode size={48} />
            <span>{title}</span>
          </div>
        ) : (
          image && (
            <img 
              src={image} 
              alt={title} 
              className={styles.image} 
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
              style={{ objectFit: 'contain' }}
            />
          )
        )}
        <div className={styles.imageOverlay}>
          <div className={styles.projectStats}>
            <div className={styles.stat}>
              <FaTag />
              <span>View Project</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.links}>
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`${styles.link} ${styles.demoLink}`}
              aria-label={`View live demo of ${title}`}
            >
              <FaExternalLinkAlt /> Demo
            </a>
            {github && (
              <a 
                href={github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.link} ${styles.githubLink}`}
                aria-label={`View source code of ${title}`}
              >
                <FaGithub /> Code
              </a>
            )}
          </div>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.technologies}>
          {technologies.map((tech, index) => (
            <span key={index} className={styles.tech}>
              <FaTag className={styles.techIcon} />
              {tech}
            </span>
          ))}
        </div>

        <button 
          className={styles.detailsButton}
          onClick={toggleDetails}
          aria-expanded={showDetails}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>

        {showDetails && (
          <div className={styles.details}>
            <div className={styles.detailSection}>
              <h4>Project Overview</h4>
              <p>{description}</p>
            </div>
            <div className={styles.detailSection}>
              <h4>Key Features</h4>
              <ul className={styles.featureList}>
                <li>Modern, responsive design</li>
                <li>Optimized for 4K displays</li>
                <li>Cross-browser compatibility</li>
                <li>Performance optimized</li>
              </ul>
            </div>
            <div className={styles.detailSection}>
              <h4>Technical Stack</h4>
              <div className={styles.techGrid}>
                {technologies.map((tech, index) => (
                  <div key={index} className={styles.techItem}>
                    <FaCode className={styles.techIcon} />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard; 