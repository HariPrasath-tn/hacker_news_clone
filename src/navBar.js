/*
*
** Common Navigation Bar Component
*
*/

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from "react";
import {fetchname, setname} from "../Serverside/NameAccess";


//nav function
const NavBar = (probs) => {
    const [islogged, setIsLogged] = useState(false);
    const isHome = probs.tell==="home"? true:false;

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
                <Link className="setHome" to="/">Hacker News</Link>
                {!islogged && <Link className="setOrd" to="/create" style={{color:"red", backgroundColor:"transparent"}}>Login</Link>}
                {islogged && <Link className="setOrd" onClick={()=>{
                    check();
                    setname("");
                    }} to="/home" style={{color:"red", backgroundColor:"transparent"}}>Logout</Link>}
                <Link className="setOrd" to="/home/myPosts">View My Posts</Link>
                <Link className="setOrd" to="/newPost">Post News</Link>
                <Link className="setOrd" to="/home/older">Older</Link>
                <Link className="setOrd" to="/home/new">New</Link>
                {isHome && <div>
                    <select className="setOrd" id="sort" style={{border: "1px solid", marginRight:"35px", color:"black"}}>
                    <option value="commentUp">comment(high to low)</option>
                    <option value="commentDown">comment(low to high)</option>
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