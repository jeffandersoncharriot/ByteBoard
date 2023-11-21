import { useNavigate } from "react-router-dom"
import PostSummary from "./PostSummary"


function ListPosts({ posts,deleteUpdate }) {
    const navigate = useNavigate()
    try {

        return (
            <div>


                {posts.map((post) =>(
                   
                
                    <PostSummary post={post} deletePost={deleteUpdate} updatePost={deleteUpdate}/>
                   
                ))}

            </div>
        )
    }
    catch (error) {

        navigate("/usererror", { state: { errorMessage: error.message } })
    }
}

export { ListPosts }