import { Button } from "react-bootstrap";
import { useMetaMask, MetaMaskProvider } from "metamask-react";
import { isMobile } from "react-device-detect";

function ChainParse(id) {
  let name = "";
  if (id === "0x89") {
    name = "Polygon";
  } else if (id === "0x1") {
    name = "Ethereum";
  } else {
    name = id;
  }
  return name;
}

function AccountParse(account) {
  const as = `${account.slice(0, 6)}***${account.slice(-4)}`;
  return as;
}

function install() {
  window.open("https://metamask.app.link/dapp/grk.pw", "_blank");
}

function App() {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const changeChain = async () => {
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x312" }],
      });
    } catch (e) {
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x89",
            chainName: "Polygon",
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            rpcUrls: ["https://polygon-rpc.com/"],
            blockExplorerUrls: ["https://polygonscan.com/"],
          },
        ],
      });
    }
  };

  if (status === "initializing")
    return (
      <Button className="MetaMask">
        Synchronisation with MetaMask ongoing...
      </Button>
    );

  if (status === "unavailable") {
    if (isMobile) {
      return <Button onClick={install}>Open in MetaMask App</Button>;
    } else {
      return <Button onClick={install}>Install MetaMask</Button>;
    }
  }

  if (status === "notConnected")
    return <Button onClick={connect}>Connect to MetaMask</Button>;

  if (status === "connecting")
    return (
      <Button className="MetaMask" disabled="true">
        Connecting...
      </Button>
    );

  if (status === "connected")
    if (chainId === "0x89") {
      return (
        null
        // <Button className={`MetaMask-${chainId}`} disabled="true">
        //   Account {AccountParse(account)} on chain {ChainParse(chainId)}
        // </Button>
      );
    } else {
      return (
        <Button
          onClick={changeChain}
          variant="danger"
          className={`MetaMask-${chainId}`}
        >
          Change chain to Polygon Mainnet
        </Button>
      );
    }

  return null;
}

const Navigation = () => {
  return (
    <MetaMaskProvider>
      <App />
    </MetaMaskProvider>
  );
};

export default Navigation;
