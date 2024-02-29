const express = require("express");
const bcrypt= require("bcryptjs");
const jwt=require("jsonwebtoken");
const connectDB = require("./Connection");
const app = express();
const route = require("./route");
const cors = require("cors");
// const Users= require("./models/Users");
const teachers = require("./models/TeacherModel");
const Conversations= require("./models/Conversations");
const Messages= require("./models/Messages");
require("dotenv").config();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended:false }));

app.use(cors());
app.use("/api", route);


const port = process.env.PORT || 5001;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`server is listening to port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

app.post("/auth/teacher/register",async (req,res,next) => {
  try{
    const {name,email,password} = req.body;
    // localStorage.setItem("teacherData", JSON.stringify(req.body));
    // localStorage.setItem("email", email);
    // localStorage.setItem("password", password);
    // console.log(req.body);
    if(!email||!password||!name){
      res.status(400).send("Please fill all details");
      // console.log(req.body)
    }
    else{
      const isAlreadyExist =await teachers.findOne({email});
      if(isAlreadyExist){
        res.status(400).send("User already exists");

      }else{
        const newUser = await teachers({name,email});
        bcrypt.hash(password,10,(err,hashedPassword) => {
          newUser.set("password",hashedPassword);
          newUser.save();
        next();})
          return res.status(200).send("User registered successfully");

      }
      
    }
    
  }
  catch(error){

  }
});

app.post("/auth/teacher/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // localStorage.setItem("teacherData", JSON.stringify(req.body));
    if (!email || !password) {
      return res.status(400).send("Please fill all details");
    }

    const user = await teachers.findOne({ email });
    if (!user) {
      return res.status(400).send("User email or password is incorrect");
    }

    const validateUser = await bcrypt.compare(password, user.password);
    if (!validateUser) {
      return res.status(400).send("User email or password is incorrect");
    }

    const payload = {
      userId: user._id,
      email: user.email,
    };
    
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "THIS_IS_A_JWT_SECRET_KEY";
    jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 84600 }, async (err, token) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error creating token");
      }

      // Update user with new token
      user.token = token;
      await user.save();
console.log(user.token);
      return res.status(200).json({ user: { id:user._id,email: user.email, name: user.name }, token });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});



app.post("/dashboard/teacher/inbox",async(req,res)=>{
  try{
    const {senderId,receiverId}=req.body;
    const newConversation=new Conversations({members:[senderId,receiverId]});
    await newConversation.save();
    res.status(200).send("Conversation created successfully")
  }catch(error) {
    console.log(error,'Error');
  }
});

app.get("/dashboard/teacher/inbox/:userId", async (req, res) => {
  try{
    const userId=req.params.userId;
    const conversations=await Conversations.find({members:{$in:[userId]}});
    const conversationUserData=Promise.all(conversations.map(async (conversation)=>{
      const receiverId=conversation.members.find((member)=>member!==userId);
      const user= await teachers.findById(receiverId);
    return {user:{email:user.email,name:user.name},conversationId:conversation._id}
    }))
    // console.log("conversationUserData:>>",await conversationUserData);
    res.status(200).json(await conversationUserData);
  }
  catch(error) {
    console.log(error,'Error');
  }
})


app.post("/dashboard/teacher/message",async (req,res)=>{
  try{
    const {conversationId,senderId,message,receiverId=''} = req.body;
    /* The commented code block is checking if `senderId` and `message` are present in the request
    body. If either of them is missing, it will return a response with status 400 and a message
    "Please fill all required fields". */
    if(!senderId||!message) return res.status(400).send("Please fill all required fields");
    if(!conversationId&&receiverId){
      const newConversation=new Conversations({members:[senderId,receiverId]});
      await newConversation.save();
      const newMessage = new Messages({conversationId: newConversation._id,senderId,message});
      await newMessage.save();
      return res.status(200).send("Message sent successfully")
    }else{
      return res.status(400).send("Fill all required fields");
    }
    const newMessage=new Messages({conversationId,senderId,message});
    await newMessage.save();
    res.status(200).send("Message sent successfully")
  }
  catch(error) {
    console.log(error,'Error');
  }
})

app.get("/dashboard/teacher/message/:conversationId",async (req,res)=>{
  try{
    const conversationId=req.params.conversationId;
    if(conversationId==='new') return res.status(200).json([]);
    const messages=await Messages.find({conversationId});
    const messageUserData=Promise.all(messages.map(async (message)=>{
      // const receiverId=conversation.members.find((member)=>member!==userId);
      const user= await teachers.findById(message.senderId);
    return {user:{id:user._id,email:user.email,name:user.name},message:message.message}
    }))
    res.status(200).json(await messageUserData);
  }
  catch(error) {
    console.log(error,'Error');
  }
})

app.get("/users",async (req, res)=>{
  try{
    const users=await teachers.find();
    const usersData=Promise.all(users.map(async (user)=>{
      return{user: {email:user.email,name:user.name},userId:user._id}
    }));
    res.status(200).json(await usersData);
  }
  catch(error) {
    console.log(error,'Error');
  }
} )


start();
