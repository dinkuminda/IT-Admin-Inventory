import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock data moved to server for full-stack simulation
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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const addAuditLog = (action: string, entity: string, entityId: string, details: string) => {
    const newLog = {
      id: `aud${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').split('.')[0],
      userId: 'u1', // Default to admin for now
      userName: 'Admin User',
      action,
      entity,
      entityId,
      details
    };
    MOCK_AUDIT_LOGS.unshift(newLog); // Add to beginning
  };

  // API Routes
  app.get('/api/audit', (req, res) => {
    res.json(MOCK_AUDIT_LOGS);
  });

  app.get('/api/assets', (req, res) => {
    res.json(MOCK_ASSETS);
  });

  app.post('/api/assets', (req, res) => {
    const newAsset = {
      ...req.body,
      id: `ast${Date.now()}`
    };
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

  app.get('/api/licenses', (req, res) => {
    res.json(MOCK_LICENSES);
  });

  app.post('/api/licenses', (req, res) => {
    const newLicense = {
      ...req.body,
      id: `lic${Date.now()}`
    };
    MOCK_LICENSES.push(newLicense);
    addAuditLog('CREATE', 'License', newLicense.id, `Created new license: ${newLicense.name}`);
    res.status(201).json(newLicense);
  });

  app.put('/api/licenses/:id', (req, res) => {
    const { id } = req.params;
    const index = MOCK_LICENSES.findIndex(l => l.id === id);
    if (index !== -1) {
      MOCK_LICENSES[index] = { ...MOCK_LICENSES[index], ...req.body };
      addAuditLog('UPDATE', 'License', id, `Updated license: ${MOCK_LICENSES[index].name}`);
      res.json(MOCK_LICENSES[index]);
    } else {
      res.status(404).json({ message: 'License not found' });
    }
  });

  app.delete('/api/licenses/:id', (req, res) => {
    const { id } = req.params;
    const index = MOCK_LICENSES.findIndex(l => l.id === id);
    if (index !== -1) {
      const deleted = MOCK_LICENSES.splice(index, 1);
      addAuditLog('DELETE', 'License', id, `Deleted license: ${deleted[0].name}`);
      res.json(deleted[0]);
    } else {
      res.status(404).json({ message: 'License not found' });
    }
  });

  app.get('/api/employees', (req, res) => {
    res.json(MOCK_EMPLOYEES);
  });

  app.get('/api/departments', (req, res) => {
    res.json(MOCK_DEPARTMENTS);
  });

  app.post('/api/employees', (req, res) => {
    const newEmployee = {
      ...req.body,
      id: `emp${Date.now()}`,
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
    };
    MOCK_EMPLOYEES.push(newEmployee);
    addAuditLog('CREATE', 'Employee', newEmployee.id, `Created new employee: ${newEmployee.firstName} ${newEmployee.lastName}`);
    res.status(201).json(newEmployee);
  });

  app.put('/api/employees/:id', (req, res) => {
    const { id } = req.params;
    const index = MOCK_EMPLOYEES.findIndex(e => e.id === id);
    if (index !== -1) {
      MOCK_EMPLOYEES[index] = { ...MOCK_EMPLOYEES[index], ...req.body };
      addAuditLog('UPDATE', 'Employee', id, `Updated employee: ${MOCK_EMPLOYEES[index].firstName} ${MOCK_EMPLOYEES[index].lastName}`);
      res.json(MOCK_EMPLOYEES[index]);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  });

  app.delete('/api/employees/:id', (req, res) => {
    const { id } = req.params;
    const index = MOCK_EMPLOYEES.findIndex(e => e.id === id);
    if (index !== -1) {
      const deleted = MOCK_EMPLOYEES.splice(index, 1);
      addAuditLog('DELETE', 'Employee', id, `Deleted employee: ${deleted[0].firstName} ${deleted[0].lastName}`);
      res.json(deleted[0]);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  });

  app.get('/api/maintenance', (req, res) => {
    res.json(MOCK_MAINTENANCE);
  });

  app.post('/api/maintenance', (req, res) => {
    const newLog = {
      ...req.body,
      id: `mnt${Date.now()}`
    };
    MOCK_MAINTENANCE.push(newLog);
    addAuditLog('CREATE', 'Maintenance', newLog.id, `Created maintenance log for asset ${newLog.assetId}`);
    res.status(201).json(newLog);
  });

  app.put('/api/maintenance/:id', (req, res) => {
    const { id } = req.params;
    const index = MOCK_MAINTENANCE.findIndex(m => m.id === id);
    if (index !== -1) {
      MOCK_MAINTENANCE[index] = { ...MOCK_MAINTENANCE[index], ...req.body };
      addAuditLog('UPDATE', 'Maintenance', id, `Updated maintenance log for asset ${MOCK_MAINTENANCE[index].assetId}`);
      res.json(MOCK_MAINTENANCE[index]);
    } else {
      res.status(404).json({ message: 'Log not found' });
    }
  });

  app.delete('/api/maintenance/:id', (req, res) => {
    const { id } = req.params;
    const index = MOCK_MAINTENANCE.findIndex(m => m.id === id);
    if (index !== -1) {
      const deleted = MOCK_MAINTENANCE.splice(index, 1);
      addAuditLog('DELETE', 'Maintenance', id, `Deleted maintenance log for asset ${deleted[0].assetId}`);
      res.json(deleted[0]);
    } else {
      res.status(404).json({ message: 'Log not found' });
    }
  });

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

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
