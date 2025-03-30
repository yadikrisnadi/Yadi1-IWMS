/**
 * Utility for handling API errors consistently across the application
 */

interface ApiErrorOptions {
  fallbackMessage?: string;
  logToConsole?: boolean;
  logToService?: boolean;
}

const defaultOptions: ApiErrorOptions = {
  fallbackMessage:
    "Terjadi kesalahan saat memuat data. Silakan coba lagi nanti.",
  logToConsole: true,
  logToService: false,
};

/**
 * Handles API errors consistently
 * @param error The error object
 * @param options Configuration options
 * @returns A user-friendly error message
 */
export const handleApiError = (
  error: any,
  options: ApiErrorOptions = {},
): string => {
  const config = { ...defaultOptions, ...options };

  // Log error to console if enabled
  if (config.logToConsole) {
    console.error("API Error:", error);
  }

  // Here you could add logic to send errors to a monitoring service
  if (config.logToService) {
    // Example: sendToErrorMonitoring(error);
  }

  // Extract meaningful error message if possible
  let errorMessage = config.fallbackMessage;

  if (error?.response?.data?.message) {
    // Handle structured API errors
    errorMessage = error.response.data.message;
  } else if (error?.message) {
    // Handle standard Error objects
    errorMessage = error.message;
  } else if (typeof error === "string") {
    // Handle string errors
    errorMessage = error;
  }

  return errorMessage;
};

/**
 * Wraps an async function with try/catch error handling
 * @param fn The async function to wrap
 * @param errorHandler Optional custom error handler
 * @returns A function that won't throw errors
 */
export const withErrorHandling = <T, Args extends any[]>(
  fn: (...args: Args) => Promise<T>,
  errorHandler?: (error: any) => void,
) => {
  return async (
    ...args: Args
  ): Promise<{ data: T | null; error: string | null }> => {
    try {
      const data = await fn(...args);
      return { data, error: null };
    } catch (error) {
      const errorMessage = handleApiError(error);

      if (errorHandler) {
        errorHandler(error);
      }

      return { data: null, error: errorMessage };
    }
  };
};
