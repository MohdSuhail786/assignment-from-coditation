import { Avatar, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from "react";

export default function CollapseListItem({k,name,child_categories}) {

    const [open,setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    }
    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <Avatar style={{backgroundColor:"#1976d2"}}>
                        {k+1}
                    </Avatar>
                </ListItemIcon>
                <ListItemText primary={name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        child_categories.length !==0 ? child_categories.map((v,key)=>{
                            return (
                                <ListItemButton key={v._id+'1'} sx={{pl:4}}>
                                    <ListItemIcon>
                                        <Avatar style={{backgroundColor:"red"}}>
                                            {String.fromCharCode('a'.charCodeAt(0) + key)}
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary={v.name} />
                                </ListItemButton>
                            )
                        })
                    :
                        <div style={{margin:10}}>
                            No Category
                        </div>
                    }
                </List>
            </Collapse>
        </>
    )
}