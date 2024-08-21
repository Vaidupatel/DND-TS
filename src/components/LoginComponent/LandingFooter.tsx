import React from "react";
import "./LandingFooter.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faTwitter,
    faYoutube,
    faInstagram,
    faLinkedin,
    faPinterest,
    faGithub
} from "@fortawesome/free-brands-svg-icons";
import logo from "../../asset/NexGenTechnology.png";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-main">
                    <div className="footer-logo">
                        <Link to="/">
                            <img src={logo} alt="NexGen Sites Logo" />
                        </Link>
                    </div>
                    <div className="footer-sections">
                        <div className="footer-section">
                            <h3>Company</h3>
                            <ul>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/investors">Investors</Link></li>
                                <li><Link to="/partners">Partners</Link></li>
                                <li><Link to="/affiliates">Affiliates</Link></li>
                                <li><Link to="/legal">Legal</Link></li>
                                <li><Link to="/service-status">Service status</Link></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h3>Support</h3>
                            <ul>
                                <li><Link to="/merchant-support">Merchant support</Link></li>
                                <li><Link to="/help-center">Help center</Link></li>
                                <li><Link to="/hire-a-partner">Hire a Partner</Link></li>
                                <li><Link to="/nexgen-academy">NexGen Academy</Link></li>
                                <li><Link to="/nexgen-community">NexGen Community</Link></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h3>Developers</h3>
                            <ul>
                                <li><Link to="/nexgen-dev">NexGen.dev</Link></li>
                                <li><Link to="/api-documentation">API documentation</Link></li>
                                <li><Link to="/dev-degree">Dev Degree</Link></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h3>Products</h3>
                            <ul>
                                <li><Link to="/nexgen-plus">NexGen Plus</Link></li>
                                <li><Link to="/linkpop">Linkpop</Link></li>
                                <li><Link to="/nexgen-enterprise">NexGen for enterprise</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-secondary">
                    <div className="footer-section">
                        <h3>Global impact</h3>
                        <ul>
                            <li><Link to="/sustainability">Sustainability</Link></li>
                            <li><Link to="/social-impact">Social impact</Link></li>
                            <li><Link to="/build-black">Build Black</Link></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Solutions</h3>
                        <ul>
                            <li><Link to="/online-store-builder">Online store builder</Link></li>
                            <li><Link to="/website-builder">Website builder</Link></li>
                            <li><Link to="/ecommerce-website">Ecommerce website</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-bottom-left">
                        <select className="country-selector">
                            <option value="india">India</option>
                        </select>
                        <nav className="footer-nav">
                            <Link to="/terms">Terms of Service</Link>
                            <Link to="/privacy">Privacy Policy</Link>
                            <Link to="/sitemap">Sitemap</Link>
                            <Link to="/privacy-choices">Privacy Choices</Link>
                        </nav>
                    </div>
                    <div className="footer-bottom-right">
                        <div className="social-icons">
                            <a href="https://facebook.com" className="social-icon facebook"><FontAwesomeIcon icon={faFacebookF} /></a>
                            <a href="https://twitter.com" className="social-icon twitter"><FontAwesomeIcon icon={faTwitter} /></a>
                            <a href="https://youtube.com" className="social-icon youtube"><FontAwesomeIcon icon={faYoutube} /></a>
                            <a href="https://instagram.com" className="social-icon instagram"><FontAwesomeIcon icon={faInstagram} /></a>
                            <a href="https://linkedin.com" className="social-icon linkedin"><FontAwesomeIcon icon={faLinkedin} /></a>
                            <a href="https://pinterest.com" className="social-icon pinterest"><FontAwesomeIcon icon={faPinterest} /></a>
                            <a href="https://github.com" className="social-icon github"><FontAwesomeIcon icon={faGithub} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;