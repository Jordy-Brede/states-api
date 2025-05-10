const express = require('express');
const app = express();
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const statesRoutes = require('./routes/states');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');



dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/states', statesRoutes);

app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>US States API</title>
        </head>
        <body>
          <h1>Welcome to the US States API</h1>
          <p>Use /states to access state data.</p>
        </body>
      </html>
    `);
  });
  
app.use('*', errorHandler);

app.all('*', (req, res) => {
    res.status(404).send(`
      <!DOCTYPE html>
      <html>
        <head><title>404 - Not Found</title></head>
        <body>
          <h1>404 - Page Not Found</h1>
          <p>The requested URL ${req.originalUrl} was not found on this server.</p>
        </body>
      </html>
    `);
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



  