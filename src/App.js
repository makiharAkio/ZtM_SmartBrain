import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImgLinkForm from './Components/ImgLinkForm/ImgLinkForm';
import 'tachyons';
import ParticlesBg from 'particles-bg'

class App extends Component {
  render(){
    return (
      <div className="App">
        <ParticlesBg className='particles' type="random" bg={true} />
        <Nav />
        <Logo />
        <Rank />
        <ImgLinkForm />
        {/* <FaceReco /> */}
      </div>
    );
  }
}

export default App;
