import React from 'react';
import { ReactComponent as Logo } from '../assets/logo/upsun_horizontal.svg';
import ShareButton from '../components/share';

function Header() {
  return (
    <header className='p-12 flex flex-row justify-between items-center'>
      <div className="flex flex-row inline-flex items-center gap-6">
        <Logo className="logo w-[7rem] flex h-[2rem] p-0 justify-center items-center" title="Powered by Upsun" />
        <span className='font-sans-strong text-sm font-medium'>Demo project</span>
        <span className='font-sans-strong text-sm font-normal pl-[1.5rem] pr-[1.125rem] border-l-[1px] border-upsun-black-900'>Powered by Platform.sh</span>
      </div>
      <div className='pull-right'><ShareButton /></div>
    </header>
  );
}

export default Header;
