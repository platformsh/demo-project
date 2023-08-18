import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from './assets/logo/upsun_horizontal.svg';
import { fetchEnvironment } from './utility/api';
import ShareButton from './components/share';
import { ReactComponent as StartIcon } from './assets/utility/key_start.svg';
import { ReactComponent as InfoIcon } from './assets/utility/key_info.svg';
import { ReactComponent as ResetIcon } from './assets/utility/key_reset.svg';
import CopyButton from './components/copy';
import { ReactComponent as EnvironmentIcon } from './assets/utility/environment.svg';
import { ReactComponent as StatusCompleteIcon } from './assets/utility/status_complete.svg';
import { ReactComponent as StatusIncompleteIcon } from './assets/utility/status_incomplete.svg';

function App() {
  const [environment, setEnvironment] = useState<string | null>(null);
  const [sessionStorageType, setSessionStoragetype] = useState<string | null>(null);
  const [appInstances, setAppInstances] = useState<number | null>(null);

  useEffect(() => {
    fetchEnvironment().then(setEnvironment);
  }, []);

  return (
    <div className="max-w-[90rem] m-auto">
      <header className='p-12 flex flex-row justify-between items-center'>
        <div className="flex flex-row inline-flex items-center gap-6">
          <Logo className="logo w-[7rem] flex h-[2rem] p-0 justify-center items-center" title="Powered by Upsun" />
          <span className='font-sans-strong text-sm font-medium'>Demo project</span>
          <span className='font-sans-strong text-sm font-normal pl-[1.5rem] pr-[1.125rem] border-l-[1px] border-upsun-black-900'>Powered by Platform.sh</span>
        </div>
        <div className='pull-right'><ShareButton />
        </div>
      </header>
      <main className='border-t-[1px] border-upsun-violet-600 flex flex-row'>
        <aside>
          <section className='p-4'>
            <div className='aside-title flex flex-row gap-4 items-center'>
              <EnvironmentIcon className='w-[32px] h-[32px]' />
              <h1>Production</h1>
            </div>
          </section>
          <section>
            <div className='environment-status flex flex-col gap-4'>
              <h2>Environment Status</h2>
              <ul className='p-0 list-none flex flex-col gap-2'>
                <li className='flex flex-row items-center'>
                  <div className='w-4 h-4 flex justify-center'><StatusIncompleteIcon className='w-auto h-auto' /></div>
                  <span className='pl-3.5'>User session service: {sessionStorageType ? sessionStorageType : '...'}</span>
                </li>
                <li className='flex flex-row items-center'>
                  <div className='w-4 h-4 flex justify-center'><StatusCompleteIcon className='w-auto h-auto' /></div>
                  <span className='pl-3.5'>Scaling: Ready</span>
                </li>
                <li className='flex flex-row items-center'>
                  <div className='w-4 h-4 flex justify-center'><StatusIncompleteIcon className='w-auto h-auto' /></div>
                  <span className='pl-3.5'>Scaled app instances: {appInstances !== null ? appInstances : '...'}</span>
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
        <section className='border-t-2 border-upsun-violet-600'></section>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
