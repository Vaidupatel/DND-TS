import React from 'react'
import "./NavBar.css"
const NavBar = () => {
    const navStyle = styles[0].nav;
    const navLogoStyle = styles[0].navLogo;
    return (
        <nav style={navStyle} className='nav-top'>
            <ul>
                <li>
                    <button style={navLogoStyle}><a href="">Logo</a></button>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar

const styles: {
    nav?: React.CSSProperties;
    navLogo?: React.CSSProperties
}[] = [
        {
            nav: {
                width: "100vw", height: "10vh", backgroundColor: '#555', color: '#f5f5f5', padding: '0.5rem', display: "flex"
            },
            navLogo: { backgroundColor: "transparent", border: "1px solid #fff", fontSize: "1rem", padding: "0.5rem", borderRadius: "0.5rem", cursor: "pointer" }
        },
    ];