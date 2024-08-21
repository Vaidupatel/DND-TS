import React, { useEffect, useState } from "react";
import "./LandingGoToTop.css";


const GoToTop = () => {
    const [showButton, setShowButton] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <React.Fragment>
            {showButton && (
                <button className="floating-action-button" onClick={scrollToTop}>
                    {/* <FontAwesomeIcon icon={faArrowUp} /> */}
                    &uarr;
                </button>
            )}
        </React.Fragment>
    );
};

export default GoToTop;