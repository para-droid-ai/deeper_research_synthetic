const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

const dataDir = path.join(__dirname, '..', 'data');

// Endpoint to get a list of all reports
app.get('/api/reports', (req, res) => {
    const reportFiles = {
        'gaza-warfronts': {
            id: 'gaza-warfronts',
            title: 'The Hunger Algorithm: Gaza and the Ghost of Humanitarian Aid',
            framework: 'Podcast Synthetic',
            description: 'Narrative-driven, audio-first analysis of complex current events.',
            filePath: path.join(dataDir, 'reports', 'podcast report - gaza - warfronts video.md')
        },
        '17th-airborne': {
            id: '17th-airborne',
            title: 'Thunder from Heaven: A Comprehensive Military History of the 17th Airborne Division',
            framework: 'Deeper Research',
            description: 'Traditional, in-depth academic white paper on historical events.',
            filePath: path.join(dataDir, 'reports', 'podcast white paper for 17th airborne division.md')
        },
        'hcb-report': {
            id: 'hcb-report',
            title: 'Human Condition Report: August 1, 2025',
            framework: 'Human Condition Benchmark',
            description: 'Data-driven global crisis dashboard with a DEFCON-style risk assessment.',
            filePath: path.join(dataDir, 'reports', 'Human Condition Benchmark Framework - Crisis Asses.pdf')
        }
    };
    res.json(Object.values(reportFiles).map(({ filePath, ...rest }) => rest));
});

// Endpoint to get the content of a specific report
app.get('/api/reports/:id', (req, res) => {
    const reportId = req.params.id;
    const reportFiles = {
        'gaza-warfronts': path.join(dataDir, 'reports', 'podcast report - gaza - warfronts video.md'),
        '17th-airborne': path.join(dataDir, 'reports', 'podcast white paper for 17th airborne division.md'),
        'hcb-report': path.join(dataDir, 'reports', 'Human Condition Benchmark Framework - Crisis Asses.pdf')
    };

    const filePath = reportFiles[reportId];

    if (!filePath || !fs.existsSync(filePath)) {
        return res.status(404).send('Report not found');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading report file');
        }
        res.send(data);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
