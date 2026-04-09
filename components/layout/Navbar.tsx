'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const isAbout = pathname === '/about' || pathname === '/'

  return (
    <nav>
      <div className="nav-inner">
        <Link href="/about" className="nav-logo">prateek.padhy</Link>
        <div className="nav-links">
          <Link href="/blog" className={pathname.startsWith('/blog') ? 'nav-active' : ''}>
            Blog
          </Link>
          {isAbout ? (
            <>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </>
          ) : (
            <Link href="/about">Portfolio</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
