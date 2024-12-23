import React from "react";
import clsx from "clsx"; // Ensure `clsx` is installed and imported
import styles from "./RCard.module.css";
import Image from "next/image";

// Define the props for the RCard component
interface RCardProps {
    imageSrc: string; // Source for the image
    title: string; // Title of the card
    text: string; // Text content for the card
    imageAlt?: string; // Optional alt text for the image
    className?: string; // Optional additional className
}

const RCard: React.FC<RCardProps> = ({
    imageSrc,
    title,
    text,
    imageAlt = "Card Image",
    className,
}) => {
    return (
        <div className={clsx(styles.cardContainer, className)}>
            <div className={clsx(styles.flexRow, styles.flexRowMd)}>
                <div className={styles.imageContainer}>
                    <Image
                        className={styles.image}
                        src={imageSrc}
                        alt={imageAlt}
                    />
                </div>
                <div className={styles.content}>
                    <div className={styles.title}>{title}</div>
                    <p className={styles.text}>{text}</p>
                </div>
            </div>
        </div>
    );
};

export default RCard;
