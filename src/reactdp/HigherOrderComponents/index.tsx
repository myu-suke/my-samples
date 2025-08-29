import React from "react";

export interface InjectingProps {
  isLoading: boolean;
  error: Error | null;
}

export function withLoading<P>(Component: React.ComponentType<P>) {
  return ({
    isLoading,
    error,
    data,
  }: {
    isLoading: InjectingProps["isLoading"];
    error: InjectingProps["error"];
    data: P;
  }) => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) return <p>error</p>;
    if (!data) return <p> No data was found</p>;
    return <Component {...data} />;
  };
}
