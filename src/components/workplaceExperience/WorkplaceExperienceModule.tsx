import React, { useState, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import LoadingFallback from "@/components/common/LoadingFallback";

// Lazy load the main component to improve performance
const WorkplaceExperience = lazy(() => import("./WorkplaceExperience"));

const WorkplaceExperienceModule = () => {
  const [hasError, setHasError] = useState(false);
  const { t } = useTranslation();

  const handleErrorReset = () => {
    setHasError(false);
  };

  return (
    <div className="w-full h-full bg-white shadow-sm rounded-lg border overflow-auto">
      <ErrorBoundary
        moduleName="Workplace Experience"
        onReset={handleErrorReset}
      >
        <Suspense
          fallback={
            <LoadingFallback
              message={t(
                "loadingWorkplaceExperience",
                "Memuat data pengalaman tempat kerja...",
              )}
            />
          }
        >
          <WorkplaceExperience />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default WorkplaceExperienceModule;
