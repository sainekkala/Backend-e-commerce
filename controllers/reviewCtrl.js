const reviewService = require('../services/reviewSvc');

const reviewCtrl = {
    add: async (req, res) => {
        try {
            const review = await reviewService.add(req.body);
            res.status(201);
            res.send({ data: review, status: 'Created review successfully' });
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send({ error: 'server_error', description: error });
        }
    }
};

module.exports = reviewCtrl;