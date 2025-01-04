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
      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Admin Portal</h3>
        <ul className={styles.navList}>
          <li>
            <Link href="/in/en/adminportal/addclient" className={styles.navLink}>
              Add/Edit Clients
            </Link>
          </li>
          {/* <li>
            <Link href="/in/en/adminportal/addProducts" className={styles.navLink}>
              Add/Edit Products
            </Link>
          </li>
          <li>
            <Link href="/in/en/adminportal/addservices" className={styles.navLink}>
              Add/Edit Services
            </Link>
          </li>
          <li>
            <Link href="/in/en/adminportal/billing" className={styles.navLink}>
              Billing
            </Link>
          </li> */}
          <li>
            <Link href="/in/en/adminportal/ticketmanager" className={styles.navLink}>
              Ticket Manager
            </Link>
          </li>
          {/* <li>
            <Link href="/in/en/adminportal/clientlist" className={styles.navLink}>
              Client List
            </Link>
          </li> */}
          <li>
            <Link href="/in/en/adminportal/managePayments" className={styles.navLink}>
              Manage Payments
            </Link>
          </li>
        </ul>
      </aside>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
