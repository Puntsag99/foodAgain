"use client";

import { createContext, PropsWithChildren, useState, useContext } from "react";
import axios from "axios";

type User = {
  email: string;
  password: string;
};

type UserContextType = {
  user: User;
};
const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setuser] = useState<User>({ email: "", password: "" });

  const userLoginHandler = async () => {
    await axios.post("local/login");
  };

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
