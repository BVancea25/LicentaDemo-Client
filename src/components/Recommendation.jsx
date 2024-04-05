import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../App.css"
const Recommendation=({recommendations})=>{
    const nav=useNavigate()

    if(recommendations.length===0){
        return <div>Loading recommendations!</div>
    }

    const redirect=(productId)=>{
        nav(`/details/${productId}`)
    }

    
        
    

    

    return(

        <div className='rec-details-container'>
            {recommendations.map((rec)=>(
                <div style={{marginRight:"20px",marginTop:"15px",border:"1px solid", padding:"5px", width:'250px'}} key={rec.id} onClick={()=>redirect(rec.id)}>
                <div className='image-container'>
                    <img src={`http://localhost:8080/images/${rec.id}.jpg`} alt=''></img>
                </div>
                <p className='text'>Name: {rec.name}</p>
                <p className='text'>Brand: {rec.brand}</p>
                <p className='text'>Type: {rec.type}</p>
                <p className='text'>Color: {rec.color}</p>
        </div>
            ))}

        </div>
    );


}

export default Recommendation