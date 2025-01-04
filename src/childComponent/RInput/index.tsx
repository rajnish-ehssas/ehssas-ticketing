// "use client";

// import React from "react";
// import clsx from "clsx";
// import styles from "./RInput.module.css";

// interface RInputProps {
//   className?: string;
//   disabled?: boolean;
//   required?: boolean;
//   placeholder?: string;
//   type?: string;
//   value?: string | number;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   error?: boolean;
//   helperText?: string;
//   variant?: "outlined" | "filled" | "standard";
//   size?: "small" | "medium" | "large";
// }

// const RInput: React.FC<RInputProps> = ({
//   className,
//   disabled,
//   required,
//   placeholder,
//   type = "text",
//   value,
//   onChange,
//   error = false,
//   helperText,
//   variant = "outlined",
//   size = "medium",
// }) => {
//   return (
//     <div className={clsx(styles.container, className)}>
//       <input
//         className={clsx(
//           styles.input,
//           styles[variant],
//           styles[size],
//           { [styles.error]: error },
//           { [styles.disabled]: disabled }
//         )}
//         type={type}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         disabled={disabled}
//         required={required}
//       />
//       {helperText && (
//         <span
//           className={clsx(styles.helperText, { [styles.errorText]: error })}
//         >
//           {helperText}
//         </span>
//       )}
//     </div>
//   );
// };

// export default RInput;




// "use client";
// import React from "react";
// import clsx from "clsx";
// import styles from "./RInput.module.css";

// interface RInputProps  {
//   className?: string;
//   error?: boolean;
//   helperText?: string;
//   disabled?: boolean;
//   variant?: "outlined" | "filled" | "standard";
//   size?: "small" | "medium" | "large";
// }

// const RInput: React.FC<RInputProps> = ({
//   className,
//   error = false,
//   helperText,
//   variant = "outlined",
//   size = "medium",
//   disabled,
//   ...rest // Collect remaining props
// }) => {
//   return (
//     <div className={clsx(styles.container, className)}>
//       <input
//         className={clsx(
//           styles.input,
//           styles[variant],
//           styles[size],
//           { [styles.error]: error },
//           { [styles.disabled]: disabled }
//         )}
//         {...rest} // Spread the rest of the props into the input
//       />
//       {helperText && (
//         <span
//           className={clsx(styles.helperText, { [styles.errorText]: error })}
//         >
//           {helperText}
//         </span>
//       )}
//     </div>
//   );
// };

// export default RInput;




"use client";

import React from "react";
import clsx from "clsx";
import styles from "./RInput.module.css";
interface RInputProps {
  className?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  variant?: "outlined" | "filled" | "standard";
  size?: "small" | "medium" | "large";
  name?: string;
  id?: string;
}

const RInput: React.FC<RInputProps> = ({
  className,
  disabled,
  required,
  placeholder,
  type = "text",
  value,
  onChange,
  error = false,
  helperText,
  variant = "outlined",
  size = "medium",
  name,
  id,
}) => {
  return (
    <div className={clsx(styles.container)}>
      <input
        className={clsx(
          styles.input,
          styles[variant],
          styles[size],
          { [styles.error]: error },
          { [styles.disabled]: disabled },
          className
        )}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        name={name}
        id={id}
      />
      {helperText && (
        <span
          className={clsx(styles.helperText, { [styles.errorText]: error })}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default RInput;
