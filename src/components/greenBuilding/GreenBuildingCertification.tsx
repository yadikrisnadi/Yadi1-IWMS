import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import {
  CheckCircle2,
  Clock,
  FileText,
  Award,
  Building2,
  Leaf,
  BarChart3,
  AlertTriangle,
} from "lucide-react";

const GreenBuildingCertification = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 overflow-auto p-8 bg-slate-50">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-1 tracking-tight">
                Green Building Certification
              </h1>
              <p className="text-slate-500">
                Manage certifications, track compliance, and monitor
                sustainability metrics
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Generate Report
              </Button>
              <Button className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Apply for Certification
              </Button>
            </div>
          </div>

          {/* Certification Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <div className="flex items-center mt-2 text-sm">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" /> Valid
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <div className="flex items-center mt-2 text-sm">
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-700 border-yellow-200"
                  >
                    <Clock className="h-3 w-3 mr-1" /> In Progress
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Compliance Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <div className="flex items-center mt-2">
                  <Progress value={87} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Energy Reduction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23%</div>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    <Leaf className="h-3 w-3 mr-1" /> Above Target
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="certifications" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            {/* Certifications Tab */}
            <TabsContent value="certifications" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-green-100">
                          <Award className="h-6 w-6 text-green-700" />
                        </div>
                        <div>
                          <CardTitle>Greenship GBCI</CardTitle>
                          <CardDescription>New Building v1.2</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        Platinum
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Issue Date
                          </p>
                          <p className="font-medium">15 Mar 2023</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Expiry Date
                          </p>
                          <p className="font-medium">15 Mar 2026</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Certificate ID
                          </p>
                          <p className="font-medium">GBCI-NB-2023-0142</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Total Points
                          </p>
                          <p className="font-medium">86/100</p>
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">Renewal Status</p>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" /> On Track
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-100">
                          <Building2 className="h-6 w-6 text-blue-700" />
                        </div>
                        <div>
                          <CardTitle>BGH Certification</CardTitle>
                          <CardDescription>Existing Building</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        Gold
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Issue Date
                          </p>
                          <p className="font-medium">22 Jun 2022</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Expiry Date
                          </p>
                          <p className="font-medium">22 Jun 2025</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Certificate ID
                          </p>
                          <p className="font-medium">BGH-EB-2022-0078</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Total Points
                          </p>
                          <p className="font-medium">72/100</p>
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">Renewal Status</p>
                          <Badge
                            variant="outline"
                            className="bg-yellow-50 text-yellow-700 border-yellow-200"
                          >
                            <AlertTriangle className="h-3 w-3 mr-1" /> Action
                            Required
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Certification Applications in Progress</CardTitle>
                  <CardDescription>
                    Track the status of your ongoing certification applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-indigo-100">
                          <Award className="h-5 w-5 text-indigo-700" />
                        </div>
                        <div>
                          <p className="font-medium">EDGE Certification</p>
                          <p className="text-sm text-muted-foreground">
                            Jakarta Office Tower
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Submission Date
                          </p>
                          <p className="font-medium">10 Jan 2024</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Current Stage
                          </p>
                          <p className="font-medium">Document Review</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Progress
                          </p>
                          <div className="flex items-center gap-2">
                            <Progress value={65} className="h-2 w-24" />
                            <span className="text-sm">65%</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-purple-100">
                          <Award className="h-5 w-5 text-purple-700" />
                        </div>
                        <div>
                          <p className="font-medium">LEED Certification</p>
                          <p className="text-sm text-muted-foreground">
                            Surabaya Commercial Center
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Submission Date
                          </p>
                          <p className="font-medium">05 Mar 2024</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Current Stage
                          </p>
                          <p className="font-medium">Initial Assessment</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Progress
                          </p>
                          <div className="flex items-center gap-2">
                            <Progress value={30} className="h-2 w-24" />
                            <span className="text-sm">30%</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Compliance Tab */}
            <TabsContent value="compliance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Dashboard</CardTitle>
                  <CardDescription>
                    Track compliance with Indonesian regulations and
                    certification requirements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            PP No. 16/2021
                          </CardTitle>
                          <CardDescription>
                            Building Regulations
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold">92%</div>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              Compliant
                            </Badge>
                          </div>
                          <Progress value={92} className="h-2 mt-2" />
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            ISO 14001
                          </CardTitle>
                          <CardDescription>
                            Environmental Management
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold">78%</div>
                            <Badge
                              variant="outline"
                              className="bg-yellow-50 text-yellow-700 border-yellow-200"
                            >
                              Partial
                            </Badge>
                          </div>
                          <Progress value={78} className="h-2 mt-2" />
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            ISO 50001
                          </CardTitle>
                          <CardDescription>Energy Management</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold">85%</div>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              Compliant
                            </Badge>
                          </div>
                          <Progress value={85} className="h-2 mt-2" />
                        </CardContent>
                      </Card>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-slate-50 px-4 py-3 border-b">
                        <h3 className="font-medium">Compliance Issues</h3>
                      </div>
                      <div className="divide-y">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            <div>
                              <p className="font-medium">
                                Water Efficiency Requirements
                              </p>
                              <p className="text-sm text-muted-foreground">
                                ISO 14001 Section 6.2
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge
                              variant="outline"
                              className="bg-amber-50 text-amber-700 border-amber-200"
                            >
                              Medium Priority
                            </Badge>
                            <Button size="sm">Resolve</Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            <div>
                              <p className="font-medium">
                                Energy Monitoring System
                              </p>
                              <p className="text-sm text-muted-foreground">
                                ISO 50001 Section 4.6.1
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge
                              variant="outline"
                              className="bg-red-50 text-red-700 border-red-200"
                            >
                              High Priority
                            </Badge>
                            <Button size="sm">Resolve</Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            <div>
                              <p className="font-medium">
                                Waste Management Documentation
                              </p>
                              <p className="text-sm text-muted-foreground">
                                PP No. 16/2021 Article 27
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge
                              variant="outline"
                              className="bg-amber-50 text-amber-700 border-amber-200"
                            >
                              Medium Priority
                            </Badge>
                            <Button size="sm">Resolve</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sustainability Tab */}
            <TabsContent value="sustainability" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Energy Performance</CardTitle>
                    <CardDescription>
                      Monthly energy consumption and efficiency metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center bg-slate-50 rounded-lg">
                    <div className="text-center text-muted-foreground">
                      <BarChart3 className="h-10 w-10 mx-auto mb-2 text-slate-400" />
                      <p>Energy consumption chart would appear here</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Water Usage</CardTitle>
                    <CardDescription>
                      Water consumption and conservation metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center bg-slate-50 rounded-lg">
                    <div className="text-center text-muted-foreground">
                      <BarChart3 className="h-10 w-10 mx-auto mb-2 text-slate-400" />
                      <p>Water usage chart would appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Sustainability Initiatives</CardTitle>
                  <CardDescription>
                    Track ongoing sustainability projects and their impact
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-green-100">
                            <Leaf className="h-5 w-5 text-green-700" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Solar Panel Installation
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Phase 2 Implementation
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          In Progress
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Progress
                          </span>
                          <span className="font-medium">75%</span>
                        </div>
                        <Progress value={75} className="h-2" />
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Start Date
                            </p>
                            <p className="font-medium">10 Jan 2024</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Target Completion
                            </p>
                            <p className="font-medium">30 Jun 2024</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Estimated CO₂ Reduction
                            </p>
                            <p className="font-medium">120 tons/year</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-blue-100">
                            <Leaf className="h-5 w-5 text-blue-700" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Rainwater Harvesting System
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Implementation
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">
                          Planning
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Progress
                          </span>
                          <span className="font-medium">25%</span>
                        </div>
                        <Progress value={25} className="h-2" />
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Start Date
                            </p>
                            <p className="font-medium">15 Mar 2024</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Target Completion
                            </p>
                            <p className="font-medium">15 Sep 2024</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Estimated Water Savings
                            </p>
                            <p className="font-medium">1,200 m³/year</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Green Building Projects</CardTitle>
                      <CardDescription>
                        Manage projects related to green building initiatives
                      </CardDescription>
                    </div>
                    <Button>New Project</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-6 gap-4 p-4 bg-slate-50 border-b font-medium text-sm">
                      <div>Project Name</div>
                      <div>Building</div>
                      <div>Type</div>
                      <div>Status</div>
                      <div>Completion</div>
                      <div>Actions</div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-6 gap-4 p-4 items-center">
                        <div className="font-medium">HVAC System Upgrade</div>
                        <div>Jakarta Office Tower</div>
                        <div>Energy Efficiency</div>
                        <div>
                          <Badge className="bg-green-100 text-green-800">
                            In Progress
                          </Badge>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Progress value={60} className="h-2 w-24" />
                            <span className="text-sm">60%</span>
                          </div>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-6 gap-4 p-4 items-center">
                        <div className="font-medium">
                          Green Roof Installation
                        </div>
                        <div>Surabaya Commercial Center</div>
                        <div>Sustainable Design</div>
                        <div>
                          <Badge className="bg-amber-100 text-amber-800">
                            Planning
                          </Badge>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Progress value={20} className="h-2 w-24" />
                            <span className="text-sm">20%</span>
                          </div>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-6 gap-4 p-4 items-center">
                        <div className="font-medium">LED Lighting Retrofit</div>
                        <div>Bandung Office Complex</div>
                        <div>Energy Efficiency</div>
                        <div>
                          <Badge className="bg-blue-100 text-blue-800">
                            Completed
                          </Badge>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Progress value={100} className="h-2 w-24" />
                            <span className="text-sm">100%</span>
                          </div>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-6 gap-4 p-4 items-center">
                        <div className="font-medium">
                          Water Recycling System
                        </div>
                        <div>Bali Resort Complex</div>
                        <div>Water Conservation</div>
                        <div>
                          <Badge className="bg-purple-100 text-purple-800">
                            On Hold
                          </Badge>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Progress value={45} className="h-2 w-24" />
                            <span className="text-sm">45%</span>
                          </div>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Certification Reports</CardTitle>
                      <CardDescription>
                        Generate and manage reports for certification and
                        compliance
                      </CardDescription>
                    </div>
                    <Button>Generate New Report</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-5 gap-4 p-4 bg-slate-50 border-b font-medium text-sm">
                      <div>Report Name</div>
                      <div>Type</div>
                      <div>Generated Date</div>
                      <div>Status</div>
                      <div>Actions</div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-5 gap-4 p-4 items-center">
                        <div className="font-medium">
                          Greenship GBCI Annual Report
                        </div>
                        <div>Certification</div>
                        <div>15 Mar 2024</div>
                        <div>
                          <Badge className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-5 gap-4 p-4 items-center">
                        <div className="font-medium">
                          Energy Consumption Analysis
                        </div>
                        <div>Sustainability</div>
                        <div>02 Feb 2024</div>
                        <div>
                          <Badge className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-5 gap-4 p-4 items-center">
                        <div className="font-medium">
                          PP No. 16/2021 Compliance Report
                        </div>
                        <div>Regulatory</div>
                        <div>10 Jan 2024</div>
                        <div>
                          <Badge className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-5 gap-4 p-4 items-center">
                        <div className="font-medium">
                          Water Usage Quarterly Report
                        </div>
                        <div>Sustainability</div>
                        <div>In Progress</div>
                        <div>
                          <Badge className="bg-amber-100 text-amber-800">
                            Draft
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default GreenBuildingCertification;
