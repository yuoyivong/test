const { z } = require("zod");

const passwordRegex =
  /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "This Field is Required" })
      .regex(passwordRegex, {
        message:
          "Password must be at least 8 characters and one special character",
      }),

    confirmPassword: z.string().min(1, { message: "This Field is Required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });
