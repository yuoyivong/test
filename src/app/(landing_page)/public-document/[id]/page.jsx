import logo from "../../../../../public/images/stacknotes-logo.png";
import Image from "next/image";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import "../../../(application)/question/style/module.css"
import data from "@/data/blocknote.json"
import Editor from "@/app/(application)/question/_components/Editor";

const publicDocumentPage = ({ params }) => {

  return (
    <div className="container">
      <div className="flex justify-between w-full py-6">
        <Link href={'/'}>
          <Image
            src={logo}
            alt="logo"
            width={210}
            height={100}
            priority
            className=" "
          />
        </Link>
        <div className="flex gap-6 items-center text-xs lg:text-sm 2xl:text-base">
          <Link className="text-blackUi hover:text-lessBlackUi duration-300 whitespace-nowrap" href={"/register"}>
            Sign Up
          </Link>
          <Link className="flex justify-center items-center w-[72px] lg:w-[130px] h-[32px] lg:h-[44px] bg-blackUi rounded-2xl text-white text-center whitespace-nowrap" href={"/login"}>
            Login
          </Link>
        </div>
      </div>
      <div className="">
        <Editor writable={false} data={data?.payload[params.id - 1].doc} />
      </div>
    </div>
  );
};

export default publicDocumentPage;