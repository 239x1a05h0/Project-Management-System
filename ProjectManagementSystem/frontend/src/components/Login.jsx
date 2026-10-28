import {useState} from "react";
import {useNavigate,Link} from "react-router-dom";
import axios from "axios";
function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const login=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("user",JSON.stringify(response.data.user));
            navigate("/dashboard");
        }catch(error){
            alert(
                error.response?.data?.message||
                "Login failed"
            );
        }
    };
        return(
        <div className="auth-container">
            <form className="auth-box" onSubmit={login}>
                <h1>Project Management</h1>
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={
                        e=>setEmail(e.target.value)
                    }
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={
                        e=>setPassword(e.target.value)
                    }
                    required
                />
                <button type="submit">
                    Login
                </button>
                <p>
                    Don't have an account?
                    <Link to="/register">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}
export default Login;

