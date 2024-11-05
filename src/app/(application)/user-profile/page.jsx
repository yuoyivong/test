'use client'

import UserProfileFormEdit from "@/app/(application)/user-profile/_components/UserProfileFormEdit";
import UserProfileFormNoEdit from "@/app/(application)/user-profile/_components/UserProfileFormNoEdit";
import UserProfile from "./_components/UserProfile";
import BioComponent from "./_components/BioWithProfileName";
import { useState } from "react";

export default function UserProfilePage() {

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

  const [date, setDate] = useState();
  const [gender, setGender] = useState(initialValues.gender);

  const handleDamn = (data) => {
    setDate(data);
    console.log(date, "check date from profile");
  };

  // Handle Date Select
  const handleSelectDate = (selectedDate) => {
    setDate(selectedDate);
    setValue("dateOfBirth", selectedDate.toISOString().split("T")[0]);
  };

  const handleSave = (data) => {
    console.log("Save form data: ", data);
    setIsEditing(false);
    // router.push(`/user-profile?input=${encodeURIComponent(data.full_name)}`);
  };

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

        <div className="sm:mt-8 md:mt-10 lg:mt-14">
          <div className="flex mt-10">
            {/* user profile */}
            <UserProfile
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              handleEdit={handleEdit}
            />
            <div className="px-3 mt-2">
            {/* input user name and bio*/}
            <BioComponent
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleEdit={handleEdit}/>
            </div>
          </div>
        </div>

        {/* form user info */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-6 md:gap-8 lg:gap-8 sm:mt-8">
         <UserProfileFormNoEdit/>
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
         /> 
        </div>
      </div>
    </main>
  );
}