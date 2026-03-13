import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer bg-gradient-to-r from-blue-900 to-blue-800 text-white pt-20 pb-10 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="footer-grid grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="footer-about">
            <div className="footer-logo text-2xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent mb-4">
              CompassionConnect
            </div>
            <p className="text-blue-200 mb-6">
              The world's first AI-powered disaster relief network connecting victims, NGOs, volunteers, and donors in real-time.
            </p>
            <div className="social-links flex gap-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.icon} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                >
                  <i className={`fab fa-${link.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="footer-links">
              <h3 className="text-lg font-semibold mb-4 relative pb-2">
                {section.title}
                <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-blue-500"></span>
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-blue-200 hover:text-white transition-colors inline-block py-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom border-t border-blue-700 pt-6 text-center text-blue-300 text-sm">
          <p>© 2023 CompassionConnect. All rights reserved. | <Link href="#" className="hover:text-white">Privacy Policy</Link> | <Link href="#" className="hover:text-white">Terms of Service</Link></p>
        </div>
      </div>
    </footer>
  )
}

const socialLinks = [
  { icon: 'twitter' },
  { icon: 'facebook-f' },
  { icon: 'linkedin-in' },
  { icon: 'instagram' }
]

const footerSections = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Live Crisis Map', href: '/' },
      { label: 'Volunteer Portal', href: '/volunteer' },
      { label: 'Donation Hub', href: '/donation' },
      { label: 'Transparency Reports', href: '/' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Emergency Plans', href: '/' },
      { label: 'Disaster Prep Quiz', href: '/' },
      { label: 'Training Events', href: '/' },
      { label: 'Find Shelters', href: '/' },
      { label: 'API Documentation', href: '/' }
    ]
  },
  {
    title: 'Organization',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/about' },
      { label: 'Careers', href: '/' },
      { label: 'Financials', href: '/' },
      { label: 'Contact', href: '/contact' }
    ]
  }
]