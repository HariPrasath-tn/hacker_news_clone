/*
*
** body Component
*
*/

import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import Loading from "../pages/_loadingPage";
import React from "react";
import "../Css/body.css"

//Body content function
const Body = (probs) => {
    const [posts, setposts] = useState(null);
    const [comments, setComments] = useState(null);
    const [upvote, setUpvote] = useState(null);

    useEffect(()=>{
        fetch('http://localhost:5050/posts')
        .then(result => {
            return result.json();
        })
        .then(posts=>{
            setposts(posts);
        });
        fetch('http://localhost:5050/comment')
        .then(result => {
            return result.json();
        })
        .then(comments=>{
            setComments(comments);
        });
        fetch('http://localhost:5050/upvote')
        .then(result => {
            return result.json();
        })
        .then(upvotes=>{
            setUpvote(upvotes);
        });
    }, []);

    
    return(
        <div className="bodyElements">
            {!posts && !comments && !upvote && <Loading/>}
            {posts == "" && <h1>Currently no posts available</h1>}
            {posts && comments && upvote && 
                posts.map((post)=>(
                    <div className="bodyElement" key={post.post_id}>
                        <Link to={`/view/${post.id}`}  style={{
                            fontStyle:"italic", fontSize:"30px"
                        }}>{post.title}</Link><br/>

                        <label>{"Views:"+ post.views + "  |  " + "Uploaded time:" + post.time +"  | "}</label>

                        <button style={{
                            marginLeft:"10px",
                            backgroundColor:"transparent"
                        }} > {"("+comments.length+") Comment"}</button>

                        <button onClick={()=> alert("Upvoted")} style={{
                            marginLeft:"10px",
                            backgroundColor:"transparent"
                        }} > {"("+upvote.length+") Upvote"}</button>

                        <button onClick={()=> alert("Unvoted")} style={{
                            marginLeft:"10px",
                            marginBottom:"10px",
                            marginTop:"20px",
                            backgroundColor:"transparent"
                        }} > UnVote</button>
                    </div>
            ))
            }
        </div>
    );
};

//exporting function
export default Body;