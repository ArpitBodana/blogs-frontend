import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import axios from 'axios'
import { useRouter } from 'next/router';







const ResponsiveAppBar = () => {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const router = useRouter()
    const [token ,setToken]=React.useState(null)
       


    React.useEffect(() => {
        {localStorage.Token &&setToken(localStorage.Token)}
        

    })
    
    const handleLogout = () => {
        const Token =localStorage.getItem('Token')
        const response= axios.get('https://chiku.pythonanywhere.com/logout/',{ headers: { 'Authorization': `Token ${Token}`}}).then((res) => {
            localStorage.removeItem('Token')
            router.push('/')
            setTimeout(()=>window.location.reload(),1600)
            
        }).catch(err =>console.log(err))

    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        < div className='font-body bg-zinc-800 w-full'>
            <AppBar position="static" color='transparent' >
                <Container maxWidth="xl" >
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}

                        >
                            <span className='font-body text-3xl text-red-500 mr-16'>Make Difference</span>
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="primary"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >

                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link href={'/'}>
                                        <a>

                                            <Typography textAlign="center" className='font-body'>Home</Typography>
                                        </a>
                                    </Link>
                                </MenuItem>
                                <span className="">
                                    <MenuItem onClick={handleCloseNavMenu} className=''>
                                        <Link href={'/about'} >
                                            <a >
                                                <span className="">
                                                    <Typography textAlign="center" className='font-body'>About</Typography>
                                                </span>
                                            </a>
                                        </Link>
                                    </MenuItem>
                                </span>
                                <span className="">
                                    <MenuItem onClick={handleCloseNavMenu} className={`${token && 'hidden'}`} >
                                        <Link href={'/login'}>
                                            {/* {`${!user && 'hidden'}`} */}
                                            <a>
                                                <span className="">
                                                    <Typography textAlign="center" className='font-body' >Admin</Typography>
                                                </span>
                                            </a>
                                        </Link>
                                    </MenuItem>
                                </span>
                                <span className="">
                                    <MenuItem onClick={handleCloseNavMenu} className={`${!token && 'hidden'}`}>
                                        <Link href={'/dashboard'}>
                                            <a>
                                                <span className="">
                                                    <Typography textAlign="center" className='font-body'>DashBoard</Typography>
                                                </span>
                                            </a>
                                        </Link>
                                    </MenuItem>
                                </span>
                                <span className="">
                                    <MenuItem onClick={handleCloseNavMenu} className={`${!token && 'hidden'}`}>


                                        <span className="">
                                            <Typography textAlign="center" className='font-body' onClick={handleLogout}>LogOut</Typography>
                                        </span>

                                    </MenuItem>
                                </span>


                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            <span className='font-body text-2xl text-red-500'>Make Difference</span>
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
                            <Link href={'/'} >
                                <a>

                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'info', display: 'block' }}

                                    >
                                        <span className='font-body text-slate-50'>Home</span>
                                    </Button>
                                </a>
                            </Link>
                            <Link href={'/about'} >
                                <a>
                                    <span className=''>
                                        <Button
                                            onClick={handleCloseNavMenu}
                                            sx={{ my: 2, color: 'info', display: 'block' }}


                                        >
                                            <span className='font-body text-slate-50'> About</span>
                                        </Button>
                                    </span>
                                </a>
                            </Link>
                            <Link href={'/login'} >
                                <a>
                                    <span className={`${token && 'hidden'}`}>
                                        <Button
                                            onClick={handleCloseNavMenu}
                                            sx={{ my: 2, color: 'info', display: 'block' }}


                                        >
                                            <span className='font-body text-slate-50'>Admin</span>
                                        </Button>
                                    </span>
                                </a>
                            </Link>

                            <Link href={'/dashboard'} >
                                <a>
                                    <span className={`${!token && 'hidden'}`}>
                                        <Button
                                            onClick={handleCloseNavMenu}
                                            sx={{ my: 2, color: 'info', display: 'block' }}


                                        >
                                            <span className='font-body text-slate-50'>DashBoard</span>
                                        </Button>
                                    </span>
                                </a>
                            </Link>

                            <span className={`${!token && 'hidden'}`}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'info', display: 'block' }}

                                >
                                    <span className='font-body text-slate-50' onClick={handleLogout}>LogOut</span>
                                </Button>
                            </span>

                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>
            <hr />


        </div>
    );
};
export default ResponsiveAppBar;
