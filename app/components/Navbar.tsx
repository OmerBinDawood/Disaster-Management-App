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

export default function Navbar({
  darkMode,
  toggleDarkMode,
  mobileMenuOpen,
  setMobileMenuOpen,
  openAuthModal
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [internalDarkMode, setInternalDarkMode] = useState(false)
  const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false)

  const isDarkModeControlled = typeof darkMode === 'boolean' && typeof toggleDarkMode === 'function'
  const isMobileMenuControlled = typeof mobileMenuOpen === 'boolean' && typeof setMobileMenuOpen === 'function'

  const effectiveDarkMode = isDarkModeControlled ? darkMode! : internalDarkMode
  const effectiveMobileMenuOpen = isMobileMenuControlled ? mobileMenuOpen! : internalMobileMenuOpen

  const handleToggleDarkMode = () => {
    if (isDarkModeControlled) {
      toggleDarkMode!()
    } else {
      setInternalDarkMode((prev) => !prev)
    }
  }

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

  return (
    <nav className={`navbar fixed w-full z-50 transition-all ${scrolled ? 'py-2 bg-blue-900 shadow-lg' : 'py-4 bg-blue-900'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="logo text-white text-xl font-bold">CompassionConnect</div>

        {/* Desktop Nav Links */}
        <ul className="nav-links hidden md:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-white hover:text-orange-300 transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="right-nav flex items-center gap-6">
          <button 
            onClick={handleToggleDarkMode}
            className="text-white text-xl hover:scale-110 transition-transform"
          >
            {effectiveDarkMode ? (
              <i className="fas fa-sun"></i>
            ) : (
              <i className="fas fa-moon"></i>
            )}
          </button>

          {/* Desktop Auth Buttons */}
          <div className="auth-buttons hidden md:flex gap-3">
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
          {navLinks.map((link) => (
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

        <div className="auth-buttons flex justify-center gap-3">
          <button 
            onClick={() => {
              openAuthModal && openAuthModal('login')
              handleSetMobileMenuOpen(false)
            }}
            className="outline-btn border-2 border-white text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            Login
          </button>
          <button 
            onClick={() => {
              openAuthModal && openAuthModal('signup')
              handleSetMobileMenuOpen(false)
            }}
            className="filled-btn bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  )
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/impact', label: 'Impact' },
   { href: '/reports', label: 'Reports' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]