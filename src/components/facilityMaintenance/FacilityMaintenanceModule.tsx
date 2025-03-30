import React, { useState, lazy, Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter, Download, Plus, AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import LoadingFallback from "@/components/common/LoadingFallback";

// Lazy load components to improve performance
const MaintenanceOverview = lazy(() => import("./MaintenanceOverview"));
const AssetManagement = lazy(() => import("./AssetManagement"));
const WorkOrderManagement = lazy(() => import("./WorkOrderManagement"));
const PreventiveMaintenance = lazy(() => import("./PreventiveMaintenance"));
const AssetLifecycleManagement = lazy(
  () => import("./AssetLifecycleManagement"),
);

const FacilityMaintenanceModule = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [hasError, setHasError] = useState(false);
  const { t } = useTranslation();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Reset error state when changing tabs
    setHasError(false);
  };

  const handleErrorReset = () => {
    setHasError(false);
  };

  return (
    <div className="w-full h-full bg-white shadow-sm rounded-lg border overflow-auto">
      <div className="p-4 pb-2 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">
            {t("facilityMaintenanceTitle")}
          </h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              {t("filter")}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              {t("export")}
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {t("newWorkOrder")}
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
          <TabsList className="grid w-full grid-cols-5 mb-4">
            <TabsTrigger value="overview">
              {t("overview", "Overview")}
            </TabsTrigger>
            <TabsTrigger value="assets">{t("facilityAssets")}</TabsTrigger>
            <TabsTrigger value="workorders">
              {t("workOrderManagement")}
            </TabsTrigger>
            <TabsTrigger value="preventive">
              {t("preventiveMaintenance")}
            </TabsTrigger>
            <TabsTrigger value="lifecycle">{t("assetLifecycle")}</TabsTrigger>
          </TabsList>

          <ErrorBoundary
            moduleName={`Facility Maintenance - ${activeTab}`}
            onReset={handleErrorReset}
          >
            <TabsContent value="overview" className="pt-4">
              <Suspense
                fallback={
                  <LoadingFallback
                    message={t(
                      "loadingOverview",
                      "Memuat ikhtisar pemeliharaan...",
                    )}
                  />
                }
              >
                <MaintenanceOverview />
              </Suspense>
            </TabsContent>

            <TabsContent value="assets" className="pt-4">
              <Suspense
                fallback={
                  <LoadingFallback
                    message={t("loadingAssets", "Memuat data aset...")}
                  />
                }
              >
                <AssetManagement />
              </Suspense>
            </TabsContent>

            <TabsContent value="workorders" className="pt-4">
              <Suspense
                fallback={
                  <LoadingFallback
                    message={t("loadingWorkOrders", "Memuat perintah kerja...")}
                  />
                }
              >
                <WorkOrderManagement />
              </Suspense>
            </TabsContent>

            <TabsContent value="preventive" className="pt-4">
              <Suspense
                fallback={
                  <LoadingFallback
                    message={t(
                      "loadingPreventive",
                      "Memuat jadwal pemeliharaan preventif...",
                    )}
                  />
                }
              >
                <PreventiveMaintenance />
              </Suspense>
            </TabsContent>

            <TabsContent value="lifecycle" className="pt-4">
              <Suspense
                fallback={
                  <LoadingFallback
                    message={t(
                      "loadingLifecycle",
                      "Memuat manajemen siklus hidup aset...",
                    )}
                  />
                }
              >
                <AssetLifecycleManagement />
              </Suspense>
            </TabsContent>
          </ErrorBoundary>
        </Tabs>
      </div>
    </div>
  );
};

export default FacilityMaintenanceModule;
