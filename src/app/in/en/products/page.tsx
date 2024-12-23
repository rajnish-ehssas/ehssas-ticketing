"use client";
import React from "react";
import styles from "./page.module.css";
import { FaGlobe, FaRecycle, FaExclamationTriangle, FaHotel, FaSchool } from "react-icons/fa";

const Product: React.FC = () => {
  const products = [
    {
      name: "GHG (Greenhouse Gas Management)",
      description:
        "Our GHG management tool allows corporations to track and manage greenhouse gas emissions across multiple locations, providing automated and detailed reporting for compliance and sustainability.",
      icon: <FaGlobe size={50} />,
    },
    {
      name: "BRSR (Business Responsibility & Sustainability Reporting)",
      description:
        "This platform enables businesses to assess, report, and improve their sustainability efforts by integrating various environmental, social, and governance (ESG) metrics into a comprehensive report.",
      icon: <FaRecycle size={50} />,
    },
    {
      name: "ERM (Enterprise Risk Management)",
      description:
        "Our ERM tool helps organizations to identify, assess, and mitigate risks, while ensuring that opportunities for growth and competitive advantage are fully utilized.",
      icon: <FaExclamationTriangle size={50} />,
    },
    {
      name: "HRMS (Human Resourse Management System)",
      description:
        "An HRMS, or human resources management system, is a suite of software applications used to manage human resources and related processes throughout the employee lifecycle.",
      icon: <FaHotel size={50} />,
    },
    {
      name: "SMS (School Management System)",
      description:
        "Our SMS simplifies school administration by offering features like attendance tracking, student performance monitoring, fee management, and parent-teacher communication in one easy-to-use platform.",
      icon: <FaSchool size={50} />,
    },
  ];
 
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Transform Your Business with Our Innovative Solutions</h1>
        <p className={styles.heroSubtitle}>
          Explore our suite of products designed to enhance sustainability, improve operations, and manage risks effectively.
        </p>
      </section>

      {/* Product Section */}
      <section className={styles.products}>
        <h2 className={styles.sectionTitle}>Our Products</h2>
        <div className={styles.productGrid}>
          {products.map((product, index) => (
            <div key={index} className={styles.productCard}>
              <div className={styles.productIcon}>{product.icon}</div>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDescription}>{product.description}</p>
            </div>
          ))}
        </div>
      </section>
    

      {/* Call to Action */}
      <section className={styles.callToAction}>
        <h2 className={styles.ctaTitle}>Get Started with Our Solutions Today!</h2>
        <p className={styles.ctaDescription}>
          Reach out to us now and let us help you achieve your business goals with tailored solutions for your specific needs.
        </p>
        <button className={styles.ctaButton}>Contact Us</button>
      </section>
    </div>
  );
};

export default Product;
