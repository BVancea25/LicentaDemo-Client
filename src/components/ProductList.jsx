// JobList.js
import React from 'react';

import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import "../App.css"


function ProductList({ products }) {
    const {auth}=useAuth()

    function isNumber(value) {
        return typeof value === 'number';
      }

    return (
      <div className='home-container'>
        {products.map((product) => (
          <div className='product-card' key={product.productId}>
            <h3 className='text'>{product.name}</h3>
            <img src={`http://localhost:8080/images/${product.productId}.jpg`} className='image-container' alt=''></img>
            {isNumber(auth.userId)===true ?<Link  className='button-link' to={`/details/${product.productId}`}>View Details</Link>:<Link className='button-link' to={`/login`}>Log In</Link>}
          </div>
        ))}
      </div>
    );
  }
  
  export default ProductList;