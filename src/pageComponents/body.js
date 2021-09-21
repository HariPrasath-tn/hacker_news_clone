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
    const condition = probs.opt;
    const [posts, setposts] = useState(null);
    const [comments, setComments] = useState(null);
    const [upvote, setUpvote] = useState(null);
    const [User, setUser] = useState("");

    useEffect(()=>{
        fetch('http://localhost:5050/sortby/1')
                            .then(result => {
                                return result.json();
                            })
                            .then(sortby=>{
                                fetch('http://localhost:5050/posts')
                                    .then(result => {
                                        return result.json();
                                    })
                                    .then(posts=>{
                                        fetch('http://localhost:5050/Username/1')
                                            .then(result => {
                                                return result.json();
                                            })
                                            .then(users=>{
                                                setUser(users.name);
                                                posts = posts.filter((post)=>{
                                                    return (condition === "myPost" ? post.authorname === users.name : true);
                                                })
                                                setposts(posts.sort((a,b)=>{
                                                    if(sortby.sortBy === "decrease"){
                                                        return(b.upvote - a.upvote < 0 ? -1 : 0);
                                                    }else if(sortby.sortBy === "increase"){
                                                        return(b.upvote - a.upvote < 0 ? 0 : -1);
                                                    }else if(sortby.sortBy === "timeUp"){
                                                        return(b.time - a.time < 0 ? -1 : 0);
                                                    }else if(sortby.sortBy === "timeDown"){
                                                        return(b.time - a.time < 0 ? 0 : -1);
                                                    }
                                                }));
                                            });            
                                    });
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

    const getCount = (id) => {
        return (upvote.filter((upvotes)=>{
            return upvotes.post_id === id;
        })).length;
    }
    
    return(
        <div className="bodyElements">
            {!posts && !comments && !upvote && <Loading/>}
            {posts == "" && <h1>Currently no posts available</h1>}
            {posts && comments && upvote && 
                posts.map((post)=>(
                    <div className="bodyElement" key={post.post_id}>
                        <Link to={`/view/${post.id}`} style={{
                            fontStyle:"italic", fontSize:"30px"
                        }}>{post.title}</Link><br/>

                        <label>{"Views:"+ post.views + "  |  " + "Uploaded time:" + post.time +"  | "}</label>

                        <a href="/newPost" style={{
                            marginLeft:"10px",
                            backgroundColor:"transparent"
                        }} > {"("+post.comments+") Comment"}</a>

                        <a href="/" onClick={()=> {
                            if(User.length > 0){
                                fetch('http://localhost:5050/upvote', {
                                    method: 'POST',
                                    headers: {"Content-Type": "application/json"},
                                    body:JSON.stringify({
                                        id:(post.id + User),
                                        "post_id":(post.id),
                                        "authorname":User
                                    })
                                }).then(result => {if(result.ok){
                                    fetch('http://localhost:5050/posts/'+post.id, {
                                        method: 'PATCH',
                                        headers: {"Content-Type": "application/json"},
                                        body:JSON.stringify({"upvote":post.upvote + 1})
                                    })
                                }})
                            }else{
                                alert("login to upvote a post");
                            }
                            
                        }} style={{
                            marginLeft:"10px",
                            backgroundColor:"transparent"
                        }} > {"("+getCount(post.id)+") Upvote"}</a>

                        <a href="/" onClick={()=> {
                            try {
                                fetch('http://localhost:5050/upvote/'+post.id+ User, {
                                method: 'DELETE',
                                headers: {"Content-Type": "application/json"},
                                body:JSON.stringify({
                                    id:(upvote.length + 1),
                                    "post_id":(post.id),
                                    "authorname":User
                                })
                            }).then(result => {if(result.ok){
                                fetch('http://localhost:5050/posts/'+post.id, {
                                        method: 'PATCH',
                                        headers: {"Content-Type": "application/json"},
                                        body:JSON.stringify({"upvote":post.upvote - 1})
                                    })
                            }})
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