import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";

export interface MetaData {
  maxEpoch: string;
  ephemeralKeyPair: Ed25519Keypair;
  randomness: bigint;
  nonce: string;
}

export interface AuthContextValue {
  metadata: MetaData | null;
  logout: () => void;
}
