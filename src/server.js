const dotenv = require('dotenv');
const  initializeServer = require('./initializeServer');
const router = require('./router');
const passport = require('passport');
const connectDb = require('./config/db');

// load env config
dotenv.config();
// passport.js config
require('./config/passport')(passport);
// connect to DB
connectDb();

const app = initializeServer(router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));