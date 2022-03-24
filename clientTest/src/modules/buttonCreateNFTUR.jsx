import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectMeta, connectWc } from "./redux/blockchain/blockchainActions";
import { Modal } from "react-bootstrap";
import * as s from "./styles/globalStyles";

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const [checkNft, setChekingNft] = useState(false);
  const [feedback, setFeedback] = useState(
    `Click GET DISCOUNT to get your DISCOUNT.`
  );

  const getDiscount = () => {
    setFeedback(`Scaning your Discount...`);
    setChekingNft(true);
    blockchain.smartContract.methods
      .walletOfOwner(blockchain.account)
      .call() // Запрос НФТ которыми владеет человек https://web3js.readthedocs.io/en/v1.7.1/web3-eth-contract.html#methods
      .then(async (arr) => {
        const mass = []; // Массив НФТ
        if (!arr[0]) {
          setFeedback(`No Discounts`);
          setChekingNft(false);
          return;
        } // Проверка наличия НФТ
        for (let i = 0; i < arr.length; i++) {
          let sortMass = "";
          sortMass = await blockchain.smartContract.methods
            .tokenURI(arr[i])
            .call(); 
          mass.push(sortMass.replace("ipfs://", "https://ipfs.io/ipfs/"));
        } // Перебор НФТ получение URI и замена начала
        const discounts = []; // Массив Скидок
        let requests = mass.map((url) => fetch(url)); // Запрос JSON файлов НФТшек
        Promise.all(requests)
          .then((responses) => Promise.all(responses.map((r) => r.json())))
          .then((jsondata) => {
            jsondata.forEach((data) => {
              discounts.push(
                +data.attributes
                  .find((dis) => dis.trait_type == "Discount")
                  .value.split("%")[0]
              );
            });
            const maxDisc = Math.max(...discounts);
            if (maxDisc > 10 || maxDisc < 0) return null
            return maxDisc; // Получение максимальной скидки из массива
          })
          .then((d) => {
            setFeedback(`Your Discount ${d}%`);
            setChekingNft(false);
            console.log(d); // Отображение скидки
          })
          .catch((e) => console.log(e));

        console.dir(mass);
        console.log(blockchain);
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
