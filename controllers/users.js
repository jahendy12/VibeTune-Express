const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Playlist = require('../models/playlist');

const bcrypt = require('bcrypt');

// New route
router.get('/new', async (req, res) => {
	res.render('users/new.ejs');
});

// Create route
router.post('/', async (req, res) => {
	try {
		console.log(req.body);
		await User.create(req.body);

		res.redirect('/users');
	} catch (err) {
		res.send(err);
	}
});

// Index route
router.get('/', async (req, res) => {
	console.log('req.session in users index', req.session);
	try {
		const foundUsers = await User.find();
 
		res.render('users/index.ejs', {
			users: foundUsers
		});
		
	} catch (err) {
		res.send(err);
	}
});

//Log out route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            res.send(err);
        } else {
            res.redirect('/');
        }
    })
})

// Show route
router.get('/:id', async (req, res) => {
	try {
		const foundUser = await User.findById(req.params.id);

		const usersPlaylists = await Playlist.find({ user: foundUser._id });

		res.render('users/show.ejs', {
			user: foundUser,
			playlists: usersPlaylists
		});
		
	} catch (err) {
		res.send(err);
	}
});

// Edit route
router.get('/:id/edit', async (req, res) => {
	try {
		const foundUser = await User.findById(req.params.id);

		res.render('users/edit.ejs', {
			user: foundUser
		});
		
	} catch (err) {
		res.send(err);
	}
});

// Update route
router.put('/:id', async (req, res) => {
	try {
		await User.findByIdAndUpdate(req.params.id, req.body);
		
		res.redirect(`/users/${req.params.id}`);
	} catch (err) {
		res.send(err);
	}
});

// Delete route
router.delete('/:id', async (req, res) => {
	try {
		await User.findByIdAndRemove(req.params.id);

		await Playlist.deleteMany({ user: req.params.id });		
		
		res.redirect('/users');
	} catch (err) {
		res.send(err);
	}
});

//Log in route
router.post('/login', async (req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.body.username });
        if(foundUser){
            if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.message = '';
                req.session.username = foundUser.username;
                req.session.logged = true;

                res.redirect('/users');
            } else {
                req.session.message = 'Username or password is incorrect';
                res.redirect('/');
            }
        } else {
            req.session.message = 'Username or password is incorrect';
            res.redirect('/');
        }
    } catch(err) {
        res.send(err);
    }
})

///Register Route

router.post('/registration', async (req, res) => {
    
	const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	console.log(passwordHash);
    const userDbEntry = {
        username: req.body.username,
        password: passwordHash,
        email: req.body.email
	}
	console.log(userDbEntry);
    try {
		const createdUser = await User.create(userDbEntry);
        req.session.username = createdUser.username;
        req.session.logged = true;
        res.redirect('/users');
    } catch(err) {
        res.send(err);
    }
})

module.exports = router;