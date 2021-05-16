const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
});

// try{
//     exports.getModel = () => mongoose.model('user', UserSchema)
// }catch(err){
//     exports.getModel = ()=> mongoose.model('user')
// }

//module.exports = User = mongoose.model('user',UserSchema);

let User 
try{
    User = mongoose.model('user');
}catch(error){
    
    User = mongoose.model('user',UserSchema);
}

module.exports = User;