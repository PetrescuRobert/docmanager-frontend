import { Dispatch, SetStateAction, createContext } from 'react';
//this context will be linked to a state that will be used to store the user's data
//i want to create an interface for the user's data
export interface UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  jwtToken: string;
  role: string;
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
