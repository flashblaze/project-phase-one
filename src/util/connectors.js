import { Connect, SimpleSigner } from "uport-connect";
import { SigningKey } from "../keys/uportkeys.js";

export let uport = new Connect("INK", {
  clientId: "2ozFbmN51xFHTdd97gCLRkMDNqCwey67xMA",
  network: "rinkeby",
  signer: SimpleSigner(SigningKey)
});
export const web3 = uport.getWeb3();
