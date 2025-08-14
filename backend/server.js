const express = require('express');
const cors = require('cors');
const crypto = require('crypto'); // Using crypto for generating unique IDs

const app = express();
const PORT = 3001;

// --- Middleware ---
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// --- In-Memory Database ---
// This will serve as our temporary project store for Operation SCAFFOLD.
// In a later phase, this will be replaced by a proper database.
let projects = [];

// --- API Routes for Projects ---

// GET /api/projects - Retrieve all projects
app.get('/api/projects', (req, res) => {
    res.json(projects);
});

// POST /api/projects - Create a new project
app.post('/api/projects', (req, res) => {
    const { name, framework } = req.body;
    if (!name || !framework) {
        return res.status(400).json({ error: 'Project name and framework are required.' });
    }
    const newProject = {
        id: crypto.randomUUID(),
        name,
        framework,
        sourceContext: '',
        createdAt: new Date().toISOString(),
        status: 'New'
    };
    projects.push(newProject);
    console.log('Project Created:', newProject);
    res.status(201).json(newProject);
});

// GET /api/projects/:id - Retrieve a single project
app.get('/api/projects/:id', (req, res) => {
    const project = projects.find(p => p.id === req.params.id);
    if (!project) {
        return res.status(404).json({ error: 'Project not found.' });
    }
    res.json(project);
});

// PUT /api/projects/:id - Update a project
app.put('/api/projects/:id', (req, res) => {
    const projectIndex = projects.findIndex(p => p.id === req.params.id);
    if (projectIndex === -1) {
        return res.status(404).json({ error: 'Project not found.' });
    }
    const originalProject = projects[projectIndex];
    const updatedProject = {
        ...originalProject,
        ...req.body,
        id: originalProject.id, // Ensure ID cannot be changed
    };
    projects[projectIndex] = updatedProject;
    console.log('Project Updated:', updatedProject);
    res.json(updatedProject);
});

// DELETE /api/projects/:id - Delete a project
app.delete('/api/projects/:id', (req, res) => {
    const projectIndex = projects.findIndex(p => p.id === req.params.id);
    if (projectIndex === -1) {
        return res.status(404).json({ error: 'Project not found.' });
    }
    projects.splice(projectIndex, 1);
    console.log('Project Deleted:', req.params.id);
    res.status(204).send(); // No Content
});


// --- Server Status and Startup ---
app.get('/api/status', (req, res) => {
    res.json({ status: 'Backend is running', projectCount: projects.length });
});

app.listen(PORT, () => {
    console.log(`THE FORGE is running on http://localhost:${PORT}`);
    console.log('Awaiting instructions for THE LENS.');
});