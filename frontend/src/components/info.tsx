import React, { ButtonHTMLAttributes } from 'react';
import {ReactComponent as InfoIcon} from '../assets/utility/key_info.svg';

type InfoButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const InfoButton: React.FC<InfoButtonProps> = (props) => {
  return (
    <button {...props}>
        <InfoIcon className="h-full w-full" />
  </button>
  );
}

export default InfoButton;
