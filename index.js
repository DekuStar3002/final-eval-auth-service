require('dotenv').config();
const express = require('express');

const app = express();

const route = require('./src/routes');

app.use(express.json());
app.use('/api', route);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});