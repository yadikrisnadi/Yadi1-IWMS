import React, { ReactNode, useState } from "react";
import { GenericErrorFallback } from "./ErrorFallbacks";

interface SafeRenderProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * A component that safely renders its children, catching any errors
 * and displaying a fallback UI instead of crashing the application
 */
const SafeRender: React.FC<SafeRenderProps> = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleReset = () => {
    setHasError(false);
    setError(null);
  };

  try {
    if (hasError) {
      return fallback ? (
        <>{fallback}</>
      ) : (
        <GenericErrorFallback
          error={error?.message || "Terjadi kesalahan saat merender komponen"}
          onRetry={handleReset}
        />
      );
    }

    return <>{children}</>;
  } catch (err) {
    console.error("Error in SafeRender:", err);
    setHasError(true);
    setError(err as Error);

    return fallback ? (
      <>{fallback}</>
    ) : (
      <GenericErrorFallback
        error={
          (err as Error).message || "Terjadi kesalahan saat merender komponen"
        }
        onRetry={handleReset}
      />
    );
  }
};

export default SafeRender;
