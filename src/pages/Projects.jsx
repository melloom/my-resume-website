import React from 'react';
import ProjectHero from '../components/projects/ProjectHero/ProjectHero';
import ProjectList from '../components/projects/ProjectList/ProjectList';
import styles from './Projects.module.css';

const Projects = () => {
  return (
    <div className={styles.projectsPage}>
      <ProjectHero />
      <ProjectList />
    </div>
  );
};

export default Projects; 