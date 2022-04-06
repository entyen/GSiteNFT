import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import * as s from "./styles/globalStyles";
// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
// wallet connect
import WalletConnectProvider from "@walletconnect/web3-provider";

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const [checkNft, setChekingNft] = useState(false);
  const [feedback, setFeedback] = useState(
    `Click GET DISCOUNT to get your DISCOUNT.`
  );

  const connectMeta = () => {
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

  const updateAccount = (account) => {
    return async (dispatch) => {
      dispatch(updateAccountRequest({ account: account }));
    };
  };

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

  const connectWc = () => {
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
        console.log(chainId)
        if (chainId === 137 || chainId === 80001) {
          const SmartContractObj = new Web3EthContract(abi, ContractAddress);
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
            })
          ); // Возврат данных при успешном подключения

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

  const getDiscount = () => {
    setFeedback(`Scaning your Discount...`);
    setChekingNft(true);
    blockchain.smartContract.methods
      .walletOfOwner(blockchain.account)
      .call() // Запрос NFT которыми владеет человек https://web3js.readthedocs.io/en/v1.7.1/web3-eth-contract.html#methods
      .then(async (arr) => {
        const mass = []; // Массив NFT
        if (!arr.length) {
          setFeedback(`No Discounts`);
          setChekingNft(false);
          return;
        } // Проверка наличия NFT
        for (let i = 0; i < arr.length; i++) {
          let sortMass = "";
          sortMass = await blockchain.smartContract.methods
            .tokenURI(arr[i])
            .call();
          mass.push(sortMass.replace("ipfs://", "https://ipfs.io/ipfs/"));
        } // Перебор NFT получение URI и замена начала
        const discounts = []; // Массив Скидок
        let requests = mass.map((url) => fetch(url)); // Запрос JSON файлов NFT
        Promise.all(requests)
          .then((responses) => Promise.all(responses.map((r) => r.json())))
          .then((jsondata) => {
            jsondata.forEach((data) => {
              discounts.push({
                id: data.name.split("#")[1],
                percent: data.attributes.find(
                  (dis) => dis.trait_type === "Discount"
                ).value,
              });
            });
            discounts.sort((a, b) => {
              return b.percent - a.percent;
            });
            return discounts[0]; // Получение максимальной скидки из массива
          })
          .then((d) => {
            setFeedback(`Your Discount ${d.percent}%`);
            setChekingNft(false);
            console.log(`id: ${d.id}`); // Отображение айди NFT
            console.log(`percent: ${d.percent}`); // Отображение скидки
          })
          .catch((e) => console.log(e));

        console.dir(mass);
        console.log(blockchain.account);
      });
  };

  useEffect(() => {}, [blockchain.account]);

  const [showMod, setShowMod] = useState(false);

  const handleClose = () => setShowMod(false);
  const handleShow = () => setShowMod(true);

  return (
    <s.Container
      flex={2}
      style={{
        backgroundColor: "var(--accent)",
        padding: 24,
        borderRadius: 24,
        border: "0px dashed var(--secondary)",
      }}
    >
      <Modal show={showMod} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Wallet</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <s.StyledButtonWeb3
            onClick={(e) => {
              e.preventDefault();
              dispatch(connectMeta());
              handleClose();
            }}
          >
            <img src="metamask-logo.svg" className="rounded me-2" alt="" />
            <strong>MetaMask</strong>
          </s.StyledButtonWeb3>
          <s.SpacerSmall />
          <s.StyledButtonWeb3
            onClick={(e) => {
              e.preventDefault();
              dispatch(connectWc());
              handleClose();
            }}
          >
            <img src="walletconnect-logo.svg" className="rounded me-2" alt="" />
            <strong>WalletConnect</strong>
          </s.StyledButtonWeb3>
        </Modal.Body>
      </Modal>
      {
        <>
          {blockchain.account === "" || blockchain.smartContract === null ? (
            <s.Container ai={"center"} jc={"center"}>
              <s.StyledButton onClick={handleShow}>DISCOUNT</s.StyledButton>
              {blockchain.errorMsg !== "" ? blockchain.errorMsg : null}
            </s.Container>
          ) : (
            <>
              <s.TextDescription
                style={{
                  textAlign: "center",
                }}
              >
                {feedback}
              </s.TextDescription>
              <s.Container ai={"center"} jc={"center"} fd={"row"}>
                <s.StyledButton
                  disabled={checkNft ? 1 : 0}
                  onClick={(e) => {
                    e.preventDefault();
                    getDiscount();
                  }}
                >
                  {checkNft ? "BUSY" : "GET DISCOUNT"}
                </s.StyledButton>
              </s.Container>
            </>
          )}
        </>
      }
    </s.Container>
  );
}

export default App;
