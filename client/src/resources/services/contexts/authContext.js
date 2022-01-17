import { createContext, useContext, useEffect, useState } from "react";

import * as ApiAuth from "../../../api/auth";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const checkAuthenticated = () => {
    ApiAuth.checkAuthenticated()
      .then((res) => {
        setLoading(false);
        setAuthenticated(res.data);
      })
      .catch((error) => {
        alert("Error occurred please refresh the page");
      });
  };

  return (
    loading || (
      <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
        {children}
      </AuthContext.Provider>
    )
  );
}

export default AuthProvider;
