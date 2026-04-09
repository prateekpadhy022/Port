'use client'

import { useState, useEffect } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id)
        })
      },
      { rootMargin: '-20% 0% -70% 0%' }
    )
    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="toc">
      <p className="toc-title">On this page</p>
      <ul className="toc-list">
        {headings.map(({ id, text, level }) => (
          <li key={id} className={`toc-item toc-h${level}${activeId === id ? ' toc-active' : ''}`}>
            <a href={`#${id}`}>{text}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
