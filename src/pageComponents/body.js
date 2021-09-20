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
    const [User, setUser] = useState("");

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
        fetch('http://localhost:5050/Username/1')
                .then(result => {
                    return result.json();
                })
                .then(users=>{
                    setUser(users.name);
                });
        
    }, []);

    const getCount = (id) => {
        let count = 0;
        upvote.map((vote)=>{
            if(vote.post_id == id){
                count++;
            }
        })
        return count;
    }
    
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

                        <a href="/" onClick={()=> {
                            fetch('http://localhost:5050/upvote', {
                                method: 'POST',
                                headers: {"Content-Type": "application/json"},
                                body:JSON.stringify({
                                    id:(post.id+ upvote.length + 1),
                                    "post_id":(post.id),
                                    "authorname":User
                                })
                            })
                        }} style={{
                            marginLeft:"10px",
                            backgroundColor:"transparent"
                        }} > {"("+getCount(post.id)+") Upvote"}</a>

                        <a href="/" onClick={()=> {
                            try {
                                fetch('http://localhost:5050/upvote/'+post.id+ upvote.length, {
                                method: 'DELETE',
                                headers: {"Content-Type": "application/json"},
                                body:JSON.stringify({
                                    id:(upvote.length + 1),
                                    "post_id":(post.id),
                                    "authorname":User
                                })
                            })
                            } catch (error) {
                                
                            }
                        }} style={{
                            marginLeft:"10px",
                            marginBottom:"10px",
                            marginTop:"20px",
                            backgroundColor:"transparent"
                        }} > UnVote</a>
                    </div>
            ))
            }
        </div>
    );
};

//exporting function
export default Body;