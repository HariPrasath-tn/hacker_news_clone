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

    return user;
}

const setname = (name)=>{
    fetch('http://localhost:5050/Username/1', {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({"name":name})
        })
        .then(() => {
            console.log("success");
        }).catch(err => console.log(err));
}

export {
    fetchname, setname
};