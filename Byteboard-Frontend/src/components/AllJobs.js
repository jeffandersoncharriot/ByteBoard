import { useNavigate } from "react-router-dom"
import PostSummary from "./PostSummary"
import { useState, useEffect } from "react"

/**
 * Fetches and returns all the posts in a list
 * @returns A list of all the posts
 */
function AllJobs({deleteAdmin}) {
    const navigate = useNavigate()

    const [posts, setPosts] = useState(null)

    const getPosts = async () => {

        try {
            const response = await fetch(process.env.REACT_APP_PUBLIC_URL + "/posts/jobs",
                { method: "GET", credentials: "include" });


            let result = await response.json()


            setPosts(result)

        }
        catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    try {

        return (
            <div>


                {posts.map((post) => (


                    <PostSummary post={post} deletePost={deleteAdmin} />



                ))}

            </div>
        )
    }
    catch (error) {

       //navigate("/usererror", { state: { errorMessage: error.message } })
    }
}

export { AllJobs}