import { useState, useContext } from 'react';
import "./cart.css";
import { Box, Button, Typography, styled, Badge } from '@mui/material';
import React from 'react';
import { ShoppingCart } from '@mui/icons-material/';
import LoginDialog from '../login/LoginDialog';
import InventoryIcon from '@mui/icons-material/Inventory';
import { DataContext } from '../../context/DataProvider';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Wrapper = styled(Box)(({ theme }) => ({
    margin: '0 3% 0 auto',
    display: 'flex',
    justifyContent: 'space-between', // Adjust space between items
    alignItems: 'center',
    width: '100%',
    '& > *': {
        marginRight: '40px',
        textDecoration: 'none',
        fontSize: 14,
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            marginTop: 10
        },
    },
    [theme.breakpoints.down('md')]: {
        display: 'block'
    }
}));

const Container = styled(Link)(({ theme }) => ({
    display: 'flex',
    textDecoration: 'none',
    color: 'inherit',
    alignItems: 'center',
    flexGrow: 1, // Allow equal space for each container
    justifyContent: 'center', // Center align the content
    [theme.breakpoints.down('md')]: {
        display: 'block'
    }
}));

const LoginButton = styled(Button)(({ theme }) => ({
    color: '#2874f0',
    background: '#FFFFFF',
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 2,
    padding: '5px 25px',
    height: 32,
    boxShadow: 'none',
    [theme.breakpoints.down('md')]: {
        background: '#2874f0',
        color: '#FFFFFF'
    }
}));

const CustomButtons = () => {
    const [open, setOpen] = useState(true);
    const { user } = useSelector(state => state.user);
    const { account, setAccount } = useContext(DataContext);
    const { cartItems } = useSelector(state => state.cart);

    const openDialog = () => {
        setOpen(true);
    }

    return (
        <Wrapper>
            {
                user ? <Profile account={user} setAccount={setAccount} /> :
                    <LoginButton variant='contained' onClick={() => openDialog()}>Login</LoginButton>
            }

            <Container to='/orders' style={{ marginRight: 50}}>
                <InventoryIcon />
                <Typography style={{marginLeft: 10, marginTop: 3, cursor: 'pointer' }}>My Orders</Typography>
            </Container>

            <Container to='/cart'>
                <Badge badgeContent={cartItems?.length} classes={{ badge: 'custom-badge' }}>
                    <ShoppingCart />
                </Badge>
                <Typography style={{ marginLeft: 10 }}>Cart</Typography>
            </Container>
        </Wrapper>
    )
}

export default CustomButtons;