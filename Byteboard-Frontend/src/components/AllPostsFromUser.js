import { ListPosts } from "./ListPosts"
import { useEffect, useState } from "react"

/**
 * Gets all the posts of a user from a fetch request
 * @param {object} props The user object
 * @returns List of all the posts of a user
 */
function AllPostsFromUser(props) {

  const [posts, setPosts] = useState([])


  const callGetAllPosts = async (event) => {

    try {
      event.preventDefault()

      const response = await fetch(`http://localhost:1339/posts/users/${props.user._id}`)

      const result = await response.json();

      setPosts(result)
    }
    catch (error) {
      alert(error.message)
    }
  }

  return (

    <>
      <button onClick={callGetAllPosts}>See Posts</button>

      <ListPosts posts={posts} deleteUpdate={props.update} />
    </>
  )
}


export { AllPostsFromUser }