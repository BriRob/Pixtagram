import React from "react";
import { useParams } from "react-router-dom";
import './checkmark.css'
import checkmark from './checkmark.png'
function CheckMark(){
    const {id} = useParams
    console.log(id)
    return (
        <>
        <img className='check-mark' src={checkmark}></img>
        </>
    )
}

export default CheckMark
