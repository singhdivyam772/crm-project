import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../AuthContext.jsx';

const LIMIT = 8;

export default function DashboardPage() {
  const { employee, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('unclaimed');
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(null);
  const [toast, setToast] = useState(null);

  const flash = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  };

  const signOut = useCallback(() => { logout(); navigate('/login'); }, [logout, navigate]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api(`/enquiries/${tab}?page=${page}&limit=${LIMIT}`, { auth: true });
      setRows(res.data);
      setTotal(res.total);
    } catch (err) {
      if (err.status === 401) return signOut();
      flash('err', err.message);
    } finally {
      setLoading(false);
    }
  }, [tab, page, signOut]);

  useEffect(() => { load(); }, [load]);

  const claim = async (id) => {
    setClaiming(id);
    try {
      await api(`/enquiries/${id}/claim`, { method: 'POST', auth: true });
      flash('ok', `Lead #${id} claimed. It is now private to you.`);
    } catch (err) {
      flash('err', err.message);
    } finally {
      setClaiming(null);
      load();
    }
  };

  const pick = (t) => { setTab(t); setPage(1); };
  const pages = Math.max(Math.ceil(total / LIMIT), 1);

  return (
    <div className="dash">
      <header className="topbar">
        <p className="brand">Intake</p>
        <div className="who">
          <span>{employee.name} <span className="muted">{employee.email}</span></span>
          <button className="ghost" onClick={signOut}>Sign out</button>
        </div>
      </header>

      <main className="dash-main">
        <div className="tabs" role="tablist">
          <button role="tab" aria-selected={tab === 'unclaimed'} className={tab === 'unclaimed' ? 'on' : ''} onClick={() => pick('unclaimed')}>
            Open enquiries
          </button>
          <button role="tab" aria-selected={tab === 'my'} className={tab === 'my' ? 'on' : ''} onClick={() => pick('my')}>
            My leads
          </button>
          <button className="ghost refresh" onClick={load}>Refresh</button>
        </div>

        <p className="hint">
          {tab === 'unclaimed'
            ? 'Every counselor sees these. Claim one and it becomes private to you.'
            : 'Leads you claimed. No one else can see them.'}
        </p>

        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Name</th><th>Contact</th><th>Course</th><th>Message</th>
                <th>{tab === 'unclaimed' ? 'Received' : 'Claimed'}</th>
                {tab === 'unclaimed' && <th><span className="sr">Action</span></th>}
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan="6" className="empty">Loading...</td></tr>}
              {!loading && rows.length === 0 && (
                <tr><td colSpan="6" className="empty">
                  {tab === 'unclaimed'
                    ? 'No open enquiries. Share the public form to start collecting leads.'
                    : 'You have not claimed any leads yet. Claim one from Open enquiries.'}
                </td></tr>
              )}
              {!loading && rows.map((l) => (
                <tr key={l.id}>
                  <td className="strong">{l.name}</td>
                  <td>{l.email}{l.phone && <><br /><span className="muted">{l.phone}</span></>}</td>
                  <td>{l.courseInterest}</td>
                  <td className="msg">{l.message || <span className="muted">-</span>}</td>
                  <td className="muted">{new Date(tab === 'unclaimed' ? l.createdAt : l.claimedAt).toLocaleString()}</td>
                  {tab === 'unclaimed' && (
                    <td>
                      <button className="claim" disabled={claiming === l.id} onClick={() => claim(l.id)}>
                        {claiming === l.id ? 'Claiming...' : 'Claim'}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pager">
          <button className="ghost" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
          <span className="muted">Page {page} of {pages} - {total} {total === 1 ? 'lead' : 'leads'}</span>
          <button className="ghost" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </main>

      {toast && <div className={`toast ${toast.type}`} role="status">{toast.text}</div>}
    </div>
  );
}
