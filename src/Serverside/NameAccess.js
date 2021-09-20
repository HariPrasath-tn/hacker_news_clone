import React from 'react';
import {useState} from "react";

const fetchname = (temp) => {
    const [user, setUser] = useState("");
    fetch('http://localhost:5050/Username/1')
        .then(result => {
            return result.json();
        })
        .then(users=>{
            alert(users);
            setUser(users.name);

        });

    return "user";
}

const deleteIt = () =>{
    fetch('http://localhost:5050/Username/1', {
            method: 'DELETE',
        })
        .then(() => {
            console.log("success");
        }).catch(err => console.log(err));
}

const setname = (name)=>{
    deleteIt();alert("");
    fetch('http://localhost:5050/Username', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({"name":name, id:1})
        })
        .then(() => {
            console.log("success");
        }).catch(err => console.log(err));
    return ""
}

export {
    fetchname, setname
};