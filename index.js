const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const port = process.env.PORT || 3000;

// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const profileRoute = require('./routes/profile');
const favMangaRoute = require('./routes/fav-manga');
const mangaEdenRoute = require('./routes/manga-eden');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log('connected to db!')
);

// Enable All CORS requests
app.use(cors());

// Middleware
app.use(express.json());

// Router Middleware
// in charge of sending static files requests to the client
// app.use(express.static.join((__dirname, "public")));

app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/profile', profileRoute);
app.use('/api/favmanga', favMangaRoute);
app.use('/api/mangaeden', mangaEdenRoute);

// It's in charge of sending the main index.html file back to the client if it didn't receive a request it recognized otherwise.
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './public/index.html'));
// });

// Run server on the specified port
app.listen(port, function() {
  console.log(`Server running on ${port}...`);
});

console.log(mongoose.connection.readyState);
