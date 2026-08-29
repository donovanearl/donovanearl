import { useState } from 'react';
import axios from 'axios';


export default function Contacts_Whatsapp_Us() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [whatsappLink, setWhatsappLink] = useState('');

  const YOUR_WHATSAPP_NUMBER = '971501234567'; // ← Change this (no + or spaces)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // 1. Save to database + send you an email
      await axios.post('/api/contact/', {
        ...form,
        channel: 'whatsapp',
      });

      // 2. Build the pre-filled WhatsApp link
      const text = encodeURIComponent(
        `Hi! I'm ${form.name}.\n\n${form.message}\n\nMy number: ${form.phone}`
      );
      const link = `https://wa.me/${YOUR_WHATSAPP_NUMBER}?text=${text}`;
      setWhatsappLink(link);

      setStatus('success');
      setForm({ name: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  // ========== SUCCESS SCREEN ==========
  if (status === 'success') {
    // QR code using a free public API (no library needed)
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(whatsappLink)}`;

    return (
      <div className="contacts-form-whatsapp">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl">
          ✓
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Message Saved Successfully!
        </h2>
        <p className="text-gray-600 mb-8">
          We received your details. Continue the conversation on WhatsApp.
        </p>

        {/* Big CTA Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full max-w-sm bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition mb-8"
        >
          <span className="text-xl">💬</span>
          Open WhatsApp Chat
        </a>

        {/* QR Code Section */}
        <div className="border-t pt-8">
          <p className="text-sm text-gray-500 mb-4">
            Or scan this QR code with your phone:
          </p>
          <img
            src={qrCodeUrl}
            alt="WhatsApp QR Code"
            className="mx-auto rounded-lg border"
            width={180}
            height={180}
          />
          <p className="text-xs text-gray-400 mt-3">
            Point your phone camera at the QR code
          </p>
        </div>

        {/* Your number as fallback */}
        <p className="mt-8 text-sm text-gray-500">
          Or message us directly at:{' '}
          <span className="font-medium text-gray-800">+{YOUR_WHATSAPP_NUMBER}</span>
        </p>
      </div>
    );
  }

  // ========== FORM ==========
  return (
    <form onSubmit={handleSubmit} className="contacts-form-whatsapp">
      {/* ... same form fields as before ... */}
      <div className='label-input-container'>
        
        <label className="name-label">Your Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="name-input"
          placeholder="John Doe"
        />
      </div>

      <div className='label-input-container'>
        
        <label className="whatsapp-label">Your WhatsApp Number</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="whatsapp-input"
          placeholder="+971 50 123 4567"
        />
      </div>

      <div className='label-input-container'>
        <label className="message-label">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className="message-input"
          placeholder="How can we help you?"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-60"
      >
        {status === 'loading' ? 'Saving...' : 'Continue on WhatsApp'}
      </button>

      {status === 'error' && (
        <p className="text-red-600 text-sm text-center">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}