import {
  ReactNode,
  useState,
  createContext,
  useCallback,
  useEffect,
} from "react";
import { jwtToAddress } from "@mysten/zklogin";

const AuthContext = createContext<{} | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>("");

  // Fetch salt
  const fetchSalt = useCallback(async (idToken: string) => {
    if (!idToken) return;
    try {
      const response = await fetch(`/api/auth?token=${idToken}`);
      const result = await response.json();
      if (result && typeof result !== "object") {
        throw new Error("Response is not in JSON format");
      }
      return result.salt;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getAddress = useCallback(async (token: string, salt: bigint) => {
    const userAddress = jwtToAddress(token, salt);
    setAddress(userAddress);
  }, []);

  const fetchSaltAndGetAddress = useCallback(async () => {
    if (userToken) {
      const salt = await fetchSalt(userToken);
      console.log(salt);
      if (salt) getAddress(userToken, salt);
    }
  }, [fetchSalt, getAddress, userToken]);
  console.log(address);

  useEffect(() => {
    fetchSaltAndGetAddress();
  }, [fetchSaltAndGetAddress]);

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));
    const idToken = params.get("id_token");
    setUserToken(idToken);
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export default AuthProvider;
