import axios from 'axios'
import Image from 'next/image'
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

export default function AboutME({ bio }) {
    return (
        <div className='relative mt-4 p-2'>

            <main>
                {bio.map(bio => {
                    return (
                        <div key={bio.id} className="grid grid-cols-1  mb-4 relative  w-full">
                            <div>
                                <p className='font-body text-lg md:text-2xl'>{bio.aboutme}</p>
                            </div>
                            <div className='rounded-full overflow-hidden w-56 m-3 md:w-96 relative  place-self-center'>
                                <Image src={bio.mypic} width={1} height={1} alt='arpitbodana' layout='responsive' priority />
                            </div>
                            <div className='flex justify-center'>
                                <AlternateEmailIcon color='success' fontSize='large' className='hover:shadow-xl hover:shadow-gray-600' />
                                <p className='font-body text-lg'>arpitbodana2@gmail.com</p>
                            </div>
                            <div className='flex justify-center m-4 p-2 space-x-9'>
                                <a href='https://www.instagram.com/its_trick_master/' className='hover:shadow-xl hover:shadow-gray-600'>
                                    <InstagramIcon color='error' fontSize='large' />
                                </a>
                                <LinkedInIcon color='primary' fontSize='large' className='hover:shadow-xl hover:shadow-gray-600' />
                                <br />

                            </div>
                           

                            <div>
                                <p className='font-body text-lg md:text-2xl'>{bio.address}</p>
                            </div>
                        </div>
                    )
                })}
            </main>
        </div>

    )
}

export async function getServerSideProps() {
    const response = await axios.get("https://chiku.pythonanywhere.com/")
    const data = await response.data

    return {
        props: {
            bio: data,
        }
    }
}