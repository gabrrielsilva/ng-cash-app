import { HTMLInputTypeAttribute } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import classNames from '../util/classNames';

type FormProps = {
  field: string,
  register: UseFormRegister<FieldValues>,
  type: HTMLInputTypeAttribute,
  minLength: number,
  disabled?: boolean,
  onFocus?: any,
  extraStyles?: string
};

export const FormInput = ({ field, register, type, minLength, disabled, onFocus, extraStyles }: FormProps) => {
  return (
    <div>
      <label htmlFor={field} className='sr-only'>
        {field}
      </label>
      <input
        {...register(field)}
        type={type}
        autoComplete={field}
        minLength={minLength}
        disabled={disabled}
        onFocus={onFocus}
        required
        className={classNames('relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm', extraStyles)}
        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
      />
    </div>
  );
};
