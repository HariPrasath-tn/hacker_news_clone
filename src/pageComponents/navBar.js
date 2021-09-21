/*
*
** Common Navigation Bar Component
*
*/

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from "react";
import {setname} from "../Serverside/NameAccess";


//nav function
const NavBar = (probs) => {
    const [islogged, setIsLogged] = useState(false);
    const isHome = probs.tell==="home"? true:false;
    const [sortby, setSortBy] = useState(
        fetch('http://localhost:5050/sortby/1')
        .then(result => {
            return result.json();
        })
        .then(sortby=>{
            setSortBy(sortby.sortBy);
        })
    );

    const setIt = (truth) =>{
        setIsLogged(truth);
    }
    function check(){
        fetch('http://localhost:5050/Username/1')
            .then(result => {
                return result.json();
            })
            .then(users=>{
                
                if(users.name.length > 0){
                    setIt(true);
                }else{
                    setIt(false);
                }
            });
    }
    useEffect(()=>{
        check();
    })
    return (
        <div className="NavFrame">
            <nav className="navigations">
                <a className="setHome" href="/">Hacker News</a>
                {!islogged && <Link className="setOrd" to="/create" style={{color:"red", backgroundColor:"transparent"}}>Login</Link>}
                {islogged && <Link className="setOrd" onClick={()=>{
                    check();
                    setname("");
                    window.location.reload(();
                    }} style={{color:"red", backgroundColor:"transparent"}}>Logout</Link>}
                <a className="setOrd" href="/home/myPosts">View My Posts</a>
                <a className="setOrd" href="/newPost">Post News</a>
                <a className="setOrd" href="/home/older">Older</a>
                <a className="setOrd" href="/home/new">New</a>
                {isHome && <div>
                    <select value={sortby} onChange={(e) => {
                        fetch('http://localhost:5050/sortby/1', {
                            method: 'PATCH',
                            headers: {"Content-Type": "application/json"},
                            body:JSON.stringify({"sortBy":e.target.value})
                        }).then(()=>{
                            window.location.reload()
                        })
                    }} className="setOrd" id="sort" style={{border: "1px solid", marginRight:"35px", color:"black"}}>
                    <option value="decrease">upvotes(high to low)</option>
                    <option value="increase" >upvotes(low to high)</option>
                    <option value="timeUp">Date(new to past)</option>
                    <option value="timeDown">Date(past to new)</option>
                </select>
                <label className="setOrd" for="sort">SortBy</label>
                </div>}
            </nav>
        </div>
    );
};

// exporting navBar
export default NavBar;
