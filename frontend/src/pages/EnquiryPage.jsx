import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

const empty = { name: '', email: '', phone: '', courseInterest: '', message: '' };

export default function EnquiryPage() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setStatus({ type: '', text: '' });
    try {
      await api('/enquiries/public', { method: 'POST', body: form });
      setStatus({ type: 'ok', text: 'Thanks. A counselor will contact you soon.' });
      setForm(empty);
    } catch (err) {
      setStatus({ type: 'err', text: err.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="split">
      <aside className="split-side">
        <p className="brand">Intake</p>
        <h1>Tell us what you want to study.</h1>
        <p className="lead">Share a few details and a counselor will reach out to help you pick the right course.</p>
        <Link className="side-link" to="/login">Counselor sign in</Link>
      </aside>

      <main className="split-main">
        <form className="form" onSubmit={submit}>
          <h2>Course enquiry</h2>
          <label>Full name
            <input value={form.name} onChange={set('name')} required autoComplete="name" />
          </label>
          <label>Email
            <input type="email" value={form.email} onChange={set('email')} required autoComplete="email" />
          </label>
          <label>Phone <span className="opt">optional</span>
            <input value={form.phone} onChange={set('phone')} autoComplete="tel" />
          </label>
          <label>Course you are interested in
            <input value={form.courseInterest} onChange={set('courseInterest')} required placeholder="e.g. Data Science" />
          </label>
          <label>Anything else we should know? <span className="opt">optional</span>
            <textarea rows="3" value={form.message} onChange={set('message')} />
          </label>
          <button disabled={busy}>{busy ? 'Sending...' : 'Send enquiry'}</button>
          {status.text && <p className={`note ${status.type}`} role="status">{status.text}</p>}
        </form>
      </main>
    </div>
  );
}
