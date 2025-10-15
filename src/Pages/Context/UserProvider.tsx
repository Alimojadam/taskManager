import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import type { User } from "../../info/userInfo";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
