import React, { useState, useEffect } from "react";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Checkbox } from "../ui/checkbox";
import { DatePicker } from "../ui/date-picker";
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
  RefreshCw,
  Info,
  MapPin,
  Settings,
  Sliders,
  CalendarRange,
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

// Default mock data for when real data is not available
const defaultFloors: Floor[] = [
  {
    id: "1",
    name: "Floor 1",
    buildingId: "1",
    number: "1",
    grossArea: 1000,
    netUsableArea: 850,
  },
  {
    id: "2",
    name: "Floor 2",
    buildingId: "1",
    number: "2",
    grossArea: 1000,
    netUsableArea: 850,
  },
  {
    id: "3",
    name: "Floor 3",
    buildingId: "1",
    number: "3",
    grossArea: 1000,
    netUsableArea: 850,
  },
];

const defaultSpaces: Space[] = [
  {
    id: "S1",
    name: "Meeting Room 101",
    floorId: "1",
    spaceTypeId: "1",
    number: "101",
    area: 30,
    capacity: 10,
    currentOccupancy: 8,
    status: "active",
  },
  {
    id: "S2",
    name: "Office Area A",
    floorId: "1",
    spaceTypeId: "2",
    number: "102",
    area: 100,
    capacity: 20,
    currentOccupancy: 18,
    status: "active",
  },
  {
    id: "S3",
    name: "Lounge",
    floorId: "1",
    spaceTypeId: "3",
    number: "103",
    area: 50,
    capacity: 15,
    currentOccupancy: 5,
    status: "active",
  },
  {
    id: "S4",
    name: "Meeting Room 201",
    floorId: "2",
    spaceTypeId: "1",
    number: "201",
    area: 35,
    capacity: 12,
    currentOccupancy: 10,
    status: "active",
  },
];

const defaultSpaceTypes: SpaceType[] = [
  {
    id: "1",
    name: "Meeting Room",
    color: "#4299E1",
    description: "Conference and meeting spaces",
    classificationId: "C1",
  },
  {
    id: "2",
    name: "Office Space",
    color: "#48BB78",
    description: "General work areas",
    classificationId: "C2",
  },
  {
    id: "3",
    name: "Common Area",
    color: "#ED8936",
    description: "Shared spaces",
    classificationId: "C3",
  },
];

const SpaceUtilizationTracking = ({
  floors = defaultFloors,
  spaces = defaultSpaces,
  spaceTypes = defaultSpaceTypes,
  selectedFloor = defaultFloors.length > 0 ? defaultFloors[0].id : "",
  onFloorChange = () => {},
  loading = false,
}: SpaceUtilizationTrackingProps) => {
  const [activeTab, setActiveTab] = useState("realtime");
  const [timeRange, setTimeRange] = useState("day");
  const [selectedSpaceType, setSelectedSpaceType] = useState("all");
  const [selectedDateRange, setSelectedDateRange] = useState<{
    from: Date;
    to: Date | undefined;
  }>({ from: new Date(), to: undefined });
  const [refreshInterval, setRefreshInterval] = useState<number | null>(30); // 30 seconds refresh
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [occupancyThreshold, setOccupancyThreshold] = useState<
    [number, number]
  >([0, 100]);

  // Always have data to display by using the provided props (which now have defaults)
  const actualFloors = floors.length > 0 ? floors : defaultFloors;
  const actualSpaces =
    spaces.filter((space) => space.floorId === selectedFloor).length > 0
      ? spaces.filter((space) => space.floorId === selectedFloor)
      : defaultSpaces.filter((space) => space.floorId === selectedFloor);
  const actualSpaceTypes =
    spaceTypes.length > 0 ? spaceTypes : defaultSpaceTypes;
  const actualSelectedFloor =
    selectedFloor || (actualFloors.length > 0 ? actualFloors[0].id : "");

  // Effect for auto-refresh
  useEffect(() => {
    let intervalId: number | null = null;

    if (refreshInterval && activeTab === "realtime") {
      intervalId = window.setInterval(() => {
        // In a real app, this would fetch fresh data
        console.log("Auto-refreshing real-time data...");
        setLastRefreshed(new Date());
      }, refreshInterval * 1000);
    }

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [refreshInterval, activeTab]);

  // Manual refresh function
  const handleManualRefresh = () => {
    // In a real app, this would fetch fresh data
    console.log("Manually refreshing data...");
    setLastRefreshed(new Date());
  };

  // Ensure we have a floor change handler even if none is provided
  const handleFloorChange = (floorId: string) => {
    if (onFloorChange) {
      onFloorChange(floorId);
    }
  };

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
  const totalCapacity = actualSpaces.reduce(
    (sum, space) => sum + (space.capacity || 0),
    0,
  );
  const totalOccupancy = actualSpaces.reduce(
    (sum, space) => sum + (space.currentOccupancy || 0),
    0,
  );
  const utilizationPercentage =
    totalCapacity > 0 ? (totalOccupancy / totalCapacity) * 100 : 0;

  // Apply all filters to spaces
  const filteredSpaces = actualSpaces.filter((space) => {
    // Filter by space type if selected
    if (
      selectedSpaceType &&
      selectedSpaceType !== "all" &&
      space.spaceTypeId !== selectedSpaceType
    ) {
      return false;
    }

    // Filter by status if any statuses are selected
    if (
      selectedStatus.length > 0 &&
      !selectedStatus.includes(space.status || "active")
    ) {
      return false;
    }

    // Filter by occupancy threshold
    const utilization = space.capacity
      ? ((space.currentOccupancy || 0) / space.capacity) * 100
      : 0;
    if (
      utilization < occupancyThreshold[0] ||
      utilization > occupancyThreshold[1]
    ) {
      return false;
    }

    return true;
  });

  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 70) return "bg-amber-500";
    return "bg-green-500";
  };

  const getSpaceTypeColor = (spaceTypeId: string) => {
    const spaceType = actualSpaceTypes.find((st) => st.id === spaceTypeId);
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
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Advanced Filters</h4>
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Status</h5>
                    <div className="flex flex-wrap gap-2">
                      {["active", "inactive", "maintenance", "reserved"].map(
                        (status) => (
                          <div
                            key={status}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`status-${status}`}
                              checked={selectedStatus.includes(status)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedStatus((prev) => [
                                    ...prev,
                                    status,
                                  ]);
                                } else {
                                  setSelectedStatus((prev) =>
                                    prev.filter((s) => s !== status),
                                  );
                                }
                              }}
                            />
                            <label
                              htmlFor={`status-${status}`}
                              className="text-sm capitalize"
                            >
                              {status}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Occupancy Range</h5>
                    <div className="px-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{occupancyThreshold[0]}%</span>
                        <span>{occupancyThreshold[1]}%</span>
                      </div>
                      {/* This would be a dual slider in a real implementation */}
                      <div className="h-2 bg-gray-200 rounded-full relative">
                        <div
                          className="absolute h-full bg-primary rounded-full"
                          style={{
                            left: `${occupancyThreshold[0]}%`,
                            width: `${occupancyThreshold[1] - occupancyThreshold[0]}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setSelectedStatus([]);
                      setOccupancyThreshold([0, 100]);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Button variant="outline" size="sm" onClick={handleManualRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
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

          {activeTab === "realtime" && (
            <div className="flex items-center justify-end mt-2 text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              Last updated: {lastRefreshed.toLocaleTimeString()} ·
              <Select
                value={refreshInterval?.toString() || "manual"}
                onValueChange={(val) =>
                  setRefreshInterval(val === "manual" ? null : parseInt(val))
                }
              >
                <SelectTrigger className="h-6 text-xs border-0 w-32 ml-1">
                  <SelectValue placeholder="Refresh rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual refresh</SelectItem>
                  <SelectItem value="10">Every 10 seconds</SelectItem>
                  <SelectItem value="30">Every 30 seconds</SelectItem>
                  <SelectItem value="60">Every minute</SelectItem>
                  <SelectItem value="300">Every 5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <TabsContent value="realtime" className="pt-4">
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="w-[calc(33%-1rem)]">
                <Label htmlFor="floor-select">Floor</Label>
                <Select
                  value={actualSelectedFloor}
                  onValueChange={handleFloorChange}
                >
                  <SelectTrigger id="floor-select">
                    <SelectValue placeholder="Select Floor" />
                  </SelectTrigger>
                  <SelectContent>
                    {actualFloors.map((floor) => (
                      <SelectItem key={floor.id} value={floor.id}>
                        {floor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[calc(33%-1rem)]">
                <Label htmlFor="space-type-select">Space Type</Label>
                <Select
                  value={selectedSpaceType}
                  onValueChange={setSelectedSpaceType}
                >
                  <SelectTrigger id="space-type-select">
                    <SelectValue placeholder="All Space Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Space Types</SelectItem>
                    {actualSpaceTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[calc(33%-1rem)]">
                <div className="flex justify-between">
                  <Label htmlFor="current-time">Current Time</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  >
                    <Sliders className="h-3 w-3 mr-1" />
                    {showAdvancedFilters ? "Hide" : "Show"} Advanced
                  </Button>
                </div>
                <div className="flex h-10 items-center rounded-md border bg-background px-3 py-2 text-sm">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  {new Date().toLocaleTimeString()}
                </div>
              </div>

              {showAdvancedFilters && (
                <div className="w-full mt-2 p-3 border rounded-md bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs">Status Filter</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {["active", "inactive", "maintenance", "reserved"].map(
                          (status) => (
                            <Badge
                              key={status}
                              variant={
                                selectedStatus.includes(status)
                                  ? "default"
                                  : "outline"
                              }
                              className="cursor-pointer capitalize"
                              onClick={() => {
                                if (selectedStatus.includes(status)) {
                                  setSelectedStatus((prev) =>
                                    prev.filter((s) => s !== status),
                                  );
                                } else {
                                  setSelectedStatus((prev) => [
                                    ...prev,
                                    status,
                                  ]);
                                }
                              }}
                            >
                              {status}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">Occupancy Range</Label>
                      <div className="px-2 mt-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>{occupancyThreshold[0]}%</span>
                          <span>{occupancyThreshold[1]}%</span>
                        </div>
                        {/* This would be a dual slider in a real implementation */}
                        <div className="h-2 bg-gray-200 rounded-full relative">
                          <div
                            className="absolute h-full bg-primary rounded-full"
                            style={{
                              left: `${occupancyThreshold[0]}%`,
                              width: `${occupancyThreshold[1] - occupancyThreshold[0]}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setSelectedStatus([]);
                          setOccupancyThreshold([0, 100]);
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  </div>
                </div>
              )}
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
                  {filteredSpaces.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No spaces found for the selected criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredSpaces.map((space) => {
                      const spaceType = actualSpaceTypes.find(
                        (st) => st.id === space.spaceTypeId,
                      );
                      const utilization =
                        space.capacity > 0
                          ? ((space.currentOccupancy || 0) / space.capacity) *
                            100
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
                              {spaceType?.name || "Unknown"}
                            </div>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {space.currentOccupancy || 0}/{space.capacity || 0}
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
                    })
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="historical" className="pt-4">
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="w-[calc(33%-1rem)]">
                <Label htmlFor="date-range">Date Range</Label>
                <div className="flex h-10 items-center rounded-md border bg-background px-3 py-2 text-sm">
                  <CalendarRange className="h-4 w-4 mr-2 text-gray-500" />
                  {selectedDateRange.from
                    ? selectedDateRange.from.toLocaleDateString()
                    : "Select start date"}
                  {selectedDateRange.to
                    ? ` - ${selectedDateRange.to.toLocaleDateString()}`
                    : ""}
                </div>
              </div>
              <div className="w-[calc(33%-1rem)]">
                <Label htmlFor="time-range">Time Period</Label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger id="time-range">
                    <SelectValue placeholder="Select Time Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Daily</SelectItem>
                    <SelectItem value="week">Weekly</SelectItem>
                    <SelectItem value="month">Monthly</SelectItem>
                    <SelectItem value="quarter">Quarterly</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[calc(33%-1rem)]">
                <Label htmlFor="floor-select-historical">Floor</Label>
                <Select
                  value={actualSelectedFloor}
                  onValueChange={handleFloorChange}
                >
                  <SelectTrigger id="floor-select-historical">
                    <SelectValue placeholder="Select Floor" />
                  </SelectTrigger>
                  <SelectContent>
                    {actualFloors.map((floor) => (
                      <SelectItem key={floor.id} value={floor.id}>
                        {floor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[calc(33%-1rem)]">
                <Label htmlFor="space-type-historical">Space Type</Label>
                <Select
                  value={selectedSpaceType}
                  onValueChange={setSelectedSpaceType}
                >
                  <SelectTrigger id="space-type-historical">
                    <SelectValue placeholder="All Space Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Space Types</SelectItem>
                    {actualSpaceTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[calc(33%-1rem)]">
                <Label htmlFor="data-granularity">Data Granularity</Label>
                <Select defaultValue="hourly">
                  <SelectTrigger id="data-granularity">
                    <SelectValue placeholder="Select Granularity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[calc(33%-1rem)]">
                <Label htmlFor="data-metric">Metric</Label>
                <Select defaultValue="occupancy">
                  <SelectTrigger id="data-metric">
                    <SelectValue placeholder="Select Metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="occupancy">Occupancy Rate</SelectItem>
                    <SelectItem value="utilization">
                      Space Utilization
                    </SelectItem>
                    <SelectItem value="capacity">Capacity Usage</SelectItem>
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
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="w-[calc(33%-1rem)]">
                <Label htmlFor="heatmap-floor">Floor</Label>
                <Select
                  value={actualSelectedFloor}
                  onValueChange={handleFloorChange}
                >
                  <SelectTrigger id="heatmap-floor">
                    <SelectValue placeholder="Select Floor" />
                  </SelectTrigger>
                  <SelectContent>
                    {actualFloors.map((floor) => (
                      <SelectItem key={floor.id} value={floor.id}>
                        {floor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[calc(33%-1rem)]">
                <Label htmlFor="heatmap-metric">Heatmap Metric</Label>
                <Select defaultValue="occupancy">
                  <SelectTrigger id="heatmap-metric">
                    <SelectValue placeholder="Select Metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="occupancy">Current Occupancy</SelectItem>
                    <SelectItem value="utilization">
                      Utilization Rate
                    </SelectItem>
                    <SelectItem value="frequency">Usage Frequency</SelectItem>
                    <SelectItem value="duration">Average Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[calc(33%-1rem)]">
                <Label htmlFor="heatmap-time">Time Period</Label>
                <Select defaultValue="today">
                  <SelectTrigger id="heatmap-time">
                    <SelectValue placeholder="Select Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border rounded-lg p-6 mb-6 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">Floor Plan Heatmap</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Image
                  </Button>
                </div>
              </div>

              <div className="relative w-full h-[400px] bg-white border rounded-md flex items-center justify-center">
                <div className="text-center p-6 text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">
                    Heatmap Visualization Coming Soon
                  </h3>
                  <p className="max-w-md mx-auto">
                    The utilization heatmap feature is planned for the next
                    phase of implementation. This will provide a visual
                    representation of space usage patterns across the floor
                    plan.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="text-xs">Low</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <span className="text-xs">Medium</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span className="text-xs">High</span>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                  >
                    <Info className="h-3 w-3 mr-1" />
                    How to read this heatmap
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    Most Utilized Spaces
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {filteredSpaces.slice(0, 3).map((space, index) => {
                      const utilization = space.capacity
                        ? ((space.currentOccupancy || 0) / space.capacity) * 100
                        : 0;
                      return (
                        <div
                          key={space.id}
                          className="flex justify-between items-center"
                        >
                          <div className="flex items-center">
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs mr-2">
                              {index + 1}
                            </span>
                            <span>{space.name}</span>
                          </div>
                          <Badge className={getUtilizationColor(utilization)}>
                            {Math.round(utilization)}%
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    Least Utilized Spaces
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[...filteredSpaces]
                      .sort((a, b) => {
                        const utilizationA = a.capacity
                          ? ((a.currentOccupancy || 0) / a.capacity) * 100
                          : 0;
                        const utilizationB = b.capacity
                          ? ((b.currentOccupancy || 0) / b.capacity) * 100
                          : 0;
                        return utilizationA - utilizationB;
                      })
                      .slice(0, 3)
                      .map((space, index) => {
                        const utilization = space.capacity
                          ? ((space.currentOccupancy || 0) / space.capacity) *
                            100
                          : 0;
                        return (
                          <div
                            key={space.id}
                            className="flex justify-between items-center"
                          >
                            <div className="flex items-center">
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 text-gray-700 text-xs mr-2">
                                {index + 1}
                              </span>
                              <span>{space.name}</span>
                            </div>
                            <Badge variant="outline">
                              {Math.round(utilization)}%
                            </Badge>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SpaceUtilizationTracking;
