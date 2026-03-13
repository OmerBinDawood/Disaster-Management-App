import PageShell from '../components/PageShell';

export default function VolunteerPage() {
  return (
    <PageShell>
      <div className="min-h-screen bg-white py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Join Our Volunteer Network</h1>
            <p className="text-xl text-gray-600">
              Help us make a difference in disaster-affected communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Volunteer Opportunities</h2>
              <div className="space-y-6">
                {[
                  ["On-Site Relief", "Directly assist in affected areas"],
                  ["Remote Support", "Coordinate efforts from anywhere"],
                  ["Medical Teams", "Licensed professionals only"],
                  ["Tech Volunteers", "Help maintain our platform"]
                ].map(([title, desc], i) => (
                  <div key={i} className="border-b pb-4">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="text-gray-600">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">Apply Now</h2>
              <p className="mb-6">
                Complete our volunteer application form to get started. We'll match
                your skills with the most critical needs.
              </p>
              <button className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors">
                Begin Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}