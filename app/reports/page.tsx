'use client';

import { useEffect, useState } from 'react';
import PageShell from '../components/PageShell';

type Report = {
  _id?: string;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  description: string;
  severity: number;
  status: string;
  createdAt?: string;
};

const CATEGORIES = ['earthquake', 'flood', 'wildfire', 'hurricane', 'landslide'];

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('earthquake');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('3');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/reports');
        const data = await res.json();
        setReports(data);
      } catch (e) {
        console.error('Failed to load reports', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          category,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          description,
          severity: parseInt(severity, 10),
        }),
      });
      if (!res.ok) return;
      const created: Report = await res.json();
      setReports((prev) => [created, ...prev]);
      setName('');
      setLatitude('');
      setLongitude('');
      setDescription('');
      setSeverity('3');
      setCategory('earthquake');
    } catch (e) {
      console.error('Failed to submit report', e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageShell>
      <section className="section-padding bg-blue-900 text-white">
        <div className="container max-w-5xl mx-auto text-center space-y-4">
          <p className="badge">Community Reports</p>
          <h1 className="section-title text-white">Report an Ongoing Emergency</h1>
          <p className="section-subtitle text-blue-100">
            Share verified, on-the-ground information so responders and neighbors can react faster.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <div className="card-soft">
              <h2 className="text-xl font-bold text-blue-900 mb-4">Submit a New Report</h2>
              <p className="text-sm text-gray-600 mb-4">
                Please only submit information you know is accurate. Include approximate coordinates if possible
                (you can right-click on most maps to copy latitude/longitude).
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name (optional)</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                      placeholder="You can leave this blank"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c.charAt(0).toUpperCase() + c.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                      placeholder="e.g. 37.7749"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                      placeholder="e.g. -122.4194"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What is happening?</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                      placeholder="Short description of the situation, nearby landmarks, number of people affected..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Severity (1–5)</label>
                    <select
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    >
                      {[1, 2, 3, 4, 5].map((s) => (
                        <option key={s} value={s}>
                          {s} - {s <= 2 ? 'Low' : s === 3 ? 'Moderate' : 'Severe'}
                        </option>
                      ))}
                    </select>
                    <p className="mt-2 text-xs text-gray-500">
                      This is only a rough indication to help responders prioritise.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-60"
                >
                  {submitting ? 'Submitting...' : 'Submit Report'}
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-blue-900">Recent Community Reports</h2>
              {loading && <span className="text-xs text-gray-500">Loading…</span>}
            </div>
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {reports.length === 0 && !loading && (
                <p className="text-sm text-gray-500">
                  No reports yet. Be the first to submit an update from your area.
                </p>
              )}
              {reports.map((report) => (
                <article
                  key={report._id as string}
                  className="rounded-lg border border-gray-200 bg-white p-4 text-sm shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-semibold text-blue-900 capitalize">
                      {report.category}
                    </span>
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                      Severity {report.severity}
                    </span>
                  </div>
                  <p className="text-gray-700">{report.description}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Lat {report.latitude.toFixed(3)}, Lng {report.longitude.toFixed(3)}
                  </p>
                  <p className="mt-1 text-xs text-gray-400" suppressHydrationWarning>
                    {report.name || 'Anonymous'} ·{' '}
                    {report.createdAt
                      ? new Date(report.createdAt).toISOString().replace('T', ' ').slice(0, 16)
                      : 'Just now'}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

