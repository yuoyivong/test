const { z } = require("zod");

export const otpSchema = z.object({
  otp1: z.string().min(1, "This field is required"),
  otp2: z.string().min(1, "This field is required"),
  otp3: z.string().min(1, "This field is required"),
  otp4: z.string().min(1, "This field is required"),
  otp5: z.string().min(1, "This field is required"),
  otp6: z.string().min(1, "This field is required"),
});

{
  /* <form onSubmit={handleSubmit(handleRegister)}>
          <Controller
            name="otp"
            control={control}
            rules={{
              required: "required",
              minLength: {
                value: 6,
                message: "OTP must 6 digits",
              },
              maxLength: {
                value: 6,
                message: "OTP must 6 digits",
              },
              pattern: {
                value: /^\d{6}$/,
                message: "OTP contain only digits",
              },
            }}
            render={({ field }) => (
              <InputOTP
                {...field}
                onChange={(value) => field.onChange(value)}
                maxLength={6}
                className="flex justify-center"
              >
                <InputOTPGroup>
                  <InputOTPSlot
                    index={0}
                    className="w-12 h-12 text-center border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
                  />
                  <InputOTPSlot
                    index={1}
                    className="w-12 h-12 text-center border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
                  />
                  <InputOTPSlot
                    index={2}
                    className="w-12 h-12 text-center border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
                  />
                </InputOTPGroup>
                <InputOTPSeparator className="mx-2 text-muted-foreground">
                  -
                </InputOTPSeparator>
                <InputOTPGroup>
                  <InputOTPSlot
                    index={3}
                    className="w-12 h-12 text-center border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
                  />
                  <InputOTPSlot
                    index={4}
                    className="w-12 h-12 text-center border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
                  />
                  <InputOTPSlot
                    index={5}
                    className="w-12 h-12 text-center border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
                  />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          {errors.otp && (
            <p className="text-sm text-center ">{errors.otp.message}</p>
          )}

          <Button type="submit" className="w-full">
            Next
          </Button>
        </form> */
}

// ("use client");

// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import { Button } from "@/components/ui/button";

// export default function Component() {
//   const {
//     handleSubmit,
//     control,
//     watch,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       otp: "",
//     },
//   });

//   const onSubmit = (data) => {
//     console.log("Submitted OTP:", data.otp);
//     // Perform further actions, such as API calls
//   };

//   const otpValue = watch("otp");

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800">
//           Enter OTP
//         </h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <Controller
//             name="otp"
//             control={control}
//             rules={{
//               required: "OTP is required",
//               minLength: {
//                 value: 6,
//                 message: "OTP must be 6 digits",
//               },
//               maxLength: {
//                 value: 6,
//                 message: "OTP must be 6 digits",
//               },
//               pattern: {
//                 value: /^\d{6}$/,
//                 message: "OTP must contain only digits",
//               },
//             }}
//             render={({ field }) => (
//               <InputOTP
//                 {...field}
//                 onChange={(value) => field.onChange(value)}
//                 maxLength={6}
//                 className="flex justify-center"
//               >
//                 <InputOTPGroup>
//                   <InputOTPSlot
//                     index={0}
//                     className="w-12 h-12 text-center border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
//                   />
//                   <InputOTPSlot
//                     index={1}
//                     className="w-12 h-12 text-center border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
//                   />
//                   <InputOTPSlot
//                     index={2}
//                     className="w-12 h-12 text-center border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
//                   />
//                 </InputOTPGroup>
//                 <InputOTPSeparator className="mx-2 text-muted-foreground">
//                   -
//                 </InputOTPSeparator>
//                 <InputOTPGroup>
//                   <InputOTPSlot
//                     index={3}
//                     className="w-12 h-12 text-center border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
//                   />
//                   <InputOTPSlot
//                     index={4}
//                     className="w-12 h-12 text-center border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
//                   />
//                   <InputOTPSlot
//                     index={5}
//                     className="w-12 h-12 text-center border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
//                   />
//                 </InputOTPGroup>
//               </InputOTP>
//             )}
//           />

//           {errors.otp && (
//             <p className="text-sm text-destructive text-center">
//               {errors.otp.message}
//             </p>
//           )}

//           <Button type="submit" className="w-full">
//             Submit OTP
//           </Button>
//           {otpValue && (
//             <div className="mt-6">
//               <h3 className="text-lg font-semibold">Entered OTP:</h3>
//               <div className="flex space-x-2 mt-2">
//                 {otpValue.split("").map((digit, idx) => (
//                   <span
//                     key={idx}
//                     className="w-10 h-10 flex items-center justify-center border-b-2 border-muted-foreground text-xl"
//                   >
//                     {digit}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }
