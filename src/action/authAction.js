"use server";
import { registerService } from "@/services/auth_service";

export const authAction = async (userInfo) => {
  try {
    // Create new user registration object
    const newUserRegister = {
      fullName: userInfo.fullName,
      gender: userInfo.gender,
      dob: userInfo.dob,
      email: userInfo.email,
      password: userInfo.password,
      confirmPassword: userInfo.confirmPassword,
    };

    // Call the register service to handle the actual registration
    const response = await registerService(newUserRegister);

    // Check if registration was successful
    if (response?.status === 201) {
      // User successfully registered
      return { success: true, message: "Registration successful!" };
    } else {
      // Handle errors from the service
      return { success: false, message: response.message || "Registration failed" };
    }
  } catch (error) {
    // Catch and return any server errors
    return { success: false, message: error.message || "An error occurred during registration." };
  }
};
