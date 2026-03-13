'use client';

import { useEffect, useState } from 'react';
import PageShell from '../components/PageShell';

type Donation = {
  _id: string;
  amount: number;
  currency: string;
  type: string;
  createdAt?: string;
};

type Contact = {
  _id: string;
  name: string;
  email: string;
  message: string;
  subject?: string;
  createdAt?: string;
};

type MeResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
};

export default function DashboardPage() {
  const [user, setUser] = useState<MeResponse['user']>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const meRes = await fetch('/api/auth/me');
        if (!meRes.ok) {
          setUser(null);
          return;
        }
        const meData: MeResponse = await meRes.json();
        setUser(meData.user);
        if (meData.user) {
          const [donRes, conRes] = await Promise.all([
            fetch('/api/donations/mine'),
            fetch('/api/contacts/mine'),
          ]);
          if (donRes.ok) {
            setDonations(await donRes.json());
          }
          if (conRes.ok) {
            setContacts(await conRes.json());
          }
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <PageShell>
      <section className="section-padding bg-blue-900 text-white">
        <div className="container max-w-4xl mx-auto space-y-3">
          <h1 className="section-title text-white">Your Activity</h1>
          {user && (
            <p className="text-blue-100">
              Signed in as <span className="font-semibold">{user.name}</span> ({user.email})
            </p>
          )}
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container max-w-5xl mx-auto space-y-8">
          {!user && !loading && (
            <div className="card-soft border border-dashed border-blue-300 text-center">
              <p className="mb-2 font-semibold text-blue-900">You are not logged in.</p>
              <p className="text-sm text-gray-600">
                Use the Login / Sign Up buttons in the navbar, then come back here to see your
                donations and contact history.
              </p>
            </div>
          )}

          {loading && (
            <div className="card-soft text-center text-sm text-gray-500">Loading your data…</div>
          )}

          {user && (
            <>
              <div>
                <h2 className="text-xl font-bold text-blue-900 mb-4">Your Donations</h2>
                {donations.length === 0 ? (
                  <p className="text-sm text-gray-600">You have not made any donations yet.</p>
                ) : (
                  <div className="space-y-3">
                    {donations.map((d) => (
                      <div
                        key={d._id}
                        className="rounded-lg border border-gray-200 bg-white p-4 text-sm shadow-sm flex justify-between items-center"
                      >
                        <div>
                          <p className="font-semibold text-blue-900">
                            {d.amount} {d.currency.toUpperCase()} ({d.type})
                          </p>
                          <p className="text-xs text-gray-500">
                            {d.createdAt
                              ? new Date(d.createdAt).toISOString().replace('T', ' ').slice(0, 16)
                              : ''}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl font-bold text-blue-900 mb-4">Your Contact Messages</h2>
                {contacts.length === 0 ? (
                  <p className="text-sm text-gray-600">
                    You have not submitted any contact messages yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {contacts.map((c) => (
                        <div
                        key={c._id}
                        className="rounded-lg border border-gray-200 bg-white p-4 text-sm shadow-sm"
                      >
                        <p className="font-semibold text-blue-900">{c.subject || c.message}</p>
                        <p className="mt-1 text-gray-700">{c.message}</p>
                        <p className="mt-1 text-xs text-gray-500">
                          {c.createdAt
                            ? new Date(c.createdAt).toISOString().replace('T', ' ').slice(0, 16)
                            : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </PageShell>
  );
}

