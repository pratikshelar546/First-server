const express = require("express");
const app = express();

app.use(express.json()); //appl will use json foramt to transfer data
const port = 8081;
const todolist = ["need to learn coding", "need to do practice"];

app.get("/todos", (req, res) => {
  res.status(200).send(todolist);
});

app.post("/todos", (req, res) => {
  let todoNewITem = req.body.item;
  todolist.push(todoNewITem);
  res.status(201).send({
    message: "item added ",
  });
});

app.delete("/todos", (req, res) => {
  const deleteItemTodo = req.body.item;
  console.log(deleteItemTodo);
  todolist.find((element, index) => {
    if (element === deleteItemTodo) {
      todolist.splice(index, 1);
    } else {
      res.status(402).send({
        message: "item not found",
      });
    }
  });
  res.status(204).send({
    message: "item deleted",
  });
});
app.listen(port, () => {
  console.log(`express server runing o port no "${port}"`);
});
app.all("/todos", (req, res)=>{
  res.status(501).send();
});
app.all("*",(req, res)=>{
  res.status(404).send();
})