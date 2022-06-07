import React, { useEffect, useReducer } from "react";
import Gallery from "../model/gallery";

function GalleryComp(props: any) {
    const galleries: Gallery[] = props.gallery
    return (<div>

        {
            galleries.map(gal => {
                return <img key ={gal.thumb} src={gal.url}></img>
            })
        }
    </div>)

}

export default GalleryComp