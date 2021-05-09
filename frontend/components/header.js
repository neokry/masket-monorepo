import { useWeb3React } from "@web3-react/core";
import { useEagerConnect } from "../hooks/useEgarConnection";
import { useRouter } from "next/router";

export default function Header() {
  const auth = useEagerConnect();
  const ctx = useWeb3React();
  const router = useRouter();

  const onProfileClick = () => {
    router.push("/profile");
  };

  const onLogoClick = () => {
    router.push("/");
  };

  return (
    <div className="flex justify-between px-10 py-5 border-b">
      <button type="button" onClick={() => onLogoClick()}>
        <div className="text-xl font-bold text-blue-500">Masket</div>
      </button>
      {ctx.account && (
        <button type="button" onClick={() => onProfileClick()}>
          <div className="text-gray-500 font-light">
            {ctx.account.substring(0, 7)}...
            {ctx.account.substring(37, ctx.account.length)}
          </div>
        </button>
      )}
    </div>
  );
}
