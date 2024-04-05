import useAuth from '../hooks/useAuth';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Rating from 'react-rating-stars-component';
import Recommendation from './Recommendation';
import { useNavigate } from 'react-router-dom'
import "../App.css"

const ProductDetails = () => {
    const { id } = useParams();
    const { auth } = useAuth();
    const [product, setProduct] = useState();
    const [reviews, setReviews] = useState([]);
    const [reviewText,setReviewText]=useState('');
    const [reviewRating,setReviewRating]=useState(0);
    const [recommendations, setRecommendations] = useState([]);
    const [Loading,setLoading]=useState(true);
    const nav=useNavigate()

    const submitReview=()=>{
        sendAction("REVIEWED")

        axios.post(`http://localhost:8080/review/${id}/${auth.userId}`,{rating:reviewRating,comment:reviewText})
        .then(()=>{
            //setReviewText('');
            //setReviewRating(0);
            axios.get(`http://localhost:8080/review/${id}`)
                .then((res)=>{
                    setReviews(res.data);
                })
                .catch((err)=>{
                    console.log(err)
                })
            
        }).catch((err)=>{
            console.log(err)
        })

        
    }

    const redirect=()=>{
        nav("/")
    }

    const sendAction = (action) => {
       
        const weight = setWeight(action);
        if(action==="REVIEWED"){
            axios.post("http://localhost:5000/rec/service", {
                
                    user_id: auth.userId,
                    product_id: id,
                    action: action,
                    weight: weight,
                    review:reviewText,
                    rating:reviewRating
        },{
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken':auth.csrf
                }
            })
            .then((res) => {
                setRecommendations(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
        }else{
            
            axios.post("http://localhost:5000/rec/service", {
                
                    user_id: auth.userId,
                    product_id: id,
                    action: action,
                    weight: weight
        },{
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken':auth.csrf
                }
            })
            .then((res) => {
                setRecommendations(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
        }
    };

    const setWeight = (action) => {
        switch (action) {
            case "BOUGHT":
                return 0.6;
            case "SEEN":
                return 0.3;
            case "WISHLISTED":
                return 0.5;
            default:
                return 1.0;
        }
    };

    

    useEffect(() => {  
      const getData = async () => {
          try {
              const productResponse = await axios.get(`http://localhost:8080/product/${id}`);
              setProduct(productResponse.data);

              const reviewResponse=await axios.get(`http://localhost:8080/review/${id}`)
              setReviews(reviewResponse.data)  

              setLoading(false);
              console.log('Product data fetched successfully');
              // Call sendAction with 'SEEN' when product data is fetched
              sendAction('SEEN');
          } catch (error) {
              console.error('Error fetching product data:', error);
          }
      };
  
      getData();
  }, [id]);


    if (Loading===true) {
        return <p>Loading</p>;
    }

    const handleTextChange=(event)=>{
      setReviewText(event.target.value);
    }

    const handleRatingChange=(event)=>{
      setReviewRating(event.target.value);
    }

    return (
        <div className='product-details-container'>
                
                
                <Recommendation recommendations={recommendations} />
                <button style={{marginLeft:"40%",marginRight:"40%",marginTop:"2%"}} onClick={()=>redirect()}>Back to main page</button>
                <div className='product-info' key={product.productId}>
                    <div className='image-container' style={{marginLeft:"32%"}}><img src={`http://localhost:8080/images/${product.productId}.jpg`}></img></div>
                    
                    <p className='text'>Name: {product.name}</p>
                    <p className='text'>Brand: {product.brand}</p>
                    <p className='text'>Type: {product.type}</p>
                    <p className='text'>Color: {product.color}</p>
                    <p className='text'>{product.description}</p>
                    <button style={{marginRight:"5px"}} onClick={() => sendAction("BOUGHT")} className='text'>Buy</button>
                    <button onClick={() => sendAction("WISHLISTED")} className='text'>Add to wishlist</button>
                </div>
                
                <div className='review-section'>
                    
                    <div className='review-list'>
                        {reviews.map((review) => (
                            <div className='review' key={review.reviewId}>
                                <div className='rating-container'>
                                    <p className='text' style={{marginRight:'10px'}}>{review.userName}</p>
                                    <Rating count={5} size={24} value={review.rating} activeColor="#ffd700" edit={false} />
                                </div>
                                <p className='text'>{review.comment}</p>
                            </div>
                        ))}
                    </div>
                    
                        <input type='text' value={reviewText} placeholder='Write a review!!!' style={{height:"50px"}} onChange={handleTextChange} />
                    <div className='review-form'>
                        <input type='number' value={reviewRating} style={{marginRight:"10px"}} placeholder='Give a rating!!' onChange={handleRatingChange} />
                        <button onClick={()=>submitReview()}>Submit review</button>
                    </div>
                </div>
        </div>
    );
};

export default ProductDetails;
