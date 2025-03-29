// Real Estate Property Model for Indonesian IWMS

export interface PropertyType {
  id: string;
  name: string;
  description: string;
}

export interface PropertyStatus {
  id: string;
  name: string; // Active, Inactive, Under Construction, For Sale, etc.
  description: string;
}

export interface PropertyDocument {
  id: string;
  propertyId: string;
  documentType: string; // Deed, Certificate, Building Permit, etc.
  documentNumber: string;
  issueDate: string;
  expiryDate?: string;
  issuingAuthority: string;
  fileUrl?: string;
  notes?: string;
  // Indonesian specific document fields
  certificateType?: string; // SHM (Sertifikat Hak Milik), HGB (Hak Guna Bangunan), etc.
  imb?: string; // Izin Mendirikan Bangunan (Building Permit)
  pbb?: string; // Pajak Bumi dan Bangunan (Land and Building Tax)
}

export interface PropertyAddress {
  street: string;
  buildingNumber: string;
  rt?: string; // Rukun Tetangga (neighborhood association)
  rw?: string; // Rukun Warga (community association)
  kelurahan: string; // Urban village
  kecamatan: string; // Sub-district
  city: string;
  province: string;
  postalCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface PropertyContact {
  id: string;
  propertyId: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  isPrimary: boolean;
}

export interface Property {
  id: string;
  name: string;
  description: string;
  propertyTypeId: string;
  propertyType?: PropertyType;
  statusId: string;
  status?: PropertyStatus;
  address: PropertyAddress;
  totalArea: number; // in square meters
  buildingArea: number; // in square meters
  yearBuilt?: number;
  floors?: number;
  purchaseDate?: string;
  purchasePrice?: number;
  currentMarketValue?: number;
  lastValuationDate?: string;
  documents?: PropertyDocument[];
  contacts?: PropertyContact[];
  images?: string[];
  // Indonesian specific property fields
  imb?: string; // Izin Mendirikan Bangunan (Building Permit)
  shm?: string; // Sertifikat Hak Milik (Freehold Title Certificate)
  hgb?: string; // Hak Guna Bangunan (Right to Build Certificate)
  pbb?: string; // Pajak Bumi dan Bangunan (Land and Building Tax)
  njop?: number; // Nilai Jual Objek Pajak (Tax Object Sale Value)
  createdAt: string;
  updatedAt: string;
}

export interface PropertyPortfolio {
  totalProperties: number;
  totalValue: number;
  totalArea: number;
  properties: Property[];
}
