import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImgLinkForm from './Components/ImgLinkForm/ImgLinkForm';
import FaceReco from './Components/FaceReco/FaceReco';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import 'tachyons';
import ParticlesBg from 'particles-bg'

const API = "https://api-ztm-smartbrain.onrender.com";

const initialState = {
  input: '',
      imgUrl: '',
      box: {},
      route: 'signIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000')
  //   .then(response => response.json())
  //   .then(console.log);
  // }

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

  calculateFaceMap = (data) => {
    const clarifaiFaceMap = data.outputs[0].data.regions.map(region => {
      const clarifaiFace = region.region_info.bounding_box;
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
    })
    //  return this.setState(Object.assign(this.state.box, { box: clarifaiFaceMap }))    
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
    console.log(box);
  }

  displayFaceBoxMap = (box) => {
    this.setState(Object.assign(this.state.box, { box: box }))
    console.log(box);
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onClickDetect = () => {
    this.setState({ imgUrl: this.state.input });
      fetch(API + '/imgurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch(API + '/img', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)
        }
        // console.log(this.calculateFaceMap(response));

        // this.calculateFaceMap(response)
        // console.log(this.state);
        this.displayFaceBox(this.calculateFaceLoc(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState({ initialState })
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
        <Nav onRouteChange = {this.onRouteChange} isSignedIn = { isSignedIn } />
        { (route === 'home') 
          ? <div> 
              <Logo />
              <Rank name = { this.state.user.name } entries = { this.state.user.entries } />
              <ImgLinkForm 
                onInputChange = {this.onInputChange} 
                onClickDetect = {this.onClickDetect} 
              />
              <FaceReco box={box} imgUrl = {imgUrl}/>
            </div>
          : (
            (route === 'signIn' || route === 'signOut')  
            ? <SignIn onRouteChange = {this.onRouteChange} loadUser = { this.loadUser } API = { this.API } />
            : <Register onRouteChange = {this.onRouteChange} loadUser = { this.loadUser } API = { this.API } />
          )
        }
      </div>
    );
  }
}

export default App;
