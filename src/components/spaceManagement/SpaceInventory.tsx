import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  ClipboardList,
  Search,
  Plus,
  Filter,
  Download,
  Tag,
  Building2,
  Layers,
  Users,
} from "lucide-react";

const SpaceInventory = () => {
  const [activeTab, setActiveTab] = useState("spaces");

  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Space Inventory
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
              <Plus className="h-4 w-4 mr-2" />
              Add Space
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="spaces">
              <Building2 className="h-4 w-4 mr-2" />
              Spaces
            </TabsTrigger>
            <TabsTrigger value="types">
              <Tag className="h-4 w-4 mr-2" />
              Space Types
            </TabsTrigger>
            <TabsTrigger value="floors">
              <Layers className="h-4 w-4 mr-2" />
              Floors & Buildings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="spaces" className="pt-4">
            <div className="flex space-x-4 mb-4">
              <div className="w-1/3">
                <Label htmlFor="building-select">Building</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="building-select">
                    <SelectValue placeholder="Select Building" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Buildings</SelectItem>
                    <SelectItem value="1">Main Building</SelectItem>
                    <SelectItem value="2">East Wing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/3">
                <Label htmlFor="floor-select">Floor</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="floor-select">
                    <SelectValue placeholder="Select Floor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Floors</SelectItem>
                    <SelectItem value="1">Floor 1</SelectItem>
                    <SelectItem value="2">Floor 2</SelectItem>
                    <SelectItem value="3">Floor 3</SelectItem>
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

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Space ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Floor</TableHead>
                  <TableHead>Area (m²)</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>SP-101</TableCell>
                  <TableCell>Marketing Department</TableCell>
                  <TableCell>Office</TableCell>
                  <TableCell>Floor 1</TableCell>
                  <TableCell>120</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Active
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SP-102</TableCell>
                  <TableCell>Meeting Room A</TableCell>
                  <TableCell>Conference</TableCell>
                  <TableCell>Floor 1</TableCell>
                  <TableCell>45</TableCell>
                  <TableCell>10</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Active
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SP-201</TableCell>
                  <TableCell>IT Department</TableCell>
                  <TableCell>Office</TableCell>
                  <TableCell>Floor 2</TableCell>
                  <TableCell>150</TableCell>
                  <TableCell>15</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200"
                    >
                      Under Renovation
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SP-202</TableCell>
                  <TableCell>Cafeteria</TableCell>
                  <TableCell>Common</TableCell>
                  <TableCell>Floor 2</TableCell>
                  <TableCell>200</TableCell>
                  <TableCell>50</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Active
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SP-301</TableCell>
                  <TableCell>Executive Suite</TableCell>
                  <TableCell>Office</TableCell>
                  <TableCell>Floor 3</TableCell>
                  <TableCell>80</TableCell>
                  <TableCell>4</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Active
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="types" className="pt-4">
            <div className="flex justify-between mb-4">
              <div className="w-1/3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Search space types..."
                    className="pl-8"
                  />
                </div>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Space Type
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Color Code</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead>Total Area (m²)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>TYPE-01</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span>
                    Office
                  </TableCell>
                  <TableCell>#3B82F6</TableCell>
                  <TableCell>Dedicated workspace for departments</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>350</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TYPE-02</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-amber-500"></span>
                    Conference
                  </TableCell>
                  <TableCell>#F59E0B</TableCell>
                  <TableCell>Meeting and conference rooms</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>75</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TYPE-03</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                    Common
                  </TableCell>
                  <TableCell>#10B981</TableCell>
                  <TableCell>
                    Shared spaces like cafeterias and lounges
                  </TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>250</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TYPE-04</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-purple-500"></span>
                    Storage
                  </TableCell>
                  <TableCell>#8B5CF6</TableCell>
                  <TableCell>Storage and archive rooms</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>120</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TYPE-05</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                    Restricted
                  </TableCell>
                  <TableCell>#EF4444</TableCell>
                  <TableCell>Server rooms and secure areas</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>40</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="floors" className="pt-4">
            <div className="flex justify-between mb-4">
              <div className="w-1/3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Search buildings or floors..."
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Floor
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Building
                </Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Building</TableHead>
                  <TableHead>Floor</TableHead>
                  <TableHead>Floor Area (m²)</TableHead>
                  <TableHead>Spaces</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell rowSpan={3}>Main Building</TableCell>
                  <TableCell>Floor 1</TableCell>
                  <TableCell>500</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>50</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Active
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Floor 2</TableCell>
                  <TableCell>500</TableCell>
                  <TableCell>4</TableCell>
                  <TableCell>65</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200"
                    >
                      Partial Renovation
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Floor 3</TableCell>
                  <TableCell>400</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>30</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Active
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell rowSpan={2}>East Wing</TableCell>
                  <TableCell>Floor 1</TableCell>
                  <TableCell>300</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>25</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Active
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Floor 2</TableCell>
                  <TableCell>300</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>20</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Active
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SpaceInventory;
