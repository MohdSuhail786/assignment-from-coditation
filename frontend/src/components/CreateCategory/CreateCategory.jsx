import axios from "axios";
import { useState } from "react";
import { CategoryForm, Alert } from "../components";

export default function CreateCategory() {

    const [category,setCategory] = useState({name:'',_parentCategoryId:null})
    const [snackBar,setSnackBar] = useState({open:false,message:'',severity:'success'})

    const propsTo = {
        handleSubmit : async () => {
            const res = (await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/category`,category)).data;
            if(res.error) {
                setSnackBar({open:true,message:'Some error occurred',severity:'error'});
                return;
            }
            setSnackBar({open:true,message:'New category added',severity:'success'})
            setCategory({name:'',_parentCategoryId:null})
        },
        handleChange : (key,value) => {
            setCategory({...category,[key]:value})
        },
        category,
        label : 'Add Category',
    }

    return (
        <>
            <CategoryForm {...propsTo} />
            <Alert {...snackBar} onClose={()=>setSnackBar({open:false,message:'',severity:''})}/>
        </>
    )
}