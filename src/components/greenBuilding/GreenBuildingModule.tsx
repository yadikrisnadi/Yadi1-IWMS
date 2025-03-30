import React, { useState, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import LoadingFallback from "@/components/common/LoadingFallback";

// Lazy load the main component to improve performance
const GreenBuildingCertification = lazy(
  () => import("./GreenBuildingCertification"),
);

const GreenBuildingModule = () => {
  const [hasError, setHasError] = useState(false);
  const { t } = useTranslation();

  const handleErrorReset = () => {
    setHasError(false);
  };

  return (
    <div className="w-full h-full bg-white shadow-sm rounded-lg border overflow-auto">
      <ErrorBoundary
        moduleName="Green Building Certification"
        onReset={handleErrorReset}
      >
        <Suspense
          fallback={
            <LoadingFallback
              message={t(
                "loadingGreenBuilding",
                "Memuat data sertifikasi bangunan hijau...",
              )}
            />
          }
        >
          <GreenBuildingCertification />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default GreenBuildingModule;
