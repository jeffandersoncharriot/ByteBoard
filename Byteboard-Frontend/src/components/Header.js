import React from "react";
import { Navbar } from "react-bootstrap";
import "./App.css";
import NavButton from "./NavButton";
import { NameForm } from "./NameForm";
import { LoggedInContext } from "./App";
import { useEffect } from "react";
import { useContext } from 'react';
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { useState } from "react";
import LogoutButton from "./LogoutButton";


/**
 * navigation bar with logo, links directs to pages
 * @returns navigation bar
 */
function Header() {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const getUserLogin = async function() {
        try {
            const requestOptions = {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }

            const result = await fetch(process.env.REACT_APP_PUBLIC_URL + "/session/getSelf");

            if (result.status === 200) {
                setLoggedIn(true);
            }
        }
        catch(error) {
            console.error(error);
        }
    }

    // useEffect(() => {
    //     getUserLogin();
    // });



    return (
        <div>
            <br />
            <Navbar id="header">
                <img id="byteboard-title-image" src={process.env.PUBLIC_URL + "/images/title.png"} alt="title" />
                <NavButton to="/home" Visit="Home" label="Home" />

                <NavButton to="/about" label="About Us" />

                <NavButton to="/contact" label="Contact Us" />

                <NavButton to="/jobs" label="Jobs" />
                <NavButton to="/profile" label="Profile" />
                <NavButton to="/settings" label="Settings" />

                <NavButton to="/" label="Login/Register" />
                <LogoutButton/>
            </Navbar>
        </div>
    )
}

export default Header;