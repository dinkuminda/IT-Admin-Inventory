import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Shield, UserPlus, Search, Edit2, Trash2, Key, Mail, UserCheck, UserX, ShieldCheck, X } from 'lucide-react';
=======
import { Shield, UserPlus, Search, Edit2, Trash2, Key, Mail, UserCheck, UserX, ShieldCheck } from 'lucide-react';
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'IT Staff' | 'Viewer';
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
<<<<<<< HEAD
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null);
  const [formData, setFormData] = useState<Partial<SystemUser>>({
    name: '',
    email: '',
    role: 'IT Staff',
    status: 'Active'
  });

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenModal = (user?: SystemUser) => {
    if (user) {
      setEditingUser(user);
      setFormData(user);
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        role: 'IT Staff',
        status: 'Active'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingUser ? `/api/users/${editingUser.id}` : '/api/users';
    const method = editingUser ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          lastLogin: editingUser?.lastLogin || 'Never'
        })
      });

      if (res.ok) {
        fetchUsers();
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error('Failed to save user:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      if (res.ok) fetchUsers();
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const filteredUsers = users.filter(user => 
    (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

=======
  const [users, setUsers] = useState<SystemUser[]>([
    { id: '1', name: 'Admin User', email: 'admin@inventory.com', role: 'Admin', status: 'Active', lastLogin: '2024-03-27 14:30' },
    { id: '2', name: 'IT Technician', email: 'tech@inventory.com', role: 'IT Staff', status: 'Active', lastLogin: '2024-03-28 09:15' },
    { id: '3', name: 'Inventory Viewer', email: 'viewer@inventory.com', role: 'Viewer', status: 'Inactive', lastLogin: '2024-03-20 11:45' },
  ]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500">Manage system access and permissions for IT staff and administrators.</p>
        </div>
<<<<<<< HEAD
        <button 
          onClick={() => handleOpenModal()}
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-cyan-700 transition-colors shadow-sm"
        >
=======
        <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-cyan-700 transition-colors shadow-sm">
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3
          <UserPlus size={18} />
          <span>Invite User</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-cyan-50 text-cyan-600 rounded-lg">
            <Shield size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Admins</p>
<<<<<<< HEAD
            <p className="text-2xl font-bold text-slate-900">
              {users.filter(u => u.role === 'Admin').length}
            </p>
=======
            <p className="text-2xl font-bold text-slate-900">2</p>
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <UserCheck size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Active Users</p>
<<<<<<< HEAD
            <p className="text-2xl font-bold text-slate-900">
              {users.filter(u => u.status === 'Active').length}
            </p>
=======
            <p className="text-2xl font-bold text-slate-900">8</p>
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-lg">
            <Key size={24} />
          </div>
          <div>
<<<<<<< HEAD
            <p className="text-sm text-slate-500 font-medium">IT Staff</p>
            <p className="text-2xl font-bold text-slate-900">
              {users.filter(u => u.role === 'IT Staff').length}
            </p>
=======
            <p className="text-sm text-slate-500 font-medium">Pending Invites</p>
            <p className="text-2xl font-bold text-slate-900">3</p>
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search users by name or email..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Last Login</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
<<<<<<< HEAD
                      {(user.name || 'U').charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{user.name || 'Unknown'}</p>
=======
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{user.name}</p>
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {user.role === 'Admin' ? (
                      <ShieldCheck size={16} className="text-cyan-600" />
                    ) : (
                      <Shield size={16} className="text-slate-400" />
                    )}
                    <span className="text-sm text-slate-600">{user.role}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {user.lastLogin}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<<<<<<< HEAD
                    <button 
                      onClick={() => handleOpenModal(user)}
                      className="p-1 text-slate-400 hover:text-cyan-600 transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                    >
=======
                    <button className="p-1 text-slate-400 hover:text-cyan-600 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-1 text-slate-400 hover:text-rose-600 transition-colors">
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
<<<<<<< HEAD

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                {editingUser ? 'Edit User' : 'Invite User'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                <input 
                  required
                  type="email" 
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Role</label>
                <select 
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value as any})}
                >
                  <option value="Admin">Admin</option>
                  <option value="IT Staff">IT Staff</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Status</label>
                <select 
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value as any})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border border-slate-200 rounded-lg font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-100"
                >
                  {editingUser ? 'Update User' : 'Invite User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
=======
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3
    </div>
  );
}
