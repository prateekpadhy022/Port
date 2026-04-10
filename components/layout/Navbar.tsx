'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/ai', label: 'AI Agent' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#0e0e0e]/40 backdrop-blur-xl shadow-[0_0_40px_rgba(133,173,255,0.06)] border-b border-[#484847]/30">
      {/* Logo */}
      <Link
        href="/"
        className="text-xl font-bold tracking-tighter text-white uppercase font-headline select-none"
      >
        ARCHITECT.AI
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8 font-headline tracking-tight text-sm">
        {navLinks.map(({ href, label }) => {
          const active =
            href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={
                active
                  ? 'text-primary'
                  : 'text-on-surface-variant hover:text-on-surface transition-colors'
              }
            >
              {label}
            </Link>
          )
        })}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <button
          aria-label="Terminal"
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">terminal</span>
        </button>

        <Link
          href="/contact"
          className="hidden sm:inline-flex items-center px-5 py-2 rounded-md text-sm font-bold font-headline bg-gradient-to-br from-primary to-[#6c9fff] text-[#002c65] hover:opacity-90 transition-opacity"
        >
          Hire Me
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center text-on-surface-variant"
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="material-symbols-outlined text-[22px]">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-surface-container border-b border-outline-variant py-4 px-8 flex flex-col gap-4 font-headline text-sm">
          {navLinks.map(({ href, label }) => {
            const active =
              href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={active ? 'text-primary' : 'text-on-surface-variant'}
              >
                {label}
              </Link>
            )
          })}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="w-fit px-5 py-2 rounded-md text-sm font-bold bg-gradient-to-br from-primary to-[#6c9fff] text-[#002c65]"
          >
            Hire Me
          </Link>
        </div>
      )}
    </nav>
  )
}
