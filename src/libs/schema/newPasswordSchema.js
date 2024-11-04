const { z } = require("zod");

const passwordRegex =
  /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Required" })
      .refine((val) => val.length >= 8 && passwordRegex.test(val), {
        message:
          "Password must be at least 8 characters and one special character",
      }),

    confirmPassword: z.string().min(1, { message: "Required" }).min(8, {
      message:
        "Password must be at least 8 characters and one special character",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });
