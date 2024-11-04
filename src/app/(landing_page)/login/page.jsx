"use client";

import "../../globals.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "iconsax-react";
import { EyeSlash } from "iconsax-react";
import { useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/libs/schema/loginSchema";
import { Google } from "iconsax-react";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

const loginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = (data) => {
    console.log(data);
    handleNavigation();
    localStorage.setItem("auth", JSON.stringify(true));
  };

  const router = useRouter();

  const handleNavigation = () => {
    router.push("/question");
  };

  console.log(errors);

  return (
    <div
      className={`w-full grid grid-cols-1 h-screen md:grid-cols-2 items-center bg-white p-5 ${jakarta.className}`}
    >
      <div className="px-4 sm:px-10 md:px-[10%] lg:px-[20%] xl:px-[25%]">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blackUi text-center mb-6">
          Login to your Account
        </h2>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="mb-4">
            <label className="block text-blackUi text-sm mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              className={`bg-primaryCherUi text-blackUi rounded-xl py-2 px-4 w-full h-12 border-[1px] ${
                errors.email ? "border-red-600" : "border-transparent"
              } ${
                !errors.password && "focus:border-blackUi"
              } focus:outline-none transition duration-300`}
              placeholder="example@gmail.com"
              type="email"
              {...register("email")}
            />
            {errors?.email && (
              <span className="text-red-600 text-sm">
                {errors?.email.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-blackUi text-sm mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                className={`bg-primaryCherUi text-blackUi rounded-xl py-2 px-4 w-full h-12 border-[1px] ${
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
                className="absolute right-3 top-4 cursor-pointer"
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

          <div className="mt-6">
            <Button
              type="submit"
              className="text-white font-bold py-2 px-4 w-full h-11 rounded-xl bg-blackUi hover:bg-[#15152f]"
            >
              Login
            </Button>
          </div>
        </form>

        <div className="flex items-center justify-center my-4">
          <span className="text-blackUi">or</span>
        </div>

        <div className="flex gap-4">
          <Button className="flex items-center justify-center w-1/2 h-11 bg-primaryCherUi hover:bg-primaryCher py-2 px-4 rounded-xl">
            {/* Google SVG */}
            <Google size="40" variant="Bold" className="mr-2 text-blackUi" />
          </Button>

          <Button className="flex items-center justify-center w-1/2 h-11 bg-primaryCherUi hover:bg-primaryCher py-2 px-4 rounded-xl">
            {/* GitHub SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-blackUi"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577v-2.165c-3.338.727-4.033-1.415-4.033-1.415-.546-1.387-1.332-1.757-1.332-1.757-1.09-.745.082-.73.082-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.305 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.382 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.323 3.302 1.23a11.516 11.516 0 013.003-.404c1.02.005 2.048.137 3.003.404 2.293-1.553 3.298-1.23 3.298-1.23.655 1.653.243 2.873.12 3.176.77.838 1.235 1.91 1.235 3.22 0 4.61-2.804 5.624-5.475 5.92.43.37.812 1.104.812 2.227v3.302c0 .319.216.694.824.576C20.565 21.795 24 17.297 24 12c0-6.63-5.37-12-12-12z"
                fill="currentColor"
              />
            </svg>
          </Button>
        </div>

        <div className="flex justify-between text-sm mt-4">
          <Link href="/register" className="text-blackUi">
            Don’t have an account?
          </Link>
          <Link href="/forgot-password" className="text-blackUi">
            Forgot password?
          </Link>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-end h-full">
        <div className="w-full xl:w-[80%] bg-primaryCherUi h-full rounded-2xl text-center flex flex-col justify-center items-center">
          <h3
            className="text-5xl font-semibold px-4 pt-28 w-full text-wrap md:w-96 text-blackUi"
            style={{ lineHeight: "1.2" }}
          >
            Capture Ideas, Ask Questions, Find Answers Seamlessly
          </h3>

          <Image
            className="rounded-2xl mt-5"
            src="/images/new-login.png"
            alt="login form image"
            width={500}
            height={400}
          />
          <p className="mt-5 px-6 md:px-36 pb-28 text-sm text-blackUi">
            Our hybrid app combines note-taking and Q&A, letting you capture
            ideas, organize insights, and find answers in one place—boosting
            productivity and learning.
          </p>
        </div>
      </div>
    </div>
  );
};

export default loginPage;
