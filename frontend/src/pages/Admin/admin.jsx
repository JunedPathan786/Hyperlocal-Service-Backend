import { useContext, useEffect, useState } from 'react';
import API from '../../api';
import { AuthContext } from '../../Context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function AdminPage(){
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ fullname: '', email: '', phone: '', role: 'user' });

  useEffect(()=>{
    if (!user) return; // wait until auth loads
    if (user && user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchUsers();
  }, [user]);

  const fetchUsers = async ()=>{
    setLoading(true); setError('');
    try{
      const res = await API.get('/users');
      setUsers(res.data.data || []);
    }catch(err){
      setError(err.response?.data?.message || 'Failed to fetch users');
    }finally{setLoading(false)}
  }

  const startEdit = (u)=>{
    setEditingUser(u);
    setForm({ fullname: u.fullname, email: u.email, phone: u.phone, role: u.role });
  }

  const cancelEdit = ()=>{ setEditingUser(null); setForm({ fullname: '', email: '', phone: '', role: 'user' }); }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      if (editingUser) {
        const res = await API.put(`/users/${editingUser._id}`, form);
        // update local list
        setUsers((prev)=> prev.map(p => p._id === editingUser._id ? res.data.data : p));
        cancelEdit();
      } else {
        const res = await API.post('/users', form);
        setUsers((prev)=> [res.data.data, ...prev]);
        setForm({ fullname: '', email: '', phone: '', role: 'user' });
      }
    }catch(err){
      alert(err.response?.data?.message || 'Failed');
    }
  }

  const handleDelete = async (id)=>{
    if (!confirm('Delete this user?')) return;
    try{
      await API.delete(`/users/${id}`);
      setUsers((prev)=> prev.filter(p=> p._id !== id));
    }catch(err){
      alert(err.response?.data?.message || 'Failed to delete');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 bg-white rounded-lg shadow p-4">
            <h3 className="font-bold text-lg mb-4">Admin</h3>
            <nav className="flex flex-col gap-2">
              <button onClick={()=>fetchUsers()} className="text-left px-3 py-2 rounded hover:bg-gray-100">Users</button>
              <button onClick={()=>navigate('/profile')} className="text-left px-3 py-2 rounded hover:bg-gray-100">Profile</button>
            </nav>
          </aside>

          {/* Main */}
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Users</h2>
                <button onClick={()=> startEdit(null) || setEditingUser(null)} className="px-4 py-2 bg-indigo-600 text-white rounded">New User</button>
              </div>

              {/* User Form */}
              <div className="mb-6">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                  <div>
                    <label className="text-sm">Full name</label>
                    <input value={form.fullname} onChange={(e)=> setForm({...form, fullname: e.target.value})} className="mt-1 w-full border rounded p-2" />
                  </div>
                  <div>
                    <label className="text-sm">Email</label>
                    <input value={form.email} onChange={(e)=> setForm({...form, email: e.target.value})} className="mt-1 w-full border rounded p-2" />
                  </div>
                  <div>
                    <label className="text-sm">Phone</label>
                    <input value={form.phone} onChange={(e)=> setForm({...form, phone: e.target.value})} className="mt-1 w-full border rounded p-2" />
                  </div>
                  <div>
                    <label className="text-sm">Role</label>
                    <select value={form.role} onChange={(e)=> setForm({...form, role: e.target.value})} className="mt-1 w-full border rounded p-2">
                      <option value="user">User</option>
                      <option value="provider">Provider</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div className="md:col-span-4 flex gap-2 mt-2">
                    <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">{editingUser ? 'Update' : 'Create'}</button>
                    {editingUser && <button type="button" onClick={cancelEdit} className="px-4 py-2 border rounded">Cancel</button>}
                  </div>
                </form>
              </div>

              {/* Users list */}
              {loading ? <p>Loading...</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {users.map(u => (
                    <div key={u._id} className="bg-gray-50 p-4 rounded shadow">
                      <div className="flex items-center gap-4">
                        <img src={u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.fullname)}&background=0D8ABC&color=fff`} alt="avatar" className="w-12 h-12 rounded-full" />
                        <div>
                          <h4 className="font-semibold">{u.fullname}</h4>
                          <p className="text-sm text-gray-600">{u.email}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="text-sm text-gray-600">{u.phone}</div>
                        <div className="flex gap-2">
                          <button onClick={() => startEdit(u)} className="px-3 py-1 border rounded text-sm">Edit</button>
                          <button onClick={() => handleDelete(u._id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {error && <p className="mt-4 text-red-600">{error}</p>}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
