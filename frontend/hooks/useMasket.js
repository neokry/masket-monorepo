import { ethers } from "ethers";
import * as ContractABI from "../abis/Masket.json";
import useContract from "./useContract";
import useIPFS from "./useIPFS";

const MASKET_ADDRESS = "0x0476a6D64F8aDF390E2C5d07937B133764Ef212f";

export default function useMasket() {
  const { loading, contract } = useContract(MASKET_ADDRESS, ContractABI.abi);
  const { uploadObject, uploadFile } = useIPFS();

  const createProduct = async (image, name, description, price, seller) => {
    if (loading) return;

    console.log("creating product");

    const imgHash = await uploadFile(image);
    const metadata = {
      image: imgHash,
      name: name,
      description: description,
    };
    const hash = await uploadObject(metadata);
    console.log("hash", hash);
    const tx = await contract.createProduct(
      hash,
      ethers.utils.parseEther(price),
      seller
    );
    await tx.wait();
  };

  const purchaseProduct = async (productId, price) => {
    const tx = await contract.purchaseProduct(productId, { value: price });
    await tx.wait();
  };

  const setBuyerMetadata = async (metadata) => {
    const hash = await uploadObject(metadata);
    const tx = await contract.setBuyerMetadata(hash);
    await tx.wait();
  };

  return { createProduct, purchaseProduct, setBuyerMetadata };
}
