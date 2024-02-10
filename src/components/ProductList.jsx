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
            <p className='text'>Brand: {product.brand}</p>
            {isNumber(auth.userId)===true ?<Link to={`/details/${product.productId}`}>View Details</Link>:<Link to={`/login`}>Log In</Link>}
          </div>
        ))}
      </div>
    );
  }
  
  export default ProductList;