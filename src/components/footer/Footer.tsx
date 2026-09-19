import Link from 'next/link'

export const Footer = () => (
  <footer className="bg-brown-500 border-t border-black/20 px-2 text-center text-xs h-[var(--footer-height)] flex flex-col justify-center">
    <nav aria-label="Legal links" className="flex justify-center gap-4">
      <Link className="underline" href="/terms-and-conditions">
        Terms &amp; Conditions
      </Link>
      <Link className="underline" href="/privacy-policy">
        Privacy Policy
      </Link>
    </nav>
  </footer>
)
