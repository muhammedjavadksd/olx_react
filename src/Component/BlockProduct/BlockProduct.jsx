import React, { useEffect, useState } from 'react'
import ProductItem from '../ProductItem/ProductItem'
import './assets/css/style.css'
import fbConnection from '../../firebase/config';

function BlockProduct() {





    let [productData, productUpdate] = useState([]);

    useEffect(() => {
        fbConnection.firestore().collection("product").get().then((snap) => {
            let data = [];
            snap.forEach((item) => {
                data.push({
                    _id: item.id,
                    ...item.data(),
                })
            })
            productUpdate(data)
            console.log(data);
        })
    },[])

    return (
        <div className='blockProduct'>
            <h4 className='blockHead'>More on Cars</h4>
            <div className='blockItems'>
                {
                    productData.map((item) => {
                        console.log(item);
                        return <ProductItem id={item._id} name={item.name} price={item.price} image={item.image} description={item.description}></ProductItem>
                    })
                }
            </div>
        </div>
    )
}

export default BlockProduct
