/*
*
** New Posts page Jsx
*
*/

import NavBar from '../pageComponents/navBar';
import { useState, useEffect} from "react";
import {fetchname, setname} from "../Serverside/NameAccess";
import React from "react";
//rendering Newpost page
const NewPosts = () => {
    const [User, setUser] = useState("");
    const datetime = new Date();
    const time = datetime.getFullYear() + '/' + (datetime.getMonth()+1) + '/' + datetime.getDate() +' '+ datetime.getHours()+':'+ datetime.getMinutes()+':'+ datetime.getSeconds();
    const [headline_, setHeadline] = useState("");
    const [newsFeed, setNewsFeed] = useState("");
    const [user, setuser_] = useState("");

    const [PostList, setPostList] = useState("");

    useEffect(()=>{
        fetch('http://localhost:5050/Username/1')
                .then(result => {
                    return result.json();
                })
                .then(users=>{
                    alert(users);
                    setUser(users.name);

                });
        fetch('http://localhost:5050/posts')
        .then(result => {
            return result.json();
        })
        .then(postList=>{
            setPostList(postList);
        });
        fetch('http://localhost:5050/users')
        .then(result => {
            return result.json();
        })
        .then(user=>{
            setuser_(user);
        });
    }, []);
    

    const HandleInsert = (e) =>{
        fetch('http://localhost:5050/posts', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({
                id:(User + (PostList.length+1)),
                "post_id":(PostList.length+1),
                "author":fetchname,
                "title": headline_, 
                "content":newsFeed, 
                "views":0,
                "time": time
            })
        })
        .then(() => {
            console.log("success");
        }).catch(err => console.log(err))

    }
    return(
        <div>
            <NavBar/>
            <div className="NewPostForm">
                <form className="newPost" 
                style={{
                    backgroundColor:"aqua", 
                    minWidth:"800px", maxWidth:"890px",                    
                    left: "25%",
                    right: "25%",
                    position:"absolute",
                    boxSizing: "border-box"
                }}>
                    <h1 style={{fontFamily: "sans-serif"}}> New Post </h1>

                    {
                    /*
                    ** HeadLine collector
                    */
                    }
                    <label 
                    for="headLine" 
                    style={{
                        verticalAlign: "middle",
                        margin:"50px",
                        fontFamily: "sans-serif", 
                        fontSize:"20px"
                        }}>HeadLine </label>
                    <textarea 
                    type="text" 
                    name="headLine" 
                    required onChange={(event)=>setHeadline(event.target.value)}
                    placeholder="headline" 
                    style={{
                        marginBottom:"50px",
                        fontFamily: "sans-serif", 
                        fontSize: "20px", 
                        width:"700px"}}></textarea>
                    <br/>

                    {
                    /*
                    ** News feed collector
                    */
                    }
                    <label style={{
                        margin:"50px",
                        verticalAlign: "middle",
                        fontFamily: "sans-serif", 
                        fontSize:"20px"
                        }}>Feed Complete News </label>
                    <textarea type="text" name="content" placeholder="Feed full news" required onChange={(event)=>setNewsFeed(event.target.value)}
                    style={{
                        marginBottom:"50px",
                        fontFamily: "sans-serif", 
                        fontSize: "20px", 
                        width:"700px", height:"300px"
                        }}></textarea>
                    <br/>


                    <a href="/" type="submit"style={{
                        marginBottom:"50px",
                        fontFamily: "sans-serif", 
                        fontSize: "20px", 
                        }} onClick= {HandleInsert}>submit</a>
                </form>
            </div>
        </div>
    );
};


//function export
export default NewPosts;