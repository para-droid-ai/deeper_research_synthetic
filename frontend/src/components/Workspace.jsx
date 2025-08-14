import React from 'react';
import DeepdiveLayout from './layouts/DeepdiveLayout';
import SyntheticLayout from './layouts/SyntheticLayout';
import BenchmarkLayout from './layouts/BenchmarkLayout';

const Workspace = ({ project }) => {
    if (!project) {
        return <div className="empty-state"><h2>Select a project or create a new one to begin.</h2></div>;
    }

    const renderLayout = () => {
        switch (project.framework) {
            case 'PROJECT_DEEPDIVE':
                return <DeepdiveLayout project={project} />;
            case 'PROJECT_SYNTHETIC':
                return <SyntheticLayout project={project} />;
            case 'PROJECT_BENCHMARK':
                return <BenchmarkLayout project={project} />;
            default:
                return <div>Unknown project framework.</div>;
        }
    };

    return (
        <div className="workspace">
            <div className="workspace-header">
                <h2>{project.name}</h2>
            </div>
            <div className="project-details">
                <p><strong>ID:</strong> {project.id}</p>
                <p><strong>Framework:</strong> {project.framework}</p>
                <p><strong>Status:</strong> {project.status}</p>
            </div>
            {renderLayout()}
        </div>
    );
};

export default Workspace;
