const express = require('express');
const connectDB = require('./config/db');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const auth = require('./routes/api/auth');
const path = require('path');

const app = express();

//Connect Database

connectDB();

//Init Middleware
app.use(express.json({extended: false}));

app.get('/',(req,res) => res.send('API Running'));

//Define Routes
app.use('/api/users',users);
app.use('/api/auth', auth);
app.use('/api/profile',profile);
app.use('/api/posts', posts);

if(process.env.NODE_ENV=='production'){
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));