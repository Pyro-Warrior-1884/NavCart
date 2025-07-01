//calling the express function from packages
const express = require('express');
const { mongoose } = require('mongoose');
//creating an express instance 
const app = express();
app.use(express.json())
//dotfile config
require('dotenv').config();

//port number
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

//mongoString url
const mongourl = process.env.connectionString;

//Checking the mongodb connection
mongoose.connect(
  mongourl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(()=>console.log("Connected to the database..."))
.catch((err)=>console.log("Connection Error:",err));

const userSchema = new mongoose.Schema({
  username:{type:String,required:true},
  password:{type:String,required:true}
});

const User = mongoose.model('User',userSchema);

// Creating a post request for the signup 

app.post('/api/signup',async(req,res)=>{
  const {username,password} = req.body;

  try{
    const user = new User({username,password});
    await user.save();
    res.status(201).json({
      message:"User Created Succesfully..",
      user
    });
  }
  catch(err){
    res.status(500).json({
      message:err.message,
    })
  }
});

