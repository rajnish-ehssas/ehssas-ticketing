'use client';
import React, { useState } from 'react';
import styles from './changePassword.module.css';

const ChangePasswordForm: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChangePassword = () => {
        setError('');
        setSuccess('');       
        if (!password || !confirmPassword) {
            setError('Both fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setSuccess('Password changed successfully!');
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Change Password</h2>
            <div className={styles.inputGroup}>
                <label className={styles.label}>
                    New Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                </label>
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={styles.input}
                    />
                </label>
            </div>
            <button onClick={handleChangePassword} className={styles.button}>
                Change Password
            </button>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
        </div>
    );
};

export default ChangePasswordForm;
