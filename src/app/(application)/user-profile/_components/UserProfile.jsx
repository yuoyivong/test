'use client'

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ArrowCircleUp2 } from "iconsax-react";
import { GalleryImport } from "iconsax-react";

const UserProfile = ({isEditing}) => {
    
    const [profileImage, setProfileImage] = useState("/images/profile/dy.jpg");

    const fileLoadHandler = (event) => {
        const file = event.target.files[0];
        setProfileImage(URL.createObjectURL(file));
    }

    return ( 
        <main className="flex flex-col items-center">
            {/* Hidden Input for File Upload */}
            <Input
                id="picture"
                className="hidden"
                onChange={fileLoadHandler}
                type="file"
                disabled={!isEditing}
            />

            {/* Avatar Container */}
            <div className="relative group w-[4rem] h-[4rem]">
                {/* Avatar Image */}
                <Avatar className="h-full w-full">
                    <AvatarImage src={profileImage} alt="profile" className="h-full w-full object-cover" />
                    <AvatarFallback>
                        <Image src="/images/no-profile.jpg" alt="profile" width={100} height={100} className="h-full w-full object-cover" />
                    </AvatarFallback>
                </Avatar>

                {/* Hover Overlay for Upload */}
                <label
                    htmlFor="picture"
                    className={`absolute inset-0 flex items-center justify-center ${isEditing? "bg-black bg-opacity-50 " : ""} text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full`}
                >
                 {!isEditing ? (
                    <span type="hidden"></span>
                 ) : (
                     <span><GalleryImport size="31" color="#FFFFFF"/></span>
                 )}
                </label>
            </div>
        </main>
    );
}
 
export default UserProfile;