'use client'

import { LoginIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../component/Button';
import { FormInput } from '../../component/FormInput';
import { Title } from '../../component/Title';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  const { register: registerField, handleSubmit } = useForm();
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [validCredentials, setValidCredentials] = useState<boolean>(!!errorMessage);
  
  async function handleLogin ({ username, password }) {
    try {
      await login({ username, password });
      setValidCredentials(true);
    } catch (e) {
      setErrorMessage(e?.response?.data?.message);
    }
  }

  function clearErrors () {
    setErrorMessage(null);
  }

  return (
    <>
      <div className='flex items-center justify-center h-full min-h-screen px-4 py-12 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-indigo-700 via-indigo-900 to-indigo-700 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          <Title text='Login to your Account' />
          <Link href='/'>
            <span className='text-sm font-semibold cursor-pointer hover:underline text-primary'>Or create your account NG.CASH</span>
          </Link>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit(handleLogin)} >
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='-space-y-px shadow-sm rounded-xl'>
              <FormInput type={'text'} field={'username'} register={registerField} minLength={3} onFocus={clearErrors} extraStyles='rounded-t-lg' />
              <FormInput type={'password'} field={'password'} register={registerField} minLength={8} onFocus={clearErrors} extraStyles='rounded-b-lg' />
            </div>
            {errorMessage ? <span className='text-sm font-semibold text-red-600 '>Opps... {errorMessage}</span> : ''}
            {!errorMessage && validCredentials ? <span className='text-sm font-semibold text-blue-500 '>Redirecionando...</span> : ''}
            <Button type='submit' text='Login' icon={LoginIcon} extraStyles={'w-full bg-primary hover:bg-primary/80 text-black'} />
          </form>
        </div>
      </div>
    </>
  );
}