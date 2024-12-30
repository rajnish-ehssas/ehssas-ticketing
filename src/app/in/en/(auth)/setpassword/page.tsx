'use client';
import React, { useState } from 'react';
import styles from './setPassword.module.css';
import { useSearchParams } from 'next/navigation';

const SetPassword: React.FC = () => {
    const searchParams = useSearchParams()
    const tempPassword = searchParams.get('tempPassword')
    const userId = searchParams.get('userId');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);
        try {
            if (password !== confirmPassword) {
                setErrorMessage('Passwords do not match!');
                return
            }
            const response = await fetch("/api/v1/users/setpassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password, tempPassword, userId }),
            });
            const data = await response.json();
            if (response.ok) {
                setErrorMessage(data.message);
            } else {
                setErrorMessage((typeof data?.error === 'string' && data?.error) || "Error. Please try again.");
            }
        } catch (error: unknown) {
            console.error(error)
            setErrorMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Set Password</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword" className={styles.label}>
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>
                {errorMessage && <div className={styles.error}>{errorMessage}</div>}
                <button type="submit" disabled={loading} className={styles.button}>
                    {loading ? "Loading..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default SetPassword;
