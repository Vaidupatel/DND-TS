import "./LandingHero.css";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section id="home">
            <div className="hero-content">
                <div className="HeroGreet">
                    <h2>Welcome to <span>NexGen Sites</span></h2>
                    <span>Generate Website in a smarter way</span>
                    <Link to={"/documentation"} className="HeroStartButton">
                        Get Started! &rarr;
                    </Link>
                </div>
            </div>
            {/* <div className="background-logo">
                <div className="logo-container">
                    <div className="arc-container">
                        <img src={arc} alt="Arc" className="arc" />
                    </div>
                    <div className="globe-container">
                        <img src={globe} alt="Globe" className="globe" />
                    </div>
                </div>
            </div> */}
        </section>
    );
};

export default Hero;