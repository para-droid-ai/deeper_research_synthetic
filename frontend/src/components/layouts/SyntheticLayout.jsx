import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import SourcePanel from '../panels/SourcePanel';
import DraftPanel from '../panels/DraftPanel';

const ReactGridLayout = WidthProvider(RGL);

const SyntheticLayout = ({ project }) => {
    const layout = [
        { i: 'a', x: 0, y: 0, w: 5, h: 12 },
        { i: 'b', x: 5, y: 0, w: 7, h: 12 },
        { i: 'c', x: 0, y: 12, w: 12, h: 4 },
    ];

    return (
        <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30}>
            <div key="a"><SourcePanel project={project} /></div>
            <div key="b"><DraftPanel project={project} title="Script Editor" /></div>
            <div key="c" className="panel-placeholder"><h3>Audio Assets</h3><p>Future audio asset management panel.</p></div>
        </ReactGridLayout>
    );
};

export default SyntheticLayout;
