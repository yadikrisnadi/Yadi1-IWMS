import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Building2,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  FileText,
  MapPin,
  Calendar,
  DollarSign,
  BarChart3,
} from "lucide-react";
import { realEstateService } from "../../services/realEstateService";
import {
  Property,
  PropertyPortfolio as PropertyPortfolioType,
} from "../../models/realEstate";

interface PropertyPortfolioProps {
  // Props if needed
}

const PropertyPortfolio: React.FC<PropertyPortfolioProps> = () => {
  const [portfolio, setPortfolio] = useState<PropertyPortfolioType | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [viewDialogOpen, setViewDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data, error } = await realEstateService.getPropertyPortfolio();
        if (error) {
          console.error("Error fetching property portfolio:", error);
        } else if (data) {
          setPortfolio(data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const filteredProperties =
    portfolio?.properties.filter(
      (property) =>
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.city.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return "N/A";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleViewProperty = (property: Property) => {
    setSelectedProperty(property);
    setViewDialogOpen(true);
  };

  const PropertyCard = ({ property }: { property: Property }) => (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{property.name}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {property.address.city}, {property.address.province}
            </div>
          </div>
          <Badge
            variant={
              property.status?.name === "Active" ? "default" : "secondary"
            }
          >
            {property.status?.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Building Area</p>
              <p className="font-medium">{property.buildingArea} m²</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Land Area</p>
              <p className="font-medium">{property.totalArea} m²</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">Current Value</p>
            <p className="font-medium">
              {formatCurrency(property.currentMarketValue)}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">Occupancy Rate</p>
            <div className="flex items-center gap-2">
              <Progress value={85} className="h-2" />
              <span className="text-sm font-medium">85%</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleViewProperty(property)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full bg-background p-4 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Building2 className="mr-2 h-6 w-6 text-primary" />
            Property Portfolio
          </h2>
          <p className="text-muted-foreground">
            Manage your real estate properties and assets
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Property
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading property portfolio...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Properties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 text-primary mr-2" />
                  <span className="text-2xl font-bold">
                    {portfolio?.totalProperties || 0}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Area
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-2" />
                  <span className="text-2xl font-bold">
                    {portfolio?.totalArea.toLocaleString() || 0} m²
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-primary mr-2" />
                  <span className="text-2xl font-bold">
                    {formatCurrency(portfolio?.totalValue)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search properties..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>

          <Tabs defaultValue="grid">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="table" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Area (m²)</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="font-medium">
                          {property.name}
                        </TableCell>
                        <TableCell>{property.propertyType?.name}</TableCell>
                        <TableCell>
                          {property.address.city}, {property.address.province}
                        </TableCell>
                        <TableCell>{property.buildingArea}</TableCell>
                        <TableCell>
                          {formatCurrency(property.currentMarketValue)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              property.status?.name === "Active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {property.status?.name}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleViewProperty(property)}
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}

      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedProperty?.name}</DialogTitle>
            <DialogDescription>
              Property details and information
            </DialogDescription>
          </DialogHeader>

          {selectedProperty && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Property Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Property Type:
                    </span>
                    <span className="font-medium">
                      {selectedProperty.propertyType?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge
                      variant={
                        selectedProperty.status?.name === "Active"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {selectedProperty.status?.name}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year Built:</span>
                    <span className="font-medium">
                      {selectedProperty.yearBuilt || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Floors:</span>
                    <span className="font-medium">
                      {selectedProperty.floors || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Building Area:
                    </span>
                    <span className="font-medium">
                      {selectedProperty.buildingArea} m²
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Land Area:</span>
                    <span className="font-medium">
                      {selectedProperty.totalArea} m²
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-medium mt-4 mb-2">Address</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Street:</span>
                    <span className="font-medium">
                      {selectedProperty.address.street}{" "}
                      {selectedProperty.address.buildingNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">District:</span>
                    <span className="font-medium">
                      {selectedProperty.address.kelurahan},{" "}
                      {selectedProperty.address.kecamatan}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">City:</span>
                    <span className="font-medium">
                      {selectedProperty.address.city}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Province:</span>
                    <span className="font-medium">
                      {selectedProperty.address.province}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Postal Code:</span>
                    <span className="font-medium">
                      {selectedProperty.address.postalCode}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Financial Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Purchase Date:
                    </span>
                    <span className="font-medium">
                      {selectedProperty.purchaseDate || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Purchase Price:
                    </span>
                    <span className="font-medium">
                      {formatCurrency(selectedProperty.purchasePrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Current Value:
                    </span>
                    <span className="font-medium">
                      {formatCurrency(selectedProperty.currentMarketValue)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Last Valuation:
                    </span>
                    <span className="font-medium">
                      {selectedProperty.lastValuationDate || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">NJOP:</span>
                    <span className="font-medium">
                      {formatCurrency(selectedProperty.njop)}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-medium mt-4 mb-2">
                  Legal Documents
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">IMB:</span>
                    <span className="font-medium">
                      {selectedProperty.imb || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">HGB:</span>
                    <span className="font-medium">
                      {selectedProperty.hgb || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">PBB:</span>
                    <span className="font-medium">
                      {selectedProperty.pbb || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-x-2">
                  <Button variant="outline" className="gap-1">
                    <Calendar className="h-4 w-4" /> View Leases
                  </Button>
                  <Button variant="outline" className="gap-1">
                    <BarChart3 className="h-4 w-4" /> Financial Reports
                  </Button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
            <Button>Edit Property</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyPortfolio;
