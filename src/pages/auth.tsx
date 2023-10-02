import useAuthContext from "@/hooks/context/useAuthContext";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

const AuthPage = () => {
  const { push } = useRouter();
  const { setJwt } = useAuthContext();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));
    const jwt = params.get("id_token");
    // setTimeout(() => {
    // }, 5000);
    if (jwt) {
      setJwt(jwt);
      push("/dashboard");
    } else {
      push("/login");
    }
  }, [push, setJwt]);

  return <div>Loading...</div>;
};

export default AuthPage;
