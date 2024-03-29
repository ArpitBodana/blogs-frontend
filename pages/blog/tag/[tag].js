import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export default function Blogbytag({ blogs }) {
  return (
    <main className="relative mt-4 p-2 min-h-screen">
      <Head>
        <title>Make Diffrence</title>
        <meta
          name="description"
          content="Indore Blogs on IT. Sharing my personal exprience in these fild. Different IT companies exprience info and more."
        />
        <meta
          name="google-site-verification"
          content="TZvzximXOO43jEFIVGoc5fb7EYmU4gzCpSNx342aWR4"
        />
        <meta name="author" content="Arpit Bodana" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {blogs.map((blog, index) => {
        return (
          <div key={blog.id} className="mb-4  relative">
            <Link href={`/blog/${blog.id}`}>
              <a>
                <h1 className="font-body text-lg md:text-2xl font-extrabold mb-2">
                  {" "}
                  {index + 1} - {blog.title}
                </h1>
                {blog.image && (
                  <div className="overflow-hidden relative  place-self-center container">
                    <Image
                      className=""
                      src={blog.image}
                      width={0.1}
                      height={0.04}
                      alt={blog.title}
                      priority
                      layout="responsive"
                    />
                  </div>
                )}
              </a>
            </Link>
            <br></br>
            <div className="space-x-2 text-md md:text-xl font-medium">
              <span className="font-time">{blog.date}</span>
              <br></br>
              <span className="font-time bg-rose-200 p-1 mt-4 font-medium shadow-inner  shadow-rose-400">
                {blog.tag}
              </span>
            </div>
          </div>
        );
      })}
    </main>
  );
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  const { tag } = params;
  const response = await axios.get(
    `https://chiku.pythonanywhere.com/blogs/read/?tag=${tag}`
  );
  const data = await response.data;

  return {
    props: {
      blogs: data,
    },
  };
}
