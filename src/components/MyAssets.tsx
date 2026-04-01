import React, { useEffect, useState } from 'react';
import { Monitor, Smartphone, Server, Wifi, Package, ShieldCheck } from 'lucide-react';
import { Asset, AssetCategory } from '../types';

const categoryIcons: Record<AssetCategory, any> = {
  Laptop: Monitor,
  Desktop: Monitor,
  Monitor: Monitor,
  Server: Server,
  Network: Wifi,
  Peripheral: Smartphone,
};

export function MyAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const employeeId = localStorage.getItem('employeeId');
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    const fetchMyAssets = async () => {
      try {
        const response = await fetch('/api/assets');
        const allAssets: Asset[] = await response.json();
        const myAssets = allAssets.filter(asset => asset.assignedTo === employeeId);
        setAssets(myAssets);
      } catch (error) {
        console.error('Failed to fetch my assets:', error);
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchMyAssets();
    }
  }, [employeeId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 text-white shadow-xl shadow-indigo-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome, {userName || 'User'}</h1>
            <p className="text-indigo-100">Here are the IT assets currently assigned to you.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.length > 0 ? (
          assets.map((asset) => {
            const Icon = categoryIcons[asset.category] || Monitor;
            return (
              <div key={asset.id} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <Icon size={24} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    asset.status === 'In Use' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {asset.status}
                  </span>
                </div>
                
                <div className="space-y-1 mb-6">
                  <h3 className="font-bold text-slate-900 text-lg">{asset.name}</h3>
                  <p className="text-sm text-slate-500">{asset.manufacturer} {asset.model}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Serial Number</p>
                    <code className="text-xs font-mono text-slate-700 bg-slate-50 px-2 py-1 rounded">{asset.serialNumber}</code>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Category</p>
                    <p className="text-sm text-slate-700 font-medium">{asset.category}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Assets Found</h3>
            <p className="text-slate-500 max-w-xs mx-auto mt-2">
              You don't have any IT assets assigned to your account at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
