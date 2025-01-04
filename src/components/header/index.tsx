'use client'
import clsx from "clsx";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { FaBars, FaPhoneAlt } from "react-icons/fa"; // Import icons
import styles from "./Header.module.css";
import Link from 'next/link';
import Image from "next/image";
import { redirect, useRouter } from 'next/navigation'
import { authHandle } from "@/actions/authHandle";
import { ActionResponseAuth } from "@/types/address";

const initialState: ActionResponseAuth = {
    login: false,
    message: '',
}
const Header: React.FC = () => {
    const router = useRouter();
    const [state, action, isPanding] = useActionState(authHandle, initialState)
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setIsNavOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const logouthandle = async () => {
        try {
            await fetch('/api/v1/users/logout', { method: 'POST' });
            localStorage.removeItem("userData");
            router.replace('/in/en/login');
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };
    const [userData, setUserData] = useState<string | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem("userData")
        setUserData(userData || null)
    }, [userData, state, state?.login, state?.message, isPanding])

    return (
        <div className={styles.hdrContainer} ref={headerRef}>
            <div className={styles.hdrLogo}>
                <Link href="/" tabIndex={-1}>
                    <Image src='/edlogonormal.png' alt="Logo" className={styles.hdrLogoImg} width={100} height={100} />
                </Link>
            </div>
            <nav
                className={clsx(styles.hdrNavbar, isNavOpen && styles.hdrNavbarMobile)}
            >
                <Link href="/in/en/about" className={styles.hdrNavLink}>
                    About
                </Link>
                <Link href="/in/en/services" className={styles.hdrNavLink}>
                    Services
                </Link>
                <Link href="/in/en/products" className={styles.hdrNavLink}>
                    Products
                </Link>
                <Link href="/in/en/career" className={styles.hdrNavLink}>
                    Career
                </Link>
                <Link href="/in/en/contact" className={styles.hdrNavLink}>
                    Contact
                </Link>
                <form action={action}>
                    {userData ?
                        <button className={styles.hdrNavLinkLogout} onClick={logouthandle}>Logout</button>
                        :
                        <button className={styles.hdrNavLinkLogout} onClick={() => redirect('/in/en/login')} >
                            Login
                        </button>
                    }
                </form>
            </nav>

            {/* Icons for smaller screens */}
            <div className={styles.hdrIcons}>
                <div className={styles.hdrIcon} onClick={toggleNav}>
                    <FaBars />
                </div>
                <div className={styles.hdrContact}>
                    <Link href="tel:+919821993563" aria-label="Call us">
                        <FaPhoneAlt className={styles.hdrPhoneIcon} />
                    </Link>
                    <div className={styles.hdrPhoneText}>
                        <div>Call us on</div>
                        <div>+91 98219 93563</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
