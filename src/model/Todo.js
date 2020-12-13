const mongoose = require('mongoose');
const User = require('./User');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
    },
    subTasks: [String],
    comments: [
        {
            body:String, 
            date: Date
        }
    ]
});
// todoSchema.statics.findByUserId = async function(userId) {
//     try {
//         const user = await User.findById(userId);
//         console.log(user);
//         return this.find({author : user.id});
//     }catch(err){
//         console.error(err);
//     }
// };

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
