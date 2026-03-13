'use client';

import { useState, useEffect } from 'react';
import PageShell from '../components/PageShell';

type Contact = {
  _id?: string;
  name: string;
  email: string;
  message: string;
  createdAt?: Date;
};

export default function ContactPage() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch all contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/contacts/${editingId}` : '/api/contacts';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message
        }),
      });

      if (response.ok) {
        alert(editingId ? 'Contact updated!' : 'Message submitted!');
        fetchContacts();
        resetForm();
      }
    } catch (error) {
      console.error('Error submitting contact:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        const response = await fetch(`/api/contacts/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Contact deleted!');
          fetchContacts();
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const handleEdit = (contact: Contact) => {
    setName(contact.name);
    setEmail(contact.email);
    setMessage(contact.message);
    setEditingId(contact._id!);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
    setEditingId(null);
  };

  return (
    <PageShell>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">
              We'd love to hear from you! Send us a message.
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-md mb-12">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? 'Edit Contact' : 'Send Us a Message'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={5}
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
                >
                  {editingId ? 'Update' : 'Submit'}
                </button>
                
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Contact List */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6">Messages</h2>
            
            {contacts.length === 0 ? (
              <p className="text-gray-500">No messages yet.</p>
            ) : (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact._id} className="border-b pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{contact.name}</h3>
                        <p className="text-gray-600">{contact.email}</p>
                        <p className="mt-2">{contact.message}</p>
                        <p className="text-sm text-gray-400 mt-2" suppressHydrationWarning>
                          {contact.createdAt
                            ? new Date(contact.createdAt).toISOString().replace('T', ' ').slice(0, 16)
                            : ''}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(contact)}
                          className="px-3 py-1 bg-blue-500 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(contact._id!)}
                          className="px-3 py-1 bg-red-500 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}