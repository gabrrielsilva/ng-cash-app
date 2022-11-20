import React from 'react';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset',
  text: string,
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element
};

export const Button = ({ type, text, icon }: ButtonProps) => {
  return (
    <button
      type={type}
      className='relative flex justify-center w-full px-4 py-2 text-[16px] font-medium text-black border border-transparent bg-primary  rounded-lg group hover:bg-primary/80 focus:outline-none focus:ring-primary'
    >
      <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
        {React.createElement(icon, { className: 'w-5 h-5 text-black group-hover:text-black', 'aria-hidden': true })}
      </span>
      { text }
    </button>
  );
};
