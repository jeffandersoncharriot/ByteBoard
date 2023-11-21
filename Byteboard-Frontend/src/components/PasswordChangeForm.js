import {useState } from "react"

/**
 * Provides a forum to allow a user to change their password
 * @returns A form to change the password of a user
 */
function PasswordChangeForm() {
    const [currentPassword, setPassword] = useState(null)


    const handleSubmit = async (event) => {
        event.preventDefault()

        try {

            const res = await fetch("http://localhost:1339/session/getUsername",
                { method: "GET", credentials: "include" });

            if (res.status !== 200) throw new Error("You are not logged in!")


            const username = await res.text();

            const password = prompt("Please enter your current password")


            const requestOptions = {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify({
                    usernameToUpdate: username,
                    password: currentPassword,
                    currentPassword: password
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }

            const response = await fetch("http://localhost:1339/users", requestOptions)

            if (response.status === 200) {
                alert("Password changed")

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
            <label htmlFor="currentPassword">Password Change: </label>
            <br/>
            <input type="password" name="currentPassword" placeholder="New Password..." onChange={(e) => setPassword(e.target.value)} />


            {currentPassword && <button type="submit" class="btn btn-warning">Submit</button>}
        </form>
    )
}

export { PasswordChangeForm }