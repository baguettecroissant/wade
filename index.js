const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());

app.get("/audio", (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  console.log("✅ Received request with URL:", url);

  const command = `yt-dlp -f bestaudio -g "${url}"`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("yt-dlp error:", stderr);
      return res.status(500).json({ error: "yt-dlp failed" });
    }
    return res.json({ audioUrl: stdout.trim() });
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server listening on port", PORT));
