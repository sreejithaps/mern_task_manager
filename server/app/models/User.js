const mongoose = require('mongoose');

//schema and model definitions would go here
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' }    
});
const User = mongoose.model('User', userSchema);
module.exports = User;