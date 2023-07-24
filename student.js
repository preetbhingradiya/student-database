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
    // maths: { $gt: req.query.maths, $lt: req.query.maths1}
    // maths 80
    // maths1 90
    science: { $gt: 50, $lt: 90 },
  });
  res.send(store);

  // let store=await student.find({gender:req.body.name}).sort({science:-1}).limit(1).count()
  // res.send("ok")
  // console.log(store);

  // let temp=await student.find({class:"I"}).sort({maths:1}).limit(3)
  // res.send(temp)
});

result.get("/student/class", async (req, res) => {
  let store = await student
    .find({
      class: { $gt: "I", $lt: "v" },
      maths: { $gt: 50 },
    })
    .count();
  res.send("ok");
  console.log(store);

  // let temp=await student.find({
  //     gender:"Female",
  //     section:"B",
  //     maths:{$lt:25}
  // })
  // res.send(temp)
});

result.post("/", async (req, res) => {
  let send = await student.create(req.body);
  res.send(send);
});

result.delete("/:id", async (req, res) => {
  await student.findByIdAndDelete(req.params.id);
  res.send("id is delete");
});

result.listen(7070, () => {
  console.log("port are run");
  connect();
});
