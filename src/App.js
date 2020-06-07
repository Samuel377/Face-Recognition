import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Landingpage from './components/Landingpage/Landingpage';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';



const particlesSettings = {
  particles:{
     number: {
        value: 100,
        density:{
          enable:true,
          value_area: 800
        },         
     }

  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: '',
  isSignedIn: false,
  user: {
    id: '',
    username:'',
    email: '',
    entries: 0,
    joined: '',
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  addUser = (data) => {
    this.setState( {user: {
          id: data.id,
          username: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
        }})
  }
  onInputChange = (event)=>{
    this.setState({input: event.target.value})
  }

  calculateFaceLocation = (data) =>{
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("image");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: face.left_col * width,
      rightCol: width - (face.right_col *width),
      topRow: face.top_row * height,
      bottomRow: height - (face.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    this.setState({box});
  }

  onButtonSubmit = ()=>{
    this.setState({imageUrl: this.state.input})
    fetch("https://radiant-mesa-41486.herokuapp.com/imageUrl", {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
    .then(response => response.json())
    .then(response => {
      if(response){
        fetch("https://radiant-mesa-41486.herokuapp.com/image", {
        method: 'put',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id
        })
      })
        .then(response => response.json())
        .then(count => {
          console.log(count)
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err=> console.log(err));
  }

  onRouteChange = (route) =>{
    if(route === 'signin' || route === 'register'){
      this.setState(initialState)
    }else if(route === 'home'){
      this.setState({isSignedin: true})
    }
    this.setState({route});
  }

  render() {
    const {route, isSignedin, imageUrl, box} = this.state  
    return (
      <div className="App">
        <Particles 
          className='particles'
          params={particlesSettings} 
        />
        {route === 'home'
          ?<div>
              <Navigation isSignedin={isSignedin} onRouteChange={this.onRouteChange}  />
              <Rank 
                username={this.state.user.username}
                entries={this.state.user.entries}
              />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
            :(route === 'signin' 
              ?<div>

                <Signin addUser={this.addUser} onRouteChange={this.onRouteChange}/>
              </div>
            :(route === 'register'
              ?
              <div>
  
                <Register addUser={this.addUser} onRouteChange={this.onRouteChange} />
              </div>
              :<Landingpage onRouteChange={this.onRouteChange}/>
               )
            )
        }

      </div>
    );
  }
}

export default App;
