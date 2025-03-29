import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import {
  Building,
  Calendar,
  Clock,
  Coffee,
  FileText,
  Layout,
  MapPin,
  MessageSquare,
  Users,
  Zap,
} from "lucide-react";

const WorkplaceExperience = () => {
  const [selectedBuilding, setSelectedBuilding] = useState("jakarta-hq");

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Workplace Experience
          </h1>
          <p className="text-slate-500">
            Manage workplace layouts, track utilization, and optimize facilities
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select building" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jakarta-hq">Jakarta HQ</SelectItem>
              <SelectItem value="surabaya-office">Surabaya Office</SelectItem>
              <SelectItem value="bali-branch">Bali Branch</SelectItem>
              <SelectItem value="bandung-tech">Bandung Tech Center</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export</Button>
          <Button>Configure</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="space-management">Space Management</TabsTrigger>
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                  Workspace Utilization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">76%</div>
                <Progress value={76} className="h-2 mt-2" />
                <p className="text-xs text-slate-500 mt-2">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                  Employee Satisfaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2/5</div>
                <Progress value={84} className="h-2 mt-2" />
                <p className="text-xs text-slate-500 mt-2">
                  Based on 128 responses
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                  Service Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
                  >
                    18 Resolved
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200"
                  >
                    6 Pending
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Average resolution: 4.5 hours
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Workplace Layout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-slate-100 rounded-md flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center flex-col gap-2">
                    <Layout className="h-12 w-12 text-slate-400" />
                    <p className="text-slate-500 text-sm">
                      Interactive floor plan
                    </p>
                    <Button size="sm" variant="outline">
                      View Full Layout
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Reservations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Executive Meeting",
                      location: "Conference Room A",
                      time: "09:00 - 11:00",
                      date: "Today",
                      attendees: 8,
                    },
                    {
                      title: "Team Brainstorming",
                      location: "Collaboration Zone",
                      time: "13:30 - 15:00",
                      date: "Today",
                      attendees: 12,
                    },
                    {
                      title: "Client Presentation",
                      location: "Meeting Room 3",
                      time: "10:00 - 12:00",
                      date: "Tomorrow",
                      attendees: 5,
                    },
                  ].map((reservation, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{reservation.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <MapPin className="h-3 w-3" />
                          <span>{reservation.location}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Clock className="h-3 w-3" />
                            <span>{reservation.time}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Calendar className="h-3 w-3" />
                            <span>{reservation.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Users className="h-3 w-3" />
                            <span>{reservation.attendees} attendees</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Workplace Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: <Coffee className="h-5 w-5" />, name: "Catering" },
                    {
                      icon: <MessageSquare className="h-5 w-5" />,
                      name: "IT Support",
                    },
                    {
                      icon: <FileText className="h-5 w-5" />,
                      name: "Printing",
                    },
                    { icon: <Zap className="h-5 w-5" />, name: "Maintenance" },
                  ].map((service, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto py-4 flex flex-col gap-2 items-center justify-center"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                        {service.icon}
                      </div>
                      <span className="text-sm">{service.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Workplace Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Peak Occupancy Hours</h3>
                      <p className="text-sm text-slate-500">
                        10:00 AM - 2:00 PM
                      </p>
                    </div>
                    <Badge>Tuesday & Thursday</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Most Used Spaces</h3>
                      <p className="text-sm text-slate-500">
                        Collaboration Zones, Meeting Room B
                      </p>
                    </div>
                    <Badge variant="outline">85% Utilization</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Least Used Spaces</h3>
                      <p className="text-sm text-slate-500">
                        Phone Booths, Quiet Zones
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200"
                    >
                      32% Utilization
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Average Meeting Duration</h3>
                      <p className="text-sm text-slate-500">52 minutes</p>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      -8% from last month
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="space-management">
          <Card>
            <CardHeader>
              <CardTitle>Space Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12 text-slate-500">
                <div className="text-center">
                  <Building className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <h3 className="text-lg font-medium mb-2">
                    Space Management Tools
                  </h3>
                  <p className="max-w-md mx-auto mb-4">
                    Manage floor plans, allocate spaces, and optimize workplace
                    layouts according to Indonesian cultural workplace norms.
                  </p>
                  <Button>Open Space Planner</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reservations">
          <Card>
            <CardHeader>
              <CardTitle>Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12 text-slate-500">
                <div className="text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <h3 className="text-lg font-medium mb-2">
                    Reservation System
                  </h3>
                  <p className="max-w-md mx-auto mb-4">
                    Book meeting rooms, desks, and other resources with our
                    intuitive reservation system.
                  </p>
                  <Button>Make a Reservation</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Workplace Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12 text-slate-500">
                <div className="text-center">
                  <Coffee className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <h3 className="text-lg font-medium mb-2">Service Requests</h3>
                  <p className="max-w-md mx-auto mb-4">
                    Request catering, IT support, maintenance, and other
                    workplace services.
                  </p>
                  <Button>Request Service</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Workplace Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12 text-slate-500">
                <div className="text-center">
                  <Zap className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <h3 className="text-lg font-medium mb-2">
                    Analytics Dashboard
                  </h3>
                  <p className="max-w-md mx-auto mb-4">
                    Gain insights into workplace utilization, employee
                    satisfaction, and service performance.
                  </p>
                  <Button>View Analytics</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkplaceExperience;
