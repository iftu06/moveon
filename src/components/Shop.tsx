import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import ProductDetails from "../model/products";
import GalleryComp from "./GalleryComp";
import ProductComp from "./ProductComp";

// const intialState = {}
// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'CHANGE_SIZE':
//             return {

//             }
//         case 'CHANGE_COLOR':
//             return {}
//         default:
//             return intialState
//     }

// }

const Shop = () => {

    // const [state, dispatch] = useReducer(reducer, intialState)
    const [product, setProduct] = useState<ProductDetails>()

    useEffect(() => {
        axios.get("https://moveon-api-server.sbox.ali2bd.net/api/v1/customer/dummy-product")
            .then((resp) => {
                const product: ProductDetails = resp.data
                console.log(product);
                setProduct(product)
            })
    }, [])
    return (
        <div>
            
            {product && <GalleryComp gallery={product?.gallery}></GalleryComp>} 
            {product && <ProductComp product={product}></ProductComp>}
           
        </div>
    )
}

export default Shop