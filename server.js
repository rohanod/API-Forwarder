const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Forward API requests
app.all('/*', async (req, res) => {
  try {
    // Extract the target URL from the path
    const targetUrl = req.params[0];
    
    // Get headers from query parameters
    const headers = req.query.headers ? JSON.parse(decodeURIComponent(req.query.headers)) : {};
    
    // Forward the request
    const response = await axios({
      method: req.method,
      url: targetUrl,
      headers: headers,
      data: req.body,
      params: Object.fromEntries(
        Object.entries(req.query).filter(([key]) => key !== 'headers')
      )
    });
    
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});