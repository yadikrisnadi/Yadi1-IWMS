import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  BarChart3,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  FileText,
  Building2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Download,
  FileBarChart,
  PieChart,
} from "lucide-react";
import { financialService } from "../../services/financialService";
import { FinancialTransaction, FinancialDashboard } from "../../models/financial";

interface FinancialTrackingProps {
  // Props if needed
}

const FinancialTracking: React.FC<FinancialTrackingProps> = () => {
  const [dashboard, setDashboard] = useState<FinancialDashboard | null>(null);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTransaction, setSelectedTransaction] = useState<FinancialTransaction | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardData = await financialService.getFinancialDashboard();
        const transactionsData = await financialService.getTransactions();
        setDashboard(dashboardData);
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.propertyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return "N/A";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleViewTransaction = (transaction: FinancialTransaction) => {
    setSelectedTransaction(transaction);
    setViewDialogOpen(true);
  };

  const TransactionCard = ({ transaction }: { transaction: FinancialTransaction }) => {
    const isIncome = transaction.category?.type === "income";
    const isPaid = transaction.status === "Paid";
    const isOverdue = transaction.status === "Overdue" || 
      (transaction.status === "Unpaid" && new Date(transaction.dueDate || "") < new Date());

    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{transaction.category?.name}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Building2 className="h-4 w-4 mr-1" />
                {transaction.propertyName}
              </div>
            </div>
            <Badge 
              variant={
                isIncome ? "default" : "secondary"
              }
            >
              {isIncome ? "Income" : "Expense"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Amount</p>
              <p className="font-medium flex items-center">
                {isIncome ? 
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" /> : 
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                }
                {formatCurrency(transaction.amount)}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Due Date</p>
                <p className="font-medium">{formatDate(transaction.dueDate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge 
                  variant={
                    isPaid ? "success" : 
                    isOverdue ? "destructive" : 
                    "warning"
                  }
                  className="mt-1"
                >
                  {transaction.status}
                </Badge>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => handleViewTransaction(transaction)}
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full bg-background p-4 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <BarChart3 className="mr-2 h-6 w-6 text-primary" />
            Financial Tracking
          </h2>
          <p className="text-muted-foreground">
            Monitor income, expenses, and financial compliance
          </p>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            <FileBarChart className="mr-2 h-4 w-4" /> Generate Report
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Transaction
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading financial data...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div