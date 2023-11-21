import React from "react";
import { useContext } from 'react';
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LoggedInContext } from "./App";
import { ListTopics } from "./ListTopics";
import { CommentForm } from "./CommentForm";
import {DeletePostAdmin} from "./DeletePostAdmin"
const MAX_CONTENT_LENGTH = 300;


/**
 * Represents a summary of a post
 */
function PostSummary({ post, deletePost, updatePost,deletePostAdmin }) {
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
    const [author, setAuthor] = useState(null);
    const [userVote, setUserVote] = useState(null);
    const [postScore, setPostScore] = useState(null);
    let currentPost = post;

    const dateCreated = new Date(currentPost.dateCreated);
    const dateEdited = currentPost.dateEdited ? new Date(currentPost.dateEdited) : null;
    const content = currentPost.postContent.length > MAX_CONTENT_LENGTH ? currentPost.postContent.substring(0, MAX_CONTENT_LENGTH) + "..." : currentPost.postContent;


    //#region get functions
    const getNumber = function (num) {
        return num > 10 ? num.toString() : "0" + num.toString();
    }

    const getAuthor = async function () {
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
        catch (error) {
            alert("Error: " + error.message);
        }

    }
    // Gets the score of the post
    const getPostScore = async function () {
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
        catch (error) {
            console.log(error);
        }
    }

    // Gets the user's vote on the post
    const getUserVote = async function () {
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
            }
            else {
                setUserVote(0);
                setIsLoggedIn(false);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    //#endregion

    const handleVote = async function (vote) {
        try {
            if (isLoggedIn) {
                const requestOptions = {
                    method: "PUT",
                    credentials: "include",
                    body: JSON.stringify({
                        postId: currentPost._id.toString(),
                        vote: vote
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }

                const result = await fetch(process.env.REACT_APP_PUBLIC_URL + "/posts/vote", requestOptions);

                if (result.status === 200) {
                    getPostScore();
                    getUserVote();
                }
                else {
                    alert(result.statusText);
                }
            }
            else
                alert("Sign up or log in to vote on posts");
        }
        catch (error) {
            console.error(error);
        }
    }

    // Handles the link button
    const handleLike = async function () {
        handleVote(1);
    }
    // Handles the dislike button
    const handleDislike = async function () {
        handleVote(-1);
    }


    useEffect(() => {
        getAuthor();
        getUserVote();
        getPostScore();
    }, []);

    //Handles the delete post button
    const handleDelete = async (event) => {
        try {


            event.preventDefault()

            const requestOptions = {
                method: "DELETE",
                credentials: "include",
                body: JSON.stringify({
                    postId: post._id

                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }

            const response = await fetch("http://localhost:1339/posts", requestOptions)

            if (response.status === 200) {
                alert("Post deleted")

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


    const [titleUpdate, setTitleUpdate] = useState(null)
    const [contentUpdate, setContentUpdate] = useState(null)


    const handleTitle = async (event) => {
        try {


            event.preventDefault()

            const requestOptions = {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify({
                    postId: post._id,
                    postTitle: titleUpdate
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }

            const response = await fetch("http://localhost:1339/posts", requestOptions)

            if (response.status === 200) {
                alert("Title updated")

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

    const handleContent = async (event) => {
        try {


            event.preventDefault()

            const requestOptions = {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify({
                    postId: post._id,
                    postContent: contentUpdate
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }

            const response = await fetch("http://localhost:1339/posts", requestOptions)

            if (response.status === 200) {
                alert("Content updated")

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
        <div className="post-summary-container">
            <ListTopics topics={post.topics} />
            <NavLink to={"/posts/" + currentPost._id}><h3 className="post-summary">{currentPost.postTitle}</h3></NavLink>
            <h4 className="post-summary post-summary-item">By {author && author.username}</h4>
            <h4 className="post-summary post-summary-item">{dateCreated.getFullYear()}-{getNumber(dateCreated.getMonth() + 1)}-{getNumber(dateCreated.getDate())}</h4>
            {dateEdited && <h4 className="post-summary post-summary-item">(Edited {dateEdited.getFullYear()}-{getNumber(dateEdited.getMonth() + 1)}-{getNumber(dateEdited.getDate())})</h4>}
            <p className="post-summary-desc">{content}</p>

            <button onClick={handleLike} className="post-vote-button"><img className="post-vote-button post-vote-img" src={process.env.PUBLIC_URL + `/images/Like_${userVote ? (userVote == 1 ? "enabled" : "disabled") : "disabled"}.png`} /></button>
            <h4 className="post-vote-score">{postScore && postScore}</h4>
            <button onClick={handleDislike} className="post-vote-button"><img className="post-vote-button post-vote-img" src={process.env.PUBLIC_URL + `/images/Dislike_${userVote ? (userVote == -1 ? "enabled" : "disabled") : "disabled"}.png`} /></button>
<br/><br/>
            <h4 className="post-summary post-summary-item post-summary-comments">[{currentPost.comments.length} comment(s)]</h4>

            <br /><br/>
            <CommentForm id={post._id} />
            <br /><br />
            

            <br />
            {updatePost && <label htmlFor="titleUpdate">Update Title:   </label>}
            <br />
            {updatePost && <input type="text" name="titleUpdate" placeholder="New Title..." onChange={(e) => setTitleUpdate(e.target.value)} />}

            <br /><br />
            {titleUpdate && <button type="button" class="btn btn-info" onClick={handleTitle}>Update</button>}
            <br />
            {updatePost && <label htmlFor="contentUpdate">Update Content:   </label>}
            <br />
            {updatePost && <input type="text" name="contentUpdate" placeholder="New Content..." onChange={(e) => setContentUpdate(e.target.value)} />}
            <br /><br />
            {contentUpdate && <button type="button" onClick={handleContent} class="btn btn-info">Update</button>}

<br/><br/>
            {deletePost && <button type="button" class="btn btn-warning" onClick={handleDelete}>Delete Post</button>}


            {deletePostAdmin && <DeletePostAdmin />}
        </div>
    )
}


export default PostSummary;