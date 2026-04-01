import React, { useEffect, useState, useRef } from 'react';
import { Search, Plus, Filter, MoreVertical, Monitor, Smartphone, Server, Wifi, X, Edit2, Trash2, Download, Upload, Printer, QrCode, CheckCircle2 } from 'lucide-react';
import { Asset, AssetCategory, Employee, AssetStatus } from '../types';
import { QRCodeSVG } from 'qrcode.react';

const categoryIcons: Record<AssetCategory, any> = {
  Laptop: Monitor,
  Desktop: Monitor,
  Monitor: Monitor,
  Server: Server,
  Network: Wifi,
  Peripheral: Smartphone,
};

const CATEGORIES: AssetCategory[] = ['Laptop', 'Desktop', 'Monitor', 'Server', 'Network', 'Peripheral'];
const STATUSES: AssetStatus[] = ['In Use', 'In Stock', 'Under Repair', 'Retired', 'Pending Approval'];

export function AssetList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedAssetForQr, setSelectedAssetForQr] = useState<Asset | null>(null);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Partial<Asset>>({
    name: '',
    serialNumber: '',
    category: 'Laptop',
    model: '',
    manufacturer: '',
    recordDate: new Date().toISOString().split('T')[0],
    status: 'In Stock',
    assignedTo: localStorage.getItem('userRole') === 'admin' ? undefined : (localStorage.getItem('employeeId') || undefined),
    location: '',
    remark: '',
    specifications: {}
  });

  const userRole = localStorage.getItem('userRole') || 'admin';
  const employeeId = localStorage.getItem('employeeId');

  const fetchData = async () => {
    try {
      const [assetsRes, employeesRes] = await Promise.all([
        fetch('/api/assets'),
        fetch('/api/employees')
      ]);
      const assetsData = await assetsRes.json();
      const employeesData = await employeesRes.json();
      setAssets(assetsData);
      setEmployees(employeesData);
    } catch (error) {
      console.error('Failed to fetch asset data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExportCSV = () => {
    if (assets.length === 0) return;

    const headers = ['Name', 'Category', 'Serial Number', 'Manufacturer', 'Model', 'Status', 'Location', 'Record Date', 'Remark'];
    const csvRows = [
      headers.join(','),
      ...assets.map(asset => [
        `"${asset.name}"`,
        `"${asset.category}"`,
        `"${asset.serialNumber}"`,
        `"${asset.manufacturer}"`,
        `"${asset.model}"`,
        `"${asset.status}"`,
        `"${asset.location}"`,
        `"${asset.recordDate}"`,
        `"${asset.remark || ''}"`
      ].join(','))
    ];

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `it_assets_export_${new Date().toISOString().split('T')[0]}.csv`);
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
      const dataRows = rows.slice(1).filter(row => row.length >= 8 && row[0]);

      setLoading(true);
      try {
        for (const row of dataRows) {
          const [name, category, serialNumber, manufacturer, model, status, location, recordDate, remark] = row;
          
          await fetch('/api/assets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name,
              category: CATEGORIES.includes(category as AssetCategory) ? category : 'Laptop',
              serialNumber,
              manufacturer,
              model,
              status: userRole === 'admin' 
                ? (STATUSES.includes(status as AssetStatus) ? status : 'In Stock')
                : 'Pending Approval',
              location,
              assignedTo: userRole === 'admin' ? undefined : (employeeId || undefined),
              recordDate: recordDate || new Date().toISOString().split('T')[0],
              remark,
              specifications: {}
            })
          });
        }
        await fetchData();
      } catch (error) {
        console.error('Failed to import assets:', error);
        alert('Some assets failed to import. Please check the console for details.');
      } finally {
        setLoading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  const handlePrint = () => {
    window.focus();
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleOpenModal = (asset?: Asset) => {
    if (asset) {
      setEditingAsset(asset);
      setFormData(asset);
    } else {
      setEditingAsset(null);
      setFormData({
        name: '',
        serialNumber: '',
        category: 'Laptop',
        model: '',
        manufacturer: '',
        recordDate: new Date().toISOString().split('T')[0],
        status: userRole === 'admin' ? 'In Stock' : 'Pending Approval',
        assignedTo: userRole === 'admin' ? undefined : (employeeId || undefined),
        location: '',
        remark: '',
        specifications: {}
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAsset(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingAsset ? `/api/assets/${editingAsset.id}` : '/api/assets';
    const method = editingAsset ? 'PUT' : 'POST';

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
      console.error('Failed to save asset:', error);
    }
  };

  const handleApprove = async (asset: Asset) => {
    try {
      const response = await fetch(`/api/assets/${asset.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...asset, status: 'In Stock' })
      });

      if (response.ok) {
        fetchData();
        // Automatically show QR code after approval
        setSelectedAssetForQr({ ...asset, status: 'In Stock' });
        setIsQrModalOpen(true);
      }
    } catch (error) {
      console.error('Failed to approve asset:', error);
    }
  };

  const handleShowQr = (asset: Asset) => {
    setSelectedAssetForQr(asset);
    setIsQrModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this asset?')) return;

    try {
      const response = await fetch(`/api/assets/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Failed to delete asset:', error);
    }
  };

  const filteredAssets = assets.filter(asset => 
    (asset.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (asset.serialNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (asset.model || '').toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-bold text-slate-900">IT Assets</h1>
          <p className="text-slate-500">Track and manage hardware across the organization.</p>
        </div>
        <div className="flex flex-wrap gap-2 print:hidden">
          <input 
            type="file" 
            accept=".csv" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleImportCSV} 
          />
          <button 
            onClick={handlePrint}
            className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Printer size={18} />
            <span>Print List</span>
          </button>
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
            <span>Add Asset</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 print:hidden">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, serial, or model..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden print:shadow-none print:border-none print:overflow-visible">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">Asset</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Serial Number</th>
              <th className="px-6 py-4 font-medium">Location</th>
              <th className="px-6 py-4 font-medium">Assigned To</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Remark</th>
              <th className="px-6 py-4 font-medium text-right print:hidden">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredAssets.map((asset) => {
              const Icon = categoryIcons[asset.category] || Monitor;
              const assignee = employees.find(e => e.id === asset.assignedTo);
              
              return (
                <tr key={asset.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{asset.name}</p>
                        <p className="text-xs text-slate-500">{asset.manufacturer} {asset.model}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{asset.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700 font-mono">
                      {asset.serialNumber}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{asset.location}</span>
                  </td>
                  <td className="px-6 py-4">
                    {assignee ? (
                      <div className="flex items-center gap-2">
                        <img src={assignee.avatar} alt="" className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
                        <span className="text-sm text-slate-700">{assignee.firstName} {assignee.lastName}</span>
                      </div>
                    ) : (
                      userRole === 'admin' ? (
                        <span className="text-sm text-slate-400 italic">Unassigned</span>
                      ) : (
                        <span className="text-sm text-slate-400 italic">-</span>
                      )
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase print:border print:border-slate-200 ${
                      asset.status === 'In Use' ? 'bg-emerald-100 text-emerald-700' : 
                      asset.status === 'In Stock' ? 'bg-cyan-100 text-cyan-700' : 
                      asset.status === 'Under Repair' ? 'bg-rose-100 text-rose-700' : 
                      asset.status === 'Pending Approval' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-500 italic max-w-[150px] truncate block" title={asset.remark}>
                      {asset.remark || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right print:hidden">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {userRole === 'admin' ? (
                        <>
                          {asset.status === 'Pending Approval' && (
                            <button 
                              onClick={() => handleApprove(asset)}
                              className="px-2 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded hover:bg-emerald-700 transition-colors uppercase flex items-center gap-1"
                            >
                              <CheckCircle2 size={10} />
                              <span>Approve</span>
                            </button>
                          )}
                          {asset.status !== 'Pending Approval' && (
                            <button 
                              onClick={() => handleShowQr(asset)}
                              className="p-1 text-slate-400 hover:text-indigo-600 transition-colors"
                              title="Generate QR Code"
                            >
                              <QrCode size={16} />
                            </button>
                          )}
                          <button 
                            onClick={() => handleOpenModal(asset)}
                            className="p-1 text-slate-400 hover:text-cyan-600 transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(asset.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => handleOpenModal(asset)}
                          className="p-1 text-slate-400 hover:text-cyan-600 transition-colors flex items-center gap-1 text-xs"
                        >
                          <Edit2 size={14} />
                          <span>View</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-slate-900">
                {editingAsset ? 'Edit Asset' : 'Add New Asset'}
              </h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Asset Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Serial Number</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    value={formData.serialNumber}
                    onChange={e => setFormData({...formData, serialNumber: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Category</label>
                  <select 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as AssetCategory})}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Manufacturer</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    value={formData.manufacturer}
                    onChange={e => setFormData({...formData, manufacturer: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Model</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    value={formData.model}
                    onChange={e => setFormData({...formData, model: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Record Date</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    value={formData.recordDate}
                    onChange={e => setFormData({...formData, recordDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Status</label>
                  <select 
                    disabled={userRole !== 'admin'}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as AssetStatus})}
                  >
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Location</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Assigned To</label>
                  <select 
                    disabled={userRole !== 'admin'}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    value={formData.assignedTo || ''}
                    onChange={e => setFormData({...formData, assignedTo: e.target.value || undefined})}
                  >
                    <option value="">{userRole === 'admin' ? 'Unassigned' : '-'}</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.firstName} {emp.lastName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Remark</label>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none resize-none"
                  value={formData.remark}
                  onChange={e => setFormData({...formData, remark: e.target.value})}
                />
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
                  {editingAsset ? 'Update Asset' : 'Create Asset'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isQrModalOpen && selectedAssetForQr && (
        <>
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 print-hidden">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <QrCode className="text-cyan-600" />
                  Asset QR Document
                </h2>
                <button onClick={() => setIsQrModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-8 flex flex-col items-center text-center bg-slate-50">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
                  <QRCodeSVG 
                    value={`Asset Name: ${selectedAssetForQr.name}\nSerial: ${selectedAssetForQr.serialNumber}\nCategory: ${selectedAssetForQr.category}\nAssigned To: ${
                      employees.find(e => e.id === selectedAssetForQr.assignedTo) 
                        ? `${employees.find(e => e.id === selectedAssetForQr.assignedTo)?.firstName} ${employees.find(e => e.id === selectedAssetForQr.assignedTo)?.lastName}`
                        : 'Unassigned'
                    }`}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                
                <div className="space-y-2 mb-8">
                  <h3 className="font-bold text-slate-900 text-lg">{selectedAssetForQr.name}</h3>
                  <p className="text-sm text-slate-500 font-mono bg-slate-200 px-2 py-1 rounded inline-block">
                    {selectedAssetForQr.serialNumber}
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded text-[10px] font-bold uppercase">
                      {selectedAssetForQr.category}
                    </span>
                    <span className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-[10px] font-bold uppercase">
                      {employees.find(e => e.id === selectedAssetForQr.assignedTo) ? 'Assigned' : 'Unassigned'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 w-full">
                  <button 
                    onClick={() => window.print()}
                    className="flex-1 bg-cyan-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Printer size={18} />
                    Print QR
                  </button>
                  <button 
                    onClick={() => setIsQrModalOpen(false)}
                    className="flex-1 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg font-bold hover:bg-slate-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Print Only View */}
          <div className="print-only">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="border-4 border-slate-900 p-8 rounded-3xl mb-8">
                <QRCodeSVG 
                  value={`Asset Name: ${selectedAssetForQr.name}\nSerial: ${selectedAssetForQr.serialNumber}\nCategory: ${selectedAssetForQr.category}\nAssigned To: ${
                    employees.find(e => e.id === selectedAssetForQr.assignedTo) 
                      ? `${employees.find(e => e.id === selectedAssetForQr.assignedTo)?.firstName} ${employees.find(e => e.id === selectedAssetForQr.assignedTo)?.lastName}`
                      : 'Unassigned'
                  }`}
                  size={400}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <h1 className="text-4xl font-bold mb-4">{selectedAssetForQr.name}</h1>
              <p className="text-2xl font-mono mb-4">S/N: {selectedAssetForQr.serialNumber}</p>
              <div className="text-xl uppercase tracking-widest border-t-2 border-slate-200 pt-4 mt-4">
                {selectedAssetForQr.category} • {employees.find(e => e.id === selectedAssetForQr.assignedTo) ? 'Assigned' : 'Unassigned'}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
