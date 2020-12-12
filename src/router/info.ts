import {Router} from 'express';

const router = Router();

router.get('/', (req, res) => {
    const response = {
        author : 'Dharan Aditya',
    };
    res.send(response);
});

router.get('/health', (req, res) => {
    throw ('not implemented');
});

router.get('/status', (req, res) => {
    throw ('not implemented');
});

router.use((err, req, res, next) => {
    res.status(500).send(err);
});

export default router;