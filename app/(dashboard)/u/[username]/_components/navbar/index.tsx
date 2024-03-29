import { Actions } from '@/app/(dashboard)/u/[username]/_components/navbar/actions'
import { Logo } from '@/app/(dashboard)/u/[username]/_components/navbar/logo'

interface NavbarProps {
  showActions?: boolean
}

export const Navbar = ({ showActions = true }: NavbarProps) => {
  return (
    <nav className="fixed top-0 z-[49] flex h-16 w-full items-center justify-between border-b border-b-black bg-[#252731] px-2 shadow-sm lg:px-4">
      <Logo />
      {showActions && <Actions />}
    </nav>
  )
}
