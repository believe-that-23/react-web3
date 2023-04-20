const PhotoSharing = artifacts.require("PhotoSharing");
module.exports = function (_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(PhotoSharing);
};
