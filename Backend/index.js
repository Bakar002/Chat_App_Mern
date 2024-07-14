const express = require('express');
const dotenv=   require('dotenv');  
const  mongoose  = require('mongoose');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const cors=require('cors');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');  
const ws = require('ws'); 




const bcryptSalt = bcrypt.genSaltSync (10);
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
app.use(cookieParser());
const port = 4000;
app.get('/test', (req, res) => {
  res.send('Hello how are you')
});


app.get('/profile',(req,res) => {
const token=req.cookies?.token;
if(token) {
jwt.verify(token,jwtSecret,{},(err,userData)=>{
if (err) throw err; 

console.log('hello testing')
res.json({userData});

});}
else{
  res.status(401).json({message:'no token'});
} 



})
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passOk = bcrypt.compareSync(password, foundUser.password);

    if (!passOk) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    jwt.sign({ userId: foundUser._id, username }, jwtSecret, {}, (err, token) => {
      if (err) {
        throw err;
      }
      res.cookie('token', token, { sameSite: 'none', secure: true }).json({
        id: foundUser._id,
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});









app.post('/register', async(req, res) => { 
const {username, password} = req.body;
console.log(req.body.username);

try{
const hasPassword = bcrypt.hashSync(password,bcryptSalt);   

const createdUser= await User.create({
  
  
  username:username, 
  password:hasPassword ,


});


     jwt.sign({userId:createdUser._id,username},jwtSecret ,{},(err,token) => {  

        if (err) throw err;
        res.cookie("token",token,{sameSite:'none',secure:'true'} ).status(201).json({
            id:createdUser._id
        });   
     });
    }
    catch(err){
        console.log('erro'+err.message);
if(err) throw err; 
res.status(500).json('ok');
    }
 });           
const server=app.listen(port);


const wss = new ws.WebSocketServer({ server });

wss.on('connection', (connection, req) => {
  const cookies = req.headers.cookie;
  if (cookies) {
    const tokenCookiesString = cookies.split(';').find(str => str.trim().startsWith('token'));
    if (tokenCookiesString) {
      const token = tokenCookiesString.split('=')[1];
      if (token) {
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
          if (err) {
            console.error('JWT verification error:', err);
            connection.close();
            return;
          }
          const { userId, username } = userData;
          connection.userId = userId;
          connection.username = username;

          // Notify all clients about the current clients
          const clientsData = {
            online: [...wss.clients]
              .filter(client => client.userId && client.username)
              .map(client => ({
                userId: client.userId,
                username: client.username,
              })),
          };
          const message = JSON.stringify(clientsData);
          [...wss.clients].forEach(client => {
            if (client.readyState === ws.OPEN) {
              client.send(message);
            }
          });
        });
      }
    }
  }
});
