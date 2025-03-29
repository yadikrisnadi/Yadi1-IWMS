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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";
import {
  ZoomIn,
  ZoomOut,
  Maximize,
  ChevronDown,
  AlertCircle,
  Wrench,
  Users,
} from "lucide-react";

interface FloorPlanPreviewProps {
  title?: string;
  floors?: {
    id: string;
    name: string;
    image: string;
  }[];
  buildings?: {
    id: string;
    name: string;
  }[];
  hotspots?: {
    id: string;
    floorId: string;
    x: number;
    y: number;
    type: "maintenance" | "occupancy" | "alert";
    status: "critical" | "warning" | "normal";
    label: string;
    details: string;
  }[];
}

const FloorPlanPreview = ({
  title = "Interactive Floor Plan",
  floors = [
    {
      id: "floor-1",
      name: "Floor 1",
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
    },
    {
      id: "floor-2",
      name: "Floor 2",
      image:
        "https://images.unsplash.com/photo-1600607687644-c7f34b5063c8?w=800&q=80",
    },
  ],
  buildings = [
    { id: "bldg-1", name: "Main Building" },
    { id: "bldg-2", name: "East Wing" },
    { id: "bldg-3", name: "West Wing" },
  ],
  hotspots = [
    {
      id: "hs-1",
      floorId: "floor-1",
      x: 25,
      y: 30,
      type: "maintenance",
      status: "warning",
      label: "Workstation Area 1",
      details: "4 workstations, 3 currently occupied",
    },
    {
      id: "hs-2",
      floorId: "floor-1",
      x: 60,
      y: 45,
      type: "occupancy",
      status: "critical",
      label: "Main Conference Room",
      details: "95% occupied, exceeding capacity",
    },
    {
      id: "hs-3",
      floorId: "floor-1",
      x: 75,
      y: 70,
      type: "alert",
      status: "normal",
      label: "Pantry Area",
      details: "All systems functioning normally",
    },
    {
      id: "hs-4",
      floorId: "floor-1",
      x: 40,
      y: 65,
      type: "maintenance",
      status: "normal",
      label: "Small Meeting Room",
      details: "Available for booking",
    },
    {
      id: "hs-5",
      floorId: "floor-1",
      x: 20,
      y: 80,
      type: "occupancy",
      status: "warning",
      label: "Workstation Area 2",
      details: "4 workstations, 75% occupied",
    },
  ],
}: FloorPlanPreviewProps) => {
  const [zoom, setZoom] = useState(100);
  const [selectedFloor, setSelectedFloor] = useState(floors[0]?.id || "");
  const [selectedBuilding, setSelectedBuilding] = useState(
    buildings[0]?.id || "",
  );
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "maintenance",
    "occupancy",
    "alert",
  ]);

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const filteredHotspots = hotspots.filter(
    (hotspot) =>
      hotspot.floorId === selectedFloor && activeFilters.includes(hotspot.type),
  );

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 10, 150));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 10, 50));
  };

  const getHotspotIcon = (type: string) => {
    switch (type) {
      case "maintenance":
        return <Wrench className="h-4 w-4" />;
      case "occupancy":
        return <Users className="h-4 w-4" />;
      case "alert":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs">{zoom}%</span>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <Select
                value={selectedBuilding}
                onValueChange={setSelectedBuilding}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Building" />
                </SelectTrigger>
                <SelectContent>
                  {buildings.map((building) => (
                    <SelectItem key={building.id} value={building.id}>
                      {building.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-1/2">
              <Select value={selectedFloor} onValueChange={setSelectedFloor}>
                <SelectTrigger className="w-full">
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
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button
                variant={
                  activeFilters.includes("maintenance") ? "default" : "outline"
                }
                size="sm"
                onClick={() => toggleFilter("maintenance")}
              >
                <Wrench className="h-4 w-4 mr-2" />
                Maintenance
              </Button>
              <Button
                variant={
                  activeFilters.includes("occupancy") ? "default" : "outline"
                }
                size="sm"
                onClick={() => toggleFilter("occupancy")}
              >
                <Users className="h-4 w-4 mr-2" />
                Occupancy
              </Button>
              <Button
                variant={
                  activeFilters.includes("alert") ? "default" : "outline"
                }
                size="sm"
                onClick={() => toggleFilter("alert")}
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Alerts
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <ChevronDown className="h-4 w-4 mr-2" />
              More Options
            </Button>
          </div>

          <div
            className="relative border rounded-md overflow-hidden bg-gray-50"
            style={{ height: "220px" }}
          >
            {/* Floor Plan Image */}
            <div
              className="relative w-full h-full"
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: "center",
                transition: "transform 0.2s ease-in-out",
              }}
            >
              <img
                src={floors.find((f) => f.id === selectedFloor)?.image || ""}
                alt="Floor Plan"
                className="w-full h-full object-contain"
              />

              {/* Hotspots */}
              <TooltipProvider>
                {filteredHotspots.map((hotspot) => (
                  <Tooltip key={hotspot.id}>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          "absolute rounded-full p-1 cursor-pointer",
                          hotspot.status === "critical"
                            ? "bg-red-500"
                            : hotspot.status === "warning"
                              ? "bg-amber-500"
                              : "bg-green-500",
                        )}
                        style={{
                          left: `${hotspot.x}%`,
                          top: `${hotspot.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div className="text-white">
                          {getHotspotIcon(hotspot.type)}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="p-1">
                        <p className="font-medium">{hotspot.label}</p>
                        <p className="text-xs text-gray-500">
                          {hotspot.details}
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-500">
            <div>
              <Badge variant="outline" className="mr-2">
                {floors.find((f) => f.id === selectedFloor)?.name ||
                  "No floor selected"}
              </Badge>
              <span>Showing {filteredHotspots.length} points of interest</span>
            </div>
            <div>
              <span>Last updated: Today, 10:30 AM</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FloorPlanPreview;
