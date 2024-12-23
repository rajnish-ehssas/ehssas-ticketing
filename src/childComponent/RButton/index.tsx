"use client"
import clsx from "clsx";
import styles from "./RButton.module.css";

interface RButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    title?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    buttonText?: string;
    children?: React.ReactNode;
    variant?: "text" | "outlined" | "contained";
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

const RButton: React.FC<RButtonProps> = ({
    className,
    disabled = false,
    type = "button",
    title,
    onClick,
    buttonText,
    children,
    variant = "contained",
    startIcon,
    endIcon,
    ...rest
}) => {
    return (
        <>
            <button
                className={clsx(
                    styles.button,
                    className,
                    styles[variant],
                    { [styles.buttonDisabled]: disabled }
                )}
                aria-disabled={disabled}
                disabled={disabled}
                type={type}
                title={title}
                onClick={onClick}
                {...rest}
            >
                <div className={styles.buttonText}>
                    {startIcon}&nbsp;{buttonText || children}&nbsp;{endIcon}
                </div>
            </button>
        </>

    );
};
export default RButton;
