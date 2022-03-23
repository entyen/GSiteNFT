import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectMeta, connectWc } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import {
  Row,
  Col,
  Toast,
  ToastContainer,
  Button,
  Modal,
} from "react-bootstrap";
import * as s from "./styles/globalStyles";

function AlertCustom(msg) {
  const [show, setShow] = useState(true);

  return (
    <Row>
      <Col xs={6}>
        <ToastContainer position="top-start" className="p-3 position-fixed">
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={4000}
            autohide
          >
            <Toast.Header>
              <img
                src="favicon.ico"
                className="rounded me-2 alert-logo"
                alt=""
              />
              <strong className="me-auto">GEXP</strong>
            </Toast.Header>
            <Toast.Body>{msg.children}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
    </Row>
  );
}

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click MING GIFT to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    MAX_MINT: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    // let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    // let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    // console.log("Cost: ", totalCostWei);
    // console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    // setClaimingNft(true);
    blockchain.smartContract.methods
      .walletOfOwner(blockchain.account)
      .call()
      .then(async (arr) => {
        const mass = [];
        const discounts = [];
        for (let i = 0; i < arr.length; i++) {
          let sortMass = "";
          sortMass = await blockchain.smartContract.methods
            .tokenURI(arr[i])
            .call();
          mass.push(sortMass.replace("ipfs://", "https://ipfs.io/ipfs/"));
        }
        mass.forEach((x, y, z) =>
          fetch(mass[y])
            .then((res) => res.json())
            .then((out) => {
              console.log(
                +out.attributes
                  .find((dis) => dis.trait_type == "Discount")
                  .value.split("%")[0]
              );
            })
            .catch((err) => console.log(err))
        )
        // discounts.sort((a, b) => {
        //   return b - a;
        // });
        console.dir(mass);
      });
    // blockchain.smartContract.methods
    //   .mint()
    //   .send({
    //     gasLimit: String(totalGasLimit),
    //     to: CONFIG.CONTRACT_ADDRESS,
    //     from: blockchain.account,
    //     value: totalCostWei,
    //   })
    //   .once("error", (err) => {
    //     console.log(err);
    //     setFeedback("Sorry, something went wrong please try again later.");
    //     setClaimingNft(false);
    //   })
    //   .then((receipt) => {
    //     console.log(receipt);
    //     setFeedback(
    //       `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
    //     );
    //     setClaimingNft(false);
    //     dispatch(fetchData(blockchain.account));
    //   });
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

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
              getData();
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
              getData();
              handleClose();
            }}
          >
            <img src="walletconnect-logo.svg" className="rounded me-2" alt="" />
            <strong>WalletConnect</strong>
          </s.StyledButtonWeb3>
        </Modal.Body>
      </Modal>
      {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
        <>
          <s.TextTitle
            style={{ textAlign: "center", color: "var(--accent-text)" }}
          >
            The sale has ended.
          </s.TextTitle>
          <s.TextDescription
            style={{ textAlign: "center", color: "var(--accent-text)" }}
          >
            You can still find {CONFIG.NFT_NAME} on
          </s.TextDescription>
          <s.SpacerSmall />
          <s.StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
            {CONFIG.MARKETPLACE}
          </s.StyledLink>
        </>
      ) : (
        <>
          {blockchain.account === "" || blockchain.smartContract === null ? (
            <s.Container ai={"center"} jc={"center"}>
              <s.StyledButton onClick={handleShow}>GET NFT GIFT</s.StyledButton>
              {blockchain.errorMsg !== "" ? (
                <AlertCustom>{blockchain.errorMsg}</AlertCustom>
              ) : null}
            </s.Container>
          ) : (
            <>
              <s.TextDescription
                style={{
                  textAlign: "center",
                  // color: "var(--accent-text)",
                }}
              >
                {feedback}
              </s.TextDescription>
              <s.Container ai={"center"} jc={"center"} fd={"row"}>
                <s.StyledButton
                  disabled={claimingNft ? 1 : 0}
                  onClick={(e) => {
                    e.preventDefault();
                    claimNFTs();
                    getData();
                  }}
                >
                  {claimingNft ? "BUSY" : "MINT GIFT"}
                </s.StyledButton>
              </s.Container>
            </>
          )}
        </>
      )}
    </s.Container>
  );
}

export default App;
