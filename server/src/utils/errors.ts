// 1. Define the shapes of the errors you expect across your app
export interface ApiError {
  status: number;
  message: string;
}

// 2. Type Guard: Checks if an unknown error matches your API shape
export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "message" in error &&
    typeof (error as Record<string, unknown>).status === "number" &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

// 3. Central Parsing Function: Takes any unknown error and normalizes it
export function parseError(error: unknown): ApiError {
  // If it's already a well-formatted ApiError, return it
  if (isApiError(error)) {
    return error;
  }

  // If it's a standard JavaScript error object
  if (error instanceof Error) {
    return {
      status: 500, // Default server/internal error code
      message: error.message,
    };
  }

  // If someone threw a raw string
  if (typeof error === "string") {
    return {
      status: 500,
      message: error,
    };
  }

  // Fallback for anything else (arrays, random numbers, nulls)
  return {
    status: 500,
    message: "An unexpected error occurred.",
  };
}
