import React, { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project, isLoading: parentLoading }) => {
  const { title, description, image, technologies, link, github } = project;
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (image) {
      setIsLoading(true);
      setImageError(false);
      setImageLoaded(false);
    }
  }, [image]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageLoaded(true);
  };

  const handleImageError = () => {
    if (retryCount < 2) {
      // Retry loading the image after a delay
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setIsLoading(true);
      }, 2000);
    } else {
      setImageError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {!imageLoaded && (isLoading || parentLoading) && (
          <div className={styles.imageLoader}>
            <div className={styles.spinner}></div>
            <span className={styles.loadingText}>Loading screenshot...</span>
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
            />
          )
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.technologies}>
          {technologies.map((tech, index) => (
            <span key={index} className={styles.tech}>
              {tech}
            </span>
          ))}
        </div>
        <div className={styles.links}>
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${styles.link} ${styles.demoLink}`}
          >
            <FaExternalLinkAlt /> Live Demo
          </a>
          {github && (
            <a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`${styles.link} ${styles.githubLink}`}
            >
              <FaGithub /> View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 