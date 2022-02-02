import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { BasicSelect } from '../components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CategoryForm({label,category,handleChange,handleSubmit}) {
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
                    <form onSubmit={handleSubmit} className='form-container' style={{margin:0,padding:0}}>
                    <TextField required id="outlined-basic" label="Name" value={category.name} onChange={(e)=>handleChange('name',e.target.value)} variant="outlined" />    
                    <BasicSelect label={'Parent Category'} value={category._parentCategoryId} options={categoryNames} handleChange={(e)=>handleChange('_parentCategoryId',e.target.value)}/>
                    <Button variant="contained" type='submit'>Submit</Button>
                    </form>
                </div>
            </div>
        </>
    )
}