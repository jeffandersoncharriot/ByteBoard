import { useState,useEffect } from "react"

/**
 * Displays the newly created comment
 * @param {string} id The id of the user
 * @param {string} comment The comment
 * @returns The user and the comment
 */
function DisplayComment({commentId})
{
    const [comment, setComment] = useState(null);
    const [author, setAuthor] = useState(null);

    const dateCreated = comment ? new Date(comment.dateCreated) : null;
    const dateEdited = comment ? (comment.dateEdited ? new Date(comment.dateEdited) : null) : null;


    const getNumber = function(num) {
        return num > 10 ? num.toString() : "0" + num.toString(); 
    }

    const getAuthor = async function(currentComment) {
        const requestOptions = {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }

        let response;
        try {
            response = await fetch(process.env.REACT_APP_PUBLIC_URL + "/users/ids/" + currentComment.authorId, requestOptions);
            
            if (response.status === 200) {
                const user = await response.json();
                setAuthor(user);
            }
            else
                alert(response.statusText);
        }
        catch(error) {
            alert("Error: " + error.message);
        }
       
    }

    const getComment = async function() {
        try {
            const requestOptions = {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }

            const result = await fetch(process.env.REACT_APP_PUBLIC_URL + "/posts/comments/ids/" +  commentId, requestOptions);

            if (result.status === 200) {
                const real = await result.json();
                setComment(real);

                getAuthor(real);
            }
            else {
                console.error(result.statusText, commentId);
            }
                
        }
        catch(error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getComment();
    }, [])


    return (
        <div className="comment-container">
            {comment && <>
                <div className="comment">
                    <h3 className="comment comment-author">{author && author.username}</h3>
                    <h4 className="comment comment-item">{dateCreated && dateCreated.getFullYear()}-{getNumber(dateCreated.getMonth() + 1)}-{getNumber(dateCreated.getDate())}</h4>
                    {dateEdited && <h4 className="comment comment-item">(Edited {dateEdited.getFullYear()}-{getNumber(dateEdited.getMonth() + 1)}-{getNumber(dateEdited.getDate())})</h4>}
                </div>
                <h3 className="comment-desc">{comment.content}</h3>
            </>}
        </div>
    )
}

export default DisplayComment;