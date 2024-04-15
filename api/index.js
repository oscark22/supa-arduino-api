const express = require("express");
const supabaseClient = require("@supabase/supabase-js");
const morgan = require("morgan");
const bodyParser = require("body-parser");

require("dotenv").config();
const app = express();

app.use(morgan("combined"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const supabase = supabaseClient.createClient(
  (supabaseUrl = process.env.SUPA_ARDUINO_URL),
  (supabaseKey = process.env.SUPA_ARDUINO_API_KEY)
);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/mkr", async (req, res) => {
  const { data, error } = await supabase
    .from("mkr")
    .select()
    .limit(10)
    .order("timestamp", { ascending: false });
  if (error) {
    res.send("an error has occurred.");
  } else {
    res.send(data);
  }
});

app.post("/mkr", async (req, res) => {
  const { data, error } = await supabase
    .from("mkr")
    .insert([
      {
        humidity: req.body.humidity,
        temperature: req.body.temperature,
      },
    ])
    .select();

  if (error) {
    res.send("an error has occurred. " + error);
  } else {
    res.send(data);
  }
});

app.post("/esp", async (req, res) => {
  const { data, error } = await supabase
    .from("esp")
    .insert([{ pressure: req.body.pressure }])
    .select();

  if (error) {
    res.send("an error has occurred. " + error);
  } else {
    res.send(data);
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
