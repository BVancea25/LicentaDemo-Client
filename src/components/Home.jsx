import React from 'react'
import ProductList from "./ProductList"
import axios from 'axios';
import { useState,useEffect } from 'react';
import "../App.css"
import Recommendation from './Recommendation';
import useAuth from '../hooks/useAuth';
const  Home=()=>{
    const [products, setProducts] = useState([]);
    const [recommendations,setRecommendations]=useState([])
    const {auth} = useAuth();

    const getRec=()=>{
      
      if(auth.userId===undefined){
          axios.post("http://localhost:5000/rec",{
            
              user_id:"none"
            
            },{
              headers:{
                'X-CSRFToken':auth.csrf
              }
            }
            )
          .then((res)=>{
            setRecommendations(res.data);
          })
          .catch((err)=>{
            console.log(err);
          })
        }else{
          axios.post("http://localhost:5000/rec",{
            
              user_id:auth.userId
        },{
            headers:{
              'X-CSRFToken':auth.csrf
            }
            }
            )
          .then((res)=>{
            setRecommendations(res.data);
          })
          .catch((err)=>{
            console.log(err);
          })
        }
    }

    

    useEffect(() => {
      axios
        .get("http://localhost:8080/product")
        .then((res)=>{
          console.log(res.data);
          setProducts(res.data);
        })
        .catch((err)=>{
          console.error(err);
        })
      
        getRec()
    }, []);
  
 
  
    return (
      <div className=''>
        
        
        <Recommendation recommendations={recommendations}/>
        <h1 className='page-title'>Products</h1>
        <ProductList products={products}/>

        
      </div>
    );
  }
  
  export default Home;