const fetch = require("node-fetch");

(async function() {
  const response = await fetch("https://jarchive-json.glitch.me/glitch/12/09/2022/1");
  console.log(await response.json());
}());