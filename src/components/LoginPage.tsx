import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, Users } from 'lucide-react';
import { Employee } from '../types';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'employee'>('admin');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
<<<<<<< HEAD
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tempUser, setTempUser] = useState<any>(null);
=======
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/employees')
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error('Failed to fetch employees:', err));
  }, []);

<<<<<<< HEAD
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (role === 'admin') {
      // Simple validation for demo purposes
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userName', 'Admin User');
        navigate('/');
      } else {
        alert('Invalid admin credentials. Use admin / admin123');
      }
    } else {
      if (!selectedEmployeeId) {
        alert('Please select an employee from the list.');
        return;
      }
      try {
        const response = await fetch('/api/employees/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: selectedEmployeeId, password })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.mustChangePassword) {
            setTempUser(data);
            setIsChangingPassword(true);
          } else {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', 'employee');
            localStorage.setItem('employeeId', data.id);
            localStorage.setItem('userName', `${data.firstName || 'Unknown'} ${data.lastName || ''}`.trim());
            navigate('/my-assets');
          }
        } else {
          alert('Invalid employee credentials. Default password is: user000');
        }
      } catch (error) {
        console.error('Login failed:', error);
        alert('An error occurred during login.');
      }
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/employees/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: tempUser.id, 
          currentPassword: password, 
          newPassword 
        })
      });

      if (response.ok) {
        alert('Password updated successfully! Please login with your new password.');
        setIsChangingPassword(false);
        setPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        alert('Failed to update password');
      }
    } catch (error) {
      console.error('Password update failed:', error);
      alert('An error occurred while updating password.');
=======
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (role === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userName', 'Admin User');
      navigate('/');
    } else {
      const emp = employees.find(e => e.id === selectedEmployeeId);
      if (emp) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'employee');
        localStorage.setItem('employeeId', emp.id);
        localStorage.setItem('userName', `${emp.firstName} ${emp.lastName}`);
        navigate('/my-assets');
      } else {
        alert('Please select an employee');
      }
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-indigo-600 p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">IT Admin Directorate</h1>
          <p className="text-indigo-100 text-sm mt-1 uppercase tracking-wider">Inventory Mgt System</p>
        </div>
        
<<<<<<< HEAD
        {isChangingPassword ? (
          <form onSubmit={handleChangePassword} className="p-8 space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Change Password</h2>
              <p className="text-sm text-slate-500 mt-2">
                This is your first login. Please set a new password for your account.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Lock size={16} />
                New Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Lock size={16} />
                Confirm New Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsChangingPassword(false);
                  setPassword('');
                  setTempUser(null);
                }}
                className="flex-1 px-4 py-3 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-indigo-200"
              >
                Update Password & Login
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex border-b border-slate-100">
              <button 
                onClick={() => {
                  setRole('admin');
                  setPassword('');
                  setSelectedEmployeeId('');
                }}
                className={`flex-1 py-4 text-sm font-bold transition-colors ${role === 'admin' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Admin Login
              </button>
              <button 
                onClick={() => {
                  setRole('employee');
                  setPassword('');
                  setSelectedEmployeeId('');
                }}
                className={`flex-1 py-4 text-sm font-bold transition-colors ${role === 'employee' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Employee Login
              </button>
            </div>

            <form onSubmit={handleLogin} className="p-8 space-y-6">
              {role === 'admin' ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <User size={16} />
                      Username
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                      placeholder="Enter admin username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Lock size={16} />
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Users size={16} />
                      Select Employee
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-white"
                      value={selectedEmployeeId}
                      onChange={(e) => setSelectedEmployeeId(e.target.value)}
                    >
                      <option value="">Choose your name...</option>
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>
                          {emp.firstName} {emp.lastName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Lock size={16} />
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="text-xs text-slate-500 mt-2 italic">
                      First login password is: <span className="font-bold">user000</span>
                    </p>
                  </div>
                </>
              )}
              
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-indigo-200"
              >
                Sign In
              </button>
            </form>
          </>
        )}
=======
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setRole('admin')}
            className={`flex-1 py-4 text-sm font-bold transition-colors ${role === 'admin' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Admin Login
          </button>
          <button 
            onClick={() => setRole('employee')}
            className={`flex-1 py-4 text-sm font-bold transition-colors ${role === 'employee' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Employee Login
          </button>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {role === 'admin' ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <User size={16} />
                  Username
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Lock size={16} />
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Users size={16} />
                Select Employee
              </label>
              <select
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-white"
                value={selectedEmployeeId}
                onChange={(e) => setSelectedEmployeeId(e.target.value)}
              >
                <option value="">Choose your name...</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.firstName} {emp.lastName} ({emp.departmentId})
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500 mt-2 italic">
                In a real system, you would enter your employee ID and password.
              </p>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-indigo-200"
          >
            Sign In
          </button>
        </form>
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3
      </div>
    </div>
  );
}
