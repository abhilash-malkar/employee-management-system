const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3009;
var cors = require('cors');


app.use(cors()) 
app.use(bodyParser.json()); 
app.use('/media', express.static(path.join(__dirname, 'media')));

const Login=require('./routes/auth/Login');
const Employee=require('./routes/employee/Employee');

app.use('/login', Login);
app.use('/employee', Employee);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
}); 