import React from "react";
import { ReactComponent as Logo } from "../assets/logo/upsun_horizontal.svg";
import ShareButton from "./ShareButton";

function Header() {
  return (
    <header className="py-7 px-12 flex flex-col border-b-[1px] border-upsun-violet-600">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row inline-flex items-center gap-6">
          <Logo
            className="logo w-[7rem] flex h-[2rem] p-0 justify-center items-center"
            title="Powered by Upsun"
          />
          <span className="hidden md:inline-block font-sans-strong text-sm font-medium">
            Demo Guide Project
          </span>
          <div className="hidden md:inline-block border-r-[1px] border-r-upsun-black-100 dark:border-r-white">
            &nbsp;
          </div>
          <span className="hidden md:inline-block font-sans-strong text-sm font-medium">
            Powered by Platform.sh
          </span>
        </div>
        <div className="pull-right">
          <ShareButton />
        </div>
      </div>
      <div className="w-full md:hidden pt-3">
        <span className="font-sans-strong text-sm font-medium">
          Demo Guide Project
        </span>
      </div>
    </header>
  );
}

export default Header;
