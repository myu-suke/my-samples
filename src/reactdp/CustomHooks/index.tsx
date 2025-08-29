import { useEffect, useState } from "react";

export const useUsers = () => {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return users;
};
