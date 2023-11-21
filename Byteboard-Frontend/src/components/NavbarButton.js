import React from "react";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

const body = getComputedStyle(document.body);

//color details
const ColourButton = styled(Button)(({ theme }) => ({
    backgroundColor: body.getPropertyValue('--colour-primary'),
    color: "white",
    fontFamily: getComputedStyle(document.body).getPropertyValue('--font-primary'),
    fontSize: "xx-large",
    textTransform: "none",
    horizontalAlignment: "right",

    '&:hover': {
        backgroundColor: body.getPropertyValue('--colour-secondary'),
    }
  }));


/**
 * Navigation bar button
 * @param {function} props.onClick The function to call when the button is clicked
 * @param {string} props.buttonText The text to display on the button
 * @returns A button for the navbar
 */
function NavbarButton(props) {
    return (
        <button className="btn-navbar" onClick={props.onClick}>{props.buttonText}</button>
    );
}

export default NavbarButton;