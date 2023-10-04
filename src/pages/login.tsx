import { useLottie } from "@/hooks/useLottie";
import { useNonce } from "@/hooks/useNonce";
import Link from "next/link";
import googleAnimationData from "../components/interface/animations/google.json";
import loginAnimationData from "../components/interface/animations/login.json";

const REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? "https://zklogin-demo.vercel.app/auth"
    : "http://localhost:3000/auth";

export default function Home() {
  const { nonce } = useNonce();
  const googleContainer = useLottie(googleAnimationData, 2);
  const loginContainer = useLottie(loginAnimationData, true);

  const params = new URLSearchParams({
    state: new URLSearchParams({
      redirect_uri: REDIRECT_URI,
    }).toString(),
    client_id:
      "25769832374-famecqrhe2gkebt5fvqms2263046lj96.apps.googleusercontent.com",
    redirect_uri: "https://zklogin-dev-redirect.vercel.app/api/auth",
    response_type: "id_token",
    scope: "openid",
  });
  if (nonce) {
    params.append("nonce", nonce);
  }

  const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl text-gray-600 font-bold">ZKLogin Demo</h1>
      <div ref={loginContainer} />
      <Link
        className="flex text-lg items-center justify-center border-solid border-[2px] border-gray-200 w-full gap-2 pr-4 rounded-md text-gray-700 hover:bg-gray-200 max-w-[20em] font-bold"
        href={loginURL}
      >
        <div className="max-w-[50px]" ref={googleContainer} />
        Login to Google
      </Link>
    </div>
  );
}
