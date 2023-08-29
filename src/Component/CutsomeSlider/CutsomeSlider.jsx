import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CutsomeSlider(props) {

    let settings = {
        dots: props.dots,
        infinite: props.infinite,
        speed: props.speed,
        slidesToShow: props.slidesToShow,
        slidesToScroll: props.slidesToScroll,
        autoPlay: props.autoPlay
    };
    console.log(props.children);



    return (
        <div>

            <Slider {...settings}>
                {
                    props.children
                }
            </Slider>
        </div>
    )
}

export default CutsomeSlider
