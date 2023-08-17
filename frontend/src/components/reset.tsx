import React, { ButtonHTMLAttributes } from 'react';
import {ReactComponent as ResetIcon} from '../assets/utility/key_reset.svg';

type ResetButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const ResetButton: React.FC<ResetButtonProps> = (props) => {
  return (
    <button {...props}>
        <ResetIcon className="h-full w-full" />
  </button>
  );
}

export default ResetButton;
