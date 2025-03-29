// Financial Service for Indonesian IWMS
import {
  FinancialTransaction,
  FinancialBudget,
  FinancialReport,
  FinancialDashboard,
  TaxCompliance,
  FinancialMetrics,
} from "../models/financial";

// Mock data for development - would be replaced with actual API calls
const mockTransactions: FinancialTransaction[] = [
  {
    id: "1",
    propertyId: "1",
    propertyName: "Menara Astra",
    leaseId: "1",
    leaseName: "PT Teknologi Indonesia Lease",
    categoryId: "1",
    category: {
      id: "1",
      name: "Rent",
      type: "income",
      description: "Rental income",
    },
    amount: 350000000,
    currency: "IDR",
    transactionDate: "2023-06-01",
    dueDate: "2023-06-05",
    paidDate: "2023-06-03",
    status: "Paid",
    paymentMethod: "Bank Transfer",
    referenceNumber: "TRX-2023-06-001",
    description: "Monthly rent payment for June 2023",
    recurring: true,
    recurringFrequency: "Monthly",
    ppn: 35000000, // 10% VAT
    pph: 17500000, // 5% Income Tax
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2023-06-03T00:00:00Z",
  },
  {
    id: "2",
    propertyId: "1",
    propertyName: "Menara Astra",
    categoryId: "2",
    category: {
      id: "2",
      name: "Maintenance",
      type: "expense",
      description: "Building maintenance costs",
    },
    amount: 75000000,
    currency: "IDR",
    transactionDate: "2023-06-10",
    dueDate: "2023-06-15",
    paidDate: "2023-06-12",
    status: "Paid",
    paymentMethod: "Bank Transfer",
    referenceNumber: "TRX-2023-06-002",
    description: "Monthly maintenance for June 2023",
    recurring: true,
    recurringFrequency: "Monthly",
    ppn: 7500000, // 10% VAT
    createdAt: "2023-06-10T00:00:00Z",
    updatedAt: "2023-06-12T00:00:00Z",
  },
  {
    id: "3",
    propertyId: "2",
    propertyName: "Wisma GKBI",
    leaseId: "2",
    leaseName: "PT Finansial Sejahtera Lease",
    categoryId: "1",
    category: {
      id: "1",
      name: "Rent",
      type: "income",
      description: "Rental income",
    },
    amount: 275000000,
    currency: "IDR",
    transactionDate: "2023-06-01",
    dueDate: "2023-06-05",
    paidDate: "2023-06-04",
    status: "Paid",
    paymentMethod: "Bank Transfer",
    referenceNumber: "TRX-2023-06-003",
    description: "Monthly rent payment for June 2023",
    recurring: true,
    recurringFrequency: "Monthly",
    ppn: 27500000, // 10% VAT
    pph: 13750000, // 5% Income Tax
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2023-06-04T00:00:00Z",
  },
  {
    id: "4",
    propertyId: "1",
    propertyName: "Menara Astra",
    categoryId: "3",
    category: {
      id: "3",
      name: "Property Tax",
      type: "expense",
      description: "Annual property tax (PBB)",
    },
    amount: 120000000,
    currency: "IDR",
    transactionDate: "2023-05-15",
    dueDate: "2023-06-30",
    status: "Unpaid",
    description: "Annual Property Tax (PBB) for 2023",
    recurring: true,
    recurringFrequency: "Annually",
    pbb: 120000000,
    createdAt: "2023-05-15T00:00:00Z",
    updatedAt: "2023-05-15T00:00:00Z",
  },
];

// Service functions
export const financialService = {
  // Get all transactions
  getTransactions: async (): Promise<FinancialTransaction[]> => {
    // In a real implementation, this would be an API call
    return Promise.resolve(mockTransactions);
  },

  // Get transactions by property ID
  getTransactionsByPropertyId: async (
    propertyId: string,
  ): Promise<FinancialTransaction[]> => {
    const transactions = mockTransactions.filter(
      (t) => t.propertyId === propertyId,
    );
    return Promise.resolve(transactions);
  },

  // Get transactions by lease ID
  getTransactionsByLeaseId: async (
    leaseId: string,
  ): Promise<FinancialTransaction[]> => {
    const transactions = mockTransactions.filter((t) => t.leaseId === leaseId);
    return Promise.resolve(transactions);
  },

  // Create new transaction
  createTransaction: async (
    transaction: Omit<FinancialTransaction, "id" | "createdAt" | "updatedAt">,
  ): Promise<FinancialTransaction> => {
    const newTransaction: FinancialTransaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    // In a real implementation, this would be an API call
    return Promise.resolve(newTransaction);
  },

  // Update transaction
  updateTransaction: async (
    id: string,
    transaction: Partial<FinancialTransaction>,
  ): Promise<FinancialTransaction | undefined> => {
    const index = mockTransactions.findIndex((t) => t.id === id);
    if (index === -1) return undefined;

    const updatedTransaction = {
      ...mockTransactions[index],
      ...transaction,
      updatedAt: new Date().toISOString(),
    };
    // In a real implementation, this would be an API call
    return Promise.resolve(updatedTransaction);
  },

  // Delete transaction
  deleteTransaction: async (id: string): Promise<boolean> => {
    // In a real implementation, this would be an API call
    return Promise.resolve(true);
  },

  // Get financial dashboard data
  getFinancialDashboard: async (): Promise<FinancialDashboard> => {
    const transactions = await financialService.getTransactions();

    const incomeTransactions = transactions.filter(
      (t) => t.category?.type === "income",
    );
    const expenseTransactions = transactions.filter(
      (t) => t.category?.type === "expense",
    );

    const totalIncome = incomeTransactions.reduce(
      (sum, t) => sum + t.amount,
      0,
    );
    const totalExpenses = expenseTransactions.reduce(
      (sum, t) => sum + t.amount,
      0,
    );
    const netIncome = totalIncome - totalExpenses;

    // Mock data for other metrics
    const occupancyRate = 85;
    const rentCollection = 95;

    const upcomingPayments = transactions.filter((t) => {
      const dueDate = new Date(t.dueDate || "");
      const now = new Date();
      const thirtyDaysFromNow = new Date(
        now.getTime() + 30 * 24 * 60 * 60 * 1000,
      );
      return (
        t.status === "Unpaid" && dueDate <= thirtyDaysFromNow && dueDate >= now
      );
    });

    const overduePayments = transactions.filter((t) => {
      const dueDate = new Date(t.dueDate || "");
      const now = new Date();
      return t.status === "Unpaid" && dueDate < now;
    });

    // Mock monthly data
    const monthlyIncome = [
      { month: "Jan", amount: 625000000 },
      { month: "Feb", amount: 625000000 },
      { month: "Mar", amount: 625000000 },
      { month: "Apr", amount: 625000000 },
      { month: "May", amount: 625000000 },
      { month: "Jun", amount: 625000000 },
    ];

    const monthlyExpenses = [
      { month: "Jan", amount: 195000000 },
      { month: "Feb", amount: 195000000 },
      { month: "Mar", amount: 195000000 },
      { month: "Apr", amount: 195000000 },
      { month: "May", amount: 195000000 },
      { month: "Jun", amount: 195000000 },
    ];

    // Mock category breakdown
    const expensesByCategory = [
      { category: "Maintenance", amount: 75000000, percentage: 38.5 },
      { category: "Utilities", amount: 45000000, percentage: 23.1 },
      { category: "Property Tax", amount: 35000000, percentage: 17.9 },
      { category: "Insurance", amount: 25000000, percentage: 12.8 },
      { category: "Other", amount: 15000000, percentage: 7.7 },
    ];

    // Mock property breakdown
    const incomeByProperty = [
      { property: "Menara Astra", amount: 350000000, percentage: 56 },
      { property: "Wisma GKBI", amount: 275000000, percentage: 44 },
    ];

    return {
      totalIncome,
      totalExpenses,
      netIncome,
      occupancyRate,
      rentCollection,
      upcomingPayments,
      overduePayments,
      monthlyIncome,
      monthlyExpenses,
      expensesByCategory,
      incomeByProperty,
    };
  },

  // Get tax compliance data
  getTaxCompliance: async (): Promise<TaxCompliance[]> => {
    // Mock implementation
    return Promise.resolve([]);
  },

  // Get financial metrics
  getFinancialMetrics: async (
    propertyId?: string,
  ): Promise<FinancialMetrics[]> => {
    // Mock implementation
    return Promise.resolve([]);
  },
};
