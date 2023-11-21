import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoggedInContext } from "./App";
import { Button } from "react-bootstrap";

/**
 * Provides a button to delete the account from the database
 * @returns A button that deletes the account
 */
function DeleteAccountButton() {

    const navigate = useNavigate()


    const performDelete = async () => {
        try {


            const res = await fetch("http://localhost:1339/session/getSelf",
                { method: "GET", credentials: "include" });

            if (res.status !== 200) throw new Error("You are not logged in!")

            const password = prompt("Please enter your current password")

            const requestOptions = {
                method: "DELETE",
                credentials: "include",
                body: JSON.stringify({
                    currentPassword: password
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }

            const res2 = await fetch("http://localhost:1339/users", requestOptions)



            if (res2.status === 200) {
                alert("Sad to see you leave, leave a feedback on how we can improve our website")
                navigate("/")
            }
            else {
                throw new Error("Incorrect password, will log out out of this account")
            }


        }

        catch (error) {
            alert(error.message)

        }
    }



    return (

        <Button size="md" class="btn btn-danger" onClick={performDelete}>
            Delete Account
        </Button>
    )
}

export default DeleteAccountButton