export type AssetStatus = 'In Use' | 'In Stock' | 'Under Repair' | 'Retired' | 'Pending Approval';
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
  department?: string;
  password?: string;
  hasPasswordChanged?: boolean;
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
  recordDate: string;
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
