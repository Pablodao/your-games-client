import { createContext, useEffect, useState } from "react";
import { verifyService } from "../services/auth.services";

const AuthContext = createContext();

const AuthWrapper = (props) => {
  const [isUserActive, setIsUserActive] = useState(false);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const authenticateUser = async () => {
    try {
      const response = await verifyService();
      setIsUserActive(true);
      setUser(response.data);
      setIsFetching(false);
    } catch (error) {
      setIsUserActive(false);
      setUser(null);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const userContext = {
    isUserActive,
    user,
    authenticateUser,
  };

  if (isFetching === true) {
    return <h3>...Is Validating User</h3>;
  }

  return (
    <AuthContext.Provider value={userContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthWrapper, AuthContext };
