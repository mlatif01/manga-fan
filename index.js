const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const profileRoute = require('./routes/profile');
const favMangaRoute = require('./routes/fav-manga');
const mangaEdenRoute = require('./routes/manga-eden');

dotenv.config();

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('connected to db!')
);


// Enable All CORS requests
app.use(cors());

// Middleware
app.use(express.json());

// Router Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/profile', profileRoute);
app.use('/api/favmanga', favMangaRoute);
app.use('/api/mangaeden', mangaEdenRoute);
// app.use('/', express.static(path.join(__dirname)));

// Run server on the specified port

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(process.env.PORT || 3000, function(){
    console.log('Server running on 3000...');
});