import express from 'express';
import postController from '../Controllers/Posts';
import categoriesController from '../Controllers/Categories';

export const router = express.Router();


router.post('/api/v1/posts', postController.addPost);

router.get('/api/v1/posts', postController.getAllPosts);

router.post('/api/v1/posts/post', postController.postEdit);

router.post('/api/v1/posts/delete', postController.postDelete);

router.post('/api/v1/posts/comment/:id', postController.AddComment);

router.get('/api/v1/posts/filter', postController.postFilter);

router.get('/api/v1/posts/:id', postController.getOnePost);

router.get('/api/v1/categories', categoriesController.getCategories);

router.post('/api/v1/categories', categoriesController.postCategories);
