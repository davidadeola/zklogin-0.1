import { ReactNode, createContext, useCallback, useEffect } from "react";

const AuthContext = createContext<{} | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const fetchSalt = useCallback(async () => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));
    const idToken = params.get("id_token");

    if (!idToken) return;

    try {
      const response = await fetch(`/api/auth?token=${idToken}`);
      const result = await response.json();
      const salt = result.salt;
      return salt;
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchSalt();
  }, [fetchSalt]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export default AuthProvider;
