import TextField from '@mui/material/TextField';
import "./ProductForm.css"
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import Alert from '../Alert/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MultipleSelectChip from '../MultipleSelectChip/MultipleSelectChip';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductForm() {
    const navigate = useNavigate()
    const {_productId} = useParams();
    const [product,setProduct] = useState({name:'',price:'',description:'',color:'',stock:'',categories:[]})
    const [snackBar,setSnackBar] = useState({open:false,message:'',severity:'success'})
    const [categoryNames,setCategoryNames] = useState([])

    useEffect(()=>{
        setProduct({name:'',price:'',description:'',color:'',stock:'',categories:[]})
    },[_productId])
    
    const checkResponse = (res) => {
        if(res.error) {
            setSnackBar({open:true,message:'Some error occurred',severity:'error'});
            return false;
        }
        return true;
    }

    useEffect(async ()=>{
        const res = (await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/category-names`)).data
        if(!checkResponse(res)) return;
        setCategoryNames(res.categories)
        if(_productId === undefined) return;
        const prod = (await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/getProduct?_productId=${_productId}`)).data
        if(!checkResponse(prod)) return;
        setProduct(prod.product)
    },[])

    const handleSubmit = async () => {
        if(window.location.href.includes('update/product')) {
            const res = (await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/update/product`,{...product,_productId}))
            if(!checkResponse(res)) return;
            setSnackBar({open:true,message:'Product updated successfully',severity:'success'})
            setProduct({name:'',price:'',description:'',color:'',stock:'',categories:[]})
            return;
        }
        const res = (await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/product`,product)).data;
        if(!checkResponse(res)) return;
        setSnackBar({open:true,message:'Product saved successfully',severity:'success'})
        setProduct({name:'',price:'',description:'',color:'',stock:'',categories:[]})
    }
    

    const handleChange = (e) => {
        setProduct({...product,categories:e.target.value})
    }

    return (
        <>
            <div className='card'>
                <div className='form-container'>
                    <div className="flex">
                        <div style={{cursor:'pointer',marginRight:20}} onClick={()=>navigate('/')}>
                            <ArrowBackIcon />
                        </div>
                        <h2>Product Form</h2>
                    </div>
                    <TextField id="outlined-basic" label="Name" value={product.name} onChange={(e)=>setProduct({...product,name:e.target.value})} variant="outlined" />    
                    <TextField id="outlined-basic" label="Price" value={product.price} onChange={(e)=>setProduct({...product,price:e.target.value})} variant="outlined" />    
                    <TextField id="outlined-basic" label="Description" value={product.description} onChange={(e)=>setProduct({...product,description:e.target.value})} variant="outlined" />    
                    <TextField id="outlined-basic" label="Color" value={product.color} onChange={(e)=>setProduct({...product,color:e.target.value})} variant="outlined" />    
                    <TextField id="outlined-basic" label="Stock" value={product.stock} onChange={(e)=>setProduct({...product,stock:e.target.value})} variant="outlined" />    
                    <MultipleSelectChip disabled={!(_productId === undefined)} label={'Categories'} value={product.categories} options={categoryNames} handleChange={handleChange}/>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
            <Alert {...snackBar} onClose={()=>setSnackBar({open:false,message:'',severity:''})}/>
        </>
    )
}