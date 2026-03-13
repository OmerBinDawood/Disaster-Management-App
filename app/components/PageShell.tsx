'use client'

import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

interface PageShellProps {
  children: ReactNode
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}

