import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, ProductForm} from "../components";
import { useParams } from "react-router-dom"


export default function UpdateProduct() {

    const {_productId} = useParams();
    const [product,setProduct] = useState({name:'',price:'',description:'',color:'',stock:'',categories:[]})
    const [snackBar,setSnackBar] = useState({open:false,message:'',severity:'success'})

    useEffect(async()=>{
        const prod = (await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/getProduct?_productId=${_productId}`)).data
        setProduct(prod.product)
    },[])

    const propsTo = {
        handleSubmit : async () => {
            const res = (await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/update/product`,{...product,_productId}))
            if(res.error) {
                setSnackBar({open:true,message:'Some error occurred',severity:'error'});
                return;
            }
            setSnackBar({open:true,message:'Product updated successfully',severity:'success'})
            setProduct({name:'',price:'',description:'',color:'',stock:'',categories:[]})
        },
        handleChange : (key,value) => {
            setProduct({...product,[key]:value})
        },
        product,
        label : 'Update Product',
    }

    return (
        <>
            <ProductForm {...propsTo} />
            <Alert {...snackBar} onClose={()=>setSnackBar({open:false,message:'',severity:''})}/>
        </>
    )
}