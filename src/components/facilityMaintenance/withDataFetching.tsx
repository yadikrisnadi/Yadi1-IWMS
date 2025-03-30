import React, { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import LoadingFallback from "@/components/common/LoadingFallback";
import { handleApiError } from "@/components/common/ApiErrorHandler";

interface WithDataFetchingProps {
  fetchData: () => Promise<any>;
  loadingMessage?: string;
  errorTitle?: string;
  renderData: (data: any) => React.ReactNode;
}

/**
 * A higher-order component that handles data fetching, loading states, and error handling
 */
const WithDataFetching: React.FC<WithDataFetchingProps> = ({
  fetchData,
  loadingMessage = "Memuat data...",
  errorTitle = "Gagal memuat data",
  renderData,
}) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchData();
      setData(result);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return <LoadingFallback message={loadingMessage} />;
  }

  if (error) {
    return (
      <Card className="w-full bg-white shadow-sm rounded-lg border overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <AlertTriangle className="h-12 w-12 text-red-500" />
            <h3 className="text-lg font-medium text-red-700">{errorTitle}</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 p-4 flex justify-center">
          <Button onClick={loadData} variant="outline">
            Coba Lagi
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return renderData(data);
};

export default WithDataFetching;
