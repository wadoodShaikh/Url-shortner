const shortid = require("shortid");
const Url = require("../model/url");
async function handleGenerateNewUrl(req, res) {
  const body = req.body;
  const shortID = shortid();
  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }
  await Url.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
}

async function handleDeleteUrl(req, res) {
    await User.findByIdAndDelete(req.params.id);

  return res.status(204).json({ process: "success" });
}

module.exports = {
  handleGenerateNewUrl,
  handleDeleteUrl,
};
