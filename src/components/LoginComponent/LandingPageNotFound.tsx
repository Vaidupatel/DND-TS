import "./LandingPageNotFound.css";

const PageNotFound = () => {
    return (
        <div className="container">
            <div className="background-text">
                <div className="text-row">404 - PAGE NOT FOUND 404 - PAGE NOT FOUND 404 - PAGE NOT FOUND</div>
                <div className="text-row">404 - PAGE NOT FOUND 404 - PAGE NOT FOUND 404 - PAGE NOT FOUND</div>
                <div className="text-row">404 - PAGE NOT FOUND 404 - PAGE NOT FOUND 404 - PAGE NOT FOUND</div>
            </div>
            <div className="content">
                <h1 className="heading">404</h1>
                <p className="message">Oops! The page you're looking for has gone missing.</p>
            </div>
        </div>
    );
};

export default PageNotFound;