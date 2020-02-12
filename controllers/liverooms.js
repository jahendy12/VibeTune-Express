const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Liveroom = require('../models/liveroom')

// New route
router.get('/new', async (req, res) => {
	try {
		const allUsers = await User.find();

		res.render('liverooms/new.ejs', {
			users: allUsers
		});
	} catch (err) {
		res.send(err);
	}
});

// Create route
router.post('/', async (req, res) => {
	try {
		const foundUser = await User.findOne({username:req.session.username})
		req.body.user = foundUser._id
		await Liveroom.create(req.body);

		res.redirect('/liverooms');
	} catch (err) {
		res.send(err);
	}
});

// Index route
router.get('/', async (req, res) => {
	try {
		const foundLiverooms = await Liveroom.find();

		res.render('liverooms/index.ejs', {
			liverooms: foundLiverooms
		});
	} catch (err) {
		res.send(err);
	}
});

// Show route
router.get('/:id', async (req, res) => {
	try {
		const foundLiveroom = await Liveroom.findById(req.params.id).populate('user');

		res.render('liverooms/show.ejs', {
			liveroom: foundLiveroom
		});
	} catch (err) {
		res.send(err);
	}
});

// Edit route
router.get('/:id/edit', async (req, res) => {
	try {
		const foundLiveroom = await Liveroom.findById(req.params.id);
		console.log(foundLiveroom);
		const allUsers = await User.find();

		res.render('liverooms/edit.ejs', {
			liveroom: foundLiveroom,
			users: allUsers,
		});
	} catch (err) {
		res.send(err);
	}
});

// Update route
router.put('/:id', async (req, res) => {
	try {
        await Liveroom.findByIdAndUpdate(req.params.id, req.body);
        
		res.redirect(`/liverooms/${req.params.id}`);
	} catch (err) {
		res.send(err);
	}
});

// Delete route
router.delete('/:id', async (req, res) => {
	try {
		await Liveroom.findByIdAndRemove(req.params.id);

		res.redirect('/liverooms');
	} catch (err) {
		res.send(err);
	}
});

module.exports = router;