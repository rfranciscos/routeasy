const express = require('express');
const router = express.Router();
const Deliveries = require('../models/Deliveries');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* GET home page */
router.post('/register', (req, res, next) => {
  // const { customer, weight, address, geolocation } = req.body;

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

// GET route => to get all the events
router.get('/deliveries', (req, res, next) => {
  Deliveries.find()
    // .populate("tasks")
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
