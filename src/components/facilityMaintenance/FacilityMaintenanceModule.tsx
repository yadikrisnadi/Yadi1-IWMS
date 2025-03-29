import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter, Download, Plus } from "lucide-react";
import AssetManagement from "./AssetManagement";
import WorkOrderManagement from "./WorkOrderManagement";
import PreventiveMaintenance from "./PreventiveMaintenance";
import AssetLifecycleManagement from "./AssetLifecycleManagement";

const FacilityMaintenanceModule = () => {
  const [activeTab, setActiveTab] = useState("assets");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="w-full h-full bg-white shadow-sm rounded-lg border">
      <div className="p-4 pb-2 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">
            Facility Maintenance Management
          </h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Work Order
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <Tabs
          defaultValue="assets"
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="assets">Asset Management</TabsTrigger>
            <TabsTrigger value="workorders">Work Order Management</TabsTrigger>
            <TabsTrigger value="preventive">Preventive Maintenance</TabsTrigger>
            <TabsTrigger value="lifecycle">Asset Lifecycle</TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="pt-4">
            <AssetManagement />
          </TabsContent>

          <TabsContent value="workorders" className="pt-4">
            <WorkOrderManagement />
          </TabsContent>

          <TabsContent value="preventive" className="pt-4">
            <PreventiveMaintenance />
          </TabsContent>

          <TabsContent value="lifecycle" className="pt-4">
            <AssetLifecycleManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FacilityMaintenanceModule;
