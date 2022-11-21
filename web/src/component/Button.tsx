import React from 'react';
import classNames from '../util/classNames';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset',
  extraStyles: string,
  disabled?: boolean,
  onClick?: () => void;
  text?: string,
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element,
};

export const Button = ({ type, text, onClick, icon, disabled, extraStyles }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classNames('relative space-x-2 flex items-center justify-center py-1 px-2 h-10 text-sm font-medium border border-transparent rounded-lg group focus:outline-none', extraStyles)}
    >
      {icon && (
        <span className='flex items-center'>
          {React.createElement(icon, { className: 'w-5 h-5', 'aria-hidden': true })}
        </span>
      )}
      {text && <span>{ text }</span> }
    </button>
  );
};
