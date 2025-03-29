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
import { Separator } from "../ui/separator";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  Leaf,
  LineChart,
  Lightbulb,
  Settings,
  ThermometerSun,
  Zap,
} from "lucide-react";
import { Floor, Space, SpaceType } from "../../models/spaceManagement";

interface FacilitiesOptimizationProps {
  floors: Floor[];
  spaces: Space[];
  spaceTypes: SpaceType[];
  selectedFloor: string;
  onFloorChange: (floorId: string) => void;
  loading: boolean;
}

const FacilitiesOptimization = ({
  floors,
  spaces,
  spaceTypes,
  selectedFloor,
  onFloorChange,
  loading,
}: FacilitiesOptimizationProps) => {
  const [activeTab, setActiveTab] = useState("energy");
  const [timeRange, setTimeRange] = useState("day");

  // Mock energy data for demonstration
  const mockEnergyData = [
    { hour: "00:00", value: 25 },
    { hour: "02:00", value: 20 },
    { hour: "04:00", value: 18 },
    { hour: "06:00", value: 30 },
    { hour: "08:00", value: 65 },
    { hour: "10:00", value: 85 },
    { hour: "12:00", value: 80 },
    { hour: "14:00", value: 90 },
    { hour: "16:00", value: 75 },
    { hour: "18:00", value: 60 },
    { hour: "20:00", value: 40 },
    { hour: "22:00", value: 30 },
  ];

  // Mock sustainability scores
  const sustainabilityScores = {
    energy: 78,
    water: 82,
    waste: 65,
    indoor: 90,
    overall: 79,
  };

  // Mock optimization recommendations
  const optimizationRecommendations = [
    {
      id: "1",
      title: "HVAC Schedule Optimization",
      description:
        "Adjust HVAC schedules based on actual occupancy patterns to reduce energy consumption.",
      impact: "high",
      savings: "15-20%",
      implementation: "easy",
      status: "pending",
    },
    {
      id: "2",
      title: "Smart Lighting Controls",
      description:
        "Install occupancy sensors and daylight harvesting systems in open workspaces.",
      impact: "medium",
      savings: "10-15%",
      implementation: "medium",
      status: "in-progress",
    },
    {
      id: "3",
      title: "Space Consolidation",
      description:
        "Consolidate underutilized spaces to reduce operational costs and energy usage.",
      impact: "high",
      savings: "20-25%",
      implementation: "complex",
      status: "planned",
    },
    {
      id: "4",
      title: "Water-Efficient Fixtures",
      description:
        "Replace existing fixtures with low-flow alternatives in restrooms and pantries.",
      impact: "medium",
      savings: "8-12%",
      implementation: "easy",
      status: "completed",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-blue-500">
            <Activity className="h-3 w-3 mr-1" /> In Progress
          </Badge>
        );
      case "planned":
        return (
          <Badge variant="outline">
            <Calendar className="h-3 w-3 mr-1" /> Planned
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge className="bg-green-500">High Impact</Badge>;
      case "medium":
        return <Badge className="bg-blue-500">Medium Impact</Badge>;
      case "low":
        return <Badge variant="outline">Low Impact</Badge>;
      default:
        return <Badge variant="outline">{impact}</Badge>;
    }
  };

  const getSustainabilityScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            Facilities Optimization
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
            <Button size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="energy">
              <Zap className="h-4 w-4 mr-2" />
              Energy Management
            </TabsTrigger>
            <TabsTrigger value="sustainability">
              <Leaf className="h-4 w-4 mr-2" />
              Sustainability
            </TabsTrigger>
            <TabsTrigger value="recommendations">
              <Lightbulb className="h-4 w-4 mr-2" />
              Optimization Recommendations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="energy" className="pt-4">
            <div className="flex space-x-4 mb-4">
              <div className="w-1/3">
                <Label htmlFor="time-range-energy">Time Range</Label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger id="time-range-energy">
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
                <Label htmlFor="floor-select-energy">Floor</Label>
                <Select value={selectedFloor} onValueChange={onFloorChange}>
                  <SelectTrigger id="floor-select-energy">
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
                <Label htmlFor="metric-select">Metric</Label>
                <Select defaultValue="electricity">
                  <SelectTrigger id="metric-select">
                    <SelectValue placeholder="Select Metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electricity">Electricity</SelectItem>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="gas">Gas</SelectItem>
                    <SelectItem value="hvac">HVAC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">1,245 kWh</div>
                    <div className="text-sm text-gray-500">Today's Usage</div>
                    <div className="text-xs text-green-500 mt-1">
                      -8% vs. yesterday
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">32,560 kWh</div>
                    <div className="text-sm text-gray-500">Monthly Usage</div>
                    <div className="text-xs text-green-500 mt-1">
                      -5% vs. last month
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">Rp 45.2M</div>
                    <div className="text-sm text-gray-500">Monthly Cost</div>
                    <div className="text-xs text-green-500 mt-1">
                      -3% vs. budget
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="border rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium mb-4">
                Energy Consumption Trend
              </h3>
              <div className="h-64">
                {/* Simplified chart representation */}
                <div className="h-full flex items-end space-x-2">
                  {mockEnergyData.map((item, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div
                        className="w-full bg-primary/80 rounded-t"
                        style={{ height: `${item.value}%` }}
                      ></div>
                      <div className="text-xs mt-1">{item.hour}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-4">
                <div>0 kWh</div>
                <div>Electricity Consumption</div>
                <div>100 kWh</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Energy Anomalies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                        <span>HVAC usage spike on Floor 2</span>
                      </div>
                      <Badge variant="outline" className="text-amber-500">
                        +25%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                        <span>Lighting after hours in Marketing</span>
                      </div>
                      <Badge variant="outline" className="text-amber-500">
                        4 hrs
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    Energy Saving Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Lightbulb className="h-4 w-4 mr-2 text-green-500" />
                        <span>Adjust HVAC schedules</span>
                      </div>
                      <Badge className="bg-green-500">15% saving</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Lightbulb className="h-4 w-4 mr-2 text-green-500" />
                        <span>Install motion sensors</span>
                      </div>
                      <Badge className="bg-green-500">10% saving</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sustainability" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium mb-4">
                  Sustainability Score
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Overall Score</span>
                      <span className="text-sm font-medium">
                        {sustainabilityScores.overall}%
                      </span>
                    </div>
                    <Progress
                      value={sustainabilityScores.overall}
                      className={`h-3 ${getSustainabilityScoreColor(
                        sustainabilityScores.overall,
                      )}`}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Energy Efficiency</span>
                      <span className="text-sm font-medium">
                        {sustainabilityScores.energy}%
                      </span>
                    </div>
                    <Progress
                      value={sustainabilityScores.energy}
                      className={`h-2 ${getSustainabilityScoreColor(
                        sustainabilityScores.energy,
                      )}`}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Water Conservation</span>
                      <span className="text-sm font-medium">
                        {sustainabilityScores.water}%
                      </span>
                    </div>
                    <Progress
                      value={sustainabilityScores.water}
                      className={`h-2 ${getSustainabilityScoreColor(
                        sustainabilityScores.water,
                      )}`}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Waste Management</span>
                      <span className="text-sm font-medium">
                        {sustainabilityScores.waste}%
                      </span>
                    </div>
                    <Progress
                      value={sustainabilityScores.waste}
                      className={`h-2 ${getSustainabilityScoreColor(
                        sustainabilityScores.waste,
                      )}`}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">
                        Indoor Environmental Quality
                      </span>
                      <span className="text-sm font-medium">
                        {sustainabilityScores.indoor}%
                      </span>
                    </div>
                    <Progress
                      value={sustainabilityScores.indoor}
                      className={`h-2 ${getSustainabilityScoreColor(
                        sustainabilityScores.indoor,
                      )}`}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-4">
                  Certification Status
                </h3>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">Greenship GBCI</div>
                        <div className="text-sm text-gray-500">
                          Indonesian Green Building Council
                        </div>
                      </div>
                      <Badge className="bg-green-500">Gold Certified</Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">BGH Certification</div>
                        <div className="text-sm text-gray-500">
                          Bangunan Gedung Hijau
                        </div>
                      </div>
                      <Badge className="bg-amber-500">In Progress</Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">ISO 14001</div>
                        <div className="text-sm text-gray-500">
                          Environmental Management
                        </div>
                      </div>
                      <Badge className="bg-green-500">Certified</Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">ISO 50001</div>
                        <div className="text-sm text-gray-500">
                          Energy Management
                        </div>
                      </div>
                      <Badge variant="outline">Planned</Badge>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-4">
                Environmental Monitoring
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <ThermometerSun className="h-5 w-5 mr-2 text-amber-500" />
                        <span className="font-medium">Temperature</span>
                      </div>
                      <span className="text-lg font-bold">24.5°C</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Within optimal range (23-26°C)
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-blue-500" />
                        <span className="font-medium">Humidity</span>
                      </div>
                      <span className="text-lg font-bold">55%</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Within optimal range (40-60%)
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Building2 className="h-5 w-5 mr-2 text-green-500" />
                        <span className="font-medium">CO₂ Level</span>
                      </div>
                      <span className="text-lg font-bold">650 ppm</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Excellent (below 800 ppm)
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="pt-4">
            <div className="space-y-4">
              {optimizationRecommendations.map((rec) => (
                <Card key={rec.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="font-medium">{rec.title}</div>
                        <div className="text-sm text-gray-500">
                          {rec.description}
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {getImpactBadge(rec.impact)}
                          <Badge variant="outline">
                            Savings: {rec.savings}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="border-gray-300 text-gray-500"
                          >
                            {rec.implementation} implementation
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(rec.status)}
                        <Button
                          variant={
                            rec.status === "completed" ? "outline" : "default"
                          }
                          size="sm"
                          disabled={rec.status === "completed"}
                        >
                          {rec.status === "completed"
                            ? "View Details"
                            : rec.status === "in-progress"
                              ? "Track Progress"
                              : "Implement"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Button>
                <Lightbulb className="h-4 w-4 mr-2" />
                Generate New Recommendations
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FacilitiesOptimization;
