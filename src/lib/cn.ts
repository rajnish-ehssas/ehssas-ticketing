type ClassValue = 
  | string 
  | number 
  | boolean 
  | null 
  | undefined 
  | { [key: string]: boolean | number | null | undefined } 
  | ClassValue[];

export default function cn(...inputs: ClassValue[]): string {
  const result: string[] = [];

  const processValue = (value: ClassValue): void => {
    if (typeof value === 'string' || (typeof value === 'number' && value !== 0)) {
      // Include strings and non-zero numbers
      result.push(String(value));
    } else if (Array.isArray(value)) {
      value.forEach(processValue); // Recursively process array elements
    } else if (typeof value === 'object' && value !== null) {
      for (const [key, isTruthy] of Object.entries(value)) {
        if (isTruthy || (typeof isTruthy === 'number' && isTruthy !== 0)) {
          // Include keys with truthy values or non-zero numbers
          result.push(key);
        }
      }
    }
    // Other falsy values (false, null, undefined, 0) are ignored
  };

  inputs.forEach(processValue);
  return result.join(' ');
}

