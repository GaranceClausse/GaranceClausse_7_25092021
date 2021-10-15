const express = require('express');
var helmet = require('helmet');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const replyRoutes = require('./routes/replyRoutes');

const app = express();
const limiter = rateLimit({
    max     : 120,
    windowMs: 15 * 60 * 1000
  });

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use(limiter);

app.use(express.static('../frontend'));
app.use('/api/post', postRoutes);
app.use('/api/reply', replyRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;