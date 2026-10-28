import {useState} from "react";
import {useNavigate,Link} from "react-router-dom";
import axios from "axios";
function Register(){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [role,setRole]=useState("user");
    const navigate=useNavigate();
    const register=async(e)=>{
        e.preventDefault();
        try{
            await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name,
                    email,
                    password,
                    role
                }
            );
            alert("Registration successful");
            navigate("/login");
        }catch(error){
            alert(
                error.response?.data?.message||
                "Registration failed"
            );
        }
    };
    return(
        <div className="auth-container">
            <form
                className="auth-box"
                onSubmit={register}
            >
                <h1>Project Management</h1>
                <h2>Register</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={
                        e=>setName(e.target.value)
                    }
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    required
                />
                <select value={role} onChange={e=>setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">
                    Register
                </button>
                <p>
                    Already have an account?
                    <Link to="/login">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
export default Register;

