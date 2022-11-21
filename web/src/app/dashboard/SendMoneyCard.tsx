'use client'

import { PaperAirplaneIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../component/Button';
import { FormInput } from '../../component/FormInput';
import { api } from '../../service/api';

export const SendMoneyCard = () => {
  const { register, handleSubmit, formState: { isSubmitting }, reset } = useForm();
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const router = useRouter();
  async function handleSendMoney ({ username, amount }: { username: string, amount: number }) {
    try {
      await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/transact`, {
        username,
        value: amount
      })
      reset({ username: '', amount: '' });
      router.refresh();
    } catch (e) {
      setErrorMessage(e?.response?.data?.message);
    }
  }

  function clearErrors () {
    setErrorMessage(null)
  }

  return (
    <div className='w-full pt-8'>
      <form onSubmit={handleSubmit(handleSendMoney)}>
        <div className='space-y-5'>
          <label className='text-xl font-semibold'>Send money to:</label>
          <div className='grid items-end grid-cols-2 gap-3'>
            <FormInput type={'text'} register={register} field={'username'} minLength={3} onFocus={clearErrors} disabled={isSubmitting} />
            <FormInput type={'text'} register={register} field={'amount'} minLength={0} onFocus={clearErrors} disabled={isSubmitting} />
          </div>
          {errorMessage && <span className='text-sm font-semibold text-red-600'>Opps... {errorMessage}</span>}
          <Button type='submit' icon={PaperAirplaneIcon} text={'Send'} extraStyles={'w-full text-lg bg-primary hover:bg-primary/80'} disabled={isSubmitting} />
        </div>
      </form>
    </div>
  )
}