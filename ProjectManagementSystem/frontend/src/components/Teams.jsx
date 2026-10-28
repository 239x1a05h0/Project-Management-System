
import { useEffect, useState } from "react";
import axios from "axios";

function Teams() {
    const [teams, setTeams] = useState([]);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [project, setProject] = useState("");
    const [members, setMembers] = useState([]);

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const loadData = async () => {
        try {
            const [teamResponse, projectResponse, userResponse] =
                await Promise.all([
                    axios.get("https://project-management-system-3xso.onrender.com/api/teams", config),
                    axios.get("https://project-management-system-3xso.onrender.com/api/projects", config),
                    axios.get("https://project-management-system-3xso.onrender.com/api/users", config)
                ]);

            setTeams(teamResponse.data);
            setProjects(projectResponse.data);
            setUsers(userResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const changeMembers = (e) => {
        const selected = [...e.target.selectedOptions].map(
            option => option.value
        );
        setMembers(selected);
    };

    const createTeam = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "https://project-management-system-3xso.onrender.com/api/teams",
                {
                    name,
                    description,
                    project,
                    members
                },
                config
            );

            setName("");
            setDescription("");
            setProject("");
            setMembers([]);

            loadData();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Team creation failed"
            );
        }
    };

    const deleteTeam = async (id) => {
        try {
            await axios.delete(
                `http://https://project-management-system-3xso.onrender.com/api/teams/${id}`,
                config
            );

            loadData();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Delete failed"
            );
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={createTeam}>
                <h1>Create Team</h1>

                <input
                    type="text"
                    placeholder="Team Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Team Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <label>Select Project</label>
                <select
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    required
                >
                    <option value="">Choose Project</option>
                    {projects.map((p) => (
                        <option key={p._id} value={p._id}>
                            {p.name}
                        </option>
                    ))}
                </select>

                <label>Select Team Members</label>
                <select
                    multiple
                    value={members}
                    onChange={changeMembers}
                    required
                >
                    {users.map((u) => (
                        <option key={u._id} value={u._id}>
                            {u.name || u.fullname || u.email}
                        </option>
                    ))}
                </select>

                <button type="submit">Create Team</button>
            </form>

            <div>
                <h1>All Teams</h1>

                {teams.length === 0 ? (
                    <p>No teams found.</p>
                ) : (
                    teams.map((team) => (
                        <div key={team._id}>
                            <h3>{team.name}</h3>
                            <p>{team.description}</p>

                            <p>
                                Project:{" "}
                                {team.project?.name || "No project"}
                            </p>

                            <p>Members:</p>
                            <ul>
                                {team.members?.map((member) => (
                                    <li key={member._id || member}>
                                        {member.name ||
                                            member.fullname ||
                                            member.email ||
                                            member}
                                    </li>
                                ))}
                            </ul>

                            <button
                                type="button"
                                onClick={() => deleteTeam(team._id)}
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

export default Teams;
