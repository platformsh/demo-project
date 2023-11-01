import React, { ReactNode } from "react";
import { ReactComponent as Unavailable } from "../assets/utility/unavailable_v2.svg";
import { ReactComponent as Logo } from "../assets/logo/upsun_horizontal.svg";

interface ErrorPageProps {
  header: string;
  children: ReactNode;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ header, children }) => {
  return (
    <>
      <div className="mx-auto p-5 sm:h-screen flex flex-col justify-center sm:px-10 md:px-20 lg:px-24 max-w-[1230px]">
        <header className="pb-5">
          <Logo
            className="logo w-40 sm:w-36 md:w-40 flex p-0 justify-center items-center"
            title="Powered by Upsun"
          />
        </header>
        <main>
          <div className="flex flex-row flex-col sm:flex-row-reverse">
            <div className="w-full sm:w-2/5">
              <Unavailable className="m-auto px-10 pb-5 w-9/10 max-w-[550px] sm:h-full sm:p-0" />
            </div>
            <div className="w-full sm:3/5 h-min my-auto">
              <h1 className="text-2xl mb-4 lg:text-3xl">{header}</h1>
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ErrorPage;
