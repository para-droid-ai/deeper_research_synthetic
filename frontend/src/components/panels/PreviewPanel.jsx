import React from 'react';

const PreviewPanel = ({ project }) => {
    return (
        <div className="panel panel-placeholder">
            <h3>Dashboard Preview</h3>
            <p>The interactive dashboard for <strong>{project.name}</strong> will be rendered here.</p>
        </div>
    );
};

export default PreviewPanel;
