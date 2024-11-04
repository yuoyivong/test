"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "./ui/calendar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userProfileSchema } from "@/libs/schema/userProfileSchema";
import { CalendarEdit } from "iconsax-react";

const UserProfileFormEdit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      full_name: "Kroem Vandy",
      gender: "male",
      dateOfBirth: "2024-10-25",
    },
  });

  const [date, setDate] = React.useState(new Date("2024-10-25"));
  const [gender, setGender] = React.useState("male");
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState({
    full_name: "Kroem Vandy",
    gender: "male",
    dateOfBirth: "2024-10-25",
  });

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSelectGender(value) {
    setGender(value); // Update local gender state
    setValue("gender", value); // Update the form's gender value
    trigger("gender");
  }

  function handleSelectDate(selectedDate) {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    setDate(selectedDate);
    setValue("dateOfBirth", formattedDate);
    trigger("dateOfBirth");
  }

  function handleSave(data) {
    console.log("Save form data: ", data);
    setIsEditing(false);
    setOriginalData(data); // Save updated data after saving changes
  }

  function handleCancel() {
    reset(originalData); // Use reset to restore original form values
    setDate(new Date(originalData.dateOfBirth)); // Reset the date picker as well
    setGender(originalData.gender); // Reset gender manually
    setIsEditing(false); // Exit the edit mode
  }

  return (
    <main className="sm:mt-0 md:mt-4 lg:mt-4">
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="grid w-full marker:max-w-sm items-center">
          <Label htmlFor="full_name" className="text-[16px] font-medium text-gray-700">
            Full Name
          </Label>
          <div className="py-3 pb-10">
            <Input
              {...register("full_name")}
              type="text"
              id="full_name"
              className={cn(
                "h-11 px-1 ps-3 block w-full bg-[#F4F6FA] text-gray-800 shadow-sm rounded-lg border-none text-sm disabled:pointer-events-none focus-visible:ring-gray-400",
                isEditing ? "" : "disabled:opacity-100" // Keep opacity for disabled state
              )}
              disabled={!isEditing}
            />
            {errors?.full_name && <span className="text-red-600">{errors.full_name.message}</span>}
          </div>
        </div>

        <div className="grid w-full marker:max-w-sm items-center">
          <Label htmlFor="gender" className="text-[16px] font-medium text-gray-800">
            Gender
          </Label>
          <div className="py-3 pb-10">
            <Select
              {...register("gender")}
              value={gender} // Use gender state for controlling the Select
              onValueChange={handleSelectGender} // Update gender when selecting
              disabled={!isEditing}
            >
              <SelectTrigger
                className={cn(
                  "w-full h-11 ps-3 block bg-[#F4F6FA] shadow-sm border-none text-gray-800 rounded-lg text-sm focus-visible:ring-gray-400 focus:ring-gray-400 focus:ring-offset-0 [&_svg]:hidden",
                  "text-left",
                  !isEditing && "disabled:pointer-events-none disabled:opacity-100" // Prevent opacity change when disabled
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
            {errors?.gender && <span className="text-red-600">{errors.gender.message}</span>}
          </div>
        </div>

        {/* Date of birth */}
        <div className="grid w-full marker:max-w-sm items-center">
          <Label htmlFor="dateOfBirth" className="text-[16px] font-medium text-gray-700">
            Date Of Birth
          </Label>
          <div className="py-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  {...register("dateOfBirth")}
                  disabled={!isEditing}
                  variant={"outline"}
                  className={cn(
                    "h-11 px-1 ps-3 w-full bg-[#F4F6FA] shadow-sm rounded-lg border-none text-sm hover:bg-[#F4F6FA] focus-visible:ring-gray-400 focus:ring-gray-400 focus:ring-offset-0",
                    "text-left",
                    isEditing ? "" : "disabled:opacity-100", // Keep opacity for disabled state
                    !date && "text-muted-foreground",
                    !isEditing && "disabled:opacity-100" // Prevent opacity change when disabled
                  )}
                >
                  {date ? format(date, "PPP") : <span className="text-gray-800">Select Date</span>}
                  <CalendarEdit size="18" color="#8c95a5" className="ml-auto mr-[16px]" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleSelectDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors?.dateOfBirth && <span className="text-red-600">{errors.dateOfBirth.message}</span>}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end items-center mt-14">
          {isEditing ? (
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleCancel} // Cancel resets the form
                className="px-7 font-medium text-gray-700 border-gray-400"
              >
                Cancel
              </Button>
              <Button type="submit" className="text-gray-50 bg-gray-700 px-7 py-2">
                Save Changes
              </Button>
            </div>
          ) : (
            <Button onClick={handleEdit} className="text-gray-50 bg-gray-700 px-7 py-2">
              Edit
            </Button>
          )}
        </div>
      </form>
    </main>
  );
};

export default UserProfileFormEdit;
