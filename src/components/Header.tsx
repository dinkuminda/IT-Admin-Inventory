import React from 'react';
import { Bell, Search, UserCircle } from 'lucide-react';

export function Header() {
  const userName = localStorage.getItem('userName') || 'Admin User';
  const userRole = localStorage.getItem('userRole') || 'admin';

  return (
<<<<<<< HEAD
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 print:hidden">
=======
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3
      <div className="flex items-center bg-slate-100 px-3 py-2 rounded-lg w-96">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Search employees, tasks, etc..." 
          className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full"
        />
      </div>
      
      <div className="flex items-center gap-6">
        <button className="relative text-slate-500 hover:text-slate-700">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">
            3
          </span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">{userName}</p>
            <p className="text-xs text-slate-500 capitalize">{userRole}</p>
          </div>
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
            <UserCircle size={24} />
          </div>
        </div>
      </div>
    </header>
  );
}
