"use client";

import { useForm } from "react-hook-form";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/libs/schema/registerSchema";
import Link from "next/link";
import { useState } from "react";
import { Eye } from "iconsax-react";
import { EyeSlash } from "iconsax-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CalendarEdit } from "iconsax-react";
import { ArrowDown2 } from "iconsax-react";
import { useRouter } from "next/navigation";
import { Google } from "iconsax-react";
import { Input } from "@/components/ui/input";
import { DobPicker } from "@/components/alternative/DobPicker";
import { cn } from "@/libs/utils";

const RegisterComponent = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [date, setDate] = React.useState();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const [gender, setGender] = useState("");

  const handleRegister = (data) => {
    console.log(data);
    handleNavigation();
  };

  function handleSelectGender(value) {
    setGender(value);
    setValue("gender", value);
    trigger("gender");
  }

  function handleSelectDate(selectedDate) {
    setDate(selectedDate);
    setValue("dob", selectedDate);
    trigger("dob");
    setPopoverOpen(false);
  }

  const handleDamn = (d) => setValue("dob", d);

  const handleNavigation = () => {
    router.push("/otp");
  };

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-semibold text-blackUi text-center mb-6">
        Create your Account
      </h2>

      <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
        <div>
          <label className="block text-sm text-blackUi mb-2" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            className={`w-full h-12 py-2 px-4 rounded-xl bg-primaryCherUi text-blackUi border-[1px] ${
              errors.fullName ? "border-red-600" : "border-transparent"
            } ${
              !errors.fullName && "focus:border-blackUi"
            } focus:outline-none transition duration-300`}
            type="text"
            name="fullName"
            placeholder="Bopha Nika"
            {...register("fullName")}
          />
          {errors?.fullName && (
            <span className="text-red-600 text-sm">
              {errors.fullName.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="gender"
              className="block text-sm text-blackUi mb-2 font-normal"
            >
              Gender
            </Label>
            <div className="relative">
              <Select
                value={gender}
                onValueChange={handleSelectGender}
                {...register("gender", { required: true })}
              >
                <SelectTrigger
                  className={`w-full h-12 py-2 px-4 rounded-xl bg-primaryCherUi text-blackUi [&_svg]:hidden border-[1px] ${
                    errors.gender ? "border-red-600" : "border-transparent"
                  } focus:outline-none transition duration-300`}
                >
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                </SelectContent>
              </Select>
              <div className="absolute right-3 top-4 transform -translate-y-1/1 z-10">
                <ArrowDown2 size="18" color="#8c95a5" />
              </div>
            </div>

            {errors?.gender && (
              <span className="text-red-600 text-sm">
                {errors.gender.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm text-blackUi mb-2"
            >
              Date Of Birth
            </label>
            <DobPicker
              value={date}
              gg={date}
              handleDamn={handleDamn}
              onChange={handleSelectDate}
              className={cn(
                "h-12 px-1 ps-4 w-full bg-[#F4F6FA] shadow-sm font-normal text-blackUi rounded-[12px] text-sm",
                errors.dateOfBirth ? "border-red-600" : "border-none"
              )}
            />

            {errors?.dob && (
              <span className="text-red-600 text-sm">{errors.dob.message}</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm text-blackUi mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            className={`w-full h-12 py-2 px-4 rounded-xl bg-primaryCherUi text-blackUi border-[1px] ${
              errors.email ? "border-red-600" : "border-transparent"
            } ${
              !errors.password && "focus:border-blackUi"
            } focus:outline-none transition duration-300`}
            type="email"
            placeholder="bophanika001@gmail.com"
            {...register("email")}
          />
          {errors?.email && (
            <span className="text-red-600 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm text-blackUi mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              className={`w-full h-12 py-2 px-4 rounded-xl bg-primaryCherUi text-blackUi border-[1px] ${
                errors.password ? "border-red-600" : "border-transparent"
              } ${
                !errors.password && "focus:border-blackUi"
              } focus:outline-none transition duration-300`}
              type={showPassword ? "text" : "password"}
              placeholder="*************"
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
              {errors.password.message}
            </span>
          )}
        </div>
        <div>
          <label
            className="block text-sm text-blackUi mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              className={`w-full h-12 py-2 px-4 rounded-xl bg-primaryCherUi text-blackUi border-[1px] ${
                errors.confirmPassword ? "border-red-600" : "border-transparent"
              } ${
                !errors.password && "focus:border-blackUi"
              } focus:outline-none transition duration-300`}
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="*************"
              {...register("confirmPassword")}
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-4 cursor-pointer"
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
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-11 py-2 px-4 rounded-xl bg-blackUi text-white hover:bg-[#15152f] transition-colors duration-300"
        >
          Sign Up
        </Button>

        <div className="text-center mt-4 text-blackUi">or</div>
      </form>

      <div className="flex gap-2 mt-4">
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

      <Link href="/login" className="block mt-4 text-blackUi text-sm">
        Already have an account?
      </Link>
    </div>
  );
};

export default RegisterComponent;
