import React, { useEffect, useState } from 'react'
import CutsomeSlider from '../CutsomeSlider/CutsomeSlider'
import SimpleSliderTemplate from '../CutsomeSlider/SimpleSliderTemplate';
import './style.css'
import WhiteBox from '../WhiteBox/WhiteBox';
import { useParams } from 'react-router-dom';
import fbConnection from '../../firebase/config';

function ProductView(props) {


    let [productData, productUpdate] = useState({});

    let { id } = useParams();

    useEffect(() => {
        fbConnection.firestore().collection("product").doc(id).get().then((product) => {
            productUpdate(product.data())
            console.log(productData);
        })
       
    }, [])


    let sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoPlay: false,
    };


    return (
        <div className="productBody">
            <div className='main_container'>

                <div className="adsContainer">
                    <div className="leftAds">
                        <div className="bannerSlider">
                            <img src={productData.image} alt="" />
                        </div>
                        <WhiteBox>
                            <h4 style={{ marginBottom: "10px" }}>About the product</h4>
                            <p>{productData.description}</p>
                        </WhiteBox>
                    </div>
                    <div className="rightAds">
                        <WhiteBox>
                            <div className="whiteBoxContent">
                                <h2>₹ {productData.price}</h2>
                                <p>{productData.location}</p> 
                            </div>
                        </WhiteBox>
                        <WhiteBox>
                            <div className="whiteBoxContent">
                                <div className="toperUserData">
                                    <img src={productData?.owner?.profile} alt="" />
                                    <h2>{productData?.owner?.username}</h2>
                                </div>
                                <button class="contactBtn"> Contact Now</button>
                            </div>
                        </WhiteBox>
                        <WhiteBox>
                            <div className="whiteBoxContent">
                                <h4>Posted In</h4>
                                <p>Samudrapur, Maharashtra, India</p>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14935.157273141424!2d78.95271053352158!3d20.637442625532547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd366d21416aa6d%3A0x267d871a25c53069!2sSamudrapur%2C%20Maharashtra%20442305!5e0!3m2!1sen!2sin!4v1692264364215!5m2!1sen!2sin" width="100%" height="200" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </WhiteBox>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductView
