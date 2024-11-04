const { z } = require("zod");

const passwordRegex =
  /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),

  password: z
    .string()
    .min(1, { message: "Required" })
    .refine((val) => val.length >= 8 && passwordRegex.test(val), {
      message:
        "Password must be at least 8 characters and one special character",
    }),
});
