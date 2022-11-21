import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/solid'

type MobileMenuButtonProps = {
  open: boolean
}

export const MobileMenuButton = ({ open }: MobileMenuButtonProps) => {
  return (
    <Disclosure.Button className="inline-flex items-center justify-center p-2 text-white rounded-md focus:outline-none">
      <span className="sr-only">Open main menu</span>
      {open ? <XIcon className="block w-6 h-6" aria-hidden="true" /> :  <MenuIcon className="block w-6 h-6" aria-hidden="true" />}
    </Disclosure.Button>
  )
}