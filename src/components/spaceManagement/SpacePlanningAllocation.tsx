import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
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
  LayoutGrid,
  Search,
  Plus,
  Filter,
  Download,
  Users,
  Calendar,
  LineChart,
  Layers,
} from "lucide-react";

const SpacePlanningAllocation = () => {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-primary" />
            Space Planning & Allocation
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
              New Project
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="projects">
              <Calendar className="h-4 w-4 mr-2" />
              Planning Projects
            </TabsTrigger>
            <TabsTrigger value="allocation">
              <Users className="h-4 w-4 mr-2" />
              Space Allocation
            </TabsTrigger>
            <TabsTrigger value="scenarios">
              <Layers className="h-4 w-4 mr-2" />
              Planning Scenarios
            </TabsTrigger>
            <TabsTrigger value="forecasting">
              <LineChart className="h-4 w-4 mr-2" />
              Forecasting
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="pt-4">
            <div className="flex space-x-4 mb-4">
              <div className="w-1/3">
                <Label htmlFor="status-select">Status</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="status-select">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                <Label htmlFor="project-search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="project-search"
                    type="text"
                    placeholder="Search projects..."
                    className="pl-8"
                  />
                </div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Building/Floor</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    Marketing Department Expansion
                  </TableCell>
                  <TableCell>Main Building / Floor 1</TableCell>
                  <TableCell>Jan 15, 2023</TableCell>
                  <TableCell>Mar 30, 2023</TableCell>
                  <TableCell>
                    <Badge>In Progress</Badge>
                  </TableCell>
                  <TableCell className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Progress value={75} className="h-2" />
                      <span className="text-xs text-gray-500">75%</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    IT Department Relocation
                  </TableCell>
                  <TableCell>Main Building / Floor 2</TableCell>
                  <TableCell>Feb 10, 2023</TableCell>
                  <TableCell>Apr 15, 2023</TableCell>
                  <TableCell>
                    <Badge variant="outline">Planning</Badge>
                  </TableCell>
                  <TableCell className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Progress value={25} className="h-2" />
                      <span className="text-xs text-gray-500">25%</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Floor 2 Renovation
                  </TableCell>
                  <TableCell>Main Building / Floor 2</TableCell>
                  <TableCell>Mar 1, 2023</TableCell>
                  <TableCell>Jun 30, 2023</TableCell>
                  <TableCell>
                    <Badge variant="outline">Planning</Badge>
                  </TableCell>
                  <TableCell className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Progress value={10} className="h-2" />
                      <span className="text-xs text-gray-500">10%</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    New Cafeteria Setup
                  </TableCell>
                  <TableCell>East Wing / Floor 1</TableCell>
                  <TableCell>Dec 5, 2022</TableCell>
                  <TableCell>Feb 28, 2023</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Completed</Badge>
                  </TableCell>
                  <TableCell className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Progress value={100} className="h-2" />
                      <span className="text-xs text-gray-500">100%</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Executive Suite Redesign
                  </TableCell>
                  <TableCell>Main Building / Floor 3</TableCell>
                  <TableCell>Apr 10, 2023</TableCell>
                  <TableCell>May 20, 2023</TableCell>
                  <TableCell>
                    <Badge variant="outline">Pending Approval</Badge>
                  </TableCell>
                  <TableCell className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Progress value={0} className="h-2" />
                      <span className="text-xs text-gray-500">0%</span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="allocation" className="pt-4">
            <div className="flex space-x-4 mb-4">
              <div className="w-1/3">
                <Label htmlFor="department-select">Department</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="department-select">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                <Label htmlFor="allocation-search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="allocation-search"
                    type="text"
                    placeholder="Search allocations..."
                    className="pl-8"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">
                  Department Space Allocation
                </h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span>
                        Marketing
                      </span>
                      <span>25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>120 m²</span>
                      <span>12 employees</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 rounded-full bg-purple-500"></span>
                        IT
                      </span>
                      <span>30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>150 m²</span>
                      <span>15 employees</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                        HR
                      </span>
                      <span>15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>75 m²</span>
                      <span>8 employees</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 rounded-full bg-amber-500"></span>
                        Finance
                      </span>
                      <span>20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>100 m²</span>
                      <span>10 employees</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                        Executive
                      </span>
                      <span>10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>50 m²</span>
                      <span>4 employees</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Space Allocation by Type</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span>
                        Office Space
                      </span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>300 m²</span>
                      <span>3 spaces</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 rounded-full bg-amber-500"></span>
                        Meeting Rooms
                      </span>
                      <span>15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>75 m²</span>
                      <span>2 spaces</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                        Common Areas
                      </span>
                      <span>25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>125 m²</span>
                      <span>2 spaces</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="pt-4">
            <div className="flex justify-between mb-4">
              <div className="w-1/3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Search scenarios..."
                    className="pl-8"
                  />
                </div>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Scenario
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scenario Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Modified</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    Marketing Expansion - Option A
                  </TableCell>
                  <TableCell>
                    Expand marketing into current storage area
                  </TableCell>
                  <TableCell>Jan 10, 2023</TableCell>
                  <TableCell>Jan 15, 2023</TableCell>
                  <TableCell>
                    <Badge>Selected</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Marketing Expansion - Option B
                  </TableCell>
                  <TableCell>Relocate marketing to floor 2</TableCell>
                  <TableCell>Jan 10, 2023</TableCell>
                  <TableCell>Jan 12, 2023</TableCell>
                  <TableCell>
                    <Badge variant="outline">Alternative</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    IT Department - Hybrid Layout
                  </TableCell>
                  <TableCell>Redesign for hybrid work model</TableCell>
                  <TableCell>Feb 5, 2023</TableCell>
                  <TableCell>Feb 20, 2023</TableCell>
                  <TableCell>
                    <Badge>Selected</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Floor 2 - Open Plan
                  </TableCell>
                  <TableCell>Convert to open plan layout</TableCell>
                  <TableCell>Mar 1, 2023</TableCell>
                  <TableCell>Mar 5, 2023</TableCell>
                  <TableCell>
                    <Badge variant="outline">Draft</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Floor 2 - Activity Based
                  </TableCell>
                  <TableCell>Activity-based working layout</TableCell>
                  <TableCell>Mar 2, 2023</TableCell>
                  <TableCell>Mar 10, 2023</TableCell>
                  <TableCell>
                    <Badge variant="outline">Draft</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="forecasting" className="pt-4">
            <div className="text-center p-12 text-gray-500">
              Space Forecasting content will be implemented in the next phase.
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SpacePlanningAllocation;
