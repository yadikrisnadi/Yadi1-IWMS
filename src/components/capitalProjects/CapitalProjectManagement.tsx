import React, { useState, useEffect, Suspense, lazy } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Plus,
  FileText,
  Building,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  BarChart4,
  Calendar,
  Users,
  DollarSign,
  ClipboardList,
  Briefcase,
  CheckSquare,
} from "lucide-react";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import LoadingFallback from "@/components/common/LoadingFallback";

// Lazy load sub-modules
const ProjectPlanningBudgeting = lazy(
  () => import("./ProjectPlanningBudgeting"),
);
const ProjectExecution = lazy(() => import("./ProjectExecution"));
const ProjectCloseout = lazy(() => import("./ProjectCloseout"));

interface CapitalProject {
  id: string;
  projectNumber: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  projectType: string;
  location: {
    buildingId: string;
    floorId: string;
    description: string;
  };
  budget: number;
  actualCost: number | null;
  startDate: string;
  plannedEndDate: string;
  actualEndDate: string | null;
  projectManager: string;
  stakeholders: string[];
  approvalStatus: string;
  approvals: {
    managerId: string | null;
    managerApprovalDate: string | null;
    directorId: string | null;
    directorApprovalDate: string | null;
    financialId: string | null;
    financialApprovalDate: string | null;
  };
  phases: {
    id: string;
    name: string;
    status: string;
    startDate: string;
    endDate: string;
    completionPercentage: number;
  }[];
  documents: {
    id: string;
    name: string;
    fileUrl: string;
    uploadDate: string;
    category: string;
  }[];
  risks: {
    id: string;
    description: string;
    impact: string;
    probability: string;
    mitigationPlan: string;
    status: string;
  }[];
}

const CapitalProjectManagement = () => {
  const [projects, setProjects] = useState<CapitalProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<CapitalProject[]>(
    [],
  );
  const [selectedProject, setSelectedProject] = useState<CapitalProject | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Simulate API call
    const fetchProjects = async () => {
      try {
        // This would be replaced with an actual API call
        const mockData: CapitalProject[] = [
          {
            id: "CP001",
            projectNumber: "CP-2023-001",
            title: "Jakarta HQ Renovation",
            description:
              "Complete renovation of Jakarta headquarters including sustainable design elements and cultural workspace adaptations.",
            status: "in-progress",
            priority: "high",
            projectType: "renovation",
            location: {
              buildingId: "B001",
              floorId: "F1-F5",
              description: "Jakarta HQ, Floors 1-5",
            },
            budget: 5000000000, // In IDR
            actualCost: 2100000000,
            startDate: "2023-06-15",
            plannedEndDate: "2024-03-30",
            actualEndDate: null,
            projectManager: "Budi Santoso",
            stakeholders: ["Operations", "Finance", "HR", "IT"],
            approvalStatus: "approved",
            approvals: {
              managerId: "M001",
              managerApprovalDate: "2023-05-10",
              directorId: "D001",
              directorApprovalDate: "2023-05-15",
              financialId: "F001",
              financialApprovalDate: "2023-05-20",
            },
            phases: [
              {
                id: "PH001",
                name: "Planning & Design",
                status: "completed",
                startDate: "2023-06-15",
                endDate: "2023-08-30",
                completionPercentage: 100,
              },
              {
                id: "PH002",
                name: "Demolition & Preparation",
                status: "completed",
                startDate: "2023-09-01",
                endDate: "2023-10-15",
                completionPercentage: 100,
              },
              {
                id: "PH003",
                name: "Construction",
                status: "in-progress",
                startDate: "2023-10-16",
                endDate: "2024-02-28",
                completionPercentage: 65,
              },
              {
                id: "PH004",
                name: "Finishing & Handover",
                status: "not-started",
                startDate: "2024-03-01",
                endDate: "2024-03-30",
                completionPercentage: 0,
              },
            ],
            documents: [
              {
                id: "DOC001",
                name: "Architectural Plans.pdf",
                fileUrl: "#",
                uploadDate: "2023-05-05",
                category: "design",
              },
              {
                id: "DOC002",
                name: "Budget Approval.pdf",
                fileUrl: "#",
                uploadDate: "2023-05-22",
                category: "financial",
              },
              {
                id: "DOC003",
                name: "Construction Timeline.xlsx",
                fileUrl: "#",
                uploadDate: "2023-06-10",
                category: "planning",
              },
            ],
            risks: [
              {
                id: "R001",
                description:
                  "Delay in material delivery due to import restrictions",
                impact: "high",
                probability: "medium",
                mitigationPlan:
                  "Source alternative local materials and adjust design if necessary",
                status: "mitigated",
              },
              {
                id: "R002",
                description: "Budget overrun due to currency fluctuation",
                impact: "high",
                probability: "medium",
                mitigationPlan:
                  "Include contingency budget and secure fixed-price contracts where possible",
                status: "active",
              },
            ],
          },
          {
            id: "CP002",
            projectNumber: "CP-2023-002",
            title: "Surabaya Office Expansion",
            description:
              "Expansion of Surabaya branch office to accommodate growing team and implement modern workplace concepts.",
            status: "planning",
            priority: "medium",
            projectType: "expansion",
            location: {
              buildingId: "B003",
              floorId: "F3",
              description: "Surabaya Office, Floor 3",
            },
            budget: 2500000000, // In IDR
            actualCost: null,
            startDate: "2024-01-15",
            plannedEndDate: "2024-06-30",
            actualEndDate: null,
            projectManager: "Dewi Lestari",
            stakeholders: ["Regional Operations", "Finance", "IT"],
            approvalStatus: "pending",
            approvals: {
              managerId: "M002",
              managerApprovalDate: "2023-11-10",
              directorId: null,
              directorApprovalDate: null,
              financialId: null,
              financialApprovalDate: null,
            },
            phases: [
              {
                id: "PH001",
                name: "Planning & Design",
                status: "in-progress",
                startDate: "2024-01-15",
                endDate: "2024-02-28",
                completionPercentage: 40,
              },
              {
                id: "PH002",
                name: "Procurement",
                status: "not-started",
                startDate: "2024-03-01",
                endDate: "2024-03-30",
                completionPercentage: 0,
              },
              {
                id: "PH003",
                name: "Construction",
                status: "not-started",
                startDate: "2024-04-01",
                endDate: "2024-06-15",
                completionPercentage: 0,
              },
              {
                id: "PH004",
                name: "Finishing & Handover",
                status: "not-started",
                startDate: "2024-06-16",
                endDate: "2024-06-30",
                completionPercentage: 0,
              },
            ],
            documents: [
              {
                id: "DOC001",
                name: "Initial Design Concept.pdf",
                fileUrl: "#",
                uploadDate: "2023-10-15",
                category: "design",
              },
              {
                id: "DOC002",
                name: "Budget Proposal.pdf",
                fileUrl: "#",
                uploadDate: "2023-10-30",
                category: "financial",
              },
            ],
            risks: [
              {
                id: "R001",
                description:
                  "Disruption to existing operations during construction",
                impact: "medium",
                probability: "high",
                mitigationPlan:
                  "Implement phased construction approach and temporary workspace arrangements",
                status: "active",
              },
            ],
          },
          {
            id: "CP003",
            projectNumber: "CP-2023-003",
            title: "Bali Green Office Initiative",
            description:
              "Retrofit of Bali office to achieve Greenship GBCI certification and implement sustainable workplace practices.",
            status: "completed",
            priority: "high",
            projectType: "sustainability",
            location: {
              buildingId: "B005",
              floorId: "F1-F2",
              description: "Bali Office, Floors 1-2",
            },
            budget: 1800000000, // In IDR
            actualCost: 1750000000,
            startDate: "2023-02-01",
            plannedEndDate: "2023-08-31",
            actualEndDate: "2023-09-15",
            projectManager: "Putu Wijaya",
            stakeholders: ["Sustainability", "Operations", "Finance"],
            approvalStatus: "approved",
            approvals: {
              managerId: "M003",
              managerApprovalDate: "2023-01-10",
              directorId: "D002",
              directorApprovalDate: "2023-01-15",
              financialId: "F002",
              financialApprovalDate: "2023-01-20",
            },
            phases: [
              {
                id: "PH001",
                name: "Assessment & Planning",
                status: "completed",
                startDate: "2023-02-01",
                endDate: "2023-03-15",
                completionPercentage: 100,
              },
              {
                id: "PH002",
                name: "Implementation",
                status: "completed",
                startDate: "2023-03-16",
                endDate: "2023-07-31",
                completionPercentage: 100,
              },
              {
                id: "PH003",
                name: "Certification & Handover",
                status: "completed",
                startDate: "2023-08-01",
                endDate: "2023-09-15",
                completionPercentage: 100,
              },
            ],
            documents: [
              {
                id: "DOC001",
                name: "Sustainability Assessment.pdf",
                fileUrl: "#",
                uploadDate: "2023-02-15",
                category: "assessment",
              },
              {
                id: "DOC002",
                name: "GBCI Certification Application.pdf",
                fileUrl: "#",
                uploadDate: "2023-08-10",
                category: "certification",
              },
              {
                id: "DOC003",
                name: "Final Project Report.pdf",
                fileUrl: "#",
                uploadDate: "2023-09-20",
                category: "report",
              },
            ],
            risks: [
              {
                id: "R001",
                description: "Certification requirements change during project",
                impact: "high",
                probability: "low",
                mitigationPlan:
                  "Regular consultation with GBCI and maintain flexibility in implementation",
                status: "closed",
              },
            ],
          },
        ];

        setProjects(mockData);
        setFilteredProjects(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let result = projects;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.projectNumber.toLowerCase().includes(query),
      );
    }

    // Apply type filter
    if (filterType !== "all") {
      result = result.filter((project) => project.projectType === filterType);
    }

    // Apply status filter
    if (filterStatus !== "all") {
      result = result.filter((project) => project.status === filterStatus);
    }

    setFilteredProjects(result);
  }, [projects, searchQuery, filterType, filterStatus]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "planning":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <Clock className="h-3 w-3 mr-1" /> Planning
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <Clock className="h-3 w-3 mr-1" /> In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" /> Completed
          </Badge>
        );
      case "on-hold":
        return (
          <Badge className="bg-orange-500 hover:bg-orange-600">
            <AlertTriangle className="h-3 w-3 mr-1" /> On Hold
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <AlertTriangle className="h-3 w-3 mr-1" /> Cancelled
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return <Badge className="bg-red-500 hover:bg-red-600">Critical</Badge>;
      case "high":
        return (
          <Badge className="bg-orange-500 hover:bg-orange-600">High</Badge>
        );
      case "medium":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">Medium</Badge>
        );
      case "low":
        return <Badge className="bg-green-500 hover:bg-green-600">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  // Add the render function for the Capital Project Management component
  const renderCapitalProjectManagement = () => {
    return (
      <div className="space-y-6 p-4 bg-background rounded-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Capital Project Management</h2>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" /> New Project
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:w-auto w-full"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters {showFilters ? "(on)" : ""}
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg bg-muted/20">
            <div>
              <Label htmlFor="type-filter">Project Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger id="type-filter">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="renovation">Renovation</SelectItem>
                  <SelectItem value="expansion">Expansion</SelectItem>
                  <SelectItem value="sustainability">Sustainability</SelectItem>
                  <SelectItem value="new-construction">
                    New Construction
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="planning">Planning & Budgeting</TabsTrigger>
            <TabsTrigger value="execution">Execution</TabsTrigger>
            <TabsTrigger value="closeout">Closeout</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="pt-4">
            {/* Overview Tab Content */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <Briefcase className="h-8 w-8 text-blue-500 mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Total Projects
                      </p>
                      <p className="text-2xl font-bold">{projects.length}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <Clock className="h-8 w-8 text-yellow-500 mb-2" />
                      <p className="text-sm text-muted-foreground">
                        In Progress
                      </p>
                      <p className="text-2xl font-bold">
                        {
                          projects.filter((p) => p.status === "in-progress")
                            .length
                        }
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <CheckSquare className="h-8 w-8 text-green-500 mb-2" />
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold">
                        {
                          projects.filter((p) => p.status === "completed")
                            .length
                        }
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-lg font-medium mb-4">All Projects</h3>
                <ScrollArea className="h-[400px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project #</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Project Manager</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProjects.map((project) => (
                        <TableRow
                          key={project.id}
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => setSelectedProject(project)}
                        >
                          <TableCell className="font-mono">
                            {project.projectNumber}
                          </TableCell>
                          <TableCell className="font-medium">
                            {project.title}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(project.status)}
                          </TableCell>
                          <TableCell>
                            {getPriorityBadge(project.priority)}
                          </TableCell>
                          <TableCell className="capitalize">
                            {project.projectType}
                          </TableCell>
                          <TableCell>{project.projectManager}</TableCell>
                          <TableCell>
                            {new Date(project.startDate).toLocaleDateString(
                              "id-ID",
                            )}
                          </TableCell>
                          <TableCell>
                            {project.actualEndDate
                              ? new Date(
                                  project.actualEndDate,
                                ).toLocaleDateString("id-ID")
                              : new Date(
                                  project.plannedEndDate,
                                ).toLocaleDateString("id-ID")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="planning" className="pt-4">
            <ErrorBoundary moduleName="Capital Projects - Planning & Budgeting">
              <Suspense
                fallback={
                  <LoadingFallback message="Memuat perencanaan & anggaran proyek..." />
                }
              >
                <ProjectPlanningBudgeting />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>
          <TabsContent value="execution" className="pt-4">
            <ErrorBoundary moduleName="Capital Projects - Execution">
              <Suspense
                fallback={
                  <LoadingFallback message="Memuat eksekusi proyek..." />
                }
              >
                <ProjectExecution />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>
          <TabsContent value="closeout" className="pt-4">
            <ErrorBoundary moduleName="Capital Projects - Closeout">
              <Suspense
                fallback={
                  <LoadingFallback message="Memuat penutupan proyek..." />
                }
              >
                <ProjectCloseout />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return (
    <ErrorBoundary moduleName="Capital Project Management">
      {isLoading ? (
        <LoadingFallback message="Memuat data proyek..." />
      ) : (
        renderCapitalProjectManagement()
      )}
    </ErrorBoundary>
  );
};

export default CapitalProjectManagement;
