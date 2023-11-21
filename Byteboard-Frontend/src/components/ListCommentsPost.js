import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { DisplayComment } from "./DisplayComment"
import Comment from "./Comment"

/**
 * Fetches and returns all the comments in a list
 * @param {Object} props
 * @returns A list of comments
 */
function ListCommentsPost({ comments }) {
    const navigate = useNavigate()


    try {
        for (let i = 0; i < comments.length; i++) {
            if (comments[i] == null) {
                comments.splice(1, i)
            }
        }
        return (
            <div>

                <ul>
                    {comments.map((comment) => (

                        <h2>{<DisplayComment id={comment.authorId} comment={comment.content} />}</h2>

                    ))}
                </ul>

            </div>
        )
    }
    catch (error) {

        navigate("/usererror", { state: { errorMessage: error.message } })
    }
}


export { ListCommentsPost }