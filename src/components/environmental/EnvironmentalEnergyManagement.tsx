import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  AlertCircle,
  ArrowUpRight,
  Battery,
  BatteryCharging,
  Bolt,
  Building2,
  Calendar,
  ChevronDown,
  CloudRain,
  Download,
  Droplets,
  FileText,
  Flame,
  Leaf,
  Lightbulb,
  Thermometer,
  Upload,
  Wind,
} from "lucide-react";

const energyData = [
  { month: "Jan", consumption: 420, target: 450, savings: 30 },
  { month: "Feb", consumption: 430, target: 450, savings: 20 },
  { month: "Mar", consumption: 448, target: 450, savings: 2 },
  { month: "Apr", consumption: 415, target: 430, savings: 15 },
  { month: "May", consumption: 405, target: 430, savings: 25 },
  { month: "Jun", consumption: 390, target: 420, savings: 30 },
  { month: "Jul", consumption: 410, target: 420, savings: 10 },
];

const waterData = [
  { month: "Jan", consumption: 320, target: 350, savings: 30 },
  { month: "Feb", consumption: 330, target: 350, savings: 20 },
  { month: "Mar", consumption: 345, target: 350, savings: 5 },
  { month: "Apr", consumption: 310, target: 330, savings: 20 },
  { month: "May", consumption: 300, target: 330, savings: 30 },
  { month: "Jun", consumption: 290, target: 320, savings: 30 },
  { month: "Jul", consumption: 305, target: 320, savings: 15 },
];

const carbonData = [
  { name: "Electricity", value: 45 },
  { name: "Transportation", value: 25 },
  { name: "Heating", value: 15 },
  { name: "Water", value: 10 },
  { name: "Waste", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const certificationData = [
  {
    name: "Greenship GBCI",
    status: "In Progress",
    progress: 68,
    dueDate: "2024-12-15",
    priority: "High",
  },
  {
    name: "BGH Certification",
    status: "In Progress",
    progress: 42,
    dueDate: "2025-03-10",
    priority: "Medium",
  },
  {
    name: "ISO 14001",
    status: "Certified",
    progress: 100,
    dueDate: "2026-05-22",
    priority: "Completed",
  },
  {
    name: "ISO 50001",
    status: "Planning",
    progress: 15,
    dueDate: "2025-08-30",
    priority: "Low",
  },
];

const buildingData = [
  {
    id: 1,
    name: "Jakarta HQ",
    location: "Jakarta",
    energyScore: 85,
    waterScore: 78,
    carbonScore: 72,
    alerts: 2,
  },
  {
    id: 2,
    name: "Surabaya Office",
    location: "Surabaya",
    energyScore: 76,
    waterScore: 82,
    carbonScore: 68,
    alerts: 1,
  },
  {
    id: 3,
    name: "Bandung Campus",
    location: "Bandung",
    energyScore: 92,
    waterScore: 88,
    carbonScore: 90,
    alerts: 0,
  },
  {
    id: 4,
    name: "Bali Resort",
    location: "Denpasar",
    energyScore: 65,
    waterScore: 58,
    carbonScore: 62,
    alerts: 3,
  },
];

const EnvironmentalEnergyManagement = () => {
  const [selectedBuilding, setSelectedBuilding] = useState(buildingData[0]);

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-8 bg-slate-50">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-1 tracking-tight">
                Environmental & Energy Management
              </h1>
              <p className="text-slate-500">
                Monitor and optimize energy usage, water consumption, and
                environmental compliance
              </p>
            </div>

            {/* Building Selector */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Building Selection</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    {selectedBuilding.name} <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>
                  Select a building to view its environmental performance
                  metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {buildingData.map((building) => (
                    <Card
                      key={building.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${selectedBuilding.id === building.id ? "ring-2 ring-blue-500 shadow-md" : ""}`}
                      onClick={() => setSelectedBuilding(building)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{building.name}</h3>
                            <p className="text-sm text-slate-500">
                              {building.location}
                            </p>
                          </div>
                          {building.alerts > 0 && (
                            <Badge variant="destructive" className="ml-2">
                              {building.alerts}{" "}
                              {building.alerts === 1 ? "Alert" : "Alerts"}
                            </Badge>
                          )}
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <Bolt className="h-4 w-4 text-amber-500" />
                              <span>Energy</span>
                            </div>
                            <span
                              className={`font-medium ${building.energyScore >= 80 ? "text-green-600" : building.energyScore >= 70 ? "text-amber-600" : "text-red-600"}`}
                            >
                              {building.energyScore}/100
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <Droplets className="h-4 w-4 text-blue-500" />
                              <span>Water</span>
                            </div>
                            <span
                              className={`font-medium ${building.waterScore >= 80 ? "text-green-600" : building.waterScore >= 70 ? "text-amber-600" : "text-red-600"}`}
                            >
                              {building.waterScore}/100
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <Leaf className="h-4 w-4 text-green-500" />
                              <span>Carbon</span>
                            </div>
                            <span
                              className={`font-medium ${building.carbonScore >= 80 ? "text-green-600" : building.carbonScore >= 70 ? "text-amber-600" : "text-red-600"}`}
                            >
                              {building.carbonScore}/100
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Dashboard Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="energy">Energy</TabsTrigger>
                <TabsTrigger value="water">Water</TabsTrigger>
                <TabsTrigger value="carbon">Carbon</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Energy Consumption
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-amber-100 rounded-full">
                            <Bolt className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold">410 kWh</div>
                            <div className="text-xs text-slate-500">
                              Last 30 days
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                          <ArrowUpRight className="h-4 w-4" />
                          <span>-2.4%</span>
                        </div>
                      </div>
                      <Progress value={82} className="h-2 mt-4" />
                      <div className="flex justify-between mt-1 text-xs text-slate-500">
                        <span>Target: 420 kWh</span>
                        <span>82% of target</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Water Usage
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-blue-100 rounded-full">
                            <Droplets className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold">305 m³</div>
                            <div className="text-xs text-slate-500">
                              Last 30 days
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                          <ArrowUpRight className="h-4 w-4" />
                          <span>-4.7%</span>
                        </div>
                      </div>
                      <Progress value={95} className="h-2 mt-4" />
                      <div className="flex justify-between mt-1 text-xs text-slate-500">
                        <span>Target: 320 m³</span>
                        <span>95% of target</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Carbon Footprint
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-green-100 rounded-full">
                            <Leaf className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold">28.5 tCO₂e</div>
                            <div className="text-xs text-slate-500">
                              Last 30 days
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                          <ArrowUpRight className="h-4 w-4" />
                          <span>-3.2%</span>
                        </div>
                      </div>
                      <Progress value={88} className="h-2 mt-4" />
                      <div className="flex justify-between mt-1 text-xs text-slate-500">
                        <span>Target: 32 tCO₂e</span>
                        <span>88% of target</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Energy Consumption Trend</CardTitle>
                      <CardDescription>
                        Monthly energy usage compared to targets
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={energyData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              vertical={false}
                            />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                              dataKey="consumption"
                              name="Consumption (kWh)"
                              fill="#f59e0b"
                            />
                            <Bar
                              dataKey="target"
                              name="Target (kWh)"
                              fill="#3b82f6"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Compliance Status</CardTitle>
                      <CardDescription>
                        Environmental certification progress
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {certificationData.map((cert) => (
                          <div key={cert.name} className="space-y-2">
                            <div className="flex justify-between">
                              <div>
                                <div className="font-medium">{cert.name}</div>
                                <div className="text-sm text-slate-500">
                                  Due:{" "}
                                  {new Date(cert.dueDate).toLocaleDateString()}
                                </div>
                              </div>
                              <Badge
                                variant={
                                  cert.status === "Certified"
                                    ? "success"
                                    : cert.status === "In Progress"
                                      ? "outline"
                                      : "secondary"
                                }
                              >
                                {cert.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={cert.progress}
                                className="h-2 flex-1"
                              />
                              <span className="text-sm font-medium">
                                {cert.progress}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Real-time Monitoring</CardTitle>
                    <CardDescription>
                      Current environmental conditions and energy usage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-full">
                            <Thermometer className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm text-slate-500">
                              Temperature
                            </div>
                            <div className="text-xl font-bold">24.5°C</div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-full">
                            <CloudRain className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm text-slate-500">
                              Humidity
                            </div>
                            <div className="text-xl font-bold">62%</div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="p-2 bg-amber-100 rounded-full">
                            <Lightbulb className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <div className="text-sm text-slate-500">
                              Lighting
                            </div>
                            <div className="text-xl font-bold">420 lux</div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-full">
                            <Wind className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <div className="text-sm text-slate-500">
                              Air Quality
                            </div>
                            <div className="text-xl font-bold">Good</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Energy Tab */}
              <TabsContent value="energy" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Consumption
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold">410 kWh</div>
                          <div className="text-sm text-slate-500">
                            Last 30 days
                          </div>
                        </div>
                        <div className="p-3 bg-amber-100 rounded-full">
                          <Bolt className="h-6 w-6 text-amber-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Peak Demand
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold">42 kW</div>
                          <div className="text-sm text-slate-500">
                            Highest this month
                          </div>
                        </div>
                        <div className="p-3 bg-red-100 rounded-full">
                          <Flame className="h-6 w-6 text-red-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Energy Savings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold">10.2%</div>
                          <div className="text-sm text-slate-500">
                            vs. previous month
                          </div>
                        </div>
                        <div className="p-3 bg-green-100 rounded-full">
                          <BatteryCharging className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Energy Consumption Breakdown</CardTitle>
                    <CardDescription>
                      Distribution by system and time of day
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-4">
                          Consumption by System
                        </h3>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: "HVAC", value: 45 },
                                  { name: "Lighting", value: 25 },
                                  { name: "Equipment", value: 20 },
                                  { name: "Other", value: 10 },
                                ]}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) =>
                                  `${name} ${(percent * 100).toFixed(0)}%`
                                }
                              >
                                {carbonData.map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                  />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-4">Hourly Consumption</h3>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={[
                                { hour: "00:00", value: 22 },
                                { hour: "02:00", value: 20 },
                                { hour: "04:00", value: 18 },
                                { hour: "06:00", value: 25 },
                                { hour: "08:00", value: 45 },
                                { hour: "10:00", value: 58 },
                                { hour: "12:00", value: 62 },
                                { hour: "14:00", value: 65 },
                                { hour: "16:00", value: 60 },
                                { hour: "18:00", value: 52 },
                                { hour: "20:00", value: 40 },
                                { hour: "22:00", value: 30 },
                              ]}
                            >
                              <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                              />
                              <XAxis dataKey="hour" />
                              <YAxis />
                              <Tooltip />
                              <Line
                                type="monotone"
                                dataKey="value"
                                name="kWh"
                                stroke="#f59e0b"
                                strokeWidth={2}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Energy Optimization Recommendations</CardTitle>
                    <CardDescription>
                      Actionable insights to reduce energy consumption
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="p-2 bg-amber-100 rounded-full">
                          <Lightbulb className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            Lighting Schedule Optimization
                          </h3>
                          <p className="text-sm text-slate-500 mt-1">
                            Adjust lighting schedules to reduce usage during low
                            occupancy periods. Potential savings: 8-12% of
                            lighting energy.
                          </p>
                          <Button size="sm" className="mt-2">
                            Implement
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Thermometer className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            HVAC Temperature Adjustment
                          </h3>
                          <p className="text-sm text-slate-500 mt-1">
                            Increase cooling setpoint by 1°C during peak hours.
                            Estimated savings: 5-7% of HVAC energy consumption.
                          </p>
                          <Button size="sm" className="mt-2">
                            Implement
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="p-2 bg-green-100 rounded-full">
                          <Battery className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            Equipment Power Management
                          </h3>
                          <p className="text-sm text-slate-500 mt-1">
                            Implement automatic shutdown of office equipment
                            after hours. Potential reduction: 3-5% of total
                            energy use.
                          </p>
                          <Button size="sm" className="mt-2">
                            Implement
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Water Tab */}
              <TabsContent value="water" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Consumption
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold">305 m³</div>
                          <div className="text-sm text-slate-500">
                            Last 30 days
                          </div>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-full">
                          <Droplets className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Water Efficiency
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold">
                            4.2 m³/person
                          </div>
                          <div className="text-sm text-slate-500">
                            Monthly average
                          </div>
                        </div>
                        <div className="p-3 bg-green-100 rounded-full">
                          <Droplets className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Water Savings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold">4.7%</div>
                          <div className="text-sm text-slate-500">
                            vs. previous month
                          </div>
                        </div>
                        <div className="p-3 bg-green-100 rounded-full">
                          <ArrowUpRight className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Water Consumption Trend</CardTitle>
                    <CardDescription>
                      Monthly water usage compared to targets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={waterData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                          />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar
                            dataKey="consumption"
                            name="Consumption (m³)"
                            fill="#3b82f6"
                          />
                          <Bar
                            dataKey="target"
                            name="Target (m³)"
                            fill="#10b981"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Water Usage Breakdown</CardTitle>
                    <CardDescription>
                      Distribution by system and area
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-4">Usage by System</h3>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: "Restrooms", value: 40 },
                                  { name: "Cooling Tower", value: 25 },
                                  { name: "Irrigation", value: 20 },
                                  { name: "Kitchen", value: 10 },
                                  { name: "Other", value: 5 },
                                ]}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) =>
                                  `${name} ${(percent * 100).toFixed(0)}%`
                                }
                              >
                                {carbonData.map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                  />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-4">Usage by Floor</h3>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              layout="vertical"
                              data={[
                                { name: "Ground Floor", value: 85 },
                                { name: "1st Floor", value: 65 },
                                { name: "2nd Floor", value: 60 },
                                { name: "3rd Floor", value: 55 },
                                { name: "4th Floor", value: 40 },
                              ]}
                            >
                              <CartesianGrid
                                strokeDasharray="3 3"
                                horizontal={false}
                              />
                              <XAxis type="number" />
                              <YAxis
                                dataKey="name"
                                type="category"
                                width={100}
                              />
                              <Tooltip />
                              <Bar dataKey="value" name="m³" fill="#3b82f6" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Water Conservation Recommendations</CardTitle>
                    <CardDescription>
                      Actionable insights to reduce water consumption
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Droplets className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            Low-Flow Fixture Installation
                          </h3>
                          <p className="text-sm text-slate-500 mt-1">
                            Replace conventional fixtures with low-flow
                            alternatives. Potential savings: 15-20% of restroom
                            water usage.
                          </p>
                          <Button size="sm" className="mt-2">
                            Implement
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="p-2 bg-green-100 rounded-full">
                          <CloudRain className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Rainwater Harvesting</h3>
                          <p className="text-sm text-slate-500 mt-1">
                            Implement rainwater collection system for
                            irrigation. Estimated reduction: 80% of irrigation
                            water needs.
                          </p>
                          <Button size="sm" className="mt-2">
                            Implement
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="p-2 bg-amber-100 rounded-full">
                          <AlertCircle className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Leak Detection System</h3>
                          <p className="text-sm text-slate-500 mt-1">
                            Install automated leak detection throughout the
                            facility. Potential savings: 5-8% of total water
                            consumption.
                          </p>
                          <Button size="sm" className="mt-2">
                            Implement
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Carbon Tab */}
              <TabsContent value="carbon" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Carbon Footprint
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold">28.5 tCO₂e</div>
                          <div className="text-sm text-slate-500">
                            Last 30 days
                          </div>
                        </div>
                        <div className="p-3 bg-green-100 rounded-full">
                          <Leaf className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Carbon Intensity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold">
                            12.4 kgCO₂e/m²
                          </div>
                          <div className="text-sm text-slate-500">
                            Monthly average
                          </div>
                        </div>
                        <div className="p-3 bg-amber-100 rounded-full">
                          <Building2 className="h-6 w-6 text-amber-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Carbon Reduction
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold">3.2%</div>
                          <div className="text-sm text-slate-500">
                            vs. previous month
                          </div>
                        </div>
                        <div className="p-3 bg-green-100 rounded-full">
                          <ArrowUpRight className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Carbon Footprint Breakdown</CardTitle>
                    <CardDescription>
                      Sources of carbon emissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-4">
                          Emissions by Source
                        </h3>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={carbonData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) =>
                                  `${name} ${(percent * 100).toFixed(0)}%`
                                }
                              >
                                {carbonData.map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                  />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-4">
                          Monthly Emissions Trend
                        </h3>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={[
                                { month: "Jan", value: 32 },
                                { month: "Feb", value: 31 },
                                { month: "Mar", value: 33 },
                                { month: "Apr", value: 30 },
                                { month: "May", value: 29 },
                                { month: "Jun", value: 28.5 },
                                { month: "Jul", value: 28 },
                              ]}
                            >
                              <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                              />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip />
                              <Line
                                type="monotone"
                                dataKey="value"
                                name="tCO₂e"
                                stroke="#10b981"
                                strokeWidth={2}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Carbon Reduction Initiatives</CardTitle>
                    <CardDescription>
                      Active and planned sustainability projects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="p-2 bg-green-100 rounded-full">
                          <Leaf className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">
                              Solar Panel Installation
                            </h3>
                            <Badge>In Progress</Badge>
                          </div>
                          <p className="text-sm text-slate-500 mt-1">
                            Installing 120 kW rooftop solar array. Expected
                            reduction: 42 tCO₂e annually.
                          </p>
                          <div className="mt-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>65%</span>
                            </div>
                            <Progress value={65} className="h-2" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Bolt className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">
                              LED Lighting Upgrade
                            </h3>
                            <Badge variant="outline">Completed</Badge>
                          </div>
                          <p className="text-sm text-slate-500 mt-1">
                            Replaced all conventional lighting with LEDs.
                            Achieved reduction: 18 tCO₂e annually.
                          </p>
                          <div className="mt-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>100%</span>
                            </div>
                            <Progress value={100} className="h-2" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="p-2 bg-amber-100 rounded-full">
                          <Building2 className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">
                              Building Envelope Improvement
                            </h3>
                            <Badge variant="secondary">Planned</Badge>
                          </div>
                          <p className="text-sm text-slate-500 mt-1">
                            Upgrading insulation and windows. Projected
                            reduction: 25 tCO₂e annually.
                          </p>
                          <div className="mt-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>10%</span>
                            </div>
                            <Progress value={10} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Compliance Tab */}
              <TabsContent value="compliance" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Overall Compliance Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold">78%</div>
                          <div className="text-sm text-slate-500">
                            4 active certifications
                          </div>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-full">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Upcoming Deadlines
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold">2</div>
                          <div className="text-sm text-slate-500">
                            Within next 30 days
                          </div>
                        </div>
                        <div className="p-3 bg-amber-100 rounded-full">
                          <Calendar className="h-6 w-6 text-amber-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Non-Compliance Issues
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold">3</div>
                          <div className="text-sm text-slate-500">
                            Requiring attention
                          </div>
                        </div>
                        <div className="p-3 bg-red-100 rounded-full">
                          <AlertCircle className="h-6 w-6 text-red-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Certification Status</CardTitle>
                    <CardDescription>
                      Environmental and energy management certifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {certificationData.map((cert) => (
                        <div key={cert.name} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{cert.name}</h3>
                              <p className="text-sm text-slate-500">
                                Due:{" "}
                                {new Date(cert.dueDate).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge
                              variant={
                                cert.status === "Certified"
                                  ? "success"
                                  : cert.status === "In Progress"
                                    ? "outline"
                                    : "secondary"
                              }
                            >
                              {cert.status}
                            </Badge>
                          </div>
                          <div className="mt-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Completion</span>
                              <span>{cert.progress}%</span>
                            </div>
                            <Progress value={cert.progress} className="h-2" />
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <FileText className="h-4 w-4" /> View Details
                            </Button>
                            <Button
                              size="sm"
                              className="flex items-center gap-1"
                            >
                              <Download className="h-4 w-4" /> Download Report
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Regulatory Requirements</CardTitle>
                    <CardDescription>
                      Indonesian environmental regulations compliance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="p-2 bg-green-100 rounded-full">
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            PP No. 16/2021 - Building Management
                          </h3>
                          <p className="text-sm text-slate-500 mt-1">
                            Compliance with Indonesian building management
                            regulations for energy efficiency and environmental
                            impact.
                          </p>
                          <div className="mt-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Compliance</span>
                              <span>92%</span>
                            </div>
                            <Progress value={92} className="h-2" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="p-2 bg-amber-100 rounded-full">
                          <FileText className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            Permen LHK No. 92/2020 - Emissions Standards
                          </h3>
                          <p className="text-sm text-slate-500 mt-1">
                            Compliance with Indonesian Ministry of Environment
                            and Forestry regulations on emissions and air
                            quality.
                          </p>
                          <div className="mt-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Compliance</span>
                              <span>85%</span>
                            </div>
                            <Progress value={85} className="h-2" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="p-2 bg-red-100 rounded-full">
                          <FileText className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            PP No. 22/2021 - Water Quality Management
                          </h3>
                          <p className="text-sm text-slate-500 mt-1">
                            Compliance with Indonesian regulations on water
                            quality management and conservation.
                          </p>
                          <div className="mt-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Compliance</span>
                              <span>68%</span>
                            </div>
                            <Progress value={68} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EnvironmentalEnergyManagement;
