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
        title: 'My Resume Website',
        description: 'A modern, responsive personal website built with React and Vite. Features smooth animations, dark/light mode, and PWA support.',
        image: '',
        technologies: ['React', 'Vite', 'CSS', 'Netlify'],
        link: 'https://melvinperalta.netlify.app',
        github: 'https://github.com/melloom/my-resume-website'
      },
      {
        id: 2,
        title: 'Sales Dashboard',
        description: 'A comprehensive sales analytics dashboard with real-time data visualization and performance metrics.',
        image: '',
        technologies: ['React', 'Chart.js', 'Firebase', 'Material-UI'],
        link: 'https://sales-dashboard-demo.netlify.app',
        github: 'https://github.com/melloom/sales-dashboard'
      },
      {
        id: 3,
        title: 'Task Manager',
        description: 'A feature-rich task management application with drag-and-drop functionality and team collaboration features.',
        image: '',
        technologies: ['React', 'Redux', 'Node.js', 'MongoDB'],
        link: 'https://task-manager-demo.netlify.app',
        github: 'https://github.com/melloom/task-manager'
      },
      {
        id: 4,
        title: 'MelHub Social Links',
        description: 'A centralized hub for all my social media and professional links. Features a clean, minimalist design with customizable themes and analytics.',
        image: '',
        technologies: ['React', 'Vite', 'CSS', 'Netlify'],
        link: 'https://melhub.netlify.app',
        github: 'https://github.com/melloom/melhub'
      }
    ];

    setProjects(initialProjects);

    // Function to generate screenshot URL
    const generateScreenshotUrl = (url) => {
      return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&waitUntil=networkidle0&timeout=30000&viewport.width=1280&viewport.height=800&viewport.deviceScaleFactor=1&screenshot.type=jpeg&screenshot.quality=80&apiKey=YOUR_MICROLINK_API_KEY`;
    };

    // Function to load screenshot with retry mechanism
    const loadScreenshot = async (project, retryCount = 0) => {
      try {
        // First try to get from cache
        const cachedImage = localStorage.getItem(`screenshot_${project.id}`);
        if (cachedImage) {
          return {
            ...project,
            image: cachedImage
          };
        }

        const screenshotUrl = generateScreenshotUrl(project.link);
        const response = await fetch(screenshotUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.status === 'success' && data.data.screenshot.url) {
          // Cache the successful screenshot
          localStorage.setItem(`screenshot_${project.id}`, data.data.screenshot.url);
          return {
            ...project,
            image: data.data.screenshot.url
          };
        }
        
        throw new Error('Invalid response format');
      } catch (error) {
        console.error(`Error generating screenshot for ${project.title}:`, error);
        
        // Retry up to 2 times with exponential backoff
        if (retryCount < 2) {
          const delay = Math.pow(2, retryCount) * 2000; // 2s, 4s
          await new Promise(resolve => setTimeout(resolve, delay));
          return loadScreenshot(project, retryCount + 1);
        }
        
        // If all retries fail, try to use a fallback image
        const fallbackImage = `https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url&waitUntil=load&timeout=10000&viewport.width=1280&viewport.height=800&viewport.deviceScaleFactor=1&screenshot.type=jpeg&screenshot.quality=80&apiKey=YOUR_MICROLINK_API_KEY`;
        
        return {
          ...project,
          image: fallbackImage
        };
      }
    };

    // Update projects with screenshots
    const updateProjectsWithScreenshots = async () => {
      try {
        const updatedProjects = await Promise.all(
          initialProjects.map(project => loadScreenshot(project))
        );
        setProjects(updatedProjects);
      } catch (error) {
        console.error('Error updating projects with screenshots:', error);
        // Fallback to cached screenshots if available
        const projectsWithCache = initialProjects.map(project => ({
          ...project,
          image: localStorage.getItem(`screenshot_${project.id}`) || ''
        }));
        setProjects(projectsWithCache);
      } finally {
        setIsLoading(false);
      }
    };

    // Start the screenshot generation process
    updateProjectsWithScreenshots();
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