interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <aside className="h-fit w-full flex flex-row sm:flex-col flex-wrap sm:w-2/5 lg:w-1/4 bottom-right-cut-corner">
      <section className="p-6 w-full border-0 border-upsun-violet-600 bg-upsun-violet-900">
        <div className="aside-title flex flex-row gap-4 items-center mt-2">
          <h1 className="text-xl">About</h1>
        </div>
        <div className="aside-title flex flex-row gap-4 items-center mt-4 mb-2">
          <p>
            Welcome to your Upsun app, a Python and Node.js multiapp designed to
            run on Upsun and teach you about it's unique features.
          </p>
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
