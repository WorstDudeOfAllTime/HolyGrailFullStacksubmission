const express = require("express");
const app = express();
const redis = require("redis");
const client = redis.createClient({ legacyMode: true });
client.connect();
client.mSet("header", 0, "left", 0, "content", 0, "right", 0, "footer", 0);
client.mGet(["header", "left", "content", "right", "footer"], (err, value) => {
  console.log(value);
});

function data() {
  return new Promise((res, rej) => {
    client.mGet(
      ["header", "left", "content", "right", "footer"],
      function (err, value) {
        console.log(value);
        const data = {
          header: Number(value[0]),
          left: Number(value[1]),
          content: Number(value[2]),
          right: Number(value[3]),
          footer: Number(value[4]),
        };
        err ? rej(null) : res(data);
      }
    );
  });
}

app.use(express.static("public"));

app.get("/data", (req, res) => {
  data().then((data) => {
    console.log(data);
    res.send(data);
  });
});

app.get("/update/:key/:value", function (req, res) {
  //erase, rewrite, explain
  //key the key from the request parameters
  //get the value from the request paramters
  // client.get key, err/reply  callback,
  // store the reply number + value into value,
  // set the key to value on the client
  const key = req.params.key;
  let value = Number(req.params.value);

  client.get(key, (err, reply) => {
    console.log(reply);
    // new value
    value = Number(reply) + value;
    client.set(key, value);

    // return data to client
    data().then((data) => {
      console.log(data);
      res.send(data);
    });
  });
});

app.listen(3000, () => {
  console.log(`Running on port ${3000}`);
});

process.on("exit", function () {
  client.quit();
});
