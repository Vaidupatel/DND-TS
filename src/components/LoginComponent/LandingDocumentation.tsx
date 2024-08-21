import React, { useEffect } from "react";
import "./LandingDocumentation.css";
import { HashLink as Link } from "react-router-hash-link";
import { useLocation } from "react-router-dom";
import documentationData from "../../asset/Documenation.json";

const Documentation = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.slice(1));
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    const renderContent = (content: string | string[]) => {
        if (Array.isArray(content)) {
            return (
                <ul>
                    {content.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            );
        }
        return <p>{content}</p>;
    };

    const renderSubsections = (subsections: { title: string; content: string | string[] }[]) => {
        return subsections.map((subsection, index) => (
            <div key={index} className="subsection">
                <h4>{subsection.title}</h4>
                {renderContent(subsection.content)}
            </div>
        ));
    };

    const renderSections = () => {
        return documentationData.sections.map((section, index) => (
            <div key={index} id={`${section.id}`} className="section">
                <h3>{section.title}</h3>
                {section.content && renderContent(section.content)}
                {section.subsections && renderSubsections(section.subsections)}
            </div>
        ));
    };

    return (
        <React.Fragment>
            <section id="documentation">
                <div className="documentation-container">
                    <header className="documentation-header">
                        <h2>{documentationData.title}</h2>
                    </header>
                    <section className="documentation-content">
                        <nav className="table-of-contents">
                            <h3>Table of Contents</h3>
                            {Object.entries(documentationData.TableOfContents).map(([id, content]) => (
                                <Link smooth to={`#${id}`} key={id}>
                                    {content}
                                </Link>
                            ))}
                            <Link to={"/signup"}>Get Started &rarr;</Link>
                            <Link to={"/"}>Home</Link>
                        </nav>
                        <main className="main-content">{renderSections()}</main>
                    </section>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Documentation;