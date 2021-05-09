import useIPFS from "./useIPFS";
const baseURL = "https://ipfs.io/ipfs/";

export default function useTokenMetadata() {
  const ipfs = useIPFS();

  const upload = async (data) => {
    const imgPath = await ipfs.uploadFile(data.image);

    const tokenData = {
      name: data.name,
      description: data.description,
      image: imgPath,
    };

    const tokenDataPath = await ipfs.uploadObject(tokenData);
    console.log("final token hash", tokenDataPath);
    return tokenDataPath;
  };

  return { upload };
}
