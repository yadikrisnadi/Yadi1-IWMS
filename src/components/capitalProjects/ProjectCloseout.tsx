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
import { CheckCircle, FileText, DollarSign, Calendar } from "lucide-react";

const ProjectCloseout = () => {
  // Mock data for completed projects
  const completedProjects = [
    {
      id: "CP003",
      projectNumber: "CP-2023-003",
      title: "Bali Green Office Initiative",
      completionDate: "2023-09-15",
      budget: 1800000000,
      actualCost: 1750000000,
      variance: -50000000,
      projectManager: "Putu Wijaya",
      closeoutStatus: "completed",
      documentationStatus: "complete",
      lessonsLearned: true,
    },
    {
      id: "CP006",
      projectNumber: "CP-2022-006",
      title: "Jakarta Office Lobby Renovation",
      completionDate: "2023-05-20",
      budget: 1200000000,
      actualCost: 1350000000,
      variance: 150000000,
      projectManager: "Rina Wati",
      closeoutStatus: "completed",
      documentationStatus: "complete",
      lessonsLearned: true,
    },
    {
      id: "CP007",
      projectNumber: "CP-2022-007",
      title: "Surabaya Warehouse Security Upgrade",
      completionDate: "2023-07-10",
      budget: 800000000,
      actualCost: 780000000,
      variance: -20000000,
      projectManager: "Hadi Santoso",
      closeoutStatus: "completed",
      documentationStatus: "pending",
      lessonsLearned: false,
    },
    {
      id: "CP008",
      projectNumber: "CP-2022-008",
      title: "Bandung Office HVAC Replacement",
      completionDate: "2023-04-05",
      budget: 950000000,
      actualCost: 920000000,
      variance: -30000000,
      projectManager: "Dian Permata",
      closeoutStatus: "financial-review",
      documentationStatus: "complete",
      lessonsLearned: true,
    },
    {
      id: "CP009",
      projectNumber: "CP-2022-009",
      title: "Makassar Office Network Infrastructure",
      completionDate: "2023-08-22",
      budget: 650000000,
      actualCost: 675000000,
      variance: 25000000,
      projectManager: "Agus Wijaya",
      closeoutStatus: "completed",
      documentationStatus: "complete",
      lessonsLearned: true,
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getVarianceBadge = (variance: number) => {
    if (variance === 0) {
      return <Badge className="bg-blue-500">On Budget</Badge>;
    } else if (variance < 0) {
      return <Badge className="bg-green-500">Under Budget</Badge>;
    } else {
      return <Badge className="bg-red-500">Over Budget</Badge>;
    }
  };

  const getCloseoutStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "financial-review":
        return <Badge className="bg-yellow-500">Financial Review</Badge>;
      case "pending":
        return <Badge className="bg-blue-500">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getDocumentationStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Complete
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="border-yellow-500 text-yellow-500"
          >
            Pending
          </Badge>
        );
      case "incomplete":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Incomplete
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
            <p className="text-sm text-muted-foreground">Completed Projects</p>
            <p className="text-2xl font-bold">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <DollarSign className="h-8 w-8 text-blue-500 mb-2" />
            <p className="text-sm text-muted-foreground">Budget Performance</p>
            <p className="text-2xl font-bold">98.7%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <FileText className="h-8 w-8 text-yellow-500 mb-2" />
            <p className="text-sm text-muted-foreground">
              Documentation Complete
            </p>
            <p className="text-2xl font-bold">80%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Calendar className="h-8 w-8 text-purple-500 mb-2" />
            <p className="text-sm text-muted-foreground">
              Avg. Completion Time
            </p>
            <p className="text-2xl font-bold">8.5 mo</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Completed Projects</h3>
            <Button size="sm">Generate Reports</Button>
          </div>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project #</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Completion Date</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Actual Cost</TableHead>
                  <TableHead>Variance</TableHead>
                  <TableHead>Project Manager</TableHead>
                  <TableHead>Closeout Status</TableHead>
                  <TableHead>Documentation</TableHead>
                  <TableHead>Lessons Learned</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedProjects.map((project) => (
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
                    <TableCell>
                      {new Date(project.completionDate).toLocaleDateString(
                        "id-ID",
                      )}
                    </TableCell>
                    <TableCell>{formatCurrency(project.budget)}</TableCell>
                    <TableCell>{formatCurrency(project.actualCost)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getVarianceBadge(project.variance)}
                        <span className="text-xs">
                          {project.variance > 0 ? "+" : ""}
                          {formatCurrency(project.variance)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{project.projectManager}</TableCell>
                    <TableCell>
                      {getCloseoutStatusBadge(project.closeoutStatus)}
                    </TableCell>
                    <TableCell>
                      {getDocumentationStatusBadge(project.documentationStatus)}
                    </TableCell>
                    <TableCell>
                      {project.lessonsLearned ? (
                        <Badge className="bg-green-500">Completed</Badge>
                      ) : (
                        <Badge className="bg-yellow-500">Pending</Badge>
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

export default ProjectCloseout;
