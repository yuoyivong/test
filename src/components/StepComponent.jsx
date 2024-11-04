import React from "react";
import { PasswordCheck, ShieldSearch, Sms, TickCircle } from "iconsax-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StepComponent = () => {
  return (
    <div className="flex flex-col justify-center gap-2">
      <div id="text" className="flex gap-11 text-blackUi">
        <p>Enter Email</p>
        <p>Verify Otp</p>
        <p>New Password</p>
        <p>Success</p>
      </div>
      <div className="hidden sm:flex justify-center items-center mb-12 mx-2 relative">
        <div className=" rounded-full flex items-center justify-center p-2 ">
          <Link href="/forgot-password">
            <div className="rounded-full w-40% h-50% bg-slate-100 p-2">
              <Sms size="20" className="text-gray-400" variant="Bulk" />
            </div>
          </Link>
        </div>
        <div className="flex-1 border-t border-gray-400"></div>
        <div className=" rounded-full flex items-center justify-center p-2 ">
          <Link href="/otp-forgot-password">
            <div className="rounded-full w-40% h-50% bg-slate-100 p-2">
              <ShieldSearch
                size="20"
                className="text-gray-400"
                variant="Bulk"
              />
            </div>
          </Link>
        </div>
        <div className="flex-1 border-t border-gray-400"></div>
        <div className=" rounded-full flex items-center justify-center p-2 ">
          <Link href="/new-password">
            <div className="rounded-full w-40% h-50% bg-slate-100 p-2">
              <PasswordCheck
                size="20"
                className="text-gray-400"
                variant="Bulk"
              />
            </div>
          </Link>
        </div>
        <div className="flex-1 border-t border-gray-400 "></div>
        <div className=" rounded-full flex items-center justify-center p-2 ">
          <Link href="/verify-success">
            <div className="rounded-full w-40% h-50% bg-slate-100 p-2">
              <TickCircle size="20" className="text-gray-400" variant="Bulk" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StepComponent;
