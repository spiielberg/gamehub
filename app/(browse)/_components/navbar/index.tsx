import { Actions } from '@/app/(browse)/_components/navbar/actions'
import { Logo } from '@/app/(browse)/_components/navbar/logo'
import { Search } from '@/app/(browse)/_components/navbar/search'

export const Navbar = () => {
  return (
    <nav className="fixed top-0 z-[49] flex h-16 w-full items-center justify-between border-b border-b-black bg-[#252731] px-2 shadow-sm lg:px-4">
      <Logo />
      <Search />
      <Actions />
    </nav>
  )
}
