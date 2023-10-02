import useAuthContext from "@/hooks/context/useAuthContext";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import loadingAnimationData from "../components/interface/animations/login.json";
import { useLottie } from "@/hooks/useLottie";

const AuthPage = () => {
  const loadingContainer = useLottie(loadingAnimationData, true);
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

  return <div ref={loadingContainer}>Loading...</div>;
};

export default AuthPage;
