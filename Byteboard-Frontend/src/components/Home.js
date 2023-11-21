import { AllUsers } from "./AllUsers";
import { PostForm } from "./PostForm";
import { AllPosts } from "./AllPosts";
import { useState } from "react";
import { useEffect } from "react";

/**
 * The home page for the website
 * @returns The home page
 */
function Home() {

    const [deleteAdmin,setDeleteAdmin] = useState(null)

    const getSelf = async()=>
    {
        const res = await fetch("http://localhost:1339/session/getSelf",
        { method: "GET", credentials: "include" });
    
        let result = await res.json()
    
    
        if(result.admin)
        {
            setDeleteAdmin(true)
        }
    }
    
    
    
    useEffect(() => {
        getSelf()
       
      }, [])

    return (

        <div>

            <h1 id="home-title">Home</h1>

            <div className="home">
                <AllUsers deleteAdmin={deleteAdmin}/>

                <PostForm />

                <AllPosts deleteAdmin={deleteAdmin}/>

            </div>
        </div>
    )
}

export { Home }