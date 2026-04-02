import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  CalendarDays, 
  CreditCard, 
  Settings,
  LogOut,
  Briefcase,
  History,
  Monitor
} from 'lucide-react';
import { cn } from '../lib/utils';

const adminNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Briefcase, label: 'Assets', path: '/assets' },
  { icon: CreditCard, label: 'Licenses', path: '/licenses' },
  { icon: CalendarDays, label: 'Maintenance', path: '/maintenance' },
  { icon: Users, label: 'Employees', path: '/assignments' },
  { icon: Settings, label: 'User Management', path: '/users' },
  { icon: History, label: 'System Audit', path: '/audit' },
];

const employeeNavItems = [
  { icon: Monitor, label: 'My Assets', path: '/my-assets' },
<<<<<<< HEAD
  { icon: Briefcase, label: 'Assets', path: '/assets' },
=======
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3
];

export function Sidebar() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'admin';
  const navItems = userRole === 'admin' ? adminNavItems : employeeNavItems;

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('employeeId');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
<<<<<<< HEAD
    <aside className="w-64 bg-slate-900 text-white h-screen flex flex-col sticky top-0 print:hidden">
=======
    <aside className="w-64 bg-slate-900 text-white h-screen flex flex-col sticky top-0">
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center font-bold text-xl">
          I
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight leading-tight">IT Admin Directorate</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Inventory Mgt System</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
              isActive 
                ? "bg-indigo-600 text-white" 
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        {userRole === 'admin' && (
          <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white transition-colors">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
        )}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-rose-400 hover:text-rose-300 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
