import axios from 'axios'
import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Restricted from '../components/Restricted';
import Head from 'next/head'


export default function Login() {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [tag, setTag] = useState('')
    const [myimage, setMyImage] = useState(null)
    const [admin, setAdmin] = useState(false)
    const handleSubmit = async () => {
        if (myimage == null) {
            const Token = localStorage.getItem('Token')
            const response = await axios.post("https://chiku.pythonanywhere.com/blogs/", { title: title, body: body, tag: tag }, { headers: { 'Authorization': `Token ${Token}` } })
            const data = await response.data

        } else {
            const Token = localStorage.getItem('Token')
            const fd = new FormData()
            fd.append('image', myimage, myimage.name)
            fd.append('title', title)
            fd.append('body', body)
            fd.append('tag', tag)
            const response = await axios.post("https://chiku.pythonanywhere.com/blogs/", fd, { headers: { 'Authorization': `Token ${Token}` } })
            const data = await response.data
            console.log(data);

        }

    }
    useEffect(() => {
        { localStorage.getItem('Token') && setAdmin(true) }
    })

    if (!admin) {
        return (
            <div>
                <Head>
                    <title>Restricted Area</title>
                    <meta name="description" content="Restricted Area you are note allowed to see these" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Restricted />

            </div>

        )
    }
    return (
        <div className='text-center mt-5 relative space-y-4'>
            <Head>
                <title>Add Blog</title>
                <meta name="description" content="Section of Make Difference" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <span className='text-2xl md:text-4xl font-body relative'>Add What comes in your Mind</span>
            <form onSubmit={handleSubmit} className="mb-4 relative space-y-8">
                <TextField required label="Title" color='warning' variant="outlined" fullWidth={true} onChange={(e) => setTitle(e.target.value)} className="mt-4" /><br></br>

                <TextField required label="Body" color='warning' multiline={true} rows={10} fullWidth={true} variant="outlined" onChange={(e) => setBody(e.target.value)} className="mt-4" /><br></br>
                <TextField required label="Tag" color='warning' variant="outlined" fullWidth={true} onChange={(e) => setTag(e.target.value)} className="mt-4" /><br></br>
                <input type='file' onChange={() => setMyImage(event.target.files[0])} className='w-44 h-9' />
                <Button type='submit' variant='outlined' color='warning' size='large' className="m-4">Add</Button>
            </form>

        </div>
    )

}