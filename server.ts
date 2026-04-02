import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
<<<<<<< HEAD
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();
=======
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

<<<<<<< HEAD
// Supabase client initialization
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);
=======
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
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

<<<<<<< HEAD
  app.get('/api/users', async (req, res) => {
    const { data, error } = await supabase.from('system_users').select('*');
    if (error) return res.status(500).json({ error: error.message });
    
    // If no users, return a default for demo purposes
    if (!data || data.length === 0) {
      return res.json([
        { id: '1', name: 'Admin User', email: 'admin@inventory.com', role: 'Admin', status: 'Active', lastLogin: '2024-03-27 14:30' }
      ]);
    }
    const users = (data || []).map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      status: u.status,
      lastLogin: u.last_login
    }));
    res.json(users);
  });

  app.post('/api/users', async (req, res) => {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      status: req.body.status || 'Active',
      last_login: 'Never'
    };
    const { data, error } = await supabase.from('system_users').insert([userData]).select();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]);
  });

  app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const userData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      status: req.body.status
    };
    const { data, error } = await supabase.from('system_users').update(userData).eq('id', id).select();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data[0]);
  });

  app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('system_users').delete().eq('id', id).select();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data[0]);
  });

  app.get('/api/audit', async (req, res) => {
    const { data, error } = await supabase.from('audit_logs').select('*').order('timestamp', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    const logs = (data || []).map(l => ({
      id: l.id,
      timestamp: l.timestamp,
      userId: l.user_id,
      userName: l.user_name,
      action: l.action,
      entity: l.entity,
      entityId: l.entity_id,
      details: l.details
    }));
    res.json(logs);
  });

  app.get('/api/assets', async (req, res) => {
    const { data, error } = await supabase.from('assets').select('*');
    if (error) return res.status(500).json({ error: error.message });
    const assets = (data || []).map(a => ({
      id: a.id,
      name: a.name,
      serialNumber: a.serial_number,
      category: a.category,
      model: a.model,
      manufacturer: a.manufacturer,
      purchaseDate: a.purchase_date,
      status: a.status,
      assignedTo: a.assigned_to,
      location: a.location,
      remark: a.remark,
      specifications: a.specifications
    }));
    res.json(assets);
  });

  app.post('/api/assets', async (req, res) => {
    const assetData = {
      name: req.body.name,
      serial_number: req.body.serialNumber,
      category: req.body.category,
      model: req.body.model,
      manufacturer: req.body.manufacturer,
      purchase_date: req.body.purchaseDate,
      status: req.body.status,
      assigned_to: req.body.assignedTo || null,
      location: req.body.location,
      remark: req.body.remark,
      specifications: req.body.specifications || {}
    };
    const { data, error } = await supabase.from('assets').insert([assetData]).select();
    if (error) return res.status(500).json({ error: error.message });
    
    const newAsset = data[0];
    await supabase.from('audit_logs').insert([{
      timestamp: new Date().toISOString(),
      userId: 'u1',
      userName: 'Admin User',
      action: 'CREATE',
      entity: 'Asset',
      entityId: newAsset.id,
      details: `Created new asset: ${newAsset.name}`
    }]);
    
    res.status(201).json(newAsset);
  });

  app.put('/api/assets/:id', async (req, res) => {
    const { id } = req.params;
    const assetData = {
      name: req.body.name,
      serial_number: req.body.serialNumber,
      category: req.body.category,
      model: req.body.model,
      manufacturer: req.body.manufacturer,
      purchase_date: req.body.purchaseDate,
      status: req.body.status,
      assigned_to: req.body.assignedTo || null,
      location: req.body.location,
      remark: req.body.remark,
      specifications: req.body.specifications
    };
    const { data, error } = await supabase.from('assets').update(assetData).eq('id', id).select();
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ message: 'Asset not found' });

    const updatedAsset = data[0];
    await supabase.from('audit_logs').insert([{
      timestamp: new Date().toISOString(),
      userId: 'u1',
      userName: 'Admin User',
      action: 'UPDATE',
      entity: 'Asset',
      entityId: id,
      details: `Updated asset: ${updatedAsset.name}`
    }]);

    res.json(updatedAsset);
  });

  app.delete('/api/assets/:id', async (req, res) => {
    const { id } = req.params;
    
    // Get asset name for audit log before deleting
    const { data: assetData } = await supabase.from('assets').select('name').eq('id', id).single();
    
    const { data, error } = await supabase.from('assets').delete().eq('id', id).select();
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ message: 'Asset not found' });

    await supabase.from('audit_logs').insert([{
      timestamp: new Date().toISOString(),
      userId: 'u1',
      userName: 'Admin User',
      action: 'DELETE',
      entity: 'Asset',
      entityId: id,
      details: `Deleted asset: ${assetData?.name || id}`
    }]);

    res.json(data[0]);
  });

  app.get('/api/licenses', async (req, res) => {
    const { data, error } = await supabase.from('licenses').select('*');
    if (error) return res.status(500).json({ error: error.message });
    const licenses = (data || []).map(l => ({
      id: l.id,
      name: l.name,
      version: l.version,
      vendor: l.vendor,
      key: l.key,
      seats: l.seats,
      usedSeats: l.used_seats,
      expiryDate: l.expiry_date,
      type: l.type
    }));
    res.json(licenses);
  });

  app.post('/api/licenses', async (req, res) => {
    const licenseData = {
      name: req.body.name,
      version: req.body.version,
      vendor: req.body.vendor,
      key: req.body.key,
      seats: req.body.seats,
      used_seats: req.body.usedSeats || 0,
      expiry_date: req.body.expiryDate,
      type: req.body.type
    };
    const { data, error } = await supabase.from('licenses').insert([licenseData]).select();
    if (error) return res.status(500).json({ error: error.message });
    
    const newLicense = data[0];
    await supabase.from('audit_logs').insert([{
      timestamp: new Date().toISOString(),
      user_id: 'u1',
      user_name: 'Admin User',
      action: 'CREATE',
      entity: 'License',
      entity_id: newLicense.id,
      details: `Created new license: ${newLicense.name}`
    }]);
    res.status(201).json(newLicense);
  });

  app.put('/api/licenses/:id', async (req, res) => {
    const { id } = req.params;
    const licenseData = {
      name: req.body.name,
      version: req.body.version,
      vendor: req.body.vendor,
      key: req.body.key,
      seats: req.body.seats,
      used_seats: req.body.usedSeats,
      expiry_date: req.body.expiryDate,
      type: req.body.type
    };
    const { data, error } = await supabase.from('licenses').update(licenseData).eq('id', id).select();
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ message: 'License not found' });

    const updatedLicense = data[0];
    await supabase.from('audit_logs').insert([{
      timestamp: new Date().toISOString(),
      user_id: 'u1',
      user_name: 'Admin User',
      action: 'UPDATE',
      entity: 'License',
      entity_id: id,
      details: `Updated license: ${updatedLicense.name}`
    }]);
    res.json(updatedLicense);
  });

  app.delete('/api/licenses/:id', async (req, res) => {
    const { id } = req.params;
    const { data: licenseData } = await supabase.from('licenses').select('name').eq('id', id).single();
    const { data, error } = await supabase.from('licenses').delete().eq('id', id).select();
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ message: 'License not found' });

    await supabase.from('audit_logs').insert([{
      timestamp: new Date().toISOString(),
      userId: 'u1',
      userName: 'Admin User',
      action: 'DELETE',
      entity: 'License',
      entityId: id,
      details: `Deleted license: ${licenseData?.name || id}`
    }]);
    res.json(data[0]);
  });

  app.get('/api/employees', async (req, res) => {
    const { data, error } = await supabase
      .from('employees')
      .select('*, departments(name)')
      .order('first_name');
    
    if (error) return res.status(500).json({ error: error.message });
    
    const employees = await Promise.all((data || []).map(async (e: any) => {
      const isDefault = await bcrypt.compare('user000', e.password);
      return {
        id: e.id,
        firstName: e.first_name,
        lastName: e.last_name,
        email: e.email,
        phone: e.phone,
        departmentId: e.department_id,
        department: e.departments?.name || 'Unassigned',
        role: e.role,
        joinDate: e.join_date,
        status: e.status,
        avatar: e.avatar,
        hasPasswordChanged: !isDefault
      };
    }));
    res.json(employees);
  });

  app.post('/api/employees/login', async (req, res) => {
    const { id, password } = req.body;
    
    if (!id || !password) {
      return res.status(400).json({ error: 'Missing ID or password' });
    }

    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('Login error for ID:', id, error);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      role: 'employee',
      mustChangePassword: password === 'user000'
    });
  });

  app.post('/api/employees/change-password', async (req, res) => {
    const { id, currentPassword, newPassword } = req.body;
    
    // Verify current password
    const { data: emp, error: fetchError } = await supabase
      .from('employees')
      .select('password')
      .eq('id', id)
      .single();

    if (fetchError || !emp) {
      return res.status(401).json({ error: 'Invalid current password' });
    }

    const isMatch = await bcrypt.compare(currentPassword, emp.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid current password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const { error: updateError } = await supabase
      .from('employees')
      .update({ password: hashedPassword })
      .eq('id', id);

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    res.json({ message: 'Password updated successfully' });
  });

  app.get('/api/departments', async (req, res) => {
    const { data, error } = await supabase.from('departments').select('*');
    if (error) return res.status(500).json({ error: error.message });
    
    // If no departments, return a default list for demo purposes
    if (!data || data.length === 0) {
      return res.json([
        { id: '00000000-0000-0000-0000-000000000002', name: 'DB network & system admin division' },
        { id: '00000000-0000-0000-0000-000000000003', name: 'Network Admin' },
        { id: '00000000-0000-0000-0000-000000000004', name: 'Database Admin' },
        { id: '00000000-0000-0000-0000-000000000005', name: 'System Admin' },
        { id: '00000000-0000-0000-0000-000000000006', name: 'IT Support' },
        { id: '00000000-0000-0000-0000-000000000007', name: 'Human Resources' },
        { id: '00000000-0000-0000-0000-000000000008', name: 'Finance' }
      ]);
    }
    res.json(data);
  });

  app.post('/api/employees', async (req, res) => {
    const employeeData = {
      id: req.body.id,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      department_id: req.body.departmentId || null,
      role: req.body.role,
      join_date: req.body.joinDate,
      status: req.body.status || 'Active',
      password: await bcrypt.hash(req.body.password || 'user000', 10),
      has_password_changed: false
    };
    const { data, error } = await supabase.from('employees').insert([employeeData]).select();
    if (error) return res.status(500).json({ error: error.message });
    
    const newEmployee = data[0];
    await supabase.from('audit_logs').insert([{
      timestamp: new Date().toISOString(),
      userId: 'u1',
      userName: 'Admin User',
      action: 'CREATE',
      entity: 'Employee',
      entityId: newEmployee.id,
      details: `Created new employee: ${newEmployee.first_name} ${newEmployee.last_name}`
    }]);
    res.status(201).json(newEmployee);
  });

  app.put('/api/employees/:id', async (req, res) => {
    const { id } = req.params;
    const employeeData: any = {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      department_id: req.body.departmentId || null,
      role: req.body.role,
      join_date: req.body.joinDate,
      status: req.body.status,
    };
    if (req.body.password) {
      employeeData.password = await bcrypt.hash(req.body.password, 10);
      employeeData.has_password_changed = false; // Reset flag so user is prompted to change it
    }
    const { data, error } = await supabase.from('employees').update(employeeData).eq('id', id).select();
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ message: 'Employee not found' });

    const updatedEmployee = data[0];
    await supabase.from('audit_logs').insert([{
      timestamp: new Date().toISOString(),
      userId: 'u1',
      userName: 'Admin User',
      action: 'UPDATE',
      entity: 'Employee',
      entityId: id,
      details: `Updated employee: ${updatedEmployee.first_name} ${updatedEmployee.last_name}`
    }]);
    res.json(updatedEmployee);
  });

  app.delete('/api/employees/:id', async (req, res) => {
    const { id } = req.params;
    const { data: employeeData } = await supabase.from('employees').select('first_name, last_name').eq('id', id).single();
    const { data, error } = await supabase.from('employees').delete().eq('id', id).select();
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ message: 'Employee not found' });

    await supabase.from('audit_logs').insert([{
      timestamp: new Date().toISOString(),
      userId: 'u1',
      userName: 'Admin User',
      action: 'DELETE',
      entity: 'Employee',
      entityId: id,
      details: `Deleted employee: ${employeeData?.first_name} ${employeeData?.last_name}`
    }]);
    res.json(data[0]);
  });

  app.get('/api/maintenance', async (req, res) => {
    const { data, error } = await supabase.from('maintenance').select('*');
    if (error) return res.status(500).json({ error: error.message });
    const logs = (data || []).map(m => ({
      id: m.id,
      assetId: m.asset_id,
      date: m.date,
      type: m.type,
      description: m.description,
      performedBy: m.performed_by,
      cost: m.cost
    }));
    res.json(logs);
  });

  app.post('/api/maintenance', async (req, res) => {
    const logData = {
      asset_id: req.body.assetId,
      date: req.body.date,
      type: req.body.type,
      description: req.body.description,
      performed_by: req.body.performedBy,
      cost: req.body.cost
    };
    const { data, error } = await supabase.from('maintenance').insert([logData]).select();
    if (error) return res.status(500).json({ error: error.message });
    
    const newLog = data[0];
    await supabase.from('audit_logs').insert([{
      timestamp: new Date().toISOString(),
      userId: 'u1',
      userName: 'Admin User',
      action: 'CREATE',
      entity: 'Maintenance',
      entityId: newLog.id,
      details: `Created maintenance log for asset ${newLog.asset_id}`
    }]);
    res.status(201).json(newLog);
  });

  app.put('/api/maintenance/:id', async (req, res) => {
    const { id } = req.params;
    const logData = {
      asset_id: req.body.assetId,
      date: req.body.date,
      type: req.body.type,
      description: req.body.description,
      performed_by: req.body.performedBy,
      cost: req.body.cost
    };
    const { data, error } = await supabase.from('maintenance').update(logData).eq('id', id).select();
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ message: 'Log not found' });

    const updatedLog = data[0];
    await supabase.from('audit_logs').insert([{
      timestamp: new Date().toISOString(),
      userId: 'u1',
      userName: 'Admin User',
      action: 'UPDATE',
      entity: 'Maintenance',
      entityId: id,
      details: `Updated maintenance log for asset ${updatedLog.asset_id}`
    }]);
    res.json(updatedLog);
  });

  app.delete('/api/maintenance/:id', async (req, res) => {
    const { id } = req.params;
    const { data: logData } = await supabase.from('maintenance').select('assetId').eq('id', id).single();
    const { data, error } = await supabase.from('maintenance').delete().eq('id', id).select();
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ message: 'Log not found' });

    await supabase.from('audit_logs').insert([{
      timestamp: new Date().toISOString(),
      userId: 'u1',
      userName: 'Admin User',
      action: 'DELETE',
      entity: 'Maintenance',
      entityId: id,
      details: `Deleted maintenance log for asset ${logData?.assetId}`
    }]);
    res.json(data[0]);
  });

  app.get('/api/stats', async (req, res) => {
    const [assetsRes, licensesRes] = await Promise.all([
      supabase.from('assets').select('*'),
      supabase.from('licenses').select('*')
    ]);

    const assets = assetsRes.data || [];
    const licenses = licensesRes.data || [];

    res.json({
      totalAssets: assets.length,
      activeLicenses: licenses.length,
      underRepair: assets.filter((a: any) => a.status === 'Under Repair').length,
      licenseUsage: 82, // Hardcoded for now or calculate if needed
      categoryData: Object.entries(
        assets.reduce((acc: any, asset: any) => {
=======
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
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3
          acc[asset.category] = (acc[asset.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      ).map(([name, value]) => ({ name, value })),
      statusData: Object.entries(
<<<<<<< HEAD
        assets.reduce((acc: any, asset: any) => {
=======
        MOCK_ASSETS.reduce((acc, asset) => {
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3
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

<<<<<<< HEAD
  app.listen(PORT, '0.0.0.0', async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    
    // Migration: Ensure all employees have a password and it's hashed
    try {
      const { data: employees } = await supabase.from('employees').select('id, password');
      if (employees) {
        for (const emp of employees) {
          // If password is not hashed (bcrypt hashes start with $2a$ or $2b$ or $2y$)
          if (!emp.password || !emp.password.startsWith('$2')) {
            const passwordToHash = emp.password || 'user000';
            const hashedPassword = await bcrypt.hash(passwordToHash, 10);
            await supabase.from('employees').update({ password: hashedPassword }).eq('id', emp.id);
          }
        }
      }
    } catch (err) {
      console.error('Migration failed (this is expected if table/column is missing):', err);
    }
=======
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3
  });
}

startServer();
