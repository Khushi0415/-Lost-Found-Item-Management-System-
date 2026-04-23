import { useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/login", data);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={{textAlign:"center", marginTop:"100px"}}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e=>setData({...data,email:e.target.value})}/>
      <br/><br/>
      <input placeholder="Password" onChange={e=>setData({...data,password:e.target.value})}/>
      <br/><br/>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;