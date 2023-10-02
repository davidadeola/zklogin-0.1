import React, { useState, useEffect } from "react";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { generateNonce, generateRandomness } from "@mysten/zklogin";

const getActiveNetworkSuiClient = async () => {
  try {
    const client = new SuiClient({ url: getFullnodeUrl("devnet") });
    return client;
  } catch (error) {
    console.log("Sui client error:", error);
    throw error;
  }
};

export const useNonce = () => {
  const [nonce, setNonce] = useState<null | string>(null);

  useEffect(() => {
    const getNonce = async (): Promise<void> => {
      try {
        const suiClient = await getActiveNetworkSuiClient();
        const { epoch } = await suiClient.getLatestSuiSystemState();

        const maxEpoch = epoch + 2; // this means the ephemeral key will be active for 2 epochs from now.
        const ephemeralKeyPair = new Ed25519Keypair();
        const randomness = generateRandomness();
        const calculatedNonce = generateNonce(
          ephemeralKeyPair.getPublicKey(),
          // @ts-ignore
          maxEpoch,
          randomness
        );

        setNonce(calculatedNonce);
      } catch (error) {
        console.error("Error getting nonce:", error);
      }
    };
    getNonce();
  }, []);
  return { nonce };
};
