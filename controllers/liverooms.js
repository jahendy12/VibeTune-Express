const router = require('express').Router();
let Liveroom = require('../models/liveroom');

router.route('/').get((req, res) => {
    Liveroom.find()
        .then(liverooms => res.json(liverooms))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const genre = req.body.genre; 
    const description = req.body.description; 

    const newLiveroom = new Liveroom({
        name, 
        genre, 
        description
    });

    newLiveroom.save()
        .then(() => res.json('Liveroom added!'))
        .catch(err => res.status(400).json('Error: ' +err));
});

// Get route
router.route('/:id').get((req, res) => {
    Liveroom.findById(req.params.id)
    .then(liveroom => res.json(liveroom))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Route
router.route('/:id').delete((req, res) => {
    Liveroom.findByIdAndDelete(req.params.id)
    .then(() => res.json('Liveroom deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update Route
router.route('/update/:id').post((req, res) => {
    Liveroom.findById(req.params.id)
    .then(liveroom => {
        liveroom.name = req.body.name;
        liveroom.genre = req.body.genre;
        liveroom.description = req.body.description;

        liveroom.save()
            .then(() => res.json('Liveroom updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;