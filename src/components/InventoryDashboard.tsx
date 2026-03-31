import React, { useEffect, useState } from 'react';
import { 
  Laptop, 
  ShieldCheck, 
  AlertTriangle, 
  Activity 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { SoftwareLicense } from '../types';

const COLORS = ['#0891b2', '#0d9488', '#059669', '#d97706', '#dc2626'];

interface DashboardStats {
  totalAssets: number;
  activeLicenses: number;
  underRepair: number;
  licenseUsage: number;
  categoryData: { name: string; value: number }[];
  statusData: { name: string; value: number }[];
}

export function InventoryDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [licenses, setLicenses] = useState<SoftwareLicense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, licensesRes] = await Promise.all([
          fetch('/api/stats'),
          fetch('/api/licenses')
        ]);
        const statsData = await statsRes.json();
        const licensesData = await licensesRes.json();
        setStats(statsData);
        setLicenses(licensesData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Inventory Overview</h1>
        <p className="text-slate-500">Real-time status of your IT infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Laptop} 
          label="Total Assets" 
          value={stats.totalAssets.toString()} 
          color="bg-cyan-500"
        />
        <StatCard 
          icon={ShieldCheck} 
          label="Active Licenses" 
          value={stats.activeLicenses.toString()} 
          color="bg-teal-500"
        />
        <StatCard 
          icon={AlertTriangle} 
          label="Under Repair" 
          value={stats.underRepair.toString()} 
          color="bg-rose-500"
        />
        <StatCard 
          icon={Activity} 
          label="License Usage" 
          value={`${stats.licenseUsage}%`} 
          color="bg-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Assets by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.categoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#0891b2" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Asset Status Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {stats.statusData.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="text-slate-600">{d.name}</span>
                </div>
                <span className="font-semibold text-slate-900">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold">Critical License Expiries</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">Software</th>
              <th className="px-6 py-4 font-medium">Vendor</th>
              <th className="px-6 py-4 font-medium">Seats</th>
              <th className="px-6 py-4 font-medium">Expiry Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {licenses.map((lic) => (
              <tr key={lic.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{lic.name}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{lic.vendor}</td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-500" 
                        style={{ width: `${(lic.usedSeats / lic.seats) * 100}%` }} 
                      />
                    </div>
                    <span>{lic.usedSeats}/{lic.seats}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{lic.expiryDate}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className={`${color} w-10 h-10 rounded-lg flex items-center justify-center text-white mb-4`}>
        <Icon size={20} />
      </div>
      <p className="text-slate-500 text-sm font-medium">{label}</p>
      <h2 className="text-2xl font-bold text-slate-900 mt-1">{value}</h2>
    </div>
  );
}
