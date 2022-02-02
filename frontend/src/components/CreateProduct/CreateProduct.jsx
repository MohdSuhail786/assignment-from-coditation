import axios from "axios";
import {  useState } from "react";
import { ProductForm, Alert } from "../components";


export default function CreateProduct() {

    const [product,setProduct] = useState({name:'',price:'',description:'',color:'',stock:'',categories:[]})
    const [snackBar,setSnackBar] = useState({open:false,message:'',severity:'success'})

    const propsTo = {
        handleSubmit : async (e) => {
            e.preventDefault()
            const res = (await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/product`,product)).data
            if(res.error) {
                setSnackBar({open:true,message:'Some error occurred',severity:'error'});
                return;
            }
            setSnackBar({open:true,message:'Product saved successfully',severity:'success'})
            setProduct({name:'',price:'',description:'',color:'',stock:'',categories:[]})
        },
        handleChange : (key,value) => {
            setProduct({...product,[key]:value})
        },
        product,
        label: "Add Product",
    }
    
    return (
        <>
            <ProductForm {...propsTo}/>
            <Alert {...snackBar} onClose={()=>setSnackBar({open:false,message:'',severity:''})}/>
        </>
    )
}