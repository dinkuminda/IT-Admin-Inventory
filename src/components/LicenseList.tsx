import React, { useEffect, useState, useRef } from 'react';
import { Search, Plus, Filter, MoreVertical, X, Edit2, Trash2, Shield, Key, Users, Calendar, Download, Upload } from 'lucide-react';
import { SoftwareLicense, LicenseType } from '../types';

const LICENSE_TYPES: LicenseType[] = ['Subscription', 'Perpetual', 'Open Source'];

export function LicenseList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [licenses, setLicenses] = useState<SoftwareLicense[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLicense, setEditingLicense] = useState<SoftwareLicense | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Partial<SoftwareLicense>>({
    name: '',
    version: '',
    vendor: '',
    key: '',
    seats: 1,
    usedSeats: 0,
    expiryDate: new Date().toISOString().split('T')[0],
    type: 'Subscription'
  });

  const fetchData = async () => {
    try {
      const response = await fetch('/api/licenses');
      const data = await response.json();
      setLicenses(data);
    } catch (error) {
      console.error('Failed to fetch license data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExportCSV = () => {
    if (licenses.length === 0) return;

    const headers = ['Name', 'Version', 'Vendor', 'License Key', 'Total Seats', 'Used Seats', 'Expiry Date', 'Type'];
    const csvRows = [
      headers.join(','),
      ...licenses.map(license => [
        `"${license.name}"`,
        `"${license.version}"`,
        `"${license.vendor}"`,
        `"${license.key}"`,
        license.seats,
        license.usedSeats,
        `"${license.expiryDate}"`,
        `"${license.type}"`
      ].join(','))
    ];

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `software_licenses_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      const rows = text.split('\n').map(row => row.split(',').map(cell => cell.replace(/^"|"$/g, '').trim()));
      
      // Skip header row
      const dataRows = rows.slice(1).filter(row => row.length >= 7 && row[0]);

      setLoading(true);
      try {
        for (const row of dataRows) {
          const [name, version, vendor, key, seats, usedSeats, expiryDate, type] = row;
          
          await fetch('/api/licenses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name,
              version,
              vendor,
              key,
              seats: parseInt(seats) || 1,
              usedSeats: parseInt(usedSeats) || 0,
              expiryDate: expiryDate || new Date().toISOString().split('T')[0],
              type: LICENSE_TYPES.includes(type as LicenseType) ? type : 'Subscription'
            })
          });
        }
        await fetchData();
      } catch (error) {
        console.error('Failed to import licenses:', error);
        alert('Some licenses failed to import. Please check the console for details.');
      } finally {
        setLoading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  const handleOpenModal = (license?: SoftwareLicense) => {
    if (license) {
      setEditingLicense(license);
      setFormData(license);
    } else {
      setEditingLicense(null);
      setFormData({
        name: '',
        version: '',
        vendor: '',
        key: '',
        seats: 1,
        usedSeats: 0,
        expiryDate: new Date().toISOString().split('T')[0],
        type: 'Subscription'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLicense(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingLicense ? `/api/licenses/${editingLicense.id}` : '/api/licenses';
    const method = editingLicense ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchData();
        handleCloseModal();
      }
    } catch (error) {
      console.error('Failed to save license:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this license?')) return;

    try {
      const response = await fetch(`/api/licenses/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Failed to delete license:', error);
    }
  };

  const filteredLicenses = licenses.filter(license => 
    (license.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (license.vendor || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (license.key || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Software Licenses</h1>
          <p className="text-slate-500">Manage software subscriptions and license keys.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <input 
            type="file" 
            accept=".csv" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleImportCSV} 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Upload size={18} />
            <span>Import CSV</span>
          </button>
          <button 
            onClick={handleExportCSV}
            className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Download size={18} />
            <span>Export CSV</span>
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-cyan-700 transition-colors shadow-sm"
          >
            <Plus size={18} />
            <span>Add License</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, vendor, or key..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLicenses.map((license) => {
          const usagePercent = (license.usedSeats / license.seats) * 100;
          const isExpiringSoon = new Date(license.expiryDate).getTime() - new Date().getTime() < 30 * 24 * 60 * 60 * 1000;

          return (
            <div key={license.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow group relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-600">
                  <Shield size={24} />
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleOpenModal(license)}
                    className="p-1.5 text-slate-400 hover:text-cyan-600 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(license.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-1 mb-4">
                <h3 className="font-bold text-slate-900">{license.name}</h3>
                <p className="text-sm text-slate-500">{license.vendor} • v{license.version}</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-500">Seat Usage</span>
                    <span className="text-slate-900">{license.usedSeats} / {license.seats}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        usagePercent > 90 ? 'bg-rose-500' : usagePercent > 70 ? 'bg-amber-500' : 'bg-cyan-500'
                      }`}
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Key size={14} />
                    <span className="truncate">{license.key}</span>
                  </div>
                  <div className={`flex items-center gap-2 text-xs ${isExpiringSoon ? 'text-rose-600 font-medium' : 'text-slate-500'}`}>
                    <Calendar size={14} />
                    <span>{new Date(license.expiryDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-6 right-6">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                  license.type === 'Subscription' ? 'bg-indigo-100 text-indigo-700' : 
                  license.type === 'Perpetual' ? 'bg-emerald-100 text-emerald-700' : 
                  'bg-slate-100 text-slate-700'
                }`}>
                  {license.type}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-slate-900">
                {editingLicense ? 'Edit License' : 'Add New License'}
              </h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Software Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Vendor</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    value={formData.vendor}
                    onChange={e => setFormData({...formData, vendor: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Version</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    value={formData.version}
                    onChange={e => setFormData({...formData, version: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">License Key</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    value={formData.key}
                    onChange={e => setFormData({...formData, key: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Total Seats</label>
                  <input 
                    required
                    type="number" 
                    min="1"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    value={formData.seats}
                    onChange={e => setFormData({...formData, seats: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Used Seats</label>
                  <input 
                    required
                    type="number" 
                    min="0"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    value={formData.usedSeats}
                    onChange={e => setFormData({...formData, usedSeats: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Expiry Date</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    value={formData.expiryDate}
                    onChange={e => setFormData({...formData, expiryDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">License Type</label>
                  <select 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value as LicenseType})}
                  >
                    {LICENSE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2 border border-slate-200 rounded-lg font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-100"
                >
                  {editingLicense ? 'Update License' : 'Create License'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
