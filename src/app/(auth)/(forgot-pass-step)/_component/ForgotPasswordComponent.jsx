"use client";

import React, { useState } from "react";
import { PasswordCheck, ShieldSearch, Sms, TickCircle } from "iconsax-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/libs/schema/forgotPasswordSchema";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { z } from "zod";

const ForgotPasswordComponent = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const handleRegister = (data) => {
    console.log(data);
    handleNavigation();
  };

  const handleNavigation = () => {
    router.push("/otp-forgot-password");
  };

  console.log("Error: ", errors);

  return (
    <div>
      <div className="px-6 md:px-4 lg:px-2 w-[400px]">
        <h2 className="text-3xl font-semibold text-blackUi mb-3">
          Enter Your Email Address
        </h2>
        <h3 className="text-blackUi">
          We use your email to verify user identity
        </h3>

        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="mt-7">
            <label className="block text-blackUi text-sm mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              className={`bg-primaryCherUi text-blackUi rounded-xl py-2 px-4 block w-full h-12 border-[1px] ${
                errors.email ? "border-red-600" : "border-transparent"
              } ${!errors.email && "border-blackUi focus:border-blackUi"}
              focus:outline-none transition duration-300`}
              placeholder="bophanika@gmail.com"
              {...register("email")}
            />
            {errors?.email && (
              <span className="text-red-600 text-sm">
                {errors?.email.message}
              </span>
            )}
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="text-white py-2 px-4 w-full h-11 rounded-xl bg-blackUi hover:bg-[#15152f] transition-colors duration-300"
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;
