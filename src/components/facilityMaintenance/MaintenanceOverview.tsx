import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const MaintenanceOverview = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t("totalAssets", "Total Assets")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% {t("fromLastMonth", "from last month")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t("openWorkOrders", "Open Work Orders")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground mt-1">
              -3% {t("fromLastMonth", "from last month")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t("scheduledMaintenance", "Scheduled Maintenance")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground mt-1">
              {t("nextSevenDays", "Next 7 days")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {t("maintenancePerformance", "Maintenance Performance")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>{t("responseTime", "Response Time")}</span>
              <span className="font-medium">4.2 {t("hours", "hours")}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{t("completionRate", "Completion Rate")}</span>
              <span className="font-medium">92%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>
                {t("preventiveVsCorrective", "Preventive vs Corrective")}
              </span>
              <span className="font-medium">68% / 32%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{t("averageCostPerOrder", "Average Cost Per Order")}</span>
              <span className="font-medium">Rp 1,250,000</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("recentActivities", "Recent Activities")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 1,
                type: t("workOrderCompleted", "Work Order Completed"),
                asset: "HVAC Unit B12",
                date: "2 jam yang lalu",
              },
              {
                id: 2,
                type: t("newWorkOrderCreated", "New Work Order Created"),
                asset: "Elevator 3",
                date: "5 jam yang lalu",
              },
              {
                id: 3,
                type: t("assetInspected", "Asset Inspected"),
                asset: "Fire Alarm System",
                date: "Kemarin, 15:30",
              },
              {
                id: 4,
                type: t("maintenanceScheduled", "Maintenance Scheduled"),
                asset: "Generator",
                date: "Kemarin, 10:15",
              },
            ].map((activity) => (
              <div
                key={activity.id}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{activity.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.asset}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {activity.date}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceOverview;
