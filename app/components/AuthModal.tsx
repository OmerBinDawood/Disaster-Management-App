'use client'
import { useState } from 'react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'login' | 'signup'
  setMode: (mode: 'login' | 'signup') => void
}

const COUNTRY_CITY_DATA: Record<string, string[]> = {
  Pakistan: ['Karachi', 'Lahore', 'Islamabad', 'Peshawar', 'Quetta'],
  Turkey: ['Istanbul', 'Ankara', 'Gaziantep', 'Kahramanmaraş', 'Antakya'],
  'United States': ['New York', 'Los Angeles', 'Houston', 'Miami', 'Chicago'],
  India: ['Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Kolkata'],
  'United Kingdom': ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Leeds'],
}

const COUNTRY_OPTIONS = Object.keys(COUNTRY_CITY_DATA).sort()

export default function AuthModal({ isOpen, onClose, mode, setMode }: AuthModalProps) {
  const countries = COUNTRY_OPTIONS
  const [cities, setCities] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value
    setSelectedCountry(country)
    setSelectedCity('')
    if (country) {
      setCities(COUNTRY_CITY_DATA[country] ?? [])
    } else {
      setCities([])
    }
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value)
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-[2000] flex items-center justify-center p-4" aria-modal="true" role="dialog">
        <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6">
              {mode === 'login' ? 'Login' : 'Sign Up'}
            </h2>

            <div className={`auth-forms ${mode === 'login' ? 'block' : 'hidden'}`}>
              <form className="space-y-4">
                <div>
                  <label htmlFor="login-email" className="block mb-1">Email</label>
                  <input 
                    type="email" 
                    id="login-email" 
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="login-password" className="block mb-1">Password</label>
                  <input 
                    type="password" 
                    id="login-password" 
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Login
                </button>
              </form>

              <div className="social-login mt-6 space-y-3">
                <button className="w-full bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                  <i className="fab fa-google"></i>
                  Login with Google
                </button>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                  <i className="fab fa-facebook-f"></i>
                  Login with Facebook
                </button>
                <button className="w-full bg-gray-700 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                  <i className="fab fa-github"></i>
                  Login with GitHub
                </button>
              </div>

              <p className="mt-4 text-center">
                Don't have an account?{' '}
                <button 
                  onClick={() => setMode('signup')}
                  className="text-blue-600 hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </div>

            <div className={`auth-forms ${mode === 'signup' ? 'block' : 'hidden'}`}>
              <form className="space-y-4">
                <div>
                  <label htmlFor="signup-name" className="block mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="signup-name" 
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="signup-email" className="block mb-1">Email</label>
                  <input 
                    type="email" 
                    id="signup-email" 
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="signup-password" className="block mb-1">Password</label>
                  <input 
                    type="password" 
                    id="signup-password" 
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="signup-phone" className="block mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    id="signup-phone" 
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="+1234567890"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block mb-1">Country</label>
                  <select 
                    id="country" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="city" className="block mb-1">City</label>
                  <select 
                    id="city" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={!selectedCountry || cities.length === 0}
                    required
                    value={selectedCity}
                    onChange={handleCityChange}
                  >
                    <option value="">
                      {!selectedCountry ? 'Select country first' : 'Select City'}
                    </option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Sign Up
                </button>
              </form>

              <div className="social-login mt-6 space-y-3">
                <button className="w-full bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                  <i className="fab fa-google"></i>
                  Sign Up with Google
                </button>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                  <i className="fab fa-facebook-f"></i>
                  Sign Up with Facebook
                </button>
                <button className="w-full bg-gray-700 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                  <i className="fab fa-github"></i>
                  Sign Up with GitHub
                </button>
              </div>

              <p className="mt-4 text-center">
                Already have an account?{' '}
                <button 
                  onClick={() => setMode('login')}
                  className="text-blue-600 hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}