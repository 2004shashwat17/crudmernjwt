const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

//signup
exports.signup = async (req, res) => {
    const {email, password} = req.body;
    const existing = await User.findOne({
        email
    });
    if(existing){
        return res.status(400).json({message: 'User already exists'});
    }

    const hased = await bcrypt.hash(password, 10);
    const user = new User({
        email,
        password: hased
    });
    await user.save();
    const token = jwt.sign({userId: user._id}, JWT_SECRET);
    res.status(201).json({token});
}