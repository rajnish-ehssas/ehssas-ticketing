import { z } from 'zod';
export const ticketSystemValidate = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email format" }),
    contactNumber: z
        .string()
        .regex(/^\d{10}$/, { message: "Contact number must be 10 digits long" }),
    helpTopic: z.string().min(1, { message: "Help topic is required" }),
    product: z.string().min(1, { message: "Product is required" }),
    domainName: z
        .string()
        .optional(),
    subject: z.string().min(1, { message: "Subject is required" }),
    message: z.string().min(10, { message: "Message must be at least 10 characters long" }),

    status: z.enum(["Open", "Close"], { message: "Status must be 'Open' or 'Close'" }),
});

// export type UserQueryValidation = z.infer<typeof ticketSystemValidate>;

// const validateUserQuery = (data: any) => {
//     try {
//         const validatedData = ticketSystemValidate.parse(data);
//         // console.log("Validated data:", validatedData);
//         return validatedData;
//     } catch (err) {
//         if (err instanceof z.ZodError) {
//             console.error("Validation errors:", err.errors);
//         }
//     }
// };
