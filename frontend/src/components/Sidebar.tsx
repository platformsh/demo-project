import CopyButton from "./CopyButton";
import { ReactComponent as ProductionIcon } from "../assets/utility/production.svg";
import { ReactComponent as StagingIcon } from "../assets/utility/staging.svg";
import { ReactComponent as StatusCompleteIcon } from "../assets/utility/status_complete.svg";
import { ReactComponent as StatusIncompleteIcon } from "../assets/utility/status_incomplete.svg";

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
      <section className="w-1/2 sm:w-full">
        <div className="environment-status flex flex-col gap-4">
          <h2>Environment Status</h2>
          <ul className="p-0 list-none flex flex-col gap-2">
            <li
              data-testid="status-session-storage"
              className="flex flex-row items-center"
            >
              <div className="w-4 h-4 flex justify-center">
                {sessionStorageType && sessionStorageType === "redis" ? (
                  <StatusCompleteIcon className="w-auto h-auto" />
                ) : (
                  <StatusIncompleteIcon className="w-auto h-auto" />
                )}
              </div>
              <span className="pl-3.5">
                User session service:{" "}
                {sessionStorageType ? sessionStorageType : ""}
              </span>
            </li>
            <li
              data-testid="status-scaling-ready"
              className="flex flex-row items-center"
            >
              <div className="w-4 h-4 flex justify-center">
                {/* Upsun is always ready to scale! 🥇 */}
                <StatusCompleteIcon className="w-auto h-auto" />
              </div>
              <span className="pl-3.5">Scaling: Ready</span>
            </li>
          </ul>
        </div>
      </section>
      <section className="w-1/2 sm:w-full">
        <div className="quick-commands flex flex-col gap-4">
          <h2>Quick Commands</h2>

          <ul className="p-0 list-none flex flex-col gap-2">

            <li
              data-testid="command-project-info"
              className="flex flex-row items-center"
            >
              <div className="w-4 h-4 flex justify-center">
                <StatusIncompleteIcon className="w-auto h-auto" />
              </div>
              <span className="pl-3.5">
                <CopyButton className="hidden sm:inline-block w" copyText="upsun project:info">
                    <code className="px-4">upsun project:info</code>
                </CopyButton>        
              </span>
            </li>

            <li
              data-testid="command-resources-get"
              className="flex flex-row items-center"
            >
              <div className="w-4 h-4 flex justify-center">
                <StatusIncompleteIcon className="w-auto h-auto" />
              </div>
              <span className="pl-3.5">
                <CopyButton className="hidden sm:inline-block w" copyText="upsun resources:get">
                    <code className="px-4">upsun resources:get</code>
                </CopyButton>        
              </span>
            </li>

            <li
              data-testid="command-relationships"
              className="flex flex-row items-center"
            >
              <div className="w-4 h-4 flex justify-center">
                <StatusIncompleteIcon className="w-auto h-auto" />
              </div>
              <span className="pl-3.5">
                <CopyButton className="hidden sm:inline-block w" copyText="upsun relationships">
                    <code className="px-4">upsun relationships</code>
                </CopyButton>        
              </span>
            </li>
          </ul>
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
