/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  walletAddressToDotAnything,
  walletAddressToDotSol,
  walletAddressToDotBackpack,
} from '@portal-payments/solana-wallet-names';
import { Connection, PublicKey } from '@solana/web3.js';

export const getUserNames = async (wallets: string) => {
  const connection = new Connection('https://api.mainnet-beta.solana.com');

  const dotSolPromise = walletAddressToDotSol(
    connection,
    new PublicKey(wallets)
  );
  const dotBackpackPromise = walletAddressToDotBackpack(new PublicKey(wallets));
  const res = await Promise.all([dotBackpackPromise, dotSolPromise]);
  return res;
};
