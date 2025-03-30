import React from "react";
import { AlertTriangle, FileX, ServerCrash, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ErrorFallbackProps {
  error?: string;
  onRetry?: () => void;
  title?: string;
}

export const GenericErrorFallback: React.FC<ErrorFallbackProps> = ({
  error = "Terjadi kesalahan saat memuat data. Silakan coba lagi nanti.",
  onRetry,
  title = "Terjadi Kesalahan",
}) => {
  return (
    <Card className="w-full bg-white shadow-sm rounded-lg border overflow-hidden">
      <CardHeader className="bg-red-50 border-b border-red-100">
        <CardTitle className="text-red-700 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <AlertTriangle className="h-12 w-12 text-red-500" />
          <p className="text-gray-600">{error}</p>
        </div>
      </CardContent>
      {onRetry && (
        <CardFooter className="border-t bg-gray-50 p-4 flex justify-center">
          <Button onClick={onRetry} variant="outline">
            Coba Lagi
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export const NetworkErrorFallback: React.FC<ErrorFallbackProps> = ({
  onRetry,
  title = "Kesalahan Jaringan",
}) => {
  return (
    <Card className="w-full bg-white shadow-sm rounded-lg border overflow-hidden">
      <CardHeader className="bg-orange-50 border-b border-orange-100">
        <CardTitle className="text-orange-700 flex items-center">
          <WifiOff className="h-5 w-5 mr-2" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <WifiOff className="h-12 w-12 text-orange-500" />
          <p className="text-gray-600">
            Koneksi jaringan terputus atau server tidak dapat dijangkau. Periksa
            koneksi internet Anda dan coba lagi.
          </p>
        </div>
      </CardContent>
      {onRetry && (
        <CardFooter className="border-t bg-gray-50 p-4 flex justify-center">
          <Button onClick={onRetry} variant="outline">
            Coba Lagi
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export const ServerErrorFallback: React.FC<ErrorFallbackProps> = ({
  onRetry,
  title = "Kesalahan Server",
}) => {
  return (
    <Card className="w-full bg-white shadow-sm rounded-lg border overflow-hidden">
      <CardHeader className="bg-red-50 border-b border-red-100">
        <CardTitle className="text-red-700 flex items-center">
          <ServerCrash className="h-5 w-5 mr-2" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <ServerCrash className="h-12 w-12 text-red-500" />
          <p className="text-gray-600">
            Server sedang mengalami masalah. Tim teknis kami sedang bekerja
            untuk memperbaikinya. Silakan coba lagi nanti.
          </p>
        </div>
      </CardContent>
      {onRetry && (
        <CardFooter className="border-t bg-gray-50 p-4 flex justify-center">
          <Button onClick={onRetry} variant="outline">
            Coba Lagi
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export const DataNotFoundFallback: React.FC<ErrorFallbackProps> = ({
  onRetry,
  title = "Data Tidak Ditemukan",
}) => {
  return (
    <Card className="w-full bg-white shadow-sm rounded-lg border overflow-hidden">
      <CardHeader className="bg-blue-50 border-b border-blue-100">
        <CardTitle className="text-blue-700 flex items-center">
          <FileX className="h-5 w-5 mr-2" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <FileX className="h-12 w-12 text-blue-500" />
          <p className="text-gray-600">
            Data yang Anda cari tidak ditemukan atau telah dihapus.
          </p>
        </div>
      </CardContent>
      {onRetry && (
        <CardFooter className="border-t bg-gray-50 p-4 flex justify-center">
          <Button onClick={onRetry} variant="outline">
            Kembali
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
