"use client";
import React, { useActionState, useState } from "react";
// import { useRouter } from 'next/navigation'
import styles from "./page.module.css";
import { UserData } from "@/lib/definitions";
import Link from "next/link";
import { ActionResponse } from "@/types/address";
import { submitLogin } from "@/actions/address";
import { FaCheckCircle } from "react-icons/fa";
// import { redirect } from 'next/navigation';

const initialState: ActionResponse = {
    success: false,
    message: '',
}
const Login: React.FC = () => {
    const [state, action, isPending] = useActionState(submitLogin, initialState)
    const [isOpen, setIsOpen] = useState(true);
    const closeModal = () => setIsOpen(false);
    if (state.success) {
        const userData: UserData = { isAuthenticated: true };
        localStorage.setItem("userData", JSON.stringify(userData));
        window.location.replace('/in/en/clientportal')
    }
    return (
        <>
            {isOpen && (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                <button className={styles.closeButton} 
                onClick={closeModal}
                >
                        &times;
                    </button>
                    <h2>Login</h2>
                    <form className={styles.form} action={action} >
                        {/* {(error || success) && <p className={`${styles.loginMessage} ${error ? styles.error : styles.success}`}>{error || success}</p>} */}
                        {state?.message && (
                            <p className={state.success ? styles.loginMessage : styles.error}>
                                {state.success && <FaCheckCircle className={styles.loginMessage} />}
                                {state.message}
                            </p>
                        )}
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {state?.errors?.email && (
                                <p id="email-error" className={styles.errorText}>
                                    {state.errors.email[0]}
                                </p>
                            )}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {state?.errors?.password && (
                                <p id="password-error" className={styles.errorText}>
                                    {state.errors.password[0]}
                                </p>
                            )}
                        </div>
                        <button disabled={isPending} type="submit" className={styles.submitButton}>
                            {(isPending) ? "Loading..." : "Login"}
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

