import { Button } from "react-bootstrap";

/**
 * Provides a button to delete the account from the database
 * @returns A button that deletes the account
 */
function DeletePostAdmin({postId}) {


    const performDelete = async () => {
        try {


            const requestOptions = {
                method: "DELETE",
                credentials: "include",
                body: JSON.stringify({
                    postId:postId
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }

            const res = await fetch(`http://localhost:1339/posts`, requestOptions)



            if (res.status === 200) {
                alert("Post deleted.")
            }
            else {
                let result = await res.json()
                alert(result.errorMessage)
            }


        }

        catch (error) {
            alert(error.message)

        }
    }



    return (

        <Button size="md" class="btn btn-danger" onClick={performDelete}>
            Delete Post
        </Button>
    )
}

export {DeletePostAdmin}