<<<<<<< HEAD
export type AssetStatus = 'In Use' | 'In Stock' | 'Under Repair' | 'Retired' | 'Pending Approval';
=======
export type AssetStatus = 'In Use' | 'In Stock' | 'Under Repair' | 'Retired';
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3
export type AssetCategory = 'Laptop' | 'Desktop' | 'Monitor' | 'Server' | 'Network' | 'Peripheral';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departmentId: string;
  role: string;
  joinDate: string;
  status: string;
<<<<<<< HEAD
  department?: string;
  password?: string;
  hasPasswordChanged?: boolean;
=======
  salary: number;
  avatar?: string;
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3
}

export interface Department {
  id: string;
  name: string;
  managerId?: string;
  employeeCount: number;
}

export interface Asset {
  id: string;
  name: string;
  serialNumber: string;
  category: AssetCategory;
  model: string;
  manufacturer: string;
<<<<<<< HEAD
  recordDate: string;
=======
  purchaseDate: string;
>>>>>>> 7f2aa8d528c2dc9302148656ac679dff44afb6f3
  status: AssetStatus;
  assignedTo?: string; // Employee ID
  location: string;
  remark?: string;
  specifications: {
    cpu?: string;
    ram?: string;
    storage?: string;
    screenSize?: string;
  };
}

export type LicenseType = 'Subscription' | 'Perpetual' | 'Open Source';

export interface SoftwareLicense {
  id: string;
  name: string;
  version: string;
  vendor: string;
  key: string;
  seats: number;
  usedSeats: number;
  expiryDate: string;
  type: LicenseType;
}

export interface MaintenanceLog {
  id: string;
  assetId: string;
  date: string;
  type: 'Routine' | 'Repair' | 'Upgrade';
  description: string;
  performedBy: string;
  cost: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT';
  entity: 'Asset' | 'License' | 'Employee' | 'Maintenance' | 'User';
  entityId: string;
  details: string;
}
