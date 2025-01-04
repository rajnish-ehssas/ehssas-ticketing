import { z } from 'zod';
export const ticketSystemValidate = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
    contactEmail: z.string().email({ message: "Invalid email format" }),
    contactNumber: z.string().regex(/^\d{10}$/, { message: "Contact number must be 10 digits long" }),
    helpTopic: z.string().min(1, { message: "Help topic is required" }),
    chooseYourProduct: z.string().min(1, { message: "Product is required" }),
    domain: z.string().optional(),
    saasProductName: z.string().optional(),
    subject: z.string().min(1, { message: "Subject is required" }),
    messages: z.string().min(10, { message: "Message must be at least 10 characters long" }),
})
// .refine(data => {
//     if (data.chooseYourProduct === 'webApp' && !data.domain) {
//         return false;
//     }
//     if (data.chooseYourProduct === 'saasProduct' && !data.saasProductName) {
//         return false;
//     }
//     return true;
// }, {
//     message: "Domain is required if product is webApp, and saasProductName is required if product is saasProduct",
//     path: ["chooseYourProduct"], // This will show the error at the chooseYourProduct field
// });


export type UserQueryValidation = z.infer<typeof ticketSystemValidate>;




