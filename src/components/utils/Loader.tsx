import React from "react";


const Loader = () => {
    return (<div className="loader" style={{
        display: "block",
        margin: "auto",
        border: "10px solid #f3f3f3",
        borderTop: "10px solid #3498db",
        borderRadius: "50%",
        width: "80px",
        height: "80px",
        animation: "spin 1s linear infinite"
    }}/>)
}

export default Loader;