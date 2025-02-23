const express = require("express");
const app = express();
const PORT = 8000;
const { connectToMongoDb } = require("./connection");
const urlHandler = require("./routes/url");
const Url = require("./model/url");

connectToMongoDb("mongodb://0.0.0.0:27017/url-shortner").then(() => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use("/url", urlHandler);

// Go to the URL from the ID

app.get("/:shortid", async (req, res) => {
  const shortId = req.params.shortid;
  const entry = await Url.findOneAndUpdate(
    {
      shortId,
    },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  res.redirect(entry.redirectUrl);
});

// Delete the URL from the database
app.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
