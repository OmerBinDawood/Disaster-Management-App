'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'

const DisasterMap = dynamic(() => import('./components/DisasterMap'), {
  ssr: false,
  loading: () => <div className="h-[500px] flex items-center justify-center">Loading map...</div>
})

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')

  useEffect(() => {
    const savedMode = localStorage.getItem('dark-theme') === 'enabled'
    setDarkMode(savedMode)
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('dark-theme', newMode ? 'enabled' : 'disabled')
  }

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark-theme' : ''}`} suppressHydrationWarning>
      <Head>
        <title>CompassionConnect - Disaster Relief</title>
      </Head>

      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        openAuthModal={openAuthModal}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className="hero-section h-screen flex items-center justify-center text-center text-white bg-cover bg-center relative"
          style={{
            backgroundImage: "linear-gradient(rgba(178, 173, 173, 0.7), rgba(194, 194, 194, 0.7)), url('/images/hero-bg.jpg')"
          }}
        >
          <div className="relative z-10 px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4">Emergency Disaster Relief</h1>
            <p className="text-xl mb-8">Connecting volunteers, donors, and NGOs for immediate relief efforts.</p>
            <button className="cta-btn bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Get Involved
            </button>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section py-16 bg-gradient-to-b from-blue-50 to-gray-100">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="section-header text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">Our Mission to Change Disaster Response</h2>
              <div className="divider w-20 h-1 bg-black mx-auto"></div>
            </div>

            <div className="mission-grid grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {missionCards.map((card, index) => (
                <div key={index} className="mission-card bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-2 text-center">
                  <span className="text-4xl mb-4 block">{card.icon}</span>
                  <h3 className="text-xl font-bold text-black mb-4">{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>

            <div className="story-container flex flex-col md:flex-row gap-12 items-center mb-16">
              <div className="story-image relative flex-1 min-w-[300px]">
                <img
                  src="/images/hero-bg.jpg"
                  alt="Our team in action"
                  className="w-full rounded-xl shadow-md"
                />
                <div className="impact-badge absolute -bottom-5 -right-5 bg-black text-white p-4 rounded-lg shadow-lg text-center">
                  <span className="count block text-2xl font-bold">500,000+</span>
                  <span className="label">Lives Impacted</span>
                </div>
              </div>

              <div className="story-content flex-1 min-w-[300px]">
                <h3 className="text-2xl font-bold text-black mb-6">Our Story</h3>
                <p className="mb-4">
                  Founded in 2023 after witnessing devastating delays in disaster response, CompassionConnect was built by technologists and humanitarian workers.
                </p>
                <p className="mb-6">We combine real-time data, AI, and global networks to ensure help arrives faster and smarter.</p>
                <button className="story-toggle font-semibold text-black hover:underline">
                  Read More ↓
                </button>
                <div className="hidden-content mt-4 hidden">
                  <p className="mb-2">Our platform evolved through partnerships with first responders in 14 major disasters.</p>
                  <p>Today, we support 350+ NGOs and government agencies worldwide.</p>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="team-section text-center mb-16">
              <h3 className="text-2xl font-bold text-black mb-4">Meet The Founders</h3>
              <p className="subtitle max-w-2xl mx-auto text-gray-600 mb-8">
                A diverse team united by a shared vision of tech for humanitarian good.
              </p>

              <div className="team-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="team-member bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                    <img
                      src="/images/about-team.jpg"
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 mx-auto mb-4 hover:border-gray-400 hover:scale-105 transition-all"
                    />
                    <h4 className="text-lg font-bold">{member.name}</h4>
                    <p className="role font-semibold text-black">{member.role}</p>
                    <p className="bio text-gray-600 text-sm">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Partners Section */}
            <div className="partners-section text-center pt-12 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-black mb-8">Trusted By</h3>
              <div className="partners-grid flex flex-wrap justify-center gap-8 opacity-80 hover:opacity-100 transition-opacity">
                <img src="/images/hero-bg.jpg" alt="United Nations" className="h-12 object-contain grayscale hover:grayscale-0 hover:scale-110 transition-all" />
                <img src="/images/about-team.jpg" alt="Red Cross" className="h-12 object-contain grayscale hover:grayscale-0 hover:scale-110 transition-all" />
              </div>
            </div>
          </div>
        </section>

        {/* Disaster Map Section */}
        <section className="disaster-response-map py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-4">Global Disaster Response</h2>
            <p className="text-center mb-8">View our active disaster relief efforts around the world</p>

            <div className="disaster-map-container relative z-0 h-[65vh] min-h-[400px] max-h-[600px] w-full mx-auto rounded-lg shadow-lg overflow-hidden">
              <DisasterMap />
            </div>
          </div>
        </section>

        {/* Response Efforts Section */}
        <section className="response-efforts py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="section-header text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 flex items-center justify-center gap-2">
                🚑 Active Relief Operations
              </h2>
              <p className="subtitle text-gray-600">
                Our teams currently delivering aid worldwide
              </p>
            </div>

            <div className="response-grid grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {responseEfforts.map((effort, index) => (
                <div key={index} className="response-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform hover:-translate-y-1">
                  <div className={`card-header p-5 text-white relative ${effort.type === 'earthquake' ? 'bg-gradient-to-r from-red-500 to-red-400' : 'bg-gradient-to-r from-blue-500 to-blue-400'}`}>
                    <h3 className="text-xl font-bold">{effort.name}</h3>
                    <div className="status-badge absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                      {effort.status}
                    </div>
                  </div>
                  <div className="card-body p-6 bg-white">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {effort.metrics.map((metric, i) => (
                        <div key={i} className="response-metric">
                          <div className="metric-value text-2xl font-bold text-blue-900">{metric.value}</div>
                          <div className="metric-label text-sm text-gray-600">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="progress-container h-2 bg-gray-200 rounded-full mb-4">
                      <div
                        className="progress-fill h-full rounded-full bg-green-500"
                        style={{ width: `${effort.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cta-container flex flex-wrap justify-center gap-4">
              <button className="cta-button bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Join Our Response Team
              </button>
              <button className="cta-button secondary bg-white text-blue-900 border-2 border-blue-900 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors">
                Donate Supplies
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section py-16 bg-gradient-to-r from-white to-blue-50 relative">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="section-header text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 relative inline-block">
                Get In Touch
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-500 rounded-full"></span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                Whether you need help, want to volunteer, or partner with us, we're here to connect you with the right resources.
              </p>
            </div>


            <div className="contact-grid grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="contact-card emergency bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-2 relative overflow-hidden">
                <div className="contact-icon text-3xl text-red-500 mb-5">
                  <i className="fas fa-life-ring"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Emergency Contacts</h3>
                <p className="text-gray-600 mb-6">Immediate assistance for those in crisis situations</p>
                <ul className="contact-list">
                  <li className="flex items-center mb-3">
                    <i className="fas fa-phone text-blue-500 mr-3"></i>
                    <a href="tel:+18001234567" className="text-blue-700 hover:underline">+1 (800) 123-4567</a>
                  </li>
                  <li className="flex items-center mb-3">
                    <i className="fas fa-sms text-blue-500 mr-3"></i>
                    <span>Text "HELP" to 90999</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-globe text-blue-500 mr-3"></i>
                    <a href="#" className="text-blue-700 hover:underline">International numbers</a>
                  </li>
                </ul>
              </div>

              <div className="contact-card bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-2">
                <form className="contact-form">
                  <div className="form-group mb-6">
                    <label htmlFor="name" className="block font-semibold text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="form-group mb-6">
                    <label htmlFor="email" className="block font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="submit-btn w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition-colors shadow-md hover:shadow-lg"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              <div className="contact-card partners bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-2 relative overflow-hidden">
                <div className="contact-icon text-3xl text-purple-500 mb-5">
                  <i className="fas fa-handshake"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Partnerships</h3>
                <p className="text-gray-600 mb-6">For organizations looking to collaborate</p>
                <ul className="contact-list">
                  <li className="flex items-center mb-3">
                    <i className="fas fa-envelope text-blue-500 mr-3"></i>
                    <a href="mailto:partners@compassionconnect.org" className="text-blue-700 hover:underline">partners@compassionconnect.org</a>
                  </li>
                  <li className="flex items-center mb-3">
                    <i className="fas fa-users text-blue-500 mr-3"></i>
                    <a href="#" className="text-blue-700 hover:underline">NGO Partnership Program</a>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-microphone text-blue-500 mr-3"></i>
                    <a href="mailto:press@compassionconnect.org" className="text-blue-700 hover:underline">press@compassionconnect.org</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        setMode={setAuthMode}
      />
    </div>
  )
}

const missionCards = [
  {
    icon: "🌍",
    title: "Global Reach",
    description: "Connecting communities across 120+ countries with real-time disaster coordination."
  },
  {
    icon: "🤖",
    title: "AI-Powered",
    description: "Using cutting-edge technology to predict needs and optimize resource allocation."
  },
  {
    icon: "❤️",
    title: "Human-Centered",
    description: "Designed with compassion at its core to serve those in greatest need."
  }
]

const teamMembers = [
  {
    name: "Madam Najla Raza",
    role: "CEO & Co-Founder",
    bio: "Former UN Disaster Response Coordinator"
  },
  {
    name: "Omer Bin Dawood",
    role: "CTO & Co-Founder",
    bio: "AI Researcher & Full-Stack Developer"
  },
  {
    name: "Alwaz Islam",
    role: "Head of Partnerships",
    bio: "Former Red Cross Operations Director"
  },
  {
    name: "Putin Khan",
    role: "Head of Product",
    bio: "UX Designer & Humanitarian Specialist"
  }
]

const responseEfforts = [
  {
    name: "Turkey Earthquake",
    type: "earthquake",
    status: "Ongoing",
    metrics: [
      { value: "50", label: "Medical Teams" },
      { value: "75%", label: "Shelter Coverage" },
      { value: "2M", label: "Meals Served" },
      { value: "100+", label: "Medical camps" }
    ],
    progress: 65
  },
  {
    name: "Pakistan Floods",
    type: "flood",
    status: "Critical",
    metrics: [
      { value: "30", label: "Rescue Boats" },
      { value: "1.2M", label: "Meals Served" },
      { value: "200,000", label: "Tents Deployed" },
      { value: "1M", label: "Mosquito Nets" }
    ],
    progress: 82
  }
]