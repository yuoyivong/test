import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link1 } from "iconsax-react";
import { Input } from "@/components/ui/input";

const ShareDocument = ({ onClose, docStatus, docId, updateDocumentStatus }) => {
  const [status, setStatus] = useState(docStatus);
  const [copied, setCopied] = useState(false);
  const link = "https://stacknote-ui-dev.jelay.site/public-document/1";

  const handleStatusChange = (status) => {
    updateDocumentStatus(docId, status);
    setStatus(status);
  };

  const copyLink = () => {
    if (status === "public") {
      navigator.clipboard.writeText(link);

      setCopied(true); // Show the copied message
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="!rounded-3xl max-h-80 !w-[90%] xl:!w-[40%]">
        <DialogHeader>
          <DialogTitle className="mb-5 text-blackUi md:text-lg xl:text-xl text-start">
            {status === "public" ? "Publish" : "Unpublish"}
          </DialogTitle>

          <DialogDescription>
            <div className="relative w-full">
              {/* Popup message when link is copied */}
              {copied && (
                <div className="absolute right-0 -top-9 bg-blackUi text-white text-sm border-none rounded px-2 py-1">
                  Copied!
                </div>
              )}
              <div
                className={
                  "w-full rounded-lg xl:rounded-radiusBorder h-12 bg-primaryCherUi"
                }
              >
                <Link1
                  onClick={copyLink}
                  size="20"
                  color={status === "private" ? "#98A2B3" : "#000000"}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                    status === "public"
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                />

                <Input
                  className="max-w-[90%] rounded-lg xl:rounded-radiusBorder h-12 sm:text-sm xl:text-base font-medium bg-primaryCherUi text-blackUi disabled:pointer-events-none border-none focus-visible:ring-0"
                  value={link}
                  readOnly={status === "public"}
                  disabled={status === "private"}
                />
              </div>
            </div>
            <div class="flex justify-end items-center mt-10">
              {status === "public" ? (
                <button
                  onClick={() => handleStatusChange("private")}
                  className={`w-32 py-3 border-lessBlackUi border-2 bg-none rounded-xl text-blackUi cursor-pointer text-xs sm:text-sm xl:text-base font-medium `}
                >
                  Unpublish
                </button>
              ) : (
                <button
                  onClick={() => handleStatusChange("public")}
                  className={`w-32 py-3 border-blackUi border-2 bg-blackUi rounded-xl text-white cursor-pointer text-xs sm:text-sm xl:text-base font-medium`}
                >
                  Publish
                </button>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDocument;
