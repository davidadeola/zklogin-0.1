import { SetStateAction } from "react";
import { Dispatch } from "react";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";

export interface MetaData {
  maxEpoch: string;
  ephemeralKeyPair: Ed25519Keypair;
  randomness: bigint;
  nonce: string;
}

export interface User {
  jwt: string;
  salt: string;
  address: string;
}
export interface AuthContextValue {
  setJwt: Dispatch<SetStateAction<string>>;
  user: User | null;
  logout: () => void;
}
