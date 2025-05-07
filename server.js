const express = require('express');
const app = express();
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const statesRoutes = require('./routes/states');
const errorHandler = require('./middleware/errorHandler');



dotenv.config();
connectDB();

app.use(express.json());

app.use('/states', statesRoutes);

app.get('/', (req, res) => {
  res.send('<h1>US States API</h1>');
});

app.use('*', errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
