// "use client"
// import React from "react";
// import styles from "./page.module.css";

// const Services: React.FC = () => {
//   const services = [
//     { key: "web", label: "Web Development", description: "Details about Web Development..." },
//     { key: "software", label: "Software Development", description: "Details about Software Development..." },
//     { key: "mobile", label: "Mobile App Development", description: "Details about Mobile App Development..." },
//     { key: "cloud", label: "Cloud Computing Services", description: "Details about Cloud Computing Services..." },
//     { key: "consulting", label: "IT Consulting & Digitization", description: "Details about IT Consulting & Digitization..." },
//     { key: "uiux", label: "UI/UX Design", description: "Details about UI/UX Design..." },
//     { key: "gis", label: "GIS Consulting", description: "Details about GIS Consulting..." },
//   ];

//   return (
//     <div className={styles.servicesContainer}>
//       <div className={styles.servicesContent}>
//         <div className={styles.servicesContentHeader}>Our Services</div>
//         <div className={styles.servicesContentBody}>
//           We offer a comprehensive suite of IT services tailored to meet the
//           diverse needs of our clients nationwide. Our expertise spans across
//           designing and developing intuitive digital solutions, ensuring
//           seamless user experiences, harnessing the power of cloud computing,
//           and providing strategic consulting for digital transformation.
//         </div>
//       </div>
//       <div className={styles.servicesChart}>
//         <svg width="100%" height="100%" viewBox="0 0 600 400">
//           {/* Central "Services" label with rounded background */}
//           <rect x="20" y="160" width="100" height="30" rx="15" ry="15" fill="#4A90E2" />
//           <text x="70" y="180" textAnchor="middle" fill="#fff" fontSize="14">Services</text>

//           {/* Lines and service nodes */}
//           {services.map((service, index) => {
//             const y = 50 + index * 50; // Y-position for each service node
//             const controlY = 175 + (y - 175) / 2; // Control point for curve
//             return (
//               <g key={service.key} style={{ cursor: "pointer" }}>
//                 {/* Branching line from central point to each service node */}
//                 <path
//                   d={`M120,175 Q150,${controlY} 200,${y}`}
//                   fill="none"
//                   stroke="#003366"
//                   strokeWidth="1.5"
//                   strokeDasharray="5,5"
//                 />
//                 {/* Service node circle */}
//                 <circle cx="200" cy={y} r="5" fill="#003366" />
//                 {/* Service label */}
//                 <text x="220" y={y + 5} fill="#4A90E2" fontSize="14">{service.label}</text>
//               </g>
//             );
//           })}
//         </svg>
//       </div>
//     </div>
//   );
// };

// export default Services;



// "use client";
// import React from "react";
// import styles from "./page.module.css";

// interface Service {
//   key: string;
//   label: string;
//   description: string;
// }

// const Services: React.FC = () => {
//   const services: Service[] = [
//     { key: "web", label: "Web Development", description: "Details about Web Development..." },
//     { key: "software", label: "Software Development", description: "Details about Software Development..." },
//     { key: "mobile", label: "Mobile App Development", description: "Details about Mobile App Development..." },
//     { key: "cloud", label: "Cloud Computing Services", description: "Details about Cloud Computing Services..." },
//     { key: "consulting", label: "IT Consulting & Digitization", description: "Details about IT Consulting & Digitization..." },
//     { key: "uiux", label: "UI/UX Design", description: "Details about UI/UX Design..." },
//     { key: "gis", label: "GIS Consulting", description: "Details about GIS Consulting..." },
//   ];

//   return (
//     <div className={styles.servicesContainer}>
//       <div className={styles.servicesContent}>
//         <h1 className={styles.servicesContentHeader}>OUR SERVICES</h1>
//         <p className={styles.servicesContentBody}>
//           We offer a comprehensive suite of IT services tailored to meet the diverse needs of our clients nationwide.
//           Our expertise spans across designing and developing intuitive digital solutions, ensuring seamless user
//           experiences, harnessing the power of cloud computing, and providing strategic consulting for digital
//           transformation.with a focus innvocation and effieciency. we empower businesses to thrive in today's dynamic landscape through our specialzed offerings.
//         </p>
//       </div>
//       <div className={styles.servicesChart}>
//         <svg width="100%" height="100%" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
//           <rect x="20" y="170" width="120" height="40" rx="20" ry="20" fill="#4A90E2" />
//           <text x="80" y="195" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">Services</text>

//           {services.map((service, index) => {
//             const y = 50 + index * 50; // Y-position for each node
//             const controlY = 190 + (y - 190) / 2;
//             return (
//               <g key={service.key} className={styles.serviceNode} style={{ cursor: "pointer" }}>
//                 <path
//                   d={`M140,190 Q170,${controlY} 250,${y}`}
//                   fill="none"
//                   stroke="#007ACC"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   className={styles.path}
//                 />
//                 <circle cx="250" cy={y} r="6" fill="#007ACC" />
//                 <text
//                   x="270"
//                   y={y + 5}
//                   fill="#003366"
//                   fontSize="14"
//                   fontWeight="500"
//                   className={styles.serviceLabel}
//                 >
//                   {service.label}
//                 </text>
//               </g>
//             );
//           })}
//         </svg>
//       </div>
//     </div>
//   );
// };
// export default Services;

'use client';
import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const services = [
  { title: 'Web Development', description: 'Explore our web development solutions to elevate your business.' },
  { title: 'Software Development', description: 'Explore our software development solutions to elevate your business.' },
  { title: 'Mobile App Development', description: 'Explore our mobile app development solutions to elevate your business.' },
  { title: 'Cloud Computing Services', description: 'Explore our cloud computing services solutions to elevate your business.' },
  { title: 'IT Consulting & Digitization', description: 'Explore our IT consulting & digitization solutions to elevate your business.' },
  { title: 'UI/UX Design', description: 'Explore our UI/UX design solutions to elevate your business.' },
  { title: 'GIS Consulting', description: 'Explore our GIS consulting solutions to elevate your business.' },
];

const ServicePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>OUR SERVICES</h1>
        {/* <p>We offer a comprehensive suite of IT services tailored to meet the diverse needs of our clients nationwide. Our expertise spans across designing and developing intuitive digital solutions, ensuring seamless user experiences, harnessing the power of cloud computing, and providing strategic consulting for digital transformation. With a focus on innovation and efficiency, we empower businesses to thrive in today's dynamic landscape through our specialized offerings.</p> */}
        <p>
          We offer a comprehensive suite of IT services tailored to meet the diverse needs of our clients nationwide. Our expertise spans across designing and developing intuitive digital solutions, ensuring seamless user experiences, harnessing the power of cloud computing, and providing strategic consulting for digital transformation. With a focus on innovation and efficiency, we empower businesses to thrive in today&rsquo;s dynamic landscape through our specialized offerings.
        </p>
      </header>
      <section className={styles.services}>
        {services.map((service, index) => (
          <div key={index} className={styles.serviceCard}>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <Link href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
            </Link>
          </div>
        ))}
      </section>
      <footer className={styles.footer}>
        <p>Contact us today to learn more about how we can help your business thrive.</p>
      </footer>
    </div>
  );
};
export default ServicePage;
