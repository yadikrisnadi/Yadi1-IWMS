import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingFallbackProps {
  message?: string;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  message = "Memuat...",
}) => {
  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-white rounded-lg border shadow-sm">
      <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default LoadingFallback;
