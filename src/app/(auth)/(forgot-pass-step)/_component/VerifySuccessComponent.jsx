import React, { useState, useEffect } from "react";
import { TickCircle } from "iconsax-react";
import Confetti from "@/app/Confetti";
import ReactConfetti from "react-confetti";
import Link from "next/link";

const VerifySuccessComponent = () => {
  const [windowDimension, setWindowDimension] = useState({
    width: 0,
    height: 0,
  });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== "undefined") {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const confettiTimer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(confettiTimer);
  }, []);

  return (
    <div>
      {showConfetti && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
          tweenDuration={1}
        />
      )}
      <div className="text-center text-blackUi w-[700px]">
        <h3 className="text-5xl font-semibold" style={{ lineHeight: "1.2" }}>
          Congrats! You Have Successfully Reset Your Password
        </h3>

        <div>
          <p className="mt-12 text-lessBlackUi">
            Your password has been successfully reset. You can now securely log
            in with your new credentials. If you did not initiate this change or
            notice any suspicious activity, please contact support immediately
            for assistance. Thank you for ensuring the security of your account!
          </p>
          <div className="flex gap-3 justify-center items-center mt-12 mb-12">
            <TickCircle size="20" color="green" variant="Bulk" />
            <p className="text-sm">New Password Set Up!</p>
          </div>

          <Link href="/login" className="text-sm underline text-lessBlackUi">
            Navigate to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifySuccessComponent;
