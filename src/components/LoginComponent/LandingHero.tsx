import { Link } from "react-router-dom";
import WebStudio from '../../asset/WebStudio.png'
import "./LandingHero.css";

const Hero = () => {
    return (
        <section id="home">
            <div className="hero-content">
                <div className="HeroGreet">
                    <h2>Welcome to <span>Web Studio</span></h2>
                    <span>Generate Website in a smarter way</span>
                    <Link to={"/documentation"} className="HeroStartButton">
                        Get Started! &rarr;
                    </Link>
                </div>
            </div>
            <div className="background-logo">

                <img src={WebStudio} alt="Arc" className="arc" />

            </div>
        </section>
    );
};

export default Hero;