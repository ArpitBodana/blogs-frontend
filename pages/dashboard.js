import axios from 'axios'
import { TextField } from '@mui/material';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useEffect } from 'react'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import SaveIcon from '@mui/icons-material/Save';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import router from 'next/router'
import Notificationbar from '../components/Notificationbar'
import Image from 'next/image'
import Restricted from '../components/Restricted';

export default function Dashboard({ blogs }) {
    const [title, setTitle] = useState(null)
    const [body, setBody] = useState(null)
    const [tag, setTag] = useState(null)
    const [myimage, setMyImage] = useState(null)
    const [check, setCheck] = useState(false)
    const [admin,setAdmin]=useState(false)
    const handleDelete = async (id) => {
        const Token = localStorage.getItem('Token')
        const response = await axios.delete(`https://chiku.pythonanywhere.com/blogs/${id}`, { headers: { 'Authorization': `Token ${Token}` } })
        const data = await response.data
        window.location.reload()
    }
    
    useEffect(()=>{
        {localStorage.getItem('Token') && setAdmin(true) }
    })

    const changePic = async (myid) => {
        if (myimage === null) {
            setCheck(true)
        }
        else {
            const Token = localStorage.getItem('Token')
            const fd = new FormData()
            fd.append('image', myimage, myimage.name)
            const response = await axios.patch(`https://chiku.pythonanywhere.com/blogs/${myid}`, fd, { headers: { 'Authorization': `Token ${Token}` } })
            const data = await response.data
            window.location.reload()
        }
    }
    const handleEdit = async (myid, mytitle, mybody, mytag) => {

        var newtitle
        var newtag
        var newbody
        const Token = localStorage.getItem('Token')
        if (title === null) {
            newtitle = mytitle

        } else {

            newtitle = title
        }
        if (body === null) {
            newbody = mybody
        } else {

            newbody = body
        }
        if (tag === null) {
            newtag = mytag
        } else {

            newtag = tag
        }

        const response = await axios.put(`https://chiku.pythonanywhere.com/blogs/${myid}`, { title: newtitle, body: newbody, tag: newtag }, { headers: { 'Authorization': `Token ${Token}` } })
        const data = await response.data
        window.location.reload()
    }

    const gotoDashborad = () => {
        router.push('/dashboard')
    }

    const gotoAboutDashboard = () => {
        router.push('/aboutdashboard')
    }
    const addBlog = () => {
        router.push('/addblog')
    }


    
    if(!admin){
        return(
            <Restricted/>
        )
    }

    return (
        <div className="pt-5 relative space-y-8">


            <div className="md:text-right text-center mb-3 relative">
                <span className="text-2xl md:text-4xl font-body m-3"> Admin Dashboard</span>
            </div>

            <div className=' space-x-2 relative space-y-5'>
                <span className='hover:bg-slate-100 cursor-pointer p-2 text-left bg-zinc-200 font-body' onClick={gotoDashborad}>Blogs</span><span className='hover:bg-slate-100 cursor-pointer p-2 text-left font-body ' onClick={gotoAboutDashboard} >About</span>
                <Button variant="outlined" color='info' endIcon={<AddOutlinedIcon />} onClick={addBlog}>Blog</Button>
            </div>
            {blogs.map(blog => {
                return (
                    <div key={blog.id} className="text-justify pb-4 mb-4 relative space-y-5 ">
                        <TextField value={blog.id} fullWidth={true} label="Id" className='mt-3' />
                        <TextField required defaultValue={blog.title} label="Title" fullWidth={true} onChange={(e) => setTitle(e.target.value)} className='mt-3' />

                        {blog.image ? <div className='space-y-5 mt-2 space-x-3 ml-2 container'>
                            <h3 className='font-body m-2 md:text-xl text-md'>Change Image For Blog -{blog.id}</h3>
                            <Image className='' src={blog.image} width={0.14} height={0.07} alt={blog.title} layout='responsive' priority={1} />
                            <input type='file' onChange={() => setMyImage(event.target.files[0])} className='w-44 h-9' />
                            <br />
                            <Button variant="outlined" color='error' onClick={() => changePic(blog.id)}>Change</Button>
                        </div> : <div className='space-y-5 mt-2 space-x-3 ml-2 '>
                            <h3 className='font-body m-2 md:text-xl text-md'>Add Image</h3>
                            <input type='file' onChange={() => setMyImage(event.target.files[0])} className='w-44 h-9' />
                            <br />
                            <Button variant="outlined" color='error' onClick={() => changePic(blog.id)}>Change</Button>
                        </div>}

                        <TextField required label="Body" multiline={true} rows={10} defaultValue={blog.body} onChange={(e) => setBody(e.target.value)} fullWidth={true} className='mt-3' />
                        <TextField required defaultValue={blog.tag} label="Tag" onChange={(e) => setTag(e.target.value)} fullWidth={true} className='mt-3' />
                        <TextField value={blog.date} fullWidth={true} label="Posting Date" className='mt-3' />

                        <div className='mt-4 flex justify-around border-b-2 border-blue-400'>
                            <Button variant='outlined' color='secondary' onClick={() => handleEdit(blog.id, blog.title, blog.body, blog.tag)} startIcon={<SaveIcon />}>Save</Button>
                            <Button variant='outlined' color='error' onClick={() => handleDelete(blog.id)} startIcon={<DeleteSharpIcon />}>Delete</Button>
                        </div>

                    </div>
                )

            })}
            {check && <Notificationbar msg={"Detect No changes!!"} alert={'warning'} />}
        </div>
    )
}

export async function getServerSideProps() {
    const response = await axios.get("https://chiku.pythonanywhere.com/blogs/read/")
    const data = await response.data.reverse()

    return {
        props: {
            blogs: data,
        }
    }


}