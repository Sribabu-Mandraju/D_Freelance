import { AuthClient } from '@farcaster/auth-kit';

const client = new AuthClient({
  rpcUrl: "https://hub.farcaster.xyz", // or Neynar hub
  domain: "crypto-lance-gamma.vercel.app"
});

// When user signs in:
const result = await client.signIn();

console.log(result.accountAssociation);
// {
//   header: "...",
//   payload: "...",
//   signature: "..."
// }
