import { useState } from "react"
import "./App.css"

/**
 * Allows the user to update their description
 * @returns A form to update the user's description
 */
function UpdateDescriptionForm() {
    const [description, setDescription] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {


            const res = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/session/getUsername`,
                { method: "GET", credentials: "include" });

            if (res.status !== 200) throw new Error("User not logged in")

            const username = await res.text();



            const requestOptions = {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify({
                    usernameToUpdate: username,
                    description: description
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }

            const response = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/users`, requestOptions)

            if (response.status === 200) {
                alert("Description updated")

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
        <form onSubmit={handleSubmit} className="description">
            <br />
            <label><h3>Update Description</h3></label>
            <br /><br />
            <input type="text" name="description" placeholder="Update Description..." onChange={(e) => setDescription(e.target.value)} />

            <br /><br />
            {description && <button type="submit" class="btn btn-light">Update</button>}
        </form>
    )
}

export { UpdateDescriptionForm }