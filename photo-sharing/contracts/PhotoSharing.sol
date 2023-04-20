// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PhotoSharing {
    uint public imageCount = 0;

    mapping(uint => Image) public images;

    struct Image {
        uint id;
        string hash;
        string description;
        address payable uploader;
    }

    event ImageCreated (
      uint id,
      string hash, 
      string description,
      address payable uploader
    );


    function uploadImage(string memory _imageHash, string memory _description) public {
        require(bytes(_imageHash).length > 0);
        require(bytes(_description).length > 0);
        require(msg.sender != address(0));

        imageCount++;

        images[imageCount] = Image(imageCount, _imageHash, _description, payable(msg.sender));

        emit ImageCreated(imageCount, _imageHash, _description, payable(msg.sender));

    }
}
