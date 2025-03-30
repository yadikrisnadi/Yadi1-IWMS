// Real Estate Service for Indonesian IWMS
import {
  Property,
  PropertyDocument,
  PropertyContact,
  PropertyPortfolio,
} from "../models/realEstate";
import { withErrorHandling } from "../components/common/ApiErrorHandler";

// Mock data for development - would be replaced with actual API calls
const mockProperties: Property[] = [
  {
    id: "1",
    name: "Menara Astra",
    description: "Premium Grade A office building in Jakarta CBD",
    propertyTypeId: "1",
    propertyType: {
      id: "1",
      name: "Office Building",
      description: "Commercial office space",
    },
    statusId: "1",
    status: {
      id: "1",
      name: "Active",
      description: "Property is currently in use",
    },
    address: {
      street: "Jl. Jenderal Sudirman",
      buildingNumber: "Kav. 5",
      rt: "001",
      rw: "002",
      kelurahan: "Karet Tengsin",
      kecamatan: "Tanah Abang",
      city: "Jakarta Pusat",
      province: "DKI Jakarta",
      postalCode: "10220",
      country: "Indonesia",
      latitude: -6.2088,
      longitude: 106.8222,
    },
    totalArea: 15000,
    buildingArea: 12000,
    yearBuilt: 2017,
    floors: 47,
    purchaseDate: "2015-03-15",
    purchasePrice: 500000000000,
    currentMarketValue: 750000000000,
    lastValuationDate: "2023-01-15",
    imb: "IMB-2015-12345",
    hgb: "HGB-2015-67890",
    pbb: "PBB-2023-54321",
    njop: 650000000000,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-06-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Wisma GKBI",
    description: "Mixed-use building in Jakarta",
    propertyTypeId: "2",
    propertyType: {
      id: "2",
      name: "Mixed Use",
      description: "Combined office and retail space",
    },
    statusId: "1",
    status: {
      id: "1",
      name: "Active",
      description: "Property is currently in use",
    },
    address: {
      street: "Jl. Jenderal Sudirman",
      buildingNumber: "Kav. 28",
      kelurahan: "Bendungan Hilir",
      kecamatan: "Tanah Abang",
      city: "Jakarta Pusat",
      province: "DKI Jakarta",
      postalCode: "10210",
      country: "Indonesia",
      latitude: -6.2022,
      longitude: 106.8189,
    },
    totalArea: 8500,
    buildingArea: 7200,
    yearBuilt: 1995,
    floors: 30,
    purchaseDate: "2000-05-20",
    purchasePrice: 300000000000,
    currentMarketValue: 450000000000,
    lastValuationDate: "2022-11-10",
    imb: "IMB-1995-54321",
    hgb: "HGB-1995-98765",
    pbb: "PBB-2023-12345",
    njop: 400000000000,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-05-10T00:00:00Z",
  },
];

// Base service functions
const baseRealEstateService = {
  // Get all properties
  getProperties: async (): Promise<Property[]> => {
    // In a real implementation, this would be an API call
    return Promise.resolve(mockProperties);
  },

  // Get property by ID
  getPropertyById: async (id: string): Promise<Property | undefined> => {
    const property = mockProperties.find((p) => p.id === id);
    return Promise.resolve(property);
  },

  // Create new property
  createProperty: async (
    property: Omit<Property, "id" | "createdAt" | "updatedAt">,
  ): Promise<Property> => {
    const newProperty: Property = {
      ...property,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    // In a real implementation, this would be an API call
    return Promise.resolve(newProperty);
  },

  // Update property
  updateProperty: async (
    id: string,
    property: Partial<Property>,
  ): Promise<Property | undefined> => {
    const index = mockProperties.findIndex((p) => p.id === id);
    if (index === -1) return undefined;

    const updatedProperty = {
      ...mockProperties[index],
      ...property,
      updatedAt: new Date().toISOString(),
    };
    // In a real implementation, this would be an API call
    return Promise.resolve(updatedProperty);
  },

  // Delete property
  deleteProperty: async (id: string): Promise<boolean> => {
    // In a real implementation, this would be an API call
    return Promise.resolve(true);
  },

  // Get property documents
  getPropertyDocuments: async (
    propertyId: string,
  ): Promise<PropertyDocument[]> => {
    // Mock implementation
    return Promise.resolve([]);
  },

  // Get property contacts
  getPropertyContacts: async (
    propertyId: string,
  ): Promise<PropertyContact[]> => {
    // Mock implementation
    return Promise.resolve([]);
  },

  // Get property portfolio summary
  getPropertyPortfolio: async (): Promise<PropertyPortfolio> => {
    const properties = await baseRealEstateService.getProperties();
    const totalValue = properties.reduce(
      (sum, property) => sum + (property.currentMarketValue || 0),
      0,
    );
    const totalArea = properties.reduce(
      (sum, property) => sum + property.totalArea,
      0,
    );

    return {
      totalProperties: properties.length,
      totalValue,
      totalArea,
      properties,
    };
  },
};

// Enhanced service with error handling
export const realEstateService = {
  getProperties: withErrorHandling(baseRealEstateService.getProperties),
  getPropertyById: withErrorHandling(baseRealEstateService.getPropertyById),
  createProperty: withErrorHandling(baseRealEstateService.createProperty),
  updateProperty: withErrorHandling(baseRealEstateService.updateProperty),
  deleteProperty: withErrorHandling(baseRealEstateService.deleteProperty),
  getPropertyDocuments: withErrorHandling(
    baseRealEstateService.getPropertyDocuments,
  ),
  getPropertyContacts: withErrorHandling(
    baseRealEstateService.getPropertyContacts,
  ),
  getPropertyPortfolio: withErrorHandling(
    baseRealEstateService.getPropertyPortfolio,
  ),
};
