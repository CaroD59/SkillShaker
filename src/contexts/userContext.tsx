import { createContext } from 'react';

type UserContextType = {
  user: object | null;
  setUser: (user: object | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => null,
});

export default UserContext;
