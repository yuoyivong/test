"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/libs/schema/forgotPasswordSchema";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getUserByEmailAction, resendOtpAction } from "@/action/authAction";
import Spinner from "@/components/Loading";
import { toast } from "react-toastify";

const ForgotPasswordComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });
  const handleRegister = async (data) => {
    setLoading(true);
    const res = await getUserByEmailAction(data.email);

    if (res?.success) {
      const res = resendOtpAction(data.email, true);

      console.log("response ", res);
      handleNavigation(data);
    } else {
      notify("User with this email is not found");
      setError(res.message);
      setLoading(false);
    }
  };

  const handleNavigation = (data) => {
    setLoading(true);
    router.push(`/otp-forgot-password?email=${encodeURIComponent(data.email)}`);
  };

  const handleChange = () => {
    setError("");
  };

  const notify = (data) => {
    toast(data);
  };
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
              Email Address <span className={"text-deleteColor"}>*</span>
            </label>
            <input
              id="email"
              className={`bg-primaryCherUi text-blackUi rounded-xl py-2 px-4 block w-full h-12 border-[1px] ${
                errors.email ? "border-red-600" : "border-transparent"
              } ${!errors.email && "border-blackUi focus:border-blackUi"}
              focus:outline-none transition duration-300`}
              placeholder="bophanika@gmail.com"
              {...register("email", { onChange: handleChange })}
            />
            {errors?.email && (
              <span className="text-red-600 text-sm">
                {errors?.email.message}
              </span>
            )}
            {error && <span className="text-red-600 text-sm">{error}</span>}
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="text-white py-2 px-4 w-full h-11 rounded-xl bg-blackUi hover:bg-[#15152f] transition-colors duration-500"
            >
              {loading ? <Spinner /> : "Next"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;
