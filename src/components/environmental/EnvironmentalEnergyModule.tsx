import React, { useState, lazy, Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter, Download, Plus, AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import LoadingFallback from "@/components/common/LoadingFallback";

// Lazy load the main component to improve performance
const EnvironmentalEnergyManagement = lazy(
  () => import("./EnvironmentalEnergyManagement"),
);

const EnvironmentalEnergyModule = () => {
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
            {t("environmentalEnergyTitle", "Environmental & Energy Management")}
          </h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              {t("filter", "Filter")}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              {t("export", "Export")}
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {t("newReport", "New Report")}
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-6 mb-4">
            <TabsTrigger value="overview">
              {t("overview", "Overview")}
            </TabsTrigger>
            <TabsTrigger value="energy">{t("energy", "Energy")}</TabsTrigger>
            <TabsTrigger value="water">{t("water", "Water")}</TabsTrigger>
            <TabsTrigger value="carbon">{t("carbon", "Carbon")}</TabsTrigger>
            <TabsTrigger value="waste">{t("waste", "Waste")}</TabsTrigger>
            <TabsTrigger value="compliance">
              {t("compliance", "Compliance")}
            </TabsTrigger>
          </TabsList>

          <ErrorBoundary
            moduleName={`Environmental & Energy - ${activeTab}`}
            onReset={handleErrorReset}
          >
            <TabsContent value="overview" className="pt-4">
              <Suspense
                fallback={
                  <LoadingFallback
                    message={t(
                      "loadingEnvironmental",
                      "Memuat data lingkungan dan energi...",
                    )}
                  />
                }
              >
                <EnvironmentalEnergyManagement />
              </Suspense>
            </TabsContent>

            <TabsContent value="energy" className="pt-4">
              <Suspense
                fallback={
                  <LoadingFallback
                    message={t("loadingEnergy", "Memuat data energi...")}
                  />
                }
              >
                <EnvironmentalEnergyManagement />
              </Suspense>
            </TabsContent>

            <TabsContent value="water" className="pt-4">
              <Suspense
                fallback={
                  <LoadingFallback
                    message={t("loadingWater", "Memuat data air...")}
                  />
                }
              >
                <EnvironmentalEnergyManagement />
              </Suspense>
            </TabsContent>

            <TabsContent value="carbon" className="pt-4">
              <Suspense
                fallback={
                  <LoadingFallback
                    message={t("loadingCarbon", "Memuat data karbon...")}
                  />
                }
              >
                <EnvironmentalEnergyManagement />
              </Suspense>
            </TabsContent>

            <TabsContent value="waste" className="pt-4">
              <Suspense
                fallback={
                  <LoadingFallback
                    message={t("loadingWaste", "Memuat data sampah...")}
                  />
                }
              >
                <EnvironmentalEnergyManagement />
              </Suspense>
            </TabsContent>

            <TabsContent value="compliance" className="pt-4">
              <Suspense
                fallback={
                  <LoadingFallback
                    message={t("loadingCompliance", "Memuat data kepatuhan...")}
                  />
                }
              >
                <EnvironmentalEnergyManagement />
              </Suspense>
            </TabsContent>
          </ErrorBoundary>
        </Tabs>
      </div>
    </div>
  );
};

export default EnvironmentalEnergyModule;
