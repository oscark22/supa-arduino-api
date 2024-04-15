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

app.get("/esp", async (req, res) => {
  const { data, error } = await supabase
    .from("esp")
    .select()
    .limit(10)
    .order("timestamp", { ascending: false });
  if (error) {
    res.send("an error has occurred.");
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

app.put("/humidity", async (req, res) => {
  const { data, error } = await supabase
    .from("humidity")
    .update({ threshold: req.body.threshold })
    .eq("id", 1)
    .select();

  if (error) {
    res.send("an error has occurred.");
  } else {
    res.send(data);
  }
});

app.get("/humidity", async (req, res) => {
  const { data, error } = await supabase.from("humidity").select().limit(1);

  if (error) {
    res.send("an error has occurred.");
  } else {
    res.send(data);
  }
});

app.put("/pressure", async (req, res) => {
  const { data, error } = await supabase
    .from("pressure")
    .update({ threshold: req.body.threshold })
    .eq("id", 1)
    .select();

  if (error) {
    res.send("an error has occurred.");
  } else {
    res.send(data);
  }
});

app.get("/pressure", async (req, res) => {
  const { data, error } = await supabase.from("pressure").select().limit(1);

  if (error) {
    res.send("an error has occurred.");
  } else {
    res.send(data);
  }
});

app.put("/temperature", async (req, res) => {
  const { data, error } = await supabase
    .from("temperature")
    .update({ threshold: req.body.threshold })
    .eq("id", 1)
    .select();

  if (error) {
    res.send("an error has occurred.");
  } else {
    res.send(data);
  }
});

app.get("/temperature", async (req, res) => {
  const { data, error } = await supabase.from("temperature").select().limit(1);

  if (error) {
    res.send("an error has occurred.");
  } else {
    res.send(data);
  }
});

app.listen(8000, () => {
  console.log("Listening on port 8000...");
});
