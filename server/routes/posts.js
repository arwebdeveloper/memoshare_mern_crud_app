import express from 'express';
import { getPost, getPosts, getPostsBySearch, createPosts, updatePost, deletePost, likePost, dummyRequest, commentPost } from '../controller/posts.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/',getPosts);
router.get('/searching',dummyRequest);
router.get('/search',getPostsBySearch);
router.get('/:id',getPost);

router.post('/',auth,createPosts);
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth,likePost)
router.post('/:id/commentPost',auth,commentPost)

export default router;