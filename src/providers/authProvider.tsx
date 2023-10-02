import {
  ReactNode,
  useState,
  createContext,
  useCallback,
  useEffect,
} from "react";
import { jwtToAddress } from "@mysten/zklogin";
import useLocalStorage from "@/hooks/data/useLocalStorage";
import { AuthContextValue, User } from "@/types/context";
import { useRouter } from "next/router";
import loadingAnimationData from "../components/interface/animations/login.json";
import { useLottie } from "@/hooks/useLottie";

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const PROTECTED_ROUTES = ["/", "/dashboard"];

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { push, pathname } = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [jwt, setJwt] = useLocalStorage("jwt", "");
  const [loading, setLoading] = useState(false);

  const loadingContainer = useLottie(loadingAnimationData, true);

  const logout = useCallback(() => {
    setJwt("");
    setUser(null);
  }, [setJwt]);

  const reAuthenticate = useCallback(async () => {
    if (!jwt) return;
    try {
      setLoading(true);
      const response = await fetch(`/api/auth?jwt=${jwt}`);
      const result = await response.json();
      const salt = result.salt;
      if (salt) {
        const address = jwtToAddress(jwt, salt);
        setUser({
          jwt,
          salt,
          address,
        });
      }
    } catch (error) {
      console.error(error);
      // if (error === "JWK has expired") logout()
    }
    setLoading(false);
  }, [jwt]);

  useEffect(() => {
    if (!jwt && PROTECTED_ROUTES.includes(pathname)) push("/login");
  }, [jwt, pathname, push]);

  useEffect(() => {
    reAuthenticate();
  }, [reAuthenticate]);

  return (
    <AuthContext.Provider value={{ setJwt, user, logout, loading }}>
      {loading ? (
        <div className="min-w-[20px]" ref={loadingContainer} />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
