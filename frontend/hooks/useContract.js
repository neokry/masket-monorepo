import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function useContract(address, abi) {
  const context = useWeb3React();
  const { account, library } = context;
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (!account) {
      console.log("no account");
      return;
    }
    getContract();
  }, [account, address, abi]);

  const getContract = async () => {
    const signer = await library.getSigner(account);
    const ArtworkFactory = new ethers.Contract(address, abi, signer);
    const res = await ArtworkFactory.attach(address);
    setContract(res);
  };

  return { loading: !contract, contract };
}
