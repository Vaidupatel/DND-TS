import React from 'react'

const CanvasToolBar = () => {
    const canvasNav = styles[0].canvasNav;
    return (
        <nav style={canvasNav} >CanvasToolBar</nav>
    )
}

export default CanvasToolBar

const styles: {
    canvasNav?: React.CSSProperties
}[] = [
        {
            canvasNav: {
                backgroundColor: "#176971",
                width: "100%",
                height: "10vh",
                color: "#FFF",
                display: "grid",
                placeItems: "center"
            }
        }
    ]