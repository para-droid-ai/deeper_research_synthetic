import React from 'react';

const DataInputPanel = ({ project }) => {
    return (
        <div className="panel">
            <h3>Data Input</h3>
            <textarea 
                placeholder="Paste quantitative data here (e.g., CSV format)..."
            />
        </div>
    );
};

export default DataInputPanel;
