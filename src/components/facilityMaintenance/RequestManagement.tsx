import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
  Clock,
  CheckCircle,
  AlertTriangle,
  Wrench,
  Filter,
} from "lucide-react";
import { facilityMaintenanceService } from "@/services/facilityMaintenanceService";
import { MaintenanceRequest } from "@/models/facilityMaintenance";

const RequestManagement = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<
    MaintenanceRequest[]
  >([]);
  const [selectedRequest, setSelectedRequest] =
    useState<MaintenanceRequest | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await facilityMaintenanceService.getMaintenanceRequests();
        setRequests(data);
        setFilteredRequests(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching maintenance requests:", error);
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    let result = requests;

    // Apply tab filter
    if (activeTab !== "all") {
      switch (activeTab) {
        case "pending":
          result = result.filter((req) =>
            ["draft", "submitted", "approved"].includes(req.status),
          );
          break;
        case "in-progress":
          result = result.filter((req) =>
            ["assigned", "in-progress"].includes(req.status),
          );
          break;
        case "completed":
          result = result.filter((req) => req.status === "completed");
          break;
        case "cancelled":
          result = result.filter((req) =>
            ["cancelled", "on-hold"].includes(req.status),
          );
          break;
      }
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (req) =>
          req.title.toLowerCase().includes(query) ||
          req.description.toLowerCase().includes(query) ||
          req.requestNumber.toLowerCase().includes(query),
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      result = result.filter((req) => req.status === filterStatus);
    }

    // Apply priority filter
    if (filterPriority !== "all") {
      result = result.filter((req) => req.priority === filterPriority);
    }

    // Apply type filter
    if (filterType !== "all") {
      result = result.filter((req) => req.requestType === filterType);
    }

    setFilteredRequests(result);
  }, [
    requests,
    searchQuery,
    filterStatus,
    filterPriority,
    filterType,
    activeTab,
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge className="bg-gray-500">Draft</Badge>;
      case "submitted":
        return <Badge className="bg-blue-500">Submitted</Badge>;
      case "approved":
        return <Badge className="bg-purple-500">Approved</Badge>;
      case "assigned":
        return <Badge className="bg-indigo-500">Assigned</Badge>;
      case "in-progress":
        return (
          <Badge className="bg-yellow-500">
            <Clock className="h-3 w-3 mr-1" /> In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" /> Completed
          </Badge>
        );
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      case "on-hold":
        return <Badge className="bg-orange-500">On Hold</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return (
          <Badge className="bg-red-500">
            <AlertTriangle className="h-3 w-3 mr-1" /> Urgent
          </Badge>
        );
      case "high":
        return <Badge className="bg-orange-500">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const getRequestTypeBadge = (type: string) => {
    switch (type) {
      case "corrective":
        return (
          <Badge className="bg-red-500">
            <Wrench className="h-3 w-3 mr-1" /> Corrective
          </Badge>
        );
      case "preventive":
        return <Badge className="bg-blue-500">Preventive</Badge>;
      case "inspection":
        return <Badge className="bg-green-500">Inspection</Badge>;
      case "emergency":
        return (
          <Badge className="bg-purple-500">
            <AlertTriangle className="h-3 w-3 mr-1" /> Emergency
          </Badge>
        );
      default:
        return <Badge>{type}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Maintenance Requests
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled/On Hold</TabsTrigger>
        </TabsList>
      </Tabs>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-md">
          <div>
            <Label htmlFor="filterStatus">Status</Label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger id="filterStatus">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="filterPriority">Priority</Label>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger id="filterPriority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="filterType">Request Type</Label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger id="filterType">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="corrective">Corrective</SelectItem>
                <SelectItem value="preventive">Preventive</SelectItem>
                <SelectItem value="inspection">Inspection</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="search"
                type="text"
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request #</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Submission Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      Loading requests...
                    </TableCell>
                  </TableRow>
                ) : filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No maintenance requests found. Try adjusting your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((request) => (
                    <TableRow
                      key={request.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedRequest(request)}
                    >
                      <TableCell className="font-mono">
                        {request.requestNumber}
                      </TableCell>
                      <TableCell className="font-medium">
                        {request.title}
                      </TableCell>
                      <TableCell>
                        {getRequestTypeBadge(request.requestType)}
                      </TableCell>
                      <TableCell>
                        {getPriorityBadge(request.priority)}
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        Building {request.location.buildingId}, Floor{" "}
                        {request.location.floorId}
                      </TableCell>
                      <TableCell>
                        {formatDate(request.submissionDate)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {selectedRequest && (
        <Dialog
          open={!!selectedRequest}
          onOpenChange={(open) => !open && setSelectedRequest(null)}
        >
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Maintenance Request Details</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Request Details</TabsTrigger>
                <TabsTrigger value="approvals">Approvals</TabsTrigger>
                <TabsTrigger value="scheduling">
                  Scheduling & Progress
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label>Request Number</Label>
                    <p className="text-sm font-mono">
                      {selectedRequest.requestNumber}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label>Title</Label>
                    <p className="text-sm font-medium">
                      {selectedRequest.title}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label>Description</Label>
                    <p className="text-sm">{selectedRequest.description}</p>
                  </div>
                  <div>
                    <Label>Request Type</Label>
                    <p className="text-sm">
                      {getRequestTypeBadge(selectedRequest.requestType)}
                    </p>
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <p className="text-sm">
                      {getPriorityBadge(selectedRequest.priority)}
                    </p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <p className="text-sm">
                      {getStatusBadge(selectedRequest.status)}
                    </p>
                  </div>
                  <div>
                    <Label>Submission Date</Label>
                    <p className="text-sm">
                      {formatDate(selectedRequest.submissionDate)}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label>Location</Label>
                    <p className="text-sm">
                      Building {selectedRequest.location.buildingId}, Floor{" "}
                      {selectedRequest.location.floorId},{" "}
                      {selectedRequest.location.description}
                    </p>
                  </div>
                  {selectedRequest.assetId && (
                    <div className="col-span-2">
                      <Label>Related Asset</Label>
                      <p className="text-sm">
                        Asset ID: {selectedRequest.assetId} (Click to view asset
                        details)
                      </p>
                    </div>
                  )}
                  {selectedRequest.religiousConsiderations && (
                    <div className="col-span-2">
                      <Label>Religious Considerations</Label>
                      <p className="text-sm">
                        {selectedRequest.religiousConsiderations}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="approvals" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Manager Approval</Label>
                      <p className="text-sm">
                        {selectedRequest.approvalHierarchy.managerId ? (
                          <>
                            <Badge className="bg-green-500 mr-2">
                              Approved
                            </Badge>
                            {selectedRequest.approvalHierarchy
                              .managerApprovalDate &&
                              formatDate(
                                selectedRequest.approvalHierarchy
                                  .managerApprovalDate,
                              )}
                          </>
                        ) : (
                          <Badge className="bg-yellow-500">Pending</Badge>
                        )}
                      </p>
                    </div>
                    {selectedRequest.approvalHierarchy.directorId !==
                      undefined && (
                      <div>
                        <Label>Director Approval</Label>
                        <p className="text-sm">
                          {selectedRequest.approvalHierarchy.directorId ? (
                            <>
                              <Badge className="bg-green-500 mr-2">
                                Approved
                              </Badge>
                              {selectedRequest.approvalHierarchy
                                .directorApprovalDate &&
                                formatDate(
                                  selectedRequest.approvalHierarchy
                                    .directorApprovalDate,
                                )}
                            </>
                          ) : (
                            <Badge className="bg-yellow-500">Pending</Badge>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                  <Separator />
                  <div>
                    <Label>Assigned Department</Label>
                    <p className="text-sm">
                      {selectedRequest.assignedDepartmentId ||
                        "Not yet assigned"}
                    </p>
                  </div>
                  <div>
                    <Label>Assigned Technician</Label>
                    <p className="text-sm">
                      {selectedRequest.assignedTechnicianId ||
                        "Not yet assigned"}
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="scheduling" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  {selectedRequest.approvalDate && (
                    <div>
                      <Label>Approval Date</Label>
                      <p className="text-sm">
                        {formatDate(selectedRequest.approvalDate)}
                      </p>
                    </div>
                  )}
                  {selectedRequest.scheduledDate && (
                    <div>
                      <Label>Scheduled Date</Label>
                      <p className="text-sm">
                        {formatDate(selectedRequest.scheduledDate)}
                      </p>
                    </div>
                  )}
                  {selectedRequest.startDate && (
                    <div>
                      <Label>Start Date</Label>
                      <p className="text-sm">
                        {formatDate(selectedRequest.startDate)}
                      </p>
                    </div>
                  )}
                  {selectedRequest.completionDate && (
                    <div>
                      <Label>Completion Date</Label>
                      <p className="text-sm">
                        {formatDate(selectedRequest.completionDate)}
                      </p>
                    </div>
                  )}
                  {selectedRequest.estimatedCompletionTime && (
                    <div>
                      <Label>Estimated Completion Time</Label>
                      <p className="text-sm">
                        {selectedRequest.estimatedCompletionTime} hours
                      </p>
                    </div>
                  )}
                  {selectedRequest.actualCompletionTime && (
                    <div>
                      <Label>Actual Completion Time</Label>
                      <p className="text-sm">
                        {selectedRequest.actualCompletionTime} hours
                      </p>
                    </div>
                  )}
                </div>
                {selectedRequest.status === "completed" &&
                  selectedRequest.feedback && (
                    <div className="mt-4">
                      <Label>Feedback</Label>
                      <div className="bg-gray-50 p-3 rounded-md mt-1">
                        <div className="flex items-center mb-1">
                          <span className="text-sm font-medium mr-2">
                            Rating:
                          </span>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span
                                key={i}
                                className={`text-lg ${i < selectedRequest.feedback!.rating ? "text-yellow-500" : "text-gray-300"}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm">
                          {selectedRequest.feedback.comments}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Submitted:{" "}
                          {formatDate(selectedRequest.feedback.submissionDate)}
                        </p>
                      </div>
                    </div>
                  )}
              </TabsContent>
            </Tabs>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setSelectedRequest(null)}
              >
                Close
              </Button>
              <Button>Update Status</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default RequestManagement;
