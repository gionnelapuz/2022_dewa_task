const express = require('express');
const app = express();

const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoute = require('./routes/auth/authRoute');
const chartRoutes = require('./routes/chart/chartRoutes');

app.use(helmet());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    origin: '*',
  })
);

app.get('/api/', (req, res) => {
  res.send('Backend is working!');
});

app.use('/api/auth', authRoute);
app.use('/api/charts', chartRoutes);


module.exports = app;
