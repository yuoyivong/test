"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const OtpForgotPasswordComponent = () => {
  const router = useRouter();

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
    if (data.otp.length === 6) {
      console.log("OTP Submitted:", data.otp);
      handleNavigation();
    }
  };

  const handleNavigation = () => {
    router.push("/new-password");
  };

  console.log(errors);

  return (
    <div>
      <div className="px-6 sm:px-10 md:px-[30px] lg:px-[30px]">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blackUi">
          Verify Your Account
        </h1>
        <p className="text-lessBlackUi mt-4 text-sm sm:text-base">
          OTP already sent to your email address.
        </p>
        <p className="text-lessBlackUi mt-2 text-sm sm:text-base mb-5">
          Enter to verify
        </p>
        {/* <form onSubmit={handleSubmit(handleRegister)}>
          <InputOTP maxLength={6}>
            <InputOTPGroup className="flex gap-3 justify-center">
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="relative">
                  <InputOTPSlot
                    index={index}
                    {...register(`otp${index + 1}`, {
                      required: "This field is required",
                    })}
                    className={`bg-primaryCherUi text-blackUi text-center md:text-xl rounded py-2 px-4 block w-[55px] h-[55px] focus:outline-none focus:border-blackUi ${
                      errors[`otp${index + 1}`] ? "border-red-600" : ""
                    }`}
                    style={{ lineHeight: "35px" }}
                  />
                </div>
              ))}
            </InputOTPGroup>
          </InputOTP>

          {errors.otp && (
            <p className="text-red-600 mt-2">{errors.otp.message}</p>
          )}
          <div className="mt-6">
            <Button
              type="submit"
              className="text-white py-2 px-4 w-full h-11 rounded-xl bg-blackUi hover:bg-[#15152f] transition-colors duration-300"
            >
              Verify
            </Button>
          </div>
          <div className="underline mt-4 text-lessBlackUi text-end">
            <Link href="">Resend OTP</Link>
          </div>
        </form> */}
        <form onSubmit={handleSubmit(handleRegister)}>
          <Controller
            name="otp"
            control={control}
            rules={{
              required: "required",
              minLength: {
                value: 6,
                message: "OTP must be 6 digits",
              },
              maxLength: {
                value: 6,
                message: "OTP must be 6 digits",
              },
              pattern: {
                value: /^\d{6}$/,
                message: "OTP accepts digits only",
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
                  className={`w-12 h-12 text-center rounded bg-primaryCherUi text-blackUi border ${
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

export default OtpForgotPasswordComponent;
