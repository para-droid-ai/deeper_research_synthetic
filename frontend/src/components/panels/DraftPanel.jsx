import React from 'react';

const DraftPanel = ({ project, title = 'Outline & Draft' }) => {
    return (
        <div className="panel">
            <h3>{title}</h3>
            <textarea 
                placeholder={`Begin drafting the ${project.framework}...`}
            />
        </div>
    );
};

export default DraftPanel;
