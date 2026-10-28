
import { useEffect, useState } from "react";
import axios from "axios";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [teams, setTeams] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [project, setProject] = useState("");
    const [team, setTeam] = useState("");
    const [assignedTo, setAssignedTo] = useState([]);
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const loadData = async () => {
        try {
            const [taskResponse, projectResponse, teamResponse] =
                await Promise.all([
                    axios.get("https://project-management-system-3xso.onrender.com/api/tasks", config),
                    axios.get("https://project-management-system-3xso.onrender.com/api/projects", config),
                    axios.get("https://project-management-system-3xso.onrender.com/api/teams", config)
                ]);

            setTasks(taskResponse.data);
            setProjects(projectResponse.data);
            setTeams(teamResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const createTask = async (e) => {
        e.preventDefault();

        if (!project) {
            alert("Select a project");
            return;
        }

        if (!team) {
            alert("Select a team");
            return;
        }

        try {
            await axios.post(
                "https://project-management-system-3xso.onrender.com/api/tasks",
                {
                    title,
                    description,
                    project,
                    team,
                    assignedTo,
                    priority,
                    dueDate
                },
                config
            );

            setTitle("");
            setDescription("");
            setProject("");
            setTeam("");
            setAssignedTo([]);
            setPriority("Medium");
            setDueDate("");

            loadData();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Task creation failed"
            );
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(
                `https://project-management-system-3xso.onrender.com/api/tasks/${id}`,
                { status },
                config
            );
            loadData();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(
                `https://project-management-system-3xso.onrender.com/api/tasks/${id}`,
                config
            );
            loadData();
        } catch (error) {
            console.log(error);
        }
    };

    const changeAssignedTo = (e) => {
        setAssignedTo(
            [...e.target.selectedOptions].map(
                option => option.value
            )
        );
    };

    return (
        <div className="auth-container">
            <form onSubmit={createTask}>
                <h1>Create Task</h1>

                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />

                <label>Select Project</label>
                <select
                    value={project}
                    onChange={e => {
                        setProject(e.target.value);
                        setTeam("");
                    }}
                    required
                >
                    <option value="">Choose Project</option>
                    {projects.map(p => (
                        <option key={p._id} value={p._id}>
                            {p.name}
                        </option>
                    ))}
                </select>

                <label>Select Team</label>
                <select
                    value={team}
                    onChange={e => setTeam(e.target.value)}
                    required
                >
                    <option value="">Choose Team</option>
                    {teams
                        .filter(t =>
                            !t.project?._id ||
                            t.project?._id === project ||
                            t.project === project
                        )
                        .map(t => (
                            <option key={t._id} value={t._id}>
                                {t.name}
                            </option>
                        ))}
                </select>

                <label>Assign Members (hold Ctrl to select multiple)</label>
                <select
                    multiple
                    value={assignedTo}
                    onChange={changeAssignedTo}
                >
                    {teams
                        .find(t => t._id === team)
                        ?.members?.map(member => (
                            <option
                                key={member._id || member}
                                value={member._id || member}
                            >
                                {member.name ||
                                    member.fullname ||
                                    member.email ||
                                    member}
                            </option>
                        ))}
                </select>

                <label>Priority</label>
                <select
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <label>Due Date</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    required
                />

                <button type="submit">Create Task</button>
            </form>

            <div>
                <h1>All Tasks</h1>

                {tasks.length === 0 ? (
                    <p>No tasks found.</p>
                ) : (
                    tasks.map(task => (
                        <div key={task._id}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>
                                Project: {task.project?.name || "N/A"}
                            </p>
                            <p>
                                Team: {task.team?.name || "N/A"}
                            </p>
                            <p>Priority: {task.priority}</p>
                            <p>
                                Due Date: {task.dueDate?.slice(0, 10)}
                            </p>
                            <p>Status: {task.status || "Pending"}</p>

                            <label>Update Status</label>
                            <select
                                value={task.status || "Pending"}
                                onChange={e =>
                                    updateStatus(task._id, e.target.value)
                                }
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>

                            <button
                                type="button"
                                onClick={() => deleteTask(task._id)}
                            >
                                Delete Task
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
export default Tasks;
