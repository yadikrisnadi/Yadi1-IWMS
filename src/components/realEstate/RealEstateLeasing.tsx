import React, { Suspense, lazy } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import LoadingFallback from "@/components/common/LoadingFallback";

// Lazy load components for better performance
const PropertyPortfolio = lazy(() => import("./PropertyPortfolio"));
const LeaseManagement = lazy(() => import("./LeaseManagement"));
const AssetRegistry = lazy(() => import("./AssetRegistry"));
const TransactionManagement = lazy(() => import("./TransactionManagement"));

export function RealEstateLeasing() {
  return (
    <div className="w-full p-6 space-y-6">
      <h1 className="text-3xl font-bold">Real Estate & Leasing Management</h1>

      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="portfolio">Property Portfolio</TabsTrigger>
          <TabsTrigger value="leasing">Lease Management</TabsTrigger>
          <TabsTrigger value="assets">Asset Registry</TabsTrigger>
          <TabsTrigger value="transactions">Transaction Management</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio">
          <Card>
            <CardHeader>
              <CardTitle>Property Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <ErrorBoundary moduleName="Property Portfolio">
                <Suspense
                  fallback={
                    <LoadingFallback message="Memuat data properti..." />
                  }
                >
                  <PropertyPortfolio />
                </Suspense>
              </ErrorBoundary>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leasing">
          <Card>
            <CardHeader>
              <CardTitle>Lease Management</CardTitle>
            </CardHeader>
            <CardContent>
              <ErrorBoundary moduleName="Lease Management">
                <Suspense
                  fallback={<LoadingFallback message="Memuat data sewa..." />}
                >
                  <LeaseManagement />
                </Suspense>
              </ErrorBoundary>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets">
          <Card>
            <CardHeader>
              <CardTitle>Asset Registry</CardTitle>
            </CardHeader>
            <CardContent>
              <ErrorBoundary moduleName="Asset Registry">
                <Suspense
                  fallback={<LoadingFallback message="Memuat data aset..." />}
                >
                  <AssetRegistry />
                </Suspense>
              </ErrorBoundary>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Management</CardTitle>
            </CardHeader>
            <CardContent>
              <ErrorBoundary moduleName="Transaction Management">
                <Suspense
                  fallback={
                    <LoadingFallback message="Memuat data transaksi..." />
                  }
                >
                  <TransactionManagement />
                </Suspense>
              </ErrorBoundary>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
