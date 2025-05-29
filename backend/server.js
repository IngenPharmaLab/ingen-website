const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handle POST from contact form
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  const log = `\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n---\n`;

  fs.appendFile('messages.txt', log, (err) => {
    if (err) {
      console.error('Error saving message:', err);
      return res.status(500).send('Something went wrong!');
    }
    res.send('Message received!');
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
