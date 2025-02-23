const express = require('express');
const { handleGenerateNewUrl, handleDeleteUrl } = require('../controller/url');
const Url = require("../model/url")
const router = express.Router();

router.post('/', handleGenerateNewUrl);

router.delete('/:id', handleDeleteUrl);


router.get("/analytics/:shortid", async (req, res) => {
  const shortId = req.params.shortid;
  const result = await Url.findOne({shortId});
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
});


module.exports = router;