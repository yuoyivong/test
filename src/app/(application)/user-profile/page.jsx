"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userProfileSchema } from "@/libs/schema/userProfileSchema";
import UserProfileFormEdit from "@/app/(application)/user-profile/_components/UserProfileFormEdit";
import UserProfileFormNoEdit from "@/app/(application)/user-profile/_components/UserProfileFormNoEdit";
import UserProfile from "./_components/UserProfile";
import BioComponent from "./_components/BioWithProfileName";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";

export default function UserProfilePage() {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => setIsEditing(true);

  // Initial form values
  const initialValues = {
    username: "kroem vandy",
    email_address: "kroemvandy@example.com",
    joined_at: "2024-10-24",
    full_name: "Kroem Vandy",
    gender: "male",
    dateOfBirth: "2000-10-10",
  };

  const [date, setDate] = useState(new Date(initialValues.dateOfBirth));
  const [gender, setGender] = useState(initialValues.gender);

  // Initialize useForm
  const {
    register,
    handleSubmit,
    setValue,
    control,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userProfileSchema),
    defaultValues: initialValues,
  });

  const handleSave = (data) => {
    console.log("Save form data: ", data);
    setIsEditing(false);
    // Example: Redirect after save
    // router.push(`/user-profile?input=${encodeURIComponent(data.full_name)}`);
  };

  // Handle Date Select
  const handleSelectDate = (selectedDate) => {
    setDate(selectedDate);
    setValue("dateOfBirth", selectedDate.toISOString().split("T")[0]);
    trigger("dateOfBirth"); // Trigger validation for dateOfBirth
  };

  const handleDamn = (data) => {
    setDate(data);
    console.log(data, "check date from profile");
  };

  useEffect(() => {
    console.log("Form Errors:", errors);
  }, [errors]);

  useEffect(() => {
    const subscription = watch((value) => {
      console.log("Form Values:", value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <main className="overflow-y-hidden">
      <div className="sm:px-9 md:px-12 lg:px-14 sm:mt-8 md:mt-8 lg:mt-9">
        <h1 className="lg:text-[30px] sm:text-lg text-xl md:text-[23px] font-bold text-blackUi">
          My Profile
        </h1>
        <p className="pb-2 mt-2 text-blackUi sm:text-[12px] md:text-[14px] lg:text-[15px]">
          Real-time information and activities of your properties
        </p>
        <hr />

        <Suspense>
          <div className="sm:mt-8 md:mt-10 lg:mt-14">
            <div className="flex mt-10">
              <UserProfile
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                handleEdit={handleEdit}
              />
              <div className="px-3 mt-2">
                <BioComponent
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  handleEdit={handleEdit}
                />
              </div>
            </div>
          </div>
        </Suspense>

        {/* Form User Info */}
        <Suspense>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-6 md:gap-8 lg:gap-8 sm:mt-8">
            <UserProfileFormNoEdit />
            <UserProfileFormEdit
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              handleEdit={handleEdit}
              handleSave={handleSave}
              initialValues={initialValues}
              date={date}
              setDate={setDate}
              gender={gender}
              setGender={setGender}
              handleSelectDate={handleSelectDate}
              handleDamn={handleDamn}
              register={register}
              setValue={setValue}
              control={control}
              errors={errors}
            />
          </div>
        </Suspense>
      </div>
    </main>
  );
}
