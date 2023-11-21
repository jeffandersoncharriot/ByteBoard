import { ListCommentsPost } from "./ListCommentsPost"
import { useState, useEffect } from "react";


/**
 *  Fetches and returns all the comments of a post in a list
 * @param {string} id The id of the post 
 * @returns 
 */
function AllComments({ id }) {
    const [comments, setComments] = useState([])

    const callGetAllComments = async () => {

        // Fetches all the comments of a post
        const response = await fetch(`http://localhost:1339/posts/comments/post_ids/${id}`,
            { method: "GET", credentials: "include" });

        const result = await response.json();

        // Sets the comments
        setComments(result)
    };

    useEffect(() => {
        callGetAllComments()
    }, [])

    return (

        <>
            <ListCommentsPost comments={comments} />
        </>
    )
}

export { AllComments }