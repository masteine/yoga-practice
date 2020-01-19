import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.send('Hi! Its a starting page yoga-practice site');
});

export default router;
