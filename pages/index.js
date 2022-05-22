import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import Link from 'next/link'
import { Pagination, Paper } from '@mui/material';
import { useState } from 'react'


export default function Home({ blogs }) {
  const [page, setPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10)
  const indexOfLastPost = page * postPerPage
  const indexofFirstPost = indexOfLastPost - postPerPage
  const currentPost = blogs.slice(indexofFirstPost, indexOfLastPost)
  const totalPosts = blogs.length
  const index = Math.ceil(totalPosts / postPerPage)
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="bg-white">
      <Head>
        <title>Make Diffrence</title>
        <meta name="description" content="Indore Blogs on IT. Sharing my personal exprience in these fild. Different IT companies exprience info and more." />
        <meta name="google-site-verification" content="TZvzximXOO43jEFIVGoc5fb7EYmU4gzCpSNx342aWR4" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='relative mt-4 p-2'>

        {currentPost.map(blog => {
          return (
            <div key={blog.id} className="mb-4  relative">
              <Link href={`/blog/${blog.id}`}>
                <a>
                  <h1 className="font-body text-lg md:text-2xl font-extrabold mb-2">{blog.title}</h1>
                  {blog.image && <div className='overflow-hidden relative  container text-center'>
                    <Image className='' src={blog.image} width={0.10} height={0.040} alt={blog.title} placeholder={blog.image} priority layout='responsive' />
                  </div>}
                </a>
              </Link>

              <br></br>
              <div className="space-x-2 text-md md:text-xl font-medium"><span className='font-time'>{blog.date}</span><br></br>
                <Link href={`/blog/tag/${blog.tag}`}>
                  <a>
                    <span className='font-time bg-zinc-200 p-1 mt-4 font-medium shadow-inner  shadow-zinc-400'>{blog.tag}</span>
                  </a>
                </Link>
              </div>
              <hr className='mt-1' />
            </div>

          )
        })}
      </main>
      <Pagination className='flex justify-center pb-4' count={index} page={page} onChange={handleChange} color="primary" variant="text" />
    </div>
  )
}

export async function getServerSideProps() {
  const response = await axios.get('https://chiku.pythonanywhere.com/blogs/read/')
  const data = await response.data.reverse()
  return {
    props: {
      blogs: data,
    }
  }
}
