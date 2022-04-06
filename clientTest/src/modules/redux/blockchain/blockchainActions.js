// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
// wallet connect
import WalletConnectProvider from "@walletconnect/web3-provider";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connectWc = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    // Подключение ABI и Конфигураций контракта
    const abiResponse = await fetch("/config/abi.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const abi = await abiResponse.json();
    const ContractAddress = "0x28F65f5c80F56611aA4DaF2D44089128AF83C407";
    // Подключение ABI и Конфигураций контракта
    const provider = new WalletConnectProvider({
      // Сети подключение для провайдера https://docs.walletconnect.com/quick-start/dapps/web3-provider
      rpc: {
        137: "https://polygon-rpc.com/",
        80001: "https://matic-mumbai.chainstacklabs.com",
      },
    });
    try {
      await provider.enable(); // Включение провайдера (Вызывает QR Окно для Авторизации)
      Web3EthContract.setProvider(provider); // Подключение к провайдеру
      let web3 = new Web3(provider); // Инициализация провайдера
      const accounts = await web3.eth.getAccounts(); // Запрос Аккаунта
      const chainId = await web3.eth.getChainId(); // Запрос Сети
      // Проверка в какой сети пользователь
      if (chainId === "137" || chainId === "80001") {
        const SmartContractObj = new Web3EthContract(abi, ContractAddress);
        dispatch(
          connectSuccess({
            account: accounts[0],
            smartContract: SmartContractObj,
            web3: web3,
          })
        ); // Возврат данных при успешном подключении

        // Слушатели смены аккаунта, сети, диссконекта
        provider.on("accountsChanged", (accounts) => {
          dispatch(updateAccount(accounts[0]));
        });
        provider.on("chainChanged", () => {
          window.location.reload();
        });
        provider.on("disconnect", (code, reason) => {
          dispatch(connectFailed(reason));
        });
        // Конец слушателей
      } else {
        dispatch(connectFailed(`Change network to Polygon.`));
      }
    } catch (e) {
      dispatch(connectFailed(e.message));
    }
  };
};

export const connectMeta = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    const abiResponse = await fetch("/config/abi.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const abi = await abiResponse.json();
    const ContractAddress = "0x28F65f5c80F56611aA4DaF2D44089128AF83C407";
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const chainId = await ethereum.request({
          method: "net_version",
        });
        if (chainId === "137" || chainId === "80001") {
          const SmartContractObj = new Web3EthContract(abi, ContractAddress);
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
            })
          );
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          ethereum.on("disconnect", (code, reason) => {
            dispatch(connectFailed(reason));
          });
          // Add listeners end
        } else {
          dispatch(connectFailed(`Change network to Polygon.`));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
  };
};
