import React from 'react';
import PageShell from '../components/PageShell';

export default function DonatePage() {
  return (
    <PageShell>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24">
        <div className="absolute inset-0 bg-[url('/images/disaster-relief.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Support Our Life-Saving Mission</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Every donation helps us provide critical aid to communities affected by disasters worldwide
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-blue-800 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-2">
            <span>Monthly Goal: $50,000</span>
            <span>42%</span>
          </div>
          <div className="w-full bg-blue-900 rounded-full h-4">
            <div className="bg-orange-500 h-4 rounded-full" style={{ width: '42%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Donation Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg flex-1">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Make a Donation</h2>
            
            {/* Donation Type Toggle */}
            <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
              <button className="flex-1 py-3 px-4 rounded-md font-medium bg-white shadow-sm text-blue-900">
                One-Time
              </button>
              <button className="flex-1 py-3 px-4 rounded-md font-medium text-gray-600">
                Monthly
              </button>
            </div>

            {/* Amount Options */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Select Amount</h3>
              <div className="grid grid-cols-3 gap-4">
                {[25, 50, 100, 250, 500, 1000].map((amount) => (
                  <button
                    key={amount}
                    className="p-4 text-center font-medium bg-white border-2 border-blue-100 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all focus:bg-blue-600 focus:text-white focus:border-blue-600"
                  >
                    ${amount}
                  </button>
                ))}
                <button className="col-span-3 p-4 text-center font-medium bg-white border-2 border-blue-100 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all">
                  Custom Amount
                </button>
              </div>
            </div>

            {/* Payment Form */}
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email"
                  placeholder="Your email address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <div className="flex gap-4 mb-4">
                  <button type="button" className="p-3 border rounded-lg hover:bg-gray-50">
                    <span className="text-xl">💳</span> Card
                  </button>
                  <button type="button" className="p-3 border rounded-lg hover:bg-gray-50">
                    <span className="text-xl">🏦</span> Bank
                  </button>
                  <button type="button" className="p-3 border rounded-lg hover:bg-gray-50">
                    <span className="text-xl">📱</span> PayPal
                  </button>
                </div>

                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Card Number" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input 
                      type="text" 
                      placeholder="CVV" 
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="cover-fees"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="cover-fees" className="ml-2 block text-sm text-gray-700">
                  I'd like to cover the processing fees so 100% of my donation goes to relief efforts
                </label>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors text-lg shadow-md hover:shadow-lg"
              >
                Donate Now
              </button>

              <p className="text-xs text-gray-500 text-center">
                Your donation is secure and tax-deductible. <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </p>
            </form>
          </div>

          {/* Impact Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg flex-1">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">How Your Donation Helps</h2>
            
            <div className="space-y-8 mb-8">
              {[
                { 
                  icon: '🛡️', 
                  title: 'Emergency Protection', 
                  desc: '$50 provides emergency shelter and basic protection for a family displaced by disaster',
                  color: 'bg-blue-100'
                },
                { 
                  icon: '🍲', 
                  title: 'Nutrition Support', 
                  desc: '$100 feeds a family of four for two weeks with nutritious meals',
                  color: 'bg-orange-100'
                },
                { 
                  icon: '💧', 
                  title: 'Clean Water', 
                  desc: '$25 provides clean drinking water for 10 people for a week',
                  color: 'bg-green-100'
                },
                { 
                  icon: '🏥', 
                  title: 'Medical Aid', 
                  desc: '$150 provides a medical kit to treat 50 people for common injuries and illnesses',
                  color: 'bg-red-100'
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className={`${item.color} p-3 rounded-full`}>
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-4 text-blue-900">Donor Stories</h3>
              <div className="space-y-4">
                <div>
                  <p className="italic mb-2">"After seeing the impact of my donation during the hurricane relief, I became a monthly donor. Knowing I'm helping families rebuild keeps me motivated."</p>
                  <p className="font-medium">- Sarah K., Monthly Donor</p>
                </div>
                <div>
                  <p className="italic mb-2">"The transparency reports showed exactly how my money was used to provide clean water. I'll definitely donate again."</p>
                  <p className="font-medium">- Michael T., One-Time Donor</p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-bold text-lg mb-4 text-blue-900">Your Donation is Secure</h3>
              <div className="flex flex-wrap gap-4">
                <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>256-bit SSL Encryption</span>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Tax-Deductible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Impact Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Recent Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                stat: "15,000+", 
                desc: "People provided with emergency shelter last month" 
              },
              { 
                stat: "2M+", 
                desc: "Meals served to disaster-affected families" 
              },
              { 
                stat: "500+", 
                desc: "Medical volunteers deployed worldwide" 
              }
            ].map((item, index) => (
              <div key={index} className="bg-blue-800 p-6 rounded-lg text-center">
                <p className="text-4xl font-bold mb-2">{item.stat}</p>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </PageShell>
  );
}