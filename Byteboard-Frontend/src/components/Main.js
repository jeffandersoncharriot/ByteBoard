import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu"
import { useState } from "react"
import TwoPanes from "./TwoPanes";
import "./Menu.css"

/**
 * @returns The main page of the app
 */
function Main() {
    const defaultRightPane = 
    <div className="menuDisplay">
    <p>Welcome to our byteboard app!</p>
    </div>

    const [rightPane, setRightPane] = useState(defaultRightPane);

    const defaultLeftPane = <Menu setDisplay={setRightPane} />;
    const [leftPane, setLeftPane] = useState(defaultLeftPane);


    return (
        <div> 
            <Header />
            <TwoPanes leftPane={leftPane} rightPane={rightPane} />
            <Footer/>
        </div>
    );

}

export default Main;