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
import { Separator } from "../ui/separator";
import {
  Building2,
  Layers,
  Users,
  Calendar,
  Grid,
  Move,
  LayoutGrid,
  Search,
  Plus,
  Filter,
  Download,
  Edit,
  Save,
  Trash2,
  Copy,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Floor, Space, SpaceType } from "../../models/spaceManagement";

interface WorkplaceLayoutProps {
  floors: Floor[];
  spaces: Space[];
  spaceTypes: SpaceType[];
  selectedFloor: string;
  selectedBuilding: string;
  onFloorChange: (floorId: string) => void;
  onBuildingChange: (buildingId: string) => void;
  loading: boolean;
}

const WorkplaceLayout = ({
  floors,
  spaces,
  spaceTypes,
  selectedFloor,
  selectedBuilding,
  onFloorChange,
  onBuildingChange,
  loading,
}: WorkplaceLayoutProps) => {
  const [activeTab, setActiveTab] = useState("floorplan");
  const [editMode, setEditMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

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

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 50));
  };

  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-primary" />
            Workplace Layout Management
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant={editMode ? "default" : "outline"}
              size="sm"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Layout
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Layout
                </>
              )}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Space
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="floorplan">
              <Layers className="h-4 w-4 mr-2" />
              Floor Plan
            </TabsTrigger>
            <TabsTrigger value="spacelist">
              <Grid className="h-4 w-4 mr-2" />
              Space List
            </TabsTrigger>
            <TabsTrigger value="standards">
              <Users className="h-4 w-4 mr-2" />
              Workspace Standards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="floorplan" className="pt-4">
            <div className="flex space-x-4 mb-4">
              <div className="w-1/3">
                <Label htmlFor="building-select">Building</Label>
                <Select
                  value={selectedBuilding}
                  onValueChange={onBuildingChange}
                >
                  <SelectTrigger id="building-select">
                    <SelectValue placeholder="Select Building" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Main Building</SelectItem>
                    <SelectItem value="2">East Wing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                <Label htmlFor="space-search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="space-search"
                    type="text"
                    placeholder="Search spaces..."
                    className="pl-8"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-2">
              <div className="flex flex-wrap gap-2">
                {spaceTypes.map((type) => (
                  <div key={type.id} className="flex items-center gap-1">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: type.color }}
                    ></span>
                    <span className="text-sm">{type.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 50}
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <span className="text-sm">{zoomLevel}%</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 200}
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden bg-gray-50 h-96 relative">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-gray-500">Loading floor plan...</div>
                </div>
              ) : selectedFloor ? (
                <div
                  className="relative w-full h-full transition-transform duration-200"
                  style={{ transform: `scale(${zoomLevel / 100})` }}
                >
                  <img
                    src={
                      floors.find((f) => f.id === selectedFloor)?.floorPlanUrl
                    }
                    alt="Floor Plan"
                    className="w-full h-full object-contain"
                  />

                  {/* Space overlays */}
                  {spaces.map((space) => (
                    <div
                      key={space.id}
                      className={`absolute border-2 rounded-md ${editMode ? "cursor-move" : "cursor-pointer"} hover:opacity-80 transition-opacity`}
                      style={{
                        left: `${space.coordinates?.x1 || 0}%`,
                        top: `${space.coordinates?.y1 || 0}%`,
                        width: `${(space.coordinates?.x2 || 0) - (space.coordinates?.x1 || 0)}%`,
                        height: `${(space.coordinates?.y2 || 0) - (space.coordinates?.y1 || 0)}%`,
                        backgroundColor: `${getSpaceTypeColor(space.spaceTypeId)}40`, // 40 is for 25% opacity
                        borderColor: getSpaceTypeColor(space.spaceTypeId),
                      }}
                    >
                      <div className="absolute bottom-1 left-1 text-xs font-medium bg-white px-1 rounded">
                        {space.number}
                      </div>
                      {space.currentOccupancy !== undefined && (
                        <div className="absolute top-1 right-1">
                          <Badge
                            className={getUtilizationColor(
                              getSpaceUtilization(space),
                            )}
                          >
                            {space.currentOccupancy}/{space.capacity}
                          </Badge>
                        </div>
                      )}
                      {editMode && (
                        <div className="absolute top-1 left-1 flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 bg-white/80 hover:bg-white"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 bg-white/80 hover:bg-white"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-gray-500">
                    Select a floor to view the floor plan
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="spacelist" className="pt-4">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Space ID
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Area (m²)
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Capacity
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {spaces.map((space) => {
                    const spaceType = spaceTypes.find(
                      (st) => st.id === space.spaceTypeId,
                    );
                    return (
                      <tr key={space.id}>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {space.number}
                        </td>
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
                          {space.area}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {space.currentOccupancy}/{space.capacity}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <Badge
                            variant={
                              space.status === "active" ? "default" : "outline"
                            }
                          >
                            {space.status.charAt(0).toUpperCase() +
                              space.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="standards" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Executive Workspace</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Standard Area:
                      </span>
                      <span className="font-medium">25 m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Occupancy:</span>
                      <span className="font-medium">1 person</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Privacy Level:
                      </span>
                      <Badge>Private</Badge>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Required Furniture:
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• Executive Desk (1)</li>
                        <li>• Ergonomic Chair (1)</li>
                        <li>• Guest Chairs (2)</li>
                        <li>• Filing Cabinet (1)</li>
                        <li>• Bookshelf (1)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Open Workspace</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Standard Area:
                      </span>
                      <span className="font-medium">5 m² per person</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Occupancy:</span>
                      <span className="font-medium">Variable</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Privacy Level:
                      </span>
                      <Badge variant="outline">Open</Badge>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Required Furniture:
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• Workstation Desk (1 per person)</li>
                        <li>• Task Chair (1 per person)</li>
                        <li>• Pedestal (1 per person)</li>
                        <li>• Shared Storage (1 per 4 people)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">
                    Meeting Room - Large
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Standard Area:
                      </span>
                      <span className="font-medium">40 m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Occupancy:</span>
                      <span className="font-medium">Up to 20 people</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Privacy Level:
                      </span>
                      <Badge>Semi-Private</Badge>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Required Furniture:
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• Conference Table (1)</li>
                        <li>• Meeting Chairs (20)</li>
                        <li>• Presentation Screen (1)</li>
                        <li>• Whiteboard (1)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Prayer Room</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Standard Area:
                      </span>
                      <span className="font-medium">20 m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Occupancy:</span>
                      <span className="font-medium">Up to 10 people</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Privacy Level:
                      </span>
                      <Badge>Semi-Private</Badge>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Required Features:
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• Prayer Mats (10)</li>
                        <li>• Shoe Rack (1)</li>
                        <li>• Ablution Area (nearby)</li>
                        <li>• Qibla Direction Indicator (1)</li>
                      </ul>
                    </div>
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

export default WorkplaceLayout;
