const express = require('express');
const router = express.Router();

const Playlist = require('../models/playlist');
const User = require('../models/user');

// New route
router.get('/new', async (req, res) => {
	try {
		const allUsers = await User.find();

		res.render('playlists/new.ejs', {
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
		await Playlist.create(req.body);

		res.redirect('/playlists');
	} catch (err) {
		res.send(err);
	}
});

// Index route
router.get('/', async (req, res) => {
	try {
		const foundPlaylists = await Playlist.find();

		res.render('playlists/index.ejs', {
			playlists: foundPlaylists
		});
	} catch (err) {
		res.send(err);
	}
});

// Show route
router.get('/:id', async (req, res) => {
	try {
		const foundPlaylist = await Playlist.findById(req.params.id).populate('user');

		res.render('playlists/show.ejs', {
			playlist: foundPlaylist
		});
	} catch (err) {
		res.send(err);
	}
});

// Edit route
router.get('/:id/edit', async (req, res) => {
	try {
		const foundPlaylist = await Playlist.findById(req.params.id);
		console.log(foundPlaylist);
		const allUsers = await User.find();

		res.render('playlists/edit.ejs', {
			playlist: foundPlaylist,
			users: allUsers,
		});
	} catch (err) {
		res.send(err);
	}
});

// Update route
router.put('/:id', async (req, res) => {
	try {
        await Playlist.findByIdAndUpdate(req.params.id, req.body);
        
		res.redirect(`/playlists/${req.params.id}`);
	} catch (err) {
		res.send(err);
	}
});

// Delete route
router.delete('/:id', async (req, res) => {
	try {
		await Playlist.findByIdAndRemove(req.params.id);

		res.redirect('/playlists');
	} catch (err) {
		res.send(err);
	}
});

module.exports = router;