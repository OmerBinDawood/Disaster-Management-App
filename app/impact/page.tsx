import PageShell from '../components/PageShell';

const impactStats = [
  { label: 'People Reached with Aid', value: '500,000+', accent: 'bg-green-100' },
  { label: 'Countries Supported', value: '45', accent: 'bg-blue-100' },
  { label: 'Volunteers Deployed', value: '2,500+', accent: 'bg-orange-100' },
  { label: 'Meals Served', value: '2M+', accent: 'bg-amber-100' },
];

const recentMissions = [
  {
    name: 'Turkey Earthquake Response',
    location: 'Gaziantep, Turkey',
    impact: [
      '50+ medical teams deployed',
      '20,000 emergency kits distributed',
      'Temporary shelters for 12,000 people',
    ],
  },
  {
    name: 'Pakistan Flood Relief',
    location: 'Sindh & Balochistan, Pakistan',
    impact: [
      '1.2M meals provided',
      '200,000 tents and tarps distributed',
      'Clean water access for 80,000 people',
    ],
  },
];

export default function ImpactPage() {
  return (
    <PageShell>
      <section className="section-padding bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="container max-w-5xl mx-auto text-center space-y-6">
          <p className="badge">Impact Dashboard</p>
          <h1 className="section-title text-white">
            Real Stories. Real People. Real Impact.
          </h1>
          <p className="section-subtitle text-blue-100">
            A snapshot of how your support is transforming disaster-hit communities across the globe.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-10">Key Metrics</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className={`card-soft text-center border-t-4 border-blue-500 ${stat.accent}`}
              >
                <p className="text-3xl font-extrabold text-blue-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container max-w-6xl mx-auto space-y-10">
          <div className="text-center">
            <h2 className="section-title">Recent Missions</h2>
            <p className="section-subtitle">
              Each operation represents thousands of volunteers, partners, and donors working together.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {recentMissions.map((mission) => (
              <article key={mission.name} className="card-soft border-l-4 border-orange-500">
                <h3 className="text-xl font-bold text-blue-900 mb-1">
                  {mission.name}
                </h3>
                <p className="text-sm font-medium text-blue-600 mb-4">
                  {mission.location}
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {mission.impact.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 text-green-500">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

