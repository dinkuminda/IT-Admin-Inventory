import express from 'express';

const app = express();
app.use(express.json());

// Mock data
const MOCK_DEPARTMENTS = [
  { id: '1', name: 'Engineering', employeeCount: 12, managerId: 'emp1' },
  { id: '2', name: 'Design', employeeCount: 5, managerId: 'emp2' },
  { id: '3', name: 'Marketing', employeeCount: 8, managerId: 'emp3' },
  { id: '4', name: 'Human Resources', employeeCount: 3, managerId: 'emp4' },
  { id: '5', name: 'Sales', employeeCount: 15, managerId: 'emp5' },
  { id: '6', name: 'Network Admin', employeeCount: 0, managerId: '' },
  { id: '7', name: 'System Admin', employeeCount: 0, managerId: '' },
  { id: '8', name: 'IT Support', employeeCount: 0, managerId: '' },
  { id: '9', name: 'Database Admin', employeeCount: 0, managerId: '' },
];

const MOCK_EMPLOYEES = [
  {
    id: 'emp1',
    firstName: 'Alex',
    lastName: 'Rivera',
    email: 'alex.rivera@nexus.com',
    phone: '+1 (555) 123-4567',
    departmentId: '1',
    role: 'Senior Software Engineer',
    joinDate: '2022-03-15',
    status: 'Active',
    salary: 125000,
    avatar: 'https://picsum.photos/seed/alex/100/100',
  },
  {
    id: 'emp2',
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 'sarah.chen@nexus.com',
    phone: '+1 (555) 234-5678',
    departmentId: '2',
    role: 'Design Lead',
    joinDate: '2021-11-10',
    status: 'Active',
    salary: 118000,
    avatar: 'https://picsum.photos/seed/sarah/100/100',
  },
  {
    id: 'emp3',
    firstName: 'Michael',
    lastName: 'Grant',
    email: 'michael.grant@nexus.com',
    phone: '+1 (555) 345-6789',
    departmentId: '3',
    role: 'Marketing Manager',
    joinDate: '2023-01-20',
    status: 'Active',
    salary: 95000,
    avatar: 'https://picsum.photos/seed/michael/100/100',
  },
];

const MOCK_ASSETS = [
  {
    id: 'ast1',
    name: 'MacBook Pro 16"',
    serialNumber: 'MBP-2024-001',
    category: 'Laptop',
    model: 'M3 Max',
    manufacturer: 'Apple',
    purchaseDate: '2024-01-15',
    status: 'In Use',
    assignedTo: 'emp1',
    location: 'Remote',
    remark: 'Assigned to senior engineer',
    specifications: { cpu: 'M3 Max', ram: '64GB', storage: '2TB' }
  },
  {
    id: 'ast2',
    name: 'Dell UltraSharp 27"',
    serialNumber: 'DELL-U27-992',
    category: 'Monitor',
    model: 'U2723QE',
    manufacturer: 'Dell',
    purchaseDate: '2023-11-05',
    status: 'In Use',
    assignedTo: 'emp1',
    location: 'Office - Desk 12',
    remark: 'Dual monitor setup',
    specifications: { screenSize: '27-inch 4K' }
  },
  {
    id: 'ast3',
    name: 'ThinkPad X1 Carbon',
    serialNumber: 'LEN-X1-882',
    category: 'Laptop',
    model: 'Gen 11',
    manufacturer: 'Lenovo',
    purchaseDate: '2023-09-20',
    status: 'In Stock',
    location: 'Storage Room A',
    remark: 'Spare laptop for new hires',
    specifications: { cpu: 'Intel i7', ram: '32GB', storage: '1TB' }
  },
  {
    id: 'ast4',
    name: 'Cisco Catalyst 9300',
    serialNumber: 'CISCO-SW-102',
    category: 'Network',
    model: 'C9300-48T',
    manufacturer: 'Cisco',
    purchaseDate: '2022-05-12',
    status: 'In Use',
    location: 'Server Room 1',
    remark: 'Core switch for floor 1',
    specifications: {}
  },
  {
    id: 'ast5',
    name: 'iPad Pro 12.9"',
    serialNumber: 'IPAD-2023-441',
    category: 'Peripheral',
    model: 'M2',
    manufacturer: 'Apple',
    purchaseDate: '2023-12-01',
    status: 'Under Repair',
    location: 'IT Lab',
    remark: 'Waiting for parts',
    specifications: { storage: '512GB' }
  }
];

const MOCK_LICENSES = [
  {
    id: 'lic1',
    name: 'Adobe Creative Cloud',
    version: '2024',
    vendor: 'Adobe',
    key: 'XXXX-XXXX-XXXX-XXXX',
    seats: 20,
    usedSeats: 15,
    expiryDate: '2025-01-01',
    type: 'Subscription'
  },
  {
    id: 'lic2',
    name: 'Microsoft 365 Business',
    version: 'Enterprise',
    vendor: 'Microsoft',
    key: 'MSFT-365-ABC-123',
    seats: 100,
    usedSeats: 82,
    expiryDate: '2024-12-31',
    type: 'Subscription'
  },
  {
    id: 'lic3',
    name: 'JetBrains All Products Pack',
    version: '2023.3',
    vendor: 'JetBrains',
    key: 'JB-APP-992-110',
    seats: 15,
    usedSeats: 12,
    expiryDate: '2024-08-15',
    type: 'Subscription'
  }
];

const MOCK_MAINTENANCE = [
  {
    id: 'mnt1',
    assetId: 'ast1',
    date: '2024-02-15',
    type: 'Routine',
    description: 'Software updates and security patch application.',
    performedBy: 'IT Support Team',
    cost: 0
  },
  {
    id: 'mnt2',
    assetId: 'ast4',
    date: '2024-03-01',
    type: 'Repair',
    description: 'Replaced faulty power supply unit.',
    performedBy: 'External Service Provider',
    cost: 150
  }
];

const MOCK_AUDIT_LOGS = [
  {
    id: 'aud1',
    timestamp: '2024-03-28 08:30:00',
    userId: 'u1',
    userName: 'Admin User',
    action: 'CREATE',
    entity: 'Asset',
    entityId: 'ast1',
    details: 'Created new asset: MacBook Pro 16"'
  },
  {
    id: 'aud2',
    timestamp: '2024-03-28 09:15:00',
    userId: 'u2',
    userName: 'IT Technician',
    action: 'UPDATE',
    entity: 'Employee',
    entityId: 'emp1',
    details: 'Updated employee details for Alex Rivera'
  }
];

const addAuditLog = (action: string, entity: string, entityId: string, details: string) => {
  const newLog = {
    id: `aud${Date.now()}`,
    timestamp: new Date().toISOString().replace('T', ' ').split('.')[0],
    userId: 'u1',
    userName: 'Admin User',
    action,
    entity,
    entityId,
    details
  };
  MOCK_AUDIT_LOGS.unshift(newLog);
};

// API Routes
app.get('/api/audit', (req, res) => res.json(MOCK_AUDIT_LOGS));
app.get('/api/assets', (req, res) => res.json(MOCK_ASSETS));
app.post('/api/assets', (req, res) => {
  const newAsset = { ...req.body, id: `ast${Date.now()}` };
  MOCK_ASSETS.push(newAsset);
  addAuditLog('CREATE', 'Asset', newAsset.id, `Created new asset: ${newAsset.name}`);
  res.status(201).json(newAsset);
});
app.put('/api/assets/:id', (req, res) => {
  const { id } = req.params;
  const index = MOCK_ASSETS.findIndex(a => a.id === id);
  if (index !== -1) {
    MOCK_ASSETS[index] = { ...MOCK_ASSETS[index], ...req.body };
    addAuditLog('UPDATE', 'Asset', id, `Updated asset: ${MOCK_ASSETS[index].name}`);
    res.json(MOCK_ASSETS[index]);
  } else {
    res.status(404).json({ message: 'Asset not found' });
  }
});
app.delete('/api/assets/:id', (req, res) => {
  const { id } = req.params;
  const index = MOCK_ASSETS.findIndex(a => a.id === id);
  if (index !== -1) {
    const deleted = MOCK_ASSETS.splice(index, 1);
    addAuditLog('DELETE', 'Asset', id, `Deleted asset: ${deleted[0].name}`);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: 'Asset not found' });
  }
});
app.get('/api/licenses', (req, res) => res.json(MOCK_LICENSES));
app.get('/api/employees', (req, res) => res.json(MOCK_EMPLOYEES));
app.get('/api/departments', (req, res) => res.json(MOCK_DEPARTMENTS));
app.get('/api/maintenance', (req, res) => res.json(MOCK_MAINTENANCE));
app.get('/api/stats', (req, res) => {
  res.json({
    totalAssets: MOCK_ASSETS.length,
    activeLicenses: MOCK_LICENSES.length,
    underRepair: MOCK_ASSETS.filter(a => a.status === 'Under Repair').length,
    licenseUsage: 82,
    categoryData: Object.entries(
      MOCK_ASSETS.reduce((acc, asset) => {
        acc[asset.category] = (acc[asset.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).map(([name, value]) => ({ name, value })),
    statusData: Object.entries(
      MOCK_ASSETS.reduce((acc, asset) => {
        acc[asset.status] = (acc[asset.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).map(([name, value]) => ({ name, value }))
  });
});

export default app;
