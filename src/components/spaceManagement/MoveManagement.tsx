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
  Move,
  Search,
  Plus,
  Filter,
  Download,
  Users,
  Calendar,
  ClipboardCheck,
  Truck,
} from "lucide-react";

const MoveManagement = () => {
  const [activeTab, setActiveTab] = useState("requests");

  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Move className="h-5 w-5 text-primary" />
            Move Management
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
              New Move Request
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="requests">
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Move Requests
            </TabsTrigger>
            <TabsTrigger value="schedule">
              <Calendar className="h-4 w-4 mr-2" />
              Move Schedule
            </TabsTrigger>
            <TabsTrigger value="employees">
              <Users className="h-4 w-4 mr-2" />
              Employee Moves
            </TabsTrigger>
            <TabsTrigger value="assets">
              <Truck className="h-4 w-4 mr-2" />
              Asset Moves
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="pt-4">
            <div className="flex space-x-4 mb-4">
              <div className="w-1/3">
                <Label htmlFor="status-select">Status</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="status-select">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/3">
                <Label htmlFor="priority-select">Priority</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="priority-select">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/3">
                <Label htmlFor="move-search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="move-search"
                    type="text"
                    placeholder="Search moves..."
                    className="pl-8"
                  />
                </div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Requested Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">MOV-2023-001</TableCell>
                  <TableCell>John Smith</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Floor 1 / SP-101</TableCell>
                  <TableCell>Floor 2 / SP-201</TableCell>
                  <TableCell>Mar 15, 2023</TableCell>
                  <TableCell>
                    <Badge>In Progress</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200"
                    >
                      High
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">MOV-2023-002</TableCell>
                  <TableCell>Sarah Johnson</TableCell>
                  <TableCell>Individual</TableCell>
                  <TableCell>Floor 2 / SP-202</TableCell>
                  <TableCell>Floor 2 / SP-205</TableCell>
                  <TableCell>Mar 20, 2023</TableCell>
                  <TableCell>
                    <Badge variant="outline">Pending Approval</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200"
                    >
                      Medium
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">MOV-2023-003</TableCell>
                  <TableCell>Michael Brown</TableCell>
                  <TableCell>Asset</TableCell>
                  <TableCell>Floor 1 / SP-105</TableCell>
                  <TableCell>Floor 3 / SP-301</TableCell>
                  <TableCell>Mar 22, 2023</TableCell>
                  <TableCell>
                    <Badge variant="outline">Scheduled</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Low
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">MOV-2023-004</TableCell>
                  <TableCell>Emily Davis</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>East Wing / Floor 1</TableCell>
                  <TableCell>Main Building / Floor 2</TableCell>
                  <TableCell>Apr 5, 2023</TableCell>
                  <TableCell>
                    <Badge variant="outline">Planning</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200"
                    >
                      Medium
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">MOV-2023-005</TableCell>
                  <TableCell>Robert Wilson</TableCell>
                  <TableCell>Individual</TableCell>
                  <TableCell>Floor 3 / SP-302</TableCell>
                  <TableCell>Floor 3 / SP-305</TableCell>
                  <TableCell>Feb 28, 2023</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Completed</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Low
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="schedule" className="pt-4">
            <div className="flex space-x-4 mb-4">
              <div className="w-1/3">
                <Label htmlFor="month-select">Month</Label>
                <Select defaultValue="march">
                  <SelectTrigger id="month-select">
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="january">January 2023</SelectItem>
                    <SelectItem value="february">February 2023</SelectItem>
                    <SelectItem value="march">March 2023</SelectItem>
                    <SelectItem value="april">April 2023</SelectItem>
                    <SelectItem value="may">May 2023</SelectItem>
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
                <Label htmlFor="schedule-search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="schedule-search"
                    type="text"
                    placeholder="Search schedule..."
                    className="pl-8"
                  />
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-7 bg-gray-50 border-b">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <div
                    key={day}
                    className="p-2 text-center font-medium text-sm border-r last:border-r-0"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 grid-rows-5 h-[500px]">
                {Array.from({ length: 35 }).map((_, i) => {
                  const day = i % 7;
                  const week = Math.floor(i / 7);
                  const date = i - 3 + 1; // Start from March 1st (offset by 3 days)

                  // Only show dates for March (1-31)
                  const showDate = date > 0 && date <= 31;

                  // Add some sample move events
                  let moveEvent = null;
                  if (date === 15) {
                    moveEvent = {
                      id: "MOV-2023-001",
                      title: "Marketing Dept Move",
                      type: "department",
                    };
                  } else if (date === 20) {
                    moveEvent = {
                      id: "MOV-2023-002",
                      title: "Sarah's Workstation Move",
                      type: "individual",
                    };
                  } else if (date === 22) {
                    moveEvent = {
                      id: "MOV-2023-003",
                      title: "Conference Room Equipment",
                      type: "asset",
                    };
                  } else if (date === 28) {
                    moveEvent = {
                      id: "MOV-2023-005",
                      title: "Robert's Office Move",
                      type: "individual",
                    };
                  }

                  return (
                    <div
                      key={i}
                      className={`p-1 border-r border-b min-h-[100px] ${day === 6 || day === 5 ? "bg-gray-50" : ""} ${!showDate ? "bg-gray-100" : ""}`}
                    >
                      {showDate && (
                        <>
                          <div className="text-xs font-medium p-1">{date}</div>
                          {moveEvent && (
                            <div
                              className={`p-1 rounded text-xs mt-1 ${moveEvent.type === "department" ? "bg-blue-100 text-blue-800" : moveEvent.type === "individual" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                            >
                              <div className="font-medium">
                                {moveEvent.title}
                              </div>
                              <div className="text-xs opacity-75">
                                {moveEvent.id}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex gap-4">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-sm">Department Moves</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-sm">Individual Moves</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="text-sm">Asset Moves</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="employees" className="pt-4">
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
                <Label htmlFor="status-select">Status</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="status-select">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/3">
                <Label htmlFor="employee-search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="employee-search"
                    type="text"
                    placeholder="Search employees..."
                    className="pl-8"
                  />
                </div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Current Location</TableHead>
                  <TableHead>New Location</TableHead>
                  <TableHead>Move Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">John Smith</TableCell>
                  <TableCell>Marketing</TableCell>
                  <TableCell>Floor 1 / SP-101</TableCell>
                  <TableCell>Floor 2 / SP-201</TableCell>
                  <TableCell>Mar 15, 2023</TableCell>
                  <TableCell>
                    <Badge>In Progress</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Sarah Johnson</TableCell>
                  <TableCell>Marketing</TableCell>
                  <TableCell>Floor 2 / SP-202</TableCell>
                  <TableCell>Floor 2 / SP-205</TableCell>
                  <TableCell>Mar 20, 2023</TableCell>
                  <TableCell>
                    <Badge variant="outline">Scheduled</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Robert Wilson</TableCell>
                  <TableCell>Executive</TableCell>
                  <TableCell>Floor 3 / SP-302</TableCell>
                  <TableCell>Floor 3 / SP-305</TableCell>
                  <TableCell>Feb 28, 2023</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Completed</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Emily Davis</TableCell>
                  <TableCell>HR</TableCell>
                  <TableCell>East Wing / Floor 1</TableCell>
                  <TableCell>Main Building / Floor 2</TableCell>
                  <TableCell>Apr 5, 2023</TableCell>
                  <TableCell>
                    <Badge variant="outline">Scheduled</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Michael Brown</TableCell>
                  <TableCell>IT</TableCell>
                  <TableCell>Floor 2 / SP-203</TableCell>
                  <TableCell>Floor 2 / SP-210</TableCell>
                  <TableCell>Apr 10, 2023</TableCell>
                  <TableCell>
                    <Badge variant="outline">Pending</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="assets" className="pt-4">
            <div className="flex space-x-4 mb-4">
              <div className="w-1/3">
                <Label htmlFor="asset-type-select">Asset Type</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="asset-type-select">
                    <SelectValue placeholder="Select Asset Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="it">IT Equipment</SelectItem>
                    <SelectItem value="office">Office Equipment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/3">
                <Label htmlFor="status-select">Status</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="status-select">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/3">
                <Label htmlFor="asset-search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="asset-search"
                    type="text"
                    placeholder="Search assets..."
                    className="pl-8"
                  />
                </div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Current Location</TableHead>
                  <TableHead>New Location</TableHead>
                  <TableHead>Move Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">AST-1234</TableCell>
                  <TableCell>Conference Table</TableCell>
                  <TableCell>Furniture</TableCell>
                  <TableCell>Floor 1 / SP-105</TableCell>
                  <TableCell>Floor 3 / SP-301</TableCell>
                  <TableCell>Mar 22, 2023</TableCell>
                  <TableCell>
                    <Badge variant="outline">Scheduled</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">AST-2345</TableCell>
                  <TableCell>Projector</TableCell>
                  <TableCell>IT Equipment</TableCell>
                  <TableCell>Floor 2 / SP-202</TableCell>
                  <TableCell>Floor 1 / SP-102</TableCell>
                  <TableCell>Mar 25, 2023</TableCell>
                  <TableCell>
                    <Badge variant="outline">Pending</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">AST-3456</TableCell>
                  <TableCell>Executive Desk</TableCell>
                  <TableCell>Furniture</TableCell>
                  <TableCell>Floor 3 / SP-302</TableCell>
                  <TableCell>Floor 3 / SP-305</TableCell>
                  <TableCell>Feb 28, 2023</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Completed</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">AST-4567</TableCell>
                  <TableCell>Filing Cabinets (5)</TableCell>
                  <TableCell>Office Equipment</TableCell>
                  <TableCell>East Wing / Floor 1</TableCell>
                  <TableCell>Main Building / Floor 2</TableCell>
                  <TableCell>Apr 5, 2023</TableCell>
                  <TableCell>
                    <Badge variant="outline">Scheduled</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">AST-5678</TableCell>
                  <TableCell>Workstations (10)</TableCell>
                  <TableCell>Furniture</TableCell>
                  <TableCell>Floor 1 / SP-101</TableCell>
                  <TableCell>Floor 2 / SP-201</TableCell>
                  <TableCell>Mar 15, 2023</TableCell>
                  <TableCell>
                    <Badge>In Progress</Badge>
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

export default MoveManagement;
