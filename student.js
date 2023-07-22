const express = require("express");
const connect = require("./connect");
const student = require("./mongoose");

const result = express();
result.use(express.json());

result.get("/", async (req, res) => {
  res.send(await student.find());
  console.log("student result");
});

result.get("/student", async (req, res) => {
  //   let show = await student.find({ gender: req.query.gender });
  //   res.send(show);
  let temp = await student.find({
    gender: req.query.gender,
    maths: { $gt: 70 },
    english: { $gt: 70 },
    science: { $gt: 70 },
  });
  res.send(temp);
});

result.get("/student/marks", async (req, res) => {
  let store = await student.find({
    maths: { $gt: 80, $lt: 90 },
    science: { $gt: 50, $lt: 90 },
  });
  res.send(store);
});

result.get("/student/class", async (req, res) => {
  let store = await student.find({
    class:{$gt:"I",$lt:"v"},
    maths:{$gt:50}
  });
  res.send(store);
});

result.post("/", async (req, res) => {
  let send = await student.create(req.body);
  res.send(send);
});

result.listen(7070, () => {
  console.log("port are run");
  connect();
});
