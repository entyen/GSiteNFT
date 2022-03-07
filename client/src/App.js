import { Container } from "react-bootstrap";
import ButtonCreateNFT from "./modules/buttonCreateNFT";

function App() {
  return (
    <Container>
      <video autoplay muted loop id="myVideo">
        <source src="bkgVideo.mp4" type="video/mp4" />
      </video>
      <div className="header"></div>
      <ButtonCreateNFT />
    </Container>
  );
}

export default App;
