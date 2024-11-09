import { useState } from 'react';
import { Typography, Box, Menu, MenuItem, styled } from '@mui/material';
import React from 'react';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import axios from "../../axios/axios"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUserAction } from '../../redux/actions/userActions';

const Component = styled(Menu)`
    margin-top: 5px;
`

const Logout = styled(Typography)`
    font-size: 14px;
    margin-left: 20px;
`

const Profile = ({account, setAccount}) => {
  const navigate = useNavigate();
    const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
    const handleClick = (event) => {
        setOpen(event.currentTarget);
    }

    const handleClose =() => {
        setOpen(false);
    }

    const logoutUser = async() => {
      await axios.delete('/auth/logout').then(res => console.log(res.data)).catch(err => alert(err.data.message));
      dispatch(logoutUserAction())
      navigate('/login');
      // setAccount('');
    }

  return (
    <>
    <Box onClick={handleClick} >
        <Typography style={{marginTop: 3, marginRight:'20px', cursor: 'pointer'}}> {account.name} </Typography>
    </Box>
    <Component
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {handleClose(); logoutUser(); }}>
            <PowerSettingsNewIcon color='primary' fontSize='small' />
            <Logout>Logout</Logout>
        </MenuItem>
      </Component>
    </>
  )
}

export default Profile;