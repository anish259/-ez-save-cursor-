const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from workspace root
app.use(express.static(path.join(__dirname)));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mock API endpoints for demo
app.get('/api/info', (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url' });
  
  // Mock video info
  res.json({
    id: 'demo123',
    title: 'Demo Video - ' + new Date().toLocaleTimeString(),
    uploader: 'Demo Channel',
    thumbnail: 'https://via.placeholder.com/320x180/0f1b46/88f1ff?text=Demo+Thumbnail',
    duration: 120,
    formats: []
  });
});

app.get('/api/download', (req, res) => {
  const { url, choice } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url' });
  
  // Mock download - create a simple text file
  const filename = `demo-${choice || 'video'}-${Date.now()}.txt`;
  const content = `This is a demo download.\nOriginal URL: ${url}\nFormat: ${choice || 'best'}\nDownloaded at: ${new Date().toISOString()}`;
  
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-Type', 'text/plain');
  res.send(content);
});

app.listen(PORT, () => {
  console.log(`EZ Save server running at http://localhost:${PORT}`);
});
