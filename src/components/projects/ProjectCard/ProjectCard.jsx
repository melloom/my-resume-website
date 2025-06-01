import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project }) => {
  const { title, description, image, technologies, link, github } = project;
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {imageError ? (
          <div className={styles.fallbackImage}>
            <FaCode size={48} />
            <span>{title}</span>
          </div>
        ) : (
          image && (
            <img 
              src={image} 
              alt={`${title} screenshot`}
              className={styles.image}
              onError={handleImageError}
              loading="lazy"
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