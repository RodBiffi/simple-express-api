const express = require('express');
const router  = express.Router();
const SimpleNumber = require('../business/simplenumbers');

router.post('/:min/:max', function (req, res, next) {
    let newNumber;

    try {
        newNumber = SimpleNumber.numberFromInterval(req.pathParams.min, parseInt(req.pathParams.max));
    }
    catch(err) {
        if(err.name === 'ArgumentInvalidError') {
            return next(err);
        }
    }

    res.send(newNumber.toString());
});

module.exports = router;
