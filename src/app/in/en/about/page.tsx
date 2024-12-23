"use client";
import Image from "next/image";
import RModal from "@/childComponent/RModal";
import data from "@/constants/ConstantData";
import clsx from "clsx";
import React from "react";
import styles from "./page.module.css";
// import RButton from "@/childComponent/RButton";

interface DataItem {
    name: string;
    director: string;
    text: string;
    image: string;
}

const About: React.FC = () => {
    return (
        <div className={styles.aboutContainer}>
            <div className={clsx(styles.gridContainer, styles.gridContainerMd)}>
                <div>
                    <h3 className={styles.title}>About Us</h3>
                </div>

                <div className={styles.imageContainer}>
                    <Image
                        className={styles.responsiveImage}
                        src='/about.png'
                        alt="Responsive Image"
                        width={400}
                        height={200}
                    />
                </div>
                <div>
                    <p className={styles.textBlock}>
                        {/* About content here */}
                    </p>
                </div>
            </div>
            <div
                className={clsx(
                    styles.cardGrid,
                    styles.cardGridSm,
                    styles.cardGridMd
                )}
            >
                {data?.map((item: DataItem, index: number) => {
                    return (
                        <div className={styles.card} key={index}>
                            <Image src={item.image} className={styles.cardImage} alt={item.name} width={100} height={50} />
                            <h4 className={styles.cardName}>{item?.name}</h4>
                            <h2 className={styles.cardDirector}>{item?.director}</h2>
                            <div className={styles.modalButtonContainer}>
                                <RModal
                                    name={item?.name}
                                    image={item?.image}
                                    text={item.text}
                                />
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    );
};

export default About;




