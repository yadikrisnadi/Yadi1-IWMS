import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  Battery,
  Building,
  Calendar,
  Gauge,
  Users,
} from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  progress?: number;
  color?: "default" | "success" | "warning" | "danger";
}

const KpiCard = ({
  title = "Metric",
  value = "0",
  icon = <Gauge className="h-5 w-5" />,
  description = "Metric description",
  trend,
  progress,
  color = "default",
}: KpiCardProps) => {
  const colorClasses = {
    default: "bg-primary/10 text-primary",
    success: "bg-green-500/10 text-green-500",
    warning: "bg-yellow-500/10 text-yellow-500",
    danger: "bg-red-500/10 text-red-500",
  };

  return (
    <Card className="bg-white shadow-sm hover:shadow transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className={cn("p-2 rounded-full", colorClasses[color])}>
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">{value}</span>
            {trend && (
              <span
                className={`ml-2 flex items-center text-xs ${trend.isPositive ? "text-green-500" : "text-red-500"}`}
              >
                {trend.isPositive ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                {trend.value}%
              </span>
            )}
          </div>

          {progress !== undefined && (
            <Progress value={progress} className="h-1.5" />
          )}

          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

interface KpiOverviewProps {
  kpis?: KpiCardProps[];
}

const KpiOverview = ({ kpis }: KpiOverviewProps) => {
  const defaultKpis: KpiCardProps[] = [
    {
      title: "Energy Usage",
      value: "87.4 kWh/m²",
      icon: <Gauge className="h-5 w-5" />,
      description: "3% below monthly target",
      trend: { value: 5, isPositive: true },
      progress: 78,
      color: "success",
    },
    {
      title: "Occupancy Rate",
      value: "76%",
      icon: <Users className="h-5 w-5" />,
      description: "Average across all facilities",
      trend: { value: 2, isPositive: true },
      progress: 76,
      color: "default",
    },
    {
      title: "Maintenance Status",
      value: "12",
      icon: <Building className="h-5 w-5" />,
      description: "Pending maintenance tasks",
      trend: { value: 8, isPositive: false },
      progress: 65,
      color: "warning",
    },
    {
      title: "Compliance Score",
      value: "92%",
      icon: <Calendar className="h-5 w-5" />,
      description: "GBCI & BGH certifications",
      trend: { value: 3, isPositive: true },
      progress: 92,
      color: "success",
    },
    {
      title: "System Health",
      value: "98.7%",
      icon: <Battery className="h-5 w-5" />,
      description: "BMS & IoT uptime",
      trend: { value: 0.2, isPositive: true },
      progress: 98.7,
      color: "success",
    },
  ];

  const displayKpis = kpis || defaultKpis;

  return (
    <div className="w-full bg-background p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">
        Facility Performance Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {displayKpis.map((kpi, index) => (
          <KpiCard key={index} {...kpi} />
        ))}
      </div>
    </div>
  );
};

export default KpiOverview;
