const express = require("express");
const supabaseClient = require("@supabase/supabase-js");
const bodyParser = require("body-parser");

require("dotenv").config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const supabase = supabaseClient.createClient(
  (supabaseUrl = process.env.SUPA_ARDUINO_URL),
  (supabaseKey = process.env.SUPA_ARDUINO_API_KEY)
);

app.get("/", (req, res) => res.send("Express on Vercel"));

app.post("/mkr/upload", async (req, res) => {
  const { data, error } = await supabase.from("mkr1000").insert({
    humidity: req.body.humidity,
    temperature: req.body.temperature,
  });
  if (error) {
    res.send(error);
  } else {
    res.send(data);
  }
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
