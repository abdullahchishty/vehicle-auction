import React, { useState } from "react";
import "./footer.scss";
import logo from "../../assets/images/logo.svg";
import facebook from "../../assets/images/facebook.svg";
import twitter from "../../assets/images/twitter.svg";
import instagram from "../../assets/images/instagram.svg";
import linkedin from "../../assets/images/linkedin.svg";
import { Link } from "react-router-dom";

function Footer() {
  const [companyOpen, setCompanyOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [vehiclesOpen, setVehiclesOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);

  return (
    <footer>
      <div className="footer-container desktop-footer">
        <div className="footer-section logo-section left-logo-section">
          <img src={logo} alt="Alshams Corporation Logo" />

          <Link
            to="https://wa.me/+818020554445"
            target="_blank"
            className="whatsapp footer-link"
          >
            +81 80-2055-4445
          </Link>

          <Link to="mailto:alshams123@gmail.com" className="email footer-link">
            info@alshamscorporation.com
          </Link>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-ul">
            <li className="footer-li">
              <Link className="footer-link" to="/">
                Home
              </Link>
            </li>
            <li className="footer-li">
              <Link className="footer-link" to="/listings/inventory">
                Vehicles
              </Link>
            </li>
            {/* <li className="footer-li">
              <Link className="footer-link" to="#">
                Machinery
              </Link>
            </li> */}
            <li className="footer-li">
              <Link className="footer-link" to="/about-us">
                About Us
              </Link>
            </li>
            <li className="footer-li">
              <Link className="footer-link" to="/contact-us">
                Contact Us
              </Link>
            </li>
            {/* <li className="footer-li">
              <Link className="footer-link" to="#">
                Verify Auction Sheet
              </Link>
            </li> */}
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Our Brands</h4>
          <ul className="footer-ul">
            <li className="footer-li">
              <Link className="footer-link" to="#">
                Toyota
              </Link>
            </li>
            <li className="footer-li">
              <Link className="footer-link" to="#">
                Porsche
              </Link>
            </li>
            <li className="footer-li">
              <Link className="footer-link" to="#">
                Audi
              </Link>
            </li>
            <li className="footer-li">
              <Link className="footer-link" to="#">
                BMW
              </Link>
            </li>
            <li className="footer-li">
              <Link className="footer-link" to="#">
                Ford
              </Link>
            </li>
            <li className="footer-li">
              <Link className="footer-link" to="#">
                Nissan
              </Link>
            </li>
            <li className="footer-li">
              <Link className="footer-link" to="#">
                Peugeot
              </Link>
            </li>
            <li className="footer-li">
              <Link className="footer-link" to="#">
                Volkswagen
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Vehicles Type</h4>
          <ul className="footer-ul">
            <li className="footer-li">
              <Link className="footer-link" to="#">
                Sedan
              </Link>
            </li>
            <li className="footer-li">
              <Link className="footer-link" to="#">
                Hatchback
              </Link>
            </li>
            <li className="footer-li">
              <Link className="footer-link" to="#">
                SUV
              </Link>
            </li>
            <li className="footer-li">
              <Link className="footer-link" to="#">
                Hybrid
              </Link>
            </li>
            <li className="footer-li">
              <Link className="footer-link" to="#">
                Electric
              </Link>
            </li>
            <li className="footer-li">
              <Link className="footer-link" to="#">
                Coupe
              </Link>
            </li>
            <li className="footer-li">
              <Link className="footer-link" to="#">
                Truck
              </Link>
            </li>
            <li className="footer-li">
              <Link className="footer-link" to="#">
                Convertible
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section social-media">
          <h4 className="footer-heading">Connect With Us</h4>
          <div className="social-media-icons">
            <Link className="footer-link" to="https://www.facebook.com/share/gamMWVgesQRAmCfM/" target="_blank">
              <img style={{ width: "10px" }} src={facebook} alt="Facebook" />
            </Link>
            <Link className="footer-link" to="https://www.instagram.com/alshams.cars?igsh=bnBrcmV0dTZnNzkx" target="_blank">
              <img style={{ width: "19px" }}  className="footer-link-insta" src={instagram} alt="Instagram" />
            </Link>
          </div>
        </div>
        <div className="footer-section logo-section right-logo-section">
          <img src={logo} alt="Alshams Corporation Logo" />

          <Link
            to="https://wa.me/+818020554445"
            target="_blank"
            className="whatsapp footer-link"
          >
            +81 80-2055-4445
          </Link>

          <Link to="mailto:alshams123@gmail.com" className="email footer-link">
            alshams123@gmail.com
          </Link>
        </div>
      </div>

      <div className="footer-container mobile-footer">
        <div className="footer-section logo-section left-logo-section">
          <img src={logo} alt="Alshams Corporation Logo" />
          <div className="mobile-contact-links">
            <Link
              to="https://wa.me/+818020554445"
              target="_blank"
              className="whatsapp footer-link"
            >
              +81 80-2055-4445
            </Link>

            <Link
              to="mailto:alshams123@gmail.com"
              className="email footer-link"
            >
              alshams123@gmail.com
            </Link>
          </div>
        </div>
        <div className="footer-section">
          <h4
            className="footer-heading"
            onClick={() => setCompanyOpen(!companyOpen)}
          >
            Company
          </h4>
          {companyOpen && (
            <ul className="footer-ul">
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  Home
                </Link>
              </li>
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  Vehicles
                </Link>
              </li>
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  Machinery
                </Link>
              </li>
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  About Us
                </Link>
              </li>
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  Contact Us
                </Link>
              </li>
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  Verify Auction Sheet
                </Link>
              </li>
            </ul>
          )}
        </div>

        <div className="footer-section">
          <h4
            className="footer-heading"
            onClick={() => setBrandsOpen(!brandsOpen)}
          >
            Our Brands
          </h4>
          {brandsOpen && (
            <ul className="footer-ul">
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  Toyota
                </Link>
              </li>
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  Porsche
                </Link>
              </li>
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  Audi
                </Link>
              </li>
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  BMW
                </Link>
              </li>
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  Ford
                </Link>
              </li>
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  Nissan
                </Link>
              </li>
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  Peugeot
                </Link>
              </li>
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  Volkswagen
                </Link>
              </li>
            </ul>
          )}
        </div>

        <div className="footer-section">
          <h4
            className="footer-heading"
            onClick={() => setVehiclesOpen(!vehiclesOpen)}
          >
            Vehicles Type
          </h4>
          {vehiclesOpen && (
            <ul className="footer-ul">
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  Sedan
                </Link>
              </li>
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  Hatchback
                </Link>
              </li>
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  SUV
                </Link>
              </li>
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  Hybrid
                </Link>
              </li>
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  Electric
                </Link>
              </li>
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  Coupe
                </Link>
              </li>
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  Truck
                </Link>
              </li>
              <li className="footer-li">
                <Link className="footer-link" to="#">
                  Convertible
                </Link>
              </li>
            </ul>
          )}
        </div>

        <div className="footer-section social-media">
          <h4
            className="footer-heading"
            onClick={() => setSocialOpen(!socialOpen)}
          >
            Connect With Us
          </h4>
          {socialOpen && (
            <div className="social-media-icons">
              <Link className="footer-link" to="#">
                <img src={facebook} alt="Facebook" />
              </Link>
              <Link className="footer-link" to="#">
                <img src={twitter} alt="Twitter" />
              </Link>
              <Link className="footer-link" to="#">
                <img src={instagram} alt="Instagram" />
              </Link>
              <Link className="footer-link" to="#">
                <img src={linkedin} alt="Linkedin" />
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-paragraph">
          © 2024 Al Shams Corporation. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
