import React, { useState, useRef } from "react";

function FormUpdatePost({post}) {
    const title = useRef();
    const content = useRef();
    // const [content, setContent] = useState(null);
    // const [title, setTitle] = useState(null);

    const handleSubmit = async function(event) {
        try {
            event.preventDefault();

            const requestOptions = {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify({
                    postId: post._id.toString(),
                    postTitle: title,
                    postContent: content
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }

            const result = await fetch(process.env.REACT_APP_PUBLIC_URL + "/posts/ids/" + post._id.toString(), requestOptions);

            if (result.status === 200) {

            }
        }
        catch(error) {
            console.error(error);
        }
    }


    return (
        <div>
            <form>
                <input ref={title} placeholder="Title" type="text"/><br/>
                <input ref={content} placeholder="Description" type="text"/><br/>
                <button className="post-edit-button" onClick={handleSubmit}>Finish Edits</button>
            </form>
        </div>
    );
}

export default FormUpdatePost;