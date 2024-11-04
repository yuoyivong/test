const { z } = require("zod");

const nameRegex = /^[A-Za-z]+(\s?[A-Za-z]+)*$/;

const passwordRegex =
  /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

const today = new Date();

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .regex(nameRegex, { message: "Full name must contain only letters" }),

    dob: z
      .date()
      .max(today, { message: "Invalid date" })
      .refine((date) => date instanceof Date, {
        message: "Date of Birth is required",
      }),

    email: z.string().email({ message: "Invalid email" }),

    gender: z.string().min(1, { message: "Please choose gender" }),

    password: z
      .string()
      .min(1, { message: "Required" })
      .refine((val) => val.length >= 8 && passwordRegex.test(val), {
        message:
          "Password must be at least 8 characters and one special character",
      }),

    confirmPassword: z.string().min(1, { message: "Reguired" }).min(8, {
      message:
        "Password must be at least 8 characters and one special character",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });
