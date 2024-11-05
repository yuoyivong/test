const { z } = require("zod");

export const otpSchema = z.object({
  otp1: z.string().min(1, "This field is required"),
  otp2: z.string().min(1, "This field is required"),
  otp3: z.string().min(1, "This field is required"),
  otp4: z.string().min(1, "This field is required"),
  otp5: z.string().min(1, "This field is required"),
  otp6: z.string().min(1, "This field is required"),
});
