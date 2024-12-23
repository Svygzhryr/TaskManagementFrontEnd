import { createContext } from "react";

interface UserData {
  isAuthorized: boolean;
  username: string | null;
  access: string | null;
  refresh: string | null;
}

interface UserContext {
  data: UserData;
  setData: (data: UserData) => void;
}

export const initialData = {
  username: localStorage.getItem("username") ?? null,
  access: localStorage.getItem("access") ?? null,
  refresh: localStorage.getItem("refresh") ?? null,
  get isAuthorized() {
    return !!this.username && !!this.access;
  },
};

export const guest = {
  data: initialData,
  setData: () => {},
};

export const UserContext = createContext<UserContext>(guest);
