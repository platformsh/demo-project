import React, { useEffect, useState } from 'react';
import { ENVIRONMENT_PATH, fetchEnvironment } from './utility/api';
import { ReactComponent as RedisIcon } from './assets/utility/service_redis.svg';
import { ReactComponent as ScaleIcon } from './assets/utility/scale_app.svg';
import { ReactComponent as DoneIcon } from './assets/utility/done.svg';
import { ReactComponent as MergeIcon } from './assets/utility/merge.svg';
import { API_BASE_PATH } from './config';
import ErrorPage from './page/ErrorPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FeatureStep from './components/FeatureStep';

function App() {
  const [environment, setEnvironment] = useState<string | null>(null);
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


  if (fatalErrorMessage)
    return <ErrorPage header="We cannot fetch your data">
      <p className='mb-2'> There was an error fetching data from your Python backend at <code className='px-2 py-1'>{API_BASE_PATH}/{ENVIRONMENT_PATH}</code></p>
      <p className=''> Please check your app logs using <code className='px-2 py-1'>upsun environment:log</code></p>
    </ErrorPage>

  return (
    <>
      <div className={`max-w-[83.875rem] w-[83.875rem] m-auto transition duration-500`}>
        <Header />
        <main className='border-t-[1px] border-upsun-violet-600 flex flex-row'>
          <Sidebar environment={environment} sessionStorageType={sessionStorageType} appInstances={appInstances} />
          <section className='border-t-2 border-upsun-violet-600 w-3/4'>
            <div className='content-intro w-3/4 mx-auto mt-12'>
              <div className="welcome-message flex p-4 justify-center items-center space-x-2.5 rounded-md border border-upsun-violet-600 bg-upsun-violet-900 font-mono text-xs leading-6 ">Welcome to your Upsun app, a Python and Node.js multiapp designed to run on Upsun and teach you about it's unique features.</div>

              <EnvironmentIntroduction environment={environment} />

              <div className='pt-8 flex flex-col gap-2'>
                <FeatureStep data-testid='add-redis' icon={<RedisIcon className='w-10 h-10' />} title={'Add Redis to staging'} isDisabled={currentStep !== 'redis'}>
                  <p className='mb-2'>With Upsun, you can clone any environment to get a byte-for-byte copy to use for staging, features, and bugfixes.</p>
                  <p className='mb-2'>Upsun is unique in that you can version-control your app services—MariaDB, Redis, and more.</p>
                  <p className='mb-2'>We'll guide you through adding a Redis service and merging back into production. Simply run: </p>
                  <code className='px-4'>upsun demo:start</code>
                </FeatureStep>

                <FeatureStep icon={<MergeIcon className='w-10 h-10' />} title={'Merge staging into production'} isDisabled={!(currentStep === 'merge-production')}>
                  {
                    (sessionStorageType ==='redis' || (environment?.toLocaleLowerCase() === 'staging' && currentStep === 'merge-production')) &&
                    <>
                      <p className='mb-2'>Great! You've made the required changes and deployed them to {environment?.toLocaleLowerCase()}.</p>
                      <p className='mb-2'>In the future, any further changes that you want to make can be implemented here or in other preview environments.</p>
                      <p className=''>Return to <code className='px-2 py-1'>upsun demo</code> in your terminal to continue your tour of Upsun.</p>
                    </>
                  }
                </FeatureStep>

                <FeatureStep icon={<ScaleIcon className='w-10 h-10' />} title={'Scale app'} isDisabled={currentStep !== "scale"}>
                  <p className='mb-2'>Whether you have 10 daily visitors or 10,000, with Upsun your app is primed to scale at a moment's notice using the CLI.</p>
                  <code className='px-4 mb-2'>upsun scale:update</code>
                  <p className='mb-2'>To wrap up your tour of Upsun, let’s scale your app. Continue with the following command in your terminal.</p>
                  <code className='px-4 mb-2'>upsun demo:start</code>
                </FeatureStep>

                <FeatureStep icon={<DoneIcon className='w-10 h-10 p-1' />} title={'You did it!'} isDisabled={currentStep !== "complete"}>
                  <p className='mb-2'>Congratulations! You’ve connected with your database; feel free to store something in it.</p>
                  <p className=''>You can also delete this demo project and bring your own projects here.</p>
                </FeatureStep>
              </div>
            </div>
          </section>
        </main>
        <footer></footer>
      </div>
    </>
  );
}

interface EnvironmentIntroductionProps {
  environment: string | null
}

const EnvironmentIntroduction: React.FC<EnvironmentIntroductionProps> = ({ environment }) => {
  if (environment === null)
    return <></>

  return <>
    {environment && environment.toLocaleLowerCase() === 'production' ?
      <ProductionIntroduction />
      : <StagingIntroduction />
    }
  </>
}

const ProductionIntroduction = () => {
  return <p className='text-sm leading-6 mt-2'>
    This app is the React frontend of your demo project’s production environment. In your other projects, use the runtimes you prefer—Python, Node.js, PHP, and more. The net: your production environment will show up in search results. You’ll point your domain name to it. And that’s what will be visible to users. Your team can use a Git-branch workflow to create byte-for-byte copies of production (preview environments) to begin development.
  </p>
}

const StagingIntroduction = () => {
  return <>
    <p className='text-sm leading-6 mt-2'>Congrats! You’ve created your staging environment 🎉</p>
    <p className='text-sm leading-6 mt-2'>This space represents your byte-for-byte copy of production. You can use staging and development environments to preview and share changes prior to pushing them to production.</p>
    <p className='text-sm leading-6 mt-2'>This app uses the Upsun environment variable <code className='px-2 py-1'>$UPSUN_ENVIRONMENT="staging"</code> to modify the content of this page.</p>
    <p className='text-sm leading-6 mt-2'>Return to the <code className='px-2 py-1'>upsun demo</code> command to continue adding your Redis service.</p>
  </>;
}


export default App;
