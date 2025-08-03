const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

// A simple endpoint to confirm the server is running
app.get('/api/status', (req, res) => {
    res.json({ status: 'Backend is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
