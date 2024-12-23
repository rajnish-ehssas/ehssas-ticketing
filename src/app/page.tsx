'use client'
import styles from "./page.module.css";
import React from 'react';
// import heroImg from "@/public/heroImage.png";
import Image from "next/image";
// import vision from "@/public/vision.png";
// import mission from "@/public/mission.png";
// import values from "@/public/values.png";

const Home: React.FC = () => {
  return (
    <div className={styles.homeSection}>
      <div className={styles.homeHero}>
        <div className={styles.homeHeroContent}>
          <h1 className={styles.homeTitle}>When Code Meets Conservation</h1>
          <p className={styles.homeParagraph}>
            We are a team of developers and experts merging code with conservation, creating digital platforms to foster sustainable responsibility. Driven by our commitment to the environment, every line of code we write aspires towards a greener future.
          </p>
        </div>
        <div className={`${styles.homeImageContainer} ${styles.heroImage}`}>
          <Image src='/heroImage.png' alt="Hero" width={200} height={100} />
        </div>
      </div>

      <div className={styles.homeGrid}>
        <div className={styles.homeCard}>
          <Image className={styles.homeIcon} src='/vision.png' alt="Vision" width={100} height={50} />
          <h2 className={styles.homeCardTitle}>Our Vision</h2>
          <p className={styles.homeCardParagraph}>
            Envisioning a world where every organization, in any sector, adopts custom digital solutions to optimize processes, foster growth, and create a positive global impact.
          </p>
        </div>

        <div className={styles.homeCard}>
          <Image className={styles.homeIcon} src='/mission.png' alt="Mission" width={100} height={50} />
          <h2 className={styles.homeCardTitle}>Our Mission</h2>
          <p className={styles.homeCardParagraph}>
            Empowering businesses to streamline operations, grow sustainably, and make a meaningful impact worldwide, bridging ambition with technological advancement.
          </p>
        </div>

        <div className={styles.homeCard}>
          <Image className={styles.homeIcon} src='/values.png' alt="Values" width={100} height={50} />
          <h2 className={styles.homeCardTitle}>Our Values</h2>
          <p className={styles.homeCardParagraph}>
            Integrity, innovation, collaboration, and sustainability guide us. We prioritize ethical practices, foster creativity, encourage teamwork, and commit to a sustainable future.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Home;