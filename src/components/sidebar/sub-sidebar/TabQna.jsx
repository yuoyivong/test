import Link from "next/link";
import { TechForm } from "../TechForm";
import techSideData from "@/data/sidebar.json";
import Image from "next/image";
import { RandomIcon } from "../../alternative/RandomIcon";
import { UpdateTechSection } from "../UpdateTechSection";
import homeIcon from "../../../../public/icons/Home.svg";
import { useState } from "react";
import { Add } from "iconsax-react";
import { useSession } from "next-auth/react";

export const TabQna = ({ triggerFunc }) => {
  const [qnaData, setQnaData] = useState(techSideData?.payload);
  const { data: session, status} = useSession()

  const setNewData = (data) => setQnaData(prevData => [...prevData, { tech: data }]);

  const updateData = (oldCate, newCate) => {
    setQnaData(prevData =>
      prevData.map(item =>
        item.tech === oldCate ? { ...item, tech: newCate } : item
      )
    );
  };

  return (
    <>
      <div
        className="flex items-center p-2 xl:py-3 px-3 hover:bg-primaryCherUi rounded-xl group"
        id="tooltip-select-2"
      >
        <h2 className="w-full text-xs xl:text-sm font-medium text-blackUi">TECHNOLOGY</h2>
        {status === "authenticated" ?
          <TechForm handleSetData={setNewData} />
          :
          <Link href={'/login'}>
            <Add className="cursor-pointer invisible group-hover:visible" size={24} color="#344054" />
          </Link>
        }
      </div>
      <div className="text-xs xl:text-sm h-[350px] overflow-y-scroll">
        {qnaData?.map((x, i) => (
          <div key={x.tech} className="p-2 xl:p-3 hover:bg-primaryCherUi rounded-xl">
            <div className="flex items-center justify-between group">
              <Link
                className="w-full"
                href={`${x?.tech === "Home" ? '/question' : `/question/cate/${i + 1}`}`}
              >
                <div onClick={triggerFunc} className="flex items-center gap-2">
                  <Image
                    src={homeIcon}
                    width={24}
                    height={24}
                    className={`${x?.tech === "Home" ? 'block' : 'hidden'}`}
                    alt="home-icon"
                  />
                  <RandomIcon
                    name={x?.tech}
                    className={`${x?.tech !== "Home" ? 'block' : 'hidden'}`}
                  />
                  <p className="text-blackUi max-w-32 truncate">{x?.tech}</p>
                </div>
              </Link>
              {status === "authenticated" &&
                <UpdateTechSection
                  handleUpdate={updateData}
                  name={x?.tech}
                  x={x}
                />
              }
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
