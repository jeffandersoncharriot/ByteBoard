import React from "react";
import { useContext } from 'react';
import { useState } from "react";
import { useEffect } from "react";
import { LoggedInContext } from "../App";
import PostSummary from "../PostSummary";


/**
 * Forum page
 * @returns The forum page which is a list of posts
 */
function Forum() {
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
    const [posts, setPosts] = useState();


    const getAllPosts = async function () {
        const requestOptions = {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }


        let response;
        try {
            const publicUrl = process.env.REACT_APP_PUBLIC_URL;
            response = await fetch(publicUrl + "/posts", requestOptions);

            if (response.status === 200) {
                const postList = await response.json();
                setPosts(postList);
            }
        }
        catch (error) {
            console.error(error);
        }


    }
    useEffect(() => {
        getAllPosts()
    }, []);



    return (
        <div>
            <h1>Forum</h1>

            <div className="posts-container">
                {posts && posts.map(post => (
                    <PostSummary post={post} />
                ))}
            </div>
        </div>
    )
}

export default Forum;