import React from 'react';
import './signin.css';

class Signin extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			signInEmail : '',
			signInPassword : ''
		}
	}
		onEmailChange = (event) => {
			this.setState({signInEmail: event.target.value})
		}

		onPasswordChange = (event) => {
			this.setState({signInPassword: event.target.value})
		}
  
		onSignInSubmit = () => {
			fetch('https://radiant-mesa-41486.herokuapp.com/signin', {
				method: 'post',
				headers: {'Content-Type' : 'application/json'},
				body: JSON.stringify({
					email: this.state.signInEmail,
					password: this.state.signInPassword
				})
			})
				.then(response => response.json())
      			.then(user => {
      			  if(user.id){
          			this.props.addUser(user);
          			this.props.onRouteChange('home');
        		  }else{
					var h1 = document.getElementById('errormessage');
					h1.innerText = "invalid email address or password, please try again"
				  }
      		})
		}
	render(){
		const {onRouteChange} = this.props;
		return(
			<article className="br3 ba b--black-10 mv4 w-75 shadow-5 mw6 center signin">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
				      <p id="errormessage" className="f5 red"></p>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f5" htmlFor="UserName">Email Address</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90" 
				        	type="email" 
				        	name="email"  
				        	id="email"
				        	onChange = {this.onEmailChange}
				         />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
				        <input 
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 " 
				        	type="password" 
				        	name="password"  
				        	id="password"
				        	onChange = {this.onPasswordChange}
				         />
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
				      	onClick={this.onSignInSubmit} 
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
				      	type="submit" 
				      	value="Sign in" />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={()=> onRouteChange('register')} className="f6 link dim black db pointer">Don't have an account? Create one</p>
				    </div>
				  </div>
				</main>
			</article>

		);
	}
	
}

export default Signin;