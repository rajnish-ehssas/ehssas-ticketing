'use client'
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaPhoneAlt } from "react-icons/fa"; // Import icons
import styles from "./Header.module.css";
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/navigation'


interface IUseData {
    isAuthenticated: string
}
const Header: React.FC = () => {
    const router = useRouter();

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
    // State for managing login status
    // const [userDetails, setUserDetails] = useState<UserData | null>(JSON.parse(localStorage.getItem("userData") as string));
    // const userDetails = JSON.parse(localStorage.getItem("userData") as string)
    // console.log('userDetails', userDetails);
    const [userDetails, setUserDetails] = useState<IUseData | null>(null);

    useEffect(() => {
        // Get data from localStorage
        const storedValue = JSON.parse(localStorage.getItem("userData") as string)
        if (storedValue) {
            setUserDetails(storedValue);
        }
    }, []);

    const logouthandle = async () => {
        try {
            await fetch('/api/v1/users/logout', { method: 'POST' });
            localStorage.removeItem("userData");
            router.refresh();
            router.replace('/in/en/login');
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

    return (
        <div className={styles.hdrContainer} ref={headerRef}>
            <div className={styles.hdrLogo}>
                {/* Logo redirects to home page */}
                <Link href="/">
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
                {userDetails?.isAuthenticated ?
                    <div onClick={logouthandle} className={styles.hdrNavLink} >
                        Logout
                    </div>
                    :
                    <Link href="/in/en/login" className={styles.hdrNavLink} >
                        Login
                    </Link>
                }
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
