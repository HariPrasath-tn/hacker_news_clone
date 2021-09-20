/*
*
** Home page Jsx
*
*/
import NavBar from '../pageComponents/navBar';
import Body from '../pageComponents/body';
import React from "react";
//rendering home page
const Home = (probs) => {
    const pageCondition = probs.filt;
    return (
        <div className="home"> 
            <NavBar tell={"home"}/>
            <Body opt={pageCondition}/>
        </div>
    );
};


//function export
export default Home;