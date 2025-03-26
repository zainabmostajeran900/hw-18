import { z } from "zod";

export const OrderSchema = z.object({
  firstName: z
    .string()
    .min(4, "First name must contain at least 4 characters")
    .regex(/^[A-Za-z]+$/, "Invalid first name"),
  lastName: z
    .string()
    .min(4, "Last name must contain at least 4 characters")
    .regex(/^[A-Za-z]+$/, "Invalid last name"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(11, "Phone number must contain at least 11 characters")
    .regex(/^(\+98|0)?9\d{9}$/, "Invalid phone number"),
  address: z
    .string()
    .min(15, "Address must contain at least 15 characters")
    .regex(/[\w',-\\/.\s]+/, "Invalid address"),
  fixedNumber: z
    .string()
    .min(10, "Fixed number must contain at least 10 characters")
    .regex(/^0\d{10}$/, "Invalid fixed number"),
});
