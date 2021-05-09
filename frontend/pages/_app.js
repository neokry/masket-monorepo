import "tailwindcss/tailwind.css";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import Header from "../components/header";

function MyApp({ Component, pageProps }) {
  const getLibrary = (provider, connector) => {
    return new Web3Provider(provider);
  };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default MyApp;
