import { useState } from 'react';
import axios from 'axios';

export default function Contacts_Email_Us() {
  // 1. Form state – stores what the user types
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  // 2. Status to control the UI (idle → loading → success / error)
  const [status, setStatus] = useState('idle');

  // 3. Update form values when user types
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 4. When user submits the form
  const handleSubmit = async (e) => {
    e.preventDefault();           // Prevent page refresh
    setStatus('loading');         // Show loading state

    try {
      // Send data to your Django backend
      await axios.post('/api/contacts/email', {
        ...form,
        channel: 'email',         // Tell backend this came from Email form
      });

      setStatus('success');       // Show success message
      setForm({ name: '', email: '', message: '' }); // Clear the form
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  // ========== SUCCESS SCREEN ==========
  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          Message sent successfully!
        </h2>
        <p className="text-green-700">
          We’ll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  // ========== THE FORM ==========
  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl shadow-sm border">
      
      {/* Name field */}
      <div>
        <label className="block text-sm font-medium mb-1">Your Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="John Doe"
        />
      </div>

      {/* Email field */}
      <div>
        <label className="block text-sm font-medium mb-1">Your Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="you@example.com"
        />
      </div>

      {/* Message field */}
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="How can we help you?"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending...' : 'Send Email'}
      </button>

      {status === 'error' && (
        <p className="text-red-600 text-sm text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}