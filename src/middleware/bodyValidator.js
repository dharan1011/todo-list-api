const {body} = require('express-validator');
module.exports = {
    validateTodo : [
        body('title').exists(),
        body('body').exists(),
    ]
}