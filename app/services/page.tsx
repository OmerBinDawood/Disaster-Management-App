import PageShell from '../components/PageShell';
import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      title: "Real-Time Alerts",
      description: "Instant notifications via SMS, email, and app push notifications about disasters in your area",
      icon: "🔔",
      features: [
        "Customizable alert thresholds",
        "Multi-channel delivery",
        "Verified official sources only"
      ]
    },
    {
      title: "Volunteer Coordination",
      description: "Efficiently match skilled volunteers with critical needs on the ground",
      icon: "👥",
      features: [
        "Skill-based matching system",
        "Real-time assignment tracking",
        "Safety verification checks"
      ]
    },
    {
      title: "Resource Tracking",
      description: "Comprehensive live inventory of supplies and distribution channels",
      icon: "📊",
      features: [
        "Automated inventory updates",
        "Demand forecasting",
        "Blockchain-verified distribution"
      ]
    },
    {
      title: "Crisis Mapping",
      description: "Interactive real-time maps showing affected areas and resources",
      icon: "🗺️",
      features: [
        "Live satellite imagery",
        "Crowdsourced updates",
        "Heatmap visualization"
      ]
    },
    {
      title: "Family Reunification",
      description: "Secure platform to locate and reconnect separated family members",
      icon: "👨‍👩‍👧‍👦",
      features: [
        "Encrypted personal data",
        "Multi-language support",
        "24/7 helpline integration"
      ]
    },
    {
      title: "Damage Assessment",
      description: "AI-powered analysis of disaster impact and recovery needs",
      icon: "🤖",
      features: [
        "Drone imagery processing",
        "Automated report generation",
        "Priority scoring system"
      ]
    }
  ];

  return (
    <PageShell>
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white py-32">
        <div className="absolute inset-0 bg-[url('/images/disaster-response.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Comprehensive Solutions</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Cutting-edge technology meets humanitarian expertise to deliver life-saving services during crises
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Core Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide end-to-end disaster management solutions trusted by governments and NGOs worldwide
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-2 border-l-4 border-blue-500"
            >
              <div className="text-5xl mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted By Leading Organizations</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Reduced our response time by 40% during the last earthquake",
                author: "UN Disaster Response Team",
                role: "International Organization"
              },
              {
                quote: "The volunteer coordination system saved countless lives during the floods",
                author: "Red Cross Director",
                role: "Humanitarian Organization"
              },
              {
                quote: "Most reliable real-time alert system we've ever used",
                author: "National Emergency Agency",
                role: "Government Body"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
                <p className="text-lg italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Disaster Response?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join hundreds of organizations using our platform to save lives and streamline operations
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-bold text-lg transition-colors">
              Request a Demo
            </button>
            <Link href="/donation" passHref>
              <button className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-blue-800 rounded-lg font-bold text-lg transition-colors">
                Donate Now
              </button>
            </Link>
          </div>
        </div>
      </div>

    </PageShell>
  );
}