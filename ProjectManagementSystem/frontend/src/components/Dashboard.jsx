import {useState} from "react";
import Projects from "./Project";
import Teams from "./Teams";
import Tasks from "./Tasks";
function Dashboard(){
    const user=JSON.parse(
        localStorage.getItem("user")
    );
    const [page,setPage]=useState("tasks");
    const logout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href="/login";
    };
        return(
        <div>
            <nav>
                <h2>Project Management</h2>
                <div><span>{user?.name} ({user?.role})</span>
                    <button onClick={()=>setPage("projects")}>Projects</button>
                    <button onClick={()=>setPage("teams")}>Teams</button>
                    <button onClick={()=>setPage("tasks")}>Tasks</button>
                    <button onClick={logout}>Logout</button>
                </div>
            </nav>
            <main>
                {page==="projects" &&<Projects/>}
                {page==="teams" &&<Teams/>}
                {page==="tasks" &&<Tasks/>}
            </main>
        </div>
    );
}
export default Dashboard;
