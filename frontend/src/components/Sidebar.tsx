// import { ReactComponent as ProductionIcon } from "../assets/utility/production.svg";
// import { ReactComponent as StagingIcon } from "../assets/utility/staging.svg";

interface SidebarProps {
  environment: string | null;
  sessionStorageType: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  environment,
  sessionStorageType,
}) => {
  return (
    <aside className="h-fit w-full flex flex-row sm:flex-col flex-wrap sm:w-2/5 lg:w-1/4 bottom-right-cut-corner">
      <section className="p-6 w-full border-0 border-upsun-violet-600 bg-upsun-violet-900">
        <div className="aside-title flex flex-row gap-4 items-center mt-2">
          <h1 className="text-xl">About</h1>
          {/* {environment?.toLowerCase() === "production" ? (
            <ProductionIcon className="w-[32px] h-[32px]" />
          ) : (
            <StagingIcon className="w-[32px] h-[32px]" />
          )}
          <h1>{environment}</h1> */}

        </div>
        <div className="aside-title flex flex-row gap-4 items-center mt-4 mb-2">
          <p>
          Welcome to your Upsun app, a Python and Node.js multiapp designed to run on Upsun and teach you about it's unique features.
          </p>
          {/* {environment?.toLowerCase() === "production" ? (
            <ProductionIcon className="w-[32px] h-[32px]" />
          ) : (
            <StagingIcon className="w-[32px] h-[32px]" />
          )}
          <h1>{environment}</h1> */}

        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
