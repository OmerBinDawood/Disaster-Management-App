import Image from 'next/image';
import PageShell from '../components/PageShell';

export default function AboutPage() {
  return (
    <PageShell>
      {/* Hero Section */}
      <section className="relative h-96 bg-blue-900 flex items-center justify-center">
        <div className="text-center text-white px-4 z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our Mission</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Leveraging technology to revolutionize disaster response worldwide
          </p>
        </div>
        <div className="absolute inset-0 bg-black/50"></div>
        <Image 
          src="/images/disaster-response-team.jpg"
          alt="Disaster response team in action"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Mission Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image 
                src="/images/hero-bg.jpg" 
                alt="Team helping disaster victims"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <p className="text-lg mb-4">
                Founded in 2023 after witnessing devastating delays in disaster response, 
                our platform connects victims with help in real-time.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Served 500,000+ people globally",
                  "Partnered with 120+ organizations",
                  "90% faster response times"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Story Section - Inspired by Edhi */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Inspiration</h2>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <Image
                  src="/images/founder.jpeg"
                  alt="Our founder helping disaster victims"
                  width={300}
                  height={300}
                  className="rounded-full border-4 border-blue-100"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">A Vision Forged in Crisis</h3>
                <p className="mb-4">
                  Like Abdul Sattar Edhi who started with a single ambulance, our founder witnessed the devastating 
                  2022 floods that left millions stranded without help. Seeing families waiting days for basic 
                  supplies sparked a determination to create systemic change.
                </p>
                <p className="mb-4">
                  "We cannot wait for disasters to happen before we prepare. The technology exists to connect 
                  those in need with those who can help - we just needed to build the bridge." - Founder
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="italic">
                    "The lesson I learned from Edhi's life was simple: help without condition, serve without expectation."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "⚡",
              title: "Speed",
              description: "We measure response time in minutes, not days. Every second counts when lives are at stake."
            },
            {
              icon: "❤️",
              title: "Compassion",
              description: "We treat every victim as family. Dignity and care guide every interaction."
            },
            {
              icon: "🌐",
              title: "Inclusivity",
              description: "Our systems work for everyone, regardless of language, ability, or location."
            }
          ].map((value, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-blue-500">
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Global Network</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "2,500+", label: "Trained Volunteers" },
              { number: "45", label: "Countries Served" },
              { number: "24/7", label: "Response Center" },
              { number: "120+", label: "Partner Organizations" }
            ].map((stat, index) => (
              <div key={index} className="p-6 bg-blue-800 rounded-lg">
                <p className="text-4xl font-bold mb-2">{stat.number}</p>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're a responder, developer, or concerned citizen - we need your help to save lives.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors">
              Volunteer Now
            </button>
            <button className="px-8 py-3 bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 rounded-lg font-bold transition-colors">
              Partner With Us
            </button>
          </div>
        </div>
      </section>

    </PageShell>
  );
}