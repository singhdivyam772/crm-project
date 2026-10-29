import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

export default function LoginPage() {
  const { employee, login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (employee) return <Navigate to="/dashboard" replace />;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      if (mode === 'login') await login(form.email, form.password);
      else await register(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="center">
      <form className="form card" onSubmit={submit}>
        <p className="brand">Intake</p>
        <h2>{mode === 'login' ? 'Sign in to your CRM' : 'Create your counselor account'}</h2>
        {mode === 'register' && (
          <label>Full name
            <input value={form.name} onChange={set('name')} required autoComplete="name" />
          </label>
        )}
        <label>Work email
          <input type="email" value={form.email} onChange={set('email')} required autoComplete="email" />
        </label>
        <label>Password <span className="opt">min 6 characters</span>
          <input type="password" value={form.password} onChange={set('password')} required minLength={6}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
        </label>
        <button disabled={busy}>{mode === 'login' ? 'Sign in' : 'Create account'}</button>
        {error && <p className="note err" role="alert">{error}</p>}
        <p className="switch">
          {mode === 'login' ? 'New counselor?' : 'Already have an account?'}{' '}
          <button type="button" className="linkbtn" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>
            {mode === 'login' ? 'Create an account' : 'Sign in'}
          </button>
        </p>
        <Link className="side-link dark" to="/">Open the public enquiry form</Link>
      </form>
    </div>
  );
}
