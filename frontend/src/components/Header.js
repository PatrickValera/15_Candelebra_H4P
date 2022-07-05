import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import { BsSunFill } from 'react-icons/bs'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../state/actions/userActions'
import { useNavigate } from 'react-router-dom'
import { BsMoonStarsFill } from 'react-icons/bs'
import { VscGraph } from 'react-icons/vsc'

const Header = ({ theme, setTheme }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [email, setEmail] = useState('')
  const [checked, setChecked] = useState(true)

  console.log(theme)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleChange = () => {
    setChecked(state => !state)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  useEffect(() => {
    if (userInfo) setEmail(userInfo.email)
    else setEmail('Login')
  }, [userInfo]);
  useEffect(() => {
    if (!checked) setTheme('dark')
    else setTheme('light')
  }, [checked])
  return (
    <Box display='flex' sx={{ width: '100%', alignItems: 'center' }}>
      {/* LOGO ========================= */}
      <Box sx={{ width: '30px', p: '3px' }}>
        <VscGraph style={{ fontSize: '1.5rem' }} />
      </Box>
      {/* NAME ========================= */}
      <Box sx={{ display: 'flex', flexGrow: '1' }}>
        <Typography varaint='h1' onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>TRADE SIM</Typography>
      </Box>
      {/* ACCOUNT MENU AND THEME TOGGLE =========== */}
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

        <Button variant='text' sx={{ color: 'secondary.main', p: '.3rem', fontSize: '1.2rem', minWidth: 'unset' }} onClick={handleChange} >
          {theme === 'light' ? <BsMoonStarsFill style={{ color: 'inherit' }} /> : <BsSunFill />}
        </Button>
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
        <Typography variant='body1' sx={{ display: { xs: 'none', md: 'block' }, minWidth: '80px', maxWidth: '200px', cursor: 'pointer', textAlign: 'left' }}>{email && email}</Typography>
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

        <MenuItem>
          Settings
        </MenuItem>
        <MenuItem>
          Leaderboard
        </MenuItem>
        {!userInfo ?
          <MenuItem onClick={() => navigate('/user/login')}>
            Login
          </MenuItem> :
          <MenuItem onClick={() => dispatch(logout())}>
            Logout
          </MenuItem>}
      </Menu>
    </Box>
  )
}

export default Header
