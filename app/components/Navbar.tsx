'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface NavbarProps {
  darkMode?: boolean
  toggleDarkMode?: () => void
  mobileMenuOpen?: boolean
  setMobileMenuOpen?: (open: boolean) => void
  openAuthModal?: (mode: 'login' | 'signup') => void
}

type MeUser = { id: string; name: string; email: string } | null

export default function Navbar({
  darkMode: _darkMode,
  toggleDarkMode: _toggleDarkMode,
  mobileMenuOpen,
  setMobileMenuOpen,
  openAuthModal
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<MeUser>(null)
  const [authChecked, setAuthChecked] = useState(false)

  const isMobileMenuControlled = typeof mobileMenuOpen === 'boolean' && typeof setMobileMenuOpen === 'function'
  const effectiveMobileMenuOpen = isMobileMenuControlled ? mobileMenuOpen! : internalMobileMenuOpen

  const handleSetMobileMenuOpen = (open: boolean) => {
    if (isMobileMenuControlled) {
      setMobileMenuOpen!(open)
    } else {
      setInternalMobileMenuOpen(open)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const loadMe = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' })
        if (!res.ok) {
          setCurrentUser(null)
          return
        }
        const data = await res.json()
        setCurrentUser(data.user)
      } catch {
        setCurrentUser(null)
      } finally {
        setAuthChecked(true)
      }
    }
    loadMe()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {
      // ignore
    } finally {
      window.location.href = '/'
    }
  }

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/impact', label: 'Impact' },
    { href: '/reports', label: 'Reports' },
    { href: '/donation', label: 'Donation' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
    ...(currentUser ? [{ href: '/dashboard', label: 'Dashboard' }] : []),
  ]

  return (
    <nav className={`navbar fixed w-full z-50 transition-all ${scrolled ? 'py-2 bg-blue-900 shadow-lg' : 'py-4 bg-blue-900'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="logo text-white text-xl font-bold whitespace-nowrap">CompassionConnect</div>

        {/* Desktop Nav Links */}
        <ul className="nav-links hidden md:flex gap-6 lg:gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-white hover:text-orange-300 transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="right-nav flex items-center gap-4">
          {/* Desktop Auth / User Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {authChecked && currentUser ? (
              <>
                <span className="text-sm text-blue-100 max-w-[180px] truncate">
                  Hello, <span className="font-semibold">{currentUser.name}</span>
                </span>
                <Link
                  href="/dashboard"
                  className="border border-white/70 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => openAuthModal && openAuthModal('login')}
                  className="outline-btn border-2 border-white text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={() => openAuthModal && openAuthModal('signup')}
                  className="filled-btn bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div 
            className={`burger-menu md:hidden flex flex-col gap-1.5 cursor-pointer ${effectiveMobileMenuOpen ? 'open' : ''}`}
            onClick={() => handleSetMobileMenuOpen(!effectiveMobileMenuOpen)}
          >
            <span className="line w-6 h-0.5 bg-white transition-all"></span>
            <span className="line w-6 h-0.5 bg-white transition-all"></span>
            <span className="line w-6 h-0.5 bg-white transition-all"></span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu md:hidden absolute top-full left-0 right-0 bg-blue-900 text-center py-6 shadow-lg transition-all ${effectiveMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}>
        <ul className="flex flex-col gap-6 mb-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href} 
                className="text-white text-lg hover:text-orange-300 transition-colors"
                onClick={() => handleSetMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="auth-buttons flex flex-col items-center gap-3">
          {authChecked && currentUser ? (
            <>
              <span className="text-sm text-blue-100">
                Logged in as <span className="font-semibold">{currentUser.name}</span>
              </span>
              <Link
                href="/dashboard"
                onClick={() => handleSetMobileMenuOpen(false)}
                className="border border-white/70 text-white text-sm px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleSetMobileMenuOpen(false)
                  handleLogout()
                }}
                className="text-sm px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => {
                  if (openAuthModal) {
                    openAuthModal('login')
                  }
                  handleSetMobileMenuOpen(false)
                }}
                className="outline-btn border-2 border-white text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => {
                  if (openAuthModal) {
                    openAuthModal('signup')
                  }
                  handleSetMobileMenuOpen(false)
                }}
                className="filled-btn bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}