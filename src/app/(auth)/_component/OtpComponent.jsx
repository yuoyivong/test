"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { resendOtpAction, verifyAction } from "@/action/authAction";
import { toast } from "react-toastify";
import Spinner from "@/components/Loading";

const OtpComponent = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });
  const [response, setResponse] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (otp) => {
    setIsLoading(true);
    const response = await verifyAction(otp.otp, emailFromQuery, false);

    if (response?.success) {
      console.log("OTP verified successfully.");

      notify("OTP verified successfully.");
      setResponse(response);
      handleNavigation();
    } else {
      console.log("OTP verification failed.", response);
      notify("OTP verification failed.");
      setResponse(response);
    }
    setIsLoading(false);
  };

  const resendOtp = async () => {
    // Call the resend OTP service
    const response = await resendOtpAction(emailFromQuery, false);
    if (response?.success) {
      console.log("OTP resent successfully.");
      notify("OTP resent successfully.");
    } else {
      console.log("Failed to resend OTP.");
    }
  };

  const handleNavigation = () => {
    setIsLoading(true);
    router.push("/login");
    setIsLoading(false);
  };

  const notify = (data) => toast(data);

  return (
    <div className="flex items-center justify-center px-6 sm:px-10 md:px-[30px] lg:px-[30px] w-[600px] h-[500px]">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blackUi">
          Verify Your Account
        </h1>
        <p className="text-blackUi mt-4 text-sm sm:text-base">
          OTP already sent to your email address.
        </p>
        <p className="text-blackUi mt-2 text-sm sm:text-base mb-5">
          Enter to verify
        </p>

        <form onSubmit={handleSubmit(handleVerify)}>
          <Controller
            name="otp"
            control={control}
            rules={{
              required: "required",
              minLength: {
                value: 6,
                message: "OTP must 6 digits",
              },
              maxLength: {
                value: 6,
                message: "OTP must 6 digits",
              },
              pattern: {
                value: /^\d{6}$/,
                message: "OTP contain only digits",
              },
            }}
            render={({ field }) => (
              <InputOTP
                {...field}
                onChange={(value) => {
                  field.onChange(value);
                  setResponse(null);
                }}
                maxLength={6}
                className="flex justify-center"
              >
                <InputOTPSlot
                  index={0}
                  className={`w-14 h-14 text-center rounded bg-primaryCherUi text-blackUi border-[1px] ${
                    errors.otp ? "border-red-600" : "border-transparent"
                  } ${
                    !errors.otp && "focus:border-blackUi"
                  } focus:outline-none transition duration-300`}
                />
                <InputOTPSlot
                  index={1}
                  className={`w-14 h-14 text-center rounded bg-primaryCherUi text-blackUi border-[1px] ${
                    errors.otp ? "border-red-600" : "border-transparent"
                  } ${
                    !errors.otp && "focus:border-blackUi"
                  } focus:outline-none transition duration-300`}
                />
                <InputOTPSlot
                  index={2}
                  className={`w-14 h-14 text-center rounded bg-primaryCherUi text-blackUi border-[1px] ${
                    errors.otp ? "border-red-600" : "border-transparent"
                  } ${
                    !errors.otp && "focus:border-blackUi"
                  } focus:outline-none transition duration-300`}
                />

                <InputOTPSlot
                  index={3}
                  className={`w-14 h-14 text-center rounded bg-primaryCherUi text-blackUi border-[1px] ${
                    errors.otp ? "border-red-600" : "border-transparent"
                  } ${
                    !errors.otp && "focus:border-blackUi"
                  } focus:outline-none transition duration-300`}
                />
                <InputOTPSlot
                  index={4}
                  className={`w-14 h-14 text-center rounded bg-primaryCherUi text-blackUi border-[1px] ${
                    errors.otp ? "border-red-600" : "border-transparent"
                  } ${
                    !errors.otp && "focus:border-blackUi"
                  } focus:outline-none transition duration-300`}
                />
                <InputOTPSlot
                  index={5}
                  className={`w-14 h-14 text-center rounded bg-primaryCherUi text-blackUi border-[1px] ${
                    errors.otp ? "border-red-600" : "border-transparent"
                  } ${
                    !errors.otp && "focus:border-blackUi"
                  } focus:outline-none transition duration-300`}
                />
              </InputOTP>
            )}
          />
          {errors.otp && (
            <p className="text-sm text-center text-red-600 mt-3">
              {errors.otp.message}
            </p>
          )}
          {!response?.success && !errors.otp && (
            <p className="text-sm text-center text-red-600 mt-3">
              {response?.message}
            </p>
          )}
          <Button
            type="submit"
            className="w-full h-11 rounded-xl mt-6 bg-blackUi text-white hover:bg-[#15152f] transition-colors duration-500"
          >
            {isLoading ? <Spinner /> : "Next"}
          </Button>
          <div className="underline mt-4 text-lessBlackUi text-end cursor-pointer">
            <div onClick={resendOtp}>Resend OTP</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpComponent;
