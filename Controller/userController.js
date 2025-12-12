require("dotenv").config()
const { User } = require("../Model/userModel");
const Registration = require("../Model/registrationModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//  signup page 
const SignupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashed = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashed })

        await newUser.save()
        res.status(201).json({ message: "User Registered Successfully", newUser });
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// signin page 

const SigninUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: existingUser._id, email: existingUser.email, role: existingUser.role }, process.env.JWT_SECRET, { expiresIn: "30d" });



        res.status(200).json({
            message: "Signin Successful",
            token,
            user: { id: existingUser._id, name: existingUser.name, email: existingUser.email, role: existingUser.role }
        });
    } catch(err){
        res.status(500).json({error: err.message})
    }
}


//  for registration

const registerAthlete = async (req, res) => {
  try {
    const data = req.body;

    await Registration.create(data);

    res.status(201).json({
      message: "Registration Successful!",
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      success: false
    });
  }
};


// Get All Registered Users
const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};







module.exports = { SignupUser, SigninUser,registerAthlete, getAllRegistrations}