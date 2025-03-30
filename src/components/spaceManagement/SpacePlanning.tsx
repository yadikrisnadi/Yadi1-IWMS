import React, { useState, useEffect, lazy, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Building2,
  Layers,
  Users,
  Calendar,
  PanelLeft,
  Move,
  LayoutGrid,
  Search,
  Plus,
  Filter,
  Download,
  Leaf,
  Grid,
  ClipboardList,
} from "lucide-react";
import { spaceManagementService } from "./enhancedSpaceManagementService";
import { Floor, Space, SpaceType } from "@/models/spaceManagement";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import LoadingFallback from "@/components/common/LoadingFallback";

// Lazy load components
const WorkplaceLayout = lazy(() => import("./WorkplaceLayout"));
const SpaceUtilizationTracking = lazy(
  () => import("./SpaceUtilizationTracking"),
);
const FacilitiesOptimization = lazy(() => import("./FacilitiesOptimization"));
const SpaceInventory = lazy(() => import("./SpaceInventory"));
const SpacePlanningAllocation = lazy(() => import("./SpacePlanningAllocation"));
const MoveManagement = lazy(() => import("./MoveManagement"));

interface SpacePlanningProps {
  title?: string;
}

const SpacePlanningContent = ({
  title = "Space Planning & Management",
}: SpacePlanningProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [floors, setFloors] = useState<Floor[]>([]);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [spaceTypes, setSpaceTypes] = useState<SpaceType[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState("1"); // Default to first building
  const [selectedFloor, setSelectedFloor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch floors for the selected building
        const floorsData =
          await spaceManagementService.getFloors(selectedBuilding);
        setFloors(floorsData);

        // Set the first floor as selected if none is selected
        if (floorsData.length > 0 && !selectedFloor) {
          setSelectedFloor(floorsData[0].id);
        }

        // Fetch space types
        const spaceTypesData = await spaceManagementService.getSpaceTypes();
        setSpaceTypes(spaceTypesData);

        // Fetch spaces for the selected floor
        if (selectedFloor) {
          const spacesData =
            await spaceManagementService.getSpaces(selectedFloor);
          setSpaces(spacesData);
        }
      } catch (error) {
        // Error handling is now managed by the enhanced service
        console.error("Error fetching space management data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedBuilding, selectedFloor]);

  const handleFloorChange = (floorId: string) => {
    setSelectedFloor(floorId);
  };

  const getSpaceTypeColor = (spaceTypeId: string) => {
    const spaceType = spaceTypes.find((st) => st.id === spaceTypeId);
    return spaceType?.color || "#CBD5E0";
  };

  const getSpaceUtilization = (space: Space) => {
    if (!space.currentOccupancy || !space.capacity) return 0;
    return (space.currentOccupancy / space.capacity) * 100;
  };

  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 70) return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <div className="w-full h-full bg-white shadow-sm rounded-lg border overflow-auto">
      <div className="p-4 pb-2 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-primary" />
            {title}
          </h3>
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
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">
              <PanelLeft className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="inventory">
              <ClipboardList className="h-4 w-4 mr-2" />
              Space Inventory
            </TabsTrigger>
            <TabsTrigger value="planning">
              <LayoutGrid className="h-4 w-4 mr-2" />
              Space Planning
            </TabsTrigger>
            <TabsTrigger value="utilization">
              <Users className="h-4 w-4 mr-2" />
              Space Utilization
            </TabsTrigger>
            <TabsTrigger value="optimization">
              <Leaf className="h-4 w-4 mr-2" />
              Facilities Optimization
            </TabsTrigger>
            <TabsTrigger value="moves">
              <Move className="h-4 w-4 mr-2" />
              Move Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg border shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Buildings & Floors</h3>
                </div>
                <div className="text-3xl font-bold mb-1">2</div>
                <div className="text-sm text-gray-500">Buildings</div>
                <div className="text-3xl font-bold mt-4 mb-1">
                  {floors.length}
                </div>
                <div className="text-sm text-gray-500">Floors</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <LayoutGrid className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Spaces</h3>
                </div>
                <div className="text-3xl font-bold mb-1">{spaces.length}</div>
                <div className="text-sm text-gray-500">Total Spaces</div>
                <div className="text-3xl font-bold mt-4 mb-1">
                  {spaceTypes.length}
                </div>
                <div className="text-sm text-gray-500">Space Types</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Occupancy</h3>
                </div>
                <div className="text-3xl font-bold mb-1">
                  {spaces.reduce(
                    (sum, space) => sum + (space.currentOccupancy || 0),
                    0,
                  )}
                </div>
                <div className="text-sm text-gray-500">Current Occupants</div>
                <div className="text-3xl font-bold mt-4 mb-1">
                  {spaces.reduce(
                    (sum, space) => sum + (space.capacity || 0),
                    0,
                  )}
                </div>
                <div className="text-sm text-gray-500">Total Capacity</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium">
                  Building & Floor Selection
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="building-select">Select Building</Label>
                  <Select
                    value={selectedBuilding}
                    onValueChange={setSelectedBuilding}
                  >
                    <SelectTrigger id="building-select">
                      <SelectValue placeholder="Select Building" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Headquarters</SelectItem>
                      <SelectItem value="2">Regional Office</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="floor-select">Select Floor</Label>
                  <Select
                    value={selectedFloor}
                    onValueChange={handleFloorChange}
                    disabled={floors.length === 0}
                  >
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
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium">Space Allocation</h3>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search Spaces
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left p-2">Space ID</th>
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Area (sqm)</th>
                      <th className="text-left p-2">Capacity</th>
                      <th className="text-left p-2">Occupancy</th>
                      <th className="text-left p-2">Utilization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="text-center p-4">
                          Loading spaces...
                        </td>
                      </tr>
                    ) : spaces.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center p-4">
                          No spaces found for this floor.
                        </td>
                      </tr>
                    ) : (
                      spaces.map((space) => {
                        const utilizationPercentage =
                          getSpaceUtilization(space);
                        return (
                          <tr
                            key={space.id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="p-2">{space.id}</td>
                            <td className="p-2">{space.name}</td>
                            <td className="p-2">
                              <Badge
                                style={{
                                  backgroundColor: getSpaceTypeColor(
                                    space.spaceTypeId,
                                  ),
                                }}
                                className="text-white"
                              >
                                {spaceTypes.find(
                                  (st) => st.id === space.spaceTypeId,
                                )?.name || "Unknown"}
                              </Badge>
                            </td>
                            <td className="p-2">{space.area} sqm</td>
                            <td className="p-2">{space.capacity}</td>
                            <td className="p-2">
                              {space.currentOccupancy || 0}
                            </td>
                            <td className="p-2">
                              <div className="flex items-center gap-2">
                                <Progress
                                  value={utilizationPercentage}
                                  className={`h-2 w-20 ${getUtilizationColor(
                                    utilizationPercentage,
                                  )}`}
                                />
                                <span>
                                  {Math.round(utilizationPercentage)}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="pt-4">
            <ErrorBoundary moduleName="Space Inventory">
              <Suspense
                fallback={
                  <LoadingFallback message="Memuat inventaris ruang..." />
                }
              >
                <SpaceInventory />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="planning" className="pt-4">
            <ErrorBoundary moduleName="Space Planning Allocation">
              <Suspense
                fallback={
                  <LoadingFallback message="Memuat alokasi perencanaan ruang..." />
                }
              >
                <SpacePlanningAllocation />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="utilization" className="pt-4">
            <ErrorBoundary moduleName="Space Utilization Tracking">
              <Suspense
                fallback={
                  <LoadingFallback message="Memuat pelacakan penggunaan ruang..." />
                }
              >
                <SpaceUtilizationTracking
                  floors={floors}
                  spaces={spaces}
                  spaceTypes={spaceTypes}
                  selectedFloor={selectedFloor}
                  onFloorChange={handleFloorChange}
                  loading={loading}
                />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="optimization" className="pt-4">
            <ErrorBoundary moduleName="Facilities Optimization">
              <Suspense
                fallback={
                  <LoadingFallback message="Memuat optimasi fasilitas..." />
                }
              >
                <FacilitiesOptimization
                  floors={floors}
                  spaces={spaces}
                  spaceTypes={spaceTypes}
                  selectedFloor={selectedFloor}
                  onFloorChange={handleFloorChange}
                  loading={loading}
                />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="moves" className="pt-4">
            <ErrorBoundary moduleName="Move Management">
              <Suspense
                fallback={
                  <LoadingFallback message="Memuat manajemen perpindahan..." />
                }
              >
                <MoveManagement />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const SpacePlanning = (props: SpacePlanningProps) => {
  return (
    <ErrorBoundary moduleName="Space Planning & Management">
      <Suspense
        fallback={
          <LoadingFallback message="Memuat modul perencanaan ruang..." />
        }
      >
        <SpacePlanningContent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default SpacePlanning;
