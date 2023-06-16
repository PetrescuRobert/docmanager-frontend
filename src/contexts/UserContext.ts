import { Dispatch, SetStateAction, createContext } from "react";
import { Department } from "../data/types";

export interface UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  jwtToken: string;
  role: string;
  department: Department;
}

interface UserContextInterface {
  user: UserDetails | null;
  setUser: Dispatch<SetStateAction<UserDetails | null>>;
}

const UserContext = createContext<UserContextInterface>({
  user: null,
  setUser: () => {},
});

export default UserContext;
