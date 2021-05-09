import { useState } from "react";
import Layout from "../components/layout";
import useMasket from "../hooks/useMasket";

export default function Profile() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const { setBuyerMetadata } = useMasket();

  const onSaveProfile = async () => {
    setLoading(true);
    await setBuyerMetadata({ name, address });
    setLoading(false);
  };

  return (
    <Layout>
      <div className="flex justify-around items-center w-full">
        <div className="w-2/5">
          <div className="mt-6 text-2xl font-light text-gray-600">
            My Profile
          </div>
          <div className="border p-5 mt-2">
            <div className="mt-2">
              <label className="text-lg text-gray-700">Name</label>
              <input
                className="bg-gray-100 p-2 w-full mt-2"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <label className="text-lg text-gray-700">Address</label>
              <textarea
                className="bg-gray-100 p-2 w-full mt-2"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="flex justify-end w-full">
              <div className="mt-6 bg-blue-500 text-white text-lg px-3 py-2">
                <button type="button" onClick={() => onSaveProfile()}>
                  {loading ? "Saving Profile..." : "Save Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
