/*
*
** Log page Jsx
*
*/
import NavBar from '../pageComponents/navBar';
import { useState, useEffect} from "react";
import {Link} from "react-router-dom";
import React from "react";
import {fetchname, setname} from "../Serverside/NameAccess";
//rendering Log page
const Log = () => {
    const [username, setUsername] = useState("");
    const [users, setUsers] = useState("");
    useEffect(()=>{
        fetch('http://localhost:5050/users')
        .then(result => {
            return result.json();
        })
        .then(user=>{
            setUsers(user);
        });
    },[]);
    


    const HandleInsert = () =>{
        setname(username);
        let isAvail = false;
        users.map((user)=>{
            if(user.username == username){
                isAvail = true;
            }
        });

        if (!isAvail){
            fetch('http://localhost:5050/users', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body:JSON.stringify({"username":username , id:(users.length+1)})
            })
            .then(() => {
                console.log("success");
            }).catch(err => console.log(err));
        }
            
    }
    return(
        <div>
            <NavBar/>
            <div className="logForm">
                <form className="logIn">
                    <h1> Login </h1>
                    <label for="username">Username </label>
                    <input type="text" name="username" placeholder="name" onChange={(e)=>setUsername(e.target.value)}></input>
                    <br/>
                    <br/>
                    <br/>
                    <a type="submit" onClick={HandleInsert} href="/" style={{fontSize:"35px"}}>submit</a>
                </form>

                <form className="signUp">
                    <h1> Signup </h1>
                    <label for="username">Username </label>
                    <input type="text" name="username" placeholder="name" onChange={(e)=>setUsername(e.target.value)}></input>
                    <br/>
                    <br/>
                    <br/>
                    <a type="submit" onClick={HandleInsert} href="/" style={{fontSize:"35px"}}>submit</a>
                </form>
            </div>
        </div>
    );
};


//function export
export default Log;