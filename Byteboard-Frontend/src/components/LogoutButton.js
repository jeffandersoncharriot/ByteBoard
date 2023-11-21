
import { useNavigate } from "react-router-dom"

import { Button } from "react-bootstrap";

/**
 * A logout button that expires the cookie on the server
 * @returns A button that logs the user out
 */
function LogoutButton() {

    const navigate = useNavigate()

    const performLogout = async () => {
        try {
            const requestOptions = {
                method: "GET",
                credentials: "include",
            }



            const response = await fetch("http://localhost:1339/session/logout", requestOptions)

            if (response.status === 401) {
                alert("You aren't logged in.")
                return
            }
            else if (response.status === 200) {
                alert("Logged out, hope you had a nice session.")
                navigate("/")
            }
            else {
                alert("Unexpected issue on server logging out.")
            }
        }

        catch (error) {
            alert(error.message)

        }
    }



    return (
        <Button variant="primary" size="md" onClick={performLogout}>
            logout
        </Button>
    )
}

export default LogoutButton