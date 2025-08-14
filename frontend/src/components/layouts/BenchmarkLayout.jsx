import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import DataInputPanel from '../panels/DataInputPanel';
import PreviewPanel from '../panels/PreviewPanel';
import DraftPanel from '../panels/DraftPanel';

const ReactGridLayout = WidthProvider(RGL);

const BenchmarkLayout = ({ project }) => {
    const layout = [
        { i: 'a', x: 0, y: 0, w: 12, h: 8 },
        { i: 'b', x: 0, y: 8, w: 6, h: 8 },
        { i: 'c', x: 6, y: 8, w: 6, h: 8 },
    ];

    return (
        <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30}>
            <div key="a"><PreviewPanel project={project} /></div>
            <div key="b"><DataInputPanel project={project} /></div>
            <div key="c"><DraftPanel project={project} title="Narrative Summary" /></div>
        </ReactGridLayout>
    );
};

export default BenchmarkLayout;
