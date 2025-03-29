import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "../../lib/utils";
import {
  ArrowUpDown,
  Droplets,
  Fan,
  Gauge,
  Lightbulb,
  RefreshCw,
  Thermometer,
  Wind,
} from "lucide-react";

interface IoTSummaryProps {
  environmentalData?: {
    temperature: number;
    humidity: number;
    airQuality: number;
    co2Level: number;
  };
  energyData?: {
    currentUsage: number;
    dailyUsage: number;
    weeklyUsage: number;
    monthlyUsage: number;
  };
  systemStatus?: {
    hvac: boolean;
    lighting: boolean;
    security: boolean;
    waterSystem: boolean;
  };
}

const IoTSummary = ({
  environmentalData = {
    temperature: 24.5,
    humidity: 65,
    airQuality: 82,
    co2Level: 450,
  },
  energyData = {
    currentUsage: 42.3,
    dailyUsage: 568,
    weeklyUsage: 3245,
    monthlyUsage: 12680,
  },
  systemStatus = {
    hvac: true,
    lighting: true,
    security: true,
    waterSystem: false,
  },
}: IoTSummaryProps) => {
  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">
            IoT & BMS Integration
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="environmental" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="environmental">Environmental</TabsTrigger>
            <TabsTrigger value="energy">Energy</TabsTrigger>
            <TabsTrigger value="controls">Controls</TabsTrigger>
          </TabsList>

          <TabsContent value="environmental" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Temperature</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">
                    {environmentalData.temperature}°C
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    Normal
                  </Badge>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Humidity</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">
                    {environmentalData.humidity}%
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-700 border-yellow-200"
                  >
                    High
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">
                      Air Quality Index
                    </span>
                  </div>
                  <span className="text-sm">
                    {environmentalData.airQuality}/100
                  </span>
                </div>
                <Progress
                  value={environmentalData.airQuality}
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">CO₂ Level</span>
                  </div>
                  <span className="text-sm">
                    {environmentalData.co2Level} ppm
                  </span>
                </div>
                <Progress
                  value={environmentalData.co2Level / 10}
                  className="h-2"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="energy" className="space-y-4">
            <div className="bg-slate-50 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Current Usage</span>
                <span className="text-2xl font-bold">
                  {energyData.currentUsage} kW
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Last 24 hours: {energyData.dailyUsage} kWh</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Daily</span>
                  <span className="text-sm font-medium">
                    {energyData.dailyUsage} kWh
                  </span>
                </div>
                <Progress
                  value={(energyData.dailyUsage / 1000) * 100}
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Weekly</span>
                  <span className="text-sm font-medium">
                    {energyData.weeklyUsage} kWh
                  </span>
                </div>
                <Progress
                  value={(energyData.weeklyUsage / 5000) * 100}
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Monthly</span>
                  <span className="text-sm font-medium">
                    {energyData.monthlyUsage} kWh
                  </span>
                </div>
                <Progress
                  value={(energyData.monthlyUsage / 20000) * 100}
                  className="h-2"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="controls" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Fan className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">HVAC System</span>
                  </div>
                  <Switch id="hvac" checked={systemStatus.hvac} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temp-control" className="text-xs">
                    Temperature (°C)
                  </Label>
                  <Slider
                    id="temp-control"
                    defaultValue={[24]}
                    max={30}
                    min={18}
                    step={0.5}
                    className="py-1"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>18°C</span>
                    <span>24°C</span>
                    <span>30°C</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">Lighting</span>
                  </div>
                  <Switch id="lighting" checked={systemStatus.lighting} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brightness-control" className="text-xs">
                    Brightness (%)
                  </Label>
                  <Slider
                    id="brightness-control"
                    defaultValue={[75]}
                    max={100}
                    min={10}
                    step={5}
                    className="py-1"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>10%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"></path>
                    <path d="M14.31 8L20.05 17.94"></path>
                    <path d="M9.69 8L3.95 17.94"></path>
                    <path d="M12 2C13.38 2 14.5 3.12 14.5 4.5C14.5 5.88 13.38 7 12 7C10.62 7 9.5 5.88 9.5 4.5C9.5 3.12 10.62 2 12 2Z"></path>
                    <path d="M3 3L7 7"></path>
                    <path d="M17 17L21 21"></path>
                  </svg>
                  <span className="text-sm font-medium">Security System</span>
                </div>
                <Switch id="security" checked={systemStatus.security} />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5.33 20h13.34"></path>
                    <path d="M5 12.33v7.67"></path>
                    <path d="M19 12.33v7.67"></path>
                    <path d="M12 6v14"></path>
                    <path d="M5 12.33C5 6.85 7.17 4 12 4s7 2.85 7 8.33"></path>
                  </svg>
                  <span className="text-sm font-medium">Water System</span>
                </div>
                <Switch id="water" checked={systemStatus.waterSystem} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default IoTSummary;
