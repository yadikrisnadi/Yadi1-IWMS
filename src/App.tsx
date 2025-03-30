import React, { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import Sidebar from "./components/layout/Sidebar";
import LoadingFallback from "./components/common/LoadingFallback";

// Lazy load components for better performance
const RealEstatePortfolioManagement = lazy(() =>
  import("./components/realEstate/RealEstateLeasing").then((module) => ({
    default: module.RealEstateLeasing,
  })),
);
const SpacePlanning = lazy(
  () => import("./components/spaceManagement/SpacePlanning"),
);
const FacilityMaintenanceModule = lazy(
  () => import("./components/facilityMaintenance/FacilityMaintenanceModule"),
);
const CapitalProjectManagement = lazy(
  () => import("./components/capitalProjects/CapitalProjectManagement"),
);
const EnvironmentalEnergyManagement = lazy(
  () => import("./components/environmental/EnvironmentalEnergyManagement"),
);

const GreenBuildingModule = lazy(
  () => import("./components/greenBuilding/GreenBuildingModule"),
);

const WorkplaceExperience = lazy(
  () => import("./components/workplaceExperience/WorkplaceExperience"),
);

function App({ className }: { className?: string }) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={className || "flex w-full h-full"}>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/real-estate-leasing"
            element={
              <Suspense
                fallback={
                  <LoadingFallback message="Memuat Real Estate & Leasing..." />
                }
              >
                <RealEstatePortfolioManagement />
              </Suspense>
            }
          />
          <Route
            path="/space-management"
            element={
              <Suspense
                fallback={
                  <LoadingFallback message="Memuat Space Management..." />
                }
              >
                <SpacePlanning />
              </Suspense>
            }
          />
          <Route
            path="/facility-maintenance"
            element={
              <Suspense
                fallback={
                  <LoadingFallback message="Memuat Facility Maintenance..." />
                }
              >
                <FacilityMaintenanceModule />
              </Suspense>
            }
          />
          <Route
            path="/capital-projects"
            element={
              <Suspense
                fallback={
                  <LoadingFallback message="Memuat Capital Projects..." />
                }
              >
                <CapitalProjectManagement />
              </Suspense>
            }
          />
          <Route
            path="/environmental-energy"
            element={
              <Suspense
                fallback={
                  <LoadingFallback message="Memuat Environmental & Energy..." />
                }
              >
                <EnvironmentalEnergyManagement />
              </Suspense>
            }
          />
          <Route
            path="/green-building-certification"
            element={
              <Suspense
                fallback={
                  <LoadingFallback message="Memuat Green Building Certification..." />
                }
              >
                <GreenBuildingModule />
              </Suspense>
            }
          />
          <Route
            path="/workplace-experience"
            element={
              <Suspense
                fallback={
                  <LoadingFallback message="Memuat Workplace Experience..." />
                }
              >
                <WorkplaceExperience />
              </Suspense>
            }
          />
          {/* Keep the old routes for backward compatibility */}
          <Route
            path="/real-estate"
            element={
              <Suspense
                fallback={
                  <LoadingFallback message="Memuat Real Estate & Leasing..." />
                }
              >
                <RealEstatePortfolioManagement />
              </Suspense>
            }
          />
          <Route
            path="/leasing"
            element={
              <Suspense
                fallback={
                  <LoadingFallback message="Memuat Real Estate & Leasing..." />
                }
              >
                <RealEstatePortfolioManagement />
              </Suspense>
            }
          />

          {/* Allow Tempo to capture routes before the catchall */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
