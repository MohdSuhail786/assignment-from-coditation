import { Card, CardActionArea, CardContent, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import DomainVerificationOutlinedIcon from '@mui/icons-material/DomainVerificationOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import {useNavigate} from 'react-router-dom'

export default function NavBar({toggleDrawer}) {

    const navigate = useNavigate();

    const list = [
        {
            name: 'Products',
            icon: <FormatListBulletedOutlinedIcon />,
            path: '/'
        },
        {
            name: 'Categories',
            icon: <DomainVerificationOutlinedIcon />,
            path: '/categories'
        },
        {
            name: 'Add Product',
            icon: <AddCardOutlinedIcon />,
            path: '/add/product'
        },
        {
            name: 'Add Category',
            icon: <CategoryIcon />,
            path: '/add/category'
        }
    ]

    const handleClick = (key) => {
        navigate(key)
    }

    return (
        <div
            className="nav-bar"
            role={'presentation'}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom varient='h5' component='h2'>
                            Hey!!   
                        </Typography>
                        <Typography variant="body2" color='textSeconday' component='p'>
                            Welcome to my assignment
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Divider />
            <List>
                {list.map(v=>{
                    return(<ListItem button key={v.name} onClick={()=>handleClick(v.path)}>
                        <ListItemIcon>
                            {v.icon}
                        </ListItemIcon>
                        <ListItemText primary={v.name} />
                    </ListItem>)
                })}
            </List>
        </div>
    )
}