import NavBar from "../pageComponents/navBar";
import {useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "./_loadingPage";
import React from "react"; 
const View = () => {
    const [posts, setPosts] = useState("");
    const { id } = useParams();
    useEffect(()=>{
        fetch('http://localhost:5050/posts/'+id)
        .then(result => {
            return result.json();
        })
        .then(posts=>{
            setPosts(posts);

        });
    }, []) 
    // const id = probs.id;
    return(
        
        <div>
            <NavBar/>
            <div className="bodyElemets" style={{margin:"20px"}}>
                {!posts && <Loading/>}
            {posts == "" && <h1>Currently no posts available</h1>}
            {posts &&
            
            <div>           
                <h1 style={{backgroundColor:"aqua"}}>{posts.title}</h1>
                <p style={{marginLeft:"20px", marginRight:"20px", marginTop:"0px", paddingBottom:"40px", paddingTop:"20px",
                            backgroundColor: "rgb(223, 216, 210)", 
                            border: "transparent"
                            }}>{posts.content}<h2 style={{float:"right"}}>{"~Author : "+posts.authorname}</h2></p>
            </div>
            }
            </div>
        </div>
    );
};

export default View;