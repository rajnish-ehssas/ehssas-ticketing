"use client";
import React, { useState } from "react";
// import { useRouter } from 'next/navigation'
import styles from "./page.module.css";
import { UserData } from "@/lib/definitions";
import Link from "next/link";

const Login: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    // const router = useRouter(); // Initialize router
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const closeModal = () => setIsOpen(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("")
        setLoading(true)
        try {
            const res = await fetch('/api/v1/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
          
            if (!res.ok) {
                const errorData = await res.json();
                // console.log('Login error:', errorData);
                setLoading(false);
                setError(errorData?.error?.message || errorData?.error?.code || errorData?.error?.reason?.type || errorData?.message || (typeof errorData?.error === "string") ? errorData?.error : "API ERROR");
                // return;
            } else {
                const resData = await res.json();
                // console.log('resData:',resData.user);
                setLoading(false)
                setSuccess("Login Success")
                if (resData?.user?.roles?.includes('ADMIN')) {
                    const userData: UserData = { isAuthenticated: true, isAdmin: true, isClient: false, email: resData?.user?.email, userId: resData?.user?._id };
                    localStorage.setItem("userData", JSON.stringify(userData));
                    // console.log(' userData:', userData);
                    window.location.replace('/in/en/adminportal');
                } else if (resData?.user?.roles?.includes('CLIENT')) {
                    const userData: UserData = { isAuthenticated: true, isAdmin: false, isClient: true, email: resData?.user?.email, userId: resData?.user?._id };
                    localStorage.setItem("userData", JSON.stringify(userData));
                    window.location.replace('/in/en/clientportal');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            {isOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={closeModal}>
                            &times;
                        </button>
                        <h2>Login</h2>
                        <form className={styles.form} onSubmit={handleSubmit} >
                            {(error || success) && <p className={`${styles.loginMessage} ${error ? styles.error : styles.success}`}>{error || success}</p>}
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button disabled={loading} type="submit" className={styles.submitButton}>
                                {(loading) ? "Loading..." : "Login"}
                            </button>
                            <Link href="/in/en/forgot-password">Forgot Password</Link>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;

