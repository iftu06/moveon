import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import Price from "../model/price";
import ProductDetails from "../model/products";
import Property from "../model/prop";
import PropertyValues from "../model/property_value";
import Sku from "../model/sku";
import Variation from "../model/variation";
import GalleryComp from "./GalleryComp";

const intialState = {
    colorTile: 'Black',
    sizeTitle: '39',
    discounted: 26.41,
    old: 30.22,
    title: '',
 
}


const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'CHANGE_SIZE':
            return { ...state, discounted: action.discounted, old: action.old, sizeTitle: action.sizeTitle }
        case 'CHANGE_COLOR':
            return { ...state, discounted: action.discounted, old: action.old, colorTile: action.colorTile }
        default:
            return intialState

    }
}

const ProductComp = (props: any) => {

    const product: ProductDetails = props.product;
    const variation: Variation = product.variation;

    const colorProperty: Property = variation.props.find((prop) => prop.name == "Color")!;
    const sizeProperty: Property = variation.props.find((prop) => prop.name == "Shoe Size")!;
    const colorValues: PropertyValues[] = colorProperty.values!;
    const sizeValues: PropertyValues[] = sizeProperty.values!;

    const [colorId, setColor] = useState(771);
    const [sizeId, setSize] = useState(200000364);
    const [state, dispatch] = useReducer(reducer, intialState)

    const changeColor = (newColorId: number) => {
        setColor(newColorId);
        let sku: Sku = getSkuByProps();
        let colorValue: PropertyValues = getColor(colorId)!;
        let newState = {
            type: "CHANGE_COLOR",
            old: sku.price.old, discounted: sku.price.discounted, colorTile: colorValue.title

        }
        dispatch(newState)
    }


    const changeSize = (sizeId: number) => {
        setSize(sizeId);
        let sku: Sku = getSkuByProps();
        let sizeValue: PropertyValues = getSize(sizeId)!;
        let newState = {
            type: "CHANGE_SIZE",
            old: sku.price.old, discounted: sku.price.discounted, sizeTitle: sizeValue.title
        }
        dispatch(newState)
    }

    function getColor(colorId: number) {

        let colorProperty: Property = variation.props.find((prop) => prop.name == "Color")!;
        return colorProperty.values.find(coloProp => coloProp.id == colorId);

    }

    function getSize(sizeId: number) {
        let sizeProperty: Property = variation.props.find((prop) => prop.name == "Shoe Size")!;
        return sizeProperty.values.find(sizeProp => sizeProp.id == sizeId);
    }

    function getSkuByProps(): Sku {
        let sku: Sku = { id: 0, price: null!, props: null!, stock: 0 }
        variation.skus.find((skuItr) => {
            let prop: number[] = skuItr.props
            if (prop[0] == colorId && prop[1] == sizeId) {
                sku = skuItr;
            }
        })
        return sku;
    }

    return (
        <div>

            <h1>{product.title}</h1>
            <h1>Old Price {state.old}</h1>
            <h1>Discounted Price {state.discounted}</h1>
            <h1>Color {state.colorTile && state.colorTile}</h1>
            <ul>
                {
                    colorValues.map((colorValue) => {
                        return <li onClick={() => changeColor(colorValue.id)}>
                            {colorValue.name}
                        </li>
                    })
                }
            </ul>

            <h1>Size {state.sizeTitle && state.sizeTitle}</h1>
            <ul>
                {
                    sizeValues.map((sizeValue) => {
                        return <li onClick={() => changeSize(sizeValue.id)}>
                            {sizeValue.name}
                        </li>
                    })
                }
            </ul>


        </div>
    )
}

export default ProductComp