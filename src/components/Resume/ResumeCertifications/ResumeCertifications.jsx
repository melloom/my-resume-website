import React from 'react';
import { 
  FaCertificate, 
  FaCalendarAlt, 
  FaBuilding, 
  FaAward, 
  FaLaptopCode,
  FaUserGraduate,
  FaToolbox,
  FaCode,
  FaServer,
  FaShieldAlt,
  FaDatabase,
  FaChartLine,
  FaDesktop
} from 'react-icons/fa';
import styles from './ResumeCertifications.module.css';

const ResumeCertifications = () => {
  // Enhanced certification data with a mix of difficulty levels and updated dates
  const allCertifications = [
    {
      id: 'comp-tia',
      title: 'CompTIA A+ Certification',
      issuer: 'CompTIA',
      status: 'In Progress',
      targetDate: 'Expected August 2025',
      description: 'Industry-standard certification validating comprehensive understanding of IT technical support, hardware, software troubleshooting, and networking fundamentals.',
      skills: ['Hardware', 'Troubleshooting', 'Operating Systems', 'Network Configuration', 'Security'],
      icon: <FaLaptopCode />,
      color: '#00A94F',
      planned: false
    },
    {
      id: 'google-it',
      title: 'Google IT Support Professional',
      issuer: 'Google via Coursera',
      status: 'In Progress',
      targetDate: 'Expected June 2025',
      description: 'Comprehensive program covering IT support, system administration, operating systems, networking, and security - designed by Google to prepare for entry-level IT roles.',
      skills: ['IT Support', 'System Administration', 'Networking', 'Troubleshooting', 'Cloud Computing'],
      icon: <FaDesktop />,
      color: '#4285F4',
      planned: false
    },
    {
      id: 'aws-cloud',
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      status: 'Planned',
      targetDate: 'Q4 2025',
      description: 'Entry-level certification demonstrating understanding of AWS Cloud services, architecture, security, and billing - perfect for technical and non-technical roles.',
      skills: ['Cloud Computing', 'AWS Services', 'Cloud Architecture', 'Security Basics', 'Cost Management'],
      icon: <FaServer />,
      color: '#FF9900',
      planned: true
    },
    {
      id: 'meta-frontend',
      title: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Meta via Coursera',
      status: 'In Progress',
      targetDate: 'Expected July 2025',
      description: 'Comprehensive front-end development program created by Meta engineers covering React, JavaScript, HTML/CSS, and modern UI development practices.',
      skills: ['React', 'JavaScript', 'HTML/CSS', 'UI/UX Principles', 'Web Development'],
      icon: <FaCode />,
      color: '#1877F2',
      planned: false
    },
    {
      id: 'microsoft-azure',
      title: 'Microsoft Azure Fundamentals (AZ-900)',
      issuer: 'Microsoft',
      status: 'Planned',
      targetDate: 'Q1 2026',
      description: 'Entry-level certification covering Azure cloud concepts, core services, security, privacy, compliance, pricing and support.',
      skills: ['Cloud Computing', 'Azure Services', 'Security Compliance', 'Azure Management', 'Cost Models'],
      icon: <FaShieldAlt />,
      color: '#0078D4',
      planned: true
    },
    {
      id: 'salesforce-admin',
      title: 'Salesforce Certified Administrator',
      issuer: 'Salesforce',
      status: 'Planned',
      targetDate: 'Q3 2025',
      description: 'Demonstrates expertise in administering and configuring Salesforce, managing users, data, and security while deploying apps from AppExchange.',
      skills: ['CRM Administration', 'User Management', 'Security Controls', 'Data Management', 'Reports & Dashboards'],
      icon: <FaDatabase />,
      color: '#00A1E0',
      planned: true
    },
    {
      id: 'sales-cert',
      title: 'Certified Sales Professional (CSP)',
      issuer: 'National Association of Sales Professionals',
      status: 'In Progress',
      targetDate: 'Expected May 2025',
      description: 'Professional certification focused on advanced sales techniques, ethical sales practices, and consultative selling approaches.',
      skills: ['Sales Strategy', 'Client Relationship Management', 'Consultative Selling', 'Negotiation', 'Business Development'],
      icon: <FaUserGraduate />,
      color: '#3666B0',
      planned: false
    },
    {
      id: 'google-analytics',
      title: 'Google Analytics Certification',
      issuer: 'Google',
      status: 'Completed',
      targetDate: 'February 2025',
      description: 'Industry-recognized credential validating proficiency in digital analytics, web traffic data interpretation, and actionable business insights.',
      skills: ['Data Analysis', 'Web Analytics', 'User Behavior Tracking', 'Conversion Optimization', 'Reporting'],
      icon: <FaChartLine />,
      color: '#F4B400',
      planned: false
    }
  ];
  
  // Filter certifications to show only non-planned ones in the cards section
  const certifications = allCertifications.filter(cert => !cert.planned);
  
  // Get planned certifications for tech learning focus section
  const plannedCertifications = allCertifications.filter(cert => cert.planned);
  
  return (
    <section className={styles.certificationsSection}>
      <h2 className={styles.sectionTitle}>
        <span className={styles.titleIcon}><FaCertificate /></span>
        Certifications & Professional Development
      </h2>
      
      <div className={styles.certificationCards}>
        {certifications.map((cert) => (
          <div 
            key={cert.id} 
            className={styles.certCard}
            style={{ borderColor: cert.color || 'var(--primary-color, #6366f1)' }}
          >
            <div 
              className={styles.cardHeader}
              style={{ background: cert.color || 'var(--primary-color, #6366f1)' }}
            >
              <div className={styles.cardIcon}>
                {cert.icon || <FaAward />}
              </div>
              <div className={styles.statusBadge}>{cert.status}</div>
            </div>
            
            <div className={styles.cardContent}>
              <h3 className={styles.certTitle}>{cert.title}</h3>
              
              <div className={styles.certMeta}>
                <div className={styles.metaItem}>
                  <FaBuilding className={styles.metaIcon} style={{ color: cert.color }} />
                  <span>{cert.issuer}</span>
                </div>
                <div className={styles.metaItem}>
                  <FaCalendarAlt className={styles.metaIcon} style={{ color: cert.color }} />
                  <span>{cert.targetDate}</span>
                </div>
              </div>
              
              <div className={styles.certDescription}>
                <p>{cert.description}</p>
              </div>
              
              {cert.skills && (
                <div className={styles.skillsGrid}>
                  {cert.skills.map((skill, i) => (
                    <div 
                      key={i} 
                      className={styles.skillTag}
                      style={{
                        background: `rgba(${hexToRgb(cert.color || '#6366f1')}, 0.1)`,
                        color: cert.color || 'var(--primary-color, #6366f1)'
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Professional Development Section - Updated with more tech focus and planned certifications */}
      <div className={styles.profDevSection}>
        <h3 className={styles.profDevTitle}>Current Tech Learning Focus</h3>
        <p className={styles.profDevIntro}>
          I'm actively expanding my technical skillset through these focused learning paths:
        </p>
        
        <div className={styles.learningPathsGrid}>
          <div className={styles.learningPath}>
            <div className={styles.pathIcon} style={{ background: '#61DAFB' }}>
              <FaCode />
            </div>
            <div className={styles.pathContent}>
              <h4 className={styles.pathTitle}>React & Modern JavaScript</h4>
              <p className={styles.pathDesc}>
                Building interactive web applications using React, state management with Redux, and modern JavaScript ES6+ features.
              </p>
            </div>
          </div>
          
          <div className={styles.learningPath}>
            <div className={styles.pathIcon} style={{ background: '#F1502F' }}>
              <FaServer />
            </div>
            <div className={styles.pathContent}>
              <h4 className={styles.pathTitle}>Full-Stack Development</h4>
              <p className={styles.pathDesc}>
                Developing end-to-end applications using the MERN stack (MongoDB, Express, React, Node.js) with REST APIs and database integration.
              </p>
            </div>
          </div>

          <div className={styles.learningPath}>
            <div className={styles.pathIcon} style={{ background: '#00AADA' }}>
              <FaDatabase />
            </div>
            <div className={styles.pathContent}>
              <h4 className={styles.pathTitle}>Cloud & DevOps</h4>
              <p className={styles.pathDesc}>
                Implementing CI/CD pipelines, containerization with Docker, and cloud deployment on AWS and Microsoft Azure.
              </p>
            </div>
          </div>
          
          <div className={styles.learningPath}>
            <div className={styles.pathIcon} style={{ background: '#9333ea' }}>
              <FaChartLine />
            </div>
            <div className={styles.pathContent}>
              <h4 className={styles.pathTitle}>Sales Technology Integration</h4>
              <p className={styles.pathDesc}>
                Combining sales expertise with technical solutions, focusing on CRM customization, workflow automation, and sales analytics tools.
              </p>
            </div>
          </div>
        </div>
        
        {/* Planned Certifications Section */}
        <div className={styles.plannedCertsSection}>
          <h4 className={styles.plannedCertsTitle}>Certifications in My Learning Plan</h4>
          <div className={styles.plannedCertsGrid}>
            {plannedCertifications.map((cert) => (
              <div 
                key={cert.id} 
                className={styles.plannedCertCard}
                style={{ borderColor: cert.color || 'var(--primary-color, #6366f1)' }}
              >
                <div className={styles.plannedCertIcon} style={{ color: cert.color }}>
                  {cert.icon || <FaAward />}
                </div>
                <div className={styles.plannedCertContent}>
                  <h5 className={styles.plannedCertTitle} style={{ color: cert.color }}>
                    {cert.title}
                  </h5>
                  <div className={styles.plannedCertInfo}>
                    <span className={styles.plannedCertIssuer}>{cert.issuer}</span>
                    <span className={styles.plannedCertDate}>
                      <FaCalendarAlt /> {cert.targetDate}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper function to convert hex to RGB for styling
const hexToRgb = (hex) => {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
};

export default ResumeCertifications;
