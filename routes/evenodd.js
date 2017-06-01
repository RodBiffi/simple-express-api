const express      = require('express');
const router       = express.Router();
const SimpleNumber = require('../business/simplenumbers');

/* GET home page. */
router.get('/:number', function (req, res, next) {
    console.log(req.pathParams);
    res.json({result: SimpleNumber.isEven(req.pathParams.number) ? "even" : "odd"});
});

module.exports = router;
