import { useState } from "react"

/**
 * Provides a form to allow a user to change their username
 * @returns A form to change the username
 */
function UsernameChangeForm() {
    const [username, setUsername] = useState(null)


    const handleSubmit = async (event) => {
        event.preventDefault()

        try {


            const res = await fetch("http://localhost:1339/session/getUsername",
                { method: "GET", credentials: "include" });

            if (res.status !== 200) throw new Error("You are not logged in!")

            const password = prompt("Please enter your current password")

            const requestOptions = {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify({
                    username: username,
                    currentPassword: password
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }

            const response = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/users`, requestOptions)

            if (response.status === 200) {
                alert("Username changed")

            }
            else {

                let result = await response.json()
                alert(result.errorMessage)

            }
        }
        catch (error) {
            alert(error.message)
        }
    }



    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username Change: </label>
            <br/>
            <input type="text" name="username" placeholder="New Username..." onChange={(e) => setUsername(e.target.value)} />

            {username && <button type="submit" class="btn btn-warning">Submit</button>}
        </form>
    )
}

export { UsernameChangeForm }