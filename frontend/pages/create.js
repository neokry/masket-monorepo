import { useState } from "react";
import Layout from "../components/layout";
import useMasket from "../hooks/useMasket";

export default function Create() {
  const [img, setImg] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [seller, setSeller] = useState("");
  const [loading, setLoading] = useState(false);

  const { createProduct } = useMasket();

  const onCreateProduct = async () => {
    setLoading(true);
    await createProduct(img, name, desc, price, seller);
    setLoading(false);
  };

  return (
    <Layout>
      <div className="flex justify-around items-center w-full">
        <div className="w-2/5">
          <div className="mt-6 text-2xl font-light text-gray-600">
            Create Product
          </div>
          <div className="border p-5 mt-2">
            <div>
              <label className="text-lg text-gray-700">Upload Image</label>
              <br />
              <input
                className="mt-2"
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>

            <div className="mt-6">
              <label className="text-lg text-gray-700">Name</label>
              <input
                className="bg-gray-100 p-2 w-full mt-2"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <label className="text-lg text-gray-700">Description</label>
              <textarea
                className="bg-gray-100 p-2 w-full mt-2"
                placeholder="Enter Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <label className="text-lg text-gray-700">Price</label>
              <input
                className="bg-gray-100 p-2 w-full mt-2"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <label className="text-lg text-gray-700">Seller Address</label>
              <input
                className="bg-gray-100 p-2 w-full mt-2"
                placeholder="Enter Seller Address"
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
              />
            </div>

            <div className="flex justify-end w-full">
              <div className="mt-6 bg-blue-500 text-white text-lg px-3 py-2">
                <button type="button" onClick={() => onCreateProduct()}>
                  {loading ? "Creating Product..." : "Create Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
