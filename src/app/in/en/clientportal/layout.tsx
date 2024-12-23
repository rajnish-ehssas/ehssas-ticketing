"use client";
import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={styles.portalContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Client Portal</h3>
        <ul className={styles.navList}>
          <li>
            <Link href="/in/en/clientportal/profile" className={styles.navLink}>
              Profile
            </Link>
          </li>
          <li>
            <Link href="/in/en/clientportal/products" className={styles.navLink}>
              Products
            </Link>
          </li>
          <li>
            <Link href="/in/en/clientportal/services" className={styles.navLink}>
              Services
            </Link>
          </li>
          <li>
            <Link href="/in/en/clientportal/billing" className={styles.navLink}>
              Billing
            </Link>
          </li>
          <li>
            <Link href="/in/en/clientportal/help" className={styles.navLink}>
              Help
            </Link>
          </li>
        </ul>
      </aside>

      {/* Content */}
      <div className={styles.content}>{children}</div>
    </section>
  );
}
