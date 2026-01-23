const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const target = 'http://localhost:5051';
const devIP = '203.0.113.10'; // Example public IP to bypass local checks

// Inject X-Forwarded-For to bypass rate limiting
app.use((req, res, next) => {
    req.headers['x-forwarded-for'] = devIP;
    next();
});

// Proxy configuration
app.use('/', createProxyMiddleware({
    target: target,
    changeOrigin: true,
    ws: true,
    logLevel: 'debug',
    onError: (err, req, res) => {
        console.error('Proxy Error:', err);
        res.status(500).send('Proxy Error');
    }
}));

const PORT = 5050;
app.listen(PORT, () => {
    console.log(`Dev Proxy running on port ${PORT}`);
    console.log(`Forwarding to ${target} with IP spoofing: ${devIP}`);
});
