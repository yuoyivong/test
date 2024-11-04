"use client";

import "../globals.css";
import { useState } from "react";
import { SidebarRight } from "iconsax-react";
import { Plus_Jakarta_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import * as Frigade from "@frigade/react";
import Navbar from "@/components/sidebar/Navbar";
import { Sidebar } from "@/components/sidebar/Sidebar";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [visibleSidebar, setVisibleSidebar] = useState(false);

  const layoutFunc = () => setVisibleSidebar(false);

  return (
    <Frigade.Provider
      apiKey={
        "api_public_x7nijJTJ1UL2G2Kf4xTafcyujA7wsvCG0i13tUOxBB0aDkwhPDjFLuoWQ1mNEVD9"
      }
    >
      <Frigade.Tour flowId="flow_ApvHJ8sK" />
      <html lang="en">
        <body className={jakarta.className}>
          <NextTopLoader
            color="#98a2b3"
            initialPosition={0.08}
            crawlSpeed={300}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #344054,0 0 8px #344054"
          />
          <div className="w-full h-screen fixed flex">
            <div
              className={`absolute transition-all duration-500 h-full z-[999] ${
                visibleSidebar ? "left-0 h-full z-[999]" : "-left-[100%]"
              } xl:relative xl:left-0 xl:w-[20%] 2xl:w-[18%]`}
            >
              <Sidebar triggerFunc={layoutFunc} />
            </div>

            <div
              onClick={() => setVisibleSidebar(false)}
              className="w-full xl:w-[80%] 2xl:w-[82%] h-screen overflow-scroll pt-6 px-6 bg-primaryCherUi"
            >
              <div
                className={`transition-opacity duration-500 ${
                  visibleSidebar
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                } xl:hidden left-0 backdrop-blur-sm bg-black/50 h-full w-full absolute top-0 z-[888]`}
              ></div>

              <div className="flex items-center gap-2">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisibleSidebar(true);
                  }}
                  className="bg-white rounded-xl p-2 cursor-pointer xl:hidden"
                >
                  <SidebarRight size="24" color="#98a2b3" />
                </div>
                <Navbar />
              </div>

              <div className="bg-white rounded-t-3xl min-h-[91.5%] max-h-[91.5%] p-4 xl:p-8 mt-6 overflow-auto">
                {children}
              </div>
            </div>
          </div>
        </body>
      </html>
    </Frigade.Provider>
  );
}
