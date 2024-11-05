"use client";

import { Edit2 } from "iconsax-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const BioComponent = ({ isEditing }) => {
  const searchParams = useSearchParams();
  const getValue = searchParams.get("input");
  const [bio, setBio] = useState("Vandy");
  const [charCount, setCharCount] = useState(bio.length);
  const [displayName, setDisplayName] = useState();

  const handleInputChange = (e) => {
    const input = e.target.value;
    if (input.length <= 20) {
      setBio(input);
      setCharCount(input.length);
    }
  };

  useEffect(() => {
    setDisplayName(getValue);
  }, [getValue]);

  return (
    <main>
      {/* Display Name Input */}
      <div className="sm:w-full md:w-[500px] lg:w-[800px]">
        <input
          type="text"
          disabled
          defaultValue={displayName ?? "Kroem Vandy"}
          className="w-full text-lg sm:text-base md:text-lg lg:text-xl font-semibold text-blackUi focus:outline-none bg-white"
        />
      </div>

      {/* Bio Input */}
      <div className="relative w-full bg-white sm:w-full md:w-[200px] lg:w-[250px]">
        <input
          id="bio"
          type="text"
          value={bio}
          onChange={handleInputChange}
          disabled={!isEditing}
          maxLength={20}
          className="text-sm sm:text-sm md:text-sm lg:text-base text-lessBlackUi focus:outline-none w-full pr-20 bg-white"
        />

        {/* Character Count and Edit Icon */}
        {isEditing && (
          <>
            <span className="absolute right-8 top-1/2 transform -translate-y-1/2 text-[14px] text-lessBlackUi">
              {charCount}/20
            </span>
            <span className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2">
              <Edit2 size="18px" color="#8c95a5" />
            </span>
          </>
        )}
      </div>
    </main>
  );
};

export default BioComponent;