import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useRef } from "react";
import { LoggedInContext } from "../components/App";
import DisplayComment from "../components/DisplayComment";
import { NavLink } from "react-router-dom";
import { PostForm } from "../components/PostForm";
import FormUpdatePost from "../components/FormUpdatePost";

/**
 * Represents a full post with comments
 */
function FullPost() {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
    const [post, setPost] = useState(null);
    const [author, setAuthor] = useState(null);
    const [userVote, setUserVote] = useState(null);
    const [postScore, setPostScore] = useState(null);
    const [canEditPost, setCanEdit] = useState(false);
    const [isEditing, setEditing] = useState(false);


    const dateCreated = post ? new Date(post.dateCreated) : new Date();
    const dateEdited = post ? (post.dateEdited ? new Date(post.dateEdited) : null) : null;
    const content = post ? post.postContent : "";

    
    //#region get functions
    const getNumber = function(num) {
        return num > 10 ? num.toString() : "0" + num.toString(); 
    }

    const getAuthor = async function(currentPost) {
        const requestOptions = {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }

        let response;
        try {
            response = await fetch(process.env.REACT_APP_PUBLIC_URL + "/users/ids/" + currentPost.authorId, requestOptions);
            
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

    const getPostScore = async function(currentPost) {
        try {
            const requestOptions = {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
    
            const result = await fetch(process.env.REACT_APP_PUBLIC_URL + "/posts/ids/" + currentPost._id.toString(), requestOptions);

            if (result.status === 200) {
                const newPost = await result.json();
                setPostScore(newPost.score);
            }
        }
        catch(error) {
            console.log(error);
        }
    }

    const getUserVote = async function(currentPost) {
        try {
            const requestOptions = {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
            
            const postResult = await fetch(process.env.REACT_APP_PUBLIC_URL + "/posts/ids/" + currentPost._id.toString(), requestOptions);
            const loginResult = await fetch(process.env.REACT_APP_PUBLIC_URL + "/session/getSelf", requestOptions);
            let fetchedPost;

            if (postResult.status === 200) {
                fetchedPost = await postResult.json();
            }

            if (loginResult.status === 200) {
                const user = await loginResult.json();

                if (fetchedPost.userVotes[user._id]) {
                    setUserVote(fetchedPost.userVotes[user._id]);
                }
                else
                    setUserVote(0);
                setIsLoggedIn(true);
                
                setCanEdit(user.admin || user._id == fetchedPost.authorId);
            }
            else {
                setUserVote(0);
                setIsLoggedIn(false);
            }
        }
        catch(error) {
            console.error(error);
        }
    }
    //#endregion

    const handleVote = async function(vote) {
        try {
            if (isLoggedIn) {
                const requestOptions = {
                    method: "PUT",
                    credentials: "include",
                    body: JSON.stringify({
                        postId: post._id.toString(),
                        vote: vote
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }
        
                const result = await fetch(process.env.REACT_APP_PUBLIC_URL + "/posts/vote", requestOptions);
    
                if (result.status === 200) {
                    getPostScore(post);
                    getUserVote(post);
                }
                else {
                    alert(result.statusText);
                }
            }
            else
                alert("Sign up or log in to vote on posts");
        }
        catch(error) {
            console.error(error);
        }
    }

    const handleLike = async function() {
        handleVote(1);
    }
    const handleDislike = async function() {
        handleVote(-1);
    }

    const retrievePost = async function() {
        try {
            const requestOptions = {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }

            const pathSplit = location.pathname.split("/");
            const result = await fetch(process.env.REACT_APP_PUBLIC_URL + "/posts/ids/" + pathSplit[pathSplit.length - 1], requestOptions);
            
            if (result.status === 200) {
                const realPost = await result.json();
                setPost(realPost);

                getAuthor(realPost);
                getUserVote(realPost);
                getPostScore(realPost);
            }
        }
        catch(error) {
            console.error(error);
        }
    }

    const handleEdit = async function() {
        try {
            setEditing(true);
        }
        catch(error) {
            console.error(error);
        }
    }

    const handleCancel = async function() {
        try {
            setEditing(false);
        }
        catch(error) {
            console.error(error);
        }
    }


    useEffect(() => {
        retrievePost();
    }, []);
    
    
    return (
        <>
            {post && <>
                    <div className="post-container">
                        <h1 className="post-real">{post.postTitle}</h1><br/>
                        <h3 className="post-real post-item">By {author && author.username}</h3>
                        <h3 className="post-real post-item">{dateCreated.getFullYear()}-{getNumber(dateCreated.getMonth() + 1)}-{getNumber(dateCreated.getDate())}</h3>
                       
                        <h3 className="post-desc">{content}</h3>


                        <button onClick={handleLike} className="post-vote-button"><img className="post-vote-button post-vote-img" src={process.env.PUBLIC_URL + `/images/Like_${userVote ? (userVote == 1 ? "enabled" : "disabled") : "disabled"}.png`}/></button>
                        <h4 className="post-vote-score">{postScore && postScore}</h4>
                        <button onClick={handleDislike} className="post-vote-button"><img className="post-vote-button post-vote-img" src={process.env.PUBLIC_URL + `/images/Dislike_${userVote ? (userVote == -1 ? "enabled" : "disabled") : "disabled"}.png`}/></button>
                    </div>
                    <div className="comments-container">
                        <h2>Comments ({post.comments.length})</h2>
                        <div>
                            {post.comments.map((commentId) => (
                                <h2>{<DisplayComment commentId={commentId}/>}</h2>
                            ))}
                        </div>
                    </div>
                </>
            }
        </>
    )
}


// {dateEdited && <h3 className="post-real post-item">(Edited {dateEdited.getFullYear()}-{getNumber(dateEdited.getMonth() + 1)}-{getNumber(dateEdited.getDate())})</h3>}
export default FullPost;