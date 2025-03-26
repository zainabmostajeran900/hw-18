import React from "react";
import {
  useRouteError,
  isRouteErrorResponse,
  Navigate,
} from "react-router-dom";

export const ErrorBoundary: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold">Something went wrong</h1>
      <p className="mt-4 text-gray-600">{(error as Error).message}</p>
    </div>
  );
};
