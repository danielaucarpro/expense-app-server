//importing express
const express = require('express');
const app = express();
//creating port. Use default in env or 5000
const PORT = process.env.PORT || 5000;
//importing mongoose
const mongoose = require('mongoose');
//importing cors
const cors = require('cors');
//importing routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

//connecting with mongoDB atlas
const URL = 'mongodb+srv://danielaucar:qG4ej5763GhlUfBc@cluster0.gqtpu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//on connect console.log message
mongoose.connection.on('connected', () => {
    console.log('Database connected...');
});

//requering the app to use json and cors
app.use(express.json());
app.use(cors());

//if, on port 5000, you reach default page show that this is the end point
app.get('/', (req, res) => {
    res.send('ENDPOINT');
});

app.use('/auth', authRoute);

app.use('/post', postRoute);

//starting the server
app.listen(PORT, () => {
    console.log(`Server Running at port ${PORT}`)
});