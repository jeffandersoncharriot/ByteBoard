import { useState } from "react"
import TwoPanes from "../components/TwoPanes";
import React from "react";
import Menu from "../components/Menu"
import "../components/App.css"

/**
 * Main function for user interaction left pane for buttons, right panes for forms and display
 * @returns user home page
 */
function Main() {
    const defaultRightPane =
        <div className="menuDisplay">
            <p>Welcome to our byteboard app!</p>
        </div>

    const [rightPane, setRightPane] = useState(defaultRightPane);

    const defaultLeftPane = <Menu className="menuDisplay" setDisplay={setRightPane} />;
    const [leftPane, setLeftPane] = useState(defaultLeftPane);

 
    return (
        <div>

            <TwoPanes leftPane={leftPane} rightPane={rightPane} />

        </div>
    );

}

export default Main