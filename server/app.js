const express = require('express');
const app = express();

const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const chartRoutes = require('./routes/charts');
const externalRoutes = require('./routes/external');

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

app.use('/api/auth', authRoutes);
app.use('/api/charts', chartRoutes);
app.use('/api/external', externalRoutes);


module.exports = app;
