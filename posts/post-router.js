const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', async (req, res) => {
	const posts = await db('posts');
	// const posts = await db.select('*').from('posts'); EXAMPLE
	try {
		const posts = await db('posts');
	// const posts = await db.select('*').from('posts'); EXAMPLE
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/:id', async (req, res) => {
try {
	const {id} = req.params;
	const [post] = await db('posts').where({id});

	res.status(200).json(post);
} catch (error) {
	res.status(500).json(error);
}
});

router.post('/', async (req, res) => {
	try {
		const postData = req.body;
		const post = await db('posts').insert(postData);

		res.status(201).json(post);
	} catch (error) {
		res.status(500).json(error);
	}

});

router.put('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const postData = req.body;
		const count = await db('posts').where('id', '=', id).update(postData);

		res.status(200).json(count);
	} catch (error) {
		res.status(500).json(error);
	}

});

router.delete('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const post = await db('posts').where('id', '=', id).del();

		res.status(204).json(post)
	} catch (error) {
		res.status(500).json(error);
	}

});

module.exports = router;