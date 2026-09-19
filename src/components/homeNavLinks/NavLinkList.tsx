import { homePageNavLinks } from '@/content/navLinks'
import { NavLinkItem } from './NavLinkItem'

export function NavLinkList() {
  return (
    <nav className="mt-8">
      <ul className="flex flex-col gap-4 max-w-md mx-auto">
        {homePageNavLinks.map((link) => (
          <NavLinkItem key={link.href} {...link} />
        ))}
      </ul>
    </nav>
  )
}
