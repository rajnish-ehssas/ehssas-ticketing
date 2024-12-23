"use client"
import RButton from "@/childComponent/RButton";
import clsx from "clsx";
import React, { useState } from "react";
import styles from "./page.module.css";

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        findUs: "",
        subject: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false); // State to manage submission

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true); // Set submitted state to true
    };

    return (
        <div className={styles.contactContainer}>
            <div className={styles.contactTitle}>Contact Us</div>
            {submitted ? ( // Display confirmation message if submitted
                <div className={styles.confirmationMessage}>
                    We have received your message and will get back shortly.
                </div>
            ) : (
                <div className={styles.contactContent}>
                    <div className={styles.formSection}>
                        <form className={styles.contactForm} onSubmit={handleSubmit}>
                            <div className={styles.contactFormToprows}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className={styles.formInput}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className={styles.formInput}
                                    />
                                </div>
                            </div>
                            <div className={styles.contactFormToprows}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={styles.formInput}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="findUs">How Did You Find Us?</label>
                                    <select
                                        id="findUs"
                                        name="findUs"
                                        value={formData.findUs}
                                        onChange={handleChange}
                                        className={styles.formInput}
                                    >
                                        <option value="">Select an option</option>
                                        <option value="Google">Google</option>
                                        <option value="Social Media">Social Media</option>
                                        <option value="Friend/Family">Friend/Family</option>
                                        <option value="Advertisement">Advertisement</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className={clsx(styles.formGroup, styles.subjectGroup)}>
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className={styles.formInput}

                                />
                            </div>
                            <div className={clsx(styles.formGroup, styles.messageGroup)}>
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className={clsx(styles.formInput, styles.messageInput)}
                                    rows={4}
                                ></textarea>
                            </div>
                            <RButton
                                type="submit"
                                buttonText='Send Message'
                                className={styles.submitButton}
                            /> 
                        </form>
                    </div>
                    <div className={styles.mapSection}>
                        <iframe
                            title="Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.5545008725873!2d77.28715341517061!3d28.540461564086208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2e9e0eab5b3%3A0x5d8c3c181e3e97b3!2sDLF%20Tower%20B%2C%20Jasola%20District%20Centre%2C%20New%20Delhi%2C%20Delhi%20-%20110025%2C%20India!5e0!3m2!1sen!2sus!4v1634128478765!5m2!1sen!2sus"
                            width="100%"
                            style={{ border: 0, borderRadius: "8px" }}
                            allowFullScreen={true}
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact;
