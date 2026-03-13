import PageShell from '../components/PageShell';

const faqs = [
  {
    question: 'How does CompassionConnect respond to a new disaster?',
    answer:
      'We ingest early-warning signals, verify incidents with trusted partners, then activate local volunteer networks, logistics providers, and NGOs through our coordination platform.',
  },
  {
    question: 'Can individuals request help directly?',
    answer:
      'Yes. Affected individuals can submit verified requests through partner hotlines, SMS campaigns, or local NGO intake forms that feed into our system.',
  },
  {
    question: 'How are donations used during emergencies?',
    answer:
      'Funds are prioritized for rapid relief: medical kits, food, clean water, shelter, and secure digital tools used by responders in the field.',
  },
  {
    question: 'Do you work with governments and official agencies?',
    answer:
      'We collaborate with national disaster agencies, UN clusters, and municipal authorities to avoid duplication and fill critical gaps.',
  },
];

export default function FaqPage() {
  return (
    <PageShell>
      <section className="section-padding bg-blue-900 text-white">
        <div className="container max-w-4xl mx-auto text-center space-y-4">
          <p className="badge">FAQ</p>
          <h1 className="section-title text-white">Questions About Our Work</h1>
          <p className="section-subtitle text-blue-100">
            Quick answers about how we operate before, during, and after disasters.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container max-w-4xl mx-auto space-y-6">
          {faqs.map((item) => (
            <details key={item.question} className="card-soft group">
              <summary className="flex cursor-pointer items-center justify-between gap-4">
                <span className="font-semibold text-blue-900">
                  {item.question}
                </span>
                <span className="text-xl text-gray-400 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-sm text-gray-700">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

