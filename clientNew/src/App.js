import { Image, CardGroup, Card, Container } from "react-bootstrap";
import ButtonCreateNFT from "./modules/buttonCreateNFT";

function App() {
  return (
    <div>
      <header className="head_style">
        <div>
          <img src="./img/Frame.svg" alt="" className="logo" />
        </div>
      </header>

      <div className="items__item bottom_spacer">
        <div className="items__body">
          <div className="items__label">
            <strong> GetExperience NFT Plus</strong>
          </div>
          <div className="items__text">Loyalty Program</div>
        </div>
        <div className="items__image">
          <img src="img/Iphone Mock.png" alt="" />
        </div>
      </div>

      <div className="second_box">
        <div className="title six_spacer">
          <p>
            <strong>Video Guide</strong>
          </p>
          <h1>
            Watch the ultimate video guide to Trust wallet.
          </h1>
        </div>
        <video controls poster="./img/placeholder.png">
          <source src="instruction.mp4" type="video/mp4"/>
        </video>
      </div>

      <div className="items__item">
        <div className="items__image_1">
          <img src="img/test.png" alt="" />
        </div>
        <div className="items__body_1">
          <div className="items__label">
            <strong> 1.Create a crypto wallet</strong>
          </div>
          <div className="items__text">
            (TrustWallet, Metamask, etc.)
            <br />
            <br />
            <div className="items__href">
              <a
                href="https://apps.apple.com/app/apple-store/id1288339409"
                className="silk"
                target="_blank"
                rel="noreferrer"
              >
                <img src="./img/app store.svg" alt="AppStore" />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp&gl=US"
                target="_blank"
                rel="noreferrer"
              >
                <img src="./img/googlePlay.svg" alt="GooglePlay" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="fourth_box">
        <div className="title four_spacer show_mode">
          <p>
            <strong>
              2.Buying cryptocurrency to pay commissions on the network
            </strong>
          </p>
        </div>

        <div className="img_box">
          <div className="first_img_option">
            <strong>Step 1</strong>
            <br />
            Click on the buy button
          </div>
          <img src="./img/1.jpg" alt="" className="mobile_img mobile_spacer" />
          <div className="second_img_option">
            <strong>Step 2</strong>
            <br />
            Click on the cryptocurrency MATIC
          </div>
          <img src="./img/2.jpg" alt="" className="mobile_img" />
        </div>

        <div className="img_box">
          <div className="third_img_option">
            <strong>Step 3</strong>
            <br />
            Minimum payment 50$ <br />
            Click on button RAMP choose Simplex The balance after paying for the
            gas will remain in your wallet!
          </div>
          <img src="./img/3.jpg" alt="" className="mobile_img mobile_spacer" />
          <div className="fourth_img_option">
            <strong>Step 4</strong>
            <br /> Choose Simplex
          </div>
          <img src="./img/4.jpg" alt="" className="mobile_img" />
        </div>

        <div className="img_box">
          <div className="fifth_img_option">
            <strong>Step 5</strong>
            <br />
            Choose payment method Card/ApplePay
          </div>
          <img src="./img/5.jpg" alt="" className="mobile_img mobile_spacer" />
          <div className="six_img_option">
            <strong>Step 6</strong>
            <br />
            Make a payment <br /> Wait for the receipt of funds to the account
          </div>
          <img src="./img/6.jpg" alt="" className="mobile_img" />
        </div>

        <div className="first_case">
          <p>
            <strong>
              2.Buying cryptocurrency to pay commissions on the network
            </strong>
          </p>
          <div className="step">
            <h1>
              <strong>Step 3</strong>
              <br />
              Minimum payment 50$ <br />
              Click on button RAMP choose Simplex The balance after paying for
              the gas will remain in your wallet!
            </h1>
            <img src="./img/3.jpg" alt="" className="first_imgage" />
          </div>
          <div className="step1">
            <h1>
              <strong>Step 4</strong>
              <br /> Choose Simplex
            </h1>
            <img src="./img/4.jpg" alt="" className="first_imgage" />
          </div>
        </div>
        <div className="second_case">
          <div className="step3">
            <h1>
              <strong>Step 1</strong>
              <br />
              Click on the buy button
            </h1>
            <img src="./img/1.jpg" alt="" className="first_imgage" />
          </div>
          <div className="step4">
            <h1>
              <strong>Step 2</strong>
              <br />
              Click on the cryptocurrency MATIC
            </h1>
            <img src="./img/2.jpg" alt="" className="first_imgage" />
          </div>
          <div className="step5">
            <h1>
              <strong>Step 5</strong>
              <br />
              Choose payment method Card/ApplePay
            </h1>
            <img src="./img/5.jpg" alt="" className="first_imgage" />
          </div>
          <div className="step6">
            <h1>
              <strong>Step 6</strong>
              <br />
              Make a payment <br /> Wait for the receipt of funds to the account
            </h1>
            <img src="./img/6.jpg" alt="" className="first_imgage" />
          </div>
        </div>
      </div>

      <div className="fifth_box">
        <div className="title">
          <p>
            <strong>Plans</strong>
          </p>
          <h1>
            Choose the plan that's right for you.
          </h1>
        </div>
        <div className="ffp">
          <div className="common">
            <h1>Common</h1>

            <div className="quant main_text">
              $200
              <div className="lower_text">/Limit: qty: 4000</div>
            </div>

            <div className="palochka"></div>
            <div className="variants">
              <div className="variants_text">
                <img src="./img/check.png" alt="" />
                Discount 3% with all partners
              </div>
            </div>
            <ButtonCreateNFT>common_btn</ButtonCreateNFT>
          </div>
        </div>
        <div className="ffp">
          <div className="rare">
            <h1>Epic</h1>
            <div className="quant main_text white_text">
              $1600
              <div className="lower_text">/Limit: qty: 1500</div>
            </div>
            <div className="palochka"></div>
            <div className="variants white_color">
              <div className="variants_text">
                <img src="./img/check _white.png" alt="" />
                Discount 5% with all partners
              </div>
              <div className="variants_text">
                <img src="./img/check _white.png" alt="" />
                Event Access
              </div>
              <div className="variants_text">
                <img src="./img/check _white.png" alt="" />
                Activities to earn
              </div>
            </div>
            <ButtonCreateNFT>rare_btn</ButtonCreateNFT>
          </div>
        </div>
        <div className="ffp">
          <div className="legendary">
            <h1>Legendary</h1>
            <div className="quant main_text">
              $3000
              <div className="lower_text">/Limit: qty: 1000</div>
            </div>
            <div className="palochka"></div>
            <div className="variants">
              <div className="variants_text">
                <img src="./img/check.png" alt="" />
                Discount 10% with all partners
              </div>
              <div className="variants_text">
                <img src="./img/check.png" alt="" />
                Closed Parties
              </div>

              <div className="variants_text">
                <img src="./img/check.png" alt="" />
                VIP Event Access
              </div>

              <div className="variants_text">
                <img src="./img/check.png" alt="" />
                Activities to earn
              </div>

              <div className="variants_text">
                <img src="./img/check.png" alt="" />
                Free products/services
              </div>

              <div className="variants_text">
                <img src="./img/check.png" className="variant_img" alt="" />
                Opportunity to participate in Mystery NFT collection draws
              </div>
            </div>
            <ButtonCreateNFT>legendary_btn</ButtonCreateNFT>
          </div>
        </div>
      </div>
      <div className="six_box">
        <div className="title six_spacer">
          <p>
            <strong>Partners</strong>
          </p>
          <h1>
            Get the best discounts and personal offers from our partners using GetExperience NFT Plus Loyalty Program.
          </h1>
        </div>
        <div className="partners">
          <div className="partner_name">
            <img src="./img/Frame1.png" className="" alt="" />
          </div>
          <div className="partner_name">
            <img src="./img/Frame2.png" className="" alt="" />
          </div>
          <div className="partner_name">
            <img src="./img/Frame3.png" className="" alt="" />
          </div>
        </div>
      </div>
      <footer>© 2022 by GetExperience · © All rights reserved </footer>
    </div>
  );
}

export default App;
