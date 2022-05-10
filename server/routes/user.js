import express from 'express';
import { signIn,signUp} from '../controller/user.js';
// import { dummyRequest } from '../controller/posts.js';

const router = express.Router();

router.post('/signIn',signIn);
router.post('/signUp',signUp);
// router.get('/searching',dummyRequest);

export default router;