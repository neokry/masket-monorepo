import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Product from "../components/product";
import { getProducts } from "../data/functions";
import { useEagerConnect } from "../hooks/useEgarConnection";

export default function Home() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  const init = async () => {
    setLoading(true);
    const req = await getProducts();
    setProducts(req);
    setLoading(false);
  };

  useEffect(() => init(), []);

  if (loading || !products) return <Layout></Layout>;

  return (
    <Layout>
      <div className="flex flex-wrap w-full">
        {products.map((product) => (
          <div className="w-1/2 p-6">
            <Product
              key={product.id}
              metadata={product.metadata}
              price={product.price}
              seller={product.seller.id}
              productId={product.id}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
}
