import axios from 'axios'
import { TextField } from '@mui/material';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router'
import Notificationbar from '../components/Notificationbar'


export default function Login() {
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [check, setCheck] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {
        const response = await axios.post("https://chiku.pythonanywhere.com/login/", { username: user, password: pwd })
        const data = await response.data
        if (data.token) {
            localStorage.setItem('Token', data.token)
            router.push("/")
        }
        else if(!data.token) {
            setCheck(true)

        }

    }
    return (
        <div className='text-center mt-5 relative'>


            <h4 className='font-body relative text-2xl '>SuperUser Login </h4>

            <form className='mb-4 relative'>
                <TextField id="UserName" label="UserName" required variant="outlined" onChange={(e) => setUser(e.target.value)} className="m-4" /><br></br>

                <TextField id="Password" label="Password" required type={'password'} variant="outlined" onChange={(e) => setPwd(e.target.value)} className="m-4" /><br></br>
                <Button onClick={handleSubmit} variant='outlined' color='info' className="m-4">Login</Button>
            </form>


            {check && <Notificationbar msg={"Credentials Error!"} alert={'warning'} />}
        </div>
    )

}