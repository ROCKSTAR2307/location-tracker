# 🔒 Cybercrime Investigation - Location Tracking Tool

A location tracking system designed for authorized cybercrime investigation and security testing purposes.

## ⚠️ Legal & Ethical Use Only

This tool is intended for:
- Authorized penetration testing with written permission
- Cybercrime investigation by law enforcement
- Security research in controlled environments
- Educational demonstrations with participant consent

**Unauthorized tracking is illegal and unethical. Always obtain proper authorization.**

## 🚀 Features

✅ **Comprehensive Error Handling** - Handles all geolocation error cases
✅ **User-Friendly Prompts** - Clear instructions for enabling location access
✅ **Data Persistence** - Automatic logging to JSON files organized by date
✅ **High Accuracy Mode** - Requests best possible location accuracy
✅ **Detailed Logging** - Captures coordinates, accuracy, timestamp, IP, and user agent
✅ **Google Maps Integration** - Direct links to captured locations
✅ **CORS Enabled** - Works across different origins for testing
✅ **Retry Mechanism** - Users can retry if permission is denied

## 📋 Prerequisites

- Node.js (v12 or higher)
- npm (comes with Node.js)
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🛠️ Installation

1. Install dependencies:
```bash
npm install express
```

## 🎯 Usage

### 1. Start the Server

```bash
node server.js
```

You should see:
```
========================================
🔒 Cybercrime Investigation Server
Server running at http://localhost:3000
Logs directory: d:\location track\location_logs
========================================
```

### 2. Open the Tracking Page

Open `index.html` in a web browser:
- Double-click the file, OR
- Navigate to `file:///d:/location%20track/index.html` in your browser

### 3. Grant Location Permission

When prompted by the browser:
1. Click **"Allow"** to grant location access
2. If denied, follow the on-screen instructions to enable location
3. Click the "Retry Location Capture" button

### 4. View Captured Data

The location will be:
- Displayed on the web page
- Logged to console with Google Maps link
- Saved to `location_logs/locations_YYYY-MM-DD.json`

## 📊 API Endpoints

### Capture Location
```
GET /capture?lat={latitude}&lon={longitude}&accuracy={meters}&timestamp={time}
```

### View Today's Logs
```
GET /logs
```
Returns all locations captured today.

### View All Logs
```
GET /logs/all
```
Returns all locations from all dates.

## 📁 File Structure

```
location track/
├── index.html           # Frontend tracking interface
├── server.js            # Backend server with data persistence
├── location_logs/       # Auto-created directory for logs
│   ├── locations_2025-12-31.json
│   └── locations_2026-01-01.json
└── README.md           # This file
```

## 🔍 Log File Format

Each captured location includes:
```json
{
  "id": 1735660800000,
  "latitude": 37.7749,
  "longitude": -122.4194,
  "accuracy": 10.5,
  "timestamp": "12/31/2025, 10:00:00 AM",
  "capturedAt": "2025-12-31T18:00:00.000Z",
  "userAgent": "Mozilla/5.0...",
  "ip": "::1"
}
```

## 🔧 Testing with Your Peer

1. **On the same network:**
   - Find your IP address: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
   - Update `index.html` line 112: Change `localhost` to your IP
   - Have your peer visit: `http://YOUR_IP:3000`
   - Serve `index.html` via HTTP (not file://)

2. **Serving via HTTP:**
   ```bash
   # Install http-server globally
   npm install -g http-server

   # Serve the directory
   http-server -p 8080

   # Visit: http://localhost:8080
   ```

## 🌐 Browser Compatibility

| Browser | Location API | Notes |
|---------|--------------|-------|
| Chrome  | ✅ | Requires HTTPS in production |
| Firefox | ✅ | Requires HTTPS in production |
| Safari  | ✅ | Requires HTTPS in production |
| Edge    | ✅ | Requires HTTPS in production |
| Mobile  | ✅ | Check device location settings |

**Note:** `file://` URLs work for local testing, but production deployments require HTTPS.

## 🔐 Security Considerations

1. **HTTPS Required for Production** - Modern browsers block geolocation on HTTP (except localhost)
2. **User Consent Mandatory** - Browsers always prompt users for permission
3. **Limited Accuracy** - GPS/Wi-Fi accuracy varies (typically 10-100 meters)
4. **Privacy Laws** - Comply with GDPR, CCPA, and local privacy regulations
5. **Data Protection** - Secure the `location_logs` directory appropriately

## 🐛 Troubleshooting

### Location Permission Denied
- Check browser settings (see on-screen instructions)
- Clear site permissions and try again
- Ensure location services are enabled on device

### Server Connection Failed
- Verify server is running on port 3000
- Check if another process is using the port
- Ensure no firewall blocking localhost:3000

### Low Accuracy
- Enable high accuracy mode in device settings
- Ensure GPS is enabled (for mobile devices)
- Move to an area with better GPS/Wi-Fi signal

### CORS Errors
- Server already has CORS enabled for testing
- For production, configure specific allowed origins in `server.js` line 9

## 📝 License & Disclaimer

This tool is for **authorized security testing only**. The developers assume no liability for misuse. Users are solely responsible for ensuring compliance with all applicable laws and obtaining proper authorization before deployment.

## 🤝 Support

For authorized testing scenarios and technical questions, refer to geolocation API documentation:
- [MDN Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [Express.js Documentation](https://expressjs.com/)
