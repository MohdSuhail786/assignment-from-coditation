import MultipleSelectChip from '../MultipleSelectChip/MultipleSelectChip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./ProductForm.css"

export default function ProductForm({product,label,handleSubmit,handleChange}) {
    const navigate = useNavigate()
    const [categoryNames,setCategoryNames] = useState([])
    
    useEffect(async ()=>{
        const res = (await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/category-names`)).data
        setCategoryNames(res.categories)
    },[])
    
    return (
        <>
            <div className='card'>
                <div className='form-container'>
                    <div className="flex">
                        <div style={{cursor:'pointer',marginRight:20}} onClick={()=>navigate('/')}>
                            <ArrowBackIcon />
                        </div>
                        <h2>{label}</h2>
                    </div>
                    <TextField id="outlined-basic" label="Name" value={product.name} onChange={(e)=>handleChange('name',e.target.value)} variant="outlined" />    
                    <TextField id="outlined-basic" label="Price" value={product.price} onChange={(e)=>handleChange('price',e.target.value)} variant="outlined" />    
                    <TextField id="outlined-basic" label="Description" value={product.description} onChange={(e)=>handleChange('description',e.target.value)} variant="outlined" />    
                    <TextField id="outlined-basic" label="Color" value={product.color} onChange={(e)=>handleChange('color',e.target.value)} variant="outlined" />    
                    <TextField id="outlined-basic" label="Stock" value={product.stock} onChange={(e)=>handleChange('stock',e.target.value)} variant="outlined" />    
                    <MultipleSelectChip label={'Categories'} value={product.categories} options={categoryNames} handleChange={(e)=>handleChange('categories',e.target.value)}/>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
        </>
    )
}