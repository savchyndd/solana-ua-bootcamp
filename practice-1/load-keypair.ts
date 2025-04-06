import "./config";
import { Keypair } from "@solana/web3.js";

let privateKey = process.env.SECRET_KEY;

if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const keypair = Keypair.fromSecretKey(asArray);

console.log("✅ The public key is:", keypair.publicKey.toBase58());
