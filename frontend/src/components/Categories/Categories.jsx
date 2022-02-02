import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { List } from "@mui/material";
import { useEffect, useState } from "react";
import { CollapseListItem, Alert } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Categories() {
    const navigate = useNavigate();
    const [categories,setCategories] = useState([])
    const [snackBar,setSnackBar] = useState({open:false,message:'',severity:'success'})

    const checkResponse = (res) => {
        if(res.error) {
            setSnackBar({open:true,message:'Some error occurred',severity:'error'});
            return false;
        }
        return true;
    }

    useEffect(async ()=>{
        const res = (await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/category`)).data
        if(!checkResponse(res)) return;
        setCategories(res.categories)
    },[])

    return (
        <>

            <div className='card'>
                <div className='form-container'>
                    <div className="flex">
                    <div style={{cursor:'pointer',marginRight:20}} onClick={()=>navigate('/')}>
                            <ArrowBackIcon />
                        </div>
                        <h2>Categories</h2>
                        <div style={{cursor:'pointer'}} onClick={()=>navigate('/add/category')}>
                            <AddIcon />
                        </div>
                    </div>
                    <List>
                        { 
                            categories.length!==0 ? categories.map((v,k)=>{
                                return (
                                    <CollapseListItem key={v.id} k={k} {...v}/>
                                )
                            })
                        :
                            <div className="no-content">
                                No category
                            </div>
                        }
                    </List>
                </div>
            </div>
            <Alert {...snackBar} onClose={()=>setSnackBar({open:false,message:'',severity:''})}/>
        </>
    )
}