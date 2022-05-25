import axios from 'axios'
import Image from 'next/image'
import Head from 'next/head'
export default function BlogwithId({ blog }) {

    return (
        <div className='relative m-2'>
            <Head>
                <title>{blog.title}</title>
                <meta name="description" content={`${blog.title}`} />
                <meta name="author" content="Arpit Bodana" />
                <meta name="keywords" content={`${blog.title}`} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="mb-4 relative">
                <h1 className='font-body text-2xl md:text-4xl'>{blog.title}</h1>
                <br></br>
                <hr></hr>
                {blog.image && <div className='container relative'>
                    <Image className='' src={blog.image} width={0.10} height={0.040} alt={blog.title} priority layout='responsive' />
                </div>}
                <br></br>
                <hr></hr>
                <p className='font-body text-lg md:text-2xl'>{blog.body}</p>
                <br></br>
                <hr></hr>
                <div className="space-x-2 text-lg md:text-2xl"><span className='font-time'>{blog.date}</span><span className='font-time bg-zinc-200 p-1 mt-4 font-medium shadow-inner  shadow-zinc-400'>{blog.tag}</span></div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { params, req, res } = context
    const { blogid } = params
    const response = await axios.get(`https://chiku.pythonanywhere.com/blogs/read/${blogid}`)
    const data = await response.data

    return {
        props: {
            blog: data,
        }
    }
}