import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoggedInContext } from "./App";
import "./App.css"


/**
 * Provides a registering forum for the user to create an account
 * @returns A form for registering a new user
 */
function RegisterForm() {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const requestOptions = {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }

            if (isLoggedIn) {
                alert("Logout before registering again")


            }
            else {

                const response = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/users/register`, requestOptions)

                if (response.status === 200) {

                    alert("Registered sucessfully")

                    navigate("/")
                }
                else {

                    let result = await response.json()
                    alert(result.errorMessage)

                }
            }
        }
        catch (error) {
            alert(error.message)
        }
    }



    return (
        <form onSubmit={handleSubmit} className="login">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="Username..." onChange={(e) => setUsername(e.target.value)} />
            <br />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />


            <br />

            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />



            <br /><br />
            {username && password && email && <button type="submit" class="btn btn-success">Register</button>}
            <br /><br />
        </form>
    )
}

export { RegisterForm }