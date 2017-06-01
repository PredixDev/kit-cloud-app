var path = require("path");

// export the routes to be used in express/json-server in app.js
module.exports = function() {
  const routes = {};

  // http://localhost:5000/api/kit/register
  const registerJson = require(path.resolve(__dirname, '../sample-data/kit-service/nuc-register.json'));
  routes["register"] = registerJson;

  const deviceJson = require(path.resolve(__dirname, '../sample-data/kit-service/device.json'));
  routes["device"] = deviceJson;  

  return routes;
};
