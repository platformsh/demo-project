import { ReactComponent as ProductionIcon } from "../assets/utility/production.svg";
import { ReactComponent as StagingIcon } from "../assets/utility/staging.svg";

interface SidebarProps {
  environment: string | null;
  sessionStorageType: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  environment,
  sessionStorageType,
}) => {
  return (
    <aside className="h-fit w-full flex flex-row sm:flex-col flex-wrap sm:w-2/5 lg:w-1/4">
      <section className="p-4 w-full">
        <div className="aside-title flex flex-row gap-4 items-center">
          {environment?.toLowerCase() === "production" ? (
            <ProductionIcon className="w-[32px] h-[32px]" />
          ) : (
            <StagingIcon className="w-[32px] h-[32px]" />
          )}
          <h1>{environment}</h1>
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
