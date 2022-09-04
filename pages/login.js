import axios from "axios";
import { TextField } from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import Notificationbar from "../components/Notificationbar";
import Head from "next/head";

export default function Login() {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [check, setCheck] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    const response = await axios.post(
      "https://chiku.pythonanywhere.com/login/",
      { username: user, password: pwd }
    );
    const data = await response.data;
    if (data.token) {
      localStorage.setItem("Token", data.token);
      router.push("/");
    } else if (!data.token) {
      setCheck(true);
    }
  };
  return (
    <div className="text-center mt-5 relative min-h-screen">
      <Head>
        <title>Admin Login</title>
        <meta name="description" content="Admin Login Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h4 className="font-body relative text-2xl mb-3">SuperUser Login </h4>

      <form className="mb-4 relative space-y-8">
        <TextField
          id="UserName"
          label="UserName"
          required
          variant="outlined"
          onChange={(e) => setUser(e.target.value)}
          className="m-4"
        />
        <br></br>

        <TextField
          id="Password"
          label="Password"
          required
          type={"password"}
          variant="outlined"
          onChange={(e) => setPwd(e.target.value)}
          className="m-4"
        />
        <br></br>
        <Button
          onClick={handleSubmit}
          variant="outlined"
          color="info"
          className="m-4"
        >
          Login
        </Button>
      </form>

      {check && (
        <Notificationbar msg={"Credentials Error!"} alert={"warning"} />
      )}
    </div>
  );
}
