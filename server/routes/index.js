const express = require('express');
const router = express.Router();
const Deliveries = require('../models/Deliveries');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* POST deliveries */
router.post('/register', (req, res, next) => {
  const newDeliveries = new Deliveries({
    customer: req.body.customer,
    weight: req.body.weight,
    address: req.body.address,
    geolocation: req.body.geolocation
  });

  Deliveries.create(newDeliveries)
    .then(response => {
      res.status(200).json({ message: 'Event created successfuly' });
    })
    .catch(err => res.status(400).json(err));
});

// GET route => to get all deliveries
router.get('/deliveries', (req, res, next) => {
  Deliveries.find()
    .then(response => {
      res.json(response);
    })
    .catch(err => res.status(400).json(err));
});

// GET route => to remove all deliveries
router.get('/delete_deliveries', (req, res, next) => {
  Deliveries.remove({})
    .then(response => {
      res.json(response);
    })
    .catch(err => res.status(400).json(err));
});

// GET route => to revove by id
router.get('/delete_delivery/:id', (req, res, next) => {
  const { id } = req.params;
  Deliveries.findByIdAndRemove({ _id: id })
    .then(response => {
      res.json(response);
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
