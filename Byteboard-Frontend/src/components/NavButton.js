import { NavLink, useResolvedPath, useMatch } from "react-router-dom";

/**
 * Nav button color details (header navigation bar)
 * @param {*} props pages
 * @returns navigation pages with color modification
 */
function NavButton(props) {
    let resolved = useResolvedPath(props.to)
    let match = useMatch({ path: resolved.pathname, end: true })


    return (
        <NavLink to={props.to}>
            <button className={`navbutton${match ? " navbutton-active" : " navbutton-inactive"}`}>
                {props.label}
            </button>
        </NavLink>
    )
}


export default NavButton