"use server";
import {
  forgetPasswordService,
  getUserByEmailService,
  registerService,
  resendOtpService,
  verifyService
} from "@/services/auth_service";
import {format} from "date-fns";

export const authAction = async (userInfo) => {
  try {
    // Create new user registration object
    const newUserRegister = {
      fullName: userInfo.fullName,
      gender: userInfo.gender,
      dob: format(userInfo.dob, "yyyy-MM-dd"),
      email: userInfo.email,
      password: userInfo.password,
      confirmPassword: userInfo.confirmPassword,
    };

    // Call the register service to handle the actual registration
    const response = await registerService(newUserRegister);

    console.log('response ', response)
    // Check if registration was successful
    if (response?.code === 201) {
      // User successfully registered
      return { success: true, message: "Registration successful!" };
    } else {
      // Handle errors from the service
      return { success: false, message: response.detail || "Registration failed" };
    }
  } catch (error) {
    // Catch and return any server errors
    return { success: false, message: error.message || "An error occurred during registration." };
  }
};

export const verifyAction = async (otp, email, type) => {
  try {
    // Call the verify service to handle the actual verification
    const response = await verifyService(otp,email, type);

    console.log('response ', response)
    // Check if verification was successful
    if (response?.code === 200) {
      // User successfully verified
      return { success: true, message: "Verification successful!" };
    } else {
      // Handle errors from the service
      return { success: false, message: response.detail || "Verification failed" };
    }
  } catch (error) {
    // Catch and return any server errors
    return { success: false, message: error.message || "An error occurred during verification." };
  }
}

export const resendOtpAction = async (email,type) => {
  try {
    // Call the resend OTP service to handle the actual resending
    const response = await resendOtpService(email, type);

    // Check if OTP was successfully resent
    if (response?.code === 201) {
      // OTP successfully resent
      return { success: true, message: "OTP resent successfully!" };
    } else {
      // Handle errors from the service
      return { success: false, message: response.detail || "Failed to resend OTP" };
    }
  } catch (error) {
    // Catch and return any server errors
    return { success: false, message: error.message || "An error occurred during OTP resending." };
  }
}

export const getUserByEmailAction = async (email) => {
  try {
    // Call the get user by email service to handle the actual retrieval
    const response = await getUserByEmailService(email);

    // Check if user was successfully retrieved
    if (response?.code === 200) {
      // User successfully retrieved
      return { success: true, message: response.payload} ;
    } else {
      // Handle errors from the service
      return { success: false, message: response.detail || "Failed to retrieve user" };
    }
  } catch (error) {
    // Catch and return any server errors
    return { success: false, message: error.message || "An error occurred during user retrieval." };
  }
}

export const forgetPasswordAction = async (data, email) => {
  try {
    // Call the get user by email service to handle the actual retrieval
    const response = await forgetPasswordService(data, email);

    console.log('response ', response)
    // Check if user was successfully retrieved
    if (response?.code === 200) {
      // User successfully retrieved
      return { success: true, message: response.payload} ;
    } else {
      // Handle errors from the service
      return { success: false, message: response.detail || "Failed to retrieve user" };
    }
  } catch (error) {
    // Catch and return any server errors
    return { success: false, message: error.message || "An error occurred during user retrieval." };
  }
}