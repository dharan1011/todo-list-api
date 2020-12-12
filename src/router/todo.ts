import {Router} from 'express';

const router = Router();

router.get('/:userId', async (req, res) => {
    throw ('not implemented');
});

router.get('/:userId/:todoId', async (req, res) => {
    throw ('not implemented');
});

router.post(':userId', async (req, res) => {
    throw ('not implemented');
});

router.put('/:userId/:todoId', async (req, res) => {
    throw ('not implemented');
});

router.delete('/:userId/:todoId', async (req, res) => {
    throw ('not implemented');
});

router.use((err, req, res, next) => {
    res.status(500).send(err);
});

export default router;