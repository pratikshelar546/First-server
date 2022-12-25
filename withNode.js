const http = require("http"); // this is for install package of http

const port = 8081; //assign port
const todolist = ["need to learn coding", "need to do practice"];

http
  .createServer((req, res) => {
    //creted server
    // res.writeHead(200,{"Content-type":"text/html"});   // header to mention type of text
    // res.write("<h3>this is your first server</h3>");  //display on ui
    // res.end();     //end the server

    const { method, url } = req;
    if (url === "/todos") {
      if (method === "GET") {
        res.writeHead(200, { "content-type": "text/html" });
        res.write(todolist.toString());
        res.end();
      } else if (method === "POST") {
        let body = "";
        req
          .on("error", (err) => {
            console.log(err);
          })
          .on("data", (chunks) => {
            body += chunks;
            // console.log(chunks);
          })
          .on("end", () => {
            body = JSON.parse(body);
            // console.log(body);
            let newToDo = todolist;
            newToDo.push(body.item);
            console.log(newToDo);
          });
      } else if (method === "DELETE") {
        let body = "";
        req
          .on("error", (err) => {
            console.error(err);
          })
          .on("data", (chunks) => {
            body += chunks;
          })
          .on("end", () => {
            body = JSON.parse(body);
            let deleteItem = body.item;
            for (let i = 0; i < todolist.length; i++) {
              if (todolist[i] === deleteItem) {
                todolist.splice(i, 1);
                break;
              }
            }
            res.writeHead(204);
          });
      } else {
        res.writeHead(501);
      }
    } else {
      res.writeHead(404);
    }
    res.end();
  })
  .listen(port, () => {
    //to listen on port
    console.log(`this is from port ${port}`); //display on log
  });
