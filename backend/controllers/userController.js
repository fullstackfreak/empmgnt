const User = require("../models/userModel");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

//list all users from database
const getUsers = async (req, res) => {
  // console.log("got hit")
  const users = await User.find(); 
//   if (emptyArray.length === 0) {
//   console.log("The array is empty."); // This will be logged
// } else {
//   console.log("The array is not empty.");
// }
  if(users.length ===0)
       res.send("No user Found");
    else
       res.json(users);
};
//update user details
const updateUser = async (req, res)=>{
  const token = req.params.token;
  const decoed = jwt.verify(token,process.env.JWT_SECRET)
  const {userId:id} = decoed;
  // return;
  const {email,name} = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){

    res.send("Id is not valid")
  }else{
   const user = await User.findById(id); 
  
   if(!user)
    res.send("User not found")
  else{
      user.email = email;
      user.name = name;
     const newUser = await user.save();
    res.status(201).json({ success : true, message: "User Updated successfully", newUser });
  }
}
}
   
   

const createUser = async (req, res) => {
      // console.log(req.body);
      // return;
  const {name, email, password} = req.body;
  if (name !== "" && email !== "" && password !== "") {

   try {
     const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password, salt);  

    let newUser = new User({ name, email, password : hashedPassword });

    await newUser.save();

    res.status(201).json({ success : true, message: "User created successfully", newUser });

   } catch (error) {
      console.log(error)
   }
  } else {

    res.status(200).json({ message: "Some Error " });

  }
};

/**********************************************************************
 * this function is used to check user login
 *  and return true if user exists else false
 *  in this function we user findone method to find the user by email
 * 
 **********************************************************************/
async function checkUser(req, res){

  const { email, password } = req.body;
  // console.log(req.body);
  // return;
  
  if(email && password){
     try {
        const user =  await User.findOne({email});
        const result = await bcryptjs.compare(password, user.password );

      if(result){

      const token =   jwt.sign({ userId: user._id, userType :user, username:user?.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
 
        // res.json();

       res.json({success: true,message:"Login success",token})
      }else{
       res.json({success:false, message:"Login Failed"})
      }
     } catch (error) {
        console.log(error)
     }
  }
}

async function getUserById(req,res) {

  try {
    const userId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400);
      throw new Error("Invalid User ID");
    }
    const user = await User.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}

const aboutPage = (req, res)=>{
  res.json({message: "This is about page"})
}

module.exports = {updateUser, getUsers, createUser, getUserById, checkUser, aboutPage };
