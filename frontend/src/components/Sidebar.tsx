import { useEffect } from 'react';
import { ReactComponent as StartIcon } from '../assets/utility/key_start.svg';
import { ReactComponent as InfoIcon } from '../assets/utility/key_info.svg';
import { ReactComponent as ResetIcon } from '../assets/utility/key_reset.svg';
import CopyButton from './Copy';
import { ReactComponent as ProductionIcon } from '../assets/utility/production.svg';
import { ReactComponent as StagingIcon } from '../assets/utility/staging.svg';
import { ReactComponent as StatusCompleteIcon } from '../assets/utility/status_complete.svg';
import { ReactComponent as StatusIncompleteIcon } from '../assets/utility/status_incomplete.svg';

interface SidebarProps {
    environment: string|null;
    sessionStorageType: string|null;
    appInstances: number|null;
  }

const Sidebar: React.FC<SidebarProps> = ({ environment, sessionStorageType, appInstances }) => {
  return (
    <aside className='h-fit'>
      <section className='p-4'>
        <div className='aside-title flex flex-row gap-4 items-center'>
          {environment?.toLowerCase() === "production" ? <ProductionIcon className='w-[32px] h-[32px]' /> : <StagingIcon className='w-[32px] h-[32px]' />}
          <h1>{environment}</h1>
        </div>
      </section>
      <section>
        <div className='environment-status flex flex-col gap-4'>
          <h2>Environment Status</h2>
          <ul className='p-0 list-none flex flex-col gap-2'>
            <li data-testid='status-session-storage' className='flex flex-row items-center'>
              <div className='w-4 h-4 flex justify-center'>
                {(sessionStorageType && sessionStorageType === 'redis') ? <StatusCompleteIcon className='w-auto h-auto' /> : <StatusIncompleteIcon className='w-auto h-auto' />}
              </div>
              <span className='pl-3.5'>User session service: {sessionStorageType ? sessionStorageType : ''}</span>
            </li>
            <li data-testid='status-scaling-ready' className='flex flex-row items-center'>
              <div className='w-4 h-4 flex justify-center'>
                {/* Upsun is always ready to scale! 🥇 */}
                <StatusCompleteIcon className='w-auto h-auto' />
              </div>
              <span className='pl-3.5'>Scaling: Ready</span>
            </li>
            <li data-testid='status-app-scaled' className='flex flex-row items-center'>
              <div className='w-4 h-4 flex justify-center'>
                {(appInstances !== null && appInstances > 0) ? <StatusCompleteIcon className='w-auto h-auto' /> : <StatusIncompleteIcon className='w-auto h-auto' />}
              </div>
              <span className='pl-3.5'>App scaled horizontally</span>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <div className='quick-commands flex flex-col gap-4'>
          <h2>Quick Commands</h2>
          <div className="flex flex-wrap">
            <div className="w-1/2 pr-1">
              <div className="flex flex-col gap-2">
                <CopyButton className='w-12' copyText='upsun demo:start'>
                  <StartIcon className="h-full w-full" />
                </CopyButton>
                <code>upsun demo:start</code>
              </div>
            </div>
            <div className="w-1/2 pl-1">
              <div className="flex flex-col gap-2">
                <CopyButton className='w-12' copyText='upsun project:info'>
                  <InfoIcon className="h-full w-full" />
                </CopyButton>
                <code>upsun project:info</code>
              </div>
            </div>
            <div className="w-1/2 pr-1 pt-4">
              <div className="flex flex-col gap-2">
                <CopyButton className='w-12' copyText='upsun demo:reset'>
                  <ResetIcon className="h-full w-full" />
                </CopyButton>
                <code>upsun demo:reset</code>
              </div>
            </div>
          </div>
        </div>
      </section>
    </aside>
  );
}

export default Sidebar;
