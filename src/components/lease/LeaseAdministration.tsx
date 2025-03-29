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
  Calendar,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  FileText,
  Building2,
  Users,
  AlertTriangle,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { leaseService } from "../../services/leaseService";
import {
  Lease,
  LeasePortfolio as LeasePortfolioType,
} from "../../models/lease";

interface LeaseAdministrationProps {
  // Props if needed
}

const LeaseAdministration: React.FC<LeaseAdministrationProps> = () => {
  const [portfolio, setPortfolio] = useState<LeasePortfolioType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedLease, setSelectedLease] = useState<Lease | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await leaseService.getLeasePortfolio();
        setPortfolio(data);
      } catch (error) {
        console.error("Error fetching lease portfolio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const filteredLeases =
    portfolio?.leases.filter(
      (lease) =>
        lease.propertyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lease.tenant?.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

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

  const calculateDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleViewLease = (lease: Lease) => {
    setSelectedLease(lease);
    setViewDialogOpen(true);
  };

  const LeaseCard = ({ lease }: { lease: Lease }) => {
    const daysRemaining = calculateDaysRemaining(lease.endDate);
    const isExpiringSoon = daysRemaining <= 90 && daysRemaining > 0;
    const isExpired = daysRemaining <= 0;

    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{lease.tenant?.name}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Building2 className="h-4 w-4 mr-1" />
                {lease.propertyName}
              </div>
            </div>
            <Badge
              variant={
                isExpired
                  ? "destructive"
                  : isExpiringSoon
                    ? "warning"
                    : "default"
              }
            >
              {isExpired
                ? "Expired"
                : isExpiringSoon
                  ? "Expiring Soon"
                  : "Active"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">{formatDate(lease.startDate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-medium">{formatDate(lease.endDate)}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Monthly Rent</p>
              <p className="font-medium">{formatCurrency(lease.baseRent)}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {isExpired ? "Expired" : "Time Remaining"}
              </p>
              <div className="flex items-center gap-2">
                {!isExpired && (
                  <Progress
                    value={Math.min(
                      100,
                      (daysRemaining / (lease.term * 30)) * 100,
                    )}
                    className="h-2"
                  />
                )}
                <span className="text-sm font-medium">
                  {isExpired ? "Lease has expired" : `${daysRemaining} days`}
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleViewLease(lease)}
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
            <Calendar className="mr-2 h-6 w-6 text-primary" />
            Lease Administration
          </h2>
          <p className="text-muted-foreground">
            Manage property leases and tenant agreements
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Lease
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading lease portfolio...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Leases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <span className="text-2xl font-bold">
                    {portfolio?.totalLeases || 0}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Leases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-2xl font-bold">
                    {portfolio?.activeLeases || 0}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Expiring Soon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-2xl font-bold">
                    {portfolio?.expiringLeases || 0}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Annual Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-primary mr-2" />
                  <span className="text-2xl font-bold">
                    {formatCurrency(portfolio?.totalAnnualRent)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leases..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>

          <Tabs defaultValue="grid">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLeases.map((lease) => (
                  <LeaseCard key={lease.id} lease={lease} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="table" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Monthly Rent</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeases.map((lease) => {
                      const daysRemaining = calculateDaysRemaining(
                        lease.endDate,
                      );
                      const isExpiringSoon =
                        daysRemaining <= 90 && daysRemaining > 0;
                      const isExpired = daysRemaining <= 0;

                      return (
                        <TableRow key={lease.id}>
                          <TableCell className="font-medium">
                            {lease.tenant?.name}
                          </TableCell>
                          <TableCell>{lease.propertyName}</TableCell>
                          <TableCell>{formatDate(lease.startDate)}</TableCell>
                          <TableCell>{formatDate(lease.endDate)}</TableCell>
                          <TableCell>
                            {formatCurrency(lease.baseRent)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                isExpired
                                  ? "destructive"
                                  : isExpiringSoon
                                    ? "warning"
                                    : "default"
                              }
                            >
                              {isExpired
                                ? "Expired"
                                : isExpiringSoon
                                  ? "Expiring Soon"
                                  : "Active"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleViewLease(lease)}
                                >
                                  <FileText className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}

      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Lease Details</DialogTitle>
            <DialogDescription>Lease and tenant information</DialogDescription>
          </DialogHeader>

          {selectedLease && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Lease Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property:</span>
                    <span className="font-medium">
                      {selectedLease.propertyName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lease Type:</span>
                    <span className="font-medium">
                      {selectedLease.leaseType?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Start Date:</span>
                    <span className="font-medium">
                      {formatDate(selectedLease.startDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">End Date:</span>
                    <span className="font-medium">
                      {formatDate(selectedLease.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Term:</span>
                    <span className="font-medium">
                      {selectedLease.term} months
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Renewal Option:
                    </span>
                    <span className="font-medium">
                      {selectedLease.renewalOption ? "Yes" : "No"}
                    </span>
                  </div>
                  {selectedLease.renewalOption && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Renewal Terms:
                      </span>
                      <span className="font-medium">
                        {selectedLease.renewalTerms}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Notice Period:
                    </span>
                    <span className="font-medium">
                      {selectedLease.noticePeriod} days
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-medium mt-4 mb-2">
                  Tenant Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tenant Name:</span>
                    <span className="font-medium">
                      {selectedLease.tenant?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tenant Type:</span>
                    <span className="font-medium">
                      {selectedLease.tenant?.type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Contact Person:
                    </span>
                    <span className="font-medium">
                      {selectedLease.tenant?.contactPerson || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">
                      {selectedLease.tenant?.phone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">
                      {selectedLease.tenant?.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Tax ID (NPWP):
                    </span>
                    <span className="font-medium">
                      {selectedLease.tenant?.taxId || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Financial Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Rent:</span>
                    <span className="font-medium">
                      {formatCurrency(selectedLease.baseRent)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Rent Frequency:
                    </span>
                    <span className="font-medium">
                      {selectedLease.rentFrequency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Security Deposit:
                    </span>
                    <span className="font-medium">
                      {formatCurrency(selectedLease.securityDeposit)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Maintenance Fee:
                    </span>
                    <span className="font-medium">
                      {formatCurrency(selectedLease.maintenanceFee)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Utility Fee:</span>
                    <span className="font-medium">
                      {formatCurrency(selectedLease.utilityFee)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Escalation Rate:
                    </span>
                    <span className="font-medium">
                      {selectedLease.escalationRate}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Escalation Frequency:
                    </span>
                    <span className="font-medium">
                      {selectedLease.escalationFrequency}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-medium mt-4 mb-2">
                  Indonesian Tax & Legal
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">PPN (VAT):</span>
                    <span className="font-medium">
                      {selectedLease.ppn ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      PPh (Income Tax):
                    </span>
                    <span className="font-medium">
                      {selectedLease.pph ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stamp Duty:</span>
                    <span className="font-medium">
                      {selectedLease.stampDuty ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Notarized:</span>
                    <span className="font-medium">
                      {selectedLease.notarized ? "Yes" : "No"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-x-2">
                  <Button variant="outline" className="gap-1">
                    <DollarSign className="h-4 w-4" /> Payment History
                  </Button>
                  <Button variant="outline" className="gap-1">
                    <FileText className="h-4 w-4" /> Documents
                  </Button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
            <Button>Edit Lease</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeaseAdministration;
