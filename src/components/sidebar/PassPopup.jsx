"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import { Refresh, Eye, EyeSlash } from "iconsax-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialogV2";

export const PassPopup = ({ triggerDamn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const closeDialog = () => setIsOpen(false);
  const openDialog = () => setIsOpen(true);

  const onSubmit = (data) => {
    console.log(data, "data from pass");
    closeDialog();
    reset();
  };

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const newPassValue = watch("newpass", "");

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen} className="p-4">
        <DialogTrigger asChild>
          <div
            onClick={triggerDamn}
            className="p-2 xl:p-3 flex items-center gap-3 hover:bg-primaryCherUi rounded-radiusUi cursor-pointer"
          >
            <Refresh size="18" color="#344054" />
            <p>Reset Password</p>
          </div>
        </DialogTrigger>
        <DialogContent
          triggerClose={reset}
          className="max-w-screen w-full sm:!w-[460px] !rounded-3xl"
        >
          <DialogHeader className="flex flex-col justify-between">
            <DialogTitle className="space-y-2">
              <h2 className="text-2xl">Reset Password</h2>
              <p className="text-sm text-lessBlackUi font-normal">
                Set your new password. Make sure it’s different from your
                current password
              </p>
            </DialogTitle>
            <DialogDescription className="text-center space-y-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-6 w-full space-y-8">
                  {/* Current Password Field */}
                  <div className="relative flex flex-col text-start items-start gap-1.5">
                    <Label
                      className="text-sm text-blackUi"
                      htmlFor="currentpass"
                    >
                      Current Password
                      <span className="text-red-600 text-base">*</span>
                    </Label>
                    <Input
                      className={`w-full h-12 rounded-xl bg-lessWhiteUi focus-visible:ring-0 pr-10 ${
                        errors.currentpass ? "border border-red-500" : ""
                      }`}
                      type={showCurrentPass ? "text" : "password"}
                      id="currentpass"
                      placeholder="Current Password"
                      {...register("currentpass", {
                        required: "Current password is required",
                      })}
                    />

                                        <button
                                            type="button"
                                            className="absolute right-3 top-12 transform -translate-y-1/4 text-gray-500"
                                            onClick={() => setShowCurrentPass(prev => !prev)}
                                            aria-label={showCurrentPass ? "Hide current password" : "Show current password"}
                                        >
                                            {showCurrentPass ? <EyeSlash size="20" /> : <Eye size="20" />}
                                        </button>
                                        {errors.currentpass && (
                                            <p className="text-red-500 text-xs lg:text-sm">{errors.currentpass.message}</p>
                                        )}
                                    </div>

                                    {/* New Password Field */}
                                    <div className="relative flex flex-col text-start items-start gap-1.5">
                                        <Label className="text-sm text-blackUi" htmlFor="newpass">
                                            New Password
                                            <span className="text-red-600 text-base">*</span>
                                            </Label>
                                        <Input
                                            className={`w-full h-12 rounded-xl bg-lessWhiteUi focus-visible:ring-0 pr-10 ${errors.newpass ? 'border border-red-500' : ''}`}
                                            type={showNewPass ? "text" : "password"}
                                            id="newpass"
                                            placeholder="New Password"
                                            {...register('newpass', {
                                                required: 'New password is required',
                                                pattern: {
                                                    value: passwordPattern,
                                                    message: 'Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 special character',
                                                }
                                            })}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-12 transform -translate-y-1/4 text-gray-500"
                                            onClick={() => setShowNewPass(prev => !prev)}
                                            aria-label={showNewPass ? "Hide new password" : "Show new password"}
                                        >
                                            {showNewPass ? <EyeSlash size="20" /> : <Eye size="20" />}
                                        </button>
                                        {errors.newpass && (
                                            <p className="text-red-500 text-xs lg:text-sm">{errors.newpass.message}</p>
                                        )}
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div className="relative flex flex-col text-start items-start gap-1.5">
                                        <Label className="text-sm text-blackUi" htmlFor="confirmpass">
                                            Confirm Password
                                        <span className="text-red-600 text-base">*</span>
                                        </Label>
                                        <Input
                                            className={`w-full h-12 rounded-xl bg-lessWhiteUi focus-visible:ring-0 pr-10 ${errors.confirmpass ? 'border border-red-500' : ''}`}
                                            type={showConfirmPass ? "text" : "password"}
                                            id="confirmpass"
                                            placeholder="Confirm Password"
                                            {...register('confirmpass', {
                                                required: 'Please confirm your password',
                                                validate: value =>
                                                    value === newPassValue || "Passwords do not match",
                                            })}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-12 transform -translate-y-1/4 text-gray-500"
                                            onClick={() => setShowConfirmPass(prev => !prev)}
                                            aria-label={showConfirmPass ? "Hide confirm password" : "Show confirm password"}
                                        >
                                            {showConfirmPass ? <EyeSlash size="20" /> : <Eye size="20" />} 
                                        </button>
                                        {errors.confirmpass && (
                                            <p className="text-red-500 text-xs lg:text-sm">{errors.confirmpass.message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex w-full justify-end">
                                    <div className="w-3/4 flex gap-4">
                                        <Button
                                            type="button"
                                            className="h-11 w-1/2 mt-6 text-xs xl:text-base rounded-xl border border-lessBlackUi focus-visible:ring-0 focus:right-0 ring-0 bg-lessWhiteUi hover:bg-lessWhiteUi text-blackUi"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                closeDialog();
                                                reset();
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="w-1/2 h-11 bg-blackUi text-white mt-6 text-xs xl:text-base rounded-xl border border-blackUi hover:bg-blackUi hover:text-white flex justify-center items-center"
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
