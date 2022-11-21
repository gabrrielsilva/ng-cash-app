'use client'

/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react'
import { useContext } from 'react'
import { Brand } from '../../component/Brand'
import { AuthContext } from '../../context/AuthContext'
import '../../style/globals.css'
import { CardHeading } from './CardHeading'
import { MobileMenuButton } from './MobileMenuButton'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <div className="h-full min-h-screen bg-[#f24f70]">
        <div className="pb-48 bg-indigo-900">
          <Disclosure as="nav" className="bg-indigo-900">
            {({ open }) => (
              <>
                <div className="pt-5 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                      <div className="flex items-center">
                        <Brand />
                      </div>
                      <div className="hidden md:block">
                        <CardHeading user={user} logoutFunc={logout} />
                      </div>
                      <div className="flex -mr-2 md:hidden">
                        <MobileMenuButton open={open} />
                      </div>
                    </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className='p-4'>
                    <CardHeading user={user} logoutFunc={logout} />
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        <main className="-mt-40">
          <div className="px-4 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="px-5 py-6 bg-white rounded-lg shadow sm:p-10">
              { children }
            </div>
          </div>
        </main>
      </div>
    </>
  )
}