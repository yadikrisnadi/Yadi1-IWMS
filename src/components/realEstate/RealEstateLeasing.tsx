import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Building2,
  Calendar,
  ClipboardList,
  BarChart3,
  Tag,
} from "lucide-react";
import PropertyPortfolio from "./PropertyPortfolio";
import LeaseAdministration from "../lease/LeaseAdministration";
import AssetRegistry from "./AssetRegistry";
import LeaseManagement from "./LeaseManagement";
import TransactionManagement from "./TransactionManagement";

interface RealEstatePortfolioManagementProps {
  // Props if needed
}

const RealEstatePortfolioManagement: React.FC<
  RealEstatePortfolioManagementProps
> = () => {
  const [activeTab, setActiveTab] = useState<string>("properties");

  return (
    <div className="w-full bg-background p-6 rounded-lg shadow-sm border">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">
          Real Estate & Portfolio Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive tools for managing your property portfolio, leases,
          assets, and transactions
        </p>
      </div>

      <Tabs
        defaultValue="properties"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full max-w-4xl grid-cols-5 mb-8">
          <TabsTrigger value="properties" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Properties
          </TabsTrigger>
          <TabsTrigger value="leases" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Leases
          </TabsTrigger>
          <TabsTrigger value="assets" className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Assets
          </TabsTrigger>
          <TabsTrigger
            value="lease-management"
            className="flex items-center gap-2"
          >
            <ClipboardList className="h-4 w-4" />
            Lease Mgmt
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Transactions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="mt-0">
          <PropertyPortfolio />
        </TabsContent>

        <TabsContent value="leases" className="mt-0">
          <LeaseAdministration />
        </TabsContent>

        <TabsContent value="assets" className="mt-0">
          <AssetRegistry />
        </TabsContent>

        <TabsContent value="lease-management" className="mt-0">
          <LeaseManagement />
        </TabsContent>

        <TabsContent value="transactions" className="mt-0">
          <TransactionManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealEstatePortfolioManagement;
