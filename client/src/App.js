import { Image, CardGroup, Card, Container } from "react-bootstrap";
import ButtonCreateNFT from "./modules/buttonCreateNFTT";

function App() {
  return (
    <Container>
      <video id="myVideo" autoPlay muted loop>
        <source src="bkgVideo.mp4" type="video/mp4" />
      </video>
      <Container className="header">
        <Image src="logo512.png" />
        <h3>GetExperience</h3>
      </Container>
      <Container className="main">
        <div className="button">
          <ButtonCreateNFT />
        </div>
        <div className="cont-text">
          <h4>1. Create a crypto wallet (TrustWallet,Metamask, etc.)</h4>
        </div>
        <div className="images-content-center">
          <Image className="image-home" src="home_hero.png" />
          <Image className="load-left load" src="a256x256.png" />
          <Image className="load-right load" src="g256x256.png" />
        </div>
        <div className="video-block">
          <div className="cont-text">
            <h4>VIDEO GUIDE</h4>
          </div>
          <video id="videoGuide">
            <source src="instruction.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="cont-text">
          <h4>2. Buying cryptocurrency to pay commissions on the network</h4>
        </div>
        <CardGroup>
          <Card className="text-dark">
            <Card.Body>
              <Card.Img variant="top" src="guide1.jpg" />
              <Card.Text>click on the buy button</Card.Text>
            </Card.Body>
          </Card>
          <Card className="text-dark">
            <Card.Body>
              <Card.Img variant="top" src="guide2.jpg" />
              <Card.Text>Click on the cryptocurrency MATIC</Card.Text>
            </Card.Body>
          </Card>
          <Card className="text-dark">
            <Card.Body>
              <Card.Img variant="top" src="guide9.jpg" />
              <Card.Text>
                minimum payment 50$ Click on button RAMP choose Simplex The
                balance after paying for the gas will remain in your wallet!
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="text-dark">
            <Card.Body>
              <Card.Img variant="top" src="guide3.jpg" />
              <Card.Text>choose Simplex</Card.Text>
            </Card.Body>
          </Card>
          <Card className="text-dark">
            <Card.Body>
              <Card.Img variant="top" src="guide4.jpg" />
              <Card.Text>choose payment method Card/Apple Pay</Card.Text>
            </Card.Body>
          </Card>
          <Card className="text-dark">
            <Card.Body>
              <Card.Img variant="top" src="guide5.jpg" />
              <Card.Text>
                Make a payment Wait for the receipt of funds to the account
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
        <div className="button">
          <ButtonCreateNFT />
        </div>
      </Container>
      <Container fluid="true" className="footer">
        <p>© 2022 by GetExperience © Все права защищены</p>
      </Container>
    </Container>
  );
}

export default App;
