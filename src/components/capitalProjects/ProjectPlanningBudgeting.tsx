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
import { DollarSign, FileText, Calendar, Users } from "lucide-react";

const ProjectPlanningBudgeting = () => {
  // Mock data for planning projects
  const planningProjects = [
    {
      id: "PP001",
      title: "Jakarta Office Expansion",
      status: "in-review",
      budgetEstimate: 4500000000,
      approvalStage: "financial-review",
      startDate: "2024-07-15",
      submissionDate: "2024-03-10",
      stakeholders: ["Operations", "Finance", "IT"],
    },
    {
      id: "PP002",
      title: "Surabaya Warehouse Renovation",
      status: "approved",
      budgetEstimate: 2800000000,
      approvalStage: "approved",
      startDate: "2024-06-01",
      submissionDate: "2024-02-15",
      stakeholders: ["Logistics", "Operations", "Finance"],
    },
    {
      id: "PP003",
      title: "Bali Office Sustainability Upgrade",
      status: "draft",
      budgetEstimate: 1200000000,
      approvalStage: "initial-draft",
      startDate: "2024-09-01",
      submissionDate: "2024-03-25",
      stakeholders: ["Sustainability", "Operations"],
    },
    {
      id: "PP004",
      title: "Bandung Data Center Expansion",
      status: "rejected",
      budgetEstimate: 7500000000,
      approvalStage: "rejected",
      startDate: "2024-08-15",
      submissionDate: "2024-01-20",
      stakeholders: ["IT", "Finance", "Operations"],
    },
    {
      id: "PP005",
      title: "Makassar Office Establishment",
      status: "in-review",
      budgetEstimate: 5200000000,
      approvalStage: "management-review",
      startDate: "2024-10-01",
      submissionDate: "2024-03-05",
      stakeholders: ["HR", "Operations", "Finance", "IT"],
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
      case "draft":
        return <Badge className="bg-gray-500">Draft</Badge>;
      case "in-review":
        return <Badge className="bg-blue-500">In Review</Badge>;
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getApprovalStageBadge = (stage: string) => {
    switch (stage) {
      case "initial-draft":
        return <Badge variant="outline">Initial Draft</Badge>;
      case "management-review":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Management Review
          </Badge>
        );
      case "financial-review":
        return (
          <Badge
            variant="outline"
            className="border-purple-500 text-purple-500"
          >
            Financial Review
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{stage}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <DollarSign className="h-8 w-8 text-blue-500 mb-2" />
            <p className="text-sm text-muted-foreground">
              Total Budget Allocation
            </p>
            <p className="text-2xl font-bold">{formatCurrency(21200000000)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <FileText className="h-8 w-8 text-green-500 mb-2" />
            <p className="text-sm text-muted-foreground">Approved Projects</p>
            <p className="text-2xl font-bold">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Calendar className="h-8 w-8 text-yellow-500 mb-2" />
            <p className="text-sm text-muted-foreground">Pending Review</p>
            <p className="text-2xl font-bold">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Users className="h-8 w-8 text-purple-500 mb-2" />
            <p className="text-sm text-muted-foreground">
              Stakeholder Departments
            </p>
            <p className="text-2xl font-bold">6</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Project Proposals</h3>
            <Button size="sm">New Project Proposal</Button>
          </div>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Project Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Budget Estimate</TableHead>
                  <TableHead>Approval Stage</TableHead>
                  <TableHead>Planned Start</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Stakeholders</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {planningProjects.map((project) => (
                  <TableRow
                    key={project.id}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <TableCell className="font-mono">{project.id}</TableCell>
                    <TableCell className="font-medium">
                      {project.title}
                    </TableCell>
                    <TableCell>{getStatusBadge(project.status)}</TableCell>
                    <TableCell>
                      {formatCurrency(project.budgetEstimate)}
                    </TableCell>
                    <TableCell>
                      {getApprovalStageBadge(project.approvalStage)}
                    </TableCell>
                    <TableCell>
                      {new Date(project.startDate).toLocaleDateString("id-ID")}
                    </TableCell>
                    <TableCell>
                      {new Date(project.submissionDate).toLocaleDateString(
                        "id-ID",
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.stakeholders.map((stakeholder, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-gray-100 text-xs"
                          >
                            {stakeholder}
                          </Badge>
                        ))}
                      </div>
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

export default ProjectPlanningBudgeting;
