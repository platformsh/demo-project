import React, { ButtonHTMLAttributes } from 'react';
import {ReactComponent as StartIcon} from '../assets/utility/key_start.svg';

type StartButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const StartButton: React.FC<StartButtonProps> = (props) => {
  return (
    <button {...props}>
        <StartIcon className="h-full w-full" />
  </button>
  );
}

export default StartButton;
