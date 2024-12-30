"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { IClient } from "@/mongodb/schemas/ClientSchema";

const Profile: React.FC = () => {
    const [profilePic, setProfilePic] = useState<string>("/bijan.jpg");
    const [user, setUser] = useState<IClient | null>(null);
    const [loading, setLoading] = useState(true);


    const handleProfilePicChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch("/api/upload-profile-pic", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfilePic(data.filePath);
                } else {
                    console.error("Failed to upload profile picture");
                }
            } catch (error) {
                console.error("Error uploading profile picture:", error);
            }
        }
    };
    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = localStorage.getItem("userData");

            if (storedUser) {
                const parsedUser: IClient = JSON.parse(storedUser);
                setUser(parsedUser);

                setLoading(false);
            } else {
                try {
                    const response = await fetch("/api/v1/client");
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data: IClient = await response.json();
                    localStorage.setItem("userData", JSON.stringify(data));
                    setUser(data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUser();
    }, []);


    if (loading) return <p>Loading...</p>;
    return (
        <div className={styles.profileContainer}>
            <header className={styles.header}>
                <div className={styles.profileInfo}>
                    <div
                        className={styles.imageWrapper}
                        onClick={() => document.getElementById("fileInput")?.click()}
                    >
                        <Image
                            src={profilePic}
                            alt="Profile"
                            className={styles.profilePic}
                            width={100}
                            height={100}
                        />
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePicChange}
                            className={styles.fileInput}
                            style={{ display: "none" }}
                        />
                    </div>
                    <div>
                        {/* <p className={styles.name}>{user?.name || "Guest"}</p> */}
                        <p className={styles.email}>{user?.email || "No email provided"}</p>
                        <p className={styles.subtitle}>{user?.companyName || "No company name provided"}</p>
                    </div>
                </div>
                <button className={styles.editBtn}>Edit Profile</button>
            </header>
            <main className={styles.mainContent}>
                <section className={styles.section}>
                    <h2>Account Details</h2>
                    <div className={styles.details}>
                        {/* <p><strong>Username:</strong> {user?.name || "Guest"}</p> */}
                        {/* <p><strong>Member Since:</strong> {user?.createdAt || "Unknown"}</p> */}
                        <p><strong>Status:</strong> {user?.roles?.join(", ") || "No roles assigned"}</p>
                    </div>
                </section>
                {/* <section className={styles.section}>
                    <h2>Recent Activities</h2>
                    <ul className={styles.activities}>
                        {user?.recentActivities?.length ? (
                            user.recentActivities.map((activity, index) => (
                                <li key={index}>{activity}</li>
                            ))
                        ) : (
                            <li>No recent activities found</li>
                        )}
                    </ul>
                </section> */}
            </main>
        </div>
    );
};

export default Profile;



