import './App.css';
import AddPost from './components/AddPost';
import { create } from 'ipfs-http-client'

import Web3 from 'web3';
import React, { useEffect, useState } from 'react';

import PhotoSharing from './build/contracts/PhotoSharing.json'


function App() {

  const loadWeb3 = () => {
    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Install MetaMask');
    }
  }

  const [account, setAccount] = useState('');
  const [photoSharing, setPhotoSharing] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadBlockchain = async () => {
    const web3 = window.web3;
     const account = await web3.eth.getAccounts();
     setAccount(account[0]);

    const networkId = await web3.eth.net.getId();

    const networkData = PhotoSharing.networks[networkId];

    if (networkData) {
      const photoSharing = new web3.eth.Contract(
        PhotoSharing.abi, networkData.address
      );

      setPhotoSharing(photoSharing);

      setLoading(false);
    } else {
      window.alert('Photo Sharing contract not deployed to that network');
    }
  }

  useEffect(() => {
    loadWeb3();
    loadBlockchain();
  },);

  const client = create('https://ipfs.infura.io:5001/api/v0');
  const [bufferImage, setBufferImage] = useState(null);
  let bufferedImage;

  const captureFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      bufferedImage = await Buffer(reader.result);
      setBufferImage(bufferedImage);
    }
  }

  const uploadImage = async (description) => {
    try {
      setLoading(true);

      const createdImage = await client.add(bufferImage);
      const url = `https://ipfs.infura.io/ipfs/${createdImage.path}`;

      await photoSharing.methods.uploadImage(createdImage.path, description).send({ from: account });

      setLoading(false);

    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="App">
      {loading ? (
        <p> Loading</p>
      ) : (
        <>
          <p> loaded </p>
          <AddPost uploadImage={uploadImage} captureFile={captureFile} />
        </>
      )}
    </div>
  );

}

export default App;
