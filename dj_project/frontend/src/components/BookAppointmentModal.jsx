import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/BookAppointmentModal.css"


export default function BookAppointmentModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    preferred_time: '',
    notes: '',
  });

  const PREVIEW_SUCCESS = false;
  const [status, setStatus] = useState(PREVIEW_SUCCESS ? 'success' : 'idle');

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setStatus('idle');
    setForm({
      name: '',
      phone: '',
      email: '',
      service: '',
      preferred_time: '',
      notes: '',
    });
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await axios.post('http://localhost:8000/api/appointments/', form);
      setStatus('success');
    } catch (err) {
      console.error('Status:', err.response?.status);
      console.error('Data:', err.response?.data);
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  if (status === 'success') {
    return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button type="button" onClick={handleClose} className="modal-close success-close">
          ×
        </button>

        <div className="modal-success">
          <div className="modal-check">✓</div>
          <h2>Request received</h2>
          <p>
            Thanks{form.name ? `, ${form.name}` : ''}. We saved your
            appointment request and will contact you by email or phone shortly.
          </p>
          <button type="button" onClick={handleClose} className="modal-success-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <h2 className="text-xl font-bold">Book an Appointment</h2>
            <p className="text-sm text-gray-500">We’ll get back to you shortly.</p>
          </div>
          <button onClick={handleClose} className="modal-close">×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Full name"
            className="w-full border rounded-lg px-4 py-2.5"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="Mobile number"
            className="w-full border rounded-lg px-4 py-2.5"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email address"
            className="w-full border rounded-lg px-4 py-2.5"
          />

          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2.5 bg-white"
          >
            <option value="">Select a service</option>
            <optgroup label="Hardware">
              <option value="Laptop Repair">Laptop Repair</option>
              <option value="Desktop Repair">Desktop Repair</option>
              <option value="PC Cleaning">PC cleaning</option>
              <option value="Customized PC Build">Customized PC Build</option>
            </optgroup>
            <optgroup label="Software">
              <option value="Software Installation">Software Installation</option>
              <option value="Virus Removal">Virus Removal</option>
              <option value="Data Recovery">Data Recovery</option>
            </optgroup>
          </select>

          <input
            name="preferred_time"
            value={form.preferred_time}
            onChange={handleChange}
            placeholder="Preferred date / time (optional)"
            className="w-full border rounded-lg px-4 py-2.5"
          />

          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Notes (optional)"
            className="w-full border rounded-lg px-4 py-2.5"
          />

          {status === 'error' && (
            <p className="text-red-600 text-sm text-center">
              Could not submit. Check the backend URL and try again.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="modal-submit"
          >
            {status === 'loading' ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
}