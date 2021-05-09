import axios from "axios";
import makeBlockie from "ethereum-blockies-base64";
import { ethers } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import useMasket from "../hooks/useMasket";
const IPFS_URL = "https://ipfs.io/ipfs/";

export default function Product({ metadata, price, seller, productId }) {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { purchaseProduct } = useMasket();

  const init = async () => {
    const { data } = await axios.get(IPFS_URL + metadata);
    console.log("data", data);
    setProductData(data);
  };

  const onPurchase = async () => {
    setLoading(true);
    await purchaseProduct(productId, price);
    setLoading(false);
  };

  useEffect(() => init(), []);

  if (!productData) return <div></div>;

  return (
    <div className="flex shadow-md">
      <img
        src={IPFS_URL + productData.image}
        className="w-full h-64 object-cover object-top"
      />
      <div className="ml-2 mr-2 mt-7 w-full">
        <div className="text-4xl text-gray-600">{productData.name}</div>
        <div className="mt-2 text-xl font-light text-gray-400 h-12">
          {productData.description.length > 65
            ? productData.description.substring(0, 65) + "..."
            : productData.description}
        </div>
        <div className="flex mt-6">
          <Image src="/matic.png" width={25} height={25} layout="fixed" />
          <div className="text-gray-500 font-light mr-7">
            {ethers.utils.formatEther(price)}
          </div>

          <div className="flex items-center">
            <img
              src={makeBlockie(seller)}
              className="w-5 h-5 rounded-full"
              alt="Avatar"
            />
            <div className="text-gray-600 font-light ml-1">
              {seller.substring(0, 7)}...
              {seller.substring(37, seller.length)}
            </div>
          </div>
        </div>
        <button
          className="w-full mt-8 focus:outline-none"
          onClick={() => onPurchase()}
        >
          <div className="bg-blue-600 text-white rounded-full py-1 mx-16">
            {loading ? "Buying..." : "Buy Now"}
          </div>
        </button>
      </div>
    </div>
  );
}
