import "./config";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import { airdropIfRequired } from "@solana-developers/helpers";

const connection = new Connection(clusterApiUrl("devnet"));
console.log("Connected to devnet");

const publicKey = new PublicKey(process.env.PUBLIC_KEY_BASE58);
const balanceInLamportsBeforeAirdrop = await connection.getBalance(publicKey);
const balanceInSOLBeforeAirdrop =
  balanceInLamportsBeforeAirdrop / LAMPORTS_PER_SOL;

await airdropIfRequired(
  connection,
  publicKey,
  1 * LAMPORTS_PER_SOL,
  0.5 * LAMPORTS_PER_SOL
);
console.log("Airdrop completed successfully!");

const balanceInLamportsAfterAidrop = await connection.getBalance(publicKey);
const balanceInSOLAfterAidrop = balanceInLamportsAfterAidrop / LAMPORTS_PER_SOL;

console.log(
  `The balance for the wallet at address ${publicKey}: \n before airdrop: ${balanceInSOLBeforeAirdrop} SOL \n after airdrop: ${balanceInSOLAfterAidrop} SOL`
);
