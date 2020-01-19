import Router from 'express';
import bcrypt from 'bcryptjs';
import config from 'config';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
const router = Router();

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Password must be 6 character or more').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data in registration'
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        res.status(400).json({ message: 'User has been already exist' });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      await user.save();
    } catch (e) {
      res.status(500).json({
        message: 'Something wrong. Try again.'
      });
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Input correct email')
      .normalizeEmail()
      .isEmail(),
    check('password', 'Input password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data in login'
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ message: 'User with email doesnt exist' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Password wrong. Try again' });
      }

      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
        expiresIn: '1h'
      });

      res.json({
        token,
        userId: user.id
      });
    } catch (e) {
      res.status(500).json({
        message: 'Something wrong. Try again.'
      });
    }
  }
);

export default router;
