import React, { useEffect } from "react";

interface GlobalErrorHandlerProps {
  children: React.ReactNode;
}

const GlobalErrorHandler: React.FC<GlobalErrorHandlerProps> = ({
  children,
}) => {
  useEffect(() => {
    // Handler for uncaught promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled Promise Rejection:", event.reason);

      // Prevent the default browser behavior (console error)
      event.preventDefault();

      // Here you could log to an error monitoring service
      // Example: logErrorToService(event.reason);
    };

    // Handler for uncaught exceptions
    const handleError = (event: ErrorEvent) => {
      console.error("Uncaught Error:", event.error || event.message);

      // Prevent the default browser behavior (console error)
      event.preventDefault();

      // Here you could log to an error monitoring service
      // Example: logErrorToService(event.error || event.message);
    };

    // Add event listeners
    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("error", handleError);

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
      window.removeEventListener("error", handleError);
    };
  }, []);

  return <>{children}</>;
};

export default GlobalErrorHandler;
