import React from "react";
import { AlertTriangle, CheckCircle, ChevronRight, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ComplianceItem {
  id: string;
  name: string;
  progress: number;
  status: "compliant" | "warning" | "non-compliant" | "in-progress";
  dueDate: string;
  description: string;
}

interface ComplianceStatusProps {
  gbciItems?: ComplianceItem[];
  bghItems?: ComplianceItem[];
  title?: string;
  description?: string;
}

const ComplianceStatus = ({
  gbciItems = [
    {
      id: "1",
      name: "Energy Efficiency",
      progress: 85,
      status: "compliant",
      dueDate: "2023-12-31",
      description: "Building energy consumption optimization",
    },
    {
      id: "2",
      name: "Water Conservation",
      progress: 70,
      status: "in-progress",
      dueDate: "2023-11-15",
      description: "Water recycling and usage reduction",
    },
    {
      id: "3",
      name: "Waste Management",
      progress: 45,
      status: "warning",
      dueDate: "2023-10-30",
      description: "Waste reduction and recycling programs",
    },
  ],
  bghItems = [
    {
      id: "4",
      name: "Indoor Air Quality",
      progress: 90,
      status: "compliant",
      dueDate: "2023-12-15",
      description: "Ventilation and air quality monitoring",
    },
    {
      id: "5",
      name: "Building Materials",
      progress: 60,
      status: "in-progress",
      dueDate: "2023-11-20",
      description: "Sustainable and low-emission materials",
    },
    {
      id: "6",
      name: "PP No. 16/2021 Compliance",
      progress: 30,
      status: "non-compliant",
      dueDate: "2023-10-01",
      description: "Regulatory compliance with Indonesian standards",
    },
  ],
  title = "Compliance Status",
  description = "Track certification progress for Greenship GBCI and BGH standards",
}: ComplianceStatusProps) => {
  const getStatusIcon = (status: ComplianceItem["status"]) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "non-compliant":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "in-progress":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: ComplianceItem["status"]) => {
    switch (status) {
      case "compliant":
        return "bg-green-500";
      case "warning":
        return "bg-amber-500";
      case "non-compliant":
        return "bg-red-500";
      case "in-progress":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
              Greenship GBCI Certification
            </h3>
            <div className="space-y-3 max-h-[120px] overflow-y-auto pr-2">
              {gbciItems.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-md p-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      {getStatusIcon(item.status)}
                      <span className="ml-2 text-sm font-medium">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Due: {item.dueDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={item.progress}
                      className="h-1.5"
                      indicatorClassName={cn(getStatusColor(item.status))}
                    />
                    <span className="text-xs font-medium">
                      {item.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
              BGH Certification (PP No. 16/2021)
            </h3>
            <div className="space-y-3 max-h-[120px] overflow-y-auto pr-2">
              {bghItems.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-md p-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      {getStatusIcon(item.status)}
                      <span className="ml-2 text-sm font-medium">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Due: {item.dueDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={item.progress}
                      className="h-1.5"
                      indicatorClassName={cn(getStatusColor(item.status))}
                    />
                    <span className="text-xs font-medium">
                      {item.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t p-3">
        <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center ml-auto">
          View detailed compliance report
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </CardFooter>
    </Card>
  );
};

export default ComplianceStatus;
