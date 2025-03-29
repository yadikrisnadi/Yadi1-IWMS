import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, CheckCircle, Clock, BarChart4 } from "lucide-react";

const ProjectExecution = () => {
  // Mock data for active projects
  const activeProjects = [
    {
      id: "CP001",
      projectNumber: "CP-2023-001",
      title: "Jakarta HQ Renovation",
      status: "in-progress",
      currentPhase: "Construction",
      progress: 65,
      budget: 5000000000,
      spent: 2100000000,
      startDate: "2023-06-15",
      plannedEndDate: "2024-03-30",
      projectManager: "Budi Santoso",
      issues: 2,
    },
    {
      id: "CP002",
      projectNumber: "CP-2023-002",
      title: "Surabaya Office Expansion",
      status: "planning",
      currentPhase: "Planning & Design",
      progress: 40,
      budget: 2500000000,
      spent: 200000000,
      startDate: "2024-01-15",
      plannedEndDate: "2024-06-30",
      projectManager: "Dewi Lestari",
      issues: 1,
    },
    {
      id: "CP004",
      projectNumber: "CP-2023-004",
      title: "Medan Office Renovation",
      status: "in-progress",
      currentPhase: "Demolition & Preparation",
      progress: 25,
      budget: 1800000000,
      spent: 450000000,
      startDate: "2023-11-01",
      plannedEndDate: "2024-05-15",
      projectManager: "Ahmad Hidayat",
      issues: 0,
    },
    {
      id: "CP005",
      projectNumber: "CP-2023-005",
      title: "Bandung Data Center Upgrade",
      status: "on-hold",
      currentPhase: "Equipment Procurement",
      progress: 30,
      budget: 3500000000,
      spent: 1200000000,
      startDate: "2023-09-01",
      plannedEndDate: "2024-02-28",
      projectManager: "Siti Rahayu",
      issues: 3,
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

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
      case "on-hold":
        return (
          <Badge className="bg-orange-500 hover:bg-orange-600">
            <AlertTriangle className="h-3 w-3 mr-1" /> On Hold
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <BarChart4 className="h-8 w-8 text-blue-500 mb-2" />
            <p className="text-sm text-muted-foreground">Active Projects</p>
            <p className="text-2xl font-bold">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Clock className="h-8 w-8 text-yellow-500 mb-2" />
            <p className="text-sm text-muted-foreground">On Schedule</p>
            <p className="text-2xl font-bold">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-orange-500 mb-2" />
            <p className="text-sm text-muted-foreground">At Risk</p>
            <p className="text-2xl font-bold">1</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
            <p className="text-sm text-muted-foreground">Budget Compliance</p>
            <p className="text-2xl font-bold">75%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Active Projects</h3>
            <Button size="sm">Project Dashboard</Button>
          </div>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project #</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Current Phase</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Spent</TableHead>
                  <TableHead>Project Manager</TableHead>
                  <TableHead>Issues</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeProjects.map((project) => (
                  <TableRow
                    key={project.id}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <TableCell className="font-mono">
                      {project.projectNumber}
                    </TableCell>
                    <TableCell className="font-medium">
                      {project.title}
                    </TableCell>
                    <TableCell>{getStatusBadge(project.status)}</TableCell>
                    <TableCell>{project.currentPhase}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">
                          {project.progress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(project.budget)}</TableCell>
                    <TableCell>{formatCurrency(project.spent)}</TableCell>
                    <TableCell>{project.projectManager}</TableCell>
                    <TableCell>
                      {project.issues > 0 ? (
                        <Badge className="bg-red-500">{project.issues}</Badge>
                      ) : (
                        <Badge className="bg-green-500">0</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectExecution;
