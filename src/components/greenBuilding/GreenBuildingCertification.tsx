import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { enhancedGreenBuildingService } from "./enhancedGreenBuildingService";
import { GreenBuildingData } from "@/models/greenBuilding";
import LoadingFallback from "@/components/common/LoadingFallback";
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
  TrendingDown,
  Droplets,
} from "lucide-react";
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
  ReferenceLine,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const GreenBuildingCertification = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<GreenBuildingData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result =
          await enhancedGreenBuildingService.getGreenBuildingData();
        if (result.data) {
          setData(result.data);
        } else if (result.error) {
          setError(result.error);
        }
      } catch (err) {
        setError(
          "Terjadi kesalahan saat memuat data sertifikasi bangunan hijau.",
        );
        console.error("Error in GreenBuildingCertification:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return (
      <LoadingFallback
        message={t(
          "loadingGreenBuilding",
          "Memuat data sertifikasi bangunan hijau...",
        )}
      />
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 rounded-lg border border-red-200 text-red-800">
        <h3 className="text-lg font-medium mb-2">Error</h3>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md text-red-800 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 bg-slate-50">
        <div className="w-full space-y-4 md:space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
            <div>
              <h1 className="text-2xl font-bold mb-1 tracking-tight">
                Green Building Certification
              </h1>
              <p className="text-slate-500">
                Manage certifications, track compliance, and monitor
                sustainability metrics
              </p>
            </div>
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border rounded-lg gap-4">
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
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-full lg:w-auto">
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 sm:mt-0"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border rounded-lg gap-4">
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
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-full lg:w-auto">
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 sm:mt-0"
                        >
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4">
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
                          <div className="flex items-center gap-4 mt-2 sm:mt-0">
                            <Badge
                              variant="outline"
                              className="bg-amber-50 text-amber-700 border-amber-200"
                            >
                              Medium Priority
                            </Badge>
                            <Button size="sm">Resolve</Button>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4">
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
                          <div className="flex items-center gap-4 mt-2 sm:mt-0">
                            <Badge
                              variant="outline"
                              className="bg-red-50 text-red-700 border-red-200"
                            >
                              High Priority
                            </Badge>
                            <Button size="sm">Resolve</Button>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4">
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
                          <div className="flex items-center gap-4 mt-2 sm:mt-0">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Energy Performance</CardTitle>
                    <CardDescription>
                      Monthly energy consumption and efficiency metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 h-[300px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Avg. Consumption
                        </p>
                        <p className="text-2xl font-bold">12,450 kWh</p>
                        <div className="flex items-center text-sm text-green-600">
                          <TrendingDown className="h-4 w-4 mr-1" />
                          <span>8.2% vs last year</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Efficiency Score
                        </p>
                        <p className="text-2xl font-bold">87/100</p>
                        <Badge className="bg-green-100 text-green-800">
                          Above Target
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Cost Savings
                        </p>
                        <p className="text-2xl font-bold">Rp 45.2M</p>
                        <div className="flex items-center text-sm text-green-600">
                          <Leaf className="h-4 w-4 mr-1" />
                          <span>12.5% improvement</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Carbon Reduction
                        </p>
                        <p className="text-2xl font-bold">18.3 tons</p>
                        <Badge className="bg-green-100 text-green-800">
                          On Target
                        </Badge>
                      </div>
                    </div>
                    <div className="h-[220px] w-full p-4">
                      <ResponsiveContainer width="95%" height="100%">
                        <BarChart
                          data={[
                            { month: "Jan", actual: 14200, target: 15000 },
                            { month: "Feb", actual: 13800, target: 15000 },
                            { month: "Mar", actual: 13200, target: 14500 },
                            { month: "Apr", actual: 12800, target: 14500 },
                            { month: "May", actual: 12400, target: 14000 },
                            { month: "Jun", actual: 12200, target: 14000 },
                            { month: "Jul", actual: 12000, target: 13500 },
                            { month: "Aug", actual: 11800, target: 13500 },
                            { month: "Sep", actual: 12200, target: 13000 },
                            { month: "Oct", actual: 12600, target: 13000 },
                            { month: "Nov", actual: 13000, target: 12500 },
                            { month: "Dec", actual: 13400, target: 12500 },
                          ]}
                          margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            opacity={0.3}
                          />
                          <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis axisLine={false} tickLine={false} />
                          <Tooltip />
                          <Legend wrapperStyle={{ paddingTop: 10 }} />
                          <Bar
                            dataKey="actual"
                            name="Actual"
                            fill="#4A6FFF"
                            radius={[4, 4, 0, 0]}
                          />
                          <Line
                            dataKey="target"
                            name="Target"
                            stroke="#FF4A6F"
                            strokeWidth={2}
                            dot={false}
                          />
                        </BarChart>
                      </ResponsiveContainer>
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
                  <CardContent className="p-0 h-[300px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Total Consumption
                        </p>
                        <p className="text-2xl font-bold">8,240 m³</p>
                        <div className="flex items-center text-sm text-green-600">
                          <TrendingDown className="h-4 w-4 mr-1" />
                          <span>6.5% vs last year</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Recycled Water
                        </p>
                        <p className="text-2xl font-bold">1,850 m³</p>
                        <Badge className="bg-green-100 text-green-800">
                          22.5% of total
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Conservation Rate
                        </p>
                        <p className="text-2xl font-bold">78/100</p>
                        <div className="flex items-center text-sm text-green-600">
                          <Droplets className="h-4 w-4 mr-1" />
                          <span>5.2% improvement</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Cost Savings
                        </p>
                        <p className="text-2xl font-bold">Rp 28.6M</p>
                        <Badge className="bg-green-100 text-green-800">
                          Above Target
                        </Badge>
                      </div>
                    </div>
                    <div className="h-[220px] w-full p-4">
                      <ResponsiveContainer width="95%" height="100%">
                        <BarChart
                          data={[
                            { month: "Jan", consumption: 720, recycled: 140 },
                            { month: "Feb", consumption: 680, recycled: 145 },
                            { month: "Mar", consumption: 740, recycled: 150 },
                            { month: "Apr", consumption: 760, recycled: 155 },
                            { month: "May", consumption: 780, recycled: 160 },
                            { month: "Jun", consumption: 800, recycled: 170 },
                            { month: "Jul", consumption: 820, recycled: 180 },
                            { month: "Aug", consumption: 780, recycled: 175 },
                            { month: "Sep", consumption: 740, recycled: 165 },
                            { month: "Oct", consumption: 700, recycled: 160 },
                            { month: "Nov", consumption: 680, recycled: 155 },
                            { month: "Dec", consumption: 640, recycled: 150 },
                          ]}
                          margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                          stackOffset="expand"
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            opacity={0.3}
                          />
                          <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis axisLine={false} tickLine={false} />
                          <Tooltip />
                          <Legend wrapperStyle={{ paddingTop: 10 }} />
                          <Bar
                            dataKey="consumption"
                            name="Water"
                            fill="#4AAFFF"
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar
                            dataKey="recycled"
                            name="Recycled"
                            fill="#6FCF97"
                            radius={[4, 4, 0, 0]}
                          />
                          <ReferenceLine
                            y={700}
                            stroke="#FF4A6F"
                            strokeDasharray="3 3"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{t("wasteManagement")}</CardTitle>
                  <CardDescription>{t("wasteMonitoring")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-4">
                        {t("wasteComposition")}
                      </h3>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="95%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                {
                                  name: t("organicWaste").split(" ")[0],
                                  value: 45,
                                },
                                {
                                  name: t("inorganicWaste").split(" ")[0],
                                  value: 35,
                                },
                                { name: "B3", value: 20 },
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
                              <Cell key="cell-0" fill="#10b981" />
                              <Cell key="cell-1" fill="#3b82f6" />
                              <Cell key="cell-2" fill="#f59e0b" />
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4">{t("monthlyTrend")}</h3>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="95%" height="100%">
                          <BarChart
                            data={[
                              {
                                month: "Jan",
                                organik: 520,
                                anorganik: 380,
                                berbahaya: 210,
                              },
                              {
                                month: "Feb",
                                organik: 510,
                                anorganik: 390,
                                berbahaya: 200,
                              },
                              {
                                month: "Mar",
                                organik: 530,
                                anorganik: 400,
                                berbahaya: 220,
                              },
                              {
                                month: "Apr",
                                organik: 490,
                                anorganik: 370,
                                berbahaya: 190,
                              },
                              {
                                month: "May",
                                organik: 480,
                                anorganik: 360,
                                berbahaya: 180,
                              },
                              {
                                month: "Jun",
                                organik: 460,
                                anorganik: 350,
                                berbahaya: 170,
                              },
                            ]}
                            margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              vertical={false}
                            />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend wrapperStyle={{ paddingTop: 10 }} />
                            <Bar
                              dataKey="organik"
                              name={`${t("organicWaste").split(" ")[0]}`}
                              fill="#10b981"
                            />
                            <Bar
                              dataKey="anorganik"
                              name={`${t("inorganicWaste").split(" ")[0]}`}
                              fill="#3b82f6"
                            />
                            <Bar dataKey="berbahaya" name="B3" fill="#f59e0b" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
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
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
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
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
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
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
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
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <CardTitle>Green Building Projects</CardTitle>
                      <CardDescription>
                        Manage projects related to green building initiatives
                      </CardDescription>
                    </div>
                    <Button>New Project</Button>
                  </div>
                </CardHeader>
                <CardContent className="overflow-auto">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 bg-slate-50 border-b font-medium text-sm">
                      <div>Project Name</div>
                      <div className="hidden md:block">Building</div>
                      <div className="hidden md:block">Type</div>
                      <div>Status</div>
                      <div className="hidden md:block">Completion</div>
                      <div>Actions</div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 items-center">
                        <div className="font-medium">HVAC System Upgrade</div>
                        <div className="hidden md:block">
                          Jakarta Office Tower
                        </div>
                        <div className="hidden md:block">Energy Efficiency</div>
                        <div>
                          <Badge className="bg-green-100 text-green-800">
                            In Progress
                          </Badge>
                        </div>
                        <div className="hidden md:block">
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

                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 items-center">
                        <div className="font-medium">
                          Green Roof Installation
                        </div>
                        <div className="hidden md:block">
                          Surabaya Commercial Center
                        </div>
                        <div className="hidden md:block">
                          Sustainable Design
                        </div>
                        <div>
                          <Badge className="bg-amber-100 text-amber-800">
                            Planning
                          </Badge>
                        </div>
                        <div className="hidden md:block">
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

                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 items-center">
                        <div className="font-medium">LED Lighting Retrofit</div>
                        <div className="hidden md:block">
                          Bandung Office Complex
                        </div>
                        <div className="hidden md:block">Energy Efficiency</div>
                        <div>
                          <Badge className="bg-blue-100 text-blue-800">
                            Completed
                          </Badge>
                        </div>
                        <div className="hidden md:block">
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

                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 items-center">
                        <div className="font-medium">
                          Water Recycling System
                        </div>
                        <div className="hidden md:block">
                          Bali Resort Complex
                        </div>
                        <div className="hidden md:block">
                          Water Conservation
                        </div>
                        <div>
                          <Badge className="bg-purple-100 text-purple-800">
                            On Hold
                          </Badge>
                        </div>
                        <div className="hidden md:block">
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
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
                <CardContent className="overflow-auto">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-slate-50 border-b font-medium text-sm">
                      <div>Report Name</div>
                      <div className="hidden md:block">Type</div>
                      <div className="hidden md:block">Generated Date</div>
                      <div>Status</div>
                      <div>Actions</div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 items-center">
                        <div className="font-medium">
                          Greenship GBCI Annual Report
                        </div>
                        <div className="hidden md:block">Certification</div>
                        <div className="hidden md:block">15 Mar 2024</div>
                        <div>
                          <Badge className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hidden sm:inline-flex"
                          >
                            View
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 items-center">
                        <div className="font-medium">
                          Energy Consumption Analysis
                        </div>
                        <div className="hidden md:block">Sustainability</div>
                        <div className="hidden md:block">02 Feb 2024</div>
                        <div>
                          <Badge className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hidden sm:inline-flex"
                          >
                            View
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 items-center">
                        <div className="font-medium">
                          PP No. 16/2021 Compliance Report
                        </div>
                        <div className="hidden md:block">Regulatory</div>
                        <div className="hidden md:block">10 Jan 2024</div>
                        <div>
                          <Badge className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hidden sm:inline-flex"
                          >
                            View
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 items-center">
                        <div className="font-medium">
                          Water Usage Quarterly Report
                        </div>
                        <div className="hidden md:block">Sustainability</div>
                        <div className="hidden md:block">In Progress</div>
                        <div>
                          <Badge className="bg-amber-100 text-amber-800">
                            Draft
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hidden sm:inline-flex"
                          >
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
