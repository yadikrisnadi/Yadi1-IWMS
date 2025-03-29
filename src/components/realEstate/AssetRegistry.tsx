import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Building2, FileText, Tag } from "lucide-react";

const AssetRegistry = () => {
  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-bold">
            Asset Registry & Classification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="properties" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger
                value="properties"
                className="flex items-center gap-2"
              >
                <Building2 className="h-4 w-4" />
                Properties
              </TabsTrigger>
              <TabsTrigger
                value="classification"
                className="flex items-center gap-2"
              >
                <Tag className="h-4 w-4" />
                Classification
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Documents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="properties" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {assetData.map((asset, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{asset.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span>{asset.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Location:
                          </span>
                          <span>{asset.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Size:</span>
                          <span>{asset.size} sqm</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${asset.status === "Active" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                          >
                            {asset.status}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="classification" className="mt-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      Classification Schema
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h3 className="font-medium">Property Types</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Office Building</li>
                            <li>Retail Space</li>
                            <li>Warehouse</li>
                            <li>Mixed Use</li>
                            <li>Residential</li>
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-medium">Usage Categories</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Owner Occupied</li>
                            <li>Leased</li>
                            <li>Investment</li>
                            <li>Development</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="mt-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      Asset Documentation
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

const assetData = [
  {
    name: "Menara Jakarta",
    type: "Office Building",
    location: "Jakarta",
    size: 12500,
    status: "Active",
  },
  {
    name: "Surabaya Retail Center",
    type: "Retail Space",
    location: "Surabaya",
    size: 8750,
    status: "Active",
  },
  {
    name: "Bandung Warehouse",
    type: "Warehouse",
    location: "Bandung",
    size: 15000,
    status: "Under Maintenance",
  },
  {
    name: "Bali Mixed Development",
    type: "Mixed Use",
    location: "Bali",
    size: 22000,
    status: "Active",
  },
  {
    name: "Medan Office Park",
    type: "Office Building",
    location: "Medan",
    size: 9800,
    status: "Active",
  },
  {
    name: "Makassar Logistics Hub",
    type: "Warehouse",
    location: "Makassar",
    size: 18500,
    status: "Under Maintenance",
  },
];

const documents = [
  { name: "Property Deed - Menara Jakarta.pdf", date: "15 Jan 2023" },
  { name: "Building Permit - Surabaya Retail.pdf", date: "22 Mar 2023" },
  { name: "Insurance Policy - All Properties.pdf", date: "05 Apr 2023" },
  { name: "Tax Assessment - Q1 2023.pdf", date: "12 May 2023" },
  { name: "Valuation Report - Jakarta Portfolio.pdf", date: "30 Jun 2023" },
];

export default AssetRegistry;
