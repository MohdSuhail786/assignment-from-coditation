import { Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BasicSelect, Alert } from "../components";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from "react-router-dom";

export default function Products() {
    const navigate = useNavigate()
    const [_categoryId,set_categoryId] = useState('all')
    const [categoryNames,setCategoryNames] = useState([{name:'All',_id:'all'}])
    const [snackBar,setSnackBar] = useState({open:false,message:'',severity:'success'})
    const [products,setProducts] = useState([])

    const checkResponse = (res) => {
        if(res.error) {
            setSnackBar({open:true,message:'Some error occurred',severity:'error'});
            return false;
        }
        return true;
    }

    useEffect(async()=>{
        const res = (await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/products?_categoryId=${_categoryId}`)).data
        if(!checkResponse(res)) return;
        setProducts(res.products)
    },[_categoryId])

    useEffect(async ()=>{
        const res = (await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/category-names`)).data
        if(!checkResponse(res)) return;
        setCategoryNames([...categoryNames,...res.categories])
    },[])

    const handleChange = (e) => {
        set_categoryId(e.target.value)
    }

    const handleEdit = (product) => {
        navigate(`/update/product/${product._id}`)
    }

    return (
        <>

            <div className='card'>
                <div className='form-container'>
                    <div className="flex">
                        <h2>Products</h2>
                        <BasicSelect label={'Category'} value={_categoryId} options={categoryNames} handleChange={handleChange}/>
                    </div>
                    <List>
                        <Divider />
                        {products.length !==0 ? products.map(v=> {
                            return (
                                <ListItem disablePadding 
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete" onClick={()=>handleEdit(v)}>
                                            <EditOutlinedIcon />
                                        </IconButton>
                                }>
                                    <ListItemAvatar>
                                        <div style={{display:'flex',justifyContent:'center',alignItem:'center'}}>
                                        <MonetizationOnIcon />
                                        <span style={{fontSize:15}}>{v.price}</span>
                                        </div>
                                    </ListItemAvatar>
                                    <ListItemButton component="a" href="#simple-list">
                                    <ListItemText primary={v.name} secondary={v.description}/>
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                        :
                        <div className="no-content">
                            No Product
                        </div>
                        }
                    </List>
                </div>
            </div>
            <Alert {...snackBar} onClose={()=>setSnackBar({open:false,message:'',severity:''})}/>
        </>
    )
}