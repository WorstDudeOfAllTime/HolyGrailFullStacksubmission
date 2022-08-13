const redis = require("redis");
const client = redis.createClient({ legacyMode: true });
client.connect();
client.on("error", function (error) {
  console.error(error);
  // I report it onto a logging service like Sentry.
});

client.set("my_key", "Hello World");
client.get("my_key", (err, reply) => {
  if (err) {
    console.log(err);
  }
  console.log(`$reply: ${reply}`);
});

client.mset("header", 0, "left", 0, "content", 0, "right", 0, "footer", 0);
client.mget(["header", "left", "content", "right", "footer"], (err, value) => {
  console.log(value);
});

client.quit();
