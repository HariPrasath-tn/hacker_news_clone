import NavBar from "../pageComponents/navBar";
import {useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "./_loadingPage";
import React from "react"; 
import ComBody from "../pageComponents/comBody";
const View = () => {
    const [post, setPosts] = useState("");
    const [comment_text, setCommentText] = useState("");
    const [User, setUser] = useState("");

    const { id } = useParams();
    useEffect(()=>{
        fetch('http://localhost:5050/Username/1')
            .then(result => {
                return result.json();
            })
            .then(users=>{
                setUser(users.name);
                fetch('http://localhost:5050/posts/'+id)
                .then(result => {
                    return result.json();
                })
                .then(post=>{
                    setPosts(post);
                    fetch('http://localhost:5050/posts/'+id, {
                        method: 'PATCH',
                        headers: {"Content-Type": "application/json"},
                        body:JSON.stringify({"views":post.views+1})
                    })
                });
            });
    }, []) 

    // const id = probs.id;
    return(
        
        <div>
            <NavBar/>
            <div className="bodyElemets" style={{margin:"20px"}}>
                {!post && <Loading/>}
            {post && 
            
            <div>           
                <h1 style={{backgroundColor:"aqua"}}>{post.title}</h1>
                <p style={{marginLeft:"20px", marginRight:"20px", marginTop:"0px", paddingBottom:"60px", paddingTop:"20px",
                            backgroundColor: "rgb(223, 216, 210)", 
                            border: "transparent"
                            }}>{post.content}
                            <h3 style={{float:"right", marginRight:"20px"}}>{"Upvotes : "+post.upvote} {"~Author : "+post.authorname}</h3>
                </p>
                <div style={{marginLeft:"20px",
                                border: "transparent",float:"left"
                                }}>
                    <h1 style={{marginLeft:"20px",
                                border: "transparent",float:"left"
                                }}>Comments</h1> 
                    <br/> <br/> <br/>  <br/> <br/> 
                    <h3 style={{marginLeft:"180px",
                                border: "transparent",float:"left"
                                }}>Add your comment here : </h3> 
                    <br/>
                    <textarea style={{marginLeft:"180px",float:"left", width:"400px", height:"100px"
                                }} onChange={(e)=>{
                                    setCommentText(e.target.value);
                                }}></textarea>
                    
                    <br/>
                    <button style={{float:"right"}} onClick={()=>{
                        fetch('http://localhost:5050/comment', {
                            method: 'POST',
                            headers: {"Content-Type": "application/json"},
                            body:JSON.stringify({
                                id: (post.comments + Math.random*1000)*2,
                                "post_id": post.id,
                                "comment": comment_text,
                                "username": User
                            })
                        })
                        fetch('http://localhost:5050/posts/'+post.id, {
                            method: 'PATCH',
                            headers: {"Content-Type": "application/json"},
                            body:JSON.stringify({ "comments": post.comments+1 })
                        })
                        window.location.reload();
                    }}>submit</button>
                </div>
                <ComBody val={post.id}/>
            </div>
            }
            </div>
        </div>
    );
};

export default View;