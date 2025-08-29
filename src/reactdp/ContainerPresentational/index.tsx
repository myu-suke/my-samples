// ロジックとUIの分離
import React, { useEffect, useState } from "react";

// types.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

// Presentational Component (UserDisplay.tsx)
// UIの表示のみを担当
// import { User } from './types';

interface UserDisplayProps {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

const UserDisplay: React.FC<UserDisplayProps> = ({
  user,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return <p>Loading user data...</p>;
  }
  if (error) {
    return <p style={{ color: "red" }}>Error: {error.message}</p>;
  }
  if (!user) {
    return <p>No user data available.</p>;
  }
  return (
    <div>
      <h2>User Information</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export { UserDisplay };

// Container Component (UserContainer.tsx)
// データの取得、状態管理、ロジックを担当
// import React, { useState, useEffect } from 'react';
// import UserDisplay from './UserDisplay';
// import { User } from './types';

interface UserContainerProps {
  userId: number;
}

const UserContainer: React.FC<UserContainerProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: User = await response.json();
        setUser(data);
      } catch (err: any) {
        // errの型をanyとして扱うか、特定のError型で捕捉
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  return <UserDisplay user={user} isLoading={isLoading} error={error} />;
};

export { UserContainer };

// Usage (App.tsx)
// import React from 'react';
// import UserContainer from './UserContainer';

const App: React.FC = () => {
  return (
    <div>
      <h1>Container/Presentational Pattern Example</h1>
      <UserContainer userId={1} />
      <UserContainer userId={2} />
    </div>
  );
};

export default App;
