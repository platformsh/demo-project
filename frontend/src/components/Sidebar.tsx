import ThemeToggle from './ThemeToggle'
interface SidebarProps {}

type DividerProps = React.HTMLAttributes<HTMLDivElement>;

const Divider: React.FC<DividerProps> = ({ className = '', ...props }) => {
  return <div className={`w-full h-px m-1 bg-[#D8DBDC] ${className}`} {...props}></div>;
};

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <aside className="h-fit w-full flex flex-row sm:flex-col flex-wrap sm:w-2/5 lg:w-1/4 bottom-right-cut-corner">
      <section
        className="p-6 w-full border-0 dark:border-upsun-violet-600 bg-upsun-violet-300 dark:bg-upsun-violet-900">
        <div className="aside-title flex flex-row gap-4 items-center mt-2">
          <h1 className="text-xl">About</h1>
        </div>
        <div className="aside-title flex flex-row gap-4 items-center mt-4 mb-2">
          <p>
            Welcome to your Upsun app, a Python and Node.js multiapp designed to
            run on Upsun and teach you about it's unique features.
          </p>
        </div>
        <Divider />
        <div className={`font-semibold p-2 pl-0 leading-4`}>Theme</div>
        <ThemeToggle/>
      </section>
    </aside>
  );
};

export default Sidebar;
