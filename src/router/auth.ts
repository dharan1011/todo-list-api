import {Router} from 'express';

const router = Router();

router.get('/login', (req, res) => {
    throw ('not implemented');
});

router.get('/callback', (req, res) => {
    throw ('not implemented');
});

router.get('/logout', (req, res) => {
    throw ('not implemented');
});

router.use((err, req, res, next) => {
    res.status(500).send(err);
});

export default router;