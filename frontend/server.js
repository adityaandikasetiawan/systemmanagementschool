const express = require('express');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(morgan('combined'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use(express.static(distPath, { maxAge: '1y', etag: true, index: false }));

app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
