"use client";

import {
  createContext,
  PropsWithChildren,
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";

type User = {
  email: string;
  password: string;
};

type UserContextType = {
  user: User;
  userLoginHandler: () => void;
  setUser: Dispatch<SetStateAction<User>>;
};
const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>({ email: "", password: "" });

  const userLoginHandler = async () => {
    await axios.post("local/login");
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     const refreshToken = axios("da", {
  //       headers: { Authorization: token },
  //     });
  //     // localStorage.setItem("token ", refreshToken);
  //   }
  // }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        userLoginHandler,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
