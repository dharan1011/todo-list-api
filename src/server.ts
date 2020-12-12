import dotenv from 'dotenv';
import createServer from './createServer';
import router from './router';

dotenv.config();
const app = createServer(router);
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));