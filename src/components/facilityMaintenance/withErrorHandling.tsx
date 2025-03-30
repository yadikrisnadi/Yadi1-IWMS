import React, { ComponentType, useState } from "react";
import { GenericErrorFallback } from "./ErrorFallbacks";

interface WithErrorHandlingProps {
  [key: string]: any;
}

/**
 * Higher-order component that adds error handling to any component
 * @param WrappedComponent The component to wrap with error handling
 * @param FallbackComponent Optional custom error component
 */
const withErrorHandling = <P extends WithErrorHandlingProps>(
  WrappedComponent: ComponentType<P>,
  FallbackComponent = GenericErrorFallback,
) => {
  const WithErrorHandling: React.FC<P> = (props) => {
    const [error, setError] = useState<Error | null>(null);

    const handleError = (err: Error) => {
      console.error("Component error caught:", err);
      setError(err);
    };

    const resetError = () => {
      setError(null);
    };

    if (error) {
      return <FallbackComponent error={error.message} onRetry={resetError} />;
    }

    try {
      return <WrappedComponent {...props} onError={handleError} />;
    } catch (err) {
      handleError(err as Error);
      return (
        <FallbackComponent
          error={(err as Error).message}
          onRetry={resetError}
        />
      );
    }
  };

  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  WithErrorHandling.displayName = `withErrorHandling(${displayName})`;

  return WithErrorHandling;
};

export default withErrorHandling;
