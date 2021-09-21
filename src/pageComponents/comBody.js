/*
*
** Comment Body Component
*
*/

//com nav function
import React from "react";
import {useState, useEffect} from "react";


const ComBody = (probs) => {
    const [comments, setComments] = useState("");


    const id = probs.val;
    useEffect(()=>{
        fetch('http://localhost:5050/comment')
        .then(result => {
            return result.json();
        })
        .then(comments=>{
            setComments(comments.filter((comment)=>{
                return id === comment.post_id;
            }))
        })
    }, [])
    
    return (
        <div style={{ float: 'left', clear:"left", marginLeft:"50px", border:"1px solid", minWidth:"800px"}}>
            <h2 style={{float:"left"}}>Previous comments</h2>
            {!comments && <h3>Comments are loading :</h3>}
            {comments == "" && <p style={{marginLeft:"150px"}}>Currently no comments available...</p>}
            {comments && 
               comments.map((comment)=>(
                    <div key={"comment"+comment.id} style={{ float:"left", clear:"left"}}>
                        <h3>{comment.username}</h3>
                        <p style={{marginLeft:"80px", color:"blue"}}>{comment.comment}</p>
                    </div>
            ))
            }
        </div>
    );
};

//exporting nav bar function
export default ComBody;