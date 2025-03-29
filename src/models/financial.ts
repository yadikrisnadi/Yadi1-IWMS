// Financial Management Model for Indonesian IWMS

export interface FinancialCategory {
  id: string;
  name: string; // Rent, Maintenance, Utilities, Taxes, etc.
  type: "income" | "expense";
  description: string;
}

export interface FinancialTransaction {
  id: string;
  propertyId: string;
  propertyName?: string;
  leaseId?: string;
  leaseName?: string;
  categoryId: string;
  category?: FinancialCategory;
  amount: number;
  currency: string;
  transactionDate: string;
  dueDate?: string;
  paidDate?: string;
  status: string; // Paid, Unpaid, Partially Paid, Overdue
  paymentMethod?: string;
  referenceNumber?: string;
  description: string;
  recurring: boolean;
  recurringFrequency?: string; // Monthly, Quarterly, Annually, etc.
  recurringEndDate?: string;
  // Indonesian specific transaction fields
  ppn?: number; // Pajak Pertambahan Nilai (Value Added Tax)
  pph?: number; // Pajak Penghasilan (Income Tax)
  pbb?: number; // Pajak Bumi dan Bangunan (Land and Building Tax)
  createdAt: string;
  updatedAt: string;
}

export interface FinancialBudget {
  id: string;
  propertyId?: string;
  propertyName?: string;
  year: number;
  month?: number;
  categoryId: string;
  category?: FinancialCategory;
  budgetedAmount: number;
  actualAmount: number;
  variance: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialReport {
  id: string;
  name: string;
  type: string; // Income Statement, Balance Sheet, Cash Flow, etc.
  startDate: string;
  endDate: string;
  properties?: string[]; // Array of property IDs
  categories?: string[]; // Array of category IDs
  generatedDate: string;
  fileUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialDashboard {
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  occupancyRate: number; // percentage
  rentCollection: number; // percentage
  upcomingPayments: FinancialTransaction[];
  overduePayments: FinancialTransaction[];
  monthlyIncome: {
    month: string;
    amount: number;
  }[];
  monthlyExpenses: {
    month: string;
    amount: number;
  }[];
  expensesByCategory: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  incomeByProperty: {
    property: string;
    amount: number;
    percentage: number;
  }[];
}

// Indonesian Tax Compliance
export interface TaxCompliance {
  id: string;
  propertyId: string;
  propertyName?: string;
  taxType: string; // PBB, PPh, PPN, etc.
  taxYear: number;
  taxPeriod?: string; // Monthly, Quarterly, Annually
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: string; // Paid, Unpaid, Partially Paid, Overdue
  receiptNumber?: string;
  fileUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Financial Metrics
export interface FinancialMetrics {
  propertyId?: string;
  propertyName?: string;
  period: string; // Monthly, Quarterly, Annually
  startDate: string;
  endDate: string;
  roi: number; // Return on Investment (percentage)
  cap: number; // Capitalization Rate (percentage)
  noi: number; // Net Operating Income
  irr: number; // Internal Rate of Return (percentage)
  dscr: number; // Debt Service Coverage Ratio
  ltv: number; // Loan to Value (percentage)
  breakEvenOccupancy: number; // percentage
  createdAt: string;
  updatedAt: string;
}
