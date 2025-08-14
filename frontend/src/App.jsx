import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:3001/api';

function App() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectFramework, setNewProjectFramework] = useState('PROJECT_DEEPDIVE');

    // Fetch all projects on initial load
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch(`${API_URL}/projects`);
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            import React, { useState, useEffect } from 'react';
import Workspace from './components/Workspace';
import './App.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const API_URL = 'http://localhost:3001/api';

function App() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectFramework, setNewProjectFramework] = useState('PROJECT_DEEPDIVE');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch(`${API_URL}/projects`);
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newProjectName, framework: newProjectFramework }),
            });
            const newProject = await response.json();
            setProjects([...projects, newProject]);
            setNewProjectName('');
            setNewProjectFramework('PROJECT_DEEPDIVE');
            setIsCreating(false);
            setSelectedProject(newProject);
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <div className="app-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h1>Initiative: IRONCLAD</h1>
                    <p>Creation Interface</p>
                </div>
                <div className="project-list">
                    {projects.map(p => (
                        <div 
                            key={p.id} 
                            className={`project-item ${selectedProject?.id === p.id ? 'selected' : ''}`}
                            onClick={() => setSelectedProject(p)}
                        >
                            <h3>{p.name}</h3>
                            <p>{p.framework}</p>
                        </div>
                    ))}
                </div>
                <button className="new-project-btn" onClick={() => setIsCreating(true)}>+ New Project</button>
            </aside>

            <main className="main-content">
                <Workspace project={selectedProject} />
            </main>

            {isCreating && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Create New Project</h2>
                        <form onSubmit={handleCreateProject}>
                            <label>Project Name</label>
                            <input 
                                type="text"
                                value={newProjectName}
                                onChange={(e) => setNewProjectName(e.target.value)}
                                placeholder="e.g., Analysis of Q2 Economic Trends"
                                required
                            />
                            <label>Select Framework</label>
                            <select 
                                value={newProjectFramework}
                                onChange={(e) => setNewProjectFramework(e.target.value)}
                            >
                                <option value="PROJECT_DEEPDIVE">PROJECT DEEPDIVE (TOME)</option>
                                <option value="PROJECT_SYNTHETIC">PROJECT SYNTHETIC (TRANSMISSION)</option>
                                <option value="PROJECT_BENCHMARK">PROJECT BENCHMARK (SNAPSHOT)</option>
                            </select>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setIsCreating(false)}>Cancel</button>
                                <button type="submit">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;

            const newProject = await response.json();
            setProjects([...projects, newProject]);
            setNewProjectName('');
            setNewProjectFramework('PROJECT_DEEPDIVE');
            setIsCreating(false);
            setSelectedProject(newProject);
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };
    
    const handleUpdateProjectContext = async (projectId, newContext) => {
        try {
            const response = await fetch(`${API_URL}/projects/${projectId}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sourceContext: newContext })
            });
            const updatedProject = await response.json();
            // Update the project in the list and the selected project
            setProjects(projects.map(p => p.id === projectId ? updatedProject : p));
            setSelectedProject(updatedProject);
        } catch (error) {
            console.error('Error updating project context:', error);
        }
    }

    const handleDeleteProject = async (projectId) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await fetch(`${API_URL}/projects/${projectId}`, { method: 'DELETE' });
                setProjects(projects.filter(p => p.id !== projectId));
                setSelectedProject(null);
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        }
    };

    return (
        <div className="app-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h1>Initiative: IRONCLAD</h1>
                    <p>Creation Interface</p>
                </div>
                <div className="project-list">
                    {projects.map(p => (
                        <div 
                            key={p.id} 
                            className={`project-item ${selectedProject?.id === p.id ? 'selected' : ''}`}
                            onClick={() => setSelectedProject(p)}
                        >
                            <h3>{p.name}</h3>
                            <p>{p.framework}</p>
                        </div>
                    ))}
                </div>
                <button className="new-project-btn" onClick={() => setIsCreating(true)}>+ New Project</button>
            </aside>

            <main className="main-content">
                {selectedProject ? (
                    <div className="workspace">
                        <div className="workspace-header">
                            <h2>{selectedProject.name}</h2>
                            <button className="delete-btn" onClick={() => handleDeleteProject(selectedProject.id)}>Delete Project</button>
                        </div>
                        <div className="project-details">
                            <p><strong>ID:</strong> {selectedProject.id}</p>
                            <p><strong>Framework:</strong> {selectedProject.framework}</p>
                            <p><strong>Status:</strong> {selectedProject.status}</p>
                        </div>
                        <div className="source-context-editor">
                            <h3>Source Context</h3>
                            <p>Provide the raw data, articles, or notes for the agent to analyze.</p>
                            <textarea 
                                value={selectedProject.sourceContext}
                                onChange={(e) => setSelectedProject({...selectedProject, sourceContext: e.target.value})}
                                onBlur={(e) => handleUpdateProjectContext(selectedProject.id, e.target.value)}
                                placeholder="Paste your source material here..."
                            />
                        </div>
                        <div className="agent-workflow">
                            <h3>Agentic Workflow</h3>
                            <p>This is where the agent interaction for <strong>Operation COGNITION</strong> will occur.</p>
                            <button className="generate-btn">Initiate Generation (Keystone: SPARK)</button>
                        </div>
                    </div>
                ) : (
                    <div className="empty-state">
                        <h2>Select a project or create a new one to begin.</h2>
                    </div>
                )}
            </main>

            {isCreating && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Create New Project</h2>
                        <form onSubmit={handleCreateProject}>
                            <label>Project Name</label>
                            <input 
                                type="text"
                                value={newProjectName}
                                onChange={(e) => setNewProjectName(e.target.value)}
                                placeholder="e.g., Analysis of Q2 Economic Trends"
                                required
                            />
                            <label>Select Framework</label>
                            <select 
                                value={newProjectFramework}
                                onChange={(e) => setNewProjectFramework(e.target.value)}
                            >
                                <option value="PROJECT_DEEPDIVE">PROJECT DEEPDIVE (TOME)</option>
                                <option value="PROJECT_SYNTHETIC">PROJECT SYNTHETIC (TRANSMISSION)</option>
                                <option value="PROJECT_BENCHMARK">PROJECT BENCHMARK (SNAPSHOT)</option>
                            </select>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setIsCreating(false)}>Cancel</button>
                                <button type="submit">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;