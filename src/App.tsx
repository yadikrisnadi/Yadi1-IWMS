import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load components for better performance
const RealEstatePortfolioManagement = lazy(
  () => import("./components/realEstate/RealEstateLeasing"),
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
const WorkplaceExperience = lazy(
  () => import("./components/workplaceExperience/WorkplaceExperience"),
);
const GreenBuildingCertification = lazy(
  () => import("./components/greenBuilding/GreenBuildingCertification"),
);

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/real-estate-leasing"
            element={<RealEstatePortfolioManagement />}
          />
          <Route path="/space-management" element={<SpacePlanning />} />
          <Route
            path="/facility-maintenance"
            element={<FacilityMaintenanceModule />}
          />
          <Route
            path="/capital-projects"
            element={<CapitalProjectManagement />}
          />
          <Route
            path="/environmental-energy"
            element={<EnvironmentalEnergyManagement />}
          />
          <Route
            path="/workplace-experience"
            element={<WorkplaceExperience />}
          />
          <Route
            path="/green-building-certification"
            element={<GreenBuildingCertification />}
          />
          {/* Keep the old routes for backward compatibility */}
          <Route
            path="/real-estate"
            element={<RealEstatePortfolioManagement />}
          />
          <Route path="/leasing" element={<RealEstatePortfolioManagement />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
