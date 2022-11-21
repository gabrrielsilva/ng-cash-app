import { LogoutIcon } from '@heroicons/react/solid'
import { Button } from '../../component/Button'

type CardHeadingProps = {
  user: { username: string, accountId: string },
  logoutFunc: () => void
}

export const CardHeading = ({ user, logoutFunc }: CardHeadingProps) => {
  return (
    <div className='flex items-center justify-between space-x-3'>
      <div className='flex flex-col items-end truncate'>
        <span className='text-sm font-bold text-white capitalize'>{user?.username}</span>
        <span className='text-xs font-medium text-white'>{user?.accountId}</span>
      </div>
      <Button type='button' onClick={logoutFunc} icon={LogoutIcon} text={'Logout'} extraStyles={'text-white bg-white/10'} />
    </div>
  )
}