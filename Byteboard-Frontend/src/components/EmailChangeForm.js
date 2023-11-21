import { useState } from "react"


/**
 * Provides a form to change the email of the user 
 * @returns A form to change the email of the user
 */
function EmailChangeForm() {
    const [email, setEmail] = useState(null)

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
                    email: email,
                    currentPassword: password
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }

            const response = await fetch("http://localhost:1339/users", requestOptions)

            if (response.status === 200) {
                alert("Email changed")

            }
            else {

                let result = await response.json()
                alert(result.errorMessage)

            }
        }
        catch (error) {
            alert("an error occured try again")
        }
    }



    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email Change:   </label>
            <br/>
            <input type="text" name="email" placeholder="New Email..." onChange={(e) => setEmail(e.target.value)} />


            {email && <button type="submit" class="btn btn-warning">Submit</button>}
        </form>
    )
}

export { EmailChangeForm }