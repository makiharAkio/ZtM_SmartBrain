import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Nav from './Components/Nav/Nav';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImgLinkForm from './Components/ImgLinkForm/ImgLinkForm';
import FaceReco from './Components/FaceReco/FaceReco';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import 'tachyons';
import ParticlesBg from 'particles-bg'

const app = new Clarifai.App({
  apiKey: 'e1e487228ded4332ad0fd74421a279d5'
 });

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imgUrl: '',
      box: {},
      route: 'signIn',
      isSignedIn: false
    }
  }

  calculateFaceLoc = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const inputImg = document.getElementById('inputImg');
    const widhtImg = Number(inputImg.width);
    const heightImg = Number(inputImg.height);
    console.log(widhtImg, heightImg);
    return {
      topRow: (clarifaiFace.top_row * heightImg),
      rightCol: widhtImg - (clarifaiFace.right_col * widhtImg),
      botRow: heightImg - (clarifaiFace.bottom_row * heightImg),
      leftCol: (clarifaiFace.left_col * widhtImg),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
    console.log(box);
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
    console.log(event.target.value);
    console.log("state ", this.state);
  }

  onClickDetect = () => {
    this.setState({ imgUrl: this.state.input });
    console.log("state ", this.state);
    app.models
      .predict('face-detection', this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLoc(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    } 
    this.setState({route: route})
  }
    

  render(){
    const { isSignedIn, route, box, imgUrl } = this.state;
    return (
      <div className="App">
        <ParticlesBg className='particles' num={100} type="cobweb" bg={true} />
        <Nav onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn} />
        { (route === 'home') 
          ? <div> 
              <Logo />
              <Rank />
              <ImgLinkForm 
                onInputChange = {this.onInputChange} 
                onClickDetect = {this.onClickDetect} 
              />
              <FaceReco box={box} imgUrl = {imgUrl}/>
            </div>
          : (
            (route === 'signIn') 
            ? <SignIn onRouteChange = {this.onRouteChange} />
            : <Register onRouteChange = {this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
