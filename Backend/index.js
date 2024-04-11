const express = require('express');
const dotenv=   require('dotenv');  
const  mongoose  = require('mongoose');
const User = require('./models/User');
const cors=require('cors');
const jwt = require('jsonwebtoken');    
dotenv.config();
 const jwtSecret = process.env.JWT_SECRET_KEY;

 mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const app = express();
app.use(express.json()); 
app.use(cors({
credentials:true,
origin:process.env.Client_Url

}))
const port = 4000;
app.listen(port);
app.get('/test', (req, res) => {
  res.send('Hello how are you')
});

app.post('/register', async(req, res) => { 
const {username, password} = req.body;
console.log(req.body.username);
try{
console.log('hellotwo')

const createdUser= await User.create({username, password});
console.log('hellotwo')

     jwt.sign({userId:createdUser._id},jwtSecret ,{},(err,token) => {  

        if (err) throw err;
        res.cookie("token",token ).status(201).json({
            _id:createdUser._id
        });   
     });
    }
    catch(err){
        console.log('erro'+err.message);
if(err) throw err; 
res.status(500).json('ok');
    }
 });           
 