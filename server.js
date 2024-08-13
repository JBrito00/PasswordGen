const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/static')));

app.post('/generate-password', (req, res) => {
    const data = JSON.stringify(req.body);
    const pythonProcess = exec(`python generate_password.py`);

    pythonProcess.stdin.write(data);
    pythonProcess.stdin.end();

    pythonProcess.stdout.on('data', (data) => {
        res.send(data);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
