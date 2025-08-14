import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import SourcePanel from '../panels/SourcePanel';
import DraftPanel from '../panels/DraftPanel';

const ReactGridLayout = WidthProvider(RGL);

const DeepdiveLayout = ({ project }) => {
    const layout = [
        { i: 'a', x: 0, y: 0, w: 6, h: 12, minW: 4, minH: 6 },
        { i: 'b', x: 6, y: 0, w: 6, h: 12, minW: 4, minH: 6 },
    ];

    return (
        <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} >
            <div key="a"><SourcePanel project={project} /></div>
            <div key="b"><DraftPanel project={project} /></div>
        </ReactGridLayout>
    );
};

export default DeepdiveLayout;
