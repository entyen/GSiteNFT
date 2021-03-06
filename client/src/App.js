import { Image, CardGroup, Card, Container } from "react-bootstrap";
import ButtonCreateNFT from "./modules/buttonCreateNFT";

function App() {
  return (
    <Container>
      <video id="myVideo" autoPlay muted loop poster="backgrounda.png">
        {/* <source src="bkgVideo.mp4" type="video/mp4" /> */}
      </video>
      <Container classNameName="header">
        <Image src="logo.svg" />
        <h3>GetExperience</h3>
      </Container>
      <Container classNameName="main">
        <div classNameName="button">
          <ButtonCreateNFT />
        </div>
        <div classNameName="cont-text">
          <h4>1. Create a crypto wallet (TrustWallet,Metamask, etc.)</h4>
        </div>
        <div classNameName="images-content-center">
          <Image classNameName="image-home" src="home_hero.png" />
          <a
            href="https://apps.apple.com/app/apple-store/id1288339409"
            target="_blank"
            rel="noreferrer"
          >
            <Image classNameName="load-left load" src="appstore-icon.svg" />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp&gl=US"
            target="_blank"
            rel="noreferrer"
          >
            <Image classNameName="load-right load" src="gplay-icon.svg" />
          </a>
        </div>
        <div classNameName="video-block">
          <div classNameName="cont-text">
            <h4>VIDEO GUIDE</h4>
          </div>
          <video id="videoGuide" controls>
            <source src="instruction.mp4" type="video/mp4" />
          </video>
        </div>
        <div classNameName="cont-text">
          <h4>2. Buying cryptocurrency to pay commissions on the network</h4>
        </div>
        <CardGroup>
          <Card classNameName="text-dark">
            <Card.Body>
              <Card.Img variant="top" src="guide1.jpg" />
              <Card.Text>click on the buy button</Card.Text>
            </Card.Body>
          </Card>
          <Card classNameName="text-dark">
            <Card.Body>
              <Card.Img variant="top" src="guide2.jpg" />
              <Card.Text>Click on the cryptocurrency MATIC</Card.Text>
            </Card.Body>
          </Card>
          <Card classNameName="text-dark">
            <Card.Body>
              <Card.Img variant="top" src="guide9.jpg" />
              <Card.Text>
                minimum payment 50$ Click on button RAMP choose Simplex The
                balance after paying for the gas will remain in your wallet!
              </Card.Text>
            </Card.Body>
          </Card>
          <Card classNameName="text-dark">
            <Card.Body>
              <Card.Img variant="top" src="guide3.jpg" />
              <Card.Text>choose Simplex</Card.Text>
            </Card.Body>
          </Card>
          <Card classNameName="text-dark">
            <Card.Body>
              <Card.Img variant="top" src="guide4.jpg" />
              <Card.Text>choose payment method Card/Apple Pay</Card.Text>
            </Card.Body>
          </Card>
          <Card classNameName="text-dark">
            <Card.Body>
              <Card.Img variant="top" src="guide5.jpg" />
              <Card.Text>
                Make a payment Wait for the receipt of funds to the account
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
        <div classNameName="button">
          <ButtonCreateNFT />
        </div>
      </Container>
      <Container fluid="true" classNameName="footer">
        <p>?? 2022 by GetExperience ?? ?????? ?????????? ????????????????</p>
      </Container>
    </Container>
  );
}

export default App;
