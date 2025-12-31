const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for localhost testing
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Serve the HTML file at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'location_logs');
try {
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
    }
} catch (err) {
    console.log('Note: Using in-memory storage (logs directory not writable)');
}

// Generate log filename with date
function getLogFilename() {
    const date = new Date().toISOString().split('T')[0];
    return path.join(logsDir, `locations_${date}.json`);
}

// Read existing logs
function readLogs() {
    const logFile = getLogFilename();
    if (fs.existsSync(logFile)) {
        const data = fs.readFileSync(logFile, 'utf8');
        return JSON.parse(data);
    }
    return [];
}

// Write logs
function writeLogs(logs) {
    try {
        const logFile = getLogFilename();
        fs.writeFileSync(logFile, JSON.stringify(logs, null, 2), 'utf8');
    } catch (err) {
        console.log('Warning: Could not write to file system');
    }
}

app.get('/capture', (req, res) => {
    const latitude = req.query.lat;
    const longitude = req.query.lon;
    const accuracy = req.query.accuracy;
    const timestamp = req.query.timestamp || new Date().toISOString();

    // Validate input
    if (!latitude || !longitude) {
        return res.status(400).json({
            success: false,
            error: 'Missing latitude or longitude'
        });
    }

    // Create location record
    const locationRecord = {
        id: Date.now(),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        accuracy: accuracy ? parseFloat(accuracy) : null,
        timestamp: timestamp,
        capturedAt: new Date().toISOString(),
        userAgent: req.headers['user-agent'],
        ip: req.ip || req.connection.remoteAddress
    };

    // Log to console
    console.log('\n=== NEW LOCATION CAPTURED ===');
    console.log(`Latitude: ${locationRecord.latitude}`);
    console.log(`Longitude: ${locationRecord.longitude}`);
    console.log(`Accuracy: ${locationRecord.accuracy} meters`);
    console.log(`Timestamp: ${locationRecord.timestamp}`);
    console.log(`User Agent: ${locationRecord.userAgent}`);
    console.log(`IP Address: ${locationRecord.ip}`);
    console.log(`Google Maps: https://www.google.com/maps?q=${latitude},${longitude}`);
    console.log('============================\n');

    // Save to file
    try {
        const logs = readLogs();
        logs.push(locationRecord);
        writeLogs(logs);

        res.json({
            success: true,
            message: 'Location captured and logged successfully',
            data: locationRecord
        });
    } catch (error) {
        console.error('Error saving location:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to save location data'
        });
    }
});

// Endpoint to view all captured locations
app.get('/logs', (req, res) => {
    try {
        const logs = readLogs();
        res.json({
            success: true,
            count: logs.length,
            data: logs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to read logs'
        });
    }
});

// Endpoint to view logs from all dates
app.get('/logs/all', (req, res) => {
    try {
        const files = fs.readdirSync(logsDir);
        const allLogs = [];

        files.forEach(file => {
            if (file.endsWith('.json')) {
                const data = fs.readFileSync(path.join(logsDir, file), 'utf8');
                const logs = JSON.parse(data);
                allLogs.push(...logs);
            }
        });

        res.json({
            success: true,
            count: allLogs.length,
            data: allLogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to read all logs'
        });
    }
});

app.listen(port, () => {
    console.log(`========================================`);
    console.log(`🔒 Cybercrime Investigation Server`);
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Logs directory: ${logsDir}`);
    console.log(`========================================\n`);
});