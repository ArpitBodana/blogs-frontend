import { Button } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import router from 'next/router'
import axios from 'axios'
import Image from 'next/image'
import { TextField } from '@mui/material';
import { useState,useEffect } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import Notificationbar from '../components/Notificationbar'
import Restricted from '../components/Restricted';


export default function AboutDashboard({ bio }) {

    const [about, setAbout] = useState(null)
    const [address, setAddress] = useState(null)
    const [myimage, setMyImage] = useState(null)
    const [check, setCheck] = useState(false)
    const [admin,setAdmin]=useState(false)

    const gotoDashborad = () => {
        router.push('/dashboard')
    }

    const gotoAboutDashboard = () => {
        router.push('/aboutdashboard')
    }
    const addBlog = () => {
        router.push('/addblog')
    }
    const changePic = async () => {
        if (myimage === null) {
            console.log('if working');
            setCheck(true)
        }
        else {
            const Token = localStorage.getItem('Token')
            const fd = new FormData()
            fd.append('mypic', myimage, myimage.name)
            const response = await axios.patch('https://chiku.pythonanywhere.com/1', fd, { headers: { 'Authorization': `Token ${Token}` } })
            const data = await response.data

            window.location.reload()
        }
    }



    const changeAbout = async () => {
        if (about === null) {
            console.log('if working');
            setCheck(true)
        } else {
            const Token = localStorage.getItem('Token')

            const response = await axios.patch('https://chiku.pythonanywhere.com/1', { aboutme: about }, { headers: { 'Authorization': `Token ${Token}` } })
            const data = await response.data

            window.location.reload()
        }



    }
    const changeAddress = async () => {
        if (address === null) {
            console.log('if working');
            setCheck(true)
        } else {
            const Token = localStorage.getItem('Token')

            const response = await axios.patch('https://chiku.pythonanywhere.com/1', { address: address }, { headers: { 'Authorization': `Token ${Token}` } })
            const data = await response.data
            window.location.reload()
        }



    }

    useEffect(()=>{
        {localStorage.getItem('Token') && setAdmin(true) }
    })

    if(!admin){
        return(
            <Restricted/>
        )
    }


    return (
        <div className='relative p-2'>


            <div className="md:text-right text-center mb-3 relative">
                <span className="text-2xl md:text-4xl font-body m-3"> Admin Dashboard</span>
            </div>

            <div className=' space-x-2 mb-6'>
                <span className='hover:bg-slate-100 cursor-pointer p-2 text-left font-body' onClick={gotoDashborad}>Blogs</span><span className='hover:bg-slate-100 cursor-pointer p-2 text-left bg-zinc-200 font-body' onClick={gotoAboutDashboard} >About</span>
                <Button variant="outlined" color='info' endIcon={<AddOutlinedIcon />} onClick={addBlog}>Blog</Button>
            </div>
            {bio.map(bios => {
                return (
                    <div key={bios.id}>
                        <div className="space-y-5">
                            <h3 className='font-body m-2 text-2xl'>Change About</h3>
                            <TextField required color='error' label="About" multiline={true} rows={10} defaultValue={bios.aboutme} onChange={(e) => setAbout(e.target.value)} fullWidth={true} className='mt-3' />
                            <Button variant='outlined' color='secondary' onClick={changeAbout} startIcon={<SaveIcon />}>Save</Button>
                            <h3 className='font-body m-2 text-2xl'>Change Address</h3>
                            <TextField required color='error' label="Address" multiline={true} rows={10} defaultValue={bios.address} onChange={(e) => setAddress(e.target.value)} fullWidth={true} className='mt-3' />
                            <Button variant='outlined' color='secondary' onClick={changeAddress} startIcon={<SaveIcon />}>Save</Button>
                        </div>
                        <div className='w-56 md:w-96 space-y-5 mt-2 space-x-3 ml-2'>
                            <h3 className='font-body m-2 text-2xl'>Change Image</h3>
                            <Image src={bios.mypic} width={1} height={1} alt='arpitbodana' layout='responsive' priority={1} />
                            <input type='file' onChange={() => setMyImage(event.target.files[0])} className='w-44 h-9' />
                            <br />
                            <Button variant="outlined" color='error' onClick={changePic}>Change</Button>
                        </div>
                    </div>
                )
            })}
            {check && <Notificationbar msg={"Detect No changes!!"} alert={'warning'} />}


        </div>
    )


}

export async function getServerSideProps() {
    const response = await axios.get('https://chiku.pythonanywhere.com/')
    const data = await response.data

    return {
        props: {
            bio: data,
        }
    }
}