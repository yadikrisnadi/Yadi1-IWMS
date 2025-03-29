import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { BarChart, Activity, Users, Building2 } from "lucide-react";

interface SpaceUtilizationProps {
  departmentData?: {
    name: string;
    allocated: number;
    used: number;
    percentage: number;
  }[];
  typeData?: {
    name: string;
    allocated: number;
    used: number;
    percentage: number;
  }[];
  totalSpace?: {
    allocated: number;
    used: number;
    percentage: number;
  };
  historicalData?: {
    month: string;
    usage: number;
  }[];
}

const SpaceUtilization = ({
  departmentData = [
    { name: "Administration", allocated: 450, used: 405, percentage: 90 },
    { name: "Engineering", allocated: 600, used: 480, percentage: 80 },
    { name: "Finance", allocated: 300, used: 270, percentage: 90 },
    { name: "Marketing", allocated: 350, used: 245, percentage: 70 },
    { name: "Operations", allocated: 500, used: 425, percentage: 85 },
  ],
  typeData = [
    { name: "Office Space", allocated: 1200, used: 1080, percentage: 90 },
    { name: "Meeting Rooms", allocated: 400, used: 280, percentage: 70 },
    { name: "Common Areas", allocated: 300, used: 300, percentage: 100 },
    { name: "Storage", allocated: 200, used: 160, percentage: 80 },
    { name: "Facilities", allocated: 100, used: 85, percentage: 85 },
  ],
  totalSpace = {
    allocated: 2200,
    used: 1905,
    percentage: 87,
  },
  historicalData = [
    { month: "Jan", usage: 78 },
    { month: "Feb", usage: 82 },
    { month: "Mar", usage: 85 },
    { month: "Apr", usage: 83 },
    { month: "May", usage: 86 },
    { month: "Jun", usage: 87 },
  ],
}: SpaceUtilizationProps) => {
  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          Space Utilization Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Total Space Utilization</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">
                  {totalSpace.percentage}%
                </span>
                <span className="text-sm text-muted-foreground">
                  {totalSpace.used} / {totalSpace.allocated} m²
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Current Occupancy
              </span>
            </div>
          </div>

          <Progress value={totalSpace.percentage} className="h-2" />

          <Tabs defaultValue="department" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="department">By Department</TabsTrigger>
              <TabsTrigger value="type">By Space Type</TabsTrigger>
            </TabsList>

            <TabsContent value="department" className="pt-4">
              <div className="space-y-4">
                {departmentData.map((dept, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <span>{dept.name}</span>
                      <span className="font-medium">{dept.percentage}%</span>
                    </div>
                    <Progress value={dept.percentage} className="h-1.5" />
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Used: {dept.used} m²</span>
                      <span>Allocated: {dept.allocated} m²</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="type" className="pt-4">
              <div className="space-y-4">
                {typeData.map((type, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <span>{type.name}</span>
                      <span className="font-medium">{type.percentage}%</span>
                    </div>
                    <Progress value={type.percentage} className="h-1.5" />
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Used: {type.used} m²</span>
                      <span>Allocated: {type.allocated} m²</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="pt-2">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">
                Historical Usage Trend
              </span>
            </div>
            <div className="h-20 flex items-end justify-between gap-1">
              {historicalData.map((data, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <div
                    className="w-8 bg-gray-700 rounded-t"
                    style={{ height: `${data.usage}%` }}
                  ></div>
                  <span className="text-xs text-muted-foreground">
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpaceUtilization;
