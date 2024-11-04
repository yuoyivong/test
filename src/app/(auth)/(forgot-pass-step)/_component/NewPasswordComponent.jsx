"use client";

import React from "react";
import { PasswordCheck, ShieldSearch, Sms, TickCircle } from "iconsax-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordSchema } from "@/libs/schema/newPasswordSchema";
import { Eye } from "iconsax-react";
import { EyeSlash } from "iconsax-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NewPasswordComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newPasswordSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = (data) => {
    console.log(data);
    handleNavigation();
  };

  const router = useRouter();

  const handleNavigation = () => {
    router.push("/verify-success");
  };

  console.log("Error:", errors);
  return (
    <div>
      <div className="w-[400px]">
        <h2 className="text-3xl font-semibold text-blackUi mb-3">
          Enter New Password
        </h2>
        <h3 className="text-blackUi">
          Choose your New Password for your account
        </h3>

        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="mt-7">
            <label
              className="block text-blackUi text-sm mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                className={`bg-primaryCherUi text-blackUi rounded-xl py-2 px-4 block w-full h-12 border-[1px] ${
                  errors.password ? "border-red-600" : "border-transparent"
                } ${
                  !errors.password && "focus:border-blackUi"
                } focus:outline-none transition duration-300`}
                type={showPassword ? "text" : "password"}
                placeholder="*************"
                name="password"
                {...register("password")}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showPassword ? (
                  <EyeSlash size="20" className="text-blackUi" />
                ) : (
                  <Eye size="20" className="text-blackUi" />
                )}
              </span>
            </div>
            {errors?.password && (
              <span className="text-red-600 text-sm">
                {errors?.password.message}
              </span>
            )}
          </div>
          <div className="mt-7">
            <label
              className="block text-blackUi text-sm mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                className={`bg-primaryCherUi text-blackUi rounded-xl py-2 px-4 block w-full h-12 border-[1px] ${
                  errors.confirmPassword
                    ? "border-red-600"
                    : "border-transparent"
                } ${
                  !errors.password && "focus:border-blackUi"
                } focus:outline-none transition duration-300`}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="*************"
                name="confirmPassword"
                {...register("confirmPassword")}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeSlash size="20" className="text-blackUi" />
                ) : (
                  <Eye size="20" className="text-blackUi" />
                )}
              </span>
            </div>
            {errors?.confirmPassword && (
              <span className="text-red-600 text-sm">
                {errors?.confirmPassword.message}
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

export default NewPasswordComponent;
