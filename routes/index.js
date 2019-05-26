import express from 'express';
import db from '../db/db';
import postController from '../postsControllers/Posts';

export const router = express.Router();


router.post('/api/v1/posts', postController.postTodo);

router.get('/api/v1/posts', postController.getAllPosts);

router.get('/api/v1/posts/:id', postController.getOnePost)
