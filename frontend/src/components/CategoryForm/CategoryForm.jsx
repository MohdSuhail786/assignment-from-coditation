import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BasicSelect from '../BasicSelect/BasicSelect';
import Alert from '../Alert/Alert';
import { useNavigate } from 'react-router-dom';

export default function CategoryForm() {
    const navigate = useNavigate()
    const [category,setCategory] = useState({name:'',_parentCategoryId:null})
    const [categoryNames,setCategoryNames] = useState([])
    const [snackBar,setSnackBar] = useState({open:false,message:'',severity:'success'})

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
    },[])

    const handleSubmit = async () => {
        const res = (await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/category`,category)).data;
        if(!checkResponse(res)) return;
        setSnackBar({open:true,message:'New category added',severity:'success'})
        setCategory({name:'',_parentCategoryId:null})
    }

    const handleChange = (e) => {
        setCategory({...category,_parentCategoryId:e.target.value})
    }

    return (
        <>
            <div className='card'>
                <div className='form-container'>
                <div className="flex">
                        <div style={{cursor:'pointer',marginRight:20}} onClick={()=>navigate('/')}>
                            <ArrowBackIcon />
                        </div>
                        <h2>Category Form</h2>
                    </div>
                    <TextField id="outlined-basic" label="Name" value={category.name} onChange={(e)=>setCategory({...category,name:e.target.value})} variant="outlined" />    
                    <BasicSelect label={'Parent Category'} value={category._parentCategoryId} options={categoryNames} handleChange={handleChange}/>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
            <Alert {...snackBar} onClose={()=>setSnackBar({open:false,message:'',severity:''})}/>
        </>
    )
}