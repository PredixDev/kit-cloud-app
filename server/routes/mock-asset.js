var path = require("path");

// export the routes to be used in express/json-server in app.js
module.exports = function() {
  // mock asset data contains an extra "filter" property, so we can easily match the Predix API.
  const routes = {};

  // http://localhost:5000/mock-api/predix-asset/asset?filter=group=/group/plant-richmond-refinery
  // const compressorJson = require(path.resolve(__dirname, '../sample-data/predix-asset/compressor-2017.json'));
  // routes["asset"] = compressorJson;

  // http://localhost:5000/mock-api/predix-asset/group?filter=parent=/group/enterprise-predix
  // const groupsJson = require(path.resolve(__dirname, '../sample-data/predix-asset/groups.json'));
  // routes["group"] = groupsJson;

  // https://predix-asset.run.aws-usw02-pr.ice.predix.io/group?filter=users%3Dbd9f70a3-8aaa-490b-b2a8-91ba59e58f0f%3CgroupRef
  const groupsJson = require(path.resolve(__dirname, '../sample-data/predix-asset/groups-for-user.json'));
  routes["group"] = groupsJson;

  // https://predix-asset.run.aws-usw02-pr.ice.predix.io/device?filter=groupRef=/group/testcomp2
  const devicesJson = require(path.resolve(__dirname, '../sample-data/predix-asset/devices-in-group.json'));
  routes["device"] = devicesJson;

  return routes;
};
