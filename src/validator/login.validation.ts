import { z } from "zod";

export const OrderSchema = z.object({
  firstName: z
    .string().min(4,"lastName must contain at least 4 characters")
    .refine((value) => !/\d+/g.test(value), "Invalid firstName"),
  lastName: z
    .string()
    .min(4, "lastName must contain at least 4 characters")
    .refine((value) => !/\d+/g.test(value), "Invalid lastName"),
  email: z
    .string()
    .refine(
      (value) => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value),
      "Invalid email"
    ),
  phoneNumber: z
    .string()
    .min(11, "phoneNumber must contain at least 11 characters")
    .refine((value) => /^(\+98|0)?9\d{9}$/.test(value), "Invalid phoneNumber"),
  address: z
    .string()
    .min(15, "address must contain at least 15 characters")
    .refine((value) => /[\w',-\\/.\s]/.test(value), "Invalid address"),
  fixedNumber: z
    .string()
    .min(10, "fixedNumber must contain at least 10 characters")
    .refine((value) => /^0\d{10}/.test(value), "Invalid fixedNumber"),
});
