import { z } from "zod";

export const checkoutSchema = z.object({
	fullName: z.string().min(3, "Full name must be at least 3 characters").max(50, "Full name is too long"),

	phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number is too long"),

	governorate: z.string().min(1, "Please select your governorate"),

	city: z.string().min(2, "City or area is required"),

	streetAddress: z.string().min(5, "Please enter your detailed address"),

	paymentMethod: z.enum(["COD", "ONLINE"], {
		message: "Please select a payment method",
	}),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
