import { useState } from "react"
import "./App.css"

/**
 * Provides a forum to create a post
 * @returns A form to create a post
 */
function PostForm() {
    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)


    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            let topics = [];
            let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
            for (let i = 0; i < checkboxes.length; i++) {
                topics.push(checkboxes[i].value)
            }



            const requestOptions = {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    title: title,
                    content: content,
                    topicNames: topics

                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }

            const response = await fetch("http://localhost:1339/posts", requestOptions)

            if (response.status === 200) {
                alert("Post created")

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

        <form onSubmit={handleSubmit} className="post" title="Post">
            <h1>POST</h1>
            <div>
      
                <label for="vehicle1" > <i>Programming</i></label>
                <input type="checkbox" id="vehicle1" value="Programming"/>
          
                <label for="vehicle2"><i> Hardware</i></label>
                <input type="checkbox" id="vehicle2" value="Hardware" />

                <label for="vehicle3"> <i>Virtual Machines</i></label>
                <input type="checkbox" id="vehicle3" value="Virtual Machines" />
                
                <label for="vehicle4"><i>Networking</i> </label>
                <input type="checkbox" id="vehicle4" value="Networking" />

                <label for="vehicle5"><i>Other</i></label>
                <input type="checkbox" id="vehicle5" value="Other" />

            </div>

            <label htmlFor="title">Title: </label><br />
            <input type="text" name="title" placeholder="Title..." onChange={(e) => setTitle(e.target.value)} />
            <br />

            <label htmlFor="title">Content: </label><br/>
            <input type="text" name="title" placeholder="Content..." onChange={(e) => setContent(e.target.value)} />
            <br />

            <br />
            <button type="submit" class="btn btn-primary">Create</button>
        </form>
    )
}

export { PostForm }