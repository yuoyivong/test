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
import { useRouter, useSearchParams } from "next/navigation";
import { forgetPasswordAction, forgetPaswordAction } from "@/action/authAction";
import Spinner from "@/components/Loading";

const NewPasswordComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(newPasswordSchema),
    mode: "onChange",
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState();

  const handleRegister = async (data) => {
    setIsLoading(true);
    console.log("data received ", data);
    const res = await forgetPasswordAction(data, emailFromQuery);

    console.log("response is : ", res);

    if (res?.success) {
      handleNavigation();
    } else {
      console.log("Forget Password failed. ", res);
      setResponse(res.message);
      setIsLoading(false);
    }
  };

  const router = useRouter();

  const handleNavigation = () => {
    setIsLoading(true);
    router.push("/verify-success");
  };

  const handleChange = () => {
    setResponse(null);
  };
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
              Password <span className={"text-deleteColor"}>*</span>
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
                {...register("password", {
                  onChange: handleChange,
                })}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showPassword ? (
                  <EyeSlash size="20" className="text-gray-400" />
                ) : (
                  <Eye size="20" className="text-gray-400" />
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
              Confirm Password <span className={"text-deleteColor"}>*</span>
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
                {...register("confirmPassword", {
                  onChange: handleChange,
                })}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeSlash size="20" className="text-gray-400" />
                ) : (
                  <Eye size="20" className="text-gray-400" />
                )}
              </span>
            </div>
            {errors?.confirmPassword && (
              <span className="text-red-600 text-sm">
                {errors?.confirmPassword.message}
              </span>
            )}
            {/* {password !== confirmPassword && confirmPassword && (
              <span className="text-red-600 text-sm">
                Passwords do not match
              </span>
            )} */}
            {!response?.success && (
              <p className="text-sm text-center text-red-600 mt-3">
                {response?.message}
              </p>
            )}
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="text-white py-2 px-4 w-full h-11 rounded-xl bg-blackUi hover:bg-[#15152f] transition-colors duration-500"
            >
              {isLoading ? <Spinner /> : "Next"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPasswordComponent;
