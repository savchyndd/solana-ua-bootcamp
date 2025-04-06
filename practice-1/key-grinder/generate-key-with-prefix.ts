import { Keypair } from "@solana/web3.js";

const TARGET_PREFIXES = ["dima", "anza", "sol"];

async function generateKeyWithPrefix(prefixes: string[], maxAttempts?: number) {
  console.log(
    `🔍 Searching for a key with prefixes (case-insensitive): [${prefixes.join(
      ", "
    )}]`
  );

  const lowerCasePrefixes = prefixes.map((prefix) => prefix.toLowerCase());

  let attempts = 0;
  const start = Date.now();

  while (!maxAttempts || attempts < maxAttempts) {
    const keypair = Keypair.generate();
    const pubKey = keypair.publicKey.toBase58();
    const pubKeyLower = pubKey.toLowerCase();

    const matchedPrefix = lowerCasePrefixes.find((prefix) =>
      pubKeyLower.startsWith(prefix)
    );

    if (matchedPrefix) {
      const duration = ((Date.now() - start) / 1000).toFixed(2);
      console.log("✅ Match found!");
      console.log("Public Key:", pubKey);
      console.log("Matched Prefix:", matchedPrefix);
      console.log("Keykeypair:", keypair);
      console.log(`⏱️ Time taken: ${duration} seconds.`);
      return;
    }

    if (attempts % 10000 === 0) {
      console.log(`Attempt #${attempts}: ${pubKey}`);
    }

    attempts++;
  }

  console.log(
    `❌ No match found after ${maxAttempts ?? "unlimited"} attempts.`
  );
}

generateKeyWithPrefix(TARGET_PREFIXES);
