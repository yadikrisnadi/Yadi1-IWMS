import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  BarChart3,
  Calendar,
  Clock,
  Download,
  Filter,
  LineChart,
  PieChart,
  Users,
  Zap,
} from "lucide-react";
import {
  Floor,
  Space,
  SpaceType,
  OccupancyData,
} from "../../models/spaceManagement";

interface SpaceUtilizationTrackingProps {
  floors: Floor[];
  spaces: Space[];
  spaceTypes: SpaceType[];
  selectedFloor: string;
  onFloorChange: (floorId: string) => void;
  loading: boolean;
}

const SpaceUtilizationTracking = ({
  floors,
  spaces,
  spaceTypes,
  selectedFloor,
  onFloorChange,
  loading,
}: SpaceUtilizationTrackingProps) => {
  const [activeTab, setActiveTab] = useState("realtime");
  const [timeRange, setTimeRange] = useState("day");
  const [selectedSpaceType, setSelectedSpaceType] = useState("");

  // Mock occupancy data for demonstration
  const mockHourlyData = [
    { hour: "08:00", occupancy: 10 },
    { hour: "09:00", occupancy: 35 },
    { hour: "10:00", occupancy: 65 },
    { hour: "11:00", occupancy: 80 },
    { hour: "12:00", occupancy: 50 },
    { hour: "13:00", occupancy: 45 },
    { hour: "14:00", occupancy: 75 },
    { hour: "15:00", occupancy: 85 },
    { hour: "16:00", occupancy: 70 },
    { hour: "17:00", occupancy: 40 },
    { hour: "18:00", occupancy: 15 },
  ];

  const mockWeeklyData = [
    { day: "Mon", occupancy: 65 },
    { day: "Tue", occupancy: 70 },
    { day: "Wed", occupancy: 75 },
    { day: "Thu", occupancy: 80 },
    { day: "Fri", occupancy: 60 },
    { day: "Sat", occupancy: 20 },
    { day: "Sun", occupancy: 5 },
  ];

  // Calculate total capacity and current occupancy
  const totalCapacity = spaces.reduce((sum, space) => sum + space.capacity, 0);
  const totalOccupancy = spaces.reduce(
    (sum, space) => sum + (space.currentOccupancy || 0),
    0,
  );
  const utilizationPercentage =
    totalCapacity > 0 ? (totalOccupancy / totalCapacity) * 100 : 0;

  // Filter spaces by type if selected
  const filteredSpaces = selectedSpaceType
    ? spaces.filter((space) => space.spaceTypeId === selectedSpaceType)
    : spaces;

  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 70) return "bg-amber-500";
    return "bg-green-500";
  };

  const getSpaceTypeColor = (spaceTypeId: string) => {
    const spaceType = spaceTypes.find((st) => st.id === spaceTypeId);
    return spaceType?.color || "#CBD5E0";
  };

  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Space Utilization Tracking
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="realtime">
              <Zap className="h-4 w-4 mr-2" />
              Real-time Occupancy
            </TabsTrigger>
            <TabsTrigger value="historical">
              <BarChart3 className="h-4 w-4 mr-2" />
              Historical Data
            </TabsTrigger>
            <TabsTrigger value="heatmap">
              <PieChart className="h-4 w-4 mr-2" />
              Utilization Heatmap
            </TabsTrigger>
          </TabsList>

          <TabsContent value="realtime" className="pt-4">
            <div className="flex space-x-4 mb-4">
              <div className="w-1/3">
                <Label htmlFor="floor-select">Floor</Label>
                <Select value={selectedFloor} onValueChange={onFloorChange}>
                  <SelectTrigger id="floor-select">
                    <SelectValue placeholder="Select Floor" />
                  </SelectTrigger>
                  <SelectContent>
                    {floors.map((floor) => (
                      <SelectItem key={floor.id} value={floor.id}>
                        {floor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/3">
                <Label htmlFor="space-type-select">Space Type</Label>
                <Select
                  value={selectedSpaceType}
                  onValueChange={setSelectedSpaceType}
                >
                  <SelectTrigger id="space-type-select">
                    <SelectValue placeholder="All Space Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Space Types</SelectItem>
                    {spaceTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/3">
                <Label htmlFor="current-time">Current Time</Label>
                <div className="flex h-10 items-center rounded-md border bg-background px-3 py-2 text-sm">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{totalOccupancy}</div>
                    <div className="text-sm text-gray-500">
                      Current Occupancy
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{totalCapacity}</div>
                    <div className="text-sm text-gray-500">Total Capacity</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {utilizationPercentage.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-500">
                      Utilization Rate
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="border rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium mb-4">Overall Utilization</h3>
              <Progress
                value={utilizationPercentage}
                className={`h-3 ${getUtilizationColor(utilizationPercentage)}`}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Space
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Occupancy
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Utilization
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSpaces.map((space) => {
                    const spaceType = spaceTypes.find(
                      (st) => st.id === space.spaceTypeId,
                    );
                    const utilization =
                      space.capacity > 0
                        ? ((space.currentOccupancy || 0) / space.capacity) * 100
                        : 0;
                    return (
                      <tr key={space.id}>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {space.name}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <span
                              className="inline-block w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: spaceType?.color }}
                            ></span>
                            {spaceType?.name}
                          </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {space.currentOccupancy || 0}/{space.capacity}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${getUtilizationColor(
                                utilization,
                              )}`}
                              style={{ width: `${utilization}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <Badge className={getUtilizationColor(utilization)}>
                            {utilization >= 90
                              ? "High"
                              : utilization >= 70
                                ? "Medium"
                                : "Low"}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="historical" className="pt-4">
            <div className="flex space-x-4 mb-4">
              <div className="w-1/3">
                <Label htmlFor="time-range">Time Range</Label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger id="time-range">
                    <SelectValue placeholder="Select Time Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/3">
                <Label htmlFor="floor-select-historical">Floor</Label>
                <Select value={selectedFloor} onValueChange={onFloorChange}>
                  <SelectTrigger id="floor-select-historical">
                    <SelectValue placeholder="Select Floor" />
                  </SelectTrigger>
                  <SelectContent>
                    {floors.map((floor) => (
                      <SelectItem key={floor.id} value={floor.id}>
                        {floor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/3">
                <Label htmlFor="space-type-historical">Space Type</Label>
                <Select
                  value={selectedSpaceType}
                  onValueChange={setSelectedSpaceType}
                >
                  <SelectTrigger id="space-type-historical">
                    <SelectValue placeholder="All Space Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Space Types</SelectItem>
                    {spaceTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium mb-4">
                {timeRange === "day" ? "Hourly" : "Daily"} Occupancy Trend
              </h3>
              <div className="h-64">
                {/* Simplified chart representation */}
                <div className="h-full flex items-end space-x-2">
                  {(timeRange === "day" ? mockHourlyData : mockWeeklyData).map(
                    (item, index) => (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center"
                      >
                        <div
                          className="w-full bg-primary/80 rounded-t"
                          style={{ height: `${item.occupancy}%` }}
                        ></div>
                        <div className="text-xs mt-1">
                          {timeRange === "day" ? item.hour : item.day}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-4">
                <div>0%</div>
                <div>Occupancy Rate</div>
                <div>100%</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    Peak Occupancy Times
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Tuesday, 10:00 - 11:30</span>
                      </div>
                      <Badge>85%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Wednesday, 14:00 - 15:30</span>
                      </div>
                      <Badge>82%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Thursday, 11:00 - 12:30</span>
                      </div>
                      <Badge>80%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Low Occupancy Times</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Saturday, All Day</span>
                      </div>
                      <Badge variant="outline">20%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Sunday, All Day</span>
                      </div>
                      <Badge variant="outline">5%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Weekdays, 18:00 - 08:00</span>
                      </div>
                      <Badge variant="outline">15%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="heatmap" className="pt-4">
            <div className="text-center p-12 text-gray-500">
              Utilization Heatmap will be implemented in the next phase.
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SpaceUtilizationTracking;
