import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoggedInContext } from "./App";
import { Button } from "react-bootstrap";

/**
 * Provides a button to delete the account from the database
 * @returns A button that deletes the account
 */
function DeleteAccountButtonAdmin({username}) {

    const navigate = useNavigate()


    const performDelete = async () => {
        try {


            const requestOptions = {
                method: "DELETE",
                credentials: "include",
                body: JSON.stringify({
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }

            const res2 = await fetch(`http://localhost:1339/users/delete/${username}`, requestOptions)



            if (res2.status === 200) {
                alert("Account deleted")
            }
            else {
                let result = await res2.json()
                alert(result.errorMessage)
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

export default DeleteAccountButtonAdmin