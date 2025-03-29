import React, { useState, useEffect } from "react";
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
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Calendar,
  User,
  Building,
  Tool,
} from "lucide-react";
import { facilityMaintenanceService } from "@/services/facilityMaintenanceService";
import { MaintenanceRequest } from "@/models/facilityMaintenance";

const WorkOrderManagement = () => {
  const [workOrders, setWorkOrders] = useState<MaintenanceRequest[]>([]);
  const [filteredWorkOrders, setFilteredWorkOrders] = useState<
    MaintenanceRequest[]
  >([]);
  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState<MaintenanceRequest | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const data = await facilityMaintenanceService.getMaintenanceRequests();
        setWorkOrders(data);
        setFilteredWorkOrders(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching work orders:", error);
        setIsLoading(false);
      }
    };

    fetchWorkOrders();
  }, []);

  useEffect(() => {
    let result = workOrders;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (order) =>
          order.title.toLowerCase().includes(query) ||
          order.description.toLowerCase().includes(query) ||
          order.requestNumber.toLowerCase().includes(query),
      );
    }

    // Apply type filter
    if (filterType !== "all") {
      result = result.filter((order) => order.requestType === filterType);
    }

    // Apply status filter
    if (filterStatus !== "all") {
      result = result.filter((order) => order.status === filterStatus);
    }

    // Apply priority filter
    if (filterPriority !== "all") {
      result = result.filter((order) => order.priority === filterPriority);
    }

    setFilteredWorkOrders(result);
  }, [workOrders, searchQuery, filterType, filterStatus, filterPriority]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return (
          <Badge className="bg-gray-500 hover:bg-gray-600">
            <FileText className="h-3 w-3 mr-1" /> Draft
          </Badge>
        );
      case "submitted":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <Clock className="h-3 w-3 mr-1" /> Submitted
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" /> Approved
          </Badge>
        );
      case "assigned":
        return (
          <Badge className="bg-purple-500 hover:bg-purple-600">
            <User className="h-3 w-3 mr-1" /> Assigned
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <Wrench className="h-3 w-3 mr-1" /> In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-700 hover:bg-green-800">
            <CheckCircle className="h-3 w-3 mr-1" /> Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <AlertTriangle className="h-3 w-3 mr-1" /> Cancelled
          </Badge>
        );
      case "on-hold":
        return (
          <Badge className="bg-orange-500 hover:bg-orange-600">
            <Clock className="h-3 w-3 mr-1" /> On Hold
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-500 hover:bg-red-600">Urgent</Badge>;
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

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Work Order Management
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
            Create Work Order
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-md">
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
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="search"
                type="text"
                placeholder="Search work orders..."
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
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Scheduled</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      Loading work orders...
                    </TableCell>
                  </TableRow>
                ) : filteredWorkOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      No work orders found. Try adjusting your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredWorkOrders.map((order) => (
                    <TableRow
                      key={order.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedWorkOrder(order)}
                    >
                      <TableCell className="font-mono text-sm">
                        {order.requestNumber}
                      </TableCell>
                      <TableCell className="font-medium">
                        {order.title}
                      </TableCell>
                      <TableCell className="capitalize">
                        {order.requestType}
                      </TableCell>
                      <TableCell>
                        Building {order.location.buildingId}, Floor{" "}
                        {order.location.floorId}
                      </TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                      <TableCell>{formatDate(order.submissionDate)}</TableCell>
                      <TableCell>
                        {order.scheduledDate
                          ? formatDate(order.scheduledDate)
                          : "Not scheduled"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {selectedWorkOrder && (
        <Dialog
          open={!!selectedWorkOrder}
          onOpenChange={(open) => !open && setSelectedWorkOrder(null)}
        >
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Work Order Details</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="approvals">Approvals</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Request Number</Label>
                    <p className="text-sm font-mono">
                      {selectedWorkOrder.requestNumber}
                    </p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <p className="text-sm">
                      {getStatusBadge(selectedWorkOrder.status)}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label>Title</Label>
                    <p className="text-sm font-medium">
                      {selectedWorkOrder.title}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label>Description</Label>
                    <p className="text-sm">{selectedWorkOrder.description}</p>
                  </div>
                  <div>
                    <Label>Request Type</Label>
                    <p className="text-sm capitalize">
                      {selectedWorkOrder.requestType}
                    </p>
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <p className="text-sm">
                      {getPriorityBadge(selectedWorkOrder.priority)}
                    </p>
                  </div>
                  <div>
                    <Label>Submission Date</Label>
                    <p className="text-sm">
                      {formatDate(selectedWorkOrder.submissionDate)}
                    </p>
                  </div>
                  <div>
                    <Label>Scheduled Date</Label>
                    <p className="text-sm">
                      {selectedWorkOrder.scheduledDate
                        ? formatDate(selectedWorkOrder.scheduledDate)
                        : "Not scheduled"}
                    </p>
                  </div>
                  {selectedWorkOrder.estimatedCompletionTime && (
                    <div>
                      <Label>Estimated Completion Time</Label>
                      <p className="text-sm">
                        {selectedWorkOrder.estimatedCompletionTime} hours
                      </p>
                    </div>
                  )}
                  {selectedWorkOrder.actualCompletionTime && (
                    <div>
                      <Label>Actual Completion Time</Label>
                      <p className="text-sm">
                        {selectedWorkOrder.actualCompletionTime} hours
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="location" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Building</Label>
                    <p className="text-sm">
                      Building {selectedWorkOrder.location.buildingId}
                    </p>
                  </div>
                  <div>
                    <Label>Floor</Label>
                    <p className="text-sm">
                      Floor {selectedWorkOrder.location.floorId}
                    </p>
                  </div>
                  <div>
                    <Label>Space</Label>
                    <p className="text-sm">
                      {selectedWorkOrder.location.spaceId}
                    </p>
                  </div>
                  <div>
                    <Label>Location Description</Label>
                    <p className="text-sm">
                      {selectedWorkOrder.location.description}
                    </p>
                  </div>
                  {selectedWorkOrder.assetId && (
                    <div className="col-span-2">
                      <Label>Related Asset</Label>
                      <p className="text-sm">
                        Asset ID: {selectedWorkOrder.assetId}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="assignments" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Requester ID</Label>
                    <p className="text-sm">{selectedWorkOrder.requesterId}</p>
                  </div>
                  {selectedWorkOrder.assignedDepartmentId && (
                    <div>
                      <Label>Assigned Department</Label>
                      <p className="text-sm">
                        {selectedWorkOrder.assignedDepartmentId}
                      </p>
                    </div>
                  )}
                  {selectedWorkOrder.assignedTechnicianId && (
                    <div>
                      <Label>Assigned Technician</Label>
                      <p className="text-sm">
                        {selectedWorkOrder.assignedTechnicianId}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="approvals" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  {selectedWorkOrder.approvalHierarchy.managerId && (
                    <div>
                      <Label>Manager Approval</Label>
                      <p className="text-sm">
                        Manager: {selectedWorkOrder.approvalHierarchy.managerId}
                        <br />
                        {selectedWorkOrder.approvalHierarchy.managerApprovalDate
                          ? `Approved on: ${formatDate(
                              selectedWorkOrder.approvalHierarchy
                                .managerApprovalDate,
                            )}`
                          : "Pending approval"}
                      </p>
                    </div>
                  )}
                  {selectedWorkOrder.approvalHierarchy.directorId && (
                    <div>
                      <Label>Director Approval</Label>
                      <p className="text-sm">
                        Director:{" "}
                        {selectedWorkOrder.approvalHierarchy.directorId}
                        <br />
                        {selectedWorkOrder.approvalHierarchy
                          .directorApprovalDate
                          ? `Approved on: ${formatDate(
                              selectedWorkOrder.approvalHierarchy
                                .directorApprovalDate,
                            )}`
                          : "Pending approval"}
                      </p>
                    </div>
                  )}
                  {selectedWorkOrder.religiousConsiderations && (
                    <div className="col-span-2">
                      <Label>Religious Considerations</Label>
                      <p className="text-sm">
                        {selectedWorkOrder.religiousConsiderations}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setSelectedWorkOrder(null)}
              >
                Close
              </Button>
              <Button>Update Status</Button>
              <Button variant="outline">
                <Wrench className="h-4 w-4 mr-2" />
                Assign
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default WorkOrderManagement;
