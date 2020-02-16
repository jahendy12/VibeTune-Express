const router = require('express').Router();
let Playlist = require('../models/playlist');

// Index Route
router.route('/').get((req, res) => {
    Playlist.find()
        .then(playlists => res.json(playlists))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add route
router.post( '/add', async (req, res) => {
    const playlistname = req.body.playlistname;
    const genre = req.body.genre; 
    const description = req.body.description; 

    const newPlaylist = new Playlist({
        playlistname, 
        genre, 
        description
    });

    newPlaylist.save()
        .then(() => res.json('Playlist added!'))
        .catch(err => res.status(400).json('Error: ' +err));

});

// Get route
router.route('/:id').get((req, res) => {
    Playlist.findById(req.params.id)
    .then(playlist => res.json(playlist))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Route
router.route('/:id').delete((req, res) => {
    Playlist.findByIdAndDelete(req.params.id)
    .then(() => res.json('Playlist deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update Route
router.route('/update/:id').post((req, res) => {
    Playlist.findById(req.params.id)
    .then(playlist => {
        playlist.playlistname = req.body.playlistname;
        playlist.genre = req.body.genre;
        playlist.description = req.body.description;

        playlist.save()
            .then(() => res.json('Playlist updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;