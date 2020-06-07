import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
import './LandingPage.css';

const LandingPage = ({onRouteChange}) => {
	return(
		<div className="bgcover">
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p className="f3 position">Face Recognizer</p>
				<p onClick={()=> onRouteChange('signin')} className='pad underline f4 black dim link pointer '>Sign In</p>
				<p onClick={()=> onRouteChange('register')} className='pad underline f4 black dim link pointer pa0'>Register</p>
			</nav>
			<div className=" cover center">
				<div className="container w-75">
					<ReactTypingEffect 
						className="f1 fw6" 
						text="Hello there! : )"
						speed="200"
						eraseDelay= "90000000"/>
					<ReactTypingEffect 
						className="f3 fw4 pa3 "
						text="Enter any image url to detect the face in the image"
						speed="200"
						eraseDelay= "9000000"/>
					<p 
						className="f4 link grow bw1 ph5 pv1  dib br4 pointer bg" 
						onClick={()=> onRouteChange('register')}>
							Check it out
					</p>
				</div>
			</div>

		</div>

	);
}

export default LandingPage;