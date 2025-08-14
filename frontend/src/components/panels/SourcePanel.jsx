import React from 'react';

const SourcePanel = ({ project }) => {
    return (
        <div className="panel">
            <h3>Source Context</h3>
            <textarea 
                defaultValue={project.sourceContext}
                placeholder="Paste your source material here..."
            />
        </div>
    );
};

export default SourcePanel;
