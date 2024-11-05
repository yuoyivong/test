const { z } = require("zod");

const nameRegex = /^[A-Za-z]+(\s?[A-Za-z]+)*$/;

//const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

const passwordRegex =
  /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

const today = new Date();

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, { message: "This Field is Required" })
      .regex(nameRegex, { message: "Invalid Name" }),

    dob: z
      .date()
      .max(today, { message: "Invalid date" })
      .refine((date) => date instanceof Date, {
        message: "This Field is Required",
      }),

    email: z
      .string()
      .min(1, { message: "This Field is Required" })
      .email({ message: "Invalid email" }),

    gender: z.string().min(1, { message: "Please choose gender" }),

    password: z
      .string()
      .min(1, { message: "This Field is Required" })
      .refine((val) => val.length >= 8 && passwordRegex.test(val), {
        message:
          "Password must be at least 8 characters and one special character",
      }),

    confirmPassword: z.string().min(1, { message: "This Field is Required" }),
    // .refine((val) => val.length >= 8 && passwordRegex.test(val), {
    //   message: "Password do not match",
    // }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });
