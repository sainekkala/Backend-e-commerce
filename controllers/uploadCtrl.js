const uploadCtrl = {
    sendFileName: (req, res) => {
        res.status(200);
        res.send({
            status: 'Uploaded the file successfully',
            imgSrc: req.body.imgSrc
        });
    }
}

module.exports = uploadCtrl;