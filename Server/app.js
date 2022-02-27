const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/api/upload", upload.single("photo"), (req, res) => {
  let finalImageUrl =
    req.protocol + "://" + req.get("host") + "/uploads" + req.file.filename;

  res.json({ status: "success", image: finalImageUrl });
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`server running in port ${PORT}`);
});
