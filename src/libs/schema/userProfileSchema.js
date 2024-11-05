import { z } from "zod";

const required_error = "This field cannot be blank";
const required_date = "You must select a date of birth";

export const userProfileSchema = z.object({
    username: z.string().min(1, {message: required_error}),
    full_name: z.string().min(1, {message: required_error})
    .max(50, { message: "Full name is too long" })
    .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, {
      message: "Full name must contain only letters and no spaces in between.",
    })
    .transform((value) => value.trim().replace(/\s+/g, " ")),
    email_address: z.string().email({message: "Invalid email address"}),
    gender: z.string().min(1, {message:"You must select a gender"}),
    joined_at: z.string().min({ message: required_date }),
    dateOfBirth: z.string().min(1, {message: required_date})
})