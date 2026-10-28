
import { useEffect, useState } from "react";
import axios from "axios";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const loadProjects = async () => {
        try {
            const response = await axios.get(
                "https://project-management-system-3xso.onrender.com/api/projects",
                config
            );
            setProjects(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const createProject = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/api/projects",
                { name, description, startDate, endDate },
                config
            );

            setName("");
            setDescription("");
            setStartDate("");
            setEndDate("");

            loadProjects();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Project creation failed"
            );
        }
    };

    const deleteProject = async (id) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/projects/${id}`,
                config
            );
            loadProjects();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Delete failed"
            );
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={createProject}>
                <h1>Create Project</h1>

                <input
                    type="text"
                    placeholder="Project Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Project Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <label>Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />

                <label>End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || undefined}
                    required
                />

                <button type="submit">Create Project</button>
            </form>

            <div>
                <h1>All Projects</h1>

                {projects.length === 0 ? (
                    <p>No projects found.</p>
                ) : (
                    projects.map((project) => (
                        <div key={project._id}>
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                            <p>
                                Start Date:{" "}
                                {project.startDate?.slice(0, 10)}
                            </p>
                            <p>
                                End Date:{" "}
                                {project.endDate?.slice(0, 10)}
                            </p>

                            <button
                                type="button"
                                onClick={() => deleteProject(project._id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Projects;
