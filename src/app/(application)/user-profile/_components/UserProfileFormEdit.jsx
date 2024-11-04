"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useCallback, useState } from "react";
import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userProfileSchema } from "@/libs/schema/userProfileSchema";
import { CalendarEdit } from "iconsax-react";
import { ArrowDown2 } from "iconsax-react";
import { DobPicker } from "@/components/alternative/DobPicker";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";

const UserProfileFormEdit = ({
  isEditing,
  setIsEditing,
  handleEdit,
  handleSave,
  initialValues,
  date,
  setDate,
  handleDamn,
  gender,
  setGender,
  handleSelectDate,
}) => {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  // useForm setup
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userProfileSchema),
    defaultValues: initialValues,
  });

  const handleCancel = () => {
    reset(initialValues);
    setDate(new Date(initialValues.dateOfBirth));
    setGender(initialValues.gender);
    setIsEditing(false);
  };

  const handleSelectGender = (value) => {
    setGender(value);
    setValue("gender", value);
  };

  // Handle Name Changes
  const handleNameChange = (event) => {
    const newName = event.target.value;
    setValue("full_name", newName);
    router.push(pathname + "?" + createQueryString("input", newName));
  };

  return (
    <main className="md:mt-2 lg:mt-2">
      <form onSubmit={handleSubmit(handleSave)}>
        {/* Full Name Field */}
        <div className="grid w-full marker:max-w-sm items-center">
          <Label
            htmlFor="full_name"
            className="text-[16px] font-medium text-blackUi"
          >
            Full Name
            <span className="text-red-600 text-base">*</span>
          </Label>
          <div className="py-3 pb-10 relative">
            <Input
              type="text"
              id="full_name"
              {...register("full_name", { required: true })}
              onChange={handleNameChange}
              defaultValue={initialValues.full_name}
              className={cn(
                "h-12 px-1 ps-4 block w-full bg-[#F4F6FA] text-blackUi rounded-[12px] text-sm disabled:pointer-events-none",
                !isEditing && "disabled:opacity-100 text-lessBlackUi",
                errors.full_name
                  ? "border-red-600 focus:outline-none"
                  : "border-none"
              )}
              disabled={!isEditing}
            />
            {errors?.full_name && (
              <span className="text-red-600 text-base absolute">
                {errors.full_name.message}
              </span>
            )}
          </div>
        </div>

        {/* Gender Select */}
        <div className="grid w-full marker:max-w-sm items-center">
          <Label
            htmlFor="gender"
            className="text-[16px] font-medium text-blackUi"
          >
            Gender
            <span className="text-red-600 text-base">*</span>
          </Label>
          <div className="py-3 pb-10 relative">
            <Select
              value={gender}
              onValueChange={handleSelectGender}
              disabled={!isEditing}
            >
              <SelectTrigger
                id="gender"
                className={cn(
                  "w-full h-12 ps-4 block bg-[#F4F6FA] shadow-sm text-blackUi rounded-[12px] text-sm [&_svg]:hidden focus:outline-none",
                  "text-left",
                  !isEditing &&
                    "disabled:pointer-events-none disabled:opacity-100 text-lessBlackUi",
                  errors.gender ? "border-red-600" : "border-none"
                )}
              >
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors?.gender && (
              <span className="text-red-600 text-base absolute">
                {errors.gender.message}
              </span>
            )}
            <div className="absolute right-5 top-8 transform -translate-y-1/3 z-10">
              <ArrowDown2 size="18" color="#8c95a5" />
            </div>
          </div>
        </div>

        {/* Date of Birth Picker */}
        <div className="grid w-full marker:max-w-sm items-center">
          {/* {date && format(date, "PPP")} */}
          <Label
            htmlFor="dateOfBirth"
            className="text-[16px] font-medium text-blackUi"
          >
            Date Of Birth
            <span className="text-red-600 text-base">*</span>
          </Label>
          <div className="py-3 relative">
            {isEditing ? (
              <DobPicker
                value={date}
                gg={date}
                handleDamn={handleDamn}
                onChange={handleSelectDate}
                disabled={!isEditing}
                className={cn(
                  "h-12 px-1 ps-4 w-full bg-[#F4F6FA] shadow-sm font-normal text-blackUi rounded-[12px] text-sm",
                  errors.dateOfBirth ? "border-red-600" : "border-none"
                )}
              />
            ) : (
              <div className="h-12 px-1 ps-4 w-full bg-[#F4F6FA] shadow-sm font-normal text-lessBlackUi rounded-[12px] text-sm flex items-center">
                <span className="flex-1">
                  {date
                    ? format(date, "PPP")
                    : format(
                        `Wed Mar 01 2004 00:00:00 GMT+0700 (Indochina Time)`,
                        "PPP"
                      )}
                </span>
                <CalendarEdit
                  size="18"
                  color="#8c95a5"
                  className="ml-auto mr-[16px]"
                />
              </div>
            )}
            {errors?.dateOfBirth && (
              <span className="text-red-600 text-base absolute top-[60px] left-0">
                {errors.dateOfBirth.message}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center mt-14">
          {isEditing ? (
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="px-8 h-11 font-medium text-blackUi border-btnBorderUi rounded-[12px]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="text-lessWhiteUi bg-blackUi rounded-[12px] px-8 h-11"
              >
                Save Changes
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleEdit}
              className="text-lessWhiteUi rounded-[12px] bg-blackUi px-8 h-11"
            >
              Edit
            </Button>
          )}
        </div>
      </form>
    </main>
  );
};

export default UserProfileFormEdit;
