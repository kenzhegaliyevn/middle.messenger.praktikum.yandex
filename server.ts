import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const DIST_PATH = "/dist";

app.use(express.static(`${__dirname}${DIST_PATH}`));

app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, DIST_PATH, "/index.html"));
});

app.listen(PORT, () => {
    console.log(`My Chat listening on port ${PORT}!`);
});
