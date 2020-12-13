const mongoose = require('mongoose');

module.exports = async () => {
    const dbOptions = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    };

    try {
        let conn = await mongoose.connect(process.env.MONGO_URI, dbOptions);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}