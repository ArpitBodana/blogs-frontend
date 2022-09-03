import "../styles/globals.css";
import Menubar from "../components/Menubar";
import Background from "../components/Background";
import Loader from "../components/Loader";
import Router from "next/router";
import { useState } from "react";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });

  return (
    <>
      <Menubar />
      {loading && <Loader />}
      <Component {...pageProps} className="min-h-screen" />
      <Footer />
    </>
  );
}

export default MyApp;
