import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, Users, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const LeaseManagement = () => {
  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-bold">Lease Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="active" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Active Leases
              </TabsTrigger>
              <TabsTrigger value="tenants" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Tenants
              </TabsTrigger>
              <TabsTrigger value="expiring" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Expiring Soon
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-4">
              <div className="space-y-4">
                {leases.map((lease, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div
                      className={`h-1 ${getStatusColor(lease.daysRemaining)}`}
                    ></div>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-medium text-lg">
                            {lease.property}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {lease.tenant}
                          </p>
                        </div>
                        <div className="flex flex-col md:items-end">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              Expires:
                            </span>
                            <span className="text-sm">{lease.expiryDate}</span>
                          </div>
                          <div className="w-full md:w-48 mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Lease Term</span>
                              <span>{lease.progress}%</span>
                            </div>
                            <Progress value={lease.progress} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tenants" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tenants.map((tenant, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{tenant.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Contact:
                          </span>
                          <span>{tenant.contact}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Properties:
                          </span>
                          <span>{tenant.properties}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Total Area:
                          </span>
                          <span>{tenant.area} sqm</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Payment Status:
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${tenant.paymentStatus === "Current" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                          >
                            {tenant.paymentStatus}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="expiring" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    Leases Expiring Within 90 Days
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expiringLeases.map((lease, index) => (
                      <div
                        key={index}
                        className="flex flex-col md:flex-row md:items-center justify-between p-3 border rounded-md gap-2"
                      >
                        <div>
                          <div className="font-medium">{lease.property}</div>
                          <div className="text-sm text-muted-foreground">
                            {lease.tenant}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm">
                            <span className="text-muted-foreground mr-2">
                              Expires:
                            </span>
                            {lease.expiryDate}
                          </div>
                          <div
                            className={`px-2 py-1 rounded-full text-xs ${getDaysRemainingClass(lease.daysRemaining)}`}
                          >
                            {lease.daysRemaining} days
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const getStatusColor = (daysRemaining: number) => {
  if (daysRemaining < 30) return "bg-red-500";
  if (daysRemaining < 90) return "bg-amber-500";
  return "bg-green-500";
};

const getDaysRemainingClass = (daysRemaining: number) => {
  if (daysRemaining < 30) return "bg-red-100 text-red-800";
  if (daysRemaining < 90) return "bg-amber-100 text-amber-800";
  return "bg-green-100 text-green-800";
};

const leases = [
  {
    property: "Menara Jakarta - Floor 12",
    tenant: "PT Global Technologies",
    expiryDate: "15 Dec 2023",
    progress: 85,
    daysRemaining: 45,
  },
  {
    property: "Surabaya Retail Center - Unit 5A",
    tenant: "Fashion Outlet Indonesia",
    expiryDate: "28 Feb 2024",
    progress: 65,
    daysRemaining: 120,
  },
  {
    property: "Menara Jakarta - Floor 8",
    tenant: "Konsultan Hukum Nusantara",
    expiryDate: "10 Nov 2023",
    progress: 92,
    daysRemaining: 15,
  },
  {
    property: "Bali Mixed Development - Retail 3",
    tenant: "Bali Artisan Collective",
    expiryDate: "05 Jan 2024",
    progress: 78,
    daysRemaining: 75,
  },
];

const tenants = [
  {
    name: "PT Global Technologies",
    contact: "Budi Santoso",
    properties: 2,
    area: 1250,
    paymentStatus: "Current",
  },
  {
    name: "Fashion Outlet Indonesia",
    contact: "Siti Rahayu",
    properties: 1,
    area: 450,
    paymentStatus: "Current",
  },
  {
    name: "Konsultan Hukum Nusantara",
    contact: "Agus Wijaya",
    properties: 1,
    area: 780,
    paymentStatus: "Overdue",
  },
  {
    name: "Bali Artisan Collective",
    contact: "Made Dewi",
    properties: 1,
    area: 320,
    paymentStatus: "Current",
  },
  {
    name: "Tech Startup Hub",
    contact: "Rini Purnama",
    properties: 3,
    area: 1850,
    paymentStatus: "Current",
  },
  {
    name: "Jakarta Financial Services",
    contact: "Hendra Gunawan",
    properties: 2,
    area: 1100,
    paymentStatus: "Overdue",
  },
];

const expiringLeases = [
  {
    property: "Menara Jakarta - Floor 8",
    tenant: "Konsultan Hukum Nusantara",
    expiryDate: "10 Nov 2023",
    daysRemaining: 15,
  },
  {
    property: "Menara Jakarta - Floor 12",
    tenant: "PT Global Technologies",
    expiryDate: "15 Dec 2023",
    daysRemaining: 45,
  },
  {
    property: "Bali Mixed Development - Retail 3",
    tenant: "Bali Artisan Collective",
    expiryDate: "05 Jan 2024",
    daysRemaining: 75,
  },
];

export default LeaseManagement;
