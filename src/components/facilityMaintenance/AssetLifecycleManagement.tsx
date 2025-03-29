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
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Plus,
  FileText,
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  BarChart3,
  Calendar,
  Trash2,
  RefreshCw,
  DollarSign,
} from "lucide-react";
import { facilityMaintenanceService } from "@/services/facilityMaintenanceService";
import { MaintenanceAsset } from "@/models/facilityMaintenance";

const AssetLifecycleManagement = () => {
  const [assets, setAssets] = useState<MaintenanceAsset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<MaintenanceAsset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<MaintenanceAsset | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [lifecycleView, setLifecycleView] = useState<"list" | "timeline">(
    "list",
  );

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const data = await facilityMaintenanceService.getAssets();
        setAssets(data);
        setFilteredAssets(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching assets:", error);
        setIsLoading(false);
      }
    };

    fetchAssets();
  }, []);

  useEffect(() => {
    let result = assets;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (asset) =>
          asset.name.toLowerCase().includes(query) ||
          asset.description.toLowerCase().includes(query) ||
          asset.serialNumber.toLowerCase().includes(query),
      );
    }

    // Apply type filter
    if (filterType !== "all") {
      result = result.filter((asset) => asset.assetType === filterType);
    }

    // Apply status filter
    if (filterStatus !== "all") {
      result = result.filter((asset) => asset.status === filterStatus);
    }

    setFilteredAssets(result);
  }, [assets, searchQuery, filterType, filterStatus]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" /> Operational
          </Badge>
        );
      case "under-maintenance":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <Wrench className="h-3 w-3 mr-1" /> Under Maintenance
          </Badge>
        );
      case "faulty":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <AlertTriangle className="h-3 w-3 mr-1" /> Faulty
          </Badge>
        );
      case "decommissioned":
        return (
          <Badge className="bg-gray-500 hover:bg-gray-600">
            <Clock className="h-3 w-3 mr-1" /> Decommissioned
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getCriticalityBadge = (criticality: string) => {
    switch (criticality) {
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
        return <Badge>{criticality}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateLifecycleStage = (asset: MaintenanceAsset) => {
    const installDate = new Date(asset.installationDate).getTime();
    const now = new Date().getTime();
    const expectedLifespan = asset.expectedLifespan * 365 * 24 * 60 * 60 * 1000; // Convert years to milliseconds
    const elapsedTime = now - installDate;
    const percentageUsed = (elapsedTime / expectedLifespan) * 100;

    if (asset.status === "decommissioned") return "End of Life";
    if (percentageUsed < 25) return "Early Life";
    if (percentageUsed < 50) return "Mid Life";
    if (percentageUsed < 75) return "Mature";
    if (percentageUsed < 90) return "Late Life";
    return "End of Life Approaching";
  };

  const calculateDepreciation = (asset: MaintenanceAsset) => {
    const installDate = new Date(asset.installationDate).getTime();
    const now = new Date().getTime();
    const expectedLifespan = asset.expectedLifespan * 365 * 24 * 60 * 60 * 1000; // Convert years to milliseconds
    const elapsedTime = now - installDate;
    const percentageUsed = (elapsedTime / expectedLifespan) * 100;

    // Simple straight-line depreciation
    const depreciationAmount =
      asset.purchaseCost -
      (asset.purchaseCost * Math.min(percentageUsed, 100)) / 100;
    return depreciationAmount;
  };

  const calculateLifecyclePercentage = (asset: MaintenanceAsset) => {
    const installDate = new Date(asset.installationDate).getTime();
    const now = new Date().getTime();
    const expectedLifespan = asset.expectedLifespan * 365 * 24 * 60 * 60 * 1000; // Convert years to milliseconds
    const elapsedTime = now - installDate;
    const percentageUsed = (elapsedTime / expectedLifespan) * 100;
    return Math.min(Math.round(percentageUsed), 100);
  };

  const getLifecycleProgressColor = (percentage: number) => {
    if (percentage < 50) return "bg-green-500";
    if (percentage < 75) return "bg-yellow-500";
    if (percentage < 90) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Asset Lifecycle Management
        </h2>
        <div className="flex gap-2">
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={lifecycleView === "list" ? "default" : "outline"}
              className="rounded-none"
              onClick={() => setLifecycleView("list")}
            >
              List View
            </Button>
            <Button
              variant={lifecycleView === "timeline" ? "default" : "outline"}
              className="rounded-none"
              onClick={() => setLifecycleView("timeline")}
            >
              Timeline View
            </Button>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Asset
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-md">
          <div>
            <Label htmlFor="filterType">Asset Type</Label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger id="filterType">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
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
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="under-maintenance">
                  Under Maintenance
                </SelectItem>
                <SelectItem value="faulty">Faulty</SelectItem>
                <SelectItem value="decommissioned">Decommissioned</SelectItem>
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
                placeholder="Search assets..."
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
            {lifecycleView === "list" ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Installation Date</TableHead>
                    <TableHead>Lifecycle Stage</TableHead>
                    <TableHead>Lifecycle Progress</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        Loading assets...
                      </TableCell>
                    </TableRow>
                  ) : filteredAssets.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        No assets found. Try adjusting your filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAssets.map((asset) => {
                      const lifecyclePercentage =
                        calculateLifecyclePercentage(asset);
                      return (
                        <TableRow
                          key={asset.id}
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => setSelectedAsset(asset)}
                        >
                          <TableCell className="font-medium">
                            {asset.name}
                          </TableCell>
                          <TableCell className="capitalize">
                            {asset.assetType}
                          </TableCell>
                          <TableCell>{getStatusBadge(asset.status)}</TableCell>
                          <TableCell>
                            {new Date(
                              asset.installationDate,
                            ).toLocaleDateString("id-ID")}
                          </TableCell>
                          <TableCell>
                            {calculateLifecycleStage(asset)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={lifecyclePercentage}
                                className={`h-2 ${getLifecycleProgressColor(
                                  lifecyclePercentage,
                                )}`}
                              />
                              <span className="text-xs">
                                {lifecyclePercentage}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {formatCurrency(calculateDepreciation(asset))}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Handle refresh action
                                }}
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Handle decommission action
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            ) : (
              <div className="p-4">
                {isLoading ? (
                  <div className="text-center py-4">Loading assets...</div>
                ) : filteredAssets.length === 0 ? (
                  <div className="text-center py-4">
                    No assets found. Try adjusting your filters.
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredAssets.map((asset) => {
                      const lifecyclePercentage =
                        calculateLifecyclePercentage(asset);
                      return (
                        <Card
                          key={asset.id}
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => setSelectedAsset(asset)}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium text-lg">
                                  {asset.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {asset.description}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                {getStatusBadge(asset.status)}
                                {getCriticalityBadge(asset.criticality)}
                              </div>
                            </div>

                            <div className="mt-4">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">
                                  Lifecycle Progress
                                </span>
                                <span className="text-sm">
                                  {lifecyclePercentage}%
                                </span>
                              </div>
                              <Progress
                                value={lifecyclePercentage}
                                className={`h-2 ${getLifecycleProgressColor(
                                  lifecyclePercentage,
                                )}`}
                              />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                              <div>
                                <Label className="text-xs">Installation</Label>
                                <p className="text-sm">
                                  {new Date(
                                    asset.installationDate,
                                  ).toLocaleDateString("id-ID")}
                                </p>
                              </div>
                              <div>
                                <Label className="text-xs">
                                  Warranty Until
                                </Label>
                                <p className="text-sm">
                                  {new Date(
                                    asset.warrantyExpiryDate,
                                  ).toLocaleDateString("id-ID")}
                                </p>
                              </div>
                              <div>
                                <Label className="text-xs">Current Value</Label>
                                <p className="text-sm">
                                  {formatCurrency(calculateDepreciation(asset))}
                                </p>
                              </div>
                              <div>
                                <Label className="text-xs">
                                  Lifecycle Stage
                                </Label>
                                <p className="text-sm">
                                  {calculateLifecycleStage(asset)}
                                </p>
                              </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Handle refresh action
                                }}
                              >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Update
                              </Button>
                              {asset.status !== "decommissioned" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle decommission action
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Decommission
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {selectedAsset && (
        <Dialog
          open={!!selectedAsset}
          onOpenChange={(open) => !open && setSelectedAsset(null)}
        >
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Asset Lifecycle Details</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="lifecycle">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="lifecycle">Lifecycle</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              <TabsContent value="lifecycle" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <p className="text-sm font-medium">{selectedAsset.name}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <p className="text-sm">
                      {getStatusBadge(selectedAsset.status)}
                    </p>
                  </div>
                  <div>
                    <Label>Installation Date</Label>
                    <p className="text-sm">
                      {new Date(
                        selectedAsset.installationDate,
                      ).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <div>
                    <Label>Expected Lifespan</Label>
                    <p className="text-sm">
                      {selectedAsset.expectedLifespan} years
                    </p>
                  </div>
                  <div>
                    <Label>Lifecycle Stage</Label>
                    <p className="text-sm">
                      {calculateLifecycleStage(selectedAsset)}
                    </p>
                  </div>
                  <div>
                    <Label>Lifecycle Progress</Label>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={calculateLifecyclePercentage(selectedAsset)}
                        className={`h-2 ${getLifecycleProgressColor(
                          calculateLifecyclePercentage(selectedAsset),
                        )}`}
                      />
                      <span className="text-xs">
                        {calculateLifecyclePercentage(selectedAsset)}%
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Label>Lifecycle Timeline</Label>
                    <div className="mt-2 relative pt-5 pb-2">
                      <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200"></div>
                      <div
                        className={`absolute top-5 left-0 h-1 ${getLifecycleProgressColor(
                          calculateLifecyclePercentage(selectedAsset),
                        )}`}
                        style={{
                          width: `${calculateLifecyclePercentage(
                            selectedAsset,
                          )}%`,
                        }}
                      ></div>
                      <div className="flex justify-between relative">
                        <div className="text-center">
                          <div className="w-3 h-3 rounded-full bg-blue-500 mx-auto mb-1"></div>
                          <p className="text-xs">
                            {new Date(
                              selectedAsset.installationDate,
                            ).toLocaleDateString("id-ID")}
                          </p>
                          <p className="text-xs font-medium">Installation</p>
                        </div>
                        <div className="text-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mx-auto mb-1"></div>
                          <p className="text-xs">
                            {new Date(
                              selectedAsset.warrantyExpiryDate,
                            ).toLocaleDateString("id-ID")}
                          </p>
                          <p className="text-xs font-medium">Warranty End</p>
                        </div>
                        <div className="text-center">
                          <div className="w-3 h-3 rounded-full bg-yellow-500 mx-auto mb-1"></div>
                          <p className="text-xs">
                            {new Date(
                              new Date(
                                selectedAsset.installationDate,
                              ).setFullYear(
                                new Date(
                                  selectedAsset.installationDate,
                                ).getFullYear() +
                                  Math.floor(
                                    selectedAsset.expectedLifespan / 2,
                                  ),
                              ),
                            ).toLocaleDateString("id-ID")}
                          </p>
                          <p className="text-xs font-medium">Mid Life</p>
                        </div>
                        <div className="text-center">
                          <div className="w-3 h-3 rounded-full bg-red-500 mx-auto mb-1"></div>
                          <p className="text-xs">
                            {new Date(
                              new Date(
                                selectedAsset.installationDate,
                              ).setFullYear(
                                new Date(
                                  selectedAsset.installationDate,
                                ).getFullYear() +
                                  selectedAsset.expectedLifespan,
                              ),
                            ).toLocaleDateString("id-ID")}
                          </p>
                          <p className="text-xs font-medium">End of Life</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="financial" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Purchase Cost</Label>
                    <p className="text-sm">
                      {formatCurrency(selectedAsset.purchaseCost)}
                    </p>
                  </div>
                  <div>
                    <Label>Current Value</Label>
                    <p className="text-sm">
                      {formatCurrency(calculateDepreciation(selectedAsset))}
                    </p>
                  </div>
                  <div>
                    <Label>Depreciation</Label>
                    <p className="text-sm">
                      {formatCurrency(
                        selectedAsset.purchaseCost -
                          calculateDepreciation(selectedAsset),
                      )}
                    </p>
                  </div>
                  <div>
                    <Label>Depreciation Rate</Label>
                    <p className="text-sm">
                      {(100 / selectedAsset.expectedLifespan).toFixed(2)}% per
                      year (Straight-line)
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label>Value Over Time</Label>
                    <div className="h-40 bg-gray-100 rounded-md mt-2 flex items-end p-2">
                      {/* Placeholder for a chart - in a real app, use a charting library */}
                      <div className="flex justify-between items-end w-full h-full">
                        {Array.from(
                          { length: selectedAsset.expectedLifespan + 1 },
                          (_, i) => {
                            const heightPercentage =
                              100 - (i / selectedAsset.expectedLifespan) * 100;
                            return (
                              <div
                                key={i}
                                className="flex flex-col items-center"
                              >
                                <div
                                  className="w-4 bg-blue-500 rounded-t"
                                  style={{ height: `${heightPercentage}%` }}
                                ></div>
                                <span className="text-xs mt-1">
                                  {new Date(
                                    selectedAsset.installationDate,
                                  ).getFullYear() + i}
                                </span>
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="maintenance" className="space-y-4 pt-4">
                {selectedAsset.maintenanceHistory.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No maintenance history available for this asset.
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Performed By</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedAsset.maintenanceHistory.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            {new Date(record.completionDate).toLocaleDateString(
                              "id-ID",
                            )}
                          </TableCell>
                          <TableCell className="capitalize">
                            {record.maintenanceType}
                          </TableCell>
                          <TableCell>{record.performedBy}</TableCell>
                          <TableCell>{record.description}</TableCell>
                          <TableCell>
                            {formatCurrency(record.totalCost)}
                          </TableCell>
                          <TableCell className="capitalize">
                            {record.status}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
              <TabsContent value="documents" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 gap-4">
                  {selectedAsset.documents.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No documents available for this asset.
                    </p>
                  ) : (
                    selectedAsset.documents.map((doc) => (
                      <Card key={doc.id}>
                        <CardContent className="p-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-blue-500" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-xs text-gray-500">
                                Uploaded:{" "}
                                {new Date(doc.uploadDate).toLocaleDateString(
                                  "id-ID",
                                )}
                                {doc.expiryDate && (
                                  <span>
                                    {" "}
                                    | Expires:{" "}
                                    <span
                                      className={
                                        new Date(doc.expiryDate) < new Date()
                                          ? "text-red-500"
                                          : "text-green-500"
                                      }
                                    >
                                      {new Date(
                                        doc.expiryDate,
                                      ).toLocaleDateString("id-ID")}
                                    </span>
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={doc.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setSelectedAsset(null)}>
                Close
              </Button>
              <Button>
                <BarChart3 className="h-4 w-4 mr-2" />
                Lifecycle Analysis
              </Button>
              <Button variant="outline">
                <DollarSign className="h-4 w-4 mr-2" />
                Financial Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AssetLifecycleManagement;
