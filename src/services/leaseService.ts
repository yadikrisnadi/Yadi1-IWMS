// Lease Service for Indonesian IWMS
import {
  Lease,
  LeasePayment,
  LeaseDocument,
  LeasePortfolio,
} from "../models/lease";
import { withErrorHandling } from "../components/common/ApiErrorHandler";

// Mock data for development - would be replaced with actual API calls
const mockLeases: Lease[] = [
  {
    id: "1",
    propertyId: "1",
    propertyName: "Menara Astra",
    leaseTypeId: "1",
    leaseType: {
      id: "1",
      name: "Commercial",
      description: "Commercial office lease",
    },
    statusId: "1",
    status: {
      id: "1",
      name: "Active",
      description: "Lease is currently active",
    },
    tenantId: "1",
    tenant: {
      id: "1",
      name: "PT Teknologi Indonesia",
      type: "Company",
      contactPerson: "Budi Santoso",
      phone: "+62 21 5555 1234",
      email: "budi@teknologi.id",
      taxId: "01.234.567.8-901.000",
      companyRegistrationNumber: "NIB-1234567890",
      address: "Menara Astra, Jl. Jenderal Sudirman Kav. 5, Jakarta Pusat",
    },
    startDate: "2022-01-01",
    endDate: "2024-12-31",
    term: 36,
    renewalOption: true,
    renewalTerms: "Option to renew for additional 2 years with 10% escalation",
    baseRent: 350000000,
    rentCurrency: "IDR",
    rentFrequency: "Monthly",
    securityDeposit: 1050000000,
    maintenanceFee: 85000000,
    utilityFee: 65000000,
    escalationRate: 5,
    escalationFrequency: "Annually",
    noticePeriod: 90,
    ppn: true,
    pph: true,
    stampDuty: true,
    notarized: true,
    createdAt: "2021-11-15T00:00:00Z",
    updatedAt: "2022-01-05T00:00:00Z",
  },
  {
    id: "2",
    propertyId: "2",
    propertyName: "Wisma GKBI",
    leaseTypeId: "1",
    leaseType: {
      id: "1",
      name: "Commercial",
      description: "Commercial office lease",
    },
    statusId: "1",
    status: {
      id: "1",
      name: "Active",
      description: "Lease is currently active",
    },
    tenantId: "2",
    tenant: {
      id: "2",
      name: "PT Finansial Sejahtera",
      type: "Company",
      contactPerson: "Siti Rahayu",
      phone: "+62 21 5555 6789",
      email: "siti@finansial.id",
      taxId: "02.345.678.9-012.000",
      companyRegistrationNumber: "NIB-0987654321",
      address: "Wisma GKBI, Jl. Jenderal Sudirman Kav. 28, Jakarta Pusat",
    },
    startDate: "2021-07-01",
    endDate: "2026-06-30",
    term: 60,
    renewalOption: true,
    renewalTerms: "Option to renew for additional 3 years with 15% escalation",
    baseRent: 275000000,
    rentCurrency: "IDR",
    rentFrequency: "Monthly",
    securityDeposit: 825000000,
    maintenanceFee: 65000000,
    utilityFee: 55000000,
    escalationRate: 7.5,
    escalationFrequency: "Annually",
    noticePeriod: 120,
    ppn: true,
    pph: true,
    stampDuty: true,
    notarized: true,
    createdAt: "2021-05-15T00:00:00Z",
    updatedAt: "2021-07-05T00:00:00Z",
  },
];

// Base service functions
const baseLeaseService = {
  // Get all leases
  getLeases: async (): Promise<Lease[]> => {
    // In a real implementation, this would be an API call
    return Promise.resolve(mockLeases);
  },

  // Get lease by ID
  getLeaseById: async (id: string): Promise<Lease | undefined> => {
    const lease = mockLeases.find((l) => l.id === id);
    return Promise.resolve(lease);
  },

  // Get leases by property ID
  getLeasesByPropertyId: async (propertyId: string): Promise<Lease[]> => {
    const leases = mockLeases.filter((l) => l.propertyId === propertyId);
    return Promise.resolve(leases);
  },

  // Create new lease
  createLease: async (
    lease: Omit<Lease, "id" | "createdAt" | "updatedAt">,
  ): Promise<Lease> => {
    const newLease: Lease = {
      ...lease,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    // In a real implementation, this would be an API call
    return Promise.resolve(newLease);
  },

  // Update lease
  updateLease: async (
    id: string,
    lease: Partial<Lease>,
  ): Promise<Lease | undefined> => {
    const index = mockLeases.findIndex((l) => l.id === id);
    if (index === -1) return undefined;

    const updatedLease = {
      ...mockLeases[index],
      ...lease,
      updatedAt: new Date().toISOString(),
    };
    // In a real implementation, this would be an API call
    return Promise.resolve(updatedLease);
  },

  // Delete lease
  deleteLease: async (id: string): Promise<boolean> => {
    // In a real implementation, this would be an API call
    return Promise.resolve(true);
  },

  // Get lease payments
  getLeasePayments: async (leaseId: string): Promise<LeasePayment[]> => {
    // Mock implementation
    return Promise.resolve([]);
  },

  // Get lease documents
  getLeaseDocuments: async (leaseId: string): Promise<LeaseDocument[]> => {
    // Mock implementation
    return Promise.resolve([]);
  },

  // Get lease portfolio summary
  getLeasePortfolio: async (): Promise<LeasePortfolio> => {
    const leases = await baseLeaseService.getLeases();
    const now = new Date();
    const ninetyDaysFromNow = new Date(
      now.getTime() + 90 * 24 * 60 * 60 * 1000,
    );

    const activeLeases = leases.filter((lease) => {
      const endDate = new Date(lease.endDate);
      return endDate >= now;
    });

    const expiringLeases = activeLeases.filter((lease) => {
      const endDate = new Date(lease.endDate);
      return endDate <= ninetyDaysFromNow;
    });

    const totalAnnualRent = activeLeases.reduce((sum, lease) => {
      const monthlyRent = lease.baseRent;
      return sum + monthlyRent * 12;
    }, 0);

    return {
      totalLeases: leases.length,
      activeLeases: activeLeases.length,
      expiringLeases: expiringLeases.length,
      totalAnnualRent,
      leases,
    };
  },
};

// Enhanced service with error handling
export const leaseService = {
  getLeases: withErrorHandling(baseLeaseService.getLeases),
  getLeaseById: withErrorHandling(baseLeaseService.getLeaseById),
  getLeasesByPropertyId: withErrorHandling(
    baseLeaseService.getLeasesByPropertyId,
  ),
  createLease: withErrorHandling(baseLeaseService.createLease),
  updateLease: withErrorHandling(baseLeaseService.updateLease),
  deleteLease: withErrorHandling(baseLeaseService.deleteLease),
  getLeasePayments: withErrorHandling(baseLeaseService.getLeasePayments),
  getLeaseDocuments: withErrorHandling(baseLeaseService.getLeaseDocuments),
  getLeasePortfolio: withErrorHandling(baseLeaseService.getLeasePortfolio),
};
