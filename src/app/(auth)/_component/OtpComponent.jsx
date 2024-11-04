"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const OtpComponent = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: zodResolver(otpSchema),
  // });
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const otpValue = watch("otp");

  const handleRegister = (data) => {
    console.log(data);
    handleNavigation();
  };

  const router = useRouter();

  const handleNavigation = () => {
    router.push("/login");
  };

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

        <form onSubmit={handleSubmit(handleRegister)}>
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
                onChange={(value) => field.onChange(value)}
                maxLength={6}
                className="flex justify-center"
              >
                <InputOTPSlot
                  index={0}
                  className={`w-12 h-12 text-center rounded bg-primaryCherUi text-blackUi border-[1px] ${
                    errors.otp ? "border-red-600" : "border-transparent"
                  } ${
                    !errors.otp && "focus:border-blackUi"
                  } focus:outline-none transition duration-300`}
                />
                <InputOTPSlot
                  index={1}
                  className={`w-12 h-12 text-center rounded bg-primaryCherUi text-blackUi border-[1px] ${
                    errors.otp ? "border-red-600" : "border-transparent"
                  } ${
                    !errors.otp && "focus:border-blackUi"
                  } focus:outline-none transition duration-300`}
                />
                <InputOTPSlot
                  index={2}
                  className={`w-12 h-12 text-center rounded bg-primaryCherUi text-blackUi border-[1px] ${
                    errors.otp ? "border-red-600" : "border-transparent"
                  } ${
                    !errors.otp && "focus:border-blackUi"
                  } focus:outline-none transition duration-300`}
                />

                <InputOTPSlot
                  index={3}
                  className={`w-12 h-12 text-center rounded bg-primaryCherUi text-blackUi border-[1px] ${
                    errors.otp ? "border-red-600" : "border-transparent"
                  } ${
                    !errors.otp && "focus:border-blackUi"
                  } focus:outline-none transition duration-300`}
                />
                <InputOTPSlot
                  index={4}
                  className={`w-12 h-12 text-center rounded bg-primaryCherUi text-blackUi border-[1px] ${
                    errors.otp ? "border-red-600" : "border-transparent"
                  } ${
                    !errors.otp && "focus:border-blackUi"
                  } focus:outline-none transition duration-300`}
                />
                <InputOTPSlot
                  index={5}
                  className={`w-12 h-12 text-center rounded bg-primaryCherUi text-blackUi border-[1px] ${
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

          <Button
            type="submit"
            className="w-full h-11 rounded-xl mt-6 bg-blackUi text-white hover:bg-[#15152f] transition-colors duration-300"
          >
            Next
          </Button>
          <div className="underline mt-4 text-lessBlackUi text-end">
            <Link href="">Resend OTP</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpComponent;