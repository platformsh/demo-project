import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from './assets/logo/upsun_horizontal.svg';
import { fetchEnvironment } from './utility/api';
import ShareButton from './components/share';
import { ReactComponent as StartIcon } from './assets/utility/key_start.svg';
import { ReactComponent as InfoIcon } from './assets/utility/key_info.svg';
import { ReactComponent as ResetIcon } from './assets/utility/key_reset.svg';
import CopyButton from './components/copy';
import { ReactComponent as ProductionIcon } from './assets/utility/production.svg';
import { ReactComponent as StagingIcon } from './assets/utility/staging.svg';
import { ReactComponent as RedisIcon } from './assets/utility/service_redis.svg';
import { ReactComponent as ScaleIcon } from './assets/utility/scale_app.svg';
import { ReactComponent as DoneIcon } from './assets/utility/done.svg';
import { ReactComponent as MergeIcon } from './assets/utility/merge.svg';
import { ReactComponent as StatusCompleteIcon } from './assets/utility/status_complete.svg';
import { ReactComponent as StatusIncompleteIcon } from './assets/utility/status_incomplete.svg';

function App() {
  const [environment, setEnvironment] = useState<string | null>('');
  const [sessionStorageType, setSessionStorageType] = useState<string | null>(null);
  const [appInstances, setAppInstances] = useState<number | null>(null);
  const [fatalErrorMessage, setFatalErrorMessage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<"redis" | "merge-production" | "scale" | "complete" | null>("redis");

  useEffect(() => {
    fetchEnvironment()
      .then(envResponse => {
        const { type, instance_count, session_storage } = envResponse;
        setEnvironment(type && (type.charAt(0).toUpperCase() + type.slice(1)))
        setAppInstances(instance_count ? instance_count : 0)
        setSessionStorageType(session_storage)
      })
      .catch(error => setFatalErrorMessage('There was a problem fetching environment data.'))
  }, []);


  useEffect(() => {
    switch (true) {
      case (sessionStorageType === 'file'):
        setCurrentStep('redis');
        break;
      case (environment?.toLocaleLowerCase() === 'staging' && sessionStorageType === 'redis'):
        setCurrentStep('merge-production');
        break;
      case (appInstances !== null && appInstances < 1):
        setCurrentStep('scale');
        break;
      default:
        setCurrentStep('complete')
        break;
    }
  }, [environment, sessionStorageType, appInstances]);



  return (
    <>
      {/* Temporary error container: needs design */}
      {fatalErrorMessage && <p className='bg-red-400 p-6 m-6 rounded-lg'>{fatalErrorMessage}</p>}
      <div className={`max-w-[83.875rem] w-[83.875rem] m-auto transition duration-500 ${(!environment || fatalErrorMessage) && "blur"}`}>
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
          <aside className='h-fit'>
            <section className='p-4'>
              <div className='aside-title flex flex-row gap-4 items-center'>
                {environment?.toLowerCase() === "production" ? <ProductionIcon className='w-[32px] h-[32px]' /> : <StagingIcon className='w-[32px] h-[32px]' /> }
                <h1>{environment}</h1>
              </div>
            </section>
            <section>
              <div className='environment-status flex flex-col gap-4'>
                <h2>Environment Status</h2>
                <ul className='p-0 list-none flex flex-col gap-2'>
                  <li className='flex flex-row items-center'>
                    <div className='w-4 h-4 flex justify-center'>
                      {(sessionStorageType && sessionStorageType === 'redis') ? <StatusCompleteIcon className='w-auto h-auto' /> : <StatusIncompleteIcon className='w-auto h-auto' />}
                    </div>
                    <span className='pl-3.5'>User session service: {sessionStorageType ? sessionStorageType : ''}</span>
                  </li>
                  <li className='flex flex-row items-center'>
                    <div className='w-4 h-4 flex justify-center'>
                      {/* Upsun is always ready to scale! 🥇 */}
                      <StatusCompleteIcon className='w-auto h-auto' />
                    </div>
                    <span className='pl-3.5'>Scaling: Ready</span>
                  </li>
                  <li className='flex flex-row items-center'>
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
          <section className='border-t-2 border-upsun-violet-600 w-3/4'>
            <div className='content-intro w-3/4 mx-auto mt-12'>
              <div className="welcome-message flex p-4 justify-center items-center space-x-2.5 rounded-md border border-upsun-violet-600 bg-upsun-violet-900 font-mono text-xs leading-6 ">Welcome to your Upsun app, a Python and Node.js multiapp designed to run on Upsun and teach you about it's unique features.</div>

              {environment && environment.toLocaleLowerCase() === 'production' ?
                <p className='text-sm leading-6 mt-2'>
                  This app is the React frontend of your demo project’s production environment. In your other projects, use the runtimes you prefer—Python, Node.js, PHP, and more. The net: your production environment will show up in search results. You’ll point your domain name to it. And that’s what will be visible to users. Your team can use a Git-branch workflow to create byte-for-byte copies of production (preview environments) to begin development.
                </p>
                : <>
                  <p className='text-sm leading-6 mt-2'>Congrats! You’ve created your staging environment 🎉</p>
                  <p className='text-sm leading-6 mt-2'>This space represents your byte-for-byte copy of production. You can use staging and development environments to preview and share changes prior to pushing them to production.</p>
                  <p className='text-sm leading-6 mt-2'>This app uses the Upsun environment variable <code className='px-2 py-1'>$UPSUN_ENVIRONMENT="staging"</code> to modify the content of this page.</p>
                  <p className='text-sm leading-6 mt-2'>Return to the <code className='px-2 py-1'>upsun demo</code> command to continue adding your Redis service.</p>
                </>
              }

              <div className='pt-8 flex flex-col gap-2'>
                <div className={`feature--add-service flex flex-col ${currentStep !== 'redis' && 'is-disabled'}`}>
                  <div className='aside-title flex flex-row gap-4 items-center'>
                    <RedisIcon className='w-10 h-10' />
                    <h2 className='font-semibold'>Add Redis to staging</h2>
                  </div>
                  <div className='border-l-2 ml-5 pl-10'>
                    <div className='rounded-lg p-4 bg-upsun-black-900'>
                      <p className='mb-2'>With Upsun, you can clone any environment to get a byte-for-byte copy to use for staging, features, and bugfixes.</p>
                      <p className='mb-2'>Upsun is unique in that you can version-control your app services—MariaDB, Redis, and more.</p>
                      <p className='mb-2'>We'll guide you through adding a Redis service and merging back into production. Simply run: </p>
                      <code className='px-4'>upsun demo:start</code>
                    </div>
                  </div>
                </div>

                <div className={`feature--merge-production flex flex-col ${!(currentStep === 'merge-production' || currentStep === 'redis') && 'is-disabled'}`}>
                  <div className='aside-title flex flex-row gap-4 items-center'>
                    <MergeIcon className='w-10 h-10' />
                    <h2 className='font-semibold'>Merge staging into production</h2>
                  </div>
                  <div className={`border-l-2 ml-5 mt-2 pl-10 ${environment?.toLocaleLowerCase() === 'production' && 'h-10'}`}>
                    {(environment?.toLocaleLowerCase() === 'staging' && currentStep === 'merge-production') &&
                      <div className='rounded-lg p-4 bg-upsun-black-900'>
                        <p className='mb-2'>Great! You've made the required changes and deployed them to staging. </p>
                        <p className='mb-2'>In the future, any further changes that you want to make can be implemented here or in other preview environments.</p>
                        <p className=''>Return to <code className='px-2 py-1'>upsun demo</code> in your terminal to continue your tour of Upsun.</p>
                      </div>
                    }
                  </div>
                </div>

                <div className={`feature--scale-app flex flex-col ${currentStep !== "scale" && 'is-disabled'}`}>
                  <div className='aside-title flex flex-row gap-4 items-center'>
                    <ScaleIcon className='w-10 h-10' />
                    <h2 className='font-semibold'>Scale app</h2>
                  </div>
                  <div className='border-l-2 ml-5 pl-10'>
                    <div className='rounded-lg p-4 bg-upsun-black-900'>
                      <p className='mb-2'>Whether you have 10 daily visitors or 10,000, with Upsun your app is primed to scale at a moment's notice using the CLI.</p>
                      <code className='px-4 mb-2'>upsun scale:update</code>
                      <p className='mb-2'>To wrap up your tour of Upsun, let’s scale your app. Continue with the following command in your terminal.</p>
                      <code className='px-4 mb-2'>upsun demo:start</code>
                    </div>
                  </div>
                </div>

                <div className={`feature--all-done flex flex-col ${currentStep !== "complete" && 'is-disabled'}`}>
                  <div className='aside-title flex flex-row gap-4 items-center'>
                    <DoneIcon className='w-10 h-10 p-1' />
                    <h2 className='font-semibold'>You did it!</h2>
                  </div>
                  <div className='border-l-2 ml-5 pl-10'>
                    <div className='rounded-lg p-4 bg-upsun-black-900'>
                      <p className='mb-2'>Congratulations! You’ve connected with your database; feel free to store something in it.</p>
                      <p className=''>You can also delete this demo project and bring your own projects here.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer></footer>
      </div>
    </>
  );
}

export default App;
