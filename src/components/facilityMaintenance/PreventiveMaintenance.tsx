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
  Calendar,
  CheckCircle,
  Clock,
  Filter,
  AlertTriangle,
  Repeat,
  Tool,
  ClipboardCheck,
} from "lucide-react";
import { facilityMaintenanceService } from "@/services/facilityMaintenanceService";
import {
  MaintenanceSchedule,
  MaintenanceTask,
} from "@/models/facilityMaintenance";

const PreventiveMaintenance = () => {
  const [schedules, setSchedules] = useState<MaintenanceSchedule[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<
    MaintenanceSchedule[]
  >([]);
  const [selectedSchedule, setSelectedSchedule] =
    useState<MaintenanceSchedule | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await facilityMaintenanceService.getMaintenanceSchedules();
        setSchedules(data);
        setFilteredSchedules(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching maintenance schedules:", error);
        setIsLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  useEffect(() => {
    let result = schedules;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (schedule) =>
          schedule.name.toLowerCase().includes(query) ||
          schedule.description.toLowerCase().includes(query),
      );
    }

    // Apply type filter
    if (filterType !== "all") {
      result = result.filter(
        (schedule) => schedule.scheduleType === filterType,
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      result = result.filter((schedule) => schedule.status === filterStatus);
    }

    setFilteredSchedules(result);
  }, [schedules, searchQuery, filterType, filterStatus]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" /> Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-gray-500 hover:bg-gray-600">
            <Clock className="h-3 w-3 mr-1" /> Inactive
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <CheckCircle className="h-3 w-3 mr-1" /> Completed
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getFrequencyText = (frequency: any) => {
    switch (frequency.type) {
      case "daily":
        return "Daily";
      case "weekly":
        return frequency.daysOfWeek
          ? `Weekly (${frequency.daysOfWeek
              .map(
                (day: number) =>
                  [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ][day],
              )
              .join(", ")})`
          : "Weekly";
      case "monthly":
        return frequency.daysOfMonth
          ? `Monthly (Day ${frequency.daysOfMonth.join(", ")})`
          : "Monthly";
      case "quarterly":
        return "Quarterly";
      case "biannually":
        return "Biannually";
      case "annually":
        return "Annually";
      case "custom":
        return frequency.customDays
          ? `Every ${frequency.customDays} days`
          : "Custom";
      default:
        return "Unknown";
    }
  };

  const formatDate = (dateString: string | undefined) => {
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
          Preventive Maintenance
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
            Create Schedule
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-md">
          <div>
            <Label htmlFor="filterType">Schedule Type</Label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger id="filterType">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="preventive">Preventive</SelectItem>
                <SelectItem value="inspection">Inspection</SelectItem>
                <SelectItem value="regulatory">Regulatory</SelectItem>
                <SelectItem value="calibration">Calibration</SelectItem>
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
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
                placeholder="Search schedules..."
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
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Assets</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Execution</TableHead>
                  <TableHead>Next Execution</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      Loading maintenance schedules...
                    </TableCell>
                  </TableRow>
                ) : filteredSchedules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No maintenance schedules found. Try adjusting your
                      filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSchedules.map((schedule) => (
                    <TableRow
                      key={schedule.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedSchedule(schedule)}
                    >
                      <TableCell className="font-medium">
                        {schedule.name}
                      </TableCell>
                      <TableCell className="capitalize">
                        {schedule.scheduleType}
                      </TableCell>
                      <TableCell>
                        {getFrequencyText(schedule.frequency)}
                      </TableCell>
                      <TableCell>{schedule.assets.length} assets</TableCell>
                      <TableCell>{getStatusBadge(schedule.status)}</TableCell>
                      <TableCell>
                        {formatDate(schedule.lastExecutionDate)}
                      </TableCell>
                      <TableCell>
                        {formatDate(schedule.nextExecutionDate)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {selectedSchedule && (
        <Dialog
          open={!!selectedSchedule}
          onOpenChange={(open) => !open && setSelectedSchedule(null)}
        >
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Maintenance Schedule Details</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <p className="text-sm font-medium">
                      {selectedSchedule.name}
                    </p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <p className="text-sm">
                      {getStatusBadge(selectedSchedule.status)}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label>Description</Label>
                    <p className="text-sm">{selectedSchedule.description}</p>
                  </div>
                  <div>
                    <Label>Schedule Type</Label>
                    <p className="text-sm capitalize">
                      {selectedSchedule.scheduleType}
                    </p>
                  </div>
                  <div>
                    <Label>Frequency</Label>
                    <p className="text-sm">
                      {getFrequencyText(selectedSchedule.frequency)}
                    </p>
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <p className="text-sm">
                      {formatDate(selectedSchedule.startDate)}
                    </p>
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <p className="text-sm">
                      {formatDate(selectedSchedule.endDate)}
                    </p>
                  </div>
                  <div>
                    <Label>Last Execution</Label>
                    <p className="text-sm">
                      {formatDate(selectedSchedule.lastExecutionDate)}
                    </p>
                  </div>
                  <div>
                    <Label>Next Execution</Label>
                    <p className="text-sm">
                      {formatDate(selectedSchedule.nextExecutionDate)}
                    </p>
                  </div>
                  <div>
                    <Label>Estimated Duration</Label>
                    <p className="text-sm">
                      {selectedSchedule.estimatedDuration} hours
                    </p>
                  </div>
                  <div>
                    <Label>Assigned Department</Label>
                    <p className="text-sm">
                      {selectedSchedule.assignedDepartmentId}
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tasks" className="space-y-4 pt-4">
                {selectedSchedule.tasks.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No tasks defined for this maintenance schedule.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {selectedSchedule.tasks.map((task) => (
                      <Card key={task.id}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            {task.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                              <Label>Description</Label>
                              <p className="text-sm">{task.description}</p>
                            </div>
                            <div>
                              <Label>Estimated Time</Label>
                              <p className="text-sm">
                                {task.estimatedTime} minutes
                              </p>
                            </div>
                            <div>
                              <Label>Required Skills</Label>
                              <p className="text-sm">
                                {task.requiredSkills.join(", ")}
                              </p>
                            </div>
                            {task.requiredTools.length > 0 && (
                              <div>
                                <Label>Required Tools</Label>
                                <p className="text-sm">
                                  {task.requiredTools.join(", ")}
                                </p>
                              </div>
                            )}
                            {task.requiredParts.length > 0 && (
                              <div>
                                <Label>Required Parts</Label>
                                <p className="text-sm">
                                  {task.requiredParts
                                    .map(
                                      (part) =>
                                        `${part.partId} (${part.quantity})`,
                                    )
                                    .join(", ")}
                                </p>
                              </div>
                            )}
                            <div className="col-span-2">
                              <Label>Instructions</Label>
                              <p className="text-sm whitespace-pre-line">
                                {task.instructions}
                              </p>
                            </div>
                            <div className="col-span-2">
                              <Label>Safety Procedures</Label>
                              <p className="text-sm whitespace-pre-line">
                                {task.safetyProcedures}
                              </p>
                            </div>
                            {task.checklistItems.length > 0 && (
                              <div className="col-span-2">
                                <Label>Checklist Items</Label>
                                <ul className="text-sm list-disc pl-5 mt-1 space-y-1">
                                  {task.checklistItems.map((item) => (
                                    <li key={item.id}>
                                      {item.description}
                                      {item.required && (
                                        <span className="text-red-500 ml-1">
                                          *
                                        </span>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="compliance" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Government Mandated</Label>
                    <p className="text-sm">
                      {selectedSchedule.governmentMandated ? "Yes" : "No"}
                    </p>
                  </div>
                  {selectedSchedule.regulationReference && (
                    <div className="col-span-2">
                      <Label>Regulation Reference</Label>
                      <p className="text-sm">
                        {selectedSchedule.regulationReference}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setSelectedSchedule(null)}
              >
                Close
              </Button>
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Now
              </Button>
              <Button variant="outline">
                <ClipboardCheck className="h-4 w-4 mr-2" />
                Mark Complete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PreventiveMaintenance;
