'use client';

import { userProfileSchema } from "@/libs/schema/userProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sms } from "iconsax-react";
import { Calendar2 } from "iconsax-react";
import { useForm } from "react-hook-form";

const UserProfileFormNoEdit = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(userProfileSchema),
  })

  function handleInput(data) {
    console.log(data);
  }

  return (
    <main className="md:mt-2 lg:mt-2">
     <form onSubmit={handleSubmit(handleInput)}>
       {/* username */}
       <div className="">
        <label htmlFor="text" className="text-[16px] font-medium text-blackUi">
          Username
        </label>
        <div className="py-3 pb-10">
          <input
            type="text"
            id="username"
            name="username"
            {...register("username", { required: true })}
            defaultValue="Vandy"
            className="h-12 px-1 ps-4 cursor-not-allowed block w-full bg-[#F4F6FA] text-lessBlackUi shadow-sm rounded-[12px] text-sm"
            disabled
          />
          {errors?.username && (
            <span className="text-red-500 text-base">{errors.username.message}</span>
          )}
        </div>
      </div>
      {/* email address */}
      <div className="relative">
        <label htmlFor="text" className="text-[16px] font-medium text-blackUi">
          Email Address
        </label>
        <div className="relative">
          <div className="py-3 pb-10">
            <input
              type="text"
              id="email_address"
              name="email_address"
              {...register("email_address", { required: true })}
              defaultValue={"vandy@gmail.com"}            
              className="h-12 px-1 ps-4 block w-full bg-[#F4F6FA] text-lessBlackUi cursor-not-allowed shadow-sm rounded-[12px] text-sm"
            disabled
            />
            {errors?.email_address && (
              <span className="text-red-500 text-base">{errors.email_address.message}</span>
            )}
          </div>
          <span className="absolute right-5 top-8 transform -translate-y-1/3 z-10">
            <Sms size="18" color="#8c95a5"/>
          </span>
        </div>
      </div>
      {/* joined at */}
      <div className="relative">
        <label htmlFor="text" className="text-[16px] font-medium text-blackUi">
          Joined At
        </label>
        <div className="relative">
          <div className="py-3 pb-10 sm:pb-2">
            <input
            type="text"
            id="joined_at"
            name="joined_at"
            {...register("joined_at", { required: true })}
            defaultValue="10/10/2024"
            className="h-12 px-1 ps-4 block w-full bg-[#F4F6FA] cursor-not-allowed text-lessBlackUi shadow-sm rounded-[12px] text-sm"
            disabled
          />
          {errors?.joined_at && (
            <span className="text-red-500 text-base">{errors.joined_at.message}</span>
          )}
          </div>
          
          <span className="absolute right-5 top-8 transform -translate-y-1/3 z-10">
            <Calendar2 size="18" color="#8c95a5" />
          </span>
        </div>
      </div>
     </form>
    </main>
  );
};

export default UserProfileFormNoEdit;
