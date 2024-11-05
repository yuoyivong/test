const { z } = require("zod");

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This Field is Required" })
    .email({ message: "Invalid email" }),
});
