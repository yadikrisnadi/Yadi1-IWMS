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
} from "lucide-react";
import { facilityMaintenanceService } from "@/services/facilityMaintenanceService";
import { MaintenanceAsset } from "@/models/facilityMaintenance";

const AssetManagement = () => {
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Asset Management</h2>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Criticality</TableHead>
                  <TableHead>Current Value</TableHead>
                  <TableHead>Warranty Expiry</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      Loading assets...
                    </TableCell>
                  </TableRow>
                ) : filteredAssets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No assets found. Try adjusting your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAssets.map((asset) => (
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
                      <TableCell>
                        Building {asset.location.buildingId}, Floor{" "}
                        {asset.location.floorId}
                      </TableCell>
                      <TableCell>{getStatusBadge(asset.status)}</TableCell>
                      <TableCell>
                        {getCriticalityBadge(asset.criticality)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(asset.currentValue)}
                      </TableCell>
                      <TableCell>
                        {new Date(asset.warrantyExpiryDate) < new Date() ? (
                          <span className="text-red-500">
                            Expired:{" "}
                            {new Date(
                              asset.warrantyExpiryDate,
                            ).toLocaleDateString("id-ID")}
                          </span>
                        ) : (
                          new Date(asset.warrantyExpiryDate).toLocaleDateString(
                            "id-ID",
                          )
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
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
              <DialogTitle>Asset Details</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="maintenance">
                  Maintenance History
                </TabsTrigger>
                <TabsTrigger value="warranty">
                  Warranty & Compliance
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <p className="text-sm font-medium">{selectedAsset.name}</p>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <p className="text-sm">{selectedAsset.description}</p>
                  </div>
                  <div>
                    <Label>Asset Type</Label>
                    <p className="text-sm capitalize">
                      {selectedAsset.assetType}
                    </p>
                  </div>
                  <div>
                    <Label>Category</Label>
                    <p className="text-sm">{selectedAsset.category}</p>
                  </div>
                  <div>
                    <Label>Manufacturer</Label>
                    <p className="text-sm">{selectedAsset.manufacturer}</p>
                  </div>
                  <div>
                    <Label>Model</Label>
                    <p className="text-sm">{selectedAsset.model}</p>
                  </div>
                  <div>
                    <Label>Serial Number</Label>
                    <p className="text-sm font-mono">
                      {selectedAsset.serialNumber}
                    </p>
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
                    <Label>Purchase Cost</Label>
                    <p className="text-sm">
                      {formatCurrency(selectedAsset.purchaseCost)}
                    </p>
                  </div>
                  <div>
                    <Label>Current Value</Label>
                    <p className="text-sm">
                      {formatCurrency(selectedAsset.currentValue)}
                    </p>
                  </div>
                </div>
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
                          <TableCell className="capitalize">
                            {record.status}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
              <TabsContent value="warranty" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Warranty Expiry Date</Label>
                    <p className="text-sm">
                      {new Date(
                        selectedAsset.warrantyExpiryDate,
                      ).toLocaleDateString("id-ID")}
                      {new Date(selectedAsset.warrantyExpiryDate) <
                      new Date() ? (
                        <Badge className="ml-2 bg-red-500">Expired</Badge>
                      ) : (
                        <Badge className="ml-2 bg-green-500">Active</Badge>
                      )}
                    </p>
                  </div>
                  {selectedAsset.bapelCode && (
                    <div>
                      <Label>BAPEL Code</Label>
                      <p className="text-sm font-mono">
                        {selectedAsset.bapelCode}
                      </p>
                    </div>
                  )}
                  {selectedAsset.snI && (
                    <div>
                      <Label>SNI Reference</Label>
                      <p className="text-sm font-mono">{selectedAsset.snI}</p>
                    </div>
                  )}
                  {selectedAsset.importPermitNumber && (
                    <div>
                      <Label>Import Permit Number</Label>
                      <p className="text-sm font-mono">
                        {selectedAsset.importPermitNumber}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setSelectedAsset(null)}>
                Close
              </Button>
              <Button>Edit Asset</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AssetManagement;
