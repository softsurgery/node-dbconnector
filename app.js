const express = require("express");
const bodyParser = require("body-parser");
const { createConnection, getConnection } = require("./db/connectionManager");

const app = express();
app.use(bodyParser.json());

app.post("/connect", async (req, res) => {
  const { host, port, user, password, database } = req.body;
  try {
    const { token } = await createConnection({ host, port, user, password, database });
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/query", async (req, res) => {
  const { token, sql, params = [] } = req.body;
  const conn = getConnection(token);

  if (!conn) {
    return res.status(401).json({ success: false, error: "Invalid or expired token." });
  }

  try {
    const [results] = await conn.execute(sql, params);
    res.json({ success: true, results });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
