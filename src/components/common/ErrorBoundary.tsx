import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
  moduleName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(`Error in ${this.props.moduleName || "component"}:`, error);
    console.error("Component stack:", errorInfo.componentStack);

    // Here you could also send the error to an error reporting service
    // Example: logErrorToService(error, errorInfo, this.props.moduleName);
  }

  handleReset = (): void => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="w-full h-full bg-white shadow-sm rounded-lg border overflow-hidden">
          <CardHeader className="bg-red-50 border-b border-red-100">
            <CardTitle className="text-red-700 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              {this.props.moduleName
                ? `Error in ${this.props.moduleName}`
                : "Something went wrong"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-gray-700">
                Maaf, terjadi kesalahan saat memuat komponen ini. Tim teknis
                kami sudah diberitahu tentang masalah ini.
              </p>
              {this.state.error && (
                <div className="p-3 bg-gray-50 rounded border text-sm font-mono overflow-auto">
                  {this.state.error.toString()}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t bg-gray-50 p-4">
            <Button
              onClick={this.handleReset}
              variant="outline"
              className="mr-2"
            >
              Coba Lagi
            </Button>
            <Button onClick={() => window.location.reload()}>
              Muat Ulang Halaman
            </Button>
          </CardFooter>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
