import React, { useState, useEffect } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import styles from './ProjectList.module.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialProjects = [
      {
        id: 1,
        title: 'Personal Portfolio',
        description: 'My personal portfolio website built with React, showcasing my skills, experience, and projects. Features a modern, responsive design with dark/light mode and smooth animations.',
        image: '/screenshots/resume page.png',
        technologies: ['React', 'Vite', 'CSS Modules', 'Netlify'],
        link: 'https://melvinworks.netlify.app',
        github: 'https://github.com/melloom/my-resume-website'
      },
      {
        id: 2,
        title: 'CloseLoop Training Platform',
        description: 'A comprehensive training platform for on-call phone backend and frontend support. Features include user authentication, training modules, and progress tracking.',
        image: '/screenshots/rebuttel page.png',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        link: 'https://closeloop.netlify.app',
        github: 'https://github.com/melloom/closeloop'
      },
      {
        id: 3,
        title: 'Lockora Password Generator',
        description: 'A secure password generator and manager application. Features include password strength analysis, secure storage, and easy password generation.',
        image: '/screenshots/password generator.png',
        technologies: ['React', 'JavaScript', 'CSS', 'LocalStorage'],
        link: 'https://lockora.netlify.app',
        github: 'https://github.com/melloom/lockora'
      },
      {
        id: 4,
        title: 'MelHub Social Links',
        description: 'A centralized hub for all my social media and professional links. Features a clean, minimalist design with customizable themes and analytics.',
        image: '/screenshots/melhub.png',
        technologies: ['React', 'Vite', 'CSS', 'Netlify'],
        link: 'https://melhub.netlify.app',
        github: 'https://github.com/melloom/melhub'
      },
      {
        id: 5,
        title: 'NumixPro Calculator',
        description: 'An advanced calculator application with comprehensive mathematical functions and operations. Features a modern interface, scientific calculations, memory functions, and history tracking for complex mathematical computations.',
        image: '/screenshots/numix.png',
        technologies: ['JavaScript', 'HTML5', 'CSS3', 'Netlify'],
        link: 'https://numixpro.netlify.app',
        github: 'https://github.com/melloom/Numix'
      }
    ];

    setProjects(initialProjects);
    setIsLoading(false);
  }, []);

  return (
    <section className={styles.projectList}>
      <div className={styles.container}>
        {projects.map(project => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            isLoading={isLoading}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectList; 