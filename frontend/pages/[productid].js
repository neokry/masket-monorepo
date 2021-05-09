import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const IPFS_URL = "https://ipfs.io/ipfs/";

export default function ProductDetail({ metadata, price, seller }) {
  const [productData, setProductData] = useState(null);
  const router = useRouter();
  const { productid } = router.query;

  const init = async () => {
    const { data } = await axios.get(IPFS_URL + metadata);
    console.log("data", data);
    setProductData(data);
  };

  useEffect(() => init(), []);

  if (!productData) return <div></div>;

  return (
    <div className="flex">
      <img
        src={IPFS_URL + productData.image}
        className="w-1/2 object-contain"
      />
      <div className="ml-2 mt-4">
        <div className="text-6xl text-gray-600">{productData.name}</div>
        <div className="mt-2 text-2xl text-gray-400">
          {productData.description}
        </div>
        <div>{price}</div>
        <div>{seller}</div>
      </div>
    </div>
  );
}
