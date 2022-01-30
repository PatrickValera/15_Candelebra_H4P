import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../state/actions/userActions'
import { useNavigate } from 'react-router-dom'

const Header = ({theme,setTheme}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [email, setEmail] = useState('')
  const [checked, setChecked] = useState(true)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleChange=()=>{
    setChecked(state=>!state)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  useEffect(() => {
    if (userInfo) setEmail(userInfo.email)
    else setEmail('No user Logged in')
  }, [userInfo]);
  useEffect(()=>{
    if(!checked)setTheme('dark')
    else setTheme('light')
  },[checked])
  return (
    <Box display='flex' sx={{ width: '100%', alignItems: 'center' }}>
      <Box className='logo-container' sx={{ width: '30px',p:'3px' }}>
        <img className='image-fit-cover' src='candle.png' alt='logo?'/>
      </Box>
      <Box sx={{ display: 'flex', flexGrow: '1' }}>
        <Typography varaint='h1' onClick={()=>navigate('/')} sx={{cursor:'pointer'}}>CANDELEBRA</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{email ? email[0].toUpperCase() : '?'}</Avatar>
          </IconButton>
        </Tooltip>
        <Typography variant='body1' sx={{ minWidth: '80px', maxWidth: '200px', cursor: 'pointer', textAlign: 'left' }}>{email && email}</Typography>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        {/* <MenuItem>
          <Avatar /> My account
        </MenuItem> */}
        <Divider />
        {/* <MenuItem>
          <ListItemIcon><PersonAdd fontSize='small' /></ListItemIcon>
          Add another account
        </MenuItem> */}
        <MenuItem>
          <ListItemIcon>{/* <Settings fontSize='small' /> */}</ListItemIcon>
          Settings
        </MenuItem>
        {!userInfo ?
          <MenuItem onClick={() => navigate('/user/login')}>
            <ListItemIcon>{/* <Logout fontSize='small' /> */}</ListItemIcon>
            Login
          </MenuItem> :
          <MenuItem onClick={() => dispatch(logout())}>
            <ListItemIcon>{/* <Logout fontSize='small' /> */}</ListItemIcon>
            Logout
          </MenuItem>}
      </Menu>
    </Box>
  )
}

export default Header
