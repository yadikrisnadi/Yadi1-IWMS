import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, FileText, DollarSign } from "lucide-react";
import { financialService } from "@/services/financialService";
import LoadingFallback from "@/components/common/LoadingFallback";

const TransactionManagement = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const { data, error } = await financialService.getTransactions();
        if (error) {
          setError(error);
        }
        // Data would be used to populate the component
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionData();
  }, []);

  if (loading) {
    return <LoadingFallback message="Memuat data transaksi..." />;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
        <h3 className="font-medium">Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-bold">
            Transaction Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="acquisitions" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger
                value="acquisitions"
                className="flex items-center gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Acquisitions
              </TabsTrigger>
              <TabsTrigger
                value="disposals"
                className="flex items-center gap-2"
              >
                <DollarSign className="h-4 w-4" />
                Disposals
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="acquisitions" className="mt-4">
              <div className="space-y-4">
                {acquisitions.map((transaction, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                          <h3 className="font-medium text-lg">
                            {transaction.property}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {transaction.location}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${getStatusClass(transaction.status)}`}
                            >
                              {transaction.status}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {transaction.date}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col md:items-end">
                          <div className="text-lg font-bold">
                            {transaction.value}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {transaction.size} sqm
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="text-muted-foreground mr-2">
                              Type:
                            </span>
                            {transaction.type}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="disposals" className="mt-4">
              <div className="space-y-4">
                {disposals.map((transaction, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                          <h3 className="font-medium text-lg">
                            {transaction.property}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {transaction.location}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${getStatusClass(transaction.status)}`}
                            >
                              {transaction.status}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {transaction.date}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col md:items-end">
                          <div className="text-lg font-bold">
                            {transaction.value}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {transaction.size} sqm
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="text-muted-foreground mr-2">
                              ROI:
                            </span>
                            <span className="text-green-600 font-medium">
                              {transaction.roi}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      Transaction Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="text-sm text-muted-foreground">
                            Acquisitions (YTD)
                          </div>
                          <div className="text-2xl font-bold mt-1">
                            Rp 125.7B
                          </div>
                          <div className="text-sm text-green-600 mt-1">
                            +12.4% from last year
                          </div>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="text-sm text-muted-foreground">
                            Disposals (YTD)
                          </div>
                          <div className="text-2xl font-bold mt-1">
                            Rp 78.3B
                          </div>
                          <div className="text-sm text-green-600 mt-1">
                            +8.7% from last year
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground">
                          Average Transaction Value
                        </div>
                        <div className="text-2xl font-bold mt-1">Rp 42.5B</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Based on 12 transactions
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      Transaction Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-md"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <span>{doc.name}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {doc.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800";
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Pending":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const acquisitions = [
  {
    property: "Sentral Jakarta Office Tower",
    location: "Jakarta Pusat",
    status: "In Progress",
    date: "Expected Q4 2023",
    value: "Rp 85.2B",
    size: 7500,
    type: "Office Building",
  },
  {
    property: "Yogyakarta Retail Complex",
    location: "Yogyakarta",
    status: "Completed",
    date: "15 Aug 2023",
    value: "Rp 42.8B",
    size: 3200,
    type: "Retail Space",
  },
  {
    property: "Tangerang Industrial Park - Block C",
    location: "Tangerang",
    status: "Pending",
    date: "Negotiation Phase",
    value: "Rp 63.5B (Estimated)",
    size: 12000,
    type: "Industrial",
  },
];

const disposals = [
  {
    property: "Bandung Office Center",
    location: "Bandung",
    status: "Completed",
    date: "22 Jul 2023",
    value: "Rp 38.7B",
    size: 4200,
    roi: "+15.2%",
  },
  {
    property: "Surabaya Warehouse Facility",
    location: "Surabaya",
    status: "Completed",
    date: "05 May 2023",
    value: "Rp 29.4B",
    size: 8500,
    roi: "+8.7%",
  },
  {
    property: "Medan Retail Units (3 Units)",
    location: "Medan",
    status: "In Progress",
    date: "Expected Q4 2023",
    value: "Rp 22.5B (Estimated)",
    size: 1800,
    roi: "+12.3% (Projected)",
  },
];

const documents = [
  { name: "Acquisition Report - Q3 2023.pdf", date: "30 Sep 2023" },
  { name: "Yogyakarta Retail - Purchase Agreement.pdf", date: "10 Aug 2023" },
  { name: "Bandung Office - Sale Documentation.pdf", date: "18 Jul 2023" },
  { name: "Transaction Forecast - Q4 2023.xlsx", date: "05 Oct 2023" },
  { name: "ROI Analysis - YTD 2023.pdf", date: "12 Oct 2023" },
];

export default TransactionManagement;
