import React from 'react';
import './Register.css';

class Register extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userName : '',
			password : '',
			email: ''
		}
	}
		onUsernameChange = (event) => {
			this.setState({userName: event.target.value})
		}

		onPasswordChange = (event) => {
			this.setState({password: event.target.value})
		}

		onEmailChange = (event) => {
			this.setState({email: event.target.value})
		}

		onRegisterSubmit = () => {
			fetch('https://radiant-mesa-41486.herokuapp.com/register', {
				method: 'post',
				headers: {'Content-Type' : 'application/json'},
				body: JSON.stringify({
					username: this.state.userName,
					password: this.state.password,
					email: this.state.email
				})
			})
				.then( response => response.json())
				.then(user => {
					if(user.id){
						this.props.addUser(user)
						this.props.onRouteChange('home');
					}else{
						var h1 = document.getElementById('errormessage');
						h1.innerText = "please fill up the form"
					}
			})
		}


	render(){
		const {onRouteChange} = this.props
		return(
				<article className="br3 ba b--black-10 mv4 w-75 shadow-5 mw6 center box">
					<main className="pa4 black-80">
					  <div className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f1 fw6 ph0 mh0">Register</legend>
					      <p id="errormessage" className="f5 red"></p>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="name">Username</label>
					        <input 
					        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-95" 
					        	type="name" 
					        	name="name"  
					        	id="name"
					        	onChange = {this.onUsernameChange}
					         />
					      </div>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input 
					        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	type="email" 
					        	name="email-address"  
					        	id="email-address" 
					        	onChange = {this.onEmailChange}
					        />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input 
					        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	type="password" 
					        	name="password"  
					        	id="password"
					        	onChange = {this.onPasswordChange}
					         />
					      </div>
					    </fieldset>
					    <div className="">
					      <input 
					      	onClick={this.onRegisterSubmit} 
					      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      	type="submit" 
					      	value="Register" />
					    </div>
					    <div className="lh-copy mt3">
					      <p onClick={()=> onRouteChange('signin')} className="f6 link dim black db pointer">Already have an account?</p>
					    </div>	
					  </div>
					</main>
				</article>
		);
	}

}

export default Register;